<template>
  <div>
    <p>加载 10 万行 1 万列，左右固定列，表尾合计</p>
    <p>实际渲染速度受以下影响：多选(超严重)、固定列(中度)、底部合计(中度)、数据运算量(轻度)、任何双向的数据或函数都会影响加载速度</p>
    <p>数据超大情况下必须使用：show-all-overflow,show-header-all-overflow 参数以及调整好 optimized：{scrollX,scrollY} 适合的参数可以更加流畅</p>

    <vxe-table
      ref="xTable"
      border
      resizable
      show-footer
      show-all-overflow
      show-header-all-overflow
      height="600"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :loading="loading"
      :optimized="{scrollX: {gt: 20, oSize: 4, rSize: 8}, scrollY: {gt: 500, oSize: 20, rSize: 50}}">
      <vxe-table-column type="index" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column v-for="(item, index) in tableColumn" :key="index" prop="name" :label="`column_${index}`" width="200"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200" fixed="right"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      loading: false,
      tableColumn: []
    }
  },
  created () {
    this.loading = true
    this.$nextTick(() => {
      this.$refs.xTable.reload([])
      setTimeout(() => {
        if (this.$refs.xTable) {
          let list = window.MOCK_DATA_LIST.slice(0, 100000)
          this.tableColumn = window.MOCK_DATA_LIST.slice(0, 10000)
          this.$refs.xTable.reload(list)
        }
        this.loading = false
      }, 500)
    })
  },
  methods: {
    footerCellClassName ({ rowIndex, column, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return 'col-blue'
        } else {
          return 'col-red'
        }
      }
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          } else if (column.property === 'age') {
            return `${parseInt(XEUtils.mean(data, column.property))} 岁`
          } else if (column.property === 'rate') {
            return `${parseInt(XEUtils.mean(data, column.property))} 分`
          }
          return '-'
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          } else if (column.property === 'rate') {
            return `总分 ${XEUtils.sum(data, column.property)}`
          }
          return '-'
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '统计'
          }
          if (column.property === 'sex') {
            let rest = XEUtils.groupBy(data, column.property)
            return `男 ${rest[1] ? rest[1].length : 0} 人，女 ${rest[0] ? rest[0].length : 0} 人`
          }
          return '-'
        })
      ]
    }
  }
}
</script>
