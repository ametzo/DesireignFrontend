import { configureStore } from "@reduxjs/toolkit";

import { adminReducer } from "./slices";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
    },
});
