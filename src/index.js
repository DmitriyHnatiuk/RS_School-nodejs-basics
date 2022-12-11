import { COMMANDS } from './commands.js';
import { CustomError } from './utils/customError.js';
import { messageText } from './utils/formatText.js';
import { parseParamsString } from './utils/parseParamsString.js';

const _username =
  process.argv.reduce(
    (acc, env) => (env.startsWith('--username') ? env.split('=')[1] : acc),
    ''
  ) || 'John_Doe';

const currentDirectory = () =>
  console.log(`You are currently in ${process.cwd()}\n`);

const cliStart = () => {
  try {
    console.log(messageText(`Welcome to the File Manager, ${_username}!`));

    process.chdir(process.env.HOME);

    currentDirectory();

    process.on('SIGINT', () => process.exit());
    process.on('exit', () =>
      console.log(
        messageText(
          `\nThank you for using File Manager, ${_username}, goodbye!`
        )
      )
    );
    process.on('uncaughtException', (error) => {
      const _error =
        error.code === 'ERROR_FAILED'
          ? error.message
          : new CustomError().message;
      console.error(_error);
    });

    process.stdin.on('data', async (data) => {
      const [command, args] = parseParamsString(data);

      if (command === '.exit') {
        process.exit();
      }
      const _command = COMMANDS[command];

      if (!_command) throw new CustomError('Invalid input');

      _command({
        args,
        done: currentDirectory,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

cliStart();
