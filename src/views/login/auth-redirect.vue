<template>
  <div class="logon-container">
    <div class="logon-box">
      <p class="title">页面注册</p>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" style="color: white">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model="form.userInfo" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="form.pwd" type="password" placeholder="登录密码" />
        </el-form-item>
        <el-form-item>
          <el-button class="primary" @click="onSubmit">注 册</el-button>
          <el-button class="primary" @click="gotoLogin">去登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AuthRedirect',
  data() {
    return {
      form: {
        username: '',
        userInfo: '',
        pwd: ''
      }
    }
  },
  created() {
    const hash = window.location.search.slice(1)
    if (window.localStorage) {
      window.localStorage.setItem('x-admin-oauth-code', hash)
      window.close()
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push({ path: '/' })
    }
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
<style lang="scss">
.logon-container{
  background-color: #2d3a4b;
  width: 100%;height:100%;
  .logon-box{
    width: 350px;height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;margin: auto;
    .title{
      width: 100%;font-size: 25px;color: white;
      text-align: center;font-weight: bold;
    }
    .el-form-item__label{
      color: white;
    }
    .primary{
      border: 1px solid white;background: #2d3a4b;
      color: white;
    }
    .primary:hover{
      border: 1px solid #2d3a4b;background: white;
      color: #2d3a4b;
    }
  }
}
</style>
