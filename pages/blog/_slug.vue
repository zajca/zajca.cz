<template>
  <div class="blogSelected">
    <div class="intro">
      <div class="elevate-cover">
        <div class="elevate-cover__textOffset">
          <div class="elevate-cover__text">
            <span class="blogSelected-year">{{ year }}</span>
            <h1 class="elevate-cover__title">
              {{ title }}
            </h1>
            <!--<p class="elevate-cover__description">{{ description }}</p>-->
          </div>
        </div>
        <!--<ImageResponsive-->
          <!--:imageURL="'blog/' + id + '/_main.jpg'"-->
          <!--width="100%"-->
          <!--class="elevate-cover__img"-->
          <!--:alt="'Blog picture'" />-->
      </div>
    </div>
    <div class="container small">
      <DynamicMarkdown
        :render-func="renderFunc"
        :static-render-funcs="staticRenderFuncs" />
    </div>
  </div>
</template>

<script lang="js">

  import DynamicMarkdown from "~/components/Markdown/DynamicMarkdown"
  // import Card from "~/components/Card.vue"


  export default {

    async asyncData ({params}) {
      const fileContent = await import(`~/contents/blog/${params.slug}.md`)
      const attr = fileContent.attributes
      return {
        name: params.slug,
        title: attr.title,
        trans: attr.trans,
        year: attr.year,
        id: attr.id,
        owner: attr.owner,
        colors: attr.colors,
        role: attr.role,
        cardAlt: attr.cardAlt,
        description: attr.description,
        related: attr.related,
        renderFunc: fileContent.vue.render,
        staticRenderFuncs: fileContent.vue.staticRenderFns,
        image: {
          main: attr.image && attr.image.main,
          og: attr.image && attr.image.og
        }
      }
    },

    nuxtI18n: {
      seo: false
    },

    components: { DynamicMarkdown },

    head () {
      return {
        title: this.pageTitle,
        htmlAttrs: {
          lang: 'en',
        },
        meta: [
          { name: "author", content: "Marina Aisa" },
          { name: "description", property: "og:description", content: this.description, hid: "description" },
          { property: "og:title", content: this.pageTitle },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.description },
          { name: "twitter:image", content: this.ogImage }
        ],
      };
    },

    computed: {
      ogImage: function () {
        return `${process.env.baseUrl}/images/blog/${this.id}/_thumbnail.jpg`;
      },
      pageTitle: function () {
        return this.title + ' – Martin Zajíc';
      },
    },

  }
</script>
