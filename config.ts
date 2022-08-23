export default {}

export const defaultSearchType = 'baidu'

export const searchConfigList = [
  {
    name: '百度',
    key: 'baidu',
    searchUrl: 'https://www.baidu.com/s?wd=',
  },
  {
    name: '必应',
    key: 'biying',
    searchUrl: 'https://cn.bing.com/search?q=',
  },
  {
    name: '谷歌',
    key: 'chrome',
    searchUrl: 'https://www.google.com.hk/search?q=',
  },
]

export const getConfigInfo = (type) => {
  const filterType = type.replaceAll('"', '');
  return searchConfigList.find((config) => config.key === filterType)
}