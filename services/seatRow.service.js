import request from '@/utils/request';

class SeatRowService {
	static getAll(params = {}) {
		return request.get('seat-rows', { params });
	}

	static create(payload) {
		return request.post('seat-rows', payload);
	}

	static update(id, payload) {
		return request.put(`seat-rows/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`seat-rows/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`seat-rows/${id}`);
	}
}

export default SeatRowService;
