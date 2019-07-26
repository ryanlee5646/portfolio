<!--포트폴리오 페이지 부분 포트폴리오 카드 리스트를 출력해줌(Portfolio.vue를 for문으로 랜더링해줌)-->
<template>
  <section id="portfolio" class="my-portfolio position">
      <Title :title="category.name" :description="category.description"/>
      <a href="/portfolio/write" > write </a>
      <div class="section-content">
        <div class="portfolio-table controls">
          <ul class="breadcrumbs">
            <li class="filter" :class="{ active: isFiltered('all') }"
             @click="filter('all')">All work</li>
            <li class="filter" :class="{ active: isFiltered('blog') }"
             @click="filter('blog')">Blogs</li>
            <li class="filter" :class="{ active: isFiltered('shop') }"
             @click="filter('shop')">Internet Shop</li>
            <li class="filter" :class="{ active: isFiltered('landing') }"
             @click="filter('landing')">Landing Page</li>
          </ul>
        </div>

        <transition-group name="filter" tag="div" class="row justify-content-center">
          <div class="col-md-4 col-lg-auto portfolio-item" v-for="(post, index) in filteredPosts"
           :key="post.created_at" :uid="post.uid" :idx="index">
            <img :src="post.portfolio.thumbnail" alt="Alt" style="width : 100%; height: 100%;"/>
            <div class="portfolio-link">
              <a>{{post.uid}}</a>
              <a>{{index}}</a>
              <!-- <a @click="routePath(post.uid)">seedeeee</a> -->
              <a href="/portfolio/view/acrKqb3TuKTJz9h4Dnkp"  class="popup_content" target="_blank">See</a>
            </div>
          </div>
        </transition-group>
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
    limits: { type: Number, default: 8 },
    loadMore: { type: Boolean, default: false },
    column: { type: Number, default: 1 },
    portfolios: { type: Array },
    category: { type: Object },
  },
  components: {
    Title,
  },
  mounted() {
    $(() => {
      const Page = ((() => {
        const $navArrows = $('#nav-arrows').hide();
        const $shadow = $('#shadow').hide();
        const slicebox = $('#sb-slider').slicebox({
          onReady() {
            $navArrows.show();
            $shadow.show();
          },
          orientation: 'r',
          cuboidsRandom: true,
          disperseFactor: 30,
        });
        const initEvents = () => {
          // add navigation events
          $navArrows.children(':first').on('click', () => {
            slicebox.next();
            return false;
          });
          $navArrows.children(':last').on('click', () => {
            slicebox.previous();
            return false;
          });
        };
        const init = () => {
          initEvents();
        };
        return { init };
      })());
      Page.init();
    });
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
      console.log(uid + " 넘어옴?");
      this.$router.push({path: '/portfolio/view/acrKqb3TuKTJz9h4Dnkp ' })
    },
  },
  computed: {
    filteredPosts() {
      if (this.currentFilter === 'all') {
        return this.portfolios;
      }
      return this.posts.filter(post => post.tags && post.tags.includes(this.currentFilter));
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
</style>
