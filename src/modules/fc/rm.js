import { rm as _rm } from 'fs/promises';
import { CustomError, ERROR_CODE } from '../../utils/customError.js';

export const rm = async ({ args, done }) => {
  try {
    if (args.length !== 1) {
      throw new CustomError('Invalid input');
    }
    const [_fileName] = args;
    await _rm(_fileName);
    if (done) {
      done();
    }
  } catch (error) {
    if (error.code !== ERROR_CODE) {
      throw error;
    }
    console.error(error.message);
  }
};
