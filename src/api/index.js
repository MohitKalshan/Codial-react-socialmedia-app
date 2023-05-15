import { error } from 'console';
import { LOCALSTORAGE_TOKEN_KEY } from './util';
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
    if (response.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (e) {
    console.log('Error fetching URL', e);
    return {
      message: error.message,
      success: false,
    };
  }
};

const getPosts = (page, limit) => {
  return customFetch();
};
