import { Authenticator } from '@aws-amplify/ui-react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Authenticator socialProviders={['google']} signUpAttributes={['email']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};

export default Home;
