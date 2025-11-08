import baseApi from './features/baseApi';
import { configureStore } from '@reduxjs/toolkit';


const Store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default Store;
