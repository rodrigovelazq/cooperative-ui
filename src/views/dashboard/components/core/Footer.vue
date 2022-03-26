<template>
  <v-card height="400px">
    <v-footer
        padless
    >
      <v-card
          flat
          tile
          width="100%"
          class="red lighten-1 text-center"
      >
        <v-card-text>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Powered by RV</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: 'dashboard-core-footer',

  data: () => ({
  }),
}
</script>
