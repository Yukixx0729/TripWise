import { generatePlan } from "@/Utils/ai";
import { getUserByClientID } from "@/Utils/auth";
import { prisma } from "@/Utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
  const { destination, arrivalDate, departDate } = await request.json();
  const user = await getUserByClientID();
  const updateEntry = await prisma.planEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      destination,
      arrivalDate,
      departDate,
    },
  });

  const aiPlan = await generatePlan(destination, arrivalDate, departDate);
  console.log(aiPlan);
  const updatePlan = await prisma.plan.upsert({
    where: {
      entryId: updateEntry.id,
    },

    create: {
      userId: user.id,
      entryId: updateEntry.id,
      content: aiPlan,
    },
    update: {
      content: aiPlan,
    },
  });
  return NextResponse.json({ data: { ...updateEntry, updatePlan } });
};
