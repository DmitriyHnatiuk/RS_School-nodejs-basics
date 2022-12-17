import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream';
import { BrotliCompress, BrotliDecompress } from 'zlib';
import { CustomError, ERROR_CODE } from '../../utils/customError.js';
import { getFileName } from '../../utils/getFileName.js';
import { isPathExist } from '../../utils/isPathExist.js';

export const compressDecompress = async (
  { args, done },
  isDecompress = false
) => {
  try {
    if (args.length !== 2) {
      throw new CustomError('Invalid input');
    }

    const [_currentFilePath, _newFilePath] = args;

    await Promise.all([
      isPathExist(_currentFilePath),
      isPathExist(_newFilePath),
    ]);

    const _fileName = await getFileName(_currentFilePath, isDecompress);
    const _newFileName = `${_fileName}${isDecompress ? '' : '.br'}`;

    if (isDecompress && !_currentFilePath.endsWith('.br')) {
      throw new CustomError('Invalid input');
    }

    const _brotli = isDecompress ? BrotliDecompress : BrotliCompress;

    pipeline(
      createReadStream(_currentFilePath),
      _brotli(),
      createWriteStream(resolve(_newFilePath, _newFileName), {
        flags: 'wx',
      }),
      (error) => {
        if (error) {
          throw new CustomError();
        } else {
          done();
        }
      }
    );
  } catch (error) {
    if (error.code !== ERROR_CODE) {
      throw error;
    }
    console.error(error.message);
  }
};
