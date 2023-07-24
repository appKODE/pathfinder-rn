import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Typography, Layout } from '../../../ui/atoms';
import { Chips } from '../../../ui/organisms';
import type {
  ResponsesObject,
  ParameterObject,
} from '../../../../pathfinder-react';
import { createQueryString, getExamples, parseQueryString } from '../libs';

type TExampleSelectorProps = {
  responses: ResponsesObject;
  headers: ParameterObject[];
  onChange: (value: string) => void;
};

const isExistedExample = (examples: string[], exampleName: string | null) =>
  Boolean(exampleName && examples.includes(exampleName));

const createChipDataFromString = (value: string) => ({
  title: value,
  value: value,
});

export const ExampleSelector = ({
  responses,
  headers,
  onChange,
}: TExampleSelectorProps) => {
  const { code, example } = useMemo(() => {
    const headerValue = headers.find(({ name }) => name === 'Prefer')?.value;
    if (typeof headerValue !== 'string') {
      return { code: null, example: null };
    }

    return parseQueryString(headerValue);
  }, [headers]);

  const statuses = useMemo(() => {
    return Object.keys(responses).map(createChipDataFromString);
  }, [responses]);

  const examples = useMemo(() => {
    return getExamples(responses, code).map(createChipDataFromString);
  }, [responses, code]);

  const addParameter = useCallback(
    (key: string, value: string) => {
      const params = {
        example,
        code,
        [key]: value,
      };

      if (
        !isExistedExample(getExamples(responses, params.code), params.example)
      ) {
        params.example = null;
      }

      onChange(createQueryString(params));
    },
    [code, example, responses, onChange]
  );

  const changeCodeHandle = useCallback(
    (value: string) => {
      addParameter('code', value);
    },
    [addParameter]
  );

  const changeExampleHandle = useCallback(
    (value: string) => {
      addParameter('example', value);
    },
    [addParameter]
  );

  if (!statuses.length) {
    return null;
  }

  return (
    <>
      <Layout.Cal style={styles.group}>
        <Typography style={styles.title}>Status Code:</Typography>
        <Chips
          selected={code ?? ''}
          items={statuses}
          onSelect={changeCodeHandle}
        />
      </Layout.Cal>
      {examples.length ? (
        <Layout.Cal style={styles.group}>
          <Typography style={styles.title}>Example:</Typography>
          <Chips
            selected={example ?? ''}
            items={examples}
            onSelect={changeExampleHandle}
          />
        </Layout.Cal>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  group: {
    paddingBottom: 5,
  },
  title: {
    paddingBottom: 3,
  },
});
