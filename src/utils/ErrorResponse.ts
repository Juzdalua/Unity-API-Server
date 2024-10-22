import { ErrorResponse } from '../interface/error.dto';

export const createErrorResponse = (code: number, message: string): ErrorResponse => {
  return {
    errorCode: code,
    errorMsg: message
  };
};
