export type TAsyncStorage = {
  setItem: (key: string, item: string) => Promise<any>;
  getItem: (key: string) => Promise<string | null | undefined>;
};
