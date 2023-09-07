<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof UserContent>>()

function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}

function handleResetClick() {
  console.log('开始请求')
  contentRef.value?.fetchUserListData()
}
</script>

<style lang="less" scoped></style>
