/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { TransitionLink } from "./link"
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils";


export const Card = ({ href, title, id, creator, avatar, user_id, blur=false, ranking }: {
  href: string,
  title: string,
  id: string,
  creator: string,
  avatar: string,
  user_id: string,
  blur?: boolean,
  ranking?: number
}) => {
  const [isTransition, setIsTransition] = useState(false);
  const [isLoaded, setIsLoadied] = useState(false)

  useEffect(() => {
    const img = new Image()
    const src = href
    img.src = src
    img.onload = () => {
      setIsLoadied(true)
    }
  }, [])

  return (
    <div className='drop-shadow-[0_20px_20px_rgba(189,219,219,1.00)] rounded-xl bg-white ease-out group relative'>
      {!!ranking && 
        <span className={cn("absolute top-4 left-4 rounded-full h-10 w-10 bg-black flex justify-center items-center z-50",
          ranking == 1 ? "bg-gradient-to-br from-amber-300 to-yellow-600" :
          ranking == 2 ? "bg-gradient-to-br from-gray-300 to-gray-600" :
          ranking == 3 ? "bg-gradient-to-br from-brown-400 to-brown-700" :
          "bg-gray-600"
        )}>
          <p className="flex text-white">{ranking}</p>
        </span>
      }
      <TransitionLink href={`/artworks/${id}`} onClick={() => {
        setIsTransition(true)
      }}>
        <div className='overflow-hidden rounded-xl relative' style={{
          viewTransitionName: isTransition ? `main-image-${id}` : ""
        }}>
          {isLoaded ?
            <img
              src={href}
              onLoad={() => {setIsLoadied(true)}}
              className={`object-cover aspect-square transition-transform duration-500 group-hover:scale-[1.1] ${blur ? "blur-md" : ""}`}
            ></img>
            :
            <Skeleton className="w-full aspect-square" />
          }
        </div>
      </TransitionLink>
      <div className='p-4 space-y-2'>
        <p className="font-semibold truncate">{title}</p>
        <Link href={`/users/${user_id}`}>
          <div className='flex gap-x-2 text-xs items-center mt-2'>
            <img
              src={avatar}
              className='object-cover aspect-square	w-5 h-5 rounded-full'
            ></img>
            {creator}
          </div>
        </Link>
      </div>
    </div>
  )
}

export const PCard = ({ href, prompt }: {
  href: string,
  prompt: string
}) => {
  const [isLoaded, setIsLoadied] = useState(false)

  useEffect(() => {
    const img = new Image()
    const src = href
    img.src = src
    img.onload = () => {
      setIsLoadied(true)
    }
  }, [])


  return (
    <div className='relative overflow-hidden rounded-xl drop-shadow-[0_20px_20px_rgba(189,219,219,1.00)] group select-none cursor-pointer'>
      {isLoaded ?
        <img
          src={href}
          className='object-cover aspect-[9/16] transition-transform duration-500 group-hover:scale-[1.1] '
        ></img>
        :
        <Skeleton className="w-full object-cover aspect-[9/16]" />
      }
      <p className="absolute bottom-0 left-0 px-4 pb-3.5 pt-32 w-full rounded-b-xl text-white font-semibold bg-gradient-to-t from-transparent/70 to-transparent text-sm">{prompt}</p>
    </div>
  )
}