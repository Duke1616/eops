<template>
  <div class="login-panel">
    <!-- 标题 -->
    <h1 class="title">自动化平台</h1>
    <!-- tabs -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="AD登录" name="ldap">
          <template #label>
            <div class="label">
              <el-icon><Monitor /></el-icon>
              <span class="text">AD认证</span>
            </div>
          </template>
          <pane-ldap ref="ldapRef" />
        </el-tab-pane>
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon> <UserFilled /> </el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 顶部 -->
    <div class="controls">
      <el-checkbox label="记住密码" v-model="isRemPwd"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick"
      >立即登陆</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PaneAccount from './pane-accout.vue'
import PaneLdap from './pane-ldap.vue'
const activeName = ref('ldap')

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.removeCache('isRemPwd')
  localCache.setCache('isRemPwd', newValue)
})

const ldapRef = ref<InstanceType<typeof PaneLdap>>()

function handleLoginBtnClick() {
  if (activeName.value == 'ldap') {
    // 获取子组件的实例
    ldapRef.value?.loginAction(isRemPwd.value)

    // 调用方法
  } else {
    console.log('账号登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      padding-left: 10px;
    }
  }
  .controls {
    display: flex;
    margin-top: 12px;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
