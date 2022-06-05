import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect } from 'react';
import Sidebar from '../components/SideBar';

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
        <Sidebar>
          <Box boxShadow="sm" p="6" rounded="md" bg="white">
            {children}
          </Box>
        </Sidebar>
      )}
    </Authenticator>
  );
};

export default AuthLayout;
