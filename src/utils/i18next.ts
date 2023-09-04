import i18next, { ModuleType } from 'i18next';
import { initReactI18next } from 'react-i18next';
import storage from "@storage/index";
import { getLocales } from 'react-native-localize';



 const lngKey = '@lng';

const languageDetector = {
  type: 'languageDetector' as ModuleType,
  async: true,
  detect: async function (callback) {
    // 获取上次选择的语言
    const lng = await storage.load({ key: lngKey })
    console.log(lng);
    
    if (lng === 'locale') {
      callback(getSystemLanguage());
    } else {
      callback(lng);
    }
  },
};

// 初始化i18next配置
i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en', // 切换语言失败时的使用的语言
    debug: __DEV__, // 开发环境开启调试
    lng: getLocales()[0].languageCode,
    // 资源文件
    resources: {
      en: {
        translation: require('../locales/en-US.json'),
      },
      zh: {
        translation: require('../locales/zh-CN.json'),
      },
    },
    react: {
      useSuspense: false,
    },
  });

/**
 * 获取当前系统语言
 * @returns
 */
  export const getSystemLanguage = (): string => {
    const locales = getLocales();
    return locales[0].languageCode;
  };
  
  


/**
 * 切换语言
 * @param lng
 */
export const changeLanguage = async (lng?: 'en' | 'zh' | 'locale') => {
  // 切换语言
  console.log(lng);
  //todo 首次进入需要读取storage.load
  await i18next.changeLanguage(lng === 'locale' ?getSystemLanguage() : lng);
  // 持久化当前选择
  storage.save({
    key: lngKey,
    data: {
      lng:lng
    }
  });
};

export default i18next;


