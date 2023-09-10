"use client";

import { getSingleEntry, updateContent, updateEntry } from "@/Utils/api";
import { useEffect, useState } from "react";

type Entry = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  destination: string;
  arrivalDate: Date;
  departDate: Date;
  plan: {
    content: string;
  };
};

const defaultEntry: Entry = {
  id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  destination: "",
  arrivalDate: new Date(),
  departDate: new Date(),
  plan: {
    content: "",
  },
};

type FormProps = {
  id: string;
};

const Form: React.FC<FormProps> = ({ id }) => {
  const [entry, setEntry] = useState<Entry>(defaultEntry);
  const [destination, setdestination] = useState(entry.destination);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const entry = await getSingleEntry(id);
      setEntry(entry);
      setValue(entry.plan.content);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    let date1 = new Date(arrivalDate);
    date1.setHours(0, 0, 0, 0);
    let date2 = new Date(departDate);
    date2.setHours(0, 0, 0, 0);
    let current = new Date();
    current.setHours(0, 0, 0, 0);

    if (date1 < current || date2 < date1) {
      setError("Invalid date");
      setLoading(false);
      return;
    }

    await updateEntry(
      destination,
      date1.toISOString(),
      date2.toISOString(),
      entry.id
    );
    setLoading(false);
    const singleEntry = await getSingleEntry(entry.id);
    setValue(singleEntry.plan.content);
  };

  const handleOnclick = async () => {
    setLoading(true);

    await updateContent(value, entry.id);
    setLoading(false);
    const singleEntry = await getSingleEntry(entry.id);
    setValue(singleEntry.plan.content);
  };

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit} className="flex flex-col p-7 ">
        <div className="shadow-md">
          <h1 className="text-2xl mb-5">Start your ideal trip here!</h1>
          <div className="mb-2 ">
            <label className="text-lg">City : </label>
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
          <div className="mb-2 ">
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
            <button
              className="bg-blue-400 px-4 py-2 rounded-lg mt-2"
              type="submit"
            >
              Submit
            </button>
          </div>
          {error && <div className="text-red-400">{error}</div>}
        </div>
      </form>
      <div className="w-full h-full ">
        <div>
          <h1 className="text-center text-2xl mb-4 mt-4">My Trip Plan🌞</h1>
          {loading && <div>...Your trip plan is being generated.</div>}
          {!loading && (
            <div className="flex flex-col min-h-fit">
              <textarea
                className="w-full p-8 min-h-[500px] outline-none border-2 border-slate-300 "
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="mt-4">
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
