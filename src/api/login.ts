import service from './base';
import { btoa } from 'js-base64';
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
	return await service({
		url: '/auth/oauth2/token',
		method: 'post',
		params: { code: code, grant_type: grant_type, scope: scope, mobile: mobile },
		headers: {
			'content-Type': FORM_CONTENT_TYPE,
			skipToken: true,
			Authorization: basicAuth,
		},
	});
};


//发送客户登录验证码
export const sendYzmApi = (mobile: string) => {
	return service({
		url: `/admin/mobile/customer_login/${mobile}`,
	});
};

