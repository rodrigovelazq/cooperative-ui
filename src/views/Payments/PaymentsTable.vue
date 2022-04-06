<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
          :complete="e1 > 1"
          step="1"
      >
        Seleccione el prestamo
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
          :complete="e1 > 2"
          step="2"
      >
        Pagos
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <SelectableLoans
            :selectedLoan="selectedLoan"
            @changeSelected="(value) => {
                this.selectedLoan = value;
                this.e1 =2;
            }"/>
      </v-stepper-content>

      <v-stepper-content step="2">
        <PaymentForm
            :selectedLoan="selectedLoan"
            @back="this.e1 =1"
        />

        <v-btn color="secondary" @click="e1 = 1">
          Volver
        </v-btn>
      </v-stepper-content>

    </v-stepper-items>
  </v-stepper>

</template>

<script>
import PaymentForm from "@/views/Payments/PaymentForm";
import SelectableLoans from "@/views/Payments/SelectableLoans";

export default {
  components: {SelectableLoans, PaymentForm},
  data: () => ({
    e1: 1,
    selectedLoan: null
  }),
}
</script>

<style scoped>

</style>