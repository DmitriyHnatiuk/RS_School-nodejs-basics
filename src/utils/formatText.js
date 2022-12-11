import { themes } from './constants.js';

export function errorText() {
  return `${themes.font_color.red}${themes.bold}${[...arguments].join(' ')}${
    themes.reset
  }`;
}

export function messageText() {
  return `${themes.font_color.green}${themes.bold}${[...arguments].join(' ')}${
    themes.reset
  }`;
}
