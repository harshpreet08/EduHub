import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userDetails: {},
}

const users = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUserDetails: (state, action) => ({
			...state,
			userDetails: action.payload
		}),
	}
})

export const { setUserDetails } = users.actions;
export default users.reducer;
