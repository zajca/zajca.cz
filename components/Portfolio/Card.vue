<template>
  <li class="flex flex-wrap lg:flex-no-wrap">
    <div class="lg:h-48 lg:h-auto flex w-full lg:w-auto justify-center items-center lg:mr-4 mb-2 ">
      <div class="h-24 w-24 bg-grey-light lg:rounded-full rounded flex justify-center items-center">
        <p class="text-black text-center leading-none">{{item.since}}<br/>{{item.till}}</p>
      </div>
    </div>
    <div
      class="bg-grey-light rounded p-2 flex flex-col flex-grow justify-between leading-normal">
      <div class="text-black font-bold text-xl mb-1">{{item.title}}</div>
      <ul class="list-reset flex mb-2" v-if="item.tags && item.tags.length > 0" >
        <li class="mr-3" v-for="tag in item.tags" :key="tag">
          <div class="inline-block rounded text-sm py-1 px-2 bg-grey-dark text-white">#{{tag}}</div>
        </li>
      </ul>
      <p class="text-grey-darker text-base">{{item.company}}</p>
      <ul class="mb-2 text-grey-darker text-xs">
        <li v-for="r in item.responsibility" :key="r" v-html="r" />
      </ul>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      item: Object,
    }
  }
</script>
