export const convertToSelectOptions = <T extends object>(
    array: T[],
    label: keyof T,
    value: keyof T = label,
) => {
    return array.map((item) => ({
        label: item[label],
        value: item[value],
    }));
};