<!--포트폴리오 페이지 부분 포트폴리오 카드 리스트를 출력해줌(Portfolio.vue를 for문으로 랜더링해줌)-->
<template>
<section id="post" class="my-portfolio position">
  <Title title=" Post Table 📄" description="자유롭게 작성해주세요 :)" />
  <!-- <table >
            <tr>
              <th>Content</th>
              <th>NickName</th>
              <th>Views</th>
            </tr>
            <tr v-for="(p, index) in this.posts" :key="p.created_at" :uid="p.uid" >
              <td><a @click="routePath(p.uid)" >{{p.post.title}}</a></td>
              <td>{{p.post.userID}}</td>
              <td>{{p.views}}</td>
            </tr>
          </table> -->
  <AnimateWhenVisible name="fadeLeft" class="col-12 col-md">
    <div id="app" class="grid bigEntrance">
      <table>
        <thead>
          <tr>
            <th @click="sortBy('title')"> Title </th>
            <th @click="sortBy('userID')"> UserID </th>
            <th @click="sortBy('views')"> views </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in this.sortedPosts" :uid="p.uid">
            <td><a @click="routePath(p.uid)">{{p.post.title}}</a></td>
            <td>{{p.post.userID | capitalize}}</td>
            <td>{{p.views | capitalize}}</td>
          </tr>
        </tbody>
      </table>

      <div class="controls">
        <button class="btn btn-sm" :disabled="!hasPage(-1)" @click="prevPage">←</button>
        <button class="btn btn-sm" :disabled="!hasPage(1)" @click="nextPage">→</button>
        <select class="selectPage" v-model="pageSizeModel">
          <option value="3">3</option>
          <option value="5">6</option>
          <option value="10">9</option>
        </select>
      </div>
    </div>
  </AnimateWhenVisible>
  <!--  -->

</section>
</template>
<script>
import $ from 'jquery';
import FirebaseService from '@/services/FirebaseService';
import Title from './Title.vue';

