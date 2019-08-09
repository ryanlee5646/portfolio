<template>
<div id="portfolioWriter">
  <v-layout justify-center pt-5>
    <v-flex xs12 sm5 md4>
      <v-text-field label="제목" v-model="portfolio.title">
      </v-text-field>
    </v-flex>
  </v-layout>

  <v-layout justify-center pt-5>
    <v-flex xs12 sm5 md4>
      <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="items"
      :search-input.sync="search"
      hide-selected
      label="프로젝트 참여 인원"
      multiple
      small-chips
      :auto-select-first="focus"
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">No matches found</span>
        </v-list-item>
      </template>
      
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.name }}
          </span>
          <v-icon
            small
            @click="parent.selectItem(item)"
          >close</v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
          <v-list-item-avatar>
            <v-img :src="item.img"></v-img>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title v-text="item.name" style="font-size:16px; font-weight:bold;"></v-list-item-title>
            <v-list-item-subtitle v-text="item.ID" style="font-size:12px;"></v-list-item-subtitle>
          </v-list-item-content>
      </template>
    </v-combobox>
      
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
    <v-flex xs12 sm3 md2>
      <v-btn to="/" block text>뒤로</v-btn>
    </v-flex>
  </v-layout>
  <br>

</div>
</template>


<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor';
import ImageComponent from '../components/ImageComponent.vue';
import FirebaseService from '@/services/FirebaseService';
import store from '../store';

export default {
  
  name: 'portfoliowrite',
  store,
  data() {
    return {
      portfolios : [],
      portfolio: {
        userID: this.$store.state.user.email, //this.$store.state.user
        nickName : this.$store.state.user.nickName,
        startdate: "",
        enddate: "",
        sdate: "",
        edate: "",
        title: "",
        content: "",
        teams: [],
        views : 0,
        // portfolioCnt: this.$store.state.user.portfolioCount,
        // postCnt: this.$store.state.user.postCount,
      },
    activator: null,
    index: -1,
    items: [
      { header: 'Select an User' },
    ],
    nonce: 1,
    menu: false,
    model: [],
    x: 0,
    search: null,
    y: 0,
    focus: true,
    } 
  },
  mounted(){
    this.getMemberUser();
  },
  methods: {
    async getMemberUser(){
      const result = await FirebaseService.getMemberUser();
      result.forEach(user => {
          this.items.push({img: user.photoURL, name: user.name, ID: `@${user.nickName}`, text: `${user.name} ${user.nickName}`, gitlabID: user.gitlabID});
      });
    },
    async PortfolioWriter() {
      // console.log(this.$store.state.user.mail + " 카운트??");
      this.model.forEach((user)=>{
        this.portfolio.teams.push(user);
      })
      const result = await FirebaseService.PortfolioWriter(this.portfolio);
      this.portfolios = await FirebaseService.getPortfolios();
      this.$store.commit('updatePortfolios', this.portfolios );
      this.$router.push('/');
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''
      const text = hasValue(itemText)
      const query = hasValue(queryText)
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
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

.position {
  z-index: 9999;
}
</style>
