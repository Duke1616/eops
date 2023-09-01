<template>
  <div class="app-container">
    <!-- 使用 Element UI 的表单组件创建一个带有标签和输入框的表单 -->
    <el-form :model="form" :inline="true" label-width="120px">
      <el-form-item label="Command">
        <!-- 命令选择框 -->
        <el-select v-model="form.isRealtime" placeholder="false">
          <el-option label="false" value="false" />
          <el-option label="true" value="true" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- 提交按钮 -->
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
      <div id="terminal"></div>
      <!-- 终端视图容器 -->
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Terminal } from 'xterm' // 导入 xterm 包，用于创建和操作终端对象
import 'xterm/css/xterm.css' // 导入 xterm CSS 样式
import { FitAddon } from 'xterm-addon-fit' // 导入 xterm fit 插件，用于调整终端大小
import { WebLinksAddon } from 'xterm-addon-web-links' // 导入 xterm web-links 插件，可以捕获 URL 并将其转换为可点击链接
import 'xterm/lib/xterm.js' // 导入 xterm 库
import useContainerStore from '@/store/pod/log'
import { ref, reactive, watch } from 'vue'
import { AnsiUp } from 'ansi_up'
import _ from 'lodash'

const converter = new AnsiUp()

const form = reactive<any>({
  namespace: ref('default'),
  isRealtime: ref('false')
})

const containerStore = useContainerStore()
const termText = ref('')
watch(
  () => containerStore.logs.data,
  (newVal, oldVal) => {
    const newLog = newVal.replace(oldVal, '')
    termText.value += newLog
  }
)

function onSubmit() {
  // 创建一个新的 Terminal 对象
  const xterm = new Terminal({
    convertEol: true,
    cursorBlink: true
  })

  // 打开这个终端，并附加到 HTML 元素上
  const terminalContainer = document.getElementById('terminal')

  if (terminalContainer) {
    xterm.open(terminalContainer)

    // 创建并加载 FitAddon 和 WebLinksAddon
    const fitAddon = new FitAddon()
    xterm.loadAddon(fitAddon)
    xterm.loadAddon(new WebLinksAddon())

    // 调整终端的大小以适应其父元素
    fitAddon.fit()

    // containerStore.stopWatchLogs()

    const render = () => {
      const items = String(containerStore.logs.data)
        .replace(/\\r\\n/g, '\n')
        .split('\n')

      const PATTERN_UTC_TIME = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z/

      console.log('原始日志')

      {
        items.map((text, index) => {
          const match = text.match(PATTERN_UTC_TIME)
          const key = match ? match[0] : index
          const content = match ? text.replace(match[0], '') : text

          // console.log('key', key)

          // console.log('content', content)
        })
      }

      xterm.write(termText.value)
    }

    const params = reactive<any>({
      foown: false
    })

    containerStore.watchLogs({ silent: true, params }, _.debounce(render, 100))
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
