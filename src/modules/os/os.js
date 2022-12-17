import * as _os from 'os';
import { CustomError } from '../../utils/customError.js';

function getCpusInfo() {
  const _cpuModel = _os.cpus().map((cpu) => ({ model: cpu.model }));
  console.table([
    { model: `Overall amount of CPUS ${_cpuModel.length}` },
    ..._cpuModel,
  ]);
}

const COMMANDS = {
  '--EOL': () => console.log(JSON.stringify(_os.EOL)),
  '--cpus': () => getCpusInfo(),
  '--homedir': () => console.log(_os.homedir()),
  '--username': () => console.log(_os.userInfo()?.username),
  '--architecture': () => console.log(_os.arch()),
};

export const os = ({ args, done }) => {
  const [commandKey] = args;
  const _command = COMMANDS[commandKey];

  if (!_command || args.length !== 1) {
    throw new CustomError('Invalid input');
  }

  _command();
  return done();
};