export default {
  name: 'PostList',
  data() {
    return {
      loaded: true,
      currentFilter: 'all',

      //
      sort: 'title',
      sortDir: 'asc',
      page: 0,
      pageSize: 3,
      posts: [],
    };
  },
  props: {
    limits: {
      type: Number,
      default: 8
    },
    loadMore: {
      type: Boolean,
      default: false
    },
    column: {
      type: Number,
      default: 1
    },
    // posts: { type: Array },
    // category: { type: Object },
  },
  components: {
    Title,
  },
  mounted() {
    console.log("Post.vue  mounted");
    this.$store.watch(() => this.$store.state.posts, posts => {
      console.log("posts change");
      this.posts = posts;
    })
  },
  async created() {
    this.posts = await FirebaseService.getPosts();
    this.$store.commit('updatePosts', this.posts);
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
    routePath(uid) {
      console.log(uid + " routePath 넘어옴?");
      this.$router.push({
        path: '/post/view/' + uid
      });
    },

    sortBy(s) {
      console.log("sortBy" + "IN!@!");
      if (s === this.sort) {
        this.sortDir = (this.sortDir === 'asc') ? 'desc' : 'asc';
      } else {
        this.sortDir = 'asc';
      }
      this.sort = s;
    },

    isActiveSort(s) {
      return this.sort === s;
    },
    hasPage(dir) {
      if (dir === -1 && (this.page > 0)) return true;
      if (dir === 1 && (((this.page + 1) * this.pageSize) < this.posts.length)) return true;
      return false;
    },
    prevPage() {
      if (this.hasPage(-1)) this.page--;
    },
    nextPage() {
      if (this.hasPage(1)) this.page++;
    }
  },

  computed: {
    sortedPosts() {
      return this.posts.sort((a, b) => {
        let dir = (this.sortDir === 'asc') ? 1 : -1;
        if (a[this.sort] < b[this.sort]) {
          return -1 * dir;
        } else if (a[this.sort] > b[this.sort]) {
          return 1 * dir;
        } else {
          return 0;
        }
      }).filter((row, idx) => {
        let s = this.page * this.pageSize;
        let e = (this.page + 1) * this.pageSize;
        return (idx >= s && idx < e);
      });
    },
    pageSizeModel: {
      get() {
        return this.pageSize;
      },
      set(v) {
        this.pageSize = v;
        this.page = 0;
      }
    }
  },
  filters: {
    capitalize(v) {
      if (!v) return ''
      v = v.toString()
      return v.charAt(0).toUpperCase() + v.slice(1)
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/style/css/variables.scss';

$bg-post: map-get($colors, dark) !default;
$btn: map-get($colors, secondary) !default;

.my-portfolio {
    background-color: lighten($bg-post, 84.6%);
    // color: map-get($colors, light);
}

.breadcrumbs {
    text-align: center;

    li {
        display: inline-block;
        text-transform: uppercase;
        margin: 0 10px;
        color: lighten($bg-post, 60%);
        cursor: pointer;

        &.active {
            // color: map-get($colors, light);
            border-bottom: 1px solid $btn;
        }
    }
}

.portfolio-item {
    width: 300px;
    max-height: 250px;
    overflow: hidden;
    margin-bottom: 20px;
}

.section-content {
    // width: 100%;
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
    transition: all 0.5s ease-out;

    &:hover {
        opacity: 1;
        padding-top: 30%;
    }

    a {
        background-color: transparent;
        border: 1px solid $btn;
        padding: 10px 35px;
        font-weight: 600;
        font-size: 3rem;
        display: inline-block;
        transition: all 0.5s sceal-out;

        &:hover {
            color: lighten($btn, 30%);
        }
    }
}

// table
table {
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 1vw;
}

tr:hover {
    background-color: #f5f5f5;
}

.selectPage {
    // width : 10% !important;
    min-width: 10% !important;
    width: 0 !important;
    min-width: 10% !important;
    max-width: 0 !important;
    min-height: 4rem !important;
    // font: inherit;
    // font-size: 1.6rem;

}
b {
    font-weight: bold;
}
p {
    margin: 0;
    line-height: 2.0;
}
// hr {
//   width: 75%;
//   margin: 4rem auto;
//   border: 0;
//   border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
// }

form {
    width: 100%;
}
label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}
input,
select {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    min-height: 4rem;
    margin: 0 0 1rem;
    padding: 1rem;
    font: inherit;
    font-size: 1.6rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    &::placeholder {
        color: rgba(0, 0, 0, 0.4);
    }
}

table {
    width: 100%;
    margin: 0 0 2rem;
    border-spacing: 0;

    td,
    th {
        border-bottom: 0.1rem solid rgba(0, 0, 0, 0.05);
    }
    th {
        padding: 2.0rem 1.0rem;
        text-align: left;
        cursor: pointer;
        user-select: none;
        transition: all 0.3s ease;
        &.sorted {
            color: #f04;
        }
    }
    td {
        padding: 0.5rem 1.0rem;
        transition: all 0.3s ease;
    }
    tr:hover td {
        background: rgba(0, 0, 0, 0.03);
    }
}

.controls {
    width: 100%;
    text-align: center;
}

.btn {
    display: block;
    width: 100%;
    margin: 2rem 0;
    padding: 1rem 2rem;
    color: #111;
    background: transparent;
    border: 0.1rem solid #111;
    outline: 0;
    border-radius: 0.3rem;

    font: inherit;
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    user-select: none;

    transition: all 0.25s ease;

    &.btn-sm {
        display: inline-block;
        width: 10rem;
        margin: 1rem;
    }
    &:visited {
        color: #111;
    }
    &:disabled,
    &:disabled:hover {
        color: rgba(0, 0, 0, 0.1);
        border: 0.1rem solid rgba(0, 0, 0, 0.1);
        cursor: initial;
    }
    &:focus,
    &:hover {
        border: 0.1rem solid #f04;
        color: #f04;
    }
}

.grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#app {
    // width: 90rem;
    width: 90%;
    margin: 4rem auto;
    padding: 4rem;
    border-radius: 0.3rem;
    background: #fff;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.10), 0 0 3rem rgba(0, 0, 0, 0.03);
}

@media only screen and (max-width: 50.0rem) {
    hr {
        width: 100%;
    }
    #app {
        width: 90%;
        padding: 4rem 2rem;
    }
    .btn.btn-sm {
        width: 40%;
        margin: 3%;
    }
}

//
.bigEntrance {
    animation-name: bigEntrance;
    -webkit-animation-name: bigEntrance;

    animation-duration: 1.0s;
    -webkit-animation-duration: 1.0s;

    animation-timing-function: ease-out;
    -webkit-animation-timing-function: ease-out;

    visibility: visible !important;
}

@keyframes bigEntrance {
    0% {
        transform: scale(0.3) rotate(6deg) translateX(-30%) translateY(30%);
        opacity: 0.2;
    }
    30% {
        transform: scale(1.03) rotate(-2deg) translateX(2%) translateY(-2%);
        opacity: 1;
    }
    45% {
        transform: scale(0.98) rotate(1deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
    60% {
        transform: scale(1.01) rotate(-1deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
    75% {
        transform: scale(0.99) rotate(1deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
    90% {
        transform: scale(1.01) rotate(0deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
    100% {
        transform: scale(1) rotate(0deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
}

@-webkit-keyframes bigEntrance {
    0% {
        -webkit-transform: scale(0.3) rotate(6deg) translateX(-30%) translateY(30%);
        opacity: 0.2;
    }
    30% {
        -webkit-transform: scale(1.03) rotate(-2deg) translateX(2%) translateY(-2%);
        opacity: 1;
    }
    45% {
        -webkit-transform: scale(0.98) rotate(1deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
    60% {
        -webkit-transform: scale(1.01) rotate(-1deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
    75% {
        -webkit-transform: scale(0.99) rotate(1deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
    90% {
        -webkit-transform: scale(1.01) rotate(0deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
    100% {
        -webkit-transform: scale(1) rotate(0deg) translateX(0%) translateY(0%);
        opacity: 1;
    }
}
</style>
