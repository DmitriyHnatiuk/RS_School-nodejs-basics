export const ERROR_CODE = 'ERROR_FAILED';

export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.code = ERROR_CODE;
    this.name = '\x1b[31m\x1b[1mError\x1b[0m';
    this.message = `\x1b[31m\x1b[1m${message || 'Operation failed'}\x1b[0m`;
  }
}
