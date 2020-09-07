import React from 'react';
import { createStore } from 'redux';
import { render } from '../../../test-utils';
import App from './App';

test('can render with redux with defaults', () => {
  render(<App />);
});

test('can render with redux with custom initial state', () => {
  render(<App />, {
    initialState: { foo: 1 },
  });
});

test('can render with redux with custom store', () => {
  const store = createStore(() => ({
    files: {
      byId: { 1: {} },
      isFetching: false,
    },
  }));

  store.dispatch = () => {};

  render(<App />, store);
});
