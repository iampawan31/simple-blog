<template>
  <v-container>
    <v-row>
      <v-col cols="8" offset="2" v-if="posts && posts.length > 0">
        <v-card v-for="post in posts" :key="post.id" class="mx-auto my-12">
          <v-img height="250" :src="post.imageUrl"></v-img>

          <v-card-title>
            <router-link
              class="post-title"
              :to="{ name: 'view-post', params: { slug: post.slug } }"
              >{{ post.title }}</router-link
            >
          </v-card-title>
          <v-card-text>
            <div class="my-4 subtitle-1">
              {{ post.User.email }} • {{ moment(post.createdAt).fromNow() }}
            </div>

            <div v-html="post.content"></div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-else>
        <v-alert dense border="left" type="warning">
          No Posts Found.
          <v-btn :to="{ name: 'new-post' }" text dark>Create Post</v-btn>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import PostsService from '@/services/PostsService'
export default {
  name: 'Home',
  data() {
    return {
      posts: null,
      moment: moment
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  async mounted() {
    this.posts = (await PostsService.index()).data
  }
}
</script>

<style scoped>
.post-title {
  text-decoration: none;
  color: black;
}
</style>
