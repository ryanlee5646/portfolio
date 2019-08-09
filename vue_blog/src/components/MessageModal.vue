<template>
      <v-dialog v-model="getError.state" persistent max-width="400">
        <v-card>
          <v-card-title v-if="getError.type == 'error'" class="headline error-color white--text"><v-icon dark left>warning</v-icon> {{getError.code}}</v-card-title>
          <v-card-title v-if="getError.type == 'success'" class="headline success-color white--text"><v-icon dark left>check_circle</v-icon> {{getError.code}}</v-card-title>
          <v-card-title v-if="getError.type == 'info'" class="headline info-color white--text"><v-icon dark left>info</v-icon>{{getError.code}}</v-card-title>
          <v-card-title v-if="getError.type == 'warning'" class="headline warning-color white--text"><v-icon dark left>warning</v-icon> {{getError.code}}</v-card-title>
          <v-card-text style="font-size:14px; font-weight:bold; margin-top:10px;">{{getError.message}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="white--text" color="grey darken-4" text @click="$store.commit('setErrorState')">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

  export default{
    name : 'MessageModal',
    computed: {
    ...mapGetters([
      'getError',
    ])
  }
  }
</script>
<style>
.success-color{
  background-color: #4CAF50;
}
.error-color{
  background-color: #FF5252;
}
.info-color{
  background-color: #2196F3;
}
.warning-color{
  background-color: #FB8C00;
}
</style>