import axios from 'axios';
import token from './token';

const request = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKENDURL,
});

request.interceptors.request.use((req) => {
	if (typeof window !== 'undefined') {
		req.headers.Authorization = `Bearer ${token.token}`;
	}
	return req;
});

request.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(error) => {
		throw error.response.data.message;
	}
);

export default request;
