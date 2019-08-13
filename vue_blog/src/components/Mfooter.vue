<template>
  <div>
    <v-footer style="height: 100%; background-color: transparent; padding: 0px;">
      <v-layout wrap >
        <v-flex xs12 pa-2
         style="background-image: linear-gradient(#212529, rgb(39, 49, 70)); height: 60px;">
        </v-flex>
        <v-flex xs12 pa-2 style="background-color: rgb(39, 49, 70);">
          <v-layout wrap justify-center>
            <v-flex xs12 sm8 md4>
              <img src="img/programmer.gif" width="100%" style="max-width: 500px;">
            </v-flex>
            <v-flex sm12 md8 pt-5>
              <pre id="typewriter">
<span class="var-highlight">var</span> information = {
      team: <span class="string-highlight">'Abdie Developers'</span>,
      gitlab: <span class="string-highlight">'https://lab.ssafy.com/ryanlee5646/webmobile-final'</span>,
      address: <span class="string-highlight">'SSAFY Gumi branch'</span>,
      members: [<span class="string-highlight">'Lee Gyu Jin'</span>,
               <span class="string-highlight">'Moon Yong Sung'</span>,
               <span class="string-highlight">'Shin Eun Jung'</span>,
               <span class="string-highlight">'Yoon Kwan Woong'</span>];
};
<span class="comment-highlight">// Show me the money , Power overwhelming.</span>
<span class="var-highlight">var</span> saying = <span class="string-highlight">'Give me monstorous powerrrrr to develop!!!'</span>;</pre>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'mfooter',
  data() {
    return {
      html: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      const typer = document.getElementById('typewriter');
      let typewriter = this.setupTypewriter(typer);
      typewriter.type();
    });
  },
  methods: {
    setupTypewriter(t) {
      if (this.html === '') {
        this.html = t.innerHTML;
      }
      const HTML = this.html;
      t.innerHTML = '';
      let cursorPosition = 0;
      let tag = '';
      let writingTag = false;
      let tagOpen = false;
      const typeSpeed = 100;
      let tempTypeSpeed = 0;
      const type = () => {
        if (writingTag === true) {
          tag += HTML[cursorPosition];
        }
        if (HTML[cursorPosition] === '<') {
          tempTypeSpeed = 0;
          if (tagOpen) {
            tagOpen = false;
            writingTag = true;
          } else {
            tag = '';
            tagOpen = true;
            writingTag = true;
            tag += HTML[cursorPosition];
          }
        }
        if (!writingTag && tagOpen) {
          tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
          if (HTML[cursorPosition] === ' ') {
            tempTypeSpeed = 0;
          }
          else {
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
          }
          t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === '>') {
          tempTypeSpeed = (Math.random() * typeSpeed) + 50;
          writingTag = false;
          if (tagOpen) {
            let newSpan = document.createElement('span');
            t.appendChild(newSpan);
            newSpan.innerHTML = tag;
            tag = newSpan.firstChild;
          }
        }
        cursorPosition += 1;
        if (cursorPosition < HTML.length - 1) {
          setTimeout(type, tempTypeSpeed);
        } else {
          setTimeout(() => {
            this.setupTypewriter(t).type();
          }, 10000);
        }
      };
      return {
        type: type
      };
    }
  }
};
</script>

<style>
  /* Google Fonts */
  @import url(https://fonts.googleapis.com/css?family=Anonymous+Pro);
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
  .var-highlight {
    color: #db5edb;
  }

  .string-highlight {
    color: #5dde57;
  }

  .comment-highlight {
    color: #adb0ac;
  }

  #typewriter {
    padding-left: 50px;
    font-size: 1.2em;
    min-height: 250px;
    margin: 0;
    font-family: "Courier New";
    color: white;
  }
  #typewriter:after {
    content: "|";
    -webkit-animation: blink 0.5s linear infinite alternate;
            animation: blink 0.5s linear infinite alternate;
  }

  @-webkit-keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

</style>
