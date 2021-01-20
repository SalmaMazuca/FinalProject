<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <v-card-title primary-title>
          <v-img height="250" src="https://picsum.photos/510/300?random">
          </v-img>
          <div>
            <div class="headline">Never Ending History</div>
            <span class="grey--text">2016 . Lillie Charlotte Rose</span>
          </div>
        </v-card-title>
        <v-card-text>
         <div class="grey--text ml-4">
            Historia ficticia basada en hechos reales.
         </div>
         </v-card-text>
          <v-card-actions>
          <v-btn rounded color="deep-purple lighten-2">Califica esta historia</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      mensaje: 'Hola, cómo estás? Tienes frío?'
    }
  },
  methods: {
    reply () {
      this.mensaje = 'Estoy muy bien, gracias!'
    }
  }
}
</script>
