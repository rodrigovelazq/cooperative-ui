<template>
  <data-table
      link="membersForm"
      title="Miembros"
      :headers="headers"
      :items="rows"
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
import axios from "../../plugins/axios";

export default {
  components: {DataTable},
  data: () => ({
    headers: [
      {text: 'Orden', value: 'order'},
      {text: 'Nombre', value: 'first_name'},
      {text: 'Apellido', value: 'last_name'},
      {text: 'Email', value: 'email'},
      {text: 'Acciones', value: 'actions', sortable: false},
    ],
    rows: [],
    page: 1,
    page_size: 10,
    total: 0,
    sortBy: 'order',
    sortOrder: 'ASC',
    search: ''
  }),
  methods: {
    retrieveMembers() {
      axios
          .get('/members',
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
            this.rows = response.data.data;
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
      axios.delete(`/members/${item.id}`,)
          .then(() => {
            this.retrieveMembers();
          });
    }
  }
}
</script>

<style scoped>

</style>