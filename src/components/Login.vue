<template>
    <v-form v-model="valid" ref="form" lazy validation>
        <v-text-field
        label="Email"
        v-model="email"
        :rules="emailRules"
        required
        ></v-text-field>
        <v-text-field
        label="Password"
        v-model="password"
        required
        ></v-text-field>
        <v-btn
        @click="submit"
        :disabled="!valid"
        >
        Guardar
        </v-btn>
        <v-btn @click="clear">Limpiar</v-btn>
    </v-form>
</template>
<script>
import axios from 'axios'
import bus from './../bus'

export default {
  data: () => ({
    valid: true,
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'Email  requerido',
      v => /\S+@\S+\.\S+/.test(v) || 'El email debe ser válido'
    ]
  }),
  methods: {
    async submit () {
      return axios({
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        },
        url: '/users/login',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          window.localStorage.setItem('auth', response.data.token)
          bus.$emit('refreshUser')
          this.$router.push({ name: 'Home' })
        })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
