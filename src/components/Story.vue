<template>
    <v-layout column wrap>
        <v-flex xs4>
            <v-card :loading="loading"
            class="mx-auto my-12"
            max-width="500"
            elevation="13"
            shaped>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">{{ story.name }}</div>
                        <span class="gray-text">
                            {{ story.release_year}} . {{ story.author }}
                        </span>
                    </div>
                </v-card-title>
                <h6 class="card-title">{{ story.genre }}</h6>
                <v-card-text>
                    {{ story.description }}
                </v-card-text>
            </v-card>
            <v-bottom-navigation>
            <v-btn v-if="current_user">
                <span>Comentar</span>
                <v-icon color="#ffc516">mdi-heart</v-icon>
                </v-btn>
            <v-btn v-if="current_user" @click="editStory">
                <span>Editar</span>
                <v-icon color="#ffc516">create</v-icon>
                </v-btn>
            <v-btn @click="deleteStory(story._id)">
                <span>Eliminar</span>
                <v-icon color="#ffc516">delete</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </v-flex>
    </v-layout>
</template>
<script>

import axios from 'axios'

// const wrapper = document.createElement('div');

export default {
  name: 'Story',
  data () {
    return {
      story: []
    }
  },
  mounted () {
    this.fetchStory()
  },
  methods: {
    async fetchStory () {
      return axios({
        method: 'get',
        url: `http://localhost:8081/api/stories/${this.$route.params.id}`
      })
        .then((response) => {
          this.story = response.data
        })
        .catch(() => {
        })
    },
    deleteStory (id) {
      console.log(id)
    }
  }
}
</script>
