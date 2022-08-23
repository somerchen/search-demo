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

chrome.storage.sync.get('searchType', (items) => {
  const { searchType = defaultSearchType } = items;
  setChromeContextMenu(searchType)
})

chrome.storage.onChanged.addListener(function ({ searchType: { newValue, oldValue } }) {
  if (newValue !== oldValue) {
    setChromeContextMenu(newValue)
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
