<template>
  <v-data-table
      :items-per-page="5"
      :headers="headers"
      :items="items"
      :server-items-length="total"
      :sort-by="this.sortBy"
      :sort-desc="this.sortOrder.toLowerCase() === 'desc'"
      class="elevation-1"
      @pagination="$emit('pagination', $event)"
      @update:options="$emit('update:options', $event)">
    <template v-slot:top>
      <v-text-field
          clearable
          label="Buscar"
          single-line
          hide-details
          @change="$emit('changeSearch',$event)"
          @click:clear="$emit('changeSearch','')"
      ></v-text-field>
    </template>
    <template v-slot:[`item.actions`]="{item}">
      <v-simple-checkbox
          color="primary"
          :ripple="false"
          :value="selected && selected.id === item.id"
          @input="$emit('changeSelected', item)">
      </v-simple-checkbox>
    </template>
    <template v-slot:no-data>
      <div :class="['text-body-1', 'mb-4', 'font-weight-regular']">
        No se encontraron elementos
      </div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "SelectableTable",
  props: {
    headers: {
      type: Array,
      required: true
    },
    items:{
      type: Array,
      required: true
    },
    total: {
      type: Number
    },
    sortBy: {
      type: String
    },
    sortOrder: {
      type: String
    },
    selected: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>