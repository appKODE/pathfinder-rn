export const createQueryString = (
  params: Record<string, string | null | undefined>
): string => {
  const chunks: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      chunks.push(`${key}=${value}`);
    }
  }

  return chunks.join(',');
};
