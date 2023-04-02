import request from '@/utils/request';

class SeatTypeService {
	static getAll() {
		return request.get('seat-types');
	}

	static create(payload) {
		return request.post('seat-types', payload);
	}

	static update(id, payload) {
		return request.put(`seat-types/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`seat-types/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`seat-types/${id}`);
	}
}

export default SeatTypeService;
