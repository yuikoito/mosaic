import { Center, Text } from '@chakra-ui/react';
import useTranslate from '../hooks/useTranslate';
import Title from './common/Title';

const Samples = () => {
  const t = useTranslate();

  return (
    <Center px={5} mb={5} flexDirection="column">
      <Title>{t.sample}</Title>
      <Text my={'3'} color={'gray.500'}>
        {t.sampleDesc}
      </Text>
    </Center>
  );
};

export default Samples;
