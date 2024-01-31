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


export const filterDuplicateIds = <T extends { id?: number }>(items: T[]): T[] => {
    const seenIds = new Set<number>();
    const filteredItems: T[] = [];

    for (const item of items) {
        if (item.id && !seenIds.has(item.id)) {
            seenIds.add(item.id);
            filteredItems.push(item);
        }
    }

    return filteredItems;
}

export const swapItemsById = <T extends { id?: number, order?: number }>(items: T[], id1?: number, id2?: number): T[] => {
    const index1 = items.findIndex(item => item.id === id1);
    const index2 = items.findIndex(item => item.id === id2);

    if (index1 !== -1 && index2 !== -1) {
        const newItems = [...items];
        const orderItem1 = newItems[index1].order
        const orderItem2 = newItems[index2].order

        newItems[index1].order = orderItem2;
        newItems[index2].order = orderItem1;
        [newItems[index1], newItems[index2]] = [newItems[index2], newItems[index1]];

        return newItems;
    }

    return items;
}