import { getUserByClientID } from "@/Utils/auth";
import { prisma } from "@/Utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClientID();
  const entry = await prisma.planEntry.create({
    data: {
      userId: user.id,
      destination: "Unknown",
      arrivalDate: new Date(),
      departDate: new Date(),
      plan: {
        create: {
          content: "",
          user: { connect: { id: user.id } },
        },
      },
    },
  });
  revalidatePath("/plan");
  return NextResponse.json({ data: entry });
};

export const GET = async () => {
  const user = await getUserByClientID();

  const allEntries = await prisma.planEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({ data: allEntries });
};
