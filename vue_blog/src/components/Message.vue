<template>
  <v-layout ma-0 pb-4>
    <v-flex v-if="!isUser" sm1>
      <v-avatar size="25" color="indigo">
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
    </v-flex>
    <v-flex>
      <div :class="{'user-message': isUser, 'bot-message': !isUser}">
        <div class="message">{{text}}</div>
      </div>
    </v-flex>
    <v-flex v-if="isUser" sm1>
      <v-avatar size="25" color="orange">
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
    </v-flex>
  </v-layout>
  <!-- <div :class="{'user-message': isUser, 'bot-message': !isUser}">
    <div class="message">{{text}}</div>
  </div> -->
</template>

<script>
export default {
  props: ['speaker', 'text'],
  computed: {
    isUser() {
      return this.speaker === 'user';
    },
  },
};
</script>

<style lang="scss" scoped>
.bot-message {
  padding-left: 15px;
  .message {
    background: #0FB0DF;
    color: white;
    position: relative;
  }
  .message::after{
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-right-color: #0FB0DF;
    border-left: 0;
    border-top: 0;
    margin-top: -15px;
    margin-left: -7px;
  }
}
.user-message {
  padding-right: 15px;
  text-align: right;
  .message {
    background: #eee;
    position: relative;
  }
  .message::after{
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-left-color: #eee;
    border-right: 0;
    border-top: 0;
    margin-top: -15px;
    margin-right: -7px;
  }
}
.message {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 10px;
}
</style>
