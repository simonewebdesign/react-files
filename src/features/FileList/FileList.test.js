import React from 'react';
import { createStore } from 'redux';
import { render, fireEvent, screen } from '../../../test-utils';
import reducer, { initialState } from './fileListSlice';
import { FileList } from './FileList';

const allIds = [5, 42, 7];
const byId = {
  5: {
    id: 5,
    name: 'dog.mp4v',
    ext: 'mp4v',
    desc: 'Dog',
    created: '2019-10-26T13:55:29.551Z',
    size: 456,
  },
  42: {
    id: 42,
    name: 'cats.gif',
    ext: 'gif',
    desc: 'Funny Cats',
    created: '2019-09-16T02:38:16.582Z',
    size: 123,
  },
  7: {
    id: 7,
    name: 'cat.gif',
    ext: 'gif',
    desc: 'Cat',
    created: '2019-11-29T17:02:39.594Z',
    size: 789,
  },
};
const cats = Object.values(byId).filter((item) => /cat/.test(item.name));

describe('FileList', () => {
  test('can render with no data', () => {
    render(<FileList />);
  });

  describe('when fetching', () => {
    const store = createStore(reducer, {
      files: { ...initialState, isFetching: true },
    });
    render(<FileList />, { store });
    const loading = screen.getByRole('heading');
    expect(loading.textContent).toMatch(/Loading/);
  });

  describe('with files', () => {
    const store = createStore(reducer, {
      files: { ...initialState, allIds, byId },
    });
    store.dispatch = () => {};

    test('default list renders all the files', () => {
      const { container } = render(<FileList />, { store });
      const rows = container.querySelectorAll('tbody tr');

      expect(rows).toHaveLength(allIds.length);
    });

    test('filtering by name', () => {
      const { container } = render(<FileList />, { store });
      const input = screen.getByRole('searchbox');
      fireEvent.change(input, { target: { value: 'cat' } });
      const rows = container.querySelectorAll('tbody tr');

      expect(rows).toHaveLength(cats.length);
    });

    test('sorting', () => {
      const { container } = render(<FileList />, { store });
      const buttons = screen.getAllByRole('button');

      fireEvent.click(buttons[0]);
      expect(column(1, container)).toEqual(['5', '7', '42']);

      fireEvent.click(buttons[0]);
      expect(column(1, container)).toEqual(['42', '7', '5']);

      fireEvent.click(buttons[0]);
      expect(column(1, container)).toEqual(['5', '7', '42']);

      fireEvent.click(buttons[1]);
      expect(column(2, container)).toEqual(['cat.gif', 'cats.gif', 'dog.mp4v']);

      fireEvent.click(buttons[1]);
      expect(column(2, container)).toEqual(['dog.mp4v', 'cats.gif', 'cat.gif']);
    });
  });
});

function column(number, node) {
  return Array.from(
    node.querySelectorAll(`tbody td:nth-child(${number})`),
    (el) => el.textContent
  );
}
