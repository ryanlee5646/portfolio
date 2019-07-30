<template>
  <div>
    <v-layout justify-center pt-5>
      <v-flex xs12 sm5 md4>
        <v-text-field label="제목" v-model="portfolio.title">
        </v-text-field>
      </v-flex>
    </v-layout>
    <!-- <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <v-textarea
              solo
              name="input-7-4"
              label="프로젝트 요약"
              v-model="portfolio.summary"
            ></v-textarea>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <v-layout wrap justify-space-between>
          <v-flex xs12 sm5>
            <v-menu
              v-model="portfolio.startdate"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="portfolio.sdate"
                  label="프로젝트 시작일"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="portfolio.sdate" @input="startdate = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm5>
            <v-menu
              v-model="portfolio.enddate"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="portfolio.edate"
                  label="프로젝트 종료일"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="portfolio.edate" @input="enddate = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout> -->
<!--

 -->

    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <markdown-editor v-model="portfolio.content" ref="markdownEditor"></markdown-editor>
      </v-flex>
    </v-layout>
    <v-layout wrap justify-center>
      <v-flex xs12 sm3 md2 mr-2>
        <v-btn @click="PortfolioWriter()" block flat>작성하기</v-btn>
      </v-flex>
      <v-flex xs12 sm3 md2>
        <v-btn to="/portfolio" block flat>뒤로</v-btn>
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
        portfolio:{
          startdate: "",
          enddate : "",
          sdate: "",
          edate: "",
          title : "",
          content: "",
          summary: ""
        }
      }
    },
    methods:{
      async PortfolioWriter() {
        const result = await FirebaseService.PortfolioWriter(this.portfolio)
        this.$router.push('/portfolio')
      }
    },
    components: {
      markdownEditor,
      ImageComponent
    }
  }
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
