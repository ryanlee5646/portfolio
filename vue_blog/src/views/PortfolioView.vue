<template>
<!-- style="font-size : 3vw !important ;" -->
<v-container justify-center py-5 id="portfolioView">
  <v-flex xs12>
    <Title :title="category.name" :description="category.description"/>
  </v-flex>
  <v-layout justify-center>
    <v-flex xs12 class="text-xs-center">
      <div class="stretchRight" v-for="i in $store.state.portfolios.length" :key="i">
        <div v-if="$store.state.portfolios[i -1].uid === id">
          <div class="portfolioDiv" v-if="flag2 === false">
            <a style="display: none !important;">{{index = i-1}}</a>
            <hr>
            <AnimateWhenVisible name="fadeLeft" class="col-12 col-md">
            <div>
              <!--content inner-->
              <!-- <div class="content__inner"> -->
                <!--tabs-->
                <div class="tabs">
                  <!--tabs navigation-->
                  <div class="tabs__nav">
                    <ul class="tabs__nav-list">
                      <li class="tabs__nav-item js-active"><a  class="btn-1" v-on:click="clickDiv = 'intro'">Intro</a></li>
                      <li class="tabs__nav-item"><a  class="btn-1" v-on:click="clickDiv = 'content'">Content</a></li>
                      <!-- <li class="tabs__nav-item"><a v-on:click="clickDiv = 'Q&A'">Q/A</a></li> -->
                      <li class="tabs__nav-item"><a  class="btn-1" v-on:click="clickDiv = 'git'">Git</a></li>
                    </ul>
                  </div><hr>

                  <!-- {{clickDiv}} -->
                  <div class="cardDiv slideDown intro " v-if="clickDiv === 'intro'">
                    <!-- <div class="px-6 py-4 portfolioDiv2"> -->
                      <br><a class="font-bold text-xl mb-2 title" style="font-size : 2.0vw !important;">  <b> {{$store.state.portfolios[i -1].portfolio.title}}</b></a> <span id="viewsPortfolio" style="font-size : 1.0vw !important;" >
                      &nbsp;&nbsp; [  조회수 :  {{$store.state.portfolios[i -1].views}}  ]</span><br><br>
                      <p id="viewsPortfolio" style="font-size : 1.3vw !important;" >   작성자 :  {{$store.state.portfolios[i -1].portfolio.nickName}}  </p>
                      <p id="viewsPortfolio" style="font-size : 1.3vw !important;">{{$store.state.portfolios[i -1].portfolio.sdate}} ~ {{$store.state.portfolios[i -1].portfolio.edate}}</p>
                      <p id="viewsPortfolio" style="font-size : 1.3vw !important;" > 팀원 : {{getTeamName($store.state.portfolios[i -1].portfolio.teams)}}</p><hr>
                </div>
                <div class="cardDiv slideDown content " v-else-if="clickDiv === 'content'">
                  <br>
                   <div id="markdownP" style="font-size : 1.5vw !important;" v-html="compiledMarkdown">  {{$store.state.portfolios[i -1].portfolio.content}} </div>
                </div>
                <div class="cardDiv slideDown " v-else-if="clickDiv === 'git'">
                  <repository :gitlabToken="gitlabToken" :teams="$store.state.portfolios[i -1].portfolio.teams"></repository>
                </div>
                <br>
                <button class="button" v-if="$store.state.portfolios[i -1].portfolio.userID === nowUser.email || manager === nowUser.auth "  @click="deletePortfolio()">Delete</button>
                <button class="button" v-if="$store.state.portfolios[i -1].portfolio.userID === nowUser.email || manager === nowUser.auth "  @click="editPortfolioClick(i)">Edit</button>
                </div>
              <!-- </div> -->
            </div>
            <!-- <div id="test">come?</div> -->
          </AnimateWhenVisible>
            <!-- <div class="flex justify-center items-center h-screen portfolioDiv"> -->
              <!-- <div class="max-w-sm rounded overflow-hidden shadow-lg"> -->
                <!-- <img class="w-full .text-pop-up-top" :src = "$store.state.portfolios[i -1].portfolio.thumbnail" alt="Sunset in the mountains"> -->
                <!-- <div class="px-6 py-4  "> -->

                <!-- <a class="font-bold text-xl mb-2 title" style="font-size : 2.5vw !important;"> " {{$store.state.portfolios[i -1].portfolio.title}} "</a><hr>
                <span style="font-size : 1.5vw !important;">조회수 : {{$store.state.portfolios[i -1].views}}</span>
                <br><span style="font-size : 1.5vw !important;">작성자 : {{$store.state.portfolios[i -1].portfolio.userID}}</span>
                <div>
                  {{$store.state.portfolios[i -1].portfolio.sdate}} ~ {{$store.state.portfolios[i -1].portfolio.edate}}
                  <hr>
                </div>
                <p id="markdownP" class="text-gray-700 text-base" style="font-size : 1.5vw !important;" v-html="compiledMarkdown">
                  {{$store.state.portfolios[i -1].portfolio.content}}
                </p>

                <div class="px-6 py-4">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" style="font-size : 1.5vw !important;">
                    # {{$store.state.portfolios[i -1].portfolio.teams}}
                  </span>
                </div><br>
                <button class="button" v-if="$store.state.portfolios[i -1].portfolio.userID === nowUser.nickName"  @click="deletePortfolio(i)">Delete</button>
                <button class="button" v-if="$store.state.portfolios[i -1].portfolio.userID === nowUser.nickName"  @click="editPortfolioClick(i)">Edit</button> -->
              <!-- </div> -->
            <!-- </div> -->
          </div>

          <!-- 수정 폼 -->
          <div v-else>
              <v-text-field label="제목" v-model="portfolioTemp.title"></v-text-field>
              <v-layout justify-center pt-5>
                <v-flex xs12>
                  <v-combobox
                  v-model="model"
                  :filter="filter"
                  :hide-no-data="!search"
                  :items="items"
                  :search-input.sync="search"
                  hide-selected
                  label="프로젝트 참여 인원"
                  multiple
                  small-chips
                  :auto-select-first="focus"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <span class="subheading">No matches found</span>
                    </v-list-item>
                  </template>
                  
                  <template v-slot:selection="{ attrs, item, parent, selected }">
                    <v-chip
                      v-if="item === Object(item)"
                      v-bind="attrs"
                      :input-value="selected"
                      label
                      small
                    >
                      <span class="pr-2">
                        {{ item.name }}
                      </span>
                      <v-icon
                        small
                        @click="parent.selectItem(item)"
                      >close</v-icon>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ index, item }">
                      <v-list-item-avatar>
                        <v-img :src="item.img"></v-img>
                      </v-list-item-avatar>
              
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name" style="font-size:16px; font-weight:bold;"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.ID" style="font-size:12px;"></v-list-item-subtitle>
                      </v-list-item-content>
                  </template>
                </v-combobox>
                </v-flex>
              </v-layout>
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

            <v-layout wrap justify-center>
            <!--         <div v-if="this.$store.state.ImageLink == '' ">이 곳에 생성되는 url을 복사하여 사용해주세요 :-)</div>
                    <div v-else style="color : #43b848de;">
                      <b><span v-html="this.$store.state.ImageLink"></span></b><br>
                    </div><br><br> -->
                  </v-layout><br>


              <hr><button class="button"  @click="editPortfolio()">Edit</button>
              <button  class="button" @click="flag2 = false" block flat>뒤로</button>
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
          <v-btn @click="PortfolioReply() " block text>Add</v-btn>
        </div>
      </div>
    </div>
    <!-- 작성 댓글 출력 -->
    <v-flex xs12>
         <hr><br><h1>Comments 😊</h1>
        <section class="comment-list">
          <article v-for="(r, index) in this.portfolioReplys" class="row" :key="index">

            <div class="col-md-2 col-xs-6s hidden-xs">
              <figure class="profile">
                <img class="img-responsive" :src="r.portfolioReply.photoURL" />
              </figure>
              <!-- photoURL -->
            </div>
            <div class="col-md-10 col-sm-10">
              <div class="panel panel-default arrow left">
                <div class="panel-body">
                  <header class="text-left">
                    <div class="comment-user"><i class="fa fa-user"></i> {{r.portfolioReply.nickName}}</div>
                    <hr>
                  </header>
                  <div class="comment-post" v-if="flag === false">
                    <p> {{r.portfolioReply.content}} </p>
                    <button v-if="r.portfolioReply.email === nowUser.email || manager === nowUser.auth " class="button" @click="editClick(index)">수 정</button>
                    <button v-if="r.portfolioReply.email === nowUser.email || manager === nowUser.auth " class="button" @click="deleteReply(index)">삭 제</button>
                  </div>
                  <div class="comment-post" v-else-if="r.portfolioReply.email === nowUser.email || manager === nowUser.auth ">
                    <p v-if="editIdx === index">
                      <input type="text" v-model="editReplyContent" :placeholder="r.portfolioReply.content">
                    </p>
                    <button class="button" @click="editReply(index)">O K</button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </v-flex>
  </v-layout><br>
