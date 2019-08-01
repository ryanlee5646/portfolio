<template>
  <!-- style="font-size : 3vw !important ;" -->
  <v-container justify-center py-5 >
    <v-layout  justify-center>
      <v-flex xs8 class="text-xs-center">
          <div v-for="i in $store.state.portfolios.length" >
            <div v-if="$store.state.portfolios[i -1].uid === id" >
                <!-- <div v-if= "flag2 === false"> -->
                <a style="display: hidden">#{{index = i-1}}</a>
                <!-- <div class="flex justify-center items-center h-screen portfolioDiv">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg"> -->
                    <div class="containerpPF" v-if= "flag2 === false">
                      <div class="box">
                          <div class="product__img">
                              <img :src = "$store.state.portfolios[i -1].portfolio.thumbnail" alt="thumbnail" width="80%" >
                          </div>
                          <div class="product__disc">
                              <div class="product__disc--content">
                                  <div class="disc__content--about">
                                      <h1> " {{$store.state.portfolios[i -1].portfolio.title}} "</h1>
                                      <span> {{$store.state.portfolios[i -1].portfolio.sdate}} ~ {{$store.state.portfolios[i -1].portfolio.edate}} </span>
                                      <p id = "markdownP" class="text-gray-700 text-base" style="font-size : 1.5vw !important;" v-html="compiledMarkdown">
                                        {{$store.state.portfolios[i -1].portfolio.content}} </p>
                                   </div>
                              </div>
                              <button class="btn wishlist" @click="deletePortfolio(i)">Delete</button>
                              <button class="btn buy" @click="editPortfolioClick(i)">Edit</button>
                          </div>
                          <div class="product_buttons">

                              <button class="button" @click="deletePortfolio(i)" >Delete</button>
                              <button class="button" @click="editPortfolioClick(i)" >Edit</button>
                          </div>
                      </div>
                  </div>

                  <!-- 수정 폼 -->
                    <div v-else>
                      <v-layout justify-center pt-5>
                        <v-flex xs12 sm5 md4>
                          <v-text-field label="제목" v-model="portfolioTemp.title"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center pt-5>
                        <v-flex xs12 sm5 md4>
                          <v-text-field label="프로젝트 참여 팀원" v-model="portfolioTemp.teams"></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-layout justify-center>
                        <v-flex xs12 sm8 md6>
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
                        </v-flex>
                      </v-layout>

                      <v-layout justify-center>
                        <v-flex xs12 sm8 md6>
                          <markdown-editor v-model="portfolioTemp.content" ref="markdownEditor"></markdown-editor>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs12 sm8 md6>
                          <v-text-field solo name="input-7-4" label="썸네일 URL" v-model="portfolioTemp.thumbnail"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs12 sm8 md6>
                          <ImageComponent></ImageComponent>
                        </v-flex>
                      </v-layout><br>

                      <!-- <v-layout wrap justify-center>
                        <div v-if="this.$store.state.ImageLink == '' ">이 곳에 생성되는 url을 복사하여 사용해주세요 :-)</div>
                        <div v-else style="color : #43b848de;">
                          <b><span v-html="this.$store.state.ImageLink"></span></b><br>
                        </div><br><br>
                      </v-layout><br> -->
                      <v-layout wrap justify-center>
                        <v-flex xs12 sm3 md2 mr-2>
                        </v-flex>
                        <v-flex xs12 sm3 md2>
                          <button class="button" @click="editPortfolio()" >Edit</button>
                          <v-btn to="/portfolio" block flat>뒤로</v-btn>
                        </v-flex>
                      </v-layout>
                  </div>


                  <!-- <img class="w-full .text-pop-up-top" :src = "$store.state.portfolios[i -1].portfolio.thumbnail" alt="Sunset in the mountains"> -->
                    <!-- <div class="px-6 py-4 portfolioDiv2">
                      <a class="font-bold text-xl mb-2 title" style="font-size : 2vw !important;" > " {{$store.state.portfolios[i -1].portfolio.title}} "</a><hr>
                      <span style="font-size : 1.5vw !important;">조회수 : {{$store.state.portfolios[i -1].viewCount}}</span>
                      <div>
                          {{$store.state.portfolios[i -1].portfolio.sdate}} ~ {{$store.state.portfolios[i -1].portfolio.edate}}
                          <b-progress :value="90" variant="warning" striped :animated="true"  ></b-progress>
                          <hr>
                        </div>
                      <p id = "markdownP" class="text-gray-700 text-base" style="font-size : 1.5vw !important;" v-html="compiledMarkdown">
                        {{$store.state.portfolios[i -1].portfolio.content}}
                      </p>
                    </div>
                    <div class="px-6 py-4">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" style="font-size : 1.5vw !important;">
                         # {{$store.state.portfolios[i -1].portfolio.teams}}
                       </span>
                    </div><br>
                      <button class="button" @click="deletePortfolio(i)" >Delete</button>
                      <button class="button" @click="editPortfolioClick(i)" >Edit</button>-->
                  <!-- </div>
                </div> -->
              <!-- </div> -->


            </div>
        </div>
      </v-flex>
    </v-layout>


    <v-layout justify-center>
      <v-flex xs8 class="notranslate text-xs-center">
        <!-- <div class="editor" v-html="compiledMarkdown"></div> -->
      </v-flex>
    </v-layout>


    <!-- 댓글 작성 -->
    <br><hr>
    <!-- <v-layout wrap justify-center>
      <div>
        <v-layout wrap justify-center>
          <v-flex xs8 class="notranslate text-xs-center">
          <div class="reply-write-area col-xs-6">
            <div class="rw-inner">
              <div class="textarea">
                <textarea v-model="portfolioReply.content" class="form-control noresize" placeholder="댓글을 입력하세요." maxlength="3000"></textarea>
              </div>
              <div class="bnts">
                  <v-btn @click="PortfolioReply() " block flat>Add</v-btn>
              </div>
            </div>
          </div>
        </v-flex>
        </v-layout>
        <div>

           <v-container justify-center py-5>
            <v-layout justify-center>
              <v-flex xs8 class="text-xs-center">
                  <div class="row">
                <h2 class="page-header">Comments</h2>
                  <section class="comment-list">
                    <article  v-for="(r, index) in this.portfolioReplys" class="row">
                      <div class="col-md-2 col-xs-6s hidden-xs">
                        <figure class="profile" >
                          <img class="img-responsive" src="http://www.tangoflooring.ca/wp-content/uploads/2015/07/user-avatar-placeholder.png" width="70%;" />
                        </figure>
                      </div>
                      <div class="col-md-10 col-sm-10">
                        <div class="panel panel-default arrow left">
                            <div class="panel-body">
                              <header class="text-left">
                                <div class="comment-user"><i class="fa fa-user"></i> {{r.portfolioReply.email}}</div><hr>
                              </header>
                              <div class="comment-post" v-if= "flag === false" >
                                <p> {{r.portfolioReply.content}}  </p>
                                <button v-if="r.portfolioReply.email === nowEmail" class="button" @click="editClick(index)"  >수 정</button>
                                <button v-if="r.portfolioReply.email === nowEmail" class="button" @click="deleteReply(index)" >삭 제</button>
                              </div>
                              <div class="comment-post" v-else-if="r.portfolioReply.email === nowEmail" >
                                  <p v-if="editIdx === index">
                                  <input type="text" v-model="editReplyContent"   :placeholder = "r.portfolioReply.content"></input> </p>
                                  <button class="button" @click="editReply(index)" >O K</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </section>
                  </div>
              </v-flex>
            </v-layout>
          </v-container>

        </div>
      </div>
    </v-layout><br> -->
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
  data(){
    return{
      portfolios: [],
      portfolioReplys : [],
      portfolioReply : {
        email : "",
        content: ""
      },
      nowUser : this.$store.state.user,
      emailArr : this.$store.state.user.email.split('@'),
      nowEmail : "",
      index : "",
      portfolioIdx : 0,
      flag : false,
      flag2 : false,
      editReplyContent : "",
      editIdx : "",
      portfolioTemp: {
        userID: "", //this.$store.state.user
        startdate: "",
        enddate: "",
        sdate:  "",
        edate: "",
        title: "",
        content:  "",
        teams:  "",
        thumbnail :  "",
      },
    }
  },
  components: {
    markdownEditor,
    ImageComponent,

  },
  props: {
    id: { type: String, default: '-1' },
  },
  computed: {
    compiledMarkdown() {
      return marked(this.$store.state.portfolios[this.index].portfolio.content, { sanitize: true });
    },
  },
  created () {
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
      this.$store.commit('updatePortfolioReplys', this.portfolioReplys );
      // console.log(this.portfolioReplys + " 댓글 왔닝");
      // this.getPortfolioReply();
    },
    async deleteReply(index){
      console.log(this.$store.state.portfolioReplys[index].uid + " 선택한 댓글?");
      const result = await FirebaseService.deleteReply(index , this.id, this.$store.state.portfolioReplys[index].uid);
      this.$store.state.portfolioReplys.splice(index, 1);
    },
    async editReply(index){
      console.log(this.$store.state.portfolioReplys[index].uid + " 선택한 댓글?");
      this.flag = true;
      const result = await FirebaseService.editReply(index , this.id, this.$store.state.portfolioReplys[index].uid, this.editReplyContent, this.nowEmail );
      // this.$store.state.portfolioReplys.splice(index, 1);
      this.flag = false;
      this.getPortfolioReply();
    },
    editClick(index){
      this.flag = true;
      this.editIdx = index;
    },
    editPortfolioClick(idx){
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
    async deletePortfolio(){
      const result = await FirebaseService.deletePortfolio(this.id);
      this.portfolios = await FirebaseService.getPortfolios();
      this.$store.commit('updatePortfolios', this.portfolios );
      this.$router.replace('/');
    },
    async editPortfolio(){
      const result = await FirebaseService.editPortfolio(this.id, this.portfolioTemp);
      this.flag2 = false;
      this.portfolios = await FirebaseService.getPortfolios();
      this.$store.commit('updatePortfolios', this.portfolios );
      this.$router.push('/portfolio/view/' + this.id);
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
.containerpPF {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f6f6;
  position: relative;
}

.containerpPF .box {
  width: 0%;
  height: 90%;
  background: #fff;
  position: absolute;
  animation: openBox 1s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
}
.containerpPF .box .product__img {
  width: 600px;
  position: absolute;
  left: -150px;
  top: 50px;
  opacity: 0;
  animation: fadeImg 1s ease-in-out forwards;
  animation-delay: 1s;
}
.containerpPF .box .product__video {
  width: 320px;
  height: 100px;
  position: absolute;
  left: 50px;
  bottom: 50px;
}
.containerpPF .box .product__video .video {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0px;
  opacity: 0;
  animation: upVideo 1s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
  animation-delay: 1.2s;
}
.containerpPF .box .product__video .video i {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #f71568;
  border: 2px solid #f71568;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  transition: ease-in-out 220ms;
  cursor: pointer;
}
.containerpPF .box .product__video .video i:hover {
  background: #f71568;
  color: #fff;
  box-shadow: 0 0 26px #f71568;
}
.containerpPF .box .product__video .video p {
  margin-left: 20px;
  font-family: "Poppins";
}
.containerpPF .box .product__disc {
  width: 0px;
  height: 100%;
  background: #ffca1b;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0px;
  top: 50px;
  border-radius: 10px;
  animation: showDisc 1s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
}
.containerpPF .box .product__disc .product__disc--content {
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  animation: fadeContent 1s ease-in-out forwards;
  animation-delay: 1s;
  opacity: 0;
}
.containerpPF .box .product__disc .product__disc--content .disc__content--about {
  width: 100%;
}
.containerpPF .box .product__disc .product__disc--content .disc__content--about h1 {
  font-size: 32px;
  font-family: "Poppins";
}
.containerpPF .box .product__disc .product__disc--content .disc__content--about span {
  font-family: "Lato";
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  opacity: 0.5;
}
.containerpPF .box .product__disc .product__disc--content .disc__content--about p {
  margin-top: 35px;
  font-size: 14px;
  font-family: "Poppins";
}
.containerpPF .box .product__disc .product__disc--content .product__view--more {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.containerpPF .box .product__disc .product__disc--content .product__view--more:hover .view__more--block {
  width: 220px;
  height: 35px;
}
.containerpPF .box .product__disc .product__disc--content .product__view--more .view__more--block {
  width: 10px;
  height: 15px;
  position: absolute;
  background: #f6f6f6;
  z-index: 1;
  transition: cubic-bezier(0.68, -0.55, 0.27, 1.55) 320ms;
}
.containerpPF .box .product__disc .product__disc--content .product__view--more p {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  z-index: 2;
  margin-left: 15px;
  font-family: "Poppins";
}
.containerpPF .box .product_buttons {
  width: 500px;
  height: 100px;
  bottom: 50px;
  right: -50px;
  position: absolute;
}
.containerpPF .box .product_buttons .btn {
  width: 240px;
  height: 70%;
  font-size: 16px;
  font-weight: bold;
  font-family: "Poppins";
  -webkit-transition: ease-in-out 220ms;
  -moz-transition: ease-in-out 220ms;
  -ms-transition: ease-in-out 220ms;
  -o-transition: ease-in-out 220ms;
  transition: ease-in-out 220ms;
  cursor: pointer;
}
.containerpPF .box .product_buttons .wishlist {
  border: 2px solid #f71568;
  background: transparent;
  color: #f71568;
  position: absolute;
  bottom: -25px;
  left: 0;
  opacity: 0;
  animation: fadeWish 1s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
  animation-delay: 1s;
}
.containerpPF .box .product_buttons .wishlist:hover {
  background: #f71568;
  color: #fff;
  box-shadow: 0 0 26px #f71568;
}
.containerpPF .box .product_buttons .buy {
  border: none;
  background: #f71568;
  color: #fff;
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0;
  animation: fadeBuy 1s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
  animation-delay: 1s;
}
.containerpPF .box .product_buttons .buy:hover {
  box-shadow: 0 0 26px #f71568;
}

/*
  keyframes
 */
@keyframes openBox {
  0% {
    width: 0px;
    left: 15%;
  }
  100% {
    width: 900px;
    left: 15%;
  }
}
@keyframes fadeImg {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes upVideo {
  0% {
    opacity: 0;
    bottom: -20px;
  }
  100% {
    opacity: 1;
    bottom: 0px;
  }
}
@keyframes showDisc {
  0% {
    width: 0px;
    left: 450px;
  }
  100% {
    width: 500px;
    left: 450px;
  }
}
@keyframes fadeContent {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeWish {
  0% {
    opacity: 0;
    bottom: -25px;
  }
  100% {
    opacity: 1;
    bottom: 0;
  }
}
@keyframes fadeBuy {
  0% {
    opacity: 0;
    bottom: -25px;
  }
  100% {
    opacity: 1;
    bottom: 0;
  }
}
/*ignore*/
footer {
  width: 350px;
  height: 80px;
  background: #ffca1b;
  position: absolute;
  right: 0;
  bottom: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: top 0.8s forwards;
}
footer span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  font-family: "Poppins";
}
footer span i {
  margin-right: 25px;
  font-size: 22px;
  color: #fff;
  animation: icon 2s forwards;
  opacity: 0;
}

@keyframes top {
  0% {
    opacity: 0;
    bottom: -80px;
  }
  100% {
    opacity: 1;
    bottom: 0px;
  }
}
@keyframes icon {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.3) rotate(-2deg);
  }
  100% {
    opacity: 1;
    bottom: 0px;
  }
}

/*  */
.title{
    /* font-size: 4vw !important ; */
}
.panel-body{
  font-size: 1vw;
}
.portfolioDiv{
  /* padding: 100px; */
  width: 280%;
  /* font-size: 4vw !important ; */
}

.portfolioDiv2{
  padding-top: 25%;
  padding-bottom: 10%;
  padding-left: 5%;
  padding-right: 5%;
  /* padding-left:  */
}
  .editor{
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  img[alt=image]{
    width: 300px;
    height: 300px;
  }

  #markdownP img{
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

    .reply-write-area{
      width: 100% !important;
    }


.reply-write-area{
  width: 100%;
}

/* reply */
.panel panel-default arrow left{
    font-size: 2.5vw !important;
}
.comment-list .row {
  margin-bottom: 0px;
}
.comment-list .panel .panel-heading {
  padding: 4px 15px;
  position: absolute;
  border:none;
  /*Panel-heading border radius*/
  border-top-right-radius:0px;
  top: 1px;
}
.comment-list .panel .panel-heading.right {
  border-right-width: 0px;
  /*Panel-heading border radius*/
  border-top-left-radius:0px;
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
  .comment-list .arrow:after, .comment-list .arrow:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
  }
  .comment-list .panel.arrow.left:after, .comment-list .panel.arrow.left:before {
    border-left: 0;
  }
  /*****Left Arrow*****/
  /*Outline effect style*/
  .comment-list .panel.arrow.left:before {
    left: 0px;
    top: 30px;
    /*Use boarder color of panel*/
    border-right-color: inherit;
    border-width: 16px;
  }
  /*Background color effect*/
  .comment-list .panel.arrow.left:after {
    left: 1px;
    top: 31px;
    /*Change for different outline color*/
    border-right-color: #FFFFFF;
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
    border-left-color: #FFFFFF;
    border-width: 15px;
  }
}
.comment-list .comment-post {
  margin-top: 6px;
}

.panel{
  border-radius: 30px !important;
}
.arrow{
  padding-bottom : 1% !important;
}


</style>
