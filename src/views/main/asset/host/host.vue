<template>
  <div>
    <div ref="terminalContainer"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Terminal } from 'xterm' // 导入 xterm 包，用于创建和操作终端对象
import { common as xtermTheme } from 'xterm-style' // 导入 xterm 样式主题
import 'xterm/css/xterm.css' // 导入 xterm CSS 样式
import { FitAddon } from 'xterm-addon-fit' // 导入 xterm fit 插件，用于调整终端大小
import { WebLinksAddon } from 'xterm-addon-web-links' // 导入 xterm web-links 插件，可以捕获 URL 并将其转换为可点击链接
import 'xterm/lib/xterm.js' // 导入 xterm 库
import axios from 'axios'

export default {
  name: 'LogViewer',
  setup() {
    const terminalContainer = ref(null)
    let terminal
    let fitAddon

    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8081/ekube/api/v1/proxy/namespaces/default/pods/example-foo-7c554d99b5-wqc5v/log?tailLines=1000&timestamps=true&follow=false'
        )

        // const response = await axios.get('http://127.0.0.1:8150/keyauth/api/v1/user')

        console.log(444, response.data.split('\n').length)
        let arr = response.data.split('\n')
        arr.forEach((item) => {
          terminal.writeln(item)
        })
        // const logs = response.data
      } catch (error) {
        console.error('Error fetching logs:', error)
      }
    }

    onMounted(() => {
      terminal = new Terminal()
      fitAddon = new FitAddon()

      terminal.loadAddon(fitAddon)
      terminal.open(terminalContainer.value)
      fitAddon.fit()

      fetchLogs()
    })

    return {
      terminalContainer
    }
  }
}
</script>

<style>
/* Add any necessary styles here */
</style>
