<template>
  <v-container justify-center py-5>
    <v-layout   justify-center>
      <v-flex xs8 class="notranslate text-xs-center">
          <div v-for="i in $store.state.portfolios.length" :key="i">
            <div v-if="$store.state.portfolios[i -1].uid === id">
                <!-- {{id}}  acrKqb3TuKTJz9h4Dnkp -->
                <!-- {{$store.state.portfolios[i -1].portfolio.title}} <br>
                {{$store.state.portfolios[i -1].portfolio.content}}<br>
                <img :src = "$store.state.portfolios[i -1].portfolio.thumbnail" width="50px;"> -->
                <div v-if= "flag2 === false">
                # {{index = i-1}}
                {{portfolioIdx = i-1}}
                <div class="flex justify-center items-center h-screen">
                  <div class="max-w-sm rounded overflow-hidden shadow-lg">
                  <!-- <img class="w-full .text-pop-up-top" :src = "$store.state.portfolios[i -1].portfolio.thumbnail" alt="Sunset in the mountains"> -->
                    <div class="px-6 py-4">
                      <h2 class="font-bold text-xl mb-2"><b>" {{$store.state.portfolios[i -1].portfolio.title}} "</b>  <span>조회수 : {{$store.state.portfolios[i -1].viewCount}}</span> </h2><hr>
                          {{$store.state.portfolios[i -1].portfolio.sdate}} ~ {{$store.state.portfolios[i -1].portfolio.edate}}
                          <hr>
                      <p id = "markdownP" class="text-gray-700 text-base" v-html="compiledMarkdown">
                        {{$store.state.portfolios[i -1].portfolio.content}}
                      </p>
                    </div>
                    <div class="px-6 py-4">
                      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                         # {{$store.state.portfolios[i -1].portfolio.teams}}
                       </span>
                    </div><br>
                      <button class="button" @click="deletePortfolio(i)" >Delete</button>
                      <button class="button" @click="editPortfolioClick(i)" >Edit</button>
                    <!-- <div href="#" class="card px-6 py-4">
                    	<div class="card__head">
                    		<div class="card__image"></div>
                    		<div class="card__author">
                    			<div class="author">
                    				<img src="https://s.gravatar.com/avatar/7ff9e93ff25e002bc49f4d69c0c3eac7?s=80" alt="Author of Tobias Reich" class="author__image">
                    				<div class="author__content">
                    					<p class="author__header">Developer</p>
                    					<p class="author__subheader"># {{$store.state.portfolios[i -1].portfolio.teams}}</p>
                    				</div>
                    			</div>
                    		</div>
                    	</div>
                    	<div class="card__body">
                    		<h2 class="card__headline"><b>" {{$store.state.portfolios[i -1].portfolio.title}} "</b></h2>
                    		<p class="card__text" v-html="compiledMarkdown">
                          {{$store.state.portfolios[i -1].portfolio.content}} </p>
                    	</div>
                    	<div class="card__foot">
                    		<span class="card__link">Read more</span>
                    	</div>
                    	<div class="card__border"></div>
                    </div> -->
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
    <v-layout wrap justify-center>
      <div>
        <!-- <b-button class="button1" v-b-toggle.collapse-a.collapse-b>댓글 보기</b-button> -->
        <v-layout wrap justify-center>
          <v-flex xs8 class="notranslate text-xs-center">
          <div class="reply-write-area">
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
        </v-layout><br>
        <div>

