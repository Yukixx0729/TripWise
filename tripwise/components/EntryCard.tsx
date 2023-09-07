"use client";

import { deleteEntry } from "@/Utils/api";
import { useRouter } from "next/navigation";
const EntryCard = ({ entry }) => {
  const router = useRouter();
  console.log(entry.destination);
  const date = new Date(entry.createdAt).toDateString();
  const arrivalDate = new Date(entry.arrivalDate).toDateString();
  const departDate = new Date(entry.departDate).toDateString();
  const handleOnClick = async (id: string) => {
    await deleteEntry(id);
    router.push(`/plan`);
  };
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow flex flex-col">
      <div className="px-4 py-5 text-lg font-semibold text-neutral-800 font-mono">
        Location : {entry.destination}
      </div>
      <div className="px-4 py-5 ">Created : {date}</div>
      <div className="px-4 py-4 ">Arrive✈️ : {arrivalDate}</div>
      <div className="px-4 py-4 ">Depart🏠 : {departDate}</div>
      <button
        className="px-4 py-4 bg-blue-400 "
        onClick={(e) => handleOnClick(entry.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default EntryCard;
