export const parseParamsString = (data) => {
  const [command, ...args] = data
    .toString()
    .trim()
    .split(/('.*?'|".*?")|\s/)
    .reduce(
      (acc, item) => (item ? [...acc, item.replace(/"|'/g, '').trim()] : acc),
      []
    );

  return [command, args];
};
