import {
  BackendApiDelete,
  BackendApiFetch,
  BackendApiPost,
} from '../../utils/backendApi';
import { Left, Right } from '../../utils/either';
import { ApiResponse } from './response/ApiResponse';
import { FaceResponse } from './response/FaceResponse';

const fetchUnMosaicFaces = async (): Promise<ApiResponse<FaceResponse[]>> => {
  const response = await BackendApiFetch<{
    status: 'OK' | 'NG';
    message: string;
    data: FaceResponse[];
  }>({
    path: '/subject',
  });
  if (response.status === 'NG') {
    return new Left({ error: response.message });
  }
  return new Right(response.data);
};

const getUnMosaicImageById = async (
  imgId: string
): Promise<ApiResponse<{ img: string }>> => {
  const response = await BackendApiPost<{
    status: 'OK' | 'NG';
    message: string;
    img: string;
  }>({
    path: '/subjectimg',
    params: {
      imgId,
    },
  });
  if (response.status === 'NG') {
    return new Left({ error: response.message });
  }
  return new Right({ img: response.img });
};

const registerUnMosaicFace = async (
  imgTitle: string,
  img: string
): Promise<ApiResponse<{ message: string }>> => {
  const response = await BackendApiPost<{
    status: 'OK' | 'NG';
    message: string;
  }>({
    path: '/subject',
    params: {
      imgTitle,
      img,
    },
  });
  if (response.status === 'NG') {
    return new Left({ error: response.message });
  }
  return new Right({ message: response.message });
};

const deleteUnMosaicFace = async (
  imgId: string
): Promise<ApiResponse<{ message: string }>> => {
  const response = await BackendApiDelete<{
    status: 'OK' | 'NG';
    message: string;
  }>({
    path: '/subject',
    params: {
      imgId,
    },
  });
  if (response.status === 'NG') {
    return new Left({ error: response.message });
  }
  return new Right({ message: response.message });
};

export {
  fetchUnMosaicFaces,
  getUnMosaicImageById,
  registerUnMosaicFace,
  deleteUnMosaicFace,
};
