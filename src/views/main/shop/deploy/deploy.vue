<template>
  <div>
    <h1>EventSource Example with Vue 3</h1>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [] // 存储接收到的消息
    }
  },
  mounted() {
    this.startEventSource()
  },
  methods: {
    startEventSource() {
      const xhr = new XMLHttpRequest()

      xhr.open(
        'GET',
        'http://127.0.0.1:8081/ekube/api/v1/proxy/namespaces/default/pods/nginx-54bcfc567b-h5rbh/log?&tailLines=1000&timestamps=true&follow=true',
        true
      )

      xhr.onreadystatechange = () => {
        if (xhr.readyState >= 3 && xhr.status === 200) {
          console.log('发生变化', xhr.responseText)
          // callback(xhr.responseText)
        }
      }

      xhr.send()

      return xhr
    }
  }
}
</script>
