"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { getAllEntries } from "@/Utils/api";

const apikey = process.env.NEXT_PUBLIC_API_KEY;

type Entry = {
  lat: number;
  lng: number;
  destination: string;
  id: string;
};

const Map = () => {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [current, setCurrent] = useState({
    lat: -37.840935,
    lng: 144.946457,
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apikey || "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      if (position) {
        await setCurrent({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    });
  }, [isLoaded]);

  useEffect(() => {
    async function getLocations() {
      const entries = await getAllEntries();
      setEntries(entries);
    }
    getLocations();
  }, []);

  return (
    <div style={{ width: "100%", height: "70vh" }}>
      {isLoaded ? (
        <GoogleMap
          center={current}
          zoom={2}
          mapContainerStyle={{
            width: "100%",
            height: "70vh",
          }}
        >
          {entries &&
            entries.map(
              ({
                lat,
                lng,
                destination,
                id,
              }: {
                lat: number;
                lng: number;
                destination: string;
                id: string;
              }) => {
                return (
                  <MarkerF key={id} position={{ lat: lat, lng: lng }}>
                    <div>{destination}</div>
                  </MarkerF>
                );
              }
            )}
        </GoogleMap>
      ) : null}
    </div>
  );
};

export default Map;
