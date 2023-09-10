"use client";

import { deleteEntry } from "@/Utils/api";
import { useRouter } from "next/navigation";

const EntryCard = ({ entry }: any) => {
  const date = new Date(entry.createdAt).toDateString();
  const arrivalDate = new Date(entry.arrivalDate).toDateString();
  const departDate = new Date(entry.departDate).toDateString();

  return (
    <div>
      <div className="px-4 py-5  font-semibold text-neutral-800 font-mono ">
        Location✈️ : {entry.destination}
      </div>
      <div className="px-4 py-5 ">Created🗓️ : {date}</div>
      <div className="px-4 py-4 ">Arrive✈️ : {arrivalDate}</div>
      <div className="px-4 py-4 ">Depart🏠 : {departDate}</div>
    </div>
  );
};

export default EntryCard;
