import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { CustomError, ERROR_CODE } from '../../utils/customError.js';

export const hash = async ({ args, done }) => {
  try {
    const [_filePath] = args;
    if (!_filePath || args.length !== 1) {
      throw new CustomError('Invalid input');
    }
    const content = await readFile(_filePath);
    const hash = createHash('sha256').update(content).digest('hex');
    process.stdout.write(hash + '\n');
    done();
  } catch (error) {
    if (error.code !== ERROR_CODE) {
      throw error;
    }
    console.error(error.message);
  }
};
