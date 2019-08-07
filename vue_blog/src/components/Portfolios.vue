<!--포트폴리오 페이지 부분 포트폴리오 카드 리스트를 출력해줌(Portfolio.vue를 for문으로 랜더링해줌)-->
<template>
  <section id="portfolio" class="my-portfolio position">
      <Title :title="category.name" :description="category.description"/>
      <div class="section-content">
        <div class="portfolio-table controls">
          <ul class="breadcrumbs">
            <li class="filter" :class="{ active: isFiltered('all') }"
             @click="filter('all')">All</li>
            <li class="filter" :class="{ active: isFiltered('문용성') }"
             @click="filter('문용성')">용성</li>
            <li class="filter" :class="{ active: isFiltered('신은정') }"
             @click="filter('신은정')">은정</li>
            <li class="filter" :class="{ active: isFiltered('윤관웅') }"
             @click="filter('윤관웅')">관웅</li>
             <li class="filter" :class="{ active: isFiltered('이규진') }"
              @click="filter('이규진')">규진</li>
          </ul>
        </div>
        <transition-group name="filter" tag="div" class="row justify-content-center">
          <div class="col-md-4 col-lg-auto portfolio-item"
          v-for="index in filteredPosts.length > limits ? limits : filteredPosts.length"
           :key="filteredPosts[index-1].created_at" :uid="filteredPosts[index-1].uid" :idx="index-1">
            <img :src="filteredPosts[index-1].portfolio.thumbnail" alt="Alt" style="width : 100%; height: 100%;"/>
            <div class="portfolio-link">
              <!-- <a>{{post.uid}}</a> -->
              <a @click="routePath(filteredPosts[index-1].uid)" class="popup_content"  target="_blank">See</a>
              <!-- <a href="/portfolio/view/acrKqb3TuKTJz9h4Dnkp"  class="popup_content" target="_blank">Detail</a> -->
            </div>
          </div>
        </transition-group>
        <div style="height: 25px;">
        </div>
        <div v-show="!loaded">
          <v-progress-circular
            :width="5"
            color="blue"
            indeterminate
            size="100"
            style="left: 50%; transform: translateX(-30%); margin-bottom: 50px;"
            ></v-progress-circular>
        </div>
        <div v-if="loadMore">
          <v-icon id="expand-icon" @click="loadMorePortfolios()" size="30" class="mr-2">
            expand_more
          </v-icon>
        </div>
      </div>
    </section>
</template>
<script>
import $ from 'jquery';
// import FirebaseService from '@/services/FirebaseService';
import Title from './Title.vue';

