import axios from 'axios';
import nookies from 'nookies';
import useSWR from 'swr';

export const useUnMosaicFaces = (): {
  data: any;
  isLoading: boolean;
  isError: boolean;
} => {
  const cookies = nookies.get();
  const token = cookies.idToken;
  const fetcher = async () => {
    if (!token) return;
    const res = await axios.get(`${process.env.API_ENDPOINT}/subject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };
  // access tokenごとにキャッシュする
  const { data, error } = useSWR(`/api/unmosaic/${token}`, fetcher, {
    errorRetryCount: 0,
  });

  return {
    data: data,
    isLoading: !data && !error,
    isError: !!error,
  };
};
