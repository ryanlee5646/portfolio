<template>
<!-- style="font-size : 3vw !important ;" -->
<v-container justify-center py-5>
  <v-layout justify-center>
    <v-flex xs8 class="notranslate text-xs-center">
      <div class="stretchRight" v-for="i in $store.state.portfolios.length">
        <div v-if="$store.state.portfolios[i -1].uid === id">
          <div v-if="flag2 === false">
          <a style="display: none !important;">{{index = i-1}}</a>
            <div class="flex justify-center items-center h-screen portfolioDiv">
              <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <!-- <img class="w-full .text-pop-up-top" :src = "$store.state.portfolios[i -1].portfolio.thumbnail" alt="Sunset in the mountains"> -->
                <div class="px-6 py-4 portfolioDiv2">
                  <a class="font-bold text-xl mb-2 title" style="font-size : 2.5vw !important;"> " {{$store.state.portfolios[i -1].portfolio.title}} "</a><hr>
                  <span style="font-size : 1.5vw !important;">조회수 : {{$store.state.portfolios[i -1].viewCount}}</span>
                  <div>
                    {{$store.state.portfolios[i -1].portfolio.sdate}} ~ {{$store.state.portfolios[i -1].portfolio.edate}}
                    <!-- <b-progress :value="90" variant="warning" striped :animated="true"></b-progress> -->
                    <hr>
                  </div>
                  <p id="markdownP" class="text-gray-700 text-base" style="font-size : 1.5vw !important;" v-html="compiledMarkdown">
                    {{$store.state.portfolios[i -1].portfolio.content}}
                  </p>
                </div>
                <div class="px-6 py-4">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" style="font-size : 1.5vw !important;">
                    # {{$store.state.portfolios[i -1].portfolio.teams}}
                  </span>
                </div><br>
                <button class="button" @click="deletePortfolio(i)">Delete</button>
                <button class="button" @click="editPortfolioClick(i)">Edit</button>
              </div>
            </div>
          </div>

          <!-- 수정 폼 -->
          <div v-else>
              <v-text-field label="제목" v-model="portfolioTemp.title"></v-text-field>
              <v-text-field label="프로젝트 참여 팀원" v-model="portfolioTemp.teams"></v-text-field>
              <v-layout wrap justify-space-between>
                <v-flex xs12 sm5>
                  <v-menu v-model="portfolioTemp.startdate" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="portfolioTemp.sdate" label="프로젝트 시작일" prepend-icon="event" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="portfolioTemp.sdate" @input="startdate = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm5>
                  <v-menu v-model="portfolioTemp.enddate" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="portfolioTemp.edate" label="프로젝트 종료일" prepend-icon="event" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="portfolioTemp.edate" @input="enddate = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>

              <markdown-editor v-model="portfolioTemp.content" ref="markdownEditor"></markdown-editor>
              <v-text-field solo name="input-7-4" label="썸네일 URL" v-model="portfolioTemp.thumbnail"></v-text-field>
              <ImageComponent></ImageComponent>

            <!-- <v-layout wrap justify-center>
                    <div v-if="this.$store.state.ImageLink == '' ">이 곳에 생성되는 url을 복사하여 사용해주세요 :-)</div>
                    <div v-else style="color : #43b848de;">
                      <b><span v-html="this.$store.state.ImageLink"></span></b><br>
                    </div><br><br>
                  </v-layout><br> -->

                  <hr><button class="button" @click="editPortfolio()">Edit</button>
                  <button  class="button" to="/portfolio" block flat>뒤로</button>

          </div>
        </div>
      </div>
    </v-flex>
  </v-layout>


  <!-- 댓글 작성 -->
  <br><hr>
  <v-layout wrap justify-center>
    <!-- 댓글 입력  -->
    <div class="reply-write-area col-xs-6">
      <div class="rw-inner">
        <div class="textarea">
          <textarea v-model="portfolioReply.content" class="form-control noresize" placeholder="댓글을 입력하세요." maxlength="3000"></textarea>
        </div>
        <div class="bnts ">
          <v-btn @click="PortfolioReply() " block flat>Add</v-btn>
        </div>
      </div>
    </div>
    <!-- 작성 댓글 출력 -->
    <!-- <v-container justify-center py-5> -->
      <!-- <v-layout justify-center>
        <v-flex xs8 class="text-xs-center"> -->
          <div class="row"><br>
            <!-- <div class="col-md-8"> -->
             <h2 class="page-header"><br>Comments</h2><br>
            <section class="comment-list">
              <article v-for="(r, index) in this.portfolioReplys" class="row">
                <div class="col-md-2 col-xs-6s hidden-xs">
                  <figure class="profile">
                    <img class="img-responsive" src="http://www.tangoflooring.ca/wp-content/uploads/2015/07/user-avatar-placeholder.png" width="70%;" />
                    <!-- <figcaption class="text-center">{{r.portfolioReply.email}}</figcaption> -->
                  </figure>
                </div>
                <div class="col-md-10 col-sm-10">
                  <div class="panel panel-default arrow left">
                    <div class="panel-body">
                      <header class="text-left">
                        <div class="comment-user"><i class="fa fa-user"></i> {{r.portfolioReply.email}}</div>
                        <hr>
                        <!-- <time class="comment-date" datetime="16-12-2014 01:05"><i class="fa fa-clock-o"></i> July 29, 2019</time> -->
                      </header>
                      <div class="comment-post" v-if="flag === false">
                        <p> {{r.portfolioReply.content}} </p>
                        <!-- @click="flag = true"  -->
                        <button v-if="r.portfolioReply.email === nowEmail" class="button" @click="editClick(index)">수 정</button>
                        <button v-if="r.portfolioReply.email === nowEmail" class="button" @click="deleteReply(index)">삭 제</button>
                      </div>
                      <div class="comment-post" v-else-if="r.portfolioReply.email === nowEmail">
                        <p v-if="editIdx === index">
                          <input type="text" v-model="editReplyContent" :placeholder="r.portfolioReply.content"></input> </p>
                        <button class="button" @click="editReply(index)">O K</button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </section>
            <!-- </div> -->
          </div>
        <!-- </v-flex>
      </v-layout> -->
    <!-- </v-container> -->
    <!-- </div> -->

    </div>
    </div>
  </v-layout><br>
