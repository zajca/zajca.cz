export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'info'
    }
  },
  render(h, context) {
    let color = 'teal' // default and info

    switch (context.props.type) {
      case 'warning':
        color = 'orange'
        break;
      case 'danger':
        color = 'red'
        break;
      case 'success':
        color = 'green'
        break;
    }

    return h('div', { staticClass: `bg-${color}-lightest border-t-4 border-${color} rounded-b text-${color}-darkest px-4 py-3 shadow-md` }, [
      h('div', { staticClass: 'flex' }, [
        h('p', { staticClass: 'text-sm' }, [context.children])
      ])
    ])
  }
}
