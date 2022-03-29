<template>
  <v-container
      id="user-profile"
      fluid
      tag="section">
    <v-row justify="center">
      <v-col
          cols="12"
          md="8">
        <v-form>
          <v-text-field
              v-model="firstName"
              :error-messages="firstNameErrors"
              :counter="100"
              label="Nombre"
              required
              @input="$v.firstName.$touch()"
              @blur="$v.firstName.$touch()"
          ></v-text-field>
          <v-text-field
              v-model="lastName"
              :error-messages="lastNameErrors"
              :counter="100"
              label="Apellido"
              required
              @input="$v.lastName.$touch()"
              @blur="$v.lastName.$touch()"
          ></v-text-field>
          <v-text-field
              v-model="identityNumber"
              :error-messages="identityNumberErrors"
              :counter="100"
              label="Cedula"
              @input="$v.identityNumber.$touch()"
              @blur="$v.identityNumber.$touch()"
          ></v-text-field>
          <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
          ></v-text-field>
          <v-btn
              class="mr-4"
              to="/membersTable"
              color="secondary">
            cancelar
          </v-btn>
          <v-btn
              class="mr-4"
              color="primary"
              @click="submit"
          >
            guardar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, maxLength, email} from 'vuelidate/lib/validators'
import axios from "axios";
import router from "@/router";


export default {
  name: 'MembersForm',
  mixins: [validationMixin],

  validations: {
    firstName: {required, maxLength: maxLength(100)},
    lastName: {required, maxLength: maxLength(100)},
    identityNumber: {maxLength: maxLength(100)},
    email: {email},
  },

  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    identityNumber: ''
  }),
  mounted() {
    if (this.$route.params.id) {
      axios.get(`http://127.0.0.1:8000/api/members/${this.$route.params.id}`)
          .then(response => {
            this.firstName = response.data.first_name;
            this.lastName = response.data.last_name;
            this.email = response.data.email;
            this.identityNumber = response.data.identity_number;
          });
    }
  },
  computed: {
    firstNameErrors() {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.maxLength && errors.push('Máxima cantidad es de 100 characters.')
      !this.$v.firstName.required && errors.push('Este campo es requerido.')
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.maxLength && errors.push('Máxima cantidad es de 100 characters.')
      !this.$v.lastName.required && errors.push('Este campo es requerido.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Debe ser un e-mail válido')
      return errors
    },
    identityNumberErrors() {
      const errors = []
      if (!this.$v.identityNumber.$dirty) return errors
      !this.$v.identityNumber.maxLength && errors.push('Máxima cantidad es de 100 characters.')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.$route.params.id) {
          axios.put(`http://127.0.0.1:8000/api/members/${this.$route.params.id}`,
              {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                identity_number: this.identityNumber
              }).then(response => {
            console.log(response);
            router.push('membersTable')
          });
        } else {
          axios.post('http://127.0.0.1:8000/api/members',
              {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                identity_number: this.identityNumber
              }).then(response => {
            console.log(response);
            router.push('membersTable')
          });
        }
      }
    },
  },
}
</script>