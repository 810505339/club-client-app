import service from './base';
//获取门店的列表
export const getSotreList = async () => {
  return service({
    url: '/admin/store/allEnabled',
    method: 'get',
  });
};
