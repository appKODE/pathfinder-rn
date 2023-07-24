import React from 'react';
import { StyleSheet } from 'react-native';

import { Layout } from '../../atoms';
import { Chip } from '../../molecules';

type TValue = string;

type TChipsProps = {
  selected: TValue;
  items: {
    value: TValue;
    title: string;
  }[];
  onSelect: (value: TValue) => void;
};

export const Chips = ({ items, selected, onSelect }: TChipsProps) => {
  return (
    <Layout.Row>
      {items.map(({ value, title }) => {
        return (
          <Chip
            key={value}
            style={styles.item}
            onPress={() => onSelect(value)}
            selected={value === selected}
            title={title}
          />
        );
      })}
    </Layout.Row>
  );
};

const styles = StyleSheet.create({
  item: {
    marginRight: 5,
  },
});
