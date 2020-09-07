import { createSlice } from '@reduxjs/toolkit';
import { getFiles } from '../../config/api';

export const initialState = {
  allIds: [],
  byId: {},
  isFetching: false,
};

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.isFetching = true;
    },
    fetchSuccess: (state, action) => {
      state.isFetching = false;
      state.didFetchSuccessfully = true;
      action.payload.forEach((file) => {
        state.allIds.push(file.id);
        state.byId[file.id] = file;
      });
    },
    fetchError: (state, action) => {
      state.isFetching = false;
      state.didFetchSuccessfully = false;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchError } = filesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchFiles = () => (dispatch) => {
  dispatch(fetchPending());

  fetch(getFiles)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(fetchSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchError(err));
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectFiles = (state) => state.files;

export default filesSlice.reducer;
