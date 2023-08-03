import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTransitionRouterPush } from '@/hooks/useTransitionRouterPush'
import { ThemeProvider } from "@/components/theme-provider"
import { DefaultSeo } from 'next-seo';

function H1(props: {children?: ReactNode}) {
  return <h1 className='text-2xl font-semibold mt-8'>{props.children}</h1>
}

function H2(props: {children?: ReactNode}) {
  return <h2 className='text-xl font-semibold mt-8'>{props.children}</h2>
}

function P(props: {children?: ReactNode}) {
  return <p className='leading-7 [&:not(:first-child)]:mt-6'>{props.children}</p>
}

function Ul(props: {children?: ReactNode}) {
  return <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>{props.children}</ul>
}

function Ol(props: {children?: ReactNode}) {
  return <ol className='my-6 ml-6 list-decimal [&>li]:mt-2'>{props.children}</ol>
}

const components = {
  h1: H1,
  h2: H2,
  p: P,
  ol: Ol,
  ul: Ul
}

export default function App({ Component, pageProps }: AppProps) {
  const { routerPushWithTransition } = useTransitionRouterPush();
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(({ as }) => {
      routerPushWithTransition(as);
      return false;
    });
  }, [router, routerPushWithTransition]);

  return (
    <MDXProvider components={components}>
      <ThemeProvider>
        <DefaultSeo
          defaultTitle="AIPIC"
          titleTemplate='%s | AIPIC'
          title = {undefined}
          description="AIPIC（あいぴく）は、🧙AIを利用して創られた🎨イラスト作品🖼の投稿サイトです!"
          openGraph={{
            type: "website",
            title: "AIPIC",
            description: "AIPIC（あいぴく）は、🧙AIを利用して創られた🎨イラスト作品🖼の投稿サイトです!",
            site_name: "AIPIC",
            url: "https://aipic.app",
          }}
          twitter={{
            handle: '@fkunn1326',
            site: '@fkunn1326',
            cardType: "summary_large_image",
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </MDXProvider>
  )
}
