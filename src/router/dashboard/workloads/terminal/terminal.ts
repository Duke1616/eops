const terminal = () => import('@/views/main/asset/hardware/hardware.vue')
export default {
  path: '/cluster/:cluster/terminal',
  name: 'terminal',
  component: terminal,
  children: []
}
