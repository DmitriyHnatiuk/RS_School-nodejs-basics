import { readdir } from 'fs/promises';
import { CustomError, ERROR_CODE } from '../../utils/customError.js';

export const ls = async ({ args, done }) => {
  try {
    if (args.length) {
      throw new CustomError('Invalid input');
    }
    const _path = process.cwd();
    const _result = (await readdir(_path, { withFileTypes: true })).reduce(
      (acc, item) => {
        const _isDirectory = item.isDirectory();
        const _item = {
          Name: item.name,
          Type: _isDirectory ? 'directory' : 'file',
        };
        return {
          ...acc,
          ...(_isDirectory
            ? { dir: [...acc.dir, _item] }
            : { files: [...acc.files, _item] }),
        };
      },
      { dir: [], files: [] }
    );

    console.table([..._result.dir, ..._result.files]);
    return done();
  } catch (error) {
    if (error.code !== ERROR_CODE) {
      throw error;
    }
    console.error(error.message);
  }
};
