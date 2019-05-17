import XEUtils from 'xe-utils'
import zhCNLocat from '../lib/locale/lang/zh-CN'
import renderMap from './components/table/src/renderer'

const GlobalConfig = {
  size: null,
  optimized: false,
  showAllOverflow: null,
  showHeaderAllOverflow: null,
  contextMenu: null,
  tooltipTheme: 'dark',
  renderMap,
  iconMap: {
    sortAsc: 'vxe-sort--asc-icon',
    sortDesc: 'vxe-sort--desc-icon',
    filter: 'vxe-filter--icon',
    edit: 'vxe-edit--icon',
    tree: 'vxe-tree--node-icon'
  },
  i18n: (key, value) => XEUtils.get(zhCNLocat, key)
}

export default GlobalConfig
