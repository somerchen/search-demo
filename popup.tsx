import { Select, Space, Input } from 'antd'
import './index.less'
import { useStorage } from '@plasmohq/storage'
import { defaultSearchType, searchConfigList, getConfigInfo } from './config'

const { Option } = Select

function IndexPopup() {
  const [searchType, setSearchType] = useStorage("searchType", (storeSearchType) => storeSearchType || defaultSearchType)

  const handleChange = (value) => {
    setSearchType(value)
  }

  const onSearch = (value) => {
    const config = getConfigInfo(searchType);
    console.log(config, value)
    window.open(`${config.searchUrl}${value}`);
  }

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
    </div>
  )
}

export default IndexPopup
