"use client";
import { deleteEntry, getAllEntries } from "@/Utils/api";
import { getUserByClientID } from "@/Utils/auth";
import { prisma } from "@/Utils/db";
import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

type Entry = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  destination: string;
  arrivalDate: Date;
  departDate: Date;
};

function PlanPage() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const entries = await getAllEntries();
      setEntries(entries);
    };

    fetchData();
  }, []);
  const handleOnClick = async (id: string) => {
    await deleteEntry(id);
    const entries = await getAllEntries();
    setEntries(entries);
  };
  return (
    <div className="p-3 h-full" id="test">
      <h2 className="text-2xl mb-8 ">Trip Plans</h2>
      <div className="grid grid-cols-4 gap-3">
        <NewEntryCard />
        {entries
          ? entries.map((entry) => (
              <div
                key={entry.id}
                className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow flex flex-col justify-between"
              >
                <Link href={`/plan/${entry.id}`}>
                  <EntryCard entry={entry} />
                </Link>
                <button
                  className="px-4 py-4 bg-blue-400 "
                  onClick={(e) => handleOnClick(entry.id)}
                >
                  Delete
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default PlanPage;
