import { generatePlan } from "@/Utils/ai";
import { getUserByClientID } from "@/Utils/auth";
import { prisma } from "@/Utils/db";
import { NextResponse } from "next/server";

const apikey = process.env.API_KEY;

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { destination, arrivalDate, departDate } = await request.json();
  const user = await getUserByClientID();

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${apikey}`
  );
  const data = await response.json();
  const positon = data.results[0].geometry.location;
  const lat = positon.lat;
  const lng = positon.lng;

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
      lat: lat || null,
      lng: lng || null,
    },
  });

  const aiPlan = await generatePlan(destination, arrivalDate, departDate);
  console.log(aiPlan);
  if (!aiPlan)
    return NextResponse.json({
      message: " Something goes wrong, try again later",
    });
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

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
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
