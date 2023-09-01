<template>
  <div class="pane-account">
    <el-form :model="account" :rules="accountRules" size="large" label-width="60px" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { IAccount } from '../types'
import type { FormRules, ElForm } from 'element-plus'

import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { USERNAME, PASSWORD } from '@/global/constants'

const account = reactive<IAccount>({
  username: localCache.getCache(USERNAME) ?? '',
  password: localCache.getCache(PASSWORD) ?? '',
  grant_type: 'ldap'
})

// 校验输入
const accountRules: FormRules = {
  username: [
    { required: true, message: '必须输入帐号信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,20}$/,
      message: '必须说6~20位的数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%^*?&+-])[A-Za-z\d$@#!%^*?&+-]{8,}/,
      message: '密码应当至少8位且含有数字、大小写字母及特殊字符',
      trigger: 'blur'
    }
  ]
}

// 执行账号登录, 进行验证
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const username = account.username
      const password = account.password
      const grant_type = account.grant_type

      loginStore.loginAccountAction({ username, password, grant_type }).then((res) => {
        if (isRemPwd) {
          localCache.setCache(USERNAME, username)
          localCache.setCache(PASSWORD, password)
        } else {
          localCache.removeCache(USERNAME)
          localCache.removeCache(PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请您输入正确的格式后操作～')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
