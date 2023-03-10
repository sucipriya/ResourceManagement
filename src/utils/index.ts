export const getPropByPath: any = (
  object: any,
  path: string,
  defaultValue: any
) => {
  const _path = Array.isArray(path) ? path : path.split(".");
  if (object && _path.length)
    return getPropByPath(object[_path.shift()], _path, defaultValue);
  return object === undefined ? defaultValue : object;
};
