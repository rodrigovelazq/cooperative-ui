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
              :counter="10"
              label="Nombre"
              required
              @input="$v.firstName.$touch()"
              @blur="$v.firstName.$touch()"
          ></v-text-field>
          <v-text-field
              v-model="lastName"
              :error-messages="lastNameErrors"
              :counter="10"
              label="Apellido"
              required
              @input="$v.lastName.$touch()"
              @blur="$v.lastName.$touch()"
          ></v-text-field>
          <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
          ></v-text-field>
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

export default {
  name: 'UsersForm',
  mixins: [validationMixin],

  validations: {
    firstName: {required, maxLength: maxLength(100)},
    lastName: {required, maxLength: maxLength(100)},
    email: {email},
  },

  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
  }),

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
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('Este campo es requerido.')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
    },
  },
}
</script>