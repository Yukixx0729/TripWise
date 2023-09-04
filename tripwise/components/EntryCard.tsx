const EntryCard = ({ entry }) => {
  console.log(entry.destination);
  const date = new Date(entry.createdAt).toDateString();
  const arrivalDate = new Date(entry.arrivalDate).toDateString();
  const departDate = new Date(entry.departDate).toDateString();
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 text-lg font-semibold text-neutral-800 font-mono">
        Location : {entry.destination}
      </div>
      <div className="px-4 py-5 ">Created : {date}</div>
      <div className="px-4 py-4 ">Arrive✈️ : {arrivalDate}</div>
      <div className="px-4 py-4 ">Depart🏠 : {departDate}</div>
    </div>
  );
};

export default EntryCard;
