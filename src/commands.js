import { add } from './modules/fc/add.js';
import { cat } from './modules/fc/cat.js';
import { mv } from './modules/fc/mv.js';
import { rm } from './modules/fc/rm.js';
import { rn } from './modules/fc/rn.js';
import { hash } from './modules/hash/hash.js';
import { cd } from './modules/nwd/cd.js';
import { ls } from './modules/nwd/ls.js';
import { up } from './modules/nwd/up.js';
import { os } from './modules/os/os.js';
import { compressDecompress } from './modules/zip/compressDecompress.js';

export const COMMANDS = {
  ls: (params) => ls({ args: params.args, done: params.done }),
  up: (params) => up({ args: params.args, done: params.done }),
  cd: (params) => cd({ args: params.args, done: params.done }),

  add: (params) => add({ args: params.args, done: params.done }),
  cat: (params) => cat({ args: params.args, done: params.done }),
  cp: (params) => mv({ args: params.args, done: params.done }, false),
  mv: (params) => mv({ args: params.args, done: params.done }),
  rm: (params) => rm({ args: params.args, done: params.done }),
  rn: (params) => rn({ args: params.args, done: params.done }),

  os: (params) => os({ args: params.args, done: params.done }),

  hash: (params) => hash({ args: params.args, done: params.done }),

  compress: (params) =>
    compressDecompress({ args: params.args, done: params.done }),
  decompress: (params) =>
    compressDecompress({ args: params.args, done: params.done }, true),
};