</v-container>
</template>

<script>
import marked from 'marked';
import FirebaseService from '@/services/FirebaseService'
import markdownEditor from 'vue-simplemde/src/markdown-editor';
import ImageComponent from '../components/ImageComponent.vue';
import Title from '../components/Title.vue';
import Repository from '../components/Repository.vue';

export default {
  data() {
    return {
      category: { 
              name : "Portfolio",
              description : "This is Portfolio Page. Thank you :)"
      },
      portfolios: [],
      portfolioReplys: [],
      portfolioReply: {
        email: "",
        nickName : "",
        content: "",
        photoURL : ""
      },
      nowUser: this.$store.state.user,
      // emailArr: this.$store.state.user.email ? this.$store.state.user.email.split('@') : '',
      nowEmail: "",
      index: "",
      portfolioIdx: 0,
      flag: false,
      flag2: false,
      editReplyContent: "",
      editIdx: "",
      portfolioTemp: {
        userID: this.$store.state.user.email, //this.$store.state.user,
        nickName : this.$store.state.user.nickName,
        startdate: "",
        enddate: "",
        sdate: "",
        edate: "",
        title: "",
        content: "",
        teams: "",
        thumbnail: "",
      },
      clickDiv : "intro",
      gitlabToken : "2KybhN5CUPV7pWSqYEXb",
      activator: null,
      index: -1,
      items: [
        { header: 'Select an User' },
      ],
      nonce: 1,
      menu: false,
      model: [],
      x: 0,
      search: null,
      y: 0,
      focus: true,
      // replyPhotoURL : "",
    }
  },
  components: {
    markdownEditor,
    ImageComponent,
    Repository,
    Title,
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
    FirebaseService.addPortfoliosViews(this.id);
  },
  methods: {
    async PortfolioReply(){
       console.log("PortfolioReply in?");
       const result = await FirebaseService.PortfolioReply(this.portfolioReply , this.id);
       this.portfolioReply.content = '';
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
      const result = await FirebaseService.editReply(this.id, this.$store.state.portfolioReplys[index].uid, this.editReplyContent);
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
      this.portfolioTemp.userID = this.$store.state.user.email;
      this.portfolioTemp.nickName = this.$store.state.user.nickName;
      this.portfolioTemp.startdate = this.$store.state.portfolios[this.portfolioIdx].portfolio.startdate;
      this.portfolioTemp.enddate = this.$store.state.portfolios[this.portfolioIdx].portfolio.enddate;
      this.portfolioTemp.sdate = this.$store.state.portfolios[this.portfolioIdx].portfolio.sdate;
      this.portfolioTemp.edate = this.$store.state.portfolios[this.portfolioIdx].portfolio.edate;
      this.portfolioTemp.title = this.$store.state.portfolios[this.portfolioIdx].portfolio.title;
      this.portfolioTemp.content = this.$store.state.portfolios[this.portfolioIdx].portfolio.content;
      this.portfolioTemp.teams = this.$store.state.portfolios[this.portfolioIdx].portfolio.teams;
      this.model = this.$store.state.portfolios[this.portfolioIdx].portfolio.teams;
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
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''
      const text = hasValue(itemText)
      const query = hasValue(queryText)
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    async getMemberUser(){
      const result = await FirebaseService.getMemberUser();
      result.forEach(user => {
          this.items.push({img: user.photoURL, name: user.name, ID: `@${user.nickName}`, text: `${user.name} ${user.nickName}`, gitlabID: user.gitlabID});
      });
    },
    getTeamName(teams){
      console.log(teams);
      let teamName = '';
      for(let i = 0; i < teams.length; ++i){
        teamName += teams[i].name+" ";
      }
      return teamName;
    },
    // async getUserInfoByEmail(byEmail){
    //   console.log(byEmail + " byEmail?????");
    //   const result = await FirebaseService.getUserInfoByEmail(byEmail);
    //   console.log(result);
    //   console.log(result.photoURL);
    //   this.replyPhotoURL = result.photoURL;
    // },
  },
  mounted() {
    this.getMemberUser();
    this.getPortfolioReply();
  }
};


</script>



<style>
/* @import '/style/css/portfolio.css'; */
@import "/vuelendar/scss/vuelendar.scss";

#portfolioView{
  margin-top: 50px;
}

