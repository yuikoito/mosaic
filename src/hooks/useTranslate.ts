import { useRouter } from 'next/router';
import { EnTexts } from '../locales/en';
import { JaTexts } from '../locales/ja';

const useTranlate = () => {
  const { locale } = useRouter();
  return locale === 'ja' ? JaTexts : EnTexts;
};

export default useTranlate;
