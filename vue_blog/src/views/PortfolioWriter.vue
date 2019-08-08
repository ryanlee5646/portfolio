<template>
<div>
  <v-layout justify-center pt-5>
    <v-flex xs12 sm5 md4>
      <v-text-field label="제목" v-model="portfolio.title">
      </v-text-field>
    </v-flex>
  </v-layout>

  <v-layout justify-center pt-5>
    <v-flex xs12 sm5 md4>
      <v-text-field label="프로젝트 참여 팀원" v-model="portfolio.teams" 
      @click="up">
      </v-text-field>
        <v-card
      class="mx-auto"
      max-width="300"
      tile
      v-if="showCard"
    >
      <v-list dense>
        <v-subheader>REPORTS</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    </v-flex>
  </v-layout>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <v-layout wrap justify-space-between>
        <v-flex xs12 sm5>
          <v-menu v-model="portfolio.startdate" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="portfolio.sdate" label="프로젝트 시작일" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="portfolio.sdate" @input="startdate = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm5>
          <v-menu v-model="portfolio.enddate" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="portfolio.edate" label="프로젝트 종료일" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="portfolio.edate" @input="enddate = false"></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <markdown-editor v-model="portfolio.content" ref="markdownEditor"></markdown-editor>
    </v-flex>
  </v-layout>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <v-text-field solo name="input-7-4" label="썸네일 URL" v-model="portfolio.thumbnail"></v-text-field>
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
      <!-- 이름 : <b><span v-html="this.$store.state.ImageTitle"></span></b> &nbsp; -->
      <b><span v-html="this.$store.state.ImageLink"></span></b><br>
    </div><br><br>
  </v-layout><br>
  <v-layout wrap justify-center>
    <v-flex xs12 sm3 md2 mr-2>
      <v-btn @click="PortfolioWriter()" block text>작성하기</v-btn>
    </v-flex>
    <v-flex xs12 sm3 md2 mr-2>
      <v-btn to="/portfolio" block text>뒤로</v-btn>
    </v-flex>
  </v-layout>
  <br>

</div>
</template>


<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor';
import ImageComponent from '../components/ImageComponent.vue';
import FirebaseService from '@/services/FirebaseService';
import {
    VListItemGroup,
    VListItem,
    VListItemIcon,
    VListItemTitle,
    VListItemContent
} from 'vuetify/lib';

export default {
  
  name: 'portfoliowrite',
  data() {
    return {
      showCard: false,
      portfolios : [],
      portfolio: {
        userID: this.$store.state.user.nickName, //this.$store.state.user
        startdate: "",
        enddate: "",
        sdate: "",
        edate: "",
        title: "",
        content: "",
        teams: "",
        views : 0,
        // portfolioCnt: this.$store.state.user.portfolioCount,
        // postCnt: this.$store.state.user.postCount,
      },
      item: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }
  },
  methods: {
    async PortfolioWriter() {
      // console.log(this.$store.state.user.mail + " 카운트??");
      const result = await FirebaseService.PortfolioWriter(this.portfolio);
      this.portfolios = await FirebaseService.getPortfolios();
      this.$store.commit('updatePortfolios', this.portfolios );
      this.$router.push('/');
    },
    up(){
      console.log("hellododododod");
      this.showCard = true;
    }
  },
  components: {
    markdownEditor,
    ImageComponent,
    VListItemGroup,
    VListItemGroup,
    VListItem,
    VListItemIcon,
    VListItemTitle,
    VListItemContent
  }
}
</script>

<style>
@import '~simplemde/dist/simplemde.min.css';

.form-control-lg {
  width: 500px !important;
}

.reply-write-area {
  width: 700px;
  padding: 20px;
  background: #fafbfc;
  border: 1px solid #e3e7eb;
  border-radius: 4px;
}

.textarea {
  border: 1px solid #e3e7eb;
  padding: 16px 14px;
  background: #fff;
  font-size: 0;
  border-radius: 4px;
}

.bnts {
  /* align-items: right; */
  margin-left: 80%;
}

.reply-list-area {
  margin-top: 40px;
  border-top: 1px solid #e3e7eb;
}

li,ol,ul {
  list-style: none;
}

.board-wrap .status .column {
  height: auto;
  line-height: 20px;
  vertical-align: middle;
}

.name {
  padding-right: 0;
}
</style>
