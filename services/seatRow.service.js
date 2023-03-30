import request from '@/utils/request';

class SeatRow {
	static getAll() {
		return request.get('seatrows');
	}

	static create(payload) {
		return request.post('seatrows', payload);
	}

	static update(id, payload) {
		return request.put(`seatrows/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`seatrows/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`seatrows/${id}`);
	}
}

export default SeatRow;
