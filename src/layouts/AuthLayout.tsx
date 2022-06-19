import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { destroyCookie, setCookie } from 'nookies';
import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { useSharedState } from '../hooks/useSharedState';
import { useUnMosaicFaces } from '../hooks/useUnMosaicFaces';
import { ImageSchema } from '../models/ImageSchema';

const AuthLayout: React.FC = ({ children }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const { data } = useUnMosaicFaces();
  const [, setUnMosaicFaces] = useSharedState<ImageSchema[] | undefined>(
    'unMosaicFaces',
    []
  );
  useEffect(() => {
    if (user && user.getSignInUserSession()?.getIdToken().getJwtToken()) {
      setCookie(
        null,
        'idToken',
        user.getSignInUserSession()?.getIdToken().getJwtToken() as string
      );
      setUnMosaicFaces(data);
    }
    return () => {
      destroyCookie(null, 'idToken');
    };
  }, [user]);
  return (
    <Authenticator socialProviders={['google']} signUpAttributes={['email']}>
      {() => (
        <Box bgColor="gray.50">
          <Header />
          <Box boxShadow="sm" p="6" rounded="md" bg="white">
            {children}
          </Box>
        </Box>
      )}
    </Authenticator>
  );
};

export default AuthLayout;
