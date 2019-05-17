<template>
  <li class="flex bg-grey-lightest relative">
<!--    <div class="md:h-12 md:w-12 w-full flex justify-center items-center">-->
<!--      <svg width="40" viewBox="0 0 20 20" class="hidden md:block">-->
<!--        <circle class="circle__bg" cx="10" cy="10" r="8"></circle>-->
<!--        <circle class="circle__progress" cx="10" cy="10" r="8" :style="style"></circle>-->
<!--&lt;!&ndash;        <text x="50%" y="55%">{{ percentage*10 }}</text>&ndash;&gt;-->
<!--      </svg>-->
<!--    </div>-->
    <div class="absolute w-full h-full bg-green-lighter z-0" :style="{width: `${percentage*10}%`}"></div>
    <div class="p-2 flex w-full justify-between items-center relative z-10">
      <div class="text-black font-bold text-xl">{{title}}</div>
    </div>
  </li>
</template>
<script>
  export default {
    props: {
      percentage: Number,
      title: String,
    },
    computed: {
      style() {
        return {
          'stroke-dashoffset': -51 - ((51 / 100) * this.percentage * 10)
        }
      }
    }
  }
</script>
<style>
  .circle__bg {
    fill: none;
    stroke: #f1f1f1;
    stroke-width: 2;
  }

  .circle__progress {
    fill: none;
    stroke: #2ecc71;
    stroke-width: 2;
    stroke-dasharray: 51 51;
    stroke-dashoffset: -51;
    stroke-linecap: round;
  }

  text {
    font-size: 4px;
    text-anchor: middle;
    fill: #555;
  }

</style>
