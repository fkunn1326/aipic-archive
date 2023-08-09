import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Copy, Eye, Heart, Share } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/card";
import { InferGetStaticPropsType } from "next";
import { Fragment, use } from "react";
import { getUrl, sliceByNumber } from "@/lib/utils"
import { NextSeo } from 'next-seo';

export const getStaticPaths = async () => {
  const profiles = (await import("../../data/profiles.json")).default;

  return {
    paths: profiles.map((i) => {return {params: {slug: [i.uid]}}}),
    fallback: true,
  }
}


export const getStaticProps = async ({ params }: {
  params: {
    slug: string[]
  }
}) => {
  const profiles = (await import("../../data/profiles.json")).default;
  const artworks = (await import("../../data/artworks.json")).default;
  const profile = profiles.filter((i) => {return i.uid === params.slug[0]})
  const idx = params.slug.length > 1 ? parseInt(params.slug[1]) : 0

  if (profile.length < 0) {
    return {
      notFound: true,
    }
  }

  const user = profile[0]

  if (!user) {
    return {
      notFound: true,
    }
  }

  const Artwork = artworks.filter((i) => {
    return i.user_id === user.id
  })

  const userArtworks = sliceByNumber(Artwork, 10)[idx] || []

  const length = Math.max(1, Math.ceil(Artwork.length / 10))

  return { props: { user, userArtworks, length, idx } }
}

export default function User({ user, userArtworks, length, idx }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo
        title={`${user?.name}さんの作品`}
        description={user?.introduce}
      />
      <section className="space-y-8">
        <img
          src={getUrl(user?.header_url)}
          className='object-cover w-full max-h-[40vh] rounded-xl'
        ></img>
        <div className="flex items-end gap-x-4">
          <Link href={`/users/${user?.uid}`} className='flex gap-x-4 text-xl font-semibold items-center'>
            <img
              src={getUrl(user?.avatar_url)}
              className='object-cover aspect-square	w-10 h-10 rounded-full'
            ></img>
            {user?.name}
          </Link>
        </div>
        <div className="w-full">
          <div>{user?.introduce.split("\n").map((i) =>{
            return (
              <Fragment key={i}>
              {i.startsWith("http") ? <a>{i}</a>
              : i.startsWith("\n") ? <br />
              : <p>{i}</p>}
              </Fragment>
            )
          })}</div>
        </div>
        <div className='grid image-grid'>
          {userArtworks?.map((i) => {
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
            <Link href={`/users/${user?.uid}/0`} scroll={false}>
              <ChevronsLeft className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="icon" variant="outline" disabled={idx==0} asChild={idx!=0}>
            <Link href={`/users/${user?.uid}/${idx-1}`} scroll={false}>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
          <p>
            {idx}/{length-1}
          </p>
          <Button size="icon" variant="outline" asChild={idx!=length-1} disabled={idx==length-1}>
            <Link href={`/users/${user?.uid}/${idx+1}`} scroll={false}>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="icon" variant="outline" asChild>
            <Link href={`/users/${user?.uid}/${length-1}`} scroll={false}>
              <ChevronsRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}