export const parseQueryString = (
  queryString: string
): Record<string, string> => {
  const result: Record<string, string> = {};
  const keyValuePairs = queryString.replace(/ /g, '').split(',');

  for (const pair of keyValuePairs) {
    const [key, value] = pair.split('=');
    result[key] = value;
  }

  return result;
};
