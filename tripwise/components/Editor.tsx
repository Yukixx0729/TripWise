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
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let date1 = new Date(arrivalDate);
    let date2 = new Date(departDate);
    let current = new Date();
    if (date1 > current || date2 <= date1) {
      setError("Invalid date");
      setLoading(false);
      return;
    }

    const updated = await updateEntry(destination, date1, date2, entry.id);
    setLoading(false);
    // setValue(updated.updatePlan.content);
    router.push(`/plan/${entry.id}`);
  };

  const handleOnclick = async () => {};

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
          {error && <div className="text-red-400">{error}</div>}
        </div>
      </form>
      <div className="w-full h-full ">
        <div>
          <h1 className="text-center text-2xl">My Trip Plan🌞</h1>
          {loading && <div>...loading</div>}
          {!loading && (
            <div className="flex flex-row">
              <textarea
                className="w-full h-screen p-8  outline-none "
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div>
                {" "}
                <button
                  className="bg-blue-400 px-4 py-2 rounded-lg "
                  onClick={handleOnclick}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
