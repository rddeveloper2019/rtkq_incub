export const hasProperty = <T extends string>(
  data: unknown,
  property: T,
): data is Record<T, string> => {
  return (
    data !== null &&
    typeof data === 'object' &&
    property in data &&
    typeof (data as Record<string, unknown>)[property] === 'string'
  );
};
