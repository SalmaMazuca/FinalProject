<template>
    <v-form v-model="valid" ref="form" lazy validation>
        <v-text-field
        label="Nombre"
        v-model="name"
        required
        ></v-text-field>
        <v-text-field
        label="Email"
        v-model="email"
        :rules="emailRules"
        required
        ></v-text-field>
        <v-text-field
        label="Contraseña"
        v-model="password"
        required
        ></v-text-field>
        <v-text-field
        name="input-7-1"
        label="Confirmación de contraseña"
        v-model="confirm_password"
        ></v-text-field>
        <v-btn
            @click="submit"
            :disabled="!valid"
        >Guardar</v-btn>
        <v-btn @click="clear">Limpiar</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    emailRules: [
      v => !!v || 'E-mail requerido',
      v => /\S+@\S+\.\S+/.test(v) || 'El E-mail debe ser válido'
    ]
  }),
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          },
          url: '/users/register',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            this.$router.push({ name: 'Login' })
          })
      }
      return true
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
