<template>
  <li class="flex flex-wrap lg:flex-no-wrap">
    <div class="lg:h-48 lg:h-auto flex w-full lg:w-auto justify-center items-center lg:mr-4 mb-2 ">
      <div class="h-24 w-24 bg-grey-light rounded-full flex justify-center items-center">
        <svg width="96" viewBox="0 0 20 20">
          <circle class="circle__bg" cx="10" cy="10" r="8"></circle>
          <circle class="circle__progress" cx="10" cy="10" r="8" :style="style"></circle>
          <text x="50%" y="55%">{{ percentage*10 }}%</text>
        </svg>
      </div>
    </div>
    <div class="bg-grey-light rounded p-2 flex flex-grow justify-between items-center leading-normal">
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
