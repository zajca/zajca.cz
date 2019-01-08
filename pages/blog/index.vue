<template>
  <section>
    <h2>Blog posts</h2>
    <ul id="blogs" class="flex flex-wrap mb-4 list-reset -mx-2">
      <post class="w-full xl:w-1/2 my-2 px-2" :blogPost="blog" v-for="blog in posts" :key="blog.name"/>
    </ul>
  </section>
</template>

<script>
  import blogPosts from '~/contents/blogPosts'
  import Post from '~/components/Blog/Card'

  export default {
    components:{Post},
    async asyncData() {

      async function asyncImport(blogName) {
        const wholeMD = await import(`~/contents/blog/${blogName}.md`)
        return wholeMD.attributes
      }

      return Promise.all(blogPosts.map(blog => asyncImport(blog)))
        .then((res) => {
          return {
            posts: res
          }
        })
    },

    head() {
      return {
        title: 'My Blog',
        meta: [
          { name: "description", property: "og:description", content: 'My blog posts', hid: "description" },
          { property: "og:title", content: 'My blog posts' },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: 'My blog posts' },
          { name: "twitter:image", content: this.ogImage }
        ]
      }
    },

    computed: {
      ogImage: function () {
        return `${process.env.baseUrl}/images/fb-banner.jpg`;
      },
    }
  }
</script>

