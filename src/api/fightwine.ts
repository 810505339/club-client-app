import service from './base';


//可选酒局模式

export const selectableMode = async () => {
  const { data } = await service({
    url: '/consumption/wineParty/selectableMode',
    method: 'get',
  });

  return data;
};
