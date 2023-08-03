/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { InferGetStaticPropsType } from "next";
import { Copy, Eye, Heart, Share } from "lucide-react"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from "next/link";
import { Card } from "@/components/card";
import { Fragment } from "react";
import { NextSeo } from "next-seo";

export const getStaticPaths = async () => {
  const artworks = (await import("../../data/artworks.json")).default;

  return {
    paths: artworks.map((i) => {return {params: {id: i.id}}}),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: {
  params: {
    id: string
  }
}) => {
  const artworks = (await import("../../data/artworks.json")).default;
  const emojis = (await import("../../data/emojis.json")).default;
  const artwork = artworks.find((i) => {return i.id === params.id})
  const safe = artworks.filter((i) => {return i.age_limit === "all"})?.slice(0, 10)
  if (!artwork) {
    return {
      notFound: true,
    }
  }

  return { props: { safe, artwork, emojis } }
}

const ImageSlide = ({ hrefs, id }: {
  hrefs: string[],
  id: string
}) => {

  return (
    <Splide className='max-h-[90vh]'>
      <SplideSlide key={hrefs?.[0]}>
        <div className="flex justify-center items-center" style={{
              viewTransitionName: `main-image-${id}`
            }}>
          <img
            className='max-h-[90vh]'
            src={hrefs?.[0]}
          ></img>
        </div>
      </SplideSlide>
      {hrefs?.slice(1).map((item) => {
        return (
          <SplideSlide key={item}>
            <div className="flex justify-center items-center">
              <img
                className='max-h-[90vh]'
                src={item}
              ></img>
            </div>
          </SplideSlide>
        )
      })}
    </Splide>
  )
}

const ShareButton = ({title, url, description}: {
  title: string,
  url: string,
  description: string
}) => {
  const handleShare = async() => {
    if (!window.navigator.share) {
      return;
    }
    try {
      await window.navigator.share({
        title: title,
        text: description,
        url: url,
      });
    } catch (e: any) {
      return
    }
  }

  return (
    <button onClick={handleShare}>
      <Share className="w-5 h-5" />
    </button>
  )
}

export default function Artwork({ safe, artwork, emojis }: InferGetStaticPropsType<typeof getStaticProps>) {
  const getEmoji = (id: string) => {
    return emojis.filter((item) => {return item.key === id.replaceAll(":", "")})[0].values || ""
  }

  return (
    <>
      <NextSeo
        title={`${artwork?.title} ${artwork?.profile?.name}さんの作品`}
        description={`${artwork?.caption}`}
        openGraph={{
					title: `${artwork?.title} ${artwork?.profile?.name}さんの作品`,
					description: `${artwork?.caption}`,
					images: [
						{
							url: `${artwork?.href}`,
						},
					],
				}}
      />
      <section className="space-y-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex justify-center items-center">
            <ImageSlide hrefs={artwork?.images.map((i) => {
              return i.href
            })} id={artwork?.id} />
          </div>
          <div className="col-span-1 space-y-4">
            <h1 className="text-xl font-semibold">{artwork?.title}</h1>
            <div>{artwork?.caption?.split("\n").map((i) =>{
              return (
                <Fragment key={i}>
                {i.startsWith("http") ? <a>{i}</a>
                : i.startsWith("\n") ? <br />
                : <p>{i}</p>}
                </Fragment>
              )
            })}</div>
            <div className="flex flex-wrap gap-2">
              {artwork?.tags.split(/#|,|\s/).filter(Boolean).map((i) => {
                return (
                  <Link href="/" key={i} className="bg-gray-200 text-sm px-2 py-0.5 rounded-md">{i}</Link>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {artwork?.reactions.map((i) => {
                return (
                  <p key={i.id} className="border cursor-pointer select-none border-gray-300 text-sm px-2 py-0.5 rounded-md">
                    {getEmoji(i.emoji_id)}1
                  </p>
                )
              })}
            </div>
            <div className="flex justify-between">
              <div className="flex gap-x-6">
                <span className="flex items-center gap-x-1">
                  <Heart className="w-4 h-4" />
                  {artwork?.likes}
                </span>
                <span className="flex items-center gap-x-1">
                  <Eye className="w-4 h-4" />
                  {artwork?.views}
                </span>
                <span className="flex items-center gap-x-1">
                  <Copy className="w-4 h-4" />
                  {artwork?.copies}
                </span>
              </div>
              <ShareButton title={artwork?.title || ""} description={artwork?.caption || ""} url={`https://aipic.vercel.app/artworks/${artwork?.id}`} />
            </div>
            <Link href={`/users/${artwork?.profile.uid}`} className='flex gap-x-2 font-semibold items-center'>
              <img
                src={artwork?.profile.avatar_url}
                className='object-cover aspect-square	w-8 h-8 rounded-full'
              ></img>
              {artwork?.profile.name}
            </Link>
          </div>
        </div>
        <div className='flex justify-between items-end pt-8'>
          <h2 className='text-xl'>その他の作品</h2>
          <Link href="/" className='text-xs'>すべて見る</Link>
        </div>
        <div className='grid image-grid'>
          {safe?.slice(0, 5).map((i) => {
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
      </section>
    </>
  )
}
