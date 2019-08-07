<template>
  <section id="about" >
    <Title :title="category.name" :description="category.description" />
    <div class="section-content">
      <div class="container-fluid">
        <div class="portfolio-table controls">
          <ul class="breadcrumbs">
            <li class="filter" :class="{ active: isFiltered('이규진') }"
             @click="filter('이규진')">규진</li>
            <li class="filter" :class="{ active: isFiltered('문용성') }"
             @click="filter('문용성')">용성</li>
            <li class="filter" :class="{ active: isFiltered('신은정') }"
             @click="filter('신은정')">은정</li>
            <li class="filter" :class="{ active: isFiltered('윤관웅') }"
             @click="filter('윤관웅')">관웅</li>
          </ul>
        </div>
        <div class="row">
          <AnimateWhenVisible name="fadeLeft" class="col-12 col-md">
            <SkillChart :skills="aboutus[currentFilter].skills"></SkillChart>
          </AnimateWhenVisible>
          <Photo class="col-12 col-md text-center"/>
          <AnimateWhenVisible name="fadeRight" class="col-12 col-md">
            <PersonalInfo :aboutme="aboutus[currentFilter]" :userName="currentFilter"/>
          </AnimateWhenVisible>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { group } from '../utils';
import Title from './Title.vue';
import Photo from './Photo.vue';
import PersonalInfo from './PersonalInfo.vue';
import SkillChart from './SkillChart.vue';

export default {
  name: 'AboutMe',
  data() {
    return {
      currentFilter: '이규진',
    };
  },
  props: ['category', 'aboutus'],
  components: {
    Title,
    Photo,
    SkillChart,
    PersonalInfo,
  },
  computed: {
    groupedPosts() {
      return group(this.posts);
    },
    filteredUser() {
      return true;
      // return this.users.filter(element = > element.);
    },
  },
  methods: {
    isFiltered(name) {
      return this.currentFilter === name;
    },
    filter(name) {
      this.currentFilter = name;
    },
  },
};
</script>


<style scope lang="scss">
@import '@/style/css/variables.scss';

$bg-about-me: map-get($colors, dark);
$btn: map-get($colors, secondary) !default;

#about {
  background-color: lighten($bg-about-me, 84.6%);
  .col-12 {
    margin-top: 50px;
  }
}

.text-center {
  text-align: center;
}

@media(min-width: #{map-get($breakpoints, medium)}) {
  .section-content {
    width: 80%;
    margin: 0 auto;
  }
}

.breadcrumbs {
  text-align: center;

  li {
    display: inline-block;
    text-transform: uppercase;
    margin: 0 10px;
    color: lighten($bg-about-me, 60%);
    cursor: pointer;

    &.active {
      color: black;
      border-bottom: 1px solid $btn;
    }
  }
}

.portfolio-table {
  margin-bottom: 50px;
}

</style>
