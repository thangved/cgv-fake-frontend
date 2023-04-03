import getTicketSlice from './getTicketSlice';

const { configureStore } = require('@reduxjs/toolkit');

const getTicketStore = configureStore({
	reducer: { getTicket: getTicketSlice.reducer },
	devTools: true,
});

export default getTicketStore;
