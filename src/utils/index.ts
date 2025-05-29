/* eslint-disable @typescript-eslint/no-explicit-any */
import { networkKey } from "@/constants/environment";

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

export function formatTimeAgo(blockTime: string): string {
  if (!blockTime) return "";
  const timestampDate = new Date(blockTime);
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - timestampDate.getTime();

  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  let timeAgo;

  if (daysDiff > 0) {
    timeAgo = `${daysDiff} days ago`;
  } else if (hoursDiff > 0) {
    timeAgo = `${hoursDiff} hours ago`;
  } else if (minutesDiff > 0) {
    timeAgo = `${minutesDiff} minutes ago`;
  } else {
    timeAgo = `${secondsDiff} seconds ago`;
  }

  return timeAgo;
}
export function getTxHashLink(txHash: string) {
  const link = `https://solscan.io/tx/${txHash}`;
  return networkKey === "devnet" ? link + `?cluster=devnet` : link;
}

export function getErrorToast(error: any, token?: string) {
  if (
    error?.code === 4001 ||
    error?.message?.includes("User rejected the request")
  ) {
    return {
      type: "warning",
      title: "Transaction Failed!",
      message:
        "The transaction was not completed because wallet approval was declined.",
    };
  } else if (
    error?.message?.includes("insufficient funds") ||
    error?.message?.includes("does not have enough balance") ||
    error?.message?.includes("InsufficientBalance")
  ) {
    return {
      type: "warning",
      title: "Transaction Failed!",
      message: `Insufficient ${
        token?.toUpperCase() || "SOL"
      } balance in your wallet! Please deposit more funds and try again.`,
    };
  } else {
    return {
      type: "error",
      title: "Unexpected Error!",
      message: "Something went wrong. Please try again.",
    };
  }
}
