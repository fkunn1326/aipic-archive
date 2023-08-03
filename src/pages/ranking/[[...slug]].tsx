import { Card } from "@/components/card";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { sliceByNumber } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NextSeo } from "next-seo";

export async function getStaticPaths() {
  const arr = [0,1].map((i) => {return {params: {slug: [i.toString()]}}})
  arr.push({params: {slug: []}})
  return {
    paths: arr,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: {
  params: {
    slug: string[]
  }
}) => {
  const Ranking = (await import("../../data/ranking.json")).default;
  const idx = params.slug ? parseInt(params.slug[0]) : 0
  const length = Math.ceil(Ranking.length / 25)
  const ranking = sliceByNumber(Ranking, 25)[idx]

  return {
    props: {
      ranking,
      idx,
      length
    }
  }
}

export default function Ranking({ ranking, idx, length }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo
        title="総合ランキング"
        description="1位~50位までのランキングです"
      />
      <div>
        <div className='flex justify-between items-end'>
          <h2 className='text-xl'>総合ランキング</h2>
          <Link href="/" className='text-xs'>すべて見る</Link>
        </div>
        <div className='pt-8 image-grid'>
          {ranking?.map((i, index) => {
            return (
              <Card
                key={i.id}
                href={i.href}
                title={i.title as string}
                id={i.id}
                creator={i.profile.name}
                avatar={i.profile.avatar_url}
                user_id={i.profile.uid}
                ranking={index+1+idx*25}
              />
            )
          })}
        </div>
        <div className="pt-6 flex justify-center items-center gap-x-2">
          <Button size="icon" variant="outline" disabled={idx==0} asChild={idx!=0}>
            <Link href={`/ranking/0`} scroll={false}>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
          <p>
            {idx}/{length-1}
          </p>
          <Button size="icon" variant="outline" disabled={idx==1} asChild={idx!=1}>
            <Link href={`/ranking/1`} scroll={false}>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}