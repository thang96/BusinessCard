import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/features/userSlice';
import colorSlice from './features/colorSlice';
import resourceSlice from './features/resourceSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    color: colorSlice,
    resource: resourceSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
