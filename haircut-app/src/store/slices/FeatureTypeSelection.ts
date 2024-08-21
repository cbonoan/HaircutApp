import { createSlice } from "@reduxjs/toolkit";

export const featureTypeSlice = createSlice({
    name: 'featureType',
    initialState: {
        gender: 'Select One',
        faceType: 'Select One',
        hairType: 'Select One',
    },
    reducers: {
        changeGenderType: (state, action) => {
            state.gender = action.payload;
        },
        changeHairType: (state, action) => {
            state.hairType = action.payload;
        },
        changeFaceType: (state, action) => {
            state.faceType = action.payload;
        },

    }
}) 

export const { changeHairType, changeFaceType, changeGenderType } = featureTypeSlice.actions;

const featureTypeReducer = featureTypeSlice.reducer;
export default featureTypeReducer;