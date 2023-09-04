import { getUserByClientID } from "@/Utils/auth";
import { prisma } from "@/Utils/db";
import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";

import Link from "next/link";

const getAllEntries = async () => {
  const user = await getUserByClientID();
  const entries = await prisma.planEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(entries);
  return entries;
};

const PlanPage = async () => {
  const entries = await getAllEntries();
  return (
    <div className="p-3 h-full">
      <h2 className="text-2xl mb-8 ">Trip Plans</h2>
      <div className="grid grid-cols-4 gap-3">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/plan/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlanPage;
