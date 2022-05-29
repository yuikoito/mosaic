import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/m-plus-rounded-1c';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { theme } from '../thema';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
