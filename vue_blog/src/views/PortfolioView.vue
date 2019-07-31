<template>
  <v-container justify-center py-5>
    <v-layout justify-center>
      <v-flex xs8 class="notranslate text-xs-center">

        <div v-for="i in $store.state.portfolios.length" >
          <div v-if="$store.state.portfolios[i -1].uid === id">
              <!-- dsafhsdfklajsdklfjas;dflkjsdl;fjl; -->
              {{i}}<br>

              <!-- {{id}}  acrKqb3TuKTJz9h4Dnkp -->
              {{$store.state.portfolios[i -1].portfolio.title}} <br>
              {{$store.state.portfolios[i -1].portfolio.content}}<br>
              <!--
              startdate: "",
              enddate: "",
              sdate: "",
              edate: "",
              teams: ""
             -->
              <img :src = "$store.state.portfolios[i -1].portfolio.thumbnail" width="50px;">
          </div>
        </div>

        <h2>hello</h2>
        <!-- <a @onclick="getPortfolios(this)">ggg</a> -->
        <!-- <h2>{{getPortfolios.title}}</h2>-->
        <!-- <h1>{{id}}</h1> -->
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs8 class="notranslate text-xs-center">
        <!-- <div class="editor" v-html="compiledMarkdown"></div> -->
      </v-flex>
    </v-layout>

    <!-- 댓글 작성 -->
    <hr>
    <v-layout wrap justify-center>
      <div>
        <!-- <b-button class="button1" v-b-toggle.collapse-a.collapse-b>댓글 보기</b-button> -->

        <v-btn class="button1" v-b-toggle.collapse-a.collapse-b  @click="getPortfolioReply() " block flat>댓글 보기</v-btn>
        <!-- Elements to collapse -->
        <!-- <b-row class="mt-2"> -->
          <!-- <b-col sm="10">
            <b-form-textarea id="textarea-large" size="lg" placeholder="댓글을 작성해주세요."></b-form-textarea>
            <v-btn to="/" block flat>Add</v-btn>
          </b-col> -->
        <!-- </b-row><br> -->

        <v-layout wrap justify-center>
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
        </v-layout><br>
        <hr>
        <!-- <div class="reply-list-area">
          <ul>
            <li class rel>
              <div class="status float-base">
                <div class="column user-info">
                  <span class="name">Name</span>
                </div>
                <div class="column date">
                  <span >Date</span>
                </div>
              </div>
              <div class="reply-content">
                댓글 내용
              </div>
            </li>
          </ul>
        </div> -->

        <div>
          <h2>All Replys</h2>
          <p>좋은 의견을 공유합시다^_^</p>
          <table>
            <tr>
              <th>Name</th>
              <th>Content</th>
              <th>Date</th>
            </tr>
            <tr v-for="r in portfolioReplys">
              <td>{{r.email}}</td>
              <td>{{r.content}}</td>
              <td>-</td>
            </tr>
          </table>
        </div>

      </div>
    </v-layout><br>
  </v-container>
</template>

<script>
import marked from 'marked';
import FirebaseService from '@/services/FirebaseService'

export default {
  data(){
    return{
      portfolios: [],
      portfolioReplys : [],
      portfolioReply : {
        email : "",
        content: ""
      }
    }
  },
  props: {
    id: { type: String, default: '-1' },
  },
  computed: {
    getPortfolios(obj) {
      console.log(this.id  + " this.id =");
      console.log(obj.$store.state.portfolios[0].uid + " ??");

      return (this.id === '-1') ? [] : this.$store.state.portfolios[0].portfolio;
    },
    compiledMarkdown() {
      return marked(this.getPortfolios.content, { sanitize: true });
    },
  },
  methods: {
    async PortfolioReply(){
      console.log("PortfolioReply in?");
      const result = await FirebaseService.PortfolioReply(this.portfolioReply , this.id)
      this.$router.push('/')
    },
    async getPortfolioReply() {
			this.portfolioReplys = await FirebaseService.getPortfolioReply(this.id);
      console.log(this.portfolioReplys + " 댓글 왔닝");
    }
  },
  mounted() {
    console.log("view in???");
    console.log(this.getPortfolios);
  }

};
</script>

<style>
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

  table {
    border-collapse: collapse;
    width: 100%;
    }

    th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    }

    tr:hover {background-color:#f5f5f5;}
</style>
