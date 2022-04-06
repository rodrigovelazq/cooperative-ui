<template>
  <SelectableTable
      :headers="loanHeaders"
      :items="loans"
      :total="totalLoans"
      :page="pageLoans"
      :page_size="pageSizeLoans"
      :sort-by="sortByLoans"
      :sort-order="sortOrderLoans"
      :selected="selectedLoan"
      @pagination="handlePaginationLoans"
      @update:options="handleUpdateOptionsLoans"
      @changeSearch="handleSearchChangeLoans"
      @changeSelected="(value) => this.$emit('changeSelected', value)"
  />
</template>

<script>
import SelectableTable from "@/components/SelectableTable";
import axios from "../../plugins/axios";

export default {
  components: {SelectableTable},
  props: {
    selectedLoan: {
      type: Object
    }
  },
  data: () => ({
    e1: 1,
    loanHeaders: [
      {text: 'Monto', value: 'amount'},
      {text: 'Fecha', value: 'loan_date'},
      {text: 'Nombre', value: 'members.first_name'},
      {text: 'Apellido', value: 'members.last_name'},
      {text: 'Acciones', value: 'actions', sortable: false},
    ],
    loans: [],
    pageLoans: 1,
    pageSizeLoans: 10,
    totalLoans: 0,
    sortByLoans: 'loan_date',
    sortOrderLoans: 'DESC',
    searchLoans: '',
  }),
  methods: {
    retrieveLoans() {
      axios.get('/loans',
              {
                params: {
                  page: this.pageLoans,
                  page_size: this.pageSizeLoans,
                  sort_by: this.sortByLoans,
                  sort_order: this.sortOrderLoans,
                  search: this.searchLoans
                }
              })
          .then(response => {
            this.totalLoans = response.data.total;
            this.loans = response.data.data;
          });
    },
    handlePaginationLoans(value) {
      this.pageLoans = value.page;
      this.pageSizeLoans = value.itemsPerPage;
      this.retrieveLoans();
    },
    handleUpdateOptionsLoans(value) {
      this.sortByLoans = value.sortBy[0];
      this.sortOrderLoans = value.sortDesc[0] ? 'DESC' : 'ASC';
      this.retrieveLoans();
    },
    handleSearchChangeLoans(value) {
      this.searchLoans = value;
      this.retrieveLoans();
    },
  }
}
</script>

<style scoped>

</style>