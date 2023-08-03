import { Github, Twitter } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="absolute w-full h-60 bottom-0 p-12 mb-12 space-y-8 md:grid grid-cols-5">
      <div className="col-span-2 space-y-4">
        <span className="text-2xl font-semibold">AIPIC</span>
        <p className="text-gray-700">AIPICはAI生成画像の投稿サイトです</p>
        <div className="flex gap-x-2">
          <a href="https://github.com/fkunn1326/aipic" target="_blank" rel="noopener noreferrer" className="rounded-full hover:bg-gray-200 p-2">
            <Github />
          </a>
          <a href="https://twitter.com/fkunn1326" target="_blank" rel="noopener noreferrer" className="rounded-full hover:bg-sky-100 p-2">
            <Twitter />
          </a>
        </div>
      </div>
      <div/>
      <div className="grid grid-cols-2 col-span-2">
        <div className="flex flex-col gap-y-4 text-sm">
          <span className="text-xl font-semibold">Legal</span>
          <Link href="/tos">利用規約</Link>
          <Link href="/privacy_policy">プライバシーポリシー</Link>
          <Link href="/guideline">ガイドライン</Link>
        </div>
        <div className="flex flex-col gap-y-4 text-sm">
          <span className="text-xl font-semibold">Links</span>
          <a href="https://twitter.com/fkunn1326" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://github.com/fkunn1326/aipic" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfrqy-F_zt2J8701GxIqFLfNBhBvihNATa0oE0dt3qKCm71Cg/viewform" target="_blank" rel="noopener noreferrer">ご意見・ご要望</a>
        </div>
      </div>
    </footer>
  )
}