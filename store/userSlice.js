const { createSlice } = require('@reduxjs/toolkit');

const userSlice = createSlice({
	name: 'user',
	initialState: {
		value: null,
	},
	reducers: {
		setValue(state, value) {
			return { ...state, value: value.payload };
		},
	},
});

export const { setValue } = userSlice.actions;

export default userSlice.reducer;
