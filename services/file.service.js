const { default: request } = require('@/utils/request');

class FileService {
	static upload(file) {
		const formData = new FormData();
		formData.append('file', file);
		return request.post('files', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}

export default FileService;
