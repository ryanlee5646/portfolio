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
          profile: '/img/lee.jpg',
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
          skills: {
            development: [{
              name: 'HTML5',
              level: 98,
            }, {
              name: 'Javascript',
              level: 60,
            }, {
              name: 'Vue',
              level: 65,
            }, {
              name: 'CSS3',
              level: 37,
            }, {
              name: 'C++',
              level: 55,
            }],
            design: [{
              name: 'Photoshop',
              level: 25,
            }, {
              name: 'Illustrator',
              level: 30,
            }, {
              name: 'UserExperience',
              level: 45,
            }],
            productivity: [{
              name: 'Git + Github, Bitbucket & Sourcetree',
              level: 70,
            }, {
              name: 'Microsoft Office',
              level: 55,
            }],
          },
        },
        문용성: {
          title: "I'm Developer",
          profile: '/img/moon.jpg',
          content: "<p>hI, I'm full-stack developer. I'm very positive. Thank you. :-)</p>",
          meta: {
            email: 'forever9882@gmail.com',
            skype: 'forever9882@gmail.com',
            phone: '010-9882-1627',
            city: 'Gumi, Repulic of Korea',
            font_awesome: [
              'fa-apple, #',
              'fa-android, #',
              'fa-facebook-square, #',
            ],
          },
          skills: {
            development: [{
              name: 'HTML5',
              level: 60,
            }, {
              name: 'Javascript',
              level: 70,
            }, {
              name: 'Vue',
              level: 75,
            }, {
              name: 'CSS3',
              level: 50,
            }, {
              name: 'Java',
              level: 85,
            }],
            design: [{
              name: 'Photoshop',
              level: 10,
            }, {
              name: 'Illustrator',
              level: 15,
            }, {
              name: 'UserExperience',
              level: 55,
            }],
            productivity: [{
              name: 'Git + Github, Bitbucket & Sourcetree',
              level: 70,
            }, {
              name: 'Microsoft Office',
              level: 75,
            }],
          },
        },
        신은정: {
          title: "I'm Developer",
          profile: '/img/shin.jpg',
          content: "<p>hI, I'm full-stack developer. I'm very positive. Thank you. :-)</p>",
          meta: {
            email: 'sej96226@gmail.com',
            skype: 'sej96226@gmail.com',
            phone: '010-9557-3622',
            city: 'Deagu, Repulic of Korea',
            font_awesome: [
              'fa-apple, #',
              'fa-android, #',
              'fa-facebook-square, #',
            ],
          },
          skills: {
            development: [{
              name: 'HTML5',
              level: 60,
            }, {
              name: 'Javascript',
              level: 50,
            }, {
              name: 'Vue',
              level: 70,
            }, {
              name: 'CSS3',
              level: 60,
            }, {
              name: 'Java',
              level: 85,
            }],
            design: [{
              name: 'Photoshop',
              level: 0,
            }, {
              name: 'Illustrator',
              level: 10,
            }, {
              name: 'UserExperience',
              level: 50,
            }],
            productivity: [{
              name: 'Git + Github, Bitbucket & Sourcetree',
              level: 70,
            }, {
              name: 'Microsoft Office',
              level: 75,
            }],
          },
        },
        윤관웅: {
          title: 'Super-duper humanity. Poor developement skills',
          profile: '/img/yoon.jpg',
          content: '<p>To be super developer, knuckle down programming to overcome own limitation. </p>',
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
          skills: {
            development: [{
              name: 'HTML5',
              level: 55,
            }, {
              name: 'Javascript',
              level: 45,
            }, {
              name: 'Vue',
              level: 50,
            }, {
              name: 'CSS3',
              level: 35,
            }, {
              name: 'Java',
              level: 60,
            }],
            design: [{
              name: 'Photoshop',
              level: 25,
            }, {
              name: 'Adobe Primere',
              level: 25,
            }],
            productivity: [{
              name: 'Github + Jira',
              level: 65,
            }, {
              name: 'Microsoft Office',
              level: 45,
            }],
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
