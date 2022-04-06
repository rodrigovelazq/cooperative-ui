<template>
  <v-data-table
      :headers="paymentHeaders"
      :items="payments"
      sort-by="payment_date"
      :sort-desc="false"
      class="elevation-1 mb-12">
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Pagos</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialogForm"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              Agregar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="12"
                  >
                    <v-text-field
                        v-model="selectedPayment.amount"
                        label="Monto"
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
                          v-model="selectedPayment.payment_date"
                          no-title
                          @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="closeForm"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="saveForm"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
import axios from "axios";

export default {
  name: "PaymentForm",
  props: {
    selectedLoan: {
      type: Object,
    }
  },
  data: () => ({
    paymentHeaders: [
      {text: 'Monto', value: 'amount'},
      {text: 'Fecha', value: 'payment_date'},
      {text: 'Acciones', value: 'actions', sortable: false},
    ],
    payments: [],
    dialogDelete: false,
    dialogForm: false,
    selectedPayment: {
      amount: 0,
      payment_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    },
    menu: false,
  }),
  computed: {
    formTitle() {
      return this.selectedPayment.id ? 'Editar pago' : 'Nuevo pago'
    },
    computedDateFormatted() {
      return this.formatDate(this.selectedPayment.payment_date)
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    editItem(item) {
      this.selectedPayment = item;
      this.dialogForm = true;
    },
    deleteItem(item) {
      this.selectedPayment = item;
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      axios.delete(`http://127.0.0.1:8000/api/payments/${this.selectedPayment.id}`,)
          .then(response => {
            console.log(response)
            this.retrievePayments(this.selectedLoan.id);
          });
      this.closeDelete();
    },
    retrievePayments(id) {
      axios.get(`http://127.0.0.1:8000/api/payments/${id}/loans`)
          .then(response => {
            this.payments = response.data;
          });
    },
    closeDelete() {
      this.selectedPayment = {
        amount: 0,
        payment_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      },
          this.dialogDelete = false
    },
    closeForm() {
      this.selectedPayment = {
        amount: 0,
        payment_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      },
          this.dialogForm = false
    },
    saveForm() {
      if (this.selectedPayment.id) {
        axios.put(`http://127.0.0.1:8000/api/payments/${this.selectedPayment.id}`, {
          id: this.selectedPayment.id,
          payment_date: this.selectedPayment.payment_date,
          amount: this.selectedPayment.amount,
          loans_id: this.selectedLoan.id
        }).then(response => {
              console.log(response)
              this.retrievePayments(this.selectedLoan.id);
            });
      } else {
        console.log(this.selectedLoan.id);
        axios.post(`http://127.0.0.1:8000/api/payments`, {
          payment_date: this.selectedPayment.payment_date,
          amount: this.selectedPayment.amount,
          loans_id: this.selectedLoan.id
        }).then(response => {
              console.log(response)
              this.retrievePayments(this.selectedLoan.id);
            });
      }
      console.log(this.selectedPayment)
      this.dialogForm = false
    }
  },
  watch: {
    dialogForm(val) {
      val || this.closeForm()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    selectedLoan(newVal) {
      this.retrievePayments(newVal.id)
    }
  }
}
</script>

<style scoped>

</style>