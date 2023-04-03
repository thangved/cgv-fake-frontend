import request from '@/utils/request';

class ShowService {
	static getAll(params = {}) {
		return request.get('shows', { params });
	}

	static create(payload) {
		return request.post('shows', payload);
	}

	static getSeats(id) {
		return request.get(`/shows/${id}/seats`);
	}

	static update(id, payload) {
		return request.put(`shows/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`shows/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`shows/${id}`);
	}
}

export default ShowService;
