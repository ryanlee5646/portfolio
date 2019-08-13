<template>
  <v-app>
    <transition name="fade" tag="div">
      <div class="wrapper" v-if="isLoaded">
        <mHeader></mHeader>
        <!-- <ImgBanner imgSrc="https://source.unsplash.com/random">
          <div style="line-height:1.2em;font-size:1.2em;" slot="text">Portfolio</div>
        </ImgBanner> -->
        <HomeBanner></HomeBanner>
        <router-view></router-view>
        <Chatbot></Chatbot>
        <mFooter></mFooter>
      </div>
      <div class="loader wrapper scrollbar" v-else>
        <div class="spinner-loader scrollbar"></div>
      </div>
    </transition>
    <!-- <writePage></writePage> -->
    <message-modal></message-modal>
    <!-- 크롬 브라우저가 아닐 시 최적화 메시지 띄워주는 스낵바-->
    <mSnackbar :snackbar="snackbar"></mSnackbar>
    <!-- 푸시알림 스낵바 -->
    <PushSnackbar></PushSnackbar>



  </v-app>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import store from './store';
import HomeBanner from './components/homeBanner.vue';
import mSnackbar from './components/MSnackbar.vue';
import mHeader from './components/MHeader.vue';
import FirebaseService from '@/services/FirebaseService';
import Chatbot from './components/Chatbot.vue';
import mFooter from './components/Mfooter.vue';
import MessageModal from './components/MessageModal.vue';
import PushSnackbar from './components/PushSnackbar.vue';


// @vue/compontent
export default {
  name: 'App',
  store,
  data() {
    return {
      isLoaded: false,
      snackbar: false
    };
  },
  created() {
    axios.get('/api')
      .then((response) => {
        console.log('response ', response);
      });
    window.vueStore = this.$store;
    Promise.all([
      FirebaseService.getPortfolios(),
      FirebaseService.getPosts()
    ]).then(([portfolios, posts]) => {
      this.$store.commit('updatePortfolios', portfolios);
      this.$store.commit('updatePosts', posts);
      this.isLoaded = true;
    });

    // 조회수
    FirebaseService.addViews();
  },
  methods: {
    async check(){ // 알림허용
      await FirebaseService.notificationCheck();
    }
  },
  mounted() {
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if (!isChrome) {
      this.snackbar = true;
    }
    this.check(); // 알림허용할지 확인
  },
  components: {
    HomeBanner,
    mSnackbar,
    mHeader,
    Chatbot,
    mFooter,
    MessageModal,
    PushSnackbar
  }
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
    overflow: hidden;
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
