import service from './base';
import { btoa } from 'js-base64';
import { setGenericPassword } from 'react-native-keychain';
import storage from '@storage/index';
import { IM_KEY } from '@storage/shop/key';
/**
 * https://www.ietf.org/rfc/rfc6749.txt
 * OAuth 协议 4.3.1 要求格式为 form 而不是 JSON 注意！
 */
const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded';
const BASICAUTH = 'app_customer_sms:app_customer_sms';

type IData = {
	[key in string]: string
}

//登录

export const loginApi = async ({ code, grant_type = 'mobile', scope = 'server', mobile }: IData) => {
	const basicAuth = 'Basic ' + btoa(BASICAUTH);
	const { data } = await service({
		url: '/auth/oauth2/token',
		method: 'post',
		params: { code: code, grant_type: grant_type, scope: scope, mobile: mobile },
		headers: {
			'content-Type': FORM_CONTENT_TYPE,
			skipToken: true,
			Authorization: basicAuth,
		},
	});


	console.log(data);
	if (data) {
		//sub 手机号 token //登录token
		await setGenericPassword(data?.sub, data?.access_token,);
		await storage.save({
			key: IM_KEY,
			data: {
				userId: data?.user_id,
				userSig: data?.user_info?.userSig,
				userInfo: data?.user_info,
			},
		});

	}
	return data;


};


//发送客户登录验证码
export const sendYzmApi = (mobile: string) => {
	return service({
		url: `/admin/mobile/customer_login/${mobile}`,
	});
};


// 参数接口
export interface EditSelfParams {
	/*头像文件id */
	avatarFileId: number;

	/*昵称 */
	nickname: string;

	/*生日 */
	birthday: string;
}


/**
 * 修改个人信息（用户操作）
 * @param {object} params 修改个人信息（用户操作）
 * @param {number} params.avatarFileId 头像文件id
 * @param {string} params.nickname 昵称
 * @param {object} params.birthday 生日
 * @returns
 */
export const editUserInfoApi = (data: EditSelfParams) => {
	return service({
		url: '/admin/customer/edit-self',
		method: 'put',
		data,
	});
};

