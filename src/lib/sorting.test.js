import { sortBy, nextOrder, orderIcon } from './sorting';

describe('sortBy', () => {
  it('creates a function to compare two objects by an arbitrary attribute name', () => {
    const a = { mung: 1 };
    const b = { mung: 2 };

    const c = { floobleskoop: 1 };
    const d = { floobleskoop: 2 };

    expect(sortBy('mung')(a, b)).toBe(-1);
    expect(sortBy('mung')(b, a)).toBe(1);
    expect(sortBy('mung')(a, a)).toBe(0);

    expect(sortBy('floobleskoop')(c, d)).toBe(-1);
    expect(sortBy('floobleskoop')(d, c)).toBe(1);
    expect(sortBy('floobleskoop')(d, d)).toBe(0);
  });
});

describe('nextOrder', () => {
  it('returns the next sorting state', () => {
    expect(nextOrder(null, 'hi')).toBe('hi');
    expect(nextOrder(null, 'woop')).toBe('woop');

    expect(nextOrder('goo', 'rumba')).toBe('rumba');
    expect(nextOrder('rumba', 'goo')).toBe('goo');

    expect(nextOrder('goo', 'goo')).toBe('-goo');
    expect(nextOrder('rumba', 'rumba')).toBe('-rumba');

    expect(nextOrder('-goo', 'goo')).toBe(null);
    expect(nextOrder('-rumba', 'rumba')).toBe(null);
  });
});

describe('orderIcon', () => {
  it('returns the icon to be displayed', () => {
    expect(orderIcon(null)('hi')).toBe('▸');
    expect(orderIcon(null)('woopy')).toBe('▸');

    expect(orderIcon('goo')('rumba')).toBe('▸');
    expect(orderIcon('rumba')('goo')).toBe('▸');

    expect(orderIcon('goo')('goo')).toBe('▴');
    expect(orderIcon('rumba')('rumba')).toBe('▴');

    expect(orderIcon('-goo')('goo')).toBe('▾');
    expect(orderIcon('-rumba')('rumba')).toBe('▾');
  });
});
