import { resolve } from 'path';
import { CustomError } from '../../utils/customError.js';

export const cd = async ({ args, done }) => {
  if (args.length !== 1) {
    throw new CustomError('Invalid input');
  }

  process.chdir(resolve(process.cwd(), ...args));
  return done();
};
