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
        <v-btn @click="PostWriter()" block text>작성하기</v-btn>
      </v-flex>
      <v-flex xs12 sm3 md2>
        <v-btn to="/" block text>뒤로</v-btn><br>
      </v-flex>
    </v-layout>
    <!-- <div class="X">
      <h1 style="text-align: center;">recaptcha Google </h1>
       <form action="//goo.gl/FJmwrg">

         <label for="x1"> Name:</label>
        <input type="text" id="x1"/>
        <label for="x2"> Last Name:</label>
        <input type="text" id="x2"/>
        <label for="x3"> Email:</label>
        <input type="email" id="x3"/>
        <label for="x4"> Message:</label>
        <textarea id="x4" rows="4"></textarea>

      <div class="g-recaptcha" data-sitekey="6Lc-cA4UAAAAAOlLBnjwQ9SKqQ8eJLlUP-evJawo"></div>

        <input type="submit" id="x5" value="send"/>

       </form>
      </div>

      <link href="//goo.gl/2C5Kb0" rel="stylesheet">
      <link href="//goo.gl/40qUwS" rel="stylesheet">-->


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
          userID : this.$store.state.user.nickName,
          title : "",
          content: "",
        }
      }
    },
    methods:{
      async PostWriter() {
        console.log(this.$store.state.user.nickName + " 작성 유저 닉네임");
        const result = await FirebaseService.PostWriter(this.post)
        this.$router.push('/post')
      }
    },
    components: {
      markdownEditor,
      ImageComponent
    }
  }
</script>

<style>
  /* @import '~simplemde/dist/simplemde.min.css'; */

  /* body{
  background:#4d4766;
  font-family: 'Baloo Bhaina', cursive;
}
.X{
  max-width: 400px;
  margin: 2% auto;
  background: #fff;
  padding: 2%;
  box-shadow: 0 0 20px rgba(46, 59, 125, 0.23);
  border-radius: 5px;
}
label, input, textarea{
  font-size: 20px;
  box-sizing: border-box;
}
input, textarea{
  margin: 0 0 20px 0;
  padding: 15px;
  width: 100%;
  border: none;
  font-weight: 300;
  letter-spacing: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16),0 0 0 1px rgba(0,0,0,0.08);
  font-family: 'Roboto', sans-serif;
  display: flex;
}
input:hover,textarea:focus{
  outline: none;
  box-shadow:0 2px 4px rgba(0,0,0,0.4);
}
textarea:focus, input:focus{
  color: #2440a7;
  border: 1px solid #4f8df5;
}
input[type=submit]{
  width: 100%;
  margin: auto;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Baloo Bhaina', cursive;
  padding: 8px 20px;
  font-size: 34px;
}

.g-recaptcha{
  margin: 4% auto;
  width: 100%;
}
textarea{
  max-width: 100%;
} */
</style>
