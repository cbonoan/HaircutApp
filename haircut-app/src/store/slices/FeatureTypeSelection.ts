import { createSlice } from "@reduxjs/toolkit";

export const featureTypeSlice = createSlice({
    name: 'featureType',
    initialState: {
        faceType: 'Select One',
        hairType: 'Select One',
    },
    reducers: {
        changeHairType: (state, action) => {
            state.hairType = action.payload;
        },
        changeFaceType: (state, action) => {
            state.faceType = action.payload;
        }
    }
}) 

export const { changeHairType, changeFaceType } = featureTypeSlice.actions;

const featureTypeReducer = featureTypeSlice.reducer;
export default featureTypeReducer;