import request from '@/utils/request';

class RoomType {
	static getAll() {
		return request.get('room');
	}

	static create(payload) {
		return request.post('room', payload);
	}

	static update(id, payload) {
		return request.put(`room/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`room/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`room/${id}`);
	}
}

export default RoomType;
