import request from '@/utils/request';

class InvoiceService {
	static getAll(params = {}) {
		return request.get('invoices', { params });
	}

	static create(payload) {
		return request.post('invoices', payload);
	}

	static delete(id) {
		return request.delete(`invoices/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`invoices/${id}`);
	}
}

export default InvoiceService;
