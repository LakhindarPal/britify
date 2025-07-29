export function groupBy<T, K extends string | number>(
  array: T[] | undefined,
  getKey: (item: T) => K
): Record<K, T[]> {
  if (!array) return {} as Record<K, T[]>;
  return array.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>
  );
}
