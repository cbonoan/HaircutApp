import { configureStore } from "@reduxjs/toolkit";
import featureTypeReducer from "./slices/FeatureTypeSelection";

export const store = configureStore({
    reducer: {
        featureType: featureTypeReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;