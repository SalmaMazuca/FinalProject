<template>
  <v-layout row wrap>
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
  </v-layout>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Stories',
  data () {
    return {
      stories: []
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