</v-container>
</template>

<script>
import marked from 'marked';
import FirebaseService from '@/services/FirebaseService'
import markdownEditor from 'vue-simplemde/src/markdown-editor';
import ImageComponent from '../components/ImageComponent.vue';
// import FlipCard from 'vue-flip-card';
// import portfoliowrite from '../views/PortfolioWriter.vue';

export default {
  data() {
    return {
      portfolios: [],
      portfolioReplys: [],
      portfolioReply: {
        email: "",
        content: ""
      },
      nowUser: this.$store.state.user,
      emailArr: this.$store.state.user.email.split('@'),
      nowEmail: "",
      index: "",
      portfolioIdx: 0,
      flag: false,
      flag2: false,
      editReplyContent: "",
      editIdx: "",
      portfolioTemp: {
        userID: "", //this.$store.state.user
        startdate: "",
        enddate: "",
        sdate: "",
        edate: "",
        title: "",
        content: "",
        teams: "",
        thumbnail: "",
      },
    }
  },
  components: {
    markdownEditor,
    ImageComponent,

  },
  props: {
    id: {
      type: String,
      default: '-1'
    },
  },
  computed: {
    compiledMarkdown() {
      return marked(this.$store.state.portfolios[this.index].portfolio.content, {
        sanitize: true
      });
    },
  },
  created() {
    console.log(this.id + "created??");
    FirebaseService.addPortfoliosCount(this.id);
  },
  methods: {
    async PortfolioReply(){
       console.log("PortfolioReply in?");
       const result = await FirebaseService.PortfolioReply(this.portfolioReply , this.id)
       this.getPortfolioReply();
       // this.$router.push('/')
     },
    async getPortfolioReply() {
      this.portfolioReplys = await FirebaseService.getPortfolioReply(this.id);
      this.$store.commit('updatePortfolioReplys', this.portfolioReplys);
      // console.log(this.portfolioReplys + " 댓글 왔닝");
      // this.getPortfolioReply();
    },
    async deleteReply(index) {
      console.log(this.$store.state.portfolioReplys[index].uid + " 선택한 댓글?");
      const result = await FirebaseService.deleteReply(this.id, this.$store.state.portfolioReplys[index].uid);
      this.$store.state.portfolioReplys.splice(index, 1);
    },
    async editReply(index) {
      console.log(this.$store.state.portfolioReplys[index].uid + " 선택한 댓글?");
      this.flag = true;
      const result = await FirebaseService.editReply(this.id, this.$store.state.portfolioReplys[index].uid, this.editReplyContent, this.nowEmail);
      // this.$store.state.portfolioReplys.splice(index, 1);
      this.flag = false;
      this.getPortfolioReply();
    },
    editClick(index) {
      this.flag = true;
      this.editIdx = index;
    },
    editPortfolioClick(idx) {
      this.flag2 = true;
      // console.log(idx + " 수정 클릭");
      this.portfolioIdx = idx - 1;
      this.portfolioTemp.userID = this.nowEmail;
      this.portfolioTemp.startdate = this.$store.state.portfolios[this.portfolioIdx].portfolio.startdate;
      this.portfolioTemp.enddate = this.$store.state.portfolios[this.portfolioIdx].portfolio.enddate;
      this.portfolioTemp.sdate = this.$store.state.portfolios[this.portfolioIdx].portfolio.sdate;
      this.portfolioTemp.edate = this.$store.state.portfolios[this.portfolioIdx].portfolio.edate;
      this.portfolioTemp.title = this.$store.state.portfolios[this.portfolioIdx].portfolio.title;
      this.portfolioTemp.content = this.$store.state.portfolios[this.portfolioIdx].portfolio.content;
      this.portfolioTemp.teams = this.$store.state.portfolios[this.portfolioIdx].portfolio.teams;
      this.portfolioTemp.thumbnail = this.$store.state.portfolios[this.portfolioIdx].portfolio.thumbnail;
    },
    async deletePortfolio() {
      const result = await FirebaseService.deletePortfolio(this.id);
      this.portfolios = await FirebaseService.getPortfolios();
      this.$store.commit('updatePortfolios', this.portfolios);
      this.$router.replace('/');
    },
    async editPortfolio() {
      const result = await FirebaseService.editPortfolio(this.id, this.portfolioTemp);
      this.flag2 = false;
      this.portfolios = await FirebaseService.getPortfolios();
      this.$store.commit('updatePortfolios', this.portfolios);
      this.$router.replace('/portfolio/view/' + this.id);
    }
  },
  mounted() {
    console.log(this.nowUser.email + " 접속한 유저 정보");
    this.nowEmail = this.emailArr[0]; //유저의 이메일에서 아이디만 저장
    console.log(this.nowEmail);

    this.getPortfolioReply();
    document.querySelectorAll('.card').forEach((elem) => {
      const head = elem.querySelector('.card__head')
      const image = elem.querySelector('.card__image')
      const author = elem.querySelector('.card__author')
      const body = elem.querySelector('.card__body')
      const foot = elem.querySelector('.card__foot')

      elem.onmouseenter = () => {
        elem.classList.add('hover')
        const imageScale = 1 + factor(head, body, 'height')
        image.style.transform = `scale(${ imageScale })`

        const bodyDistance = height(foot) * -1
        body.style.transform = `translateY(${ bodyDistance }px)`

        const authorDistance = distance(head, author, 'height')
        author.style.transform = `translateY(${ authorDistance }px)`

      }
      elem.onmouseleave = () => {
        elem.classList.remove('hover')
        image.style.transform = `none`
        body.style.transform = `none`
        author.style.transform = `none`
      }
    })
  }
};
//
const height = (elem) => {
  return elem.getBoundingClientRect().height
}

