import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../features/FileList/fileListSlice';

export default configureStore({
  reducer: {
    files: filesReducer,
  },
});
