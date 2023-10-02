import axios from 'axios';

// const baseUrl = 'https://i9d108.p.ssafy.io/api/';
const baseUrl = '`https://j9d109.p.ssafy.io:8081/';
const baseNodeUrl = 'http://j9d109.p.ssafy.io:8000/';
// const baseUrl = 'http://localhost:9999/api/';

const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
};

const headers2 = {
  'Content-Type': 'multipart/form-data',
};

export const ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000;

export const getAccessToken = async () => {
  console.log('새로 토큰을 얻어오자!');
  const authorization = localStorage.getItem('access_token');
  // const refreshToken = localStorage.getItem('refresh_token');
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Authorization": "Bearer " + authorization,
    // refresh_token: refreshToken,
  };

  await axios.get(baseUrl, headers).then((res) => {
    if (res.data.baseResponseDto.statusCode === 200) {
      localStorage.setItem('access_token', res.headers['authorization']);
      localStorage.setItem('login', true);
      setTimeout(getAccessToken, ACCESS_TOKEN_EXPIRE_TIME);
    } else {
      localStorage.removeItem('login');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
  });
};

export const deleteToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export const setToken = () => {
  const authorization = localStorage.getItem('access_token');
  // const refresh_token = localStorage.getItem('refresh_token');
  // delete axios.defaults.headers.common;
  axios.defaults.headers.common['Authorization'] = "Bearer "+authorization;
  // axios.defaults.headers.common['refresh_token'] = refresh_token;
};

export const requestGet = async (url, params) => {
  try {
    const data = await axios.get(baseUrl + url, params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestGetNode = async (url, params) => {
  try {
    const data = await axios.get(baseNodeUrl + url, params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestPost = async (url, body, headers) => {
  try {
    const data = await axios.post(baseUrl + url, body, headers);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestPostNode = async (url, body) => {
  try {
    const headers = {
      'Content-Type':'application/json;charset=UTF-8',
    };
    const data = await axios.post(baseNodeUrl + url, body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestPut = async (url, body, headers) => {
  try {
    const data = await axios.put(baseUrl + url, body, headers);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestPutNode = async (url, body, headers) => {
  try {
    const data = await axios.put(baseNodeUrl + url, body, headers);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestDel = async (url) => {
  try {
    const data = await axios.delete(baseUrl + url, headers);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestPost2 = async (url, body) => {
  try {
    const data = await axios.post(baseUrl + url, body, headers2);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const requestPut2 = async (url, body) => {
  try {
    const data = await axios.put(baseUrl + url, body, headers2);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
