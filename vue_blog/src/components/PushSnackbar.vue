<template>
      <v-snackbar v-model="getPush.state">
          <v-icon dark right>check_circle</v-icon>
              &nbsp; {{getPush.nickName}}  {{getPush.message}}
          <v-btn color="pink" @click="siteMove()" text>
              Go
          </v-btn>
          <v-btn color="pink" text @click="$store.commit('setPushState')">
              Close
          </v-btn>
      </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';
import FirebaseService from '@/services/FirebaseService';

export default {
  name: 'PushSnackbar',
  computed: {
    ...mapGetters([
      'getPush'
    ])
  },
  methods: {
    siteMove() {
      Promise.all([
        FirebaseService.getPortfolios(),
        FirebaseService.getPosts()
      ]).then(([portfolios, posts]) => {
        this.$store.commit('updatePortfolios', portfolios);
        this.$store.commit('updatePosts', posts);
        this.$router.push(this.$store.state.push.link, () => {});
      });
    }
  }
};
</script>
