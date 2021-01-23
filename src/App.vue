<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <v-list-item-title class="title">
            Bienvenido
          </v-list-item-title>
          <v-list-item-subtitle class="font-italic">
            Escribe con el corazón
           <v-icon color="#00274e">favorite</v-icon>
          </v-list-item-subtitle>
          <v-divider></v-divider>
        <router-link v-bind:to="{ name: 'Home' }" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>Inicio</v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link id="add_story_link" v-bind:to="{ name: 'AddStory' }" class="side_bar_link" v-if="current_user">
          <v-list-item>
            <v-list-item-action>
              <v-icon>book</v-icon>
            </v-list-item-action>
            <v-list-item-content>Agregar historia</v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-bind:to="{ name: 'AboutUs' }" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>bubble_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>Acerca de</v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-bind:to="{ name: 'Contact' }" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mark_email_read</v-icon>
            </v-list-item-action>
            <v-list-item-content>Contacto</v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar src="https://i.picsum.photos/id/825/5184/3456.jpg?hmac=GkrDmJTk4gABTQHLyrcHXBOye2AOnytPVawYXbTsi4k" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase gray--text">
        <span class="headline font-weight-light">Focus</span>
        <span>Friend</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn id="user_email" flat v-if="current_user">
        <!--<v-icon>mdi-export</v-icon>-->
        {{ current_user.email }}
      </v-btn>
      <v-btn flat v-bind:to="{ name: 'Register' }" v-if="!current_user"
      id="register_btn">
        Registrar
      </v-btn>
      <v-btn flat v-bind:to="{ name: 'Login' }" v-if="!current_user"
      id="login_btn">
        Iniciar sesión
      </v-btn>
      <v-btn flat id="logout_btn" v-if="current_user" @click="logout">
        Cerrar sesión
      </v-btn>
    </v-app-bar>
      <v-main>
        <v-container fluid>
          <div id="app">
            <router-view/>
          </div>
        </v-container>
      </v-main>
      <v-footer color="#6b6b6b">
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Derechos reservados</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>
import './assets/stylesheets/main.css'
import axios from 'axios'
import bus from './bus'

export default {
  data: () => ({
    drawer: null,
    current_user: null
  }),
  props: {
    source: String
  },
  mounted () {
    this.fetchUser()
    this.listenToEvents()
  },
  methods: {
    listenToEvents () {
      bus.$on('refreshUser', () => {
        this.fetchUser()
      })
    },
    async fetchUser () {
      return axios({
        method: 'get',
        url: '/api/current_user'
      })
        .then((response) => {
          this.current_user = response.data.current_user
        })
        .catch(() => {
        })
    },
    logout () {
      return axios({
        method: 'get',
        url: '/api/logout'
      })
        .then(() => {
          bus.$emit('refreshUser')
          this.$router.push({ name: 'Home' })
        })
        .catch(() => {
        })
    }
  }
}
</script>
