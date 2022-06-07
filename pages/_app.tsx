import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { BlockchainStore, StoreProvider } from '../src/store'

const store = new BlockchainStore()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
