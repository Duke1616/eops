<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="60px"></el-table-column>
        <el-table-column align="center" label="用户名" prop="spec.username" width="150px"></el-table-column>
        <el-table-column align="center" label="真实姓名" prop="spec.profile.real_name" width="150px"></el-table-column>
        <el-table-column align="center" label="手机号码" prop="spec.profile.phone" width="150px"></el-table-column>
        <el-table-column align="center" label="状态" prop="status.locked" width="100px">
          <template #default="scope">
            <el-button size="small" :type="!scope.row.status.locked ? 'primary' : 'danger'">
              {{ !scope.row.status.locked ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="meta.create_at">
          <template #default="scope">
            {{ formatUTC(scope.row.meta.create_at) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="修改时间" prop="meta.update_at">
          <template #default="scope">
            {{ formatUTC(scope.row.meta.update_at) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160px">
          <el-button size="small" text icon="Edit">编辑</el-button>
          <el-button size="small" text icon="Delete">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :small="true"
        layout="total,sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import useSystemStore from '@/store/main/system/system'
import { ref } from 'vue'

const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

// 发起请求，获取用户列表数据
fetchUserListData()

// 响应式展示数据
const { usersList, usersTotalCount } = storeToRefs(systemStore)
console.log(usersList)

// 页码相关的逻辑

function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

function fetchUserListData(formData: any = {}) {
  const page_size = pageSize.value
  const page_number = (currentPage.value - 1) * page_size
  const info = { page_size, page_number }

  // 请求组合
  const queryInfo = { ...info, formData }
  // 发起网络请求
  systemStore.getUserListAction(queryInfo)
}

defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 20px;
  }
}

.table {
  .el-table__cell {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
