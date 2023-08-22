import { useCurrentUser } from '@/hooks/useCurrentUser'
import '@/styles/globals.scss'
import { firebaseConfig } from '@/utils/firebaseConfig'
import { getApps, initializeApp } from 'firebase/app'
import type { AppProps } from 'next/app'
import Head from 'next/head'

if (!getApps().length) {
  initializeApp(firebaseConfig)
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  useCurrentUser()

  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel='icon' href='/favicons/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicons/favicon-16x16.png'
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
