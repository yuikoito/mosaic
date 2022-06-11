import useSWR from 'swr';
import { FaceResponse } from '../libs/api/response/FaceResponse';
import { fetchUnMosaicFaces } from '../libs/api/unMosaic';

export const useUnMosaicFaces = (): {
  data: FaceResponse[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const fetcher = async () => {
    const res = await fetchUnMosaicFaces();
    if (res.isLeft()) {
      throw new Error();
    }
    if (res.isRight()) {
      return res.value;
    }
  };
  // access tokenごとにキャッシュする
  const { data, error } = useSWR(`/api/get/unMosaicFaces`, fetcher, {
    errorRetryCount: 0,
  });

  return {
    data: data,
    isLoading: !data && !error,
    isError: !!error,
  };
};
