const { createSlice } = require('@reduxjs/toolkit');

const getTicketSlice = createSlice({
	name: 'getTicket',
	initialState: {
		details: [],
		total: 0,
	},
	reducers: {
		addTicket(state, { payload }) {
			if (
				!state.details.find(
					(e) => e.id === payload.id && e.seatId === payload.seatId
				)
			) {
				state.details = [...state.details, payload];
			} else {
				state.details = state.details.filter(
					(e) => e.id !== payload.id || e.seatId !== payload.seatId
				);
			}

			state.total = state.details.reduce(
				(prev, current) => prev + current.price,
				0
			);

			return state;
		},
		reset(state) {
			state.details = [];
			state.total = 0;
			return state;
		},
	},
});

export const { addTicket, reset } = getTicketSlice.actions;

export default getTicketSlice;
