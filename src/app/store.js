import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/comments/commentSilce';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});
