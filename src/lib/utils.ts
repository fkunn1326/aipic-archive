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

export const getUrl = (href: string) => {
  if (!href) return href
  if (href.startsWith("https://imagedelivery.net/oqP_jIfD1r6XgWjKoMC2Lg/")){
    return href.replace("https://imagedelivery.net/oqP_jIfD1r6XgWjKoMC2Lg/", "/images/").replace("/public", ".png")
  }
  return href
}