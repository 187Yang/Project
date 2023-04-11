<template>
  <div class="app-container">
    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="PlatformName">
        <template slot-scope="{row}">
          <span>{{ row.PlatformName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="school">
        <template slot-scope="{row}">
          <span>{{ row.school }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="studentName">
        <template slot-scope="{row}">
          <span>{{ row.studentName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="coursename">
        <template slot-scope="{row}">
          <span>{{ row.coursename }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="addtime">
        <template slot-scope="{row}">
          <span>{{ row.addtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="status">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="progress">
        <template slot-scope="{row}">
          <span>{{ row.progress }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="details">
        <template slot-scope="{row}">
          <span>{{ row.details }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'InlineEditTable',
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(res => {
        this.list = res.data.data
        this.total = res.data.count
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