export default {
  name: 'PortfoliosList',
  data() {
    return {
      loaded: true,
      currentFilter: 'all',
    };
  },
  props: {
    limits: { type: Number, default: 6 },
    loadMore: { type: Boolean, default: true },
    column: { type: Number, default: 1 },
    portfolios: { type: Array },
    category: { type: Object },
  },
  components: {
    Title,
  },
  mounted() {
    console.log(this.filteredPosts.length);
    // $(() => {
    //   const Page = ((() => {
    //     const $navArrows = $('#nav-arrows').hide();
    //     const $shadow = $('#shadow').hide();
    //     const slicebox = $('#sb-slider').slicebox({
    //       onReady() {
    //         $navArrows.show();
    //         $shadow.show();
    //       },
    //       orientation: 'r',
    //       cuboidsRandom: true,
    //       disperseFactor: 30,
    //     });
    //     const initEvents = () => {
    //       // add navigation events
    //       $navArrows.children(':first').on('click', () => {
    //         slicebox.next();
    //         return false;
    //       });
    //       $navArrows.children(':last').on('click', () => {
    //         slicebox.previous();
    //         return false;
    //       });
    //     };
    //     const init = () => {
    //       initEvents();
    //     };
    //     return { init };
    //   })());
    //   Page.init();
    // });
    //
    // console.log("app mounted");
    // this.$store.watch(() => this.$store.state.portfolios, portfolios => { console.log(""); this.portfolios = portfolios; })
  },
  methods: {
    // 더보기 클릭했을 때 실행되는 함수
    loadMorePortfolios() {
      this.loaded = false;
      setTimeout(() => {
        this.limits += 2;
        this.loaded = true;
      }, 1000);
    },
    isFiltered(name) {
      return this.currentFilter === name;
    },
    filter(name) {
      this.currentFilter = name;
    },
    routePath(uid){
      console.log(uid + " routePath 넘어옴?");
      this.$router.push({path: '/portfolio/view/' + uid })
    },
  },
  computed: {
    filteredPosts() {
      if (this.currentFilter === 'all') {
        return this.portfolios;
      }
      return this.portfolios.filter(portfolio => portfolio.portfolio.teams && portfolio.portfolio.teams.includes(this.currentFilter));
    },
  },
};
</script>
<style scoped lang="scss">
  @import '@/style/css/variables.scss';

  $bg-portfolio: map-get($colors, dark) !default;
  $btn: map-get($colors, secondary) !default;

  .filter-enter-active, .filter-leave-active, .filter-move {
    transition: all 1s;
  }
  .filter-enter, .filter-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .filter-leave-active {
    position: absolute;
  }


  .my-portfolio {
    background-color: $bg-portfolio;
    color: map-get($colors, light);
  }

  /deep/ .text-wrapper {
    &:after {
      border-bottom: 1px solid map-get($colors, light);
    }
  }

  .breadcrumbs {
    text-align: center;

    li {
      display: inline-block;
      text-transform: uppercase;
      margin: 0 10px;
      color: lighten($bg-portfolio, 60%);
      cursor: pointer;

      &.active {
        color: map-get($colors, light);
        border-bottom: 1px solid $btn;
      }
    }
  }

  .portfolio-table {
    margin-bottom: 50px;
  }

  .portfolio-item {
    width: 300px;
    max-height: 250px;
    overflow: hidden;
    margin-bottom: 20px;

    img {
      width: 100%;
    }
  }

  .portfolio-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    text-align: center;
    padding-top: 60%;
    opacity: 0;
    transition: all .5s ease-out;

    &:hover {
      opacity: 1;
      padding-top: 30%;
    }

    a {
      background-color: transparent;
      border: 1px solid $btn;
      padding: 10px 35px;
      font-weight: 600;
      font-size: 2rem;
      display: inline-block;
      transition: all 0.5s sceal-out;

      &:hover {
        color: lighten($btn, 30%);
      }
    }
  }

#expand-icon{
  position: relative;
  border-radius: 25px;
  background-color: #fafafa;
  left: 50%;
}
// #expand-icon::after{
//   content: '';
//   position: absolute;
//   z-index: -1;
// }

@-webkit-keyframes expanding-light{
  from{
    box-shadow: 1px 1px 1px rgba(255,197,0, 0);
  }
  to{
    box-shadow: 5px 10px 30px rgba(255,197,0, 0.3);
  }
}

@keyframes expanding-light{
  from{
    box-shadow: 1px 1px 1px rgba(255,197,0, 0);
  }
  to{
    box-shadow: 5px 10px 30px rgba(255,197,0, 0.3);
  }
}

@-webkit-keyframes expanding{
  from {
    top: 0px;
    border-color: rgba(255,197,0,0);
    box-shadow: 0px 0px 0px rgba(255,197,0, 0);
  }
  to{
    top : 10px;
    border-color: rgba(255,197,0,0.5);
    box-shadow: 1px 2px 4px rgba(255,197,0, 0.5);
  }
}

@keyframes expanding{
  from {
    top: 0px;
    border-color: rgba(255,197,0,0);
    box-shadow: 0px 0px 0px rgba(255,197,0, 0);
  }
  to{
    top : 10px;
    border-color: rgba(255,197,0,0.5);
    box-shadow: 1px 2px 4px rgba(255,197,0, 0.5);
  }
}

@keyframes emptyanimation{  }

  #expand-icon:hover{
    -webkit-animation-name : expanding;
    -webkit-animation-duration: 1s;
    animation-name: expanding;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }

  #expand-icon::after:hover{
    -webkit-animation-name: expanding-light;
    -webkit-animation-duration: 1s;
    animation-name: expanding-light;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }

</style>
