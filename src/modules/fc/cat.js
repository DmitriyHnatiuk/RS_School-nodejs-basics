import { createReadStream } from 'fs';
import { CustomError, ERROR_CODE } from '../../utils/customError.js';

export const cat = async ({ args, done }) => {
  try {
    const [_fileName] = args;

    if (args.length !== 1) {
      throw new CustomError('Invalid input');
    }

    createReadStream(_fileName, { flag: 'r' })
      .on('error', (error) => {
        throw error;
      })
      .on('end', () => {
        process.stdout.write('\n');
        done();
      })
      .pipe(process.stdout);
  } catch (error) {
    if (error.code !== ERROR_CODE) {
      throw error;
    }
    console.error(error.message);
  }
};
