import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { trpc } from '../utils/trpc'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import Layout from '../components/Layout'

// 2. Extend the theme to include custom colors, fonts, etc
const theme = {
  colors: {
    brand: {
      primary: '#990303',
    },
  },
}
const brandTheme = extendTheme(theme)

const MyApp: AppType<{ session: Session | null }> = ({ Component, router, pageProps: { session, ...pageProps } }) => {
  if (router.pathname.startsWith('/autenticacao/')) {
    return (
      <SessionProvider session={session}>
        <ChakraProvider theme={brandTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    )
  }

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={brandTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
