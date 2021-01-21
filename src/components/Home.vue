<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="story in stories" :key="story._id">
      <v-card :loading="loading" class="mx-auto my-12" max-width="374" height="200">
          <v-img height="200px" src="https://picsum.photos/510/300?random">
          </v-img>
          <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn flat v-bind:to="`/stories/${story._id}`">
                {{ story.name }}
                </v-btn>
              </div>
            <span class="grey--text">
              {{ story.author }} . {{ story.release_year }}</span>
          </div>
        </v-card-title>
        <v-card-subtitle>{{ story.genre }}</v-card-subtitle>
        <v-card-text>
         <div class="grey--text ml-4">{{ story.description }}</div>
         </v-card-text>
          <!--<v-card-actions>
          <v-btn rounded color="deep-purple lighten-2">Califica esta historia</v-btn>
        </v-card-actions>-->
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
      return axios({
        method: 'get',
        url: 'http://localhost:8081/stories'
      })
        .then((response) => {
          this.stories = response.data.stories
        })
        .catch(() => {
        })
    }
  }
}
</script>
