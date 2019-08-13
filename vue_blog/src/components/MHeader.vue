<template>
  <div id="toolbar">
    <Logo></Logo>
    <LoginPage></LoginPage>
    <BtnMenu @click.native="isMenuVisible = !isMenuVisible" :active="isMenuVisible" />
    <transition name="fade">
      <nav class="nav-bar" v-if="isMenuVisible">
        <ul @click="isMenuVisible = !isMenuVisible">
          <li @click="scrolling">
            <AnimateWhenVisible name="fadeUp" :duration="1.9">
              <a @click="siteMove('/')" href="#toolbar">
                Home
                <span></span>
              </a>
            </AnimateWhenVisible>
          </li>
          <li @click="scrolling">
            <AnimateWhenVisible name="fadeUp" :duration="1.9">
              <a @click="siteMove('/')" href="#about">
                About Us
                <span></span>
              </a>
            </AnimateWhenVisible>
          </li>
          <li @click="scrolling">
            <AnimateWhenVisible name="fadeUp" :duration="1.9">
              <a @click="siteMove('/')" href="#portfolio">
                Portfolio
                <span></span>
              </a>
            </AnimateWhenVisible>
          </li>
          <li @click="scrolling">
            <AnimateWhenVisible name="fadeUp" :duration="1.9">
              <a @click="siteMove('/')" href="#post">
                Post
                <span></span>
              </a>
            </AnimateWhenVisible>
          </li>
          <li @click="doLogin()" flat v-if="!isLogined">
            <AnimateWhenVisible name="fadeUp" :duration="1.9">
              <a>
                Login
                <span></span>
              </a>
            </AnimateWhenVisible>
          </li>
          <li @click="doLogout()" flat v-if="isLogined">
            <AnimateWhenVisible name="fadeUp" :duration="1.9">
              <a @click="siteMove('/')">
                Logout
                <span></span>
              </a>
            </AnimateWhenVisible>
          </li>
          <li @click="scrolling" v-if="isAuth">
            <AnimateWhenVisible name="fadeUp" :duration="1.9">
              <a @click="siteMove('/admin')" href="#admin">
                DashBoard
                <span></span>
              </a>
            </AnimateWhenVisible>
          </li>
        </ul>
      </nav>
    </transition>
  </div>

</template>

<script>
import BtnMenu from "./BtnMenu.vue";
import Logo from './Logo.vue';
import { animate } from "../utils";
import FirebaseService from "@/services/FirebaseService";
import LoginPage from "../views/LoginPage.vue";

export default {
  name: "mHeader",
  components: {
    BtnMenu,
    LoginPage: LoginPage,
    Logo
  },
  data: () => ({
    isMenuVisible: false,
    animation: null
  }),
  mounted() {
    let prevScrollpos = window.pageYOffset;
    window.addEventListener("scroll", () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("toolbar").style.top = "0px";
      } else {
        document.getElementById("toolbar").style.top = "-200px";
      }
      prevScrollpos = currentScrollPos;
    });

    // refresh 시 state 재입력
    if(localStorage.getItem("user") != null){
      this.$store.state.user = JSON.parse(localStorage.getItem("user") || "{}");
      this.$store.state.accessToken = localStorage.getItem("accessToken");
    }
  },
  methods: {
    siteMove(target) {
      this.$router.push({ path: target });
    },
    doLogin() {
      this.$store.commit("loginDialog", true);
    },
    async doLogout() {
      let flag = await FirebaseService.signOut();
      this.$store.commit('logout');
      if(flag === true){
          this.$store.commit('logout');
          this.$store.commit('setError', { type: 'success', code: '로그아웃', message: '정상적으로 로그아웃 되었습니다.' });
          this.$router.push({ path: '/' });
        }
        else{
          this.$store.commit('setError', { type: 'warning', code: '로그아웃', message: '비정상적인 로그아웃 입니다.' });
          this.$router.push({ path: '/' });
        }
    },
    getImageURL(filename) {
      return `img/icons/${filename}`;
    },
    scrolling(event) {
      event.preventDefault();

      if (this.animation) {
        this.animation.cancel();
      }

      const href = event.target.getAttribute("href");
      const scrollToEl = document.querySelector(href);
      const pageY = window.pageYOffset;

      this.animation = animate({
        duration: 600,
        easing: p =>
          p < 0.5 ? 4 * Math.pow(p, 3) : 4 * Math.pow(p - 1, 3) + 1,
        draw(progress) {
          window.scrollTo(0, pageY + progress * (scrollToEl.offsetTop - pageY));
        },
        done() {
          location.hash = href;
        }
      });
    }
  },
  computed: {
    isLogined() {
      console.log("[isLogined]");
      console.log(this.$store.state);
      return (this.$store.state.user !== "" && this.$store.state.user != null);
    },
    isAuth() {
      return this.$store.state.user.auth === 'manager';
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/css/variables.scss";

$text-nav-bar: map-get($colors, light) !default;


.nav-bar {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 50;
  right: 0;
  top: 0;

  > span {
    display: block;
  }

  ul {
    margin-top: 120px;
    text-align: center;
    padding: 0;
  }

  li {
    &:hover {
      background-color: rgba(255, 255, 255, 0.09);
      transition: all 0.5s ease-out;
    }

    a {
      font-weight: bold;
      font-size: 1.8rem;
      display: block;
      padding: 20px 0;
      text-transform: uppercase;
      color: $text-nav-bar;
      transition: all 0.5s ease-out;

      &:hover {
        color: map-get($colors, secondary);
      }
    }
  }
}
</style>
