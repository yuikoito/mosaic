import useSWR from 'swr';
import { fetchUnMosaicFaces, getUnMosaicImageById } from '../libs/api/unMosaic';
import { ImageSchema } from '../models/ImageSchema';

export const useUnMosaicFaces = (): {
  data: ImageSchema[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const fetcher = async () => {
    const res = await fetchUnMosaicFaces();
    if (res.isLeft()) {
      throw new Error();
    }
    if (res.isRight()) {
      const images = [];
      for (let i = 0; i < res.value.length; i++) {
        const _res = await getUnMosaicImageById(res.value[i].uuid);
        if (_res.isLeft()) {
          throw new Error();
        }
        if (_res.isRight()) {
          images.push({ img: _res.value.img, uuid: res.value[i].uuid });
        }
      }
      return images;
    }
  };
  const { data, error } = useSWR(`/api/get/unMosaicFaces`, fetcher, {
    errorRetryCount: 0,
  });

  return {
    data: data,
    isLoading: !data && !error,
    isError: !!error,
  };
};
