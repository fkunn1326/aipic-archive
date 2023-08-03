import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sliceByNumber = (array: any[], number: number) => {
  const length = Math.ceil(array.length / number)
  return new Array(length).fill(0).map((_, i) =>
    array.slice(i * number, (i + 1) * number)
  )
}