import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { hasProperty } from './hasProperty';
import { errorToast } from './errorToast';

export const handleErrors = (error: FetchBaseQueryError) => {
  switch (error.status) {
    case 'TIMEOUT_ERROR':
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
    case 'CUSTOM_ERROR':
      errorToast(error.error, error);
      break;
    case 404:
      errorToast(
        hasProperty(error.data, 'error') ? error.data.error : 'Unknown error',
        error,
      );
      break;
    case 429:
    case 401:
      errorToast(
        hasProperty(error.data, 'message')
          ? error.data.message
          : 'Unknown error',
        error,
      );
      break;

    default:
      errorToast(
        hasProperty(error.data, 'title') ? error.data.title : 'Unknown error',
        error,
      );
  }
};
