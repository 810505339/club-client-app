
import service from './base';
export const getCustomerCoupon = async (data: any) => {
  const { data: res } = await service({
    url: '/operation/coupon/getCustomerCoupon',
    method: 'get',
    params: data,
  });

  return res;
};
