import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { destroyCookie, setCookie } from 'nookies';
import React, { useEffect } from 'react';
import { Header } from '../components/Header';

const AuthLayout: React.FC = ({ children }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  useEffect(() => {
    if (user && user.getSignInUserSession()?.getIdToken().getJwtToken()) {
      setCookie(
        null,
        'idToken',
        user.getSignInUserSession()?.getIdToken().getJwtToken() as string
      );
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
