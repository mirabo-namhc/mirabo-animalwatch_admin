export const sortDataTable = (a, b, sort = "asc") => {
  if (sort === "asc") {
    return a.id - b.id;
  }

  return b.id - a.id;
};
