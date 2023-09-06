const createURL = (path: string) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const res = await fetch(new Request(createURL("/api/plan")), {
    method: "POST",
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const updateEntry = async (
  destination: string,
  arrivalDate: string,
  departDate: string,
  id: string
) => {
  const res = await fetch(
    new Request(createURL(`/api/plan/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ destination, arrivalDate, departDate }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
