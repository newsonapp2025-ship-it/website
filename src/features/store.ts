
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import login from "./slice/login";
import closemodel from "./slice/closemodel";
// import  datastore  from "./slice/datastore";
import creatwebinarSlice from "./slice/createwebinarSlice";
import notificationSlice from "./slice/notificationlistner";

export const store = configureStore({
  reducer: {

    [api.reducerPath]: api.reducer,
    auth: login,
    closex: closemodel,
    notification: notificationSlice,
    // datastore: datastore,
    createwebinar: creatwebinarSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

});