const distance = (elemA, elemB, prop) => {
  const sizeA = elemA.getBoundingClientRect()[prop]
  const sizeB = elemB.getBoundingClientRect()[prop]
  return sizeB - sizeA
}

const factor = (elemA, elemB, prop) => {
  const sizeA = elemA.getBoundingClientRect()[prop]
  const sizeB = elemB.getBoundingClientRect()[prop]
  return sizeB / sizeA
}
</script>



<style>
/* @import '/style/css/portfolio.css'; */
@import "/vuelendar/scss/vuelendar.scss";

/* test */
.panel-body {
  font-size: 1vw;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
}

.portfolioDiv {
  /* padding: 100px; */
  width: 100%
  /* font-size: 4vw !important ; */
}

.portfolioDiv2 {
  padding-top: 30%;
  padding-bottom: 10%;
  padding-left: 5%;
  padding-right: 5%;
  /* padding-left:  */
}

.editor {
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

img[alt=image] {
  width: 300px;
  height: 300px;
}

#markdownP img {
  width: 77%;
}

.button {
  width: 7.5vw;
  height: 38px;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9vw;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.button:hover {
  background-color: #84a5d0;
  box-shadow: 0px 15px 20px #84a5d0;
  color: #fff;
  transform: translateY(-7px);
}

.reply-write-area {
  width: 100% !important;
}

.reply-write-area {
  width: 100%;
}

/* reply */
.panel panel-default arrow left {
  font-size: 2.5vw !important;
}

/*font Awesome http://fontawesome.io*/
@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);

