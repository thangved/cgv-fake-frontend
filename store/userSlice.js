const { createSlice } = require('@reduxjs/toolkit');

const userSlice = createSlice({
	name: 'user',
	initialState: {
		value: null,
		checked: false,
	},
	reducers: {
		setValue(state, value) {
			return { ...state, value: value.payload };
		},
		checked(state) {
			return { ...state, checked: true };
		},
	},
});

export const { setValue, checked } = userSlice.actions;

export default userSlice;
