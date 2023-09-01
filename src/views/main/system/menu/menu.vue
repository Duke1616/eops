<template>
  <div>test</div>
</template>

<script setup lang="ts">
import useContainerStore from '@/store/pod/log'

const containerStore = useContainerStore()
const render = () => {
  console.log(2, containerStore.logs.data)
}
const test = containerStore.watchLogs(() => render())

console.log('1', test)
</script>
