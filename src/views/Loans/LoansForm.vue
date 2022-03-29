<template>
  <v-form>
    <v-container
        fluid
        tag="section">
      <v-row justify="center">
        <v-col
            cols="12"
            md="6">
          <SelectableTable
              :headers="headers"
              :items="rows"
              :total="total"
              :page="page"
              :page_size="page_size"
              :sort-by="sortBy"
              :sort-order="sortOrder"
              :selected="member"
              @pagination="handlePagination"
              @update:options="handleUpdateOptions"
              @changeSearch="handleSearchChange"
              @changeSelected="handleSelected"
          />
        </v-col>
        <v-col
            cols="12"
            md="6">
          <v-text-field
              disabled
              :value="member.first_name"
              label="Nombre"
          ></v-text-field>
          <v-text-field
              disabled
              :value="member.last_name"
              label="Apellido"
          ></v-text-field>
          <v-text-field
              disabled
              :value="member.email"
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
                v-model="loan_date"
                no-title
                @input="menu = false"
            ></v-date-picker>
          </v-menu>
          <v-text-field
              label="Monto"
              v-model="amount"
              type="number"
              prefix="Gs."
          ></v-text-field>
          <v-btn
              class="mr-4"
              to="/loansTable"
              color="secondary">
            cancelar
          </v-btn>
          <v-btn
              class="mr-4"
              @click="submit"
              color="primary">
            guardar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import SelectableTable from "@/components/SelectableTable";
import axios from "axios";
import router from "@/router";

export default {
  name: "LoansForm",
  components: {SelectableTable},
  data: () => ({
    headers: [
      {text: 'Orden', value: 'order'},
      {text: 'Nombre', value: 'first_name'},
      {text: 'Apellido', value: 'last_name'},
      {text: 'Email', value: 'email'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    rows: [],
    page: 1,
    page_size: 10,
    total: 0,
    sortBy: 'order',
    sortOrder: 'ASC',
    search: '',
    member: {},
    amount: 0,

    loan_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
  }),
  mounted() {
    if (this.$route.params.id) {
      axios.get(`http://127.0.0.1:8000/api/loans/${this.$route.params.id}`)
          .then(response => {
            this.member = response.data.members;
            this.loan_date = response.data.loan_date;
            this.amount = response.data.amount;
          });
    }
  },
  methods: {
    retrieveMembers() {
      axios
          .get('http://127.0.0.1:8000/api/members',
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
    submit() {
        if (this.$route.params.id) {
          axios.put(`http://127.0.0.1:8000/api/loans/${this.$route.params.id}`,
              {
                members_id : this.member.id,
                loan_date : this.loan_date,
                amount : this.amount
              }).then(response => {
            console.log(response);
            router.push('membersTable')
          });
        } else {
          axios.post('http://127.0.0.1:8000/api/loans',
              {
                members_id : this.member.id,
                loan_date : this.loan_date,
                amount : this.amount
              }).then(response => {
            console.log(response);
            router.push('loansTable')
          });
        }
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
    handleSelected(value){
      console.log(value);
      this.member = value;
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.loan_date)
    },
  },

}
</script>

<style scoped>

</style>