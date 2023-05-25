
import {API_URLS, LOCALSTORAGE_TOKEN_KEY } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  const header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }
  const config = {
    ...customConfig,
    header: {
      ...header,
      ...customConfig.header,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (error) {
    console.log('Error fetching URL', error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page=1, limit=5) => {
  return customFetch(API_URLS.posts(page,limit),{
    method: 'GET',
  });
};
