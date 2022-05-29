import { useAuthenticator } from '@aws-amplify/ui-react';
import { Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CommonButton from '../src/components/common/Button';
import Hero from '../src/components/Hero';
import Samples from '../src/components/Samples';
import { RoutePath } from '../src/constants/routePath';
import useTranslate from '../src/hooks/useTranslate';

const Home: NextPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  useEffect(() => {
    if (user) router.push(RoutePath.home);
  }, [user]);
  const t = useTranslate();

  return (
    <>
      <Hero />
      <Center
        maxW={'5xl'}
        mx={'auto'}
        flexDirection="column"
        px={{ base: 4, md: 10 }}
      >
        <Samples />
        <CommonButton
          onClick={() => {
            router.push(RoutePath.home);
          }}
          width={{ base: '100%', lg: '50%' }}
        >
          {t.start}
        </CommonButton>
      </Center>
    </>
  );
};

export default Home;
