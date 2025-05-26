/* eslint-disable no-unsafe-optional-chaining */
export const getAddressFormat = (address: string | undefined, end?: number) => {
  if (!address) return "";
  const frontText = address.slice(0, end ?? 4);
  const endText = address.slice(-(end ?? 4));
  return `${frontText}...${endText}`;
};

export const formatAmount = (value: string | number) => {
  if (!value) return "0";

  const [intPart, decimalPart] = (
    typeof value === "number" ? value?.toString() : value
  ).split(".");
  const formattedInt = Number(intPart || "0").toLocaleString("en-US");

  return decimalPart !== undefined
    ? `${formattedInt}.${decimalPart}`
    : formattedInt;
};

export function hasDecimalPart(num: number | string) {
  const number = typeof num === "string" ? +num : num;
  return Math.floor(number) !== number;
}

export function getNumberFixed(number: number, fix?: number) {
  if (!number) return 0;
  if (!hasDecimalPart(number)) return number;
  return +number.toFixed(fix ? fix : 4);
}
