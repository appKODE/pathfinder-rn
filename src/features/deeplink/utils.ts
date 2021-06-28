function getData(data: any) {
  if (typeof data !== 'string') {
    return data;
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

export function parseJSON(obj: object) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: getData(value),
    };
  }, {});
}
