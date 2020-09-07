// sortBy<T>(name: keyof T, reversed: boolean): (a: T, b: T) => -1 | 0 | 1
export const sortBy = (name, reversed) => (a, b) => {
  if (a[name] === b[name]) {
    return 0;
  }
  if (reversed) {
    return a[name] > b[name] ? -1 : 1;
  }
  return a[name] > b[name] ? 1 : -1;
};

export const nextOrder = (previousOrder, fieldName) => {
  const [asc, desc] = [fieldName, `-${fieldName}`];
  switch (previousOrder) {
    case asc:
      return desc;

    case desc:
      return null;

    default:
      return asc;
  }
};

export const orderIcon = (order) => (fieldName) => {
  const [asc, desc] = [fieldName, `-${fieldName}`];
  switch (order) {
    case asc:
      return '▴';

    case desc:
      return '▾';

    default:
      return '▸';
  }
};
