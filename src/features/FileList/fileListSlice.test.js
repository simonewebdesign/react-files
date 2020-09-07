import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, {
  initialState,
  fetchFiles,
  fetchPending,
  fetchSuccess,
  fetchError,
} from './fileListSlice';

describe('Files slice', () => {
  const mockStore = configureMockStore([thunk]);

  it('should return the initial state on first run', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual(initialState);
  });

  describe('fetchPending', () => {
    it('can be dispatched', () => {
      const store = mockStore({ files: initialState });
      store.dispatch(fetchPending());

      expect(store.getActions()[0].type).toBe('files/fetchPending');
    });

    it('updates the state', () => {
      const state = reducer(initialState, fetchPending());
      expect(state.isFetching).toBe(true);
    });
  });

  describe('fetchError', () => {
    it('can be dispatched', () => {
      const store = mockStore({ files: initialState });
      store.dispatch(fetchError());

      expect(store.getActions()[0].type).toBe('files/fetchError');
    });

    it('updates the state', () => {
      const state = reducer(initialState, fetchError());

      expect(state.isFetching).toBe(false);
      expect(state.didFetchSuccessfully).toBe(false);
    });
  });

  describe('fetchSuccess', () => {
    it('can be dispatched with no data', () => {
      const store = mockStore({ files: initialState });
      store.dispatch(fetchSuccess());

      expect(store.getActions()[0].type).toBe('files/fetchSuccess');
    });

    it('updates the state', () => {
      const payload = [{ id: 1 }, { id: 2 }];
      const state = reducer(initialState, fetchSuccess(payload));

      expect(state.isFetching).toBe(false);
      expect(state.didFetchSuccessfully).toBe(true);
      expect(state.allIds).toEqual([1, 2]);
      expect(state.byId).toEqual({ 1: { id: 1 }, 2: { id: 2 } });
    });
  });

  describe('fetchFiles thunk', () => {
    it('can be dispatched asynchronously', async () => {
      const store = mockStore({ files: initialState });

      const file1 = {
        id: 12,
        name: 'hi.mpg',
      };
      const file2 = {
        id: 25,
        name: 'hello.mpg',
      };

      jest.spyOn(window, 'fetch').mockImplementation(() => {
        return Promise.resolve({
          json: (_data) => {
            store.dispatch(fetchSuccess([file1, file2]));
          },
        });
      });

      await store.dispatch(fetchFiles());

      const expectedActions = [fetchPending(), fetchSuccess([file1, file2])];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
