import { useEffect } from 'react';
import { changeLanguage } from '@utils/i18next';
//自动转换语言
export default function () {
  useEffect(() => {
    changeLanguage();
  }, []);
}
