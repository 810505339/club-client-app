import {useEffect} from 'react';
import {getLocales} from 'react-native-localize';
import {changeLanguage} from 'utils/i18next';

export default function () {
  const systemLanguage = getLocales()[0].languageCode;
  useEffect(() => {
    changeLanguage(systemLanguage);
  }, [systemLanguage]);
}
