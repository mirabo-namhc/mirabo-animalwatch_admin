const sortHelper = {
  number(a: number, b: number) {
    return a - b;
  },
  string(a: string, b: string) {
    return a.localeCompare(b);
  },
  dateTime(a: string, b: string) {
    return new Date(a).getTime() - new Date(b).getTime();
  },
};

export const getTotal = (total_page?: number | `${number}`, per_page?: number | `${number}`) => {
  return Number(total_page ?? 1) * Number(per_page ?? 1);
};

export const getNoTable = (index: number, current_page?: number, per_page?: number) => {
  if (!current_page || !per_page) return index + 1
  return index + 1 + ((current_page - 1) * per_page)
};

export default sortHelper;
