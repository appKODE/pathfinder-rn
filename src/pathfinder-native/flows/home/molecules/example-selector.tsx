import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Typography, Layout } from '../../../ui/atoms';
import { Chips } from '../../../ui/organisms';
import type {
  ResponsesObject,
  ParameterObject,
} from '../../../../pathfinder-react';
import { createQueryString, isResponseObject, parseQueryString } from '../libs';

type TExampleSelectorProps = {
  responses: ResponsesObject;
  headers: ParameterObject[];
  onChange: (value: string) => void;
};

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
    return Object.keys(responses).map((statusCode) => ({
      title: statusCode,
      value: statusCode,
    }));
  }, [responses]);

  const examples = useMemo(() => {
    if (!code) {
      return [];
    }
    const selectedStatusCodeResponse = responses[code];
    if (!isResponseObject(selectedStatusCodeResponse)) {
      return [];
    }
    return Object.keys(selectedStatusCodeResponse.content!.examples).map(
      (exampleName) => ({ title: exampleName, value: exampleName })
    );
  }, [responses, code]);

  const addParameter = useCallback(
    (key: string, value: string) => {
      onChange(
        createQueryString({
          example,
          code,
          [key]: value,
        })
      );
    },
    [code, example, onChange]
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
