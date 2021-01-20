<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <router-link v-bind:to="{ name: 'Home' }" class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>Inicio</v-list-item-content>
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
    <v-app-bar src="https://picsum.photos/1920/1080?random" dark fixed app>
    <!--https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase gray--text">
        <span class="font-weight-light">Focus</span>
        <span>Friend</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-bind:to="{ name: 'AddStory'}">Nueva historia</v-btn>
      </v-toolbar-items>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
      <v-main>
        <v-container fluid>
          <div id="app">
            <router-view/>
          </div>
        </v-container>
      </v-main>
      <v-footer padless>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Derechos reservados</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>
import './assets/stylesheets/main.css'

export default {
  data: () => ({
    drawer: null,
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  }),
  props: {
    source: String
  }
}
</script>
