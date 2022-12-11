import { sep } from 'path';
import { CustomError } from '../../utils/customError.js';

export const up = ({ args, done }) => {
  if (args.length) {
    throw new CustomError('Invalid input');
  }
  if (process.cwd().split(sep).length <= 1) {
    return done();
  }
  process.chdir('..');
  return done();
};
