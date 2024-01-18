
import service from './base';

type IParams = {
  status: string,
  size: string,
  current: string
}
export const myTicket = async (params: IParams) => {
  const { data } = await service({
    url: '/consumption/ticket/myTicket',
    method: 'get',
    params: params,
  });
  return data;
};
