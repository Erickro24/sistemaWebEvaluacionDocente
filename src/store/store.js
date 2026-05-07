import { configureStore } from "@reduxjs/toolkit";
import formReducer from './features/forms/formSlice.js'

const store = configureStore({
    reducer: {
        // Define your reducers here
        form: formReducer

    },
});
export default store;