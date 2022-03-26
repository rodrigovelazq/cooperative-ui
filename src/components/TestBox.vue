<template>
  <div class="box"></div>
</template>

<script>
export default {
  name: "test-box",
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },
  unmounted() {
    console.log('unmounted')
  },
  updated() {
    console.log('updated');
  }
}
</script>

<style scoped>
  .box {
    background-color: red;
    width: 200px;
    height: 200px;
  }
</style>