import { useRouter } from 'next/router';
import { EnTexts } from '../locales/en';
import { JaTexts } from '../locales/ja';

const useTranslate = () => {
  const { locale } = useRouter();
  return locale === 'ja' ? JaTexts : EnTexts;
};

export default useTranslate;
