<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-button type="success" size="small" icon="el-icon-circle-check-outline"
      @click="setMoney">
      转账
    </el-button>
    <el-button type="success" size="small" icon="el-icon-circle-check-outline"
      @click="getMoney">
      充值
    </el-button>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import { getToken, getUserInfo } from '@/api/user'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      zzTokenInfo: '',
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getTokenInfo() {
      getToken().then(res => {
        if(res.data.code == 200) {
          this.zzTokenInfo = res.data.zztoken
        }
      })
    },
    setMoney() {
      this.getTokenInfo()
      this.$prompt('转账金额', '内部转账', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入转账金额'
      }).then(({ value }) => {
        var courseInfo = {
          zztoken: this.zzTokenInfo,
          money: value,
        }
        getUserInfo(courseInfo).then(res => {
          if(res.data.code == 200) {
            this.$message({
              type: 'success',
              message: res.data.msg
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    },
    getMoney() {
      this.$prompt('充值金额', '充值', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入充值金额'
      }).then(({ value }) => {
        // var courseInfo = {
        //   zztoken: this.zzTokenInfo,
        //   money: value,
        // }
        // getUserInfo(courseInfo).then(res => {
        //   if(res.data.code == 200) {
        //     this.$message({
        //       type: 'success',
        //       message: res.data.msg
        //     });
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
