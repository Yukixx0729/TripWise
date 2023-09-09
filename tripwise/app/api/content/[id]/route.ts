import { generatePlan } from "@/Utils/ai";
import { getUserByClientID } from "@/Utils/auth";
import { prisma } from "@/Utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { content } = await request.json();
  const user = await getUserByClientID();

  const updatePlan = await prisma.plan.update({
    where: {
      userId: user.id,
      entryId: params.id,
    },
    data: {
      content: content,
    },
  });
  return NextResponse.json({ data: updatePlan });
};
