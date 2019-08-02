<template>
  <v-container justify-center py-5>
    <v-layout justify-center>
      <v-flex xs8 class="notranslate text-xs-center">
        <div class="stretchRight" v-for="i in $store.state.posts.length">
          <div v-if="$store.state.posts[i -1].uid === id">
            <div v-if="flag2 === false">
            <a style="display: none !important;">{{index = i-1}}</a>
              <div class="flex justify-center items-center h-screen portfolioDiv">
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                  <!-- <img class="w-full .text-pop-up-top" :src = "$store.state.portfolios[i -1].portfolio.thumbnail" alt="Sunset in the mountains"> -->
                  <div class="px-6 py-4 portfolioDiv2">
                    <a class="font-bold text-xl mb-2 title" style="font-size : 2.5vw !important;"> " {{$store.state.posts[i -1].post.title}} "</a><hr>
                    <span style="font-size : 1.5vw !important;">조회수 : {{$store.state.posts[i -1].viewCount}}</span>
                    <p id="markdownP" class="text-gray-700 text-base" style="font-size : 1.5vw !important;" v-html="compiledMarkdown">
                      {{$store.state.posts[i -1].post.content}}
                    </p>
                  </div>
                  <button class="button" @click="deletePortfolio(i)">Delete</button>
                  <button class="button" @click="editPortfolioClick(i)">Edit</button>
                </div>
              </div>
            </div>

            <!-- 수정 폼 -->
            <div v-else>
                <v-text-field label="제목" v-model="portfolioTemp.title"></v-text-field>
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
            <textarea v-model="postReply.content" class="form-control noresize" placeholder="댓글을 입력하세요." maxlength="3000"></textarea>
          </div>
          <div class="bnts ">
            <v-btn @click="PostReplyWriter() " block flat>Add</v-btn>
          </div>
        </div>
      </div>
      <!-- 작성 댓글 출력 -->
            <!-- <div class="row"><br>
               <h2 class="page-header"><br>Comments</h2><br>
              <section class="comment-list">
                <article v-for="(r, index) in this.portfolioReplys" class="row">
                  <div class="col-md-2 col-xs-6s hidden-xs">
                    <figure class="profile">
                      <img class="img-responsive" src="http://www.tangoflooring.ca/wp-content/uploads/2015/07/user-avatar-placeholder.png" width="70%;" />
                    </figure>
                  </div>
                  <div class="col-md-10 col-sm-10">
                    <div class="panel panel-default arrow left">
                      <div class="panel-body">
                        <header class="text-left">
                          <div class="comment-user"><i class="fa fa-user"></i> {{r.portfolioReply.email}}</div>
                          <hr>
                        </header>
                        <div class="comment-post" v-if="flag === false">
                          <p> {{r.portfolioReply.content}} </p>
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
            </div> -->
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

export default {
  data() {
    return {
      posts: [],
      postReplys: [],
      postReply: {
        email: "",
        content: ""
      },
      nowUser: this.$store.state.user,
      emailArr: this.$store.state.user.email.split('@'),
      nowEmail: "",
      index: "",
      postIdx: 0,
      flag: false,
      flag2: false,
      editReplyContent: "",
      editIdx: "",
      postTemp: {
        userID: this.$store.state.user.nickName, //this.$store.state.user
        title: "",
        content: "",
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
      return marked(this.$store.state.posts[this.index].post.content, {
        sanitize: true
      });
    },
  },
  created() {
    console.log(this.id + " PostView created??");
    // FirebaseService.addPortfoliosCount(this.id);
  },
  methods: {
    async PostReplyWriter(){
       console.log("PostReplyWriter in?");
       const result = await FirebaseService.PostReplyWriter(this.postReply , this.id)
       this.getPostReplys();
     },
    async getPostReplys() {
      this.portfolioReplys = await FirebaseService.getPostReplys(this.id);
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
