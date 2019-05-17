<!--<template lang="html">-->
<!--	<div v-lazy-container="{ selector: 'img' }" :class="`image-placeholder ${hasRadius}`">-->
<!--		<img :data-src="imageRequired" :data-loading="imageRequired.placeholder" :width="width" :height="height" :class="classes" :alt="alt"/>-->
<!--	</div>-->
<!--</template>-->

<script>
  export default {
    functional: true,
    props: {
      imageURL: {
        type: String,
        required: true,
      },
      alt: {
        type: String
      },
      width: {
        type: String
      },
      height: {
        type: String
      },
      classes: {
        type: String
      },
      radius: {
        type: Boolean,
        default: false
      }
    },
    render(h, context) {
      let image = require(`../assets/images/${context.props.imageURL}`)
      return h('div', {
          staticClass: `image-placeholder ${context.props.radius ? 'image-placeholder--radius' : ''}`,
          directives: [
            {
              name: 'lazy-container',
              value: { selector: 'img' },
            }
          ],
        }, [
          h('img', {
            attrs: {
              'data-src': image,
              'data-loading': image.placeholder,
              'width': context.props.width,
              'height': context.props.height,
              'alt': context.props.alt,
              'class': context.props.classes,
            }
          })
        ]
      )
    }
  }
</script>

<style>

  .image-placeholder {
    overflow: hidden;
    line-height: 0;
  }

  .image-placeholder--radius {
    border-radius: 100%;
  }

  img {
    transition: all ease .3s;
    opacity: 0;
  }

  img[lazy='loading'] {
    opacity: 1;
    filter: blur(15px);
  }

  img[lazy='loaded'] {
    opacity: 1;
  }

</style>
