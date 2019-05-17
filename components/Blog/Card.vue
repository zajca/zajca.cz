<template>
  <nuxt-link tag="li" :to="`/blog/${blogPost.name}`" class="flex cursor-pointer">
    <div class="border border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col flex-grow justify-between leading-normal">
      <div class="mb-8">
        <div class="text-black font-bold text-xl mb-2">{{blogPost.title}}</div>
        <ul class="list-reset flex flex-wrap">
          <li class="mr-3 mb-2" v-for="tag in blogPost.tags" :key="tag">
            <div class="inline-block rounded text-sm py-1 px-2 bg-grey-dark text-white">#{{tag}}</div>
          </li>
        </ul>
        <p class="text-grey-darker text-base">{{blogPost.description}}</p>
      </div>
      <div class="flex items-center">
        <div class="text-sm">
          <p class="text-grey-dark">{{blogPost.year}}</p>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    props:{
      blogPost: Object,
    }
  }
</script>
