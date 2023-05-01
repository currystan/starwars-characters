import Head from "next/head";
import GlobalStyle from "./styles/globalStyles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
