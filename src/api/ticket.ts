
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


export const ticketBooking = async (data: any) => {
  const { data: _data } = await service({
    url: 'consumption/ticket/booking',
    method: 'POST',
    data,
  });
  return _data;
};
