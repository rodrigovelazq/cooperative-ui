<template>
  <v-form>
    <v-container
        fluid
        tag="section">
      <v-row justify="center">
        <v-col
            cols="12"
            md="6">
          <v-data-table
              :headers="headers"
              :items="rows"
              class="elevation-1">
            <template v-slot:top>
              <v-text-field
                  v-model="search"
                  label="Buscar"
                  class="mx-4"
              ></v-text-field>
            </template>
            <template v-slot:[`item.actions`]="{item}">
              <v-simple-checkbox
                  color="primary"
                  :ripple="false"
                  :value="selected === item"
                  @input="selected = item">
              </v-simple-checkbox>
            </template>
          </v-data-table>
        </v-col>
        <v-col
            cols="12"
            md="6">
          <v-text-field
              disabled
              :value="selected.firstName"
              label="Nombre"
          ></v-text-field>
          <v-text-field
              disabled
              :value="selected.lastName"
              label="Apellido"
          ></v-text-field>
          <v-text-field
              disabled
              :value="selected.email"
              label="E-mail"
          ></v-text-field>
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="computedDateFormatted"
                  label="Fecha del pago"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                no-title
                @input="menu = false"
            ></v-date-picker>
          </v-menu>
          <v-text-field
              label="Monto"
              :value="contributionValue"
              type="number"
              prefix="Gs."
          ></v-text-field>
          <v-btn
              class="mr-4"
              color="primary">
            guardar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {userData} from "@/mock";

export default {
  name: "LoansForm",
  data: () => ({
    headers: userData.usersHeaders,
    rows: userData.users,
    search: '',
    selected: {},
    contributionValue: 0,

    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
  }),
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

}
</script>

<style scoped>

</style>