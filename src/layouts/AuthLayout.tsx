import { Authenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import Sidebar from '../components/SideBar';

const AuthLayout: React.FC = ({ children }) => {
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
