<template>
  <v-layout column align-center>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src">
      </v-carousel-item>
    </v-carousel>
    <h2 class="text-center">Historias</h2>
    <v-container row>
    <v-flex xs4 v-for="story in stories" :key="story._id">
      <v-card class="mx-auto" max-width="344">
          <v-img height="150" src="https://picsum.photos/510/300?random">
          </v-img>
          <v-card-title primary-title>
          <div>
            <div class="headline">
                {{ story.name }}
              </div>
            <span class="grey--text">
              {{ story.author }} . {{ story.release_year }}</span>
          </div>
        </v-card-title>
        <v-card-subtitle class="pb-0">{{ story.genre }}</v-card-subtitle>
        <v-card-text>
         <div class="grey--text ml-4">{{ story.description }}</div>
         </v-card-text>
          <v-card-actions>
          <v-btn v-bind:to="`/stories/${story._id}`" color="#00274e" text>Leer</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    </v-container>
  </v-layout>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Stories',
  data () {
    return {
      stories: [],
      items: [
        {
          src: 'https://i.picsum.photos/id/403/3997/2665.jpg?hmac=l04T0quGocuZKSo0CxAJ7aC8CivbrCWV0X0dCzqvb0Y'
        },
        {
          src: 'https://i.picsum.photos/id/1073/5472/3648.jpg?hmac=xCDetU9pLnLGZopbvHOQOkQRhTiYwyrzWc0YyHPzp5Y'
        },
        {
          src: 'https://i.picsum.photos/id/366/4000/3000.jpg?hmac=zphhHOH9ofToN2jNHd8z-nc98NrBd8y2okWXEXetLDg'
        },
        {
          src: 'https://i.picsum.photos/id/5/5245/3497.jpg?hmac=jTb-5BTllgPl1ftM06REk6EFZCqYDwMyUvg2WAJ6oUE'
        }
      ]
    }
  },
  mounted () {
    this.fetchStories()
  },
  methods: {
    async fetchStories () {
      const token = window.localStorage.getItem('auth')
      return axios({
        method: 'get',
        url: '/stories',
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          this.stories = response.data.stories
          this.current_user = response.data.current_user
        })
        .catch(() => {
        })
    }
  }
}
</script>
