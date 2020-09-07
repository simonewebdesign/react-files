import React from 'react';
import { render } from '@testing-library/react';

import { Loading } from './Loading';

test('Loading renders without errors', () => {
  render(<Loading />);
});
