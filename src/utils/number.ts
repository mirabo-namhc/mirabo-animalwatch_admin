import { ALPHABET_AND_LESS_THAN_O_REGEX, ALPHABET_REPLACE, DECIMAL } from "~constants/regex";

export const replacePositionRangeNumber = (
    value?: string,
    posStart?: number,
    posEnd?: number,
    fixNumber?: number,
) => {
    const dynamicRegex = posStart
        ? ALPHABET_AND_LESS_THAN_O_REGEX
        : ALPHABET_REPLACE;
    const replaceChr = value?.trim()?.replace(dynamicRegex, "") || '';
    const num = parseFloat(replaceChr);

    if (posStart && num < posStart) return `${posStart}`;
    if (posEnd && num > posEnd) return `${posEnd}`;

    switch (fixNumber) {
        case 2:
            return replaceChr?.replace(/(\d+\.\d{2})\d+/, "$1")?.replace(DECIMAL, "");
        default:
            return replaceChr
                ?.replace(/(\d+\.\d{15})\d+/, "$1")
                ?.replace(DECIMAL, "");
    }
};
