import baseApi from './features/baseApi';
const { configureStore } = require('@reduxjs/toolkit');


const Store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default Store;
