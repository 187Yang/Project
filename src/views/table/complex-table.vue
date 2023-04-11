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
      <el-table-column align="center">
        <template slot-scope="{row}">
          <el-button type="success" size="small" icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)">
            课程下单
          </el-button>
          <el-button type="success" size="small" icon="el-icon-circle-check-outline"
            @click="getconfirmInfo(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      <el-dialog :title="titleInfo+'个人课程信息'" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="date" label="序号"></el-table-column>
          <el-table-column property="name" label="课程名"></el-table-column>
        </el-table>
      </el-dialog>
  </div>
</template>

<script>
import { fetchList, CourseInterface, getSearchCourse } from '@/api/article'

export default {
  name: 'ComplexTable',
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      dialogTableVisible: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      titleInfo: '',
      gridData: [],
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
    // 查看课程信息
    getconfirmInfo(row) {
      this.$prompt('密码', '查看课程信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入密码'
      }).then(({ value }) => {
        var courseInfo = {
          platform: row.platform,
          account: row.account,
          pwd: value,
          school: row.school,
        }
        getSearchCourse(courseInfo).then(res => {
          this.dialogTableVisible = true
          if(res.data.code == 200) {
            this.titleInfo = res.data.userName
            this.gridData = res.data.data
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    },
    // 课程下单
    confirmEdit(row) {
      this.$prompt('密码', '课程下单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入密码'
      }).then(({ value }) => {
        var courseInfoOne = {
          platform: row.platform,
          account: row.account,
          pwd: value,
          school: row.school,
          coursename: row.coursename,
          courseid: row.courseid
        }
        CourseInterface(courseInfoOne).then(res => {
          if(res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消订单'
        });
      });
    }
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
