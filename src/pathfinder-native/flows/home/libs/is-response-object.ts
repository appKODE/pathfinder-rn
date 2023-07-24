import type { ResponseObject } from '../../../../pathfinder-react';

export const isResponseObject = (data: any): data is ResponseObject => {
  return Boolean(data?.content?.examples);
};
