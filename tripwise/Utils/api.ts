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

export const deleteEntry = async (id: string) => {
  const res = await fetch(
    new Request(createURL(`/api/plan/${id}`), {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
  );
};

export const updateContent = async (content: string, id: string) => {
  const res = await fetch(
    new Request(createURL(`/api/content/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const getAllEntries = async () => {
  const res = await fetch(
    new Request(createURL(`/api/plan`), {
      method: "GET",
    })
  );
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return data.data;
  }
};

export const getSingleEntry = async (id: string) => {
  const res = await fetch(
    new Request(createURL(`/api/plan/${id}`), {
      method: "GET",
    })
  );
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return data.data;
  }
};
