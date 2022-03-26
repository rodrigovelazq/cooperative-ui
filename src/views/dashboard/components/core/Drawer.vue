<template>
  <v-navigation-drawer
      v-bind:value="modelValue"
      v-on:input="this.updateModelValue"
      temporary
      app
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Santa Elena
        </v-list-item-title>
        <v-list-item-subtitle>
          sistema
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
        dense
        nav
    >
      <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
      >
        <v-list-item-icon class="mr-2">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "dashboard-core-drawer",
  props: {
      modelValue: {
        type: Boolean,
        required: true
      },
  },
  data () {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home', link: '/' },
        { title: 'Usuarios', icon: 'mdi-account', link: '/usersTable' },
        { title: 'Prestamos', icon: 'mdi-cash-multiple', link: '/prestamos' },
      ],
      right: null,
    }
  },
  methods: {
    updateModelValue(value){
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style scoped>

</style>