import { Authenticator } from '@aws-amplify/ui-react';
import Sidebar from '../components/SideBar';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Authenticator socialProviders={['google']} signUpAttributes={['email']}>
      {() => <Sidebar>{children}</Sidebar>}
    </Authenticator>
  );
};

export default AuthLayout;
