<template>
  <div>
    <v-layout justify-center pt-5>
      <v-flex xs12 sm5 md4>
        <v-text-field label="제목" v-model="post.title">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <markdown-editor v-model="post.content" ref="markdownEditor"></markdown-editor>
      </v-flex>
    </v-layout>
    <v-layout wrap justify-center>
      <v-flex xs12 sm3 md2 mr-2>
        <v-btn @click="PostWriter()" block flat>작성하기</v-btn>
      </v-flex>
      <v-flex xs12 sm3 md2>
        <v-btn to="/" block flat>뒤로</v-btn><br>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor';
  import ImageComponent from '../components/ImageComponent.vue';
  import FirebaseService from '@/services/FirebaseService';

  export default {
    name : 'portfoliowrite',
    data(){
      return{
        post:{
          userID : this.$store.state.user.email,
          nickName : this.$store.state.user.nickName,
          title : "",
          content: "",
        }
      }
    },
    methods:{
      async PostWriter() {
        console.log(this.$store.state.user.nickName + " 작성 유저 닉네임");
        const result = await FirebaseService.PostWriter(this.post)
        this.$router.push('/')
      }
    },
    components: {
      markdownEditor,
      ImageComponent
    }
  }
</script>

<style>


</style>
