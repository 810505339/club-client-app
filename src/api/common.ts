import service from './base';

//上传文件(私有)
export const updateFile = async (file: any) => {
	return await service({
		url: '/admin/sys-file/upload/private',
		method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		data:file,
	});
};
