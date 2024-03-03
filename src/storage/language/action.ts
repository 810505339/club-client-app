import storage from '../index';
import { LANGUAGE } from './key';

/* language
   en,
   cn
*/
const saveLanguageStorage = async (language: string) => {
  await storage.save({
    key: LANGUAGE,
    data: {
      language: language,
    },
  });
};

const loadLanguageStorage = async () => {

  return await storage.load({
    key: LANGUAGE,
  });
};
export {
  saveLanguageStorage,
  loadLanguageStorage,
};
