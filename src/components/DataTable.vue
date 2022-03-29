<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :server-items-length="total"
      :sort-by="this.sortBy"
      :sort-desc="this.sortOrder.toLowerCase() === 'desc'"
      class="elevation-1"
      @pagination="$emit('pagination', $event)"
      @update:options="$emit('update:options', $event)">
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
            clearable
            label="Buscar"
            single-line
            hide-details
            @change="$emit('changeSearch',$event)"
            @click:clear="$emit('changeSearch','')"
        ></v-text-field>
        <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="$router.push(link)"
            v-if="link"
        >
          Agregar
        </v-btn>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Estás seguro de eliminar este item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <div :class="['text-body-1', 'mb-4', 'font-weight-regular']">
        No se encontraron elementos
      </div>
    </template>
  </v-data-table>
</template>
<script>
import router from "@/router";

export default {
  name:'data-table',
  props:{
    link: {
      type: String
    },
    headers: {
      type: Array,
      required: true
    },
    items:{
      type: Array,
      required: true
    },
    title:{
      type: String
    },
    total: {
      type: Number
    },
    sortBy: {
      type: String
    },
    sortOrder: {
      type: String
    }
  },
  data: () => ({
    dialogDelete: false,
    selectedDelete: null,
  }),

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods: {
    editItem (item) {
      console.log(item);
      router.push(`${this.link}/${item.id}`);
    },

    deleteItem (item) {
      this.selectedDelete = item;
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$emit('delete', this.selectedDelete);
      this.closeDelete();
    },

    closeDelete () {
      this.selectedDelete = null;
      this.dialogDelete = false
    },
  },
}
</script>