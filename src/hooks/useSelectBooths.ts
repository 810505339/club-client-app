

import { useRequest } from 'ahooks';
import { getOpenBooth } from '@api/booths';
import { useImmer } from 'use-immer';


type IParams = {
  peopleNum?: number,
  areaId: string,
  entranceDate: string
}

export default ({ areaId, entranceDate, peopleNum }: IParams) => {
  useRequest(() => getOpenBooth({ areaId, entranceDate, peopleNum }), {
    onSuccess: (res) => {
      setBooths(darft => {
        darft.list = res?.data?.boothList ?? [];
        darft.picture = res?.data?.picture;
      });
    },
  });
  const [booths, setBooths] = useImmer({
    activeIndex: undefined,
    list: [],
    picture: null,
  });


  const itemPress = (i: number) => {
    setBooths((draft) => {
      draft.activeIndex = i;
    });
  };


  return {
    booths,
    itemPress,
  };
};


