import service from './base';
//获取订单列表
export const getOrderList = async (params: any) => {
  return service({
    url: '/consumption/order',
    method: 'get',
    params,
  });
};

//支付（临时）
export const tempPay = async (orderId: string) => {
  return service({
    url: `/consumption/order/tempPay/${orderId}`,
    method: 'post',
  });
};

//支付成功后续流程
export const paySuccessPost = async (data: any) => {
  return service({
    url: '/consumption/order/paySuccessPost',
    method: 'post',
    data,
  });
};
