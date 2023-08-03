import { Card } from "@/components/card"

export default function Search() {
  return (
    <section className="space-y-16">
      <input className="w-full p-6 rounded-full outline-none transition-all duration-500 focus:drop-shadow-[0_10px_10px_rgba(189,219,219,1.00)]" placeholder="キーワードを入力（アーカイブのため、無効化されています）"></input>
    </section>
  )
}