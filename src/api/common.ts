import { fileStore } from '@store/getfileurl';
import service from './base';

//上传文件(私有)
export const updateFile = async (file: any) => {
	const { data } = await service({
		url: '/admin/sys-file/upload/private',
		method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		data: file,
	});
	return data;
};


/*
storeId 门店id
type  轮播图类型,1:PC,0:移动
limitNum  条数,示例值(5)
*/
export type IParams = {
	storeId: string,
	type?: string,
	limitNum?: string
}

//获取轮播图
export const getcarouselList = async (params: IParams) => {
	const { data } = await service({
		url: '/operation/carousel/listByStore',
		method: 'GET',
		params,
	});



	return data?.data?.map((item: any) => {
		item.pictureFile = `${fileStore.fileUrl}/${item.pictureFile[0].fileName}`;
		return item;
	});
};


//获取公共地址
export const getCommonFileUrl = async () => {
	const { data } = await service({
		url: '/admin/sys-file/access/common',
		method: 'get',
	});


	return data;
};
