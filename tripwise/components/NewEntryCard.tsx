"use client";

const NewEntryCard = () => {
  const handleOnClick = async () => {};
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow cursor-pointer">
      <div className=" px-4 py-5 sm:p:6 " onClick={handleOnClick}>
        <span className="text-3xl ">+ new plan</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
