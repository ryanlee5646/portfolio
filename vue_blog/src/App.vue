<template>
  <v-app>
    <transition name="fade" tag="div">
      <div class="wrapper" v-if="isLoaded" key="app">
        <mHeader></mHeader>
        <ImgBanner imgSrc="https://source.unsplash.com/random">
          <div style="line-height:1.2em;font-size:1.2em;" slot="text">Portfolio</div>
        </ImgBanner>
        <router-view></router-view>
        <Chatbot></Chatbot>
      </div>
      <div class="loader wrapper" style="overflow:hidden;" v-else key="loader">
        <div class="spinner-loader"></div>
      </div>
    </transition>
    <!-- <writePage></writePage> -->
    <message-modal></message-modal>
    <!-- 크롬 브라우저가 아닐 시 최적화 메시지 띄워주는 스낵바-->
    <mSnackbar :snackbar="snackbar"></mSnackbar>
  </v-app>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import store from './store';
import ImgBanner from './components/ImgBanner.vue';
import mSnackbar from './components/MSnackbar.vue';
import mHeader from './components/MHeader.vue';
import FirebaseService from '@/services/FirebaseService';
import Chatbot from './components/Chatbot.vue';
import writePage from './components/WritePage.vue';
import MessageModal from './components/MessageModal.vue';


// @vue/compontent
export default {
  name: 'App',
  store,
  data() {
    return {
      isLoaded: false,
      snackbar: false,
    };
  },
  created() {
    axios.get('/api')
      .then((response) => {
        console.log('response ', response);
      });
    window.vueStore = this.$store;
    document.body.classList.add('loading');
    FirebaseService.getPortfolios().then((data) => {
      console.log("App.vue - 1  ", data);
      this.$store.commit('updatePortfolios', data);
      this.isLoaded = true;
      this.$nextTick(() => document.body.classList.remove('loading'));
    });

    FirebaseService.getPosts().then((data) => {
      console.log("App.vue - ", data);

      this.$store.commit('updatePosts', data);
      this.isLoaded = true;
      this.$nextTick(() => document.body.classList.remove('loading'));
    });

    // 조회수
    FirebaseService.addViews();
  },

  mounted() {
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if (!isChrome) {
      this.snackbar = true;
    }
  },
  components: {
    ImgBanner,
    mSnackbar,
    mHeader,
    Chatbot,
    MessageModal,
    // writePage,
  },
};
</script>

<style scoped lang="scss">
  $spinner-loader-color: rgba(#003, 0.3) !default;

  .wrapper {
    height: 100%;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  @keyframes spinner-loader {
    0%   {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .spinner-loader {
    animation: spinner-loader 1500ms infinite linear;
    border-radius: 0.5em;
    box-shadow: $spinner-loader-color 1.5em 0 0 0,
      $spinner-loader-color 1.1em 1.1em 0 0,
      $spinner-loader-color 0 1.5em 0 0,
      $spinner-loader-color -1.1em 1.1em 0 0,
      $spinner-loader-color -1.5em 0 0 0,
      $spinner-loader-color -1.1em -1.1em 0 0,
      $spinner-loader-color 0 -1.5em 0 0,
      $spinner-loader-color 1.1em -1.1em 0 0;
    display: inline-block;
    font-size: 10px;
    width: 1em;
    height: 1em;
    margin: 1.5em;
    overflow: hidden;
    text-indent: 100%;
  }
</style>
