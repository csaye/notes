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
        <title>Notes</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
