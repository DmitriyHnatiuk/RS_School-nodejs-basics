import { stat } from 'fs/promises';
import { parse } from 'path';

export const getFileName = async (filePath, withoutExtension) => {
  const _stat = await stat(filePath);
  const _isFile = await _stat.isFile();
  const _data = parse(filePath);

  if (!_isFile) {
    throw new Error();
  }

  return `${_data.name}${withoutExtension ? '' : _data.ext}`;
};
