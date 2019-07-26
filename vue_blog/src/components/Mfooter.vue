<template>
  <div class="footer-style">

    <v-footer style="height: 100%; background-color: transparent;">
      <v-layout wrap>
        <v-flex xs12 pa-2 style="background-color: #60c5ba">
          <v-layout wrap>
            <v-flex xs6 md3 text-xs-center>
              <span class="dohyeon-font footer-label">개발일자</span>
              <span class="dohyeon-font footer-value">2019.07</span>
            </v-flex>
            <v-flex xs6 md3 text-xs-center>
              <span class="dohyeon-font footer-label">라이센스</span>
              <span class="dohyeon-font footer-value">MIT</span>
            </v-flex>
            <v-flex xs12 md6 text-xs-center>
              <span class="dohyeon-font footer-label">Github Link</span>
              <span class="dohyeon-font footer-value">https://lab.ssafy.com/ryanlee5646/webmobile-sub2</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-footer>
    <v-btn
      id="floating-btn"
      @click="moveScroll(0)"
      absolute
      right
      dark
      fab
      fixed
      color="#ef5285">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'mfooter',
  mounted() {
    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos < 40) {
        document.getElementById('floating-btn').style.transform = 'translate(0, 240px)';
        // document.getElementById("floating-btn").style.bottom = "trans";
      } else {
        document.getElementById('floating-btn').style.transform = 'translate(0, -240px)';
      }
    });
  },
  methods: {
    moveScroll(offset) {
      window.scrollTo(0, offset);
    },
  },
};
</script>

<style>
  @import '../style/css/font.css';
  #floating-btn{
    bottom: -100px;
    display: block;
    -webkit-transition: 1s;
    -webkit-transition-timing-function : ease;
    transition: 1s;
    transition-timing-function : ease;
  }

  .footer-label{
    color: #494949;
  }

  .footer-label::after{
    content: " : "
  }

  .footer-value{
    color: black;
  }
</style>
