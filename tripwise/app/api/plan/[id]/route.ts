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

export const DELETE = async (request: Request) => {
  const user = await getUserByClientID();
  const { id } = await request.json();
  await prisma.planEntry.delete({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
  });
  return NextResponse.json({ message: "deleted" });
};

export const GET = async (request: Request, { params }) => {
  const user = await getUserByClientID();
  const entry = await prisma.planEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    include: {
      plan: true,
    },
  });
  return NextResponse.json({ data: entry });
};
