<template>

    <v-app-bar
        color="deep-purple"
        dark
        app
    >
      <v-app-bar-nav-icon v-on:click="onClickButton"></v-app-bar-nav-icon>

      <v-toolbar-title>Santa Elena v1.0</v-toolbar-title>
    </v-app-bar>

</template>

<script>
// Components

export default {
  name: 'dashboard-core-app-bar',
  methods: {
    onClickButton () {
      this.$emit('onClickButton', true)
    }
  }
}
</script>
