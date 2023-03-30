import request from '@/utils/request';

class SeatType {
	static getAll() {
		return request.get('seattypes');
	}

	static create(payload) {
		return request.post('seattypes', payload);
	}

	static update(id, payload) {
		return request.put(`seattypes/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`seattypes/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`seattypes/${id}`);
	}
}

export default SeatType;
