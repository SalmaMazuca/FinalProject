<template>
  <v-card
    class="mx-auto"
    color="#1b2733"
    dark
    max-width="800"
  >
    <v-card-title>
      <v-icon
        large
        left
        size="50px"
      >
        emoji_objects
      </v-icon>
      <span class="title font-weight-bold">Nos encanta escucharte, es importante tu opinión.</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      Por favor, contáctanos en caso de presentar cualquier problema con la aplicación. Tus comentarios siempre son bienvenidos.
      Puedes contactarnos a través de nuestras redes sociales, no dudes en que nos pondremos en contacto contigo.
      En los siguientes enlaces encontrarás nuestras redes sociales, gracias por ser parte de Focus Friend.
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3" size="80px">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Happy&eyebrowType=Default&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title font-weight-light">Salma M R</v-list-item-title>
        </v-list-item-content>
        <v-row
          align="center"
          justify="end"
        >
          <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="35px">
            {{ icon }}
          </v-icon>
        </v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter'
    ]
  })
}
</script>
