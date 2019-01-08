export default {
  name: 'i-c',
  render(h) {
    return h('code', {staticClass:'inline'}, [this.$slots.default])
  }
}
