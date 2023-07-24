import type { ResponsesObject } from '../../../../pathfinder-react';
import { isResponseObject } from './is-response-object';

export const getExamples = (
  responses: ResponsesObject,
  code: string | null
): string[] => {
  if (!code) {
    return [];
  }
  const selectedStatusCodeResponse = responses[code];
  if (
    !isResponseObject(selectedStatusCodeResponse) ||
    !selectedStatusCodeResponse.content
  ) {
    return [];
  }

  const [mediatype] = Object.values(selectedStatusCodeResponse.content);

  if (!mediatype?.examples) {
    return [];
  }

  return Object.keys(mediatype.examples);
};