.img-responsive{
  /* 댓글 작성자 이미지 */
 border-radius: 55px;
 width: 80px;
}

#viewsPortfolio{
  text-align: left;
}

a.tabBtn:active {
  background-color: red;
}

/* div.next_btn:active {
background-image: url(images/next_btn_click.png);
} */
/* test */
.panel-body {
  font-size: 1vw;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
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

#markdownP{
  width: 100%;
  text-align: left;
  /* margin-left: 20%; */
}

#markdownP img {
  width: 80%;
  text-align: center;
  margin: 10%;
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

/*  */

.tabs__nav-list {
 position: relative;
 display: flex;
 justify-content: space-between;
 list-style-type: none;
 z-index: 5;
 /* background-color: gray; */
 font-size: 2rem;
 text-align: center;
}
/*  */

@-webkit-keyframes sheen {
  0% {
    -webkit-transform: skewY(-45deg) translateX(0);
            transform: skewY(-45deg) translateX(0);
  }
  100% {
    -webkit-transform: skewY(-45deg) translateX(12.5em);
            transform: skewY(-45deg) translateX(12.5em);
  }
}
@keyframes sheen {
  0% {
    -webkit-transform: skewY(-45deg) translateX(0);
            transform: skewY(-45deg) translateX(0);
  }
  100% {
    -webkit-transform: skewY(-45deg) translateX(12.5em);
            transform: skewY(-45deg) translateX(12.5em);
  }
}

/*  */

[class*="btn-"] {
 position: relative;
 display: inline-block;
 width: 100%;
 color: #red;
 font-size: 16px;
 line-height: 45px;
 margin-right:3em;
 max-width: 100px;
 text-decoration: none;
 text-transform: uppercase;
 vertical-align: middle;
}

/**
* ===========================
* @class : btn-1
* ===========================
*/
.btn-1 {
 letter-spacing: 0;
 -webkit-transition: all .28s ease-in-out;
 transition: all .28s ease-in-out;
}
.btn-1:hover,
.btn-1:focus,
.btn-1:active {
 letter-spacing: 5px;
}
.btn-1:after,
.btn-1:before {
 border: 1px solid  gray;
 bottom: 0;
 content: " ";
 display: block;
 margin: 0 auto;
 position: relative;
 -webkit-transition: all .28s ease-in-out;
 transition: all .28s ease-in-out;
 width: 0;
}
.btn-1:hover:after,
.btn-1:hover:before {
 border-color: gray;
 -webkit-transition: width 350ms ease-in-out;
 transition: width 350ms ease-in-out;
 width: 70%;
}
.btn-1:hover:before {
 bottom: auto;
 top: 0;
}
</style>
