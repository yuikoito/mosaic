import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/m-plus-rounded-1c';
import { Amplify } from 'aws-amplify';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { theme } from '../thema';

Amplify.configure({
  aws_project_region: process.env.AWS_PROJECT_REGION,
  aws_cognito_region: process.env.AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_CLIENT_ID,
  ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Authenticator.Provider>
  );
}

export default MyApp;
