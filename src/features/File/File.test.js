import React from 'react';
import { render, screen } from '@testing-library/react';

import { File } from './File';

test('File renders data correctly', () => {
  const data = {
    created: '2019-10-10T09:17:26.676Z',
    desc: 'Sed quia voluptatem.',
    ext: 'pdf',
    id: '42',
    name: 'strategy.pdf',
    size: '3600059645',
  };
  render(<File {...data} />, {
    // a <tr> cannot be child of a <div>
    container: document.body.appendChild(document.createElement('tbody')),
  });

  const formattedDate = new Date(data.created).toLocaleString();
  expect(getText(formattedDate)).toBe(formattedDate);
  expect(getText(data.desc)).toBe(data.desc);
  expect(getText(data.ext)).toBe(data.ext);
  expect(getText(data.id)).toBe(data.id);
  expect(getText(data.name)).toBe(data.name);
  expect(getText(data.size)).toBe(data.size);
});

function getText(prop) {
  return screen.getByText(prop).textContent;
}
