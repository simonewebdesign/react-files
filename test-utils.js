import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer, {
  initialState as filesInitialState,
} from './src/features/FileList/fileListSlice';

const mockState = {
  files: filesInitialState,
};

const mockStore = createStore(reducer, mockState);

mockStore.dispatch = () => ({
  files: {},
});

function render(
  ui,
  { initialState = mockState, store = mockStore, ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
