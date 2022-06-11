import {
  BackendApiDelete,
  BackendApiFetch,
  BackendApiPost,
} from '../../utils/backendApi';
import { Left, Right } from '../../utils/either';
import { ApiResponse } from './response/ApiResponse';
import { ListResponse } from './response/ListResponse';

const fetchMosaicFaces = async (): Promise<ApiResponse<ListResponse[]>> => {
  const response = await BackendApiFetch<{
    status: 'OK' | 'NG';
    message: string;
    data: ListResponse[];
  }>({
    path: '/list',
  });
  if (response.status === 'NG') {
    return new Left({ error: response.message });
  }
  return new Right(response.data);
};

const getMosaicImageById = async (
  imgId: string
): Promise<ApiResponse<{ img: string }>> => {
  const response = await BackendApiPost<{
    status: 'OK' | 'NG';
    message: string;
    img: string;
  }>({
    path: '/img',
    params: {
      imgId,
    },
  });
  if (response.status === 'NG') {
    return new Left({ error: response.message });
  }
  return new Right({ img: response.img });
};

const addMosaic = async (
  imgTitle: string,
  img: string,
  subjectId: string[] // モザイクをかけない画像のIDリスト
): Promise<ApiResponse<{ img: string }>> => {
  const response = await BackendApiPost<{
    status: 'OK' | 'NG' | 'Error';
    message: string;
    img: string;
  }>({
    path: '/mosaic',
    params: {
      imgTitle,
      img,
      subjectId,
    },
  });
  if (response.status === 'NG') {
    return new Left({ error: response.message });
  }
  return new Right({ img: response.img });
};

const deleteUnMosaicFace = async (
  imgId: string
): Promise<ApiResponse<{ message: string }>> => {
  const response = await BackendApiDelete<{
    status: 'OK' | 'NG';
    message: string;
  }>({
    path: '/list',
    params: {
      imgId,
    },
  });
  if (response.status === 'NG') {
    return new Left({ error: response.message });
  }
  return new Right({ message: response.message });
};

export { fetchMosaicFaces, getMosaicImageById, addMosaic, deleteUnMosaicFace };
