<template>
<v-container justify-center py-5>
  <v-flex xs12>
    <Title :title="category.name" :description="category.description"/>
  </v-flex>
  <v-layout justify-center>
    <v-flex xs12 class="notranslate text-xs-center">
      <div class="stretchRight" v-for="i in $store.state.posts.length">
        <div v-if="$store.state.posts[i -1].uid === id">
          <div v-if="flag2 === false">
            <a style="display: none !important;">{{index = i-1}}</a>
            <!-- <div  > -->
              <!-- class="max-w-sm rounded overflow-hidden shadow-lg" -->
              <AnimateWhenVisible name="fadeLeft" class="col-12 col-md">
                <div class="cardDiv slideDown ">
                  <!-- <div class="px-6 py-4 portfolioDiv2"> -->
                    <br><p class="font-bold text-xl mb-2 title" style="font-size : 2.2vw !important;">  <b> {{$store.state.posts[i -1].post.title}}</b> </p>
                    <hr><p id="views" style="font-size : 1.0vw !important;" > [  조회수 :  {{$store.state.posts[i -1].views}}  ]</p>
                    <p id="views" style="font-size : 1.2vw !important;" >   작성자 :  {{$store.state.posts[i -1].post.nickName}}  </p>
                    <hr>
                    <div id="content" style="font-size : 1.5vw !important;" v-html="compiledMarkdown">  {{$store.state.posts[i -1].post.content}} </div>
                  <br>
                  <button class="button" v-show=" $store.state.posts[i -1].post.userID === nowUser.email || manager === nowUser.auth "  @click="deletePost()">Delete</button>
                  <button class="button" v-show="$store.state.posts[i -1].post.userID === nowUser.email || manager === nowUser.auth"  @click="editPostClick(i)">Edit</button>
                </div>
              </AnimateWhenVisible>
            <!-- </div> -->
          </div>
          <!-- 수정 폼 -->
          <div v-else>
            <v-text-field label="제목" v-model="postTemp.title"></v-text-field>
            <markdown-editor v-model="postTemp.content" ref="markdownEditor"></markdown-editor>
            <hr><button class="button" @click="editPost()">Edit</button>
            <button class="button" @click="flag2 = false" block text>뒤로</button>
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
          <textarea v-model="postReply.content" class="form-control" placeholder="댓글을 입력하세요." maxlength="6000"></textarea>
        </div>
        <div class="bnts ">
          <v-btn @click="PostReplyWriter() " block text>Add</v-btn>
        </div>
      </div>
    </div>
    <!-- 작성 댓글 출력 -->
    <v-flex xs12>
         <hr><br><h1>Comments 😊</h1>
        <section class="comment-list">
          <article v-for="(r, index) in this.postReplys" class="row">

            <div class="col-md-2 col-xs-6s hidden-xs">
              <figure class="profile">
                <img class="img-responsive" :src="r.postReply.photoURL" />
              </figure>
              <!-- photoURL -->
            </div>
            <div class="col-md-10 col-sm-10">
              <div class="panel panel-default arrow left">
                <div class="panel-body">
                  <header class="text-left">
                    <div class="comment-user"><i class="fa fa-user"></i> {{r.postReply.nickName}}</div>
                    <hr>
                  </header>
                  <div class="comment-post" v-if="flag === false">
                    <p> {{r.postReply.content}} </p>
                    <button v-show="r.postReply.email === nowUser.email  || manager === nowUser.auth " class="button" @click="editClick(index)">수 정</button>
                    <button v-show="r.postReply.email === nowUser.email  || manager === nowUser.auth " class="button" @click="deletePostReply(index)">삭 제</button>
                  </div>
                  <div class="comment-post" v-else-if="r.postReply.email === nowUser.email  || manager === nowUser.auth">
                    <p v-if="editIdx === index">
                      <input type="text" v-model="editReplyContent" :placeholder="r.postReply.content"></input> </p>
                    <button class="button" @click="editPostReply(index)">O K</button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </v-flex>
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
import Title from '../components/Title.vue';

