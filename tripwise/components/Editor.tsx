"use client";

import { generatePlan } from "@/Utils/ai";
import { updateEntry } from "@/Utils/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Form = ({ entry }) => {
  const router = useRouter();
  const [destination, setdestination] = useState(entry.destination);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(entry.plan ? entry.plan.content : " ");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(destination, arrivalDate, departDate);
    let date1 = arrivalDate + "T00:00:00.000Z";
    let date2 = departDate + "T00:00:00.000Z";
    const updated = await updateEntry(destination, date1, date2, entry.id);

    setLoading(false);
    router.push(`/plan/${entry.id}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-7">
          <h1 className="text-2xl mb-5">Start your ideal trip here!</h1>
          <div className="mb-2">
            <label className="text-lg">Location: </label>
            <input
              className="ml-2 border-2 border-black-500"
              name="destination"
              type="text"
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-lg">Arrival date: </label>
            <input
              name="arrivalDate"
              type="date"
              className="ml-2 border-2 border-black-500"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-lg">Depart date: </label>
            <input
              name="departDate"
              className="ml-2 border-2 border-black-500"
              type="date"
              placeholder="Enter your depart date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 ">
            <button className="bg-blue-400 px-4 py-2 rounded-lg " type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="w-full h-full ">
        <div>
          {loading && <div>...loading</div>}
          <textarea
            className="w-full h-screen p-8  outline-none "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
