export const empty = (mes = "") => ({
    validator(_: unknown, value?: string) {
        const stringify = value?.toString();

        if (value === undefined || value === null || stringify?.trim() === "") {
            return Promise.reject(new Error(mes));
        }
        return Promise.resolve();
    },
});