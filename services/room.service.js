import request from '@/utils/request';

class RoomService {
	static getAll(params = {}) {
		return request.get('rooms', { params });
	}

	static create(payload) {
		return request.post('rooms', payload);
	}

	static update(id, payload) {
		return request.put(`rooms/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`rooms/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`rooms/${id}`);
	}
}

export default RoomService;
