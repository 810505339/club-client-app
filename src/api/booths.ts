import service from './base';

//获取可售卡座
export const getOpenBooth = async (data: any) => {
  const { data: res } = await service({
    url: '/consumption/booth/getOpenBooth',
    method: 'post',
    data,
  });

  return res;
};


//通过卡座id查询酒水套餐 1729147588190720002

export const getByBoothId = async (boothId: string) => {
  const { data: res } = await service({
    url: `/operation/drinksMeal/getByBoothId/${boothId}`,
    method: 'get',
  });

  return res;
};
