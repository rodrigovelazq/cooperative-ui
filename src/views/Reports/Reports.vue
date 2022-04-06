<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col
          class="d-flex"
          cols="12"
          sm="12">
        <v-select
            :items="years"
            v-model="selectedYear"
            label="Año"
        ></v-select>
      </v-col>
      <v-col
          class="d-flex"
          cols="12"
          sm="12">
        <v-btn
            elevation="2"
            color="primary"
            @click="getReport"
        >Descargar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "ReportsDownload",
  data: () => ({
    years: [],
    selectedYear : null
  }),
  created() {
    for (let i = 2010; i <= new Date().getFullYear(); i++) this.years.push(i);
    this.selectedYear = new Date().getFullYear();
  },
  methods:{
    getReport(){
      axios.request({
        responseType: 'arraybuffer',
        url: `/file-export/${this.selectedYear}`,
        method: 'get',
        loanHeaders: {
          'Content-Type': 'blob',
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `SISTEMA SANTA ELENA Año ${this.selectedYear}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    }
  }
}
</script>

<style scoped>

</style>