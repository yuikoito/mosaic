import { Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import CommonButton from '../src/components/common/Button';
import Hero from '../src/components/Hero';
import Samples from '../src/components/Samples';
import useTranslate from '../src/hooks/useTranslate';

const Home: NextPage = () => {
  const t = useTranslate();
  const goToLoginForm = () => {
    console.log('login');
  };
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
          onClick={goToLoginForm}
          width={{ base: '100%', lg: '50%' }}
        >
          {t.start}
        </CommonButton>
      </Center>
    </>
  );
};

export default Home;
