import { defaultSearchType, getConfigInfo } from './config'

const setChromeContextMenu = (type) => {
  const config = getConfigInfo(type);
  chrome.contextMenus.removeAll()
  chrome.contextMenus.create({
    id: type,
    title: `使用${config.name}搜索：'%s'`, // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
  });
}

const setChromeProxySetting = (url, proxy) => {
  console.log(url, proxy)
  const proxyConfig = {
    mode: "pac_script",
    pacScript: {
      data: `
        const direct = 'DIRECT';
        const proxy = 'PROXY ${proxy}';
        const ruleUrl = '${url}';
        function FindProxyForURL(url, host) {
          if (url.includes(ruleUrl)) return proxy;
          return direct;
        }
      `
    }
  };
  chrome.proxy.settings.set(
    { value: proxyConfig, scope: 'regular' },
    () => {
      console.log('reset setting finished')
    }
  );
}

chrome.storage.sync.get('searchType', (items) => {
  const { searchType = defaultSearchType } = items;
  setChromeContextMenu(searchType)
})

chrome.storage.sync.get('proxyRule', (items) => {
  const proxyRule = JSON.parse(items.proxyRule);
  const { url, proxy } = proxyRule;
  setChromeProxySetting(url, proxy)
})

chrome.storage.onChanged.addListener(function ({ searchType = {}, proxyRule = {} }) {
  const { newValue, oldValue } = searchType;
  if (newValue && newValue !== oldValue) {
    setChromeContextMenu(newValue)
  }

  const { newValue: proxyNewRule, oldValue: proxyOldRule } = proxyRule;
  if (proxyNewRule !== proxyOldRule) {
    const { url, proxy } = JSON.parse(proxyNewRule);
    setChromeProxySetting(url, proxy);
  }
})

chrome.contextMenus.onClicked.addListener(function (info, tabs) {
  const { selectionText, menuItemId } = info;
  const config = getConfigInfo(menuItemId);
  chrome.tabs.create({
    url: `${config.searchUrl}${selectionText}`
  })
})

export default {}

// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     const { url } = details;
//     console.log(details);
//     // const rule = rules.find(rule => url.startsWith(rule.url));
//     if (url.includes('api')) {
//       return {
//         redirectUrl: url.replace('http://192.168.6.150:8000', 'http://192.168.6.150:7002')
//       };
//     }
//   },
//   {
//     urls: ['<all_urls>'],
//   },
//   ['blocking']
// )