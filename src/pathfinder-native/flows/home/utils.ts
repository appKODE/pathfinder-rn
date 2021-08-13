import {
  isReferenceObject,
  ParameterObject,
  ReferenceObject,
} from '../../../pathfinder';

export const unionParameters = (
  schemeParameters: (ParameterObject | ReferenceObject)[],
  stateParameter: ParameterObject[]
): ParameterObject[] => {
  const result: Record<string, ParameterObject> = {};

  schemeParameters.forEach((parameter) => {
    if (isReferenceObject(parameter)) {
      return;
    }

    const fromState = stateParameter.find(
      (param) => param.name + param.in === parameter.name + param.in
    );

    result[parameter.name + parameter.in] = {
      ...parameter,
      value: fromState?.value,
    };
  });
  stateParameter.forEach((parameter) => {
    if (!result[parameter.name + parameter.in]) {
      result[parameter.name + parameter.in] = {
        ...parameter,
        custom: true,
      };
    }
  });

  return Object.values(result);
};
