import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function flattenAndRemoveDuplicates(arr: any) {
  const flattenedArray = arr?.flat(Infinity)

  const uniqueArray = [...new Set(flattenedArray)]

  return uniqueArray
}

export const shortenText = (text: string, maxLength = 50) => {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}



