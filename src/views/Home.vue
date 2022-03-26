<template>
  <v-img
      height="80vh"
      class="imgOpacity"
      contain
      src="../assets/santa_elena.png"
  ></v-img>
</template>

<script>
export default {
  name: "home-app"
}
</script>

<style scoped>
  .imgOpacity {
    opacity: 0.2;
    filter: contrast(50%);
  }
</style>