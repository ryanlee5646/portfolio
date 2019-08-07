<template>
  <div>
    <AboutMe :category="categories[1]" :aboutus="aboutus"></AboutMe>
    <Portfolios :category="categories[0]" :portfolios="getPortfolios"></Portfolios>
    <Posts :category="categories[2]" :portfolios="getPortfolios"></Posts>
  </div>
</template>

<script>
import Portfolios from '../components/Portfolios.vue';
import Posts from '../components/Posts.vue';
import AboutMe from '../components/AboutMe.vue';

export default {
  data() {
    return {
      categories: [{
        name: 'Portfolio',
        description: 'I can show you the portfolios',
      },
      {
        name: 'Members',
        description: 'Look at this awesome personnnnn',
      },
      {
        name: 'Post',
        description: 'Draw your imagination',
      }],
      users: [{
        name: 'Kwanwoong Yoon',
      }],
      aboutus: {
        이규진: {
          title: 'Thie is secondary title',
          content: '<p>I have no idea of this paragraph. Indeed, i just type any words to fill out this whitespace. damnnnnn.</p>',
          meta: {
            email: 'dbsrhksdnd@gmail.com',
            skype: 'dbsrhksdnd@gmail.com',
            phone: '010-2414-0528',
            city: 'Gumi, Repulic of Korea',
            font_awesome: [
              'fa-apple, #',
              'fa-android, #',
              'fa-facebook-square, #',
            ],
          },
        },
      },
    };
  },
  components: {
    Portfolios,
    AboutMe,
    Posts,
  },
  computed: {
    getPortfolios() {
      return this.$store.state.portfolios;
    },
  },
};
</script>

<style>

</style>