<!-- contenteditable -->
          <!-- <v-btn class="button1" v-b-toggle.collapse-a.collapse-b  @click="getPortfolioReply() " block flat>댓글 보기</v-btn> -->
          <!-- <div > -->
            <!-- <div class="bubble bubble-bottom-left" >" dddd "</div><br> -->
            <v-layout justify-center>
              <v-flex xs8 class="notranslate text-xs-center">
                <!-- <div class="container"> -->
                  <div class="row">
                    <div class="col-md-8">
                      <h2 class="page-header">Comments</h2>
                        <section class="comment-list">
                          <article  v-for="(r, index) in this.portfolioReplys" class="row" :key="index">
                            <div class="col-md-2 col-sm-2 hidden-xs">
                              <figure class="profile" >
                                <img class="img-responsive" src="http://www.tangoflooring.ca/wp-content/uploads/2015/07/user-avatar-placeholder.png" width="70%;" />
                                <!-- <figcaption class="text-center">{{r.portfolioReply.email}}</figcaption> -->
                              </figure>
                            </div>
                            <div class="col-md-10 col-sm-10">
                              <div class="panel panel-default arrow left">
                                <div class="panel-body">
                                  <header class="text-left">
                                    <div class="comment-user"><i class="fa fa-user"></i> {{r.portfolioReply.email}}</div><hr>
                                    <!-- <time class="comment-date" datetime="16-12-2014 01:05"><i class="fa fa-clock-o"></i> July 29, 2019</time> -->
                                  </header>
                                  <div class="comment-post" v-if= "flag === false" >
                                    <p> {{r.portfolioReply.content}}  </p>
                                    <!-- @click="flag = true"  -->
                                    <button v-if="r.portfolioReply.email === nowEmail" class="button" @click="editClick(index)"  >수 정</button>
                                    <button v-if="r.portfolioReply.email === nowEmail" class="button" @click="deleteReply(index)" >삭 제</button>
                                  </div>
                                  <div class="comment-post" v-else-if="r.portfolioReply.email === nowEmail" >
                                    <p v-if="editIdx === index">
                                        <!-- {{editReplyContent}} -->
                                        <input type="text" v-model="editReplyContent"   :placeholder = "r.portfolioReply.content"   ></input> </p>
                                    <button class="button" @click="editReply(index)" >O K</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </article>
                        </section>
                    </div>
                  </div>
                <!-- </div> -->
              </v-flex>
            </v-layout>
          <!-- </div> -->
          <!-- <div class="bubble-r bubble-bottom-right" >"내가 작성한 댓글일 경우 "</div><br> -->
          <!-- <table>
            <tr>
              <th>Name</th>
              <th>Content</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
            <tr v-for="(r, index) in this.portfolioReplys">
              <td>{{r.portfolioReply.email}}</td>
              <td>{{r.portfolioReply.content}}</td>
              <td>-</td>
              현재 로그인한 유저와 댓글 작성자가 같을 경우에만 출력
              <td v-if="r.portfolioReply.email ===  "><button class="button" >수 정</button></td>
              <td><button class="button" >수 정</button></td>
              <td><a  @click="deleteReply(index)">삭 제</a></td>
            </tr>
          </table> -->
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
    ImageComponent
    // portfoliowrite
  },
  props: {
    id: { type: String, default: '-1' },
  },
  computed: {
    // getPortfolios(obj) {
    //   console.log(this.id  + " this.id =");
    //   console.log(obj.$store.state.portfolios[0].uid + " ??");
    //
    //   return (this.id === '-1') ? [] : this.$store.state.portfolios[0].portfolio;
    // },
    compiledMarkdown() {
      return marked(this.$store.state.portfolios[this.index].portfolio.content, { sanitize: true });
    },
  },
  created () {
    console.log(this.id + "created??");
    FirebaseService.addPortfoliosViews(this.id);
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
      const result = await FirebaseService.deleteReply(this.id, this.$store.state.portfolioReplys[index].uid);
      this.$store.state.portfolioReplys.splice(index, 1);
    },
    async editReply(index){
      console.log(this.$store.state.portfolioReplys[index].uid + " 선택한 댓글?");
      this.flag = true;
      const result = await FirebaseService.editReply(this.id, this.$store.state.portfolioReplys[index].uid, this.editReplyContent, this.nowEmail );
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
    width: 75%;
  }
  /* table {
    border-collapse: collapse;
    width: 100%;
    }

    th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    }

    tr:hover {background-color:#f5f5f5;} */

    .button {
      width: 60px;
      height: 40px;
      font-family: 'Roboto', sans-serif;
      font-size: 10px;
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
    /*  */
    /* ----------------------------------------------
 * Generated by Animista on 2019-7-29 13:59:13
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation text-pop-up-top
 * ----------------------------------------
 */
@-webkit-keyframes text-pop-up-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
  }
}
@keyframes text-pop-up-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc, 0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
  }
}
.text-pop-up-top {
	-webkit-animation: text-pop-up-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: text-pop-up-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/*  */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  background: white;
  color: currentColor;
  text-decoration: none;
  overflow: hidden;
  transition-property: color;
  transition-delay: 0.15s;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);

  /* border-radius: 50px; */
}
.card.hover {
  color: white;
  transition-delay: 0;
}
.card, .card__image, .card__image::after, .card__author, .card__body, .card__foot, .card__border {
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.51, 0.92, 0.24, 1);
}
.card__head {
  position: relative;
  padding-top: 70%;
}
.card__author {
  position: absolute;
  padding: 2em;
  left: 0;
  bottom: 0;
  color: white;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  transition-delay: 0.15s;
}
.card.hover .card__author {
  transition-delay: 0;
}
.card__image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-image: url("https://images.unsplash.com/photo-1553787762-b5f5721f3270?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80");
  -webkit-transform-origin: top center;
          transform-origin: top center;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  transition-delay: 0.15s;
}
.card__image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: .5;
  background: linear-gradient(30deg, rgba(26, 42, 99, 0.85), rgba(26, 42, 99, 0.5));
  transition-property: opacity;
  transition-delay: 0.15s;
}
.card.hover .card__image {
  transition-delay: 0;
}
.card.hover .card__image::after {
  opacity: 1;
  transition-delay: 0;
}
.card__body {
  position: relative;
  padding: 2em;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  transition-delay: 0.15s;
}
.card.hover .card__body {
  transition-delay: 0;
}
.card__headline {
  font-weight: 400;
  margin: 0 0 .8em;
}
.card__text {
  line-height: 1.5;
  margin: 0;
  opacity: .8;
}
.card__foot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 2em 2em;
  opacity: 0;
  transition-property: opacity;
}
.card.hover .card__foot {
  opacity: 1;
  transition-delay: 0.15s;
}
.card__link {
  color: currentColor;
  text-decoration: none;
  border-bottom: 2px solid #b5272d;
}
.card__border {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 6px;
  background: #b5272d;
  -webkit-transform: scaleY(0);
          transform: scaleY(0);
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
}
.card.hover .card__border {
  -webkit-transform: none;
          transform: none;
  transition-delay: 0.15s;
}

