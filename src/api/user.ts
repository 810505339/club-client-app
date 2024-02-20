import service from './base';

/* 查询user的总数 */
export const mineInfo = async () => {
  const { data } = await service('/consumption/customer/mineStat');
  return data;
};

//
export const detailsById = async () => {
  const { data } = await service({
    url: '/consumption/customer/details/my',
    method: 'get',
  });
  return data;
};
