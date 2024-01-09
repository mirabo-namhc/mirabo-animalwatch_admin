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

export const getTotal = (maxPage?: number | `${number}`, maxNum?: number | `${number}`) => {
  return Number(maxPage ?? 1) * Number(maxNum ?? 1);
};

export default sortHelper;
