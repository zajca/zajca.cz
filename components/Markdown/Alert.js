  export default {
    props: {
      color: {
        type: String,
        default: 'teal'
      },
      title: {
        type: String
      }
    },
    computed: {
      topClass() {
        return `bg-${this.color}-lightest border-t-4 border-${this.color} rounded-b text-${this.color}-darkest px-4 py-3 shadow-md`
      }
    },
    render(h) {
      return h('div', { staticClass: this.topClass }, [
        h('div', { staticClass: 'flex' }, [
          h('p', { staticClass: 'text-sm' }, [this.$slots.default])
        ])
      ])
    }
  }
