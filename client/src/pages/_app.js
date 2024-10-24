import "@/styles/globals.css";
import { WalletProvider } from './contexts/walletContext';
import Head from "next/head";
import Navbar from "./components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Head>
        <title>Bookia: connecting people</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </WalletProvider>
  )
}
