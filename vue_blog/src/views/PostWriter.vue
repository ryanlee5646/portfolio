<template>
  <div id="postWriter">
    <v-flex xs12>
      <Title :title="category.name" :description="category.description"/>
    </v-flex>
    <v-layout justify-center pt-5>
      <v-flex xs12 sm8 md6>
        <v-text-field label="제목" v-model="post.title">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <markdown-editor v-model="post.content" ref="markdownEditor"></markdown-editor>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <ImageComponent></ImageComponent>
      </v-flex>
    </v-layout><br>
    <v-layout wrap justify-center>
      <div v-if="this.$store.state.ImageLink == '' ">이 곳에 생성되는 url을 복사하여 사용해주세요 :-)</div>
      <div v-else style="color : #43b848de;">
        <b><span v-html="this.$store.state.ImageLink"></span></b><br>
      </div><br><br>
    </v-layout><br>
    <v-layout wrap justify-center>
      <v-flex xs12 sm3 md2 mr-2>
        <v-btn @click="PostWriter()" class="headline" block text>작성하기</v-btn>
      </v-flex>
      <v-flex xs12 sm3 md2>
        <v-btn to="/#toolbar" class="headline" block text>뒤로</v-btn><br>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor';
  import ImageComponent from '../components/ImageComponent.vue';
  import Title from '../components/Title.vue';
  import FirebaseService from '@/services/FirebaseService';
  import store from '../store';

  export default {
    name : 'postwriter',
    store,
    data(){
      return{
        post:{
          userID : this.$store.state.user.email,
          nickName : this.$store.state.user.nickName,
          title : "",
          content: "",
        },
        category: {
              name : "Post Writer",
              description : "This is PostWriter Page. Thank you :)"
        },
      }
    },
    methods:{
      async PostWriter() {
        console.log(this.$store.state.user.nickName + " 작성 유저 닉네임");
        const result = await FirebaseService.PostWriter(this.post)
        this.$router.push('/');
        alert("Post가 작성되었습니다.");
      }
    },
    components: {
      markdownEditor,
      ImageComponent,
      Title,
    },
    beforeRouteEnter (to, from, next) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if(user.email != undefined){
          next();
      }
      else{
        store.commit('setError', { type: 'error', code: '로그인 오류', message: '로그인이 필요한 페이지입니다. 로그인 후 접속해 주세요.' });
        next({
          path: '/#toolbar',
        })
      }
    },
  }
</script>

<style>
#postWriter{
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
