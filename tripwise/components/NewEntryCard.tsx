"use client";

import { createNewEntry } from "@/Utils/api";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();
  const handleOnClick = async () => {
    const data = await createNewEntry();

    router.push(`/plan/${data.id}`);
  };
  return (
    <div
      className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white  cursor-pointer shadow-lg"
      onClick={handleOnClick}
    >
      <div className=" px-4 py-5 sm:p:6 ">
        <span className="text-3xl ">+ new plan</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
