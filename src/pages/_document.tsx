import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {process.env.NODE_ENV === "development" &&
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          </>
        }
      </Head>
      <body className={`${process.env.NODE_ENV === "development" ? "!font-['Noto_Sans_JP']" : ""} relative pb-60 box-border`}>
        <Header />
          <main  className="min-h-screen pt-6 pb-24 px-6 md:px-12 lg:px-36">
            <Main />
          </main>
          <NextScript />
        <Footer />
      </body>
    </Html>
  )
}
