import { HScroll } from '@/components/hscroll'
import { Button } from '@/components/ui/button'
import { Card, PCard } from '@/components/card'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const getStaticProps = async () => {
  const artworks = (await import("../data/artworks.json")).default;
  const safes = artworks.filter((i) => {return i.age_limit === "all"})
  const safe = safes.slice(0, 10)
  const seed = Math.floor(Math.random()*safes.length)
  const random = safes.slice(seed, seed+10)

  const tags = (await import("../data/tags.json")).default.slice(0, 10);
  const ranking = (await import("../data/ranking.json")).default.slice(0, 5);
  const pranking = (await import("../data/pranking.json")).default;

  return { props: { safe, random, tags, ranking, pranking } }
}


export default function Home({ safe, random, tags, ranking, pranking }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <section className="space-y-16">
      <HScroll className='flex overflow-x-auto gap-x-4 w-full hide-scroll'>
        {tags?.map((i) => {
          return (
            <div key={i.tags} className='bg-white text-sm px-6 py-2 w-auto whitespace-nowrap rounded-full cursor-pointer font-medium'>
              #{i.tags}
            </div>
          )
        })}
      </HScroll>
      <div className='flex gap-x-4 justify-end'>
        <Button variant="black" size="lg" asChild>
          <Link href="/">
            全年齢
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="white" size="lg">
              NSFW
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当に表示しますか？</AlertDialogTitle>
              <AlertDialogDescription>
                未成年や職場での閲覧に不適切な画像が含まれます
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href="/nsfw">
                  続ける
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div>
        <div className='flex justify-between items-end'>
          <h2 className='text-xl'>新着</h2>
          <Link href="/all" className='text-xs'>すべて見る</Link>
        </div>
        <div className='pt-8 image-grid'>
          {safe.map((i) => {
            return (
              <Card
                key={i.id}
                href={i.href}
                title={i.title as string}
                id={i.id}
                creator={i.profile.name}
                avatar={i.profile.avatar_url}
                user_id={i.profile.uid}
              />
            )
          })}
        </div>
      </div>
      <div>
        <div className='flex justify-between items-end'>
          <h2 className='text-xl'>総合ランキング</h2>
          <Link href="/ranking" className='text-xs'>すべて見る</Link>
        </div>
        <div className='pt-8 image-grid'>
          {ranking.map((i, idx) => {
            return (
              <Card
                key={i.id}
                href={i.href}
                title={i.title as string}
                id={i.id}
                creator={i.profile.name}
                avatar={i.profile.avatar_url}
                user_id={i.profile.uid}
                ranking={idx+1}
              />
            )
          })}
        </div>
      </div>
      <div>
        <div className='flex justify-between items-end'>
          <h2 className='text-xl'>人気のプロンプト</h2>
        </div>
        <div className='pt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8'>
          {pranking.map((i) => {
            return (
              <PCard href={i?.href} prompt={i?.rank} key={i?.id} />
            )
          })}
        </div>
      </div>
      <div>
        <div className='flex justify-between items-end'>
          <h2 className='text-xl'>ランダム</h2>
          <Link href="/all" className='text-xs'>すべて見る</Link>
        </div>
        <div className='pt-8 image-grid'>
          {random.map((i) => {
            return (
              <Card
                key={i.id}
                href={i.href}
                title={i.title as string}
                id={i.id}
                creator={i.profile.name}
                avatar={i.profile.avatar_url}
                user_id={i.profile.uid}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
