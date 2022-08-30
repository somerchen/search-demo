import { useEffect, useState } from 'react'
import { Select, Space, Input, Button } from 'antd'
import './index.less'
import { useStorage } from '@plasmohq/storage'
import { defaultSearchType, searchConfigList, getConfigInfo } from './config'

const { Option } = Select

function IndexPopup() {
  const [searchType, setSearchType] = useStorage("searchType", (storeSearchType) => storeSearchType || defaultSearchType)
  const [proxyRule, setProxyRule] = useStorage("proxyRule", (storeProxyRule) => {
    return storeProxyRule || {};
  })
  const [popupProxy, setPopupProxy] = useState({
    url: proxyRule.url || '',
    proxy: proxyRule.proxy || '',
  })

  const handleChange = (value) => {
    setSearchType(value)
  }

  const onSearch = (value) => {
    const config = getConfigInfo(searchType);
    console.log(config, value)
    window.open(`${config.searchUrl}${value}`);
  }

  const handleClick = () => {
    setProxyRule(popupProxy)
  }

  useEffect(() => {
    setPopupProxy({ ...proxyRule })
  }, [proxyRule]);

  return (
    <div
      style={{
        width: 400,
        height: 200,
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}
    >
      <Space align="center">
        <Select value={searchType} onChange={handleChange}>
          {searchConfigList.map((list) => (
            <Option value={list.key} key={list.key}>{list.name}</Option>
          ))}
        </Select>
        <Input.Search
          enterButton="搜索"
          allowClear
          autoFocus
          onSearch={onSearch}
        />
      </Space>
      <Space align="center" style={{ marginTop: '12px' }}>
        <Input
          value={popupProxy.url}
          placeholder='需要代理的url'
          onChange={(e) => setPopupProxy({ ...popupProxy, url: e.target.value })}
        />
        <Input
          value={popupProxy.proxy}
          placeholder='代理到的域名/ip'
          onChange={(e) => setPopupProxy({ ...popupProxy, proxy: e.target.value })}
        />
        <Button onClick={handleClick}>保存</Button>
      </Space>
    </div>
  )
}

export default IndexPopup
