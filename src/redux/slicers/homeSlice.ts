import { createSlice } from "@reduxjs/toolkit";
import { HomeInitialStateType } from "../types";

const initialState: HomeInitialStateType = {
  userDetails: [],
  employeeDetails: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setEmployeeDetails: (state, action) => {
      state.employeeDetails = action.payload;
    },
  },
});

export const { setUserDetails, setEmployeeDetails } = homeSlice.actions;

export const getUserDetails = (state: any) => state.home.userDetails;
export const getEmpDetails = (state: any) => state.home.employeeDetails;