.author {
  display: flex;
  align-items: center;
}
.author__image {
  flex-shrink: 0;
  margin-right: 1em;
  width: 56px;
  height: 56px;
  border-radius: 100%;
  overflow: hidden;
}
.author__content {
  display: grid;
  grid-gap: .4em;
  font-size: .9em;
}
.author__header {
  margin: 0;
  font-weight: 600;
}
.author__subheader {
  margin: 0;
  opacity: .8;
}
/*  chat*/
/*
.bubble {
 position: relative;
 font-family: sans-serif;
 font-size: 13px;
 line-height: 15px;
 width: 70%;
 background: #999595;
 border-radius: 40px;
 padding: 20px;
 text-align: center;
 color: white;
 font-weight: bold;
}

.bubble-bottom-left:before {
 content: "";
 width: 0px;
 height: 0px;
 position: absolute;
 border-left: 24px solid  #999595;
 border-right: 12px solid transparent;
 border-top: 12px solid  #999595;
 border-bottom: 20px solid transparent;
 left: 32px;
 bottom: -24px;
}
.bubble-r {
  position: relative;
  font-family: sans-serif;
  font-size: 13px;
  line-height: 15px;
  width: 70%;
  background: #989abe;
  border-radius: 40px;
  padding: 20px;
  text-align: center;
  color: white;
  font-weight: bold;
  margin-left: 25%;
}
.bubble-bottom-right:before {
 content: "";
 width: 0px;
 height: 0px;
 position: absolute;
 border-left: 24px solid  #989abe;
 border-right: 12px solid transparent;
 border-top: 12px solid  #989abe;
 border-bottom: 20px solid transparent;
 right: 32px;
 bottom: -24px;
} */

</style>
