import { Monitor, Moon, Search, Sun } from "lucide-react"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="flex justify-between items-center w-full px-8 md:px-12 lg:px-24 py-8">
      <Link href="/" className="flex items-center gap-x-2 select-none">
        <span className="text-2xl font-medium">AIPIC</span>
        <span className="bg-sky-500 text-white text-[0.5rem] p-0.5 px-1 rounded-sm">アーカイブ</span>
      </Link>
      <div className="flex gap-x-2 items-center">
        <Link href="/search">
          <Search />
        </Link>
      </div>
    </header>
  )
}