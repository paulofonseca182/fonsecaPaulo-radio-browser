import "@/styles/globals.css";
import "@/components/Search/Search.css";
import "@/components/Favorites/Favorites.css";
import "@/pages/RadioBrowser/RadioBrowser.css";
import "@/components/CurrentRadioPlaying/CurrentRadioPlaying.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
