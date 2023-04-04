const { createSlice } = require('@reduxjs/toolkit');

const getTicketSlice = createSlice({
	name: 'getTicket',
	initialState: {
		details: [],
		total: 0,
	},
	reducers: {
		addTicket(state, { payload }) {
			const existing = !!state.details.find(
				(e) => e.rowId === payload.rowId && e.seatId === payload.seatId
			);

			if (existing) {
				state.details = state.details.filter(
					(e) =>
						e.rowId !== payload.rowId || e.seatId !== payload.seatId
				);
			} else {
				state.details = [...state.details, payload];
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