/*Comment List styles*/
.comment-list .row {
  margin-bottom: 0px;
}

.comment-list .panel .panel-heading {
  padding: 4px 15px;
  position: absolute;
  border: none;
  /*Panel-heading border radius*/
  border-top-right-radius: 0px;
  top: 1px;
}

.comment-list .panel .panel-heading.right {
  border-right-width: 0px;
  /*Panel-heading border radius*/
  border-top-left-radius: 0px;
  right: 16px;
}

.comment-list .panel .panel-heading .panel-body {
  padding-top: 6px;
}

.comment-list figcaption {
  /*For wrapping text in thumbnail*/
  word-wrap: break-word;
}

/* Portrait tablets and medium desktops */
@media (min-width: 768px) {

  .comment-list .arrow:after,
  .comment-list .arrow:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
  }

  .comment-list .panel.arrow.left:after,
  .comment-list .panel.arrow.left:before {
    border-left: 0;
  }

  /*****Left Arrow*****/
  /*Outline effect style*/
  .comment-list .panel.arrow.left:before {
    /* left: 0px;
    top: 30px;
    border-right-color: inherit;
    border-width: 16px; */
  }

  /*Background color effect*/
  .comment-list .panel.arrow.left:after {
    left: 1px;
    top: 28px;
    /*Change for different outline color*/
    border-right-color: #fff;
    border-width: 15px;
  }

  /*****Right Arrow*****/
  /*Outline effect style*/
  .comment-list .panel.arrow.right:before {
    right: -16px;
    top: 30px;
    /*Use boarder color of panel*/
    border-left-color: inherit;
    border-width: 16px;
  }

  /*Background color effect*/
  .comment-list .panel.arrow.right:after {
    right: -14px;
    top: 31px;
    /*Change for different outline color*/
    /* border-left-color: #FFFFFF; */
    border-width: 15px;
  }
}

.comment-list .comment-post {
  margin-top: 6px;
}

.panel {
  border-radius: 30px !important;
}

.arrow {
  padding-bottom: 1% !important;
}
/*
==============================================
stretchRight
==============================================
*/

.stretchRight{
	animation-name: stretchRight;
	-webkit-animation-name: stretchRight;

	animation-duration: 1.5s;
	-webkit-animation-duration: 1.5s;

	animation-timing-function: ease-out;
	-webkit-animation-timing-function: ease-out;

	transform-origin: 0% 0%;
	-ms-transform-origin: 0% 0%;
	-webkit-transform-origin: 0% 0%;
}

@keyframes stretchRight {
	0% {
		transform: scaleX(0.3);
	}
	40% {
		transform: scaleX(1.02);
	}
	60% {
		transform: scaleX(0.98);
	}
	80% {
		transform: scaleX(1.01);
	}
	100% {
		transform: scaleX(0.98);
	}
	80% {
		transform: scaleX(1.01);
	}
	100% {
		transform: scaleX(1);
	}
}

@-webkit-keyframes stretchRight {
	0% {
		-webkit-transform: scaleX(0.3);
	}
	40% {
		-webkit-transform: scaleX(1.02);
	}
	60% {
		-webkit-transform: scaleX(0.98);
	}
	80% {
		-webkit-transform: scaleX(1.01);
	}
	100% {
		-webkit-transform: scaleX(0.98);
	}
	80% {
		-webkit-transform: scaleX(1.01);
	}
	100% {
		-webkit-transform: scaleX(1);
	}
}
</style>
