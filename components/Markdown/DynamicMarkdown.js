import InlineCode from './InlineCode.js'
import Alert from './Alert.js'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import php from 'highlight.js/lib/languages/php'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('php', php)
hljs.registerLanguage('yaml', yaml)
import 'highlight.js/styles/dark.css'

export default {
  props: ["renderFunc", "staticRenderFuncs"],

  components: {
    'i-c': InlineCode,
    Alert
  },

  computed: {
    initHighlightJs() {
      let targets = document.querySelectorAll('code')
      targets.forEach((target) => {
        hljs.highlightBlock(target)
      })
    }
  },

  mounted() {
    this.initHighlightJs
  },

  render: function (createElement) {
    return this.templateRender ? this.templateRender() : createElement("div", "Rendering");
  },

  created: function () {
    this.templateRender = new Function(this.renderFunc)();
    this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
  }
}
