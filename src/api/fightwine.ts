import service from './base';


//可选酒局模式

export const selectableMode = async () => {
  const { data } = await service({
    url: '/consumption/wineParty/selectableMode',
    method: 'get',
  });

  return data;
};


//校验卡座占用
export const checkBooth = async (data: any) => {
  const { data: res } = await service({
    url: '/consumption/wineParty/checkBooth',
    method: 'POST',
    data,
  });

  return res;
};
