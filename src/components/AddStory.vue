<template>
    <v-form v-model="valid" ref="form" lazy validation>
    <div class="text-center">
     <v-dialog
       v-model="dialog"
       width="500"
     >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#ffd862"
          dark
          v-bind="attrs"
          v-on="on"
        >Toca aquí</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          ¡Hora de escribir! Modo: Creativo
        </v-card-title>
        <v-card-text>¡Hola! Es momento de liberar tu imaginación, por favor deja fluir toda tu creatividad. Este espacio es completamente tuyo, asegurate de relajarte durante el proceso ¿listo?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >Estoy listo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
        <v-text-field
        label="Titulo de la historia"
        v-model="name"
        :rules="nameRules"
        required
        ></v-text-field>
        <v-text-field
        v-model="author"
        label="Autor"
        required
        ></v-text-field>
        <v-text-field
        name="input-7-1"
        label="Desarrollo"
        v-model="description"
        multi-line
        ></v-text-field>
        <v-select
        label="Año de edición"
        v-model="release_year"
        :items="years"
        ></v-select>
        <v-text-field
        label="Género"
        v-model="genre"
        ></v-text-field>
          <v-btn @click="submit" :disabled="!valid">Guardar</v-btn>
          <v-btn @click="clear">Limpiar</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    name: '',
    author: '',
    description: '',
    genre: '',
    release_year: '',
    dialog: false,
    nameRules: [
      v => !!v || 'Es necesario ingresar el nombre de la historia'
    ],
    select: null,
    years: [
      '2020',
      '2019',
      '2018',
      '2017',
      '2016',
      '2015'
    ]
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Realizar siguiente accion
        return axios({
          method: 'post',
          data: {
            name: this.name,
            author: this.author,
            description: this.description,
            release_year: this.release_year,
            genre: this.genre
          },
          url: 'http://localhost:8081/stories',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            this.$router.push({name: 'Home'})
            this.$refs.form.reset()
          })
          .catch(() => {
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
