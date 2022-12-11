import { rename } from 'fs/promises';
import { CustomError, ERROR_CODE } from '../../utils/customError.js';

export const rn = async ({ args, done }) => {
  try {
    if (args.length !== 2) {
      throw new CustomError('Invalid input');
    }
    const [_oldName, _newName] = args;
    await rename(_oldName, _newName);
    done();
  } catch (error) {
    if (error.code !== ERROR_CODE) {
      throw error;
    }
    console.error(error.message);
  }
};
