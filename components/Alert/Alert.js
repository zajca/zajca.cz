export const WARNING = {
  color: 'yellow',
  icon: import('./warn.svg')
}

export const SUCCESS = {
  color: 'green',
  icon: import('./check.svg')
}

export const INFO = {
  color: 'teal',
  icon: import('./info.svg')
}

export const ERROR = {
  color: 'red',
  icon: import('./close.svg')
}

export default {
  props: {
    config: {
      type: Object,
      validator: function (value) {
        if (value.color === undefined) {
          return false
        }
        if (value.icon === undefined) {
          return false
        }
        return true
      }
    },
    title: {
      type: String
    }
  },
  computed: {},
  async render(h) {
    let icon = await this.config.icon;
    console.log(icon)
    return h('div', { staticClass: `flex bg-${this.config.color}-lighter max-w-sm mb-4` }, [
      h('div', { staticClass: `w-16 bg-${this.config.color}` }, [
        h('div', {
          staticClass: `p4`,
          domProps: { innerHTML: icon }
        }),
      ]),
      h('div', { staticClass: `w-auto text-black opacity-75 items-center p-4` }, [
        h('div', { staticClass: `text-lg font-bold pb-4` }, [this.title]),
        h('p', { staticClass: `leading-tight` }, [this.$slots.default])
      ])
    ])
  }
}
