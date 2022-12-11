import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream';
import { CustomError, ERROR_CODE } from '../../utils/customError.js';
import { getFileName } from '../../utils/getFileName.js';
import { isPathExist } from '../../utils/isPathExist.js';
import { rm } from './rm.js';

export const mv = async ({ args, done }, isRemove = true) => {
  try {
    if (args.length !== 2) {
      throw new CustomError('Invalid input');
    }

    const [_currentFilePath, _newFilePath] = args;

    await Promise.all([
      isPathExist(_currentFilePath),
      isPathExist(_newFilePath),
    ]);

    const _fileName = await getFileName(_currentFilePath);

    const _readable = createReadStream(_currentFilePath);
    const _writable = createWriteStream(resolve(_newFilePath, _fileName), {
      flags: 'wx',
    });

    pipeline(_readable, _writable, (error) => {
      if (error) {
        throw error;
      }
      isRemove ? rm({ args: [_currentFilePath], done }) : done();
    });
  } catch (error) {
    if (error.code !== ERROR_CODE) {
      throw error;
    }
    console.error(error.message);
  }
};
