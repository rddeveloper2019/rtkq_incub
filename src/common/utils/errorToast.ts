import { toast } from 'react-toastify';

export const errorToast = (message: string, error?: unknown) => {
  toast(message, {
    type: 'error',
    theme: 'colored',
  });
  if (error) {
    console.log('Error: ', JSON.stringify(error, null, 2));
  }
};
