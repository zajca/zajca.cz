<template>
  <nuxt-link tag="li" :to="`/blog/${blogPost.name}`" class="flex">
    <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
      <ImageResponsive
        imageURL="blog/_thumbnail.jpg"
        :width="'192'"
        :height="'340'"
        alt="ilustrative code image thumbmail" />

    </div>
    <div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col flex-grow justify-between leading-normal">
      <div class="mb-8">
        <div class="text-black font-bold text-xl mb-2">{{blogPost.title}}</div>
        <ul class="list-reset flex mb-2">
          <li class="mr-3" v-for="tag in blogPost.tags" :key="tag">
            <div class="inline-block rounded text-sm py-1 px-2 bg-grey-dark text-white">#{{tag}}</div>
          </li>
        </ul>
        <p class="text-grey-darker text-base">{{blogPost.description}}</p>
      </div>
      <div class="flex items-center">
        <ImageResponsive
          imageURL="me.jpg"
          :width="'50'"
          :height="'50'"
          class="w-10 h-10 rounded-full mr-4"
          alt="Martin Zajíc" />
        <div class="text-sm">
          <p class="text-black leading-none">{{blogPost.author}}</p>
          <p class="text-grey-dark">{{blogPost.year}}</p>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  import ImageResponsive from '~/components/Image'
  export default {
    components: {ImageResponsive},
    props:{
      blogPost: Object,
    }
  }
</script>
