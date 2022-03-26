<template>
  <v-text-field
      v-bind:label="label"
      v-model="inputValue"
      :type="type"
  ></v-text-field>
</template>

<script>
export default {
  name: "custom-input",
  props: ['label', 'type', 'modelValue'],
  computed: {
    inputValue: {
      get(){
        return this.modelValue;
      },
      set(value){
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>

<style scoped>

</style>