export default {
  data() {
    return {
      category: { 
              name : "Post",
              description : "This is Post Page. Thank you :)"
      },
      posts: [],
      postReplys: [],
      postReply: {
        email: "",
        nickName : "",
        content: "",
        photoURL : ""
      },
      nowUser: this.$store.state.user,
      // emailArr: this.$store.state.user.email.split('@'),
      // nowEmail: this.$store.state.user.nickName,
      index: "",
      postIdx: 0,
      flag: false,
      flag2: false,
      editReplyContent: "",
      editIdx: "",
      postTemp: {
        userID: this.$store.state.user.email, //this.$store.state.user
        nickName : this.$store.state.user.nickName,
        title: "",
        content: "",
      },
      // photoURL : "",
    }
  },
  components: {
    markdownEditor,
    ImageComponent,
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
      return marked(this.$store.state.posts[this.index].post.content, {
        sanitize: true
      });
    },
  },
  created() {
    FirebaseService.addPostViews(this.id);
  },
  methods: {
    async PostReplyWriter() {
      console.log("PostReplyWriter in?");
      const result = await FirebaseService.PostReplyWriter(this.postReply, this.id);
      this.postReply.content = '';
      this.getPostReplys();
    },
    async getPostReplys() {
      this.postReplys = await FirebaseService.getPostReplys(this.id);
      this.$store.commit('updatePostReplys', this.postReplys);
    },
    async deletePostReply(index) {
      const result = await FirebaseService.deletePostReply(this.id, this.$store.state.postReplys[index].uid);
      this.$store.state.postReplys.splice(index, 1);
    },
    async editPostReply(index) {
      this.flag = true;
      const result = await FirebaseService.editPostReply(this.id, this.$store.state.postReplys[index].uid, this.editReplyContent);
      this.flag = false;
      this.getPostReplys();
    },
    editClick(index) {
      this.flag = true;
      this.editIdx = index;
    },
    editPostClick(idx) {
      this.flag2 = true;
      this.postIdx = idx - 1;
      this.postTemp.userID = this.$store.state.user.nickName;
      this.postTemp.title = this.$store.state.posts[this.postIdx].post.title;
      this.postTemp.content = this.$store.state.posts[this.postIdx].post.content;
    },
    async deletePost() {
      const result = await FirebaseService.deletePost(this.id);
      this.posts = await FirebaseService.getPosts();
      this.$store.commit('updatePosts', this.posts);
      this.$router.replace('/');
    },
    async editPost() {
      const result = await FirebaseService.editPost(this.id, this.postTemp);
      this.flag2 = false;
      this.posts = await FirebaseService.getPosts();
      this.$store.commit('updatePosts', this.posts);
      this.$router.replace('/post/view/' + this.id);
    },
  },
  mounted() {
    console.log(this.nowUser.email + " 접속한 유저 정보");
    // this.nowEmail = this.emailArr[0]; //유저의 이메일에서 아이디만 저장

    this.getPostReplys();
    document.querySelectorAll('.card').forEach((elem) => {
      const head = elem.querySelector('.card__head')
      const image = elem.querySelector('.card__image')``
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
.textarea{
  height: 150px;
}
.form-control{
  height: 120px !important;
  font-size: 1.5rem !important;
}
.userPhoto{
  border-radius: 50px;
}
.title{
  font-size: 2vw;
}

#views{
  text-align: right;
}

.cardDiv{
  width: 100% !important;
}
#content{
  text-align: left;
  padding: 10px;
  margin: 10px;
  background-color: #fafbfc;
    border-radius: 40px;
  /* border: 2px solid gray;
  border-radius: 40px; */
}
/*  */

/* .slideDown{
	animation-name: slideDown;
	-webkit-animation-name: slideDown;

	animation-duration: 3s;
	-webkit-animation-duration: 3s;

	animation-timing-function: ease;
	-webkit-animation-timing-function: ease;

	visibility: visible !important;
}

@keyframes slideDown {
	0% {
		transform: translateY(-100%);
	}
	50%{
		transform: translateY(8%);
	}
	65%{
		transform: translateY(-4%);
	}
	80%{
		transform: translateY(4%);
	}
	95%{
		transform: translateY(-2%);
	}
	100% {
		transform: translateY(0%);
	}
}

@-webkit-keyframes slideDown {
	0% {
		-webkit-transform: translateY(-100%);
	}
	50%{
		-webkit-transform: translateY(8%);
	}
	65%{
		-webkit-transform: translateY(-4%);
	}
	80%{
		-webkit-transform: translateY(4%);
	}
	95%{
		-webkit-transform: translateY(-2%);
	}
	100% {
		-webkit-transform: translateY(0%);
	}
} */


</style>
