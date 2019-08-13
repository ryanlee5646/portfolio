<template>
      <v-snackbar v-model="getPush.state">
          <v-icon dark right>check_circle</v-icon>
              &nbsp; {{getPush.email}} {{getPush.message}}
          <v-btn color="pink" text @click="siteMove()">
              Go
          </v-btn>
          <v-btn color="pink" text @click="$store.commit('setPushState')">
              Close
          </v-btn>
      </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name : 'PushSnackbar',
    computed: {
    ...mapGetters([
      'getPush',
    ]),
    methods: {
      siteMove() {
        let target = this.getPush();
        this.$router.push({path: target.link })
      }
    },
  }
}
</script>