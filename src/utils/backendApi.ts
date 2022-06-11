import axios from 'axios';
import nookies from 'nookies';

type Params = {
  path: string;
  params?: object;
};
const baseUrl = `${process.env.API_ENDPOINT}`;

const getAuthorizationHeader = () => {
  const cookies = nookies.get();
  const token = cookies.idToken;
  return {
    Authorization: `Bearer ${token}`,
  };
};

const BackendApiFetch = async <ResponseType>(params: Params) => {
  const url = `${baseUrl}${params.path}`;
  const authorizationHeader = getAuthorizationHeader();
  const headers = {
    ...authorizationHeader,
  } as { Authorization: string };

  const response = await axios.get<ResponseType>(url, {
    headers: headers,
    params: params.params,
  });
  return response.data;
};

const BackendApiPost = async <ResponseType>(params: Params) => {
  const url = `${baseUrl}${params.path}`;
  const authorizationHeader = getAuthorizationHeader();
  const headers = {
    ...authorizationHeader,
  } as { Authorization: string };
  const response = await axios.post<ResponseType>(url, params.params, {
    headers: headers,
  });
  return response.data;
};

const BackendApiDelete = async <ResponseType>(params: Params) => {
  const url = `${baseUrl}${params.path}`;
  const authorizationHeader = getAuthorizationHeader();
  const headers = {
    ...authorizationHeader,
  } as { Authorization: string };

  const response = await axios.delete<ResponseType>(url, {
    headers: headers,
    params: params.params,
  });
  return response.data;
};

export { BackendApiFetch, BackendApiPost, BackendApiDelete };
