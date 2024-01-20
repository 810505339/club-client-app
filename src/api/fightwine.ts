import service from './base';


//可选酒局模式

export const selectableMode = async (url: string = 'allMode') => {
  const { data } = await service({
    url: `/consumption/wineParty/${url}`,
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


//发起酒局

export const create = async (data: any) => {
  const { data: res } = await service({
    url: '/consumption/wineParty/create',
    method: 'POST',
    data,
  });

  return res;
};



///consumption/wineParty/calPayAmount

export const calPayAmount = async (data: any) => {
  const { data: res } = await service({
    url: '/consumption/wineParty/calPayAmount',
    method: 'POST',
    data,
  });

  return res;
};



///酒局广场
export const winePartyByAll = async (params: any) => {
  const { data: res } = await service({
    url: '/consumption/wineParty/page/all',
    method: 'GET',
    params,
  });

  return res;
};


///酒局详情
export const winePartyByDetail = async (partyId: string) => {
  const { data: res } = await service({
    url: `/consumption/wineParty/detail/${partyId}`,
    method: 'GET',
  });

  return res;
};


//加入酒局

export const joinWineParty = async (partyId: string) => {
  const { data: res } = await service({
    url: `/wineParty/join/${partyId}`,
    method: 'PUT',
  });

  return res;
};



