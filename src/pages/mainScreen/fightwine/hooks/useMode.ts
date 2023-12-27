//获取可选模式
//allMode 所有酒局模式
//selectableMode 我的酒局模式（可选）

import { useRequest } from 'ahooks';
import { selectableMode } from '@api/fightwine';
import { useState } from 'react';


export default <T>(url: string = 'allMode', list: any[]) => {
  const [modeList, setModeList] = useState<T>([]);
  useRequest(() => selectableMode(url), {
    onSuccess: (res) => {
      const temp = res.data.map(d => {
        const index = list.findIndex(l => d.winePartyMode === l.winePartyMode);
        if (~index) {
          return {
            ...list[index],
            ...d,
          };
        }
      });
      setModeList(temp);

    },
  });
  return {
    modeList,
  };
};
