import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/m-plus-rounded-1c';
import type { AppProps } from 'next/app';
import DefaultLayout from '../src/layouts/DefaultLayout';
import '../src/libs/amplify';
import '../styles/globals.css';
import { theme } from '../thema';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <ChakraProvider theme={theme}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ChakraProvider>
    </Authenticator.Provider>
  );
}

export default MyApp;
