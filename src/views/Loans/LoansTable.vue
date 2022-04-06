<template>
  <data-table
      link="loansForm"
      title="Prestamos"
      :headers="headers"
      :items="items"
      :total="total"
      :page="page"
      :page_size="page_size"
      :sort-by="sortBy"
      :sort-order="sortOrder"
      @pagination="handlePagination"
      @update:options="handleUpdateOptions"
      @changeSearch="handleSearchChange"
      @delete="handleDelete"/>
</template>

<script>
import DataTable from "@/components/DataTable";
import axios from "axios";

export default {
  components: {DataTable},
  data: () => ({
    headers: [
      {text: 'Monto', value: 'amount'},
      {text: 'Fecha', value: 'loan_date'},
      {text: 'Nombre', value: 'members.first_name'},
      {text: 'Apellido', value: 'members.last_name'},
      {text: 'Acciones', value: 'actions', sortable: false},
    ],
    items: [],
    page: 1,
    page_size: 10,
    total: 0,
    sortBy: 'loan_date',
    sortOrder: 'DESC',
    search: ''
  }),
  methods: {
    retrieveMembers() {
      axios
          .get('http://127.0.0.1:8000/api/loans',
              {
                params: {
                  page: this.page,
                  page_size: this.page_size,
                  sort_by: this.sortBy,
                  sort_order: this.sortOrder,
                  search: this.search
                }
              })
          .then(response => {
            this.total = response.data.total;
            this.items = response.data.data;
          });
    },
    handlePagination(value) {
      this.page = value.page;
      this.page_size = value.itemsPerPage;
      this.retrieveMembers();
    },
    handleUpdateOptions(value) {
      this.sortBy = value.sortBy[0];
      this.sortOrder = value.sortDesc[0] ? 'DESC' : 'ASC';
      this.retrieveMembers();
    },
    handleSearchChange(value){
      this.search = value;
      this.retrieveMembers();
    },
    handleDelete(item){
      axios.delete(`http://127.0.0.1:8000/api/loans/${item.id}`,)
          .then(response => {
            console.log(response)
            this.retrieveMembers();
          });
    }
  }
}
</script>

<style scoped>

</style>