import { Card } from "@/components/card";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { sliceByNumber } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { NextSeo } from "next-seo";

export async function getStaticPaths() {
  const Artworks = (await import("../../data/artworks.json")).default;
  const length = Math.ceil(Artworks.length / 25)
  const arr = Array.from(Array(length), (v, k) => k).map((i) => {
    return (
        {params: {slug: [i.toString()]}}
    )
  })
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
  const Artworks = (await import("../../data/artworks.json")).default;
  const idx = params.slug ? parseInt(params.slug[0]) : 0
  const length = Math.ceil(Artworks.length / 25)
  const artworks = sliceByNumber(Artworks, 25)[idx]

  return {
    props: {
      artworks,
      idx,
      length
    }
  }
}

export default function All({ artworks, idx, length }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo
        title="全ての作品"
        description="AIPICに投稿された全ての作品です"
      />
      <div>
        <div className='flex justify-between items-end'>
          <h2 className='text-xl'>全ての作品</h2>
        </div>
        <div className='pt-8 image-grid'>
          {artworks?.map((i, index) => {
            return (
              <Card
                key={i.id}
                href={i.href}
                title={i.title as string}
                id={i.id}
                creator={i.profile.name}
                avatar={i.profile.avatar_url}
                user_id={i.profile.uid}
                blur={i.age_limit !== "all"}
              />
            )
          })}
        </div>
        <div className="pt-6 flex justify-center items-center gap-x-2">
          <Button size="icon" variant="outline" asChild>
            <Link href={`/all`} scroll={false}>
              <ChevronsLeft className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="icon" variant="outline" disabled={idx==0} asChild={idx!=0}>
            <Link href={`/all/${idx-1}`} scroll={false}>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
          <p>
            {idx}/{length-1}
          </p>
          <Button size="icon" variant="outline" asChild={idx!=length-1} disabled={idx==length-1}>
            <Link href={`/all/${idx+1}`} scroll={false}>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="icon" variant="outline" asChild>
            <Link href={`/all/${length-1}`} scroll={false}>
              <ChevronsRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}