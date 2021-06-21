import { NativeModules } from 'react-native';

type PathfinderType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Pathfinder } = NativeModules;

export default Pathfinder as PathfinderType;
