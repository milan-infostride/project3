import { configureStore } from "@reduxjs/toolkit";
import addressesSlice from "./slices/adderesses-slice";
import alertHandlerSlice from "./slices/alert-handler-slice";
import currentUserSlice from "./slices/current-user-slice";
const store = configureStore({
    reducer: {
        addresses: addressesSlice.reducer,
        currentUser: currentUserSlice.reducer,
        alertHandlerSlice: alertHandlerSlice.reducer
    }
})

export default store;