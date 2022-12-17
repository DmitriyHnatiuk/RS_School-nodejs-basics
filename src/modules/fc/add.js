import { writeFile } from 'fs/promises';
import { CustomError, ERROR_CODE } from '../../utils/customError.js';

export const add = async ({ args, done }) => {
  try {
    if (args.length !== 1) {
      throw new CustomError('Invalid input');
    }

    const [_fileName] = args;
    await writeFile(_fileName, '', { flag: 'wx' });
    done();
  } catch (error) {
    if (error.code !== ERROR_CODE) {
      throw error;
    }
    console.error(error.message);
  }
};
