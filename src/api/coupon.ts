
import service from './base';
export const getCustomerCoupon = async (data: any) => {
  const { data: res } = await service({
    // url: '/operation/coupon/getCustomerCoupon',
    url: '/operation/drinksMeal/page',
    method: 'get',
    params: data,
  });

  return res;
};
