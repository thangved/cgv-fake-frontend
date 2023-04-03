import request from '@/utils/request';

class CinemaService {
	static getAll(params = {}) {
		return request.get('cinemas', { params });
	}

	static create(payload) {
		return request.post('cinemas', payload);
	}

	static update(id, payload) {
		return request.put(`cinemas/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`cinemas/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`cinemas/${id}`);
	}
}

export default CinemaService;
