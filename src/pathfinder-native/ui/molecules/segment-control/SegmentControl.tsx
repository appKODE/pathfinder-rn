import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Segment } from './Segment';

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: '#dedede',
    borderRadius: 8,
    padding: 2,
    overflow: 'hidden',
  },
});

type TSegment = {
  title: string;
  value: string;
};

type Props = {
  segments: TSegment[];
  value: string;
  onChange: (value: string) => void;
};

export const SegmentControl: React.FC<Props> = ({
  segments,
  value,
  onChange,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.contentContainer}>
        {segments.map((item) => {
          return (
            <Segment
              key={item.value}
              title={item.title}
              focused={value === item.value}
              onPress={() => onChange(item.value)}
            />
          );
        })}
      </View>
    </View>
  );
};
