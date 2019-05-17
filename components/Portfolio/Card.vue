<template functional>
  <li class="flex flex-wrap lg:flex-no-wrap bg-grey-lightest mb-2">

    <div class="flex w-full lg:w-auto justify-center items-center">
      <div class="lg:w-24 w-full w-auto xs:w-full flex justify-center items-center">
        <p class="text-black text-center">{{props.item.since}}<br class="lg:block hidden"/><span class="lg:hidden"> - </span>{{props.item.till}}</p>
      </div>
    </div>

    <div
      class="bg-grey-lighter p-2 flex flex-col flex-grow justify-between">
      <div class="text-black font-bold text-xl mb-1">{{props.item.title}}</div>
      <ul class="list-reset flex flex-wrap" v-if="props.item.tags && props.item.tags.length > 0" >
        <li class="mr-3 mb-2" v-for="tag in props.item.tags" :key="tag">
          <div class="inline-block text-sm py-1 px-2 bg-grey-dark text-white">#{{tag}}</div>
        </li>
      </ul>
      <p class="text-grey-darker text-base">{{props.item.company}}</p>
      <ul class="mb-2 text-grey-darker text-xs">
        <li v-for="r in props.item.responsibility" :key="r" v-html="r" />
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
