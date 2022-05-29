import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import useTranslate from '../hooks/useTranslate';
import CommonButton from './common/Button';

export default function Hero() {
  const t = useTranslate();
  const goToLoginForm = () => {
    console.log('login');
  };

  return (
    <Stack
      direction={{ base: 'column-reverse', md: 'row' }}
      bgColor={'red.300'}
    >
      <Flex
        px={{ base: 4, md: 10 }}
        pt={{ base: 0, md: 10, lg: 14 }}
        pb={{ base: 6, md: 10, lg: 14 }}
        flex={1}
        align={'center'}
        justify={'center'}
      >
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text as={'p'} color={'white'}>
              {t.title}
            </Text>
            <Text color={'white'} as={'p'} fontSize={{ base: 'xl', md: '2xl' }}>
              {t.subTitle}
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.50'}>
            {t.description}
            <br />
            {t.description2}
          </Text>
          <CommonButton onClick={goToLoginForm}> {t.start}</CommonButton>
        </Stack>
      </Flex>
      <Flex flex={1}>
        {/* <Image
          alt={'Image'}
          objectFit={'contain'}
          src={'/images/eyes.gif'}
          w={{ base: '100%', md: '80%' }}
        /> */}
      </Flex>
    </Stack>
  );
}
