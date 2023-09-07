<template>
  <div class="search">
    <!-- 搜索表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入查询的用户名" v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入查询的用户名" v-model="searchForm.realname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入查询的电话号" v-model="searchForm.cellphone"></el-input>
          </el-form-item>
        </el-col>
        <!-- 自动换行 -->
        <el-col :span="8">
          <el-form-item label="状态" prop="enabled">
            <el-select placeholder="请选择查询的状态" style="width: 100%" v-model="searchForm.enabled">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker type="daterange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" v-model="searchForm.createAt"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 重置和搜索 -->
    <div class="btns">
      <el-button icon="Refresh" size="large" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" size="large" type="primary" @click="handleSearchClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enabled: '1',
  createAt: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}

function handleSearchClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 10px 20px;
    margin-top: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 50px 10px 0;
  .el-button {
    height: 36px;
  }
}
</style>
