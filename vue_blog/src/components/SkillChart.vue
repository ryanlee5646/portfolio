<template>
  <div class="skills">
    <ul class="lines">
      <li class="line l--0">
        <span class="line__label title">
          Skill level:
        </span>
      </li>
      <li class="line l--25">
        <span class="line__label">
          The basics
        </span>
      </li>
      <li class="line l--50">
        <span class="line__label">
          Advanced
        </span>
      </li>
      <li class="line l--75">
        <span class="line__label">
          Seasoned
        </span>
      </li>
      <li class="line l--100">
        <span class="line__label">
          Expert
        </span>
      </li>
    </ul>

    <div class="charts">
      <div :class="filteredClass">
        <div style="margin-bottom: 5px;">
          <span class="chart__title"
            :class="{active: isFiltered('development')}"
            @click="filtering('development')">development</span>
          <span class="chart__title"
            :class="{active: isFiltered('design')}"
            @click="filtering('design')">design</span>
          <span class="chart__title"
            :class="{active: isFiltered('productivity')}"
            @click="filtering('productivity')">productivity</span>
        </div>
        <ul class="chart--horiz">
          <template v-for="skill in skills[currentFilter]">
            <li class="chart__bar" :style="{ width: skill.level + '%' }" :key="skill.name">
              <span class="chart__label">
                {{skill.name}}
              </span>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillChart',
  data() {
    return {
      currentFilter: 'development',
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
    };
  },
  computed: {
    filteredClass() {
      return {
        chart: true,
        'chart--dev': this.currentFilter === 'development',
        'chart--design': this.currentFilter === 'design',
        'chart--prod': this.currentFilter === 'productivity',
      };
    },
  },
  methods: {
    convertPercentage(percentage) {
      return String.concat(percentage, '%');
    },
    isFiltered(target) {
      return this.currentFilter === target;
    },
    filtering(filter) {
      this.currentFilter = filter;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '@/style/css/variables.scss';
  $btn: map-get($colors, secondary) !default;

  .skills {
    height: 300px;
  }

  .lines {
    height: 100%;
    position: relative;
  }

  .line {
    height: inherit;
    width: 2px;
    position: absolute;
    background: rgba(238, 238, 238, 0.6);
  }
  .line.l--0 {
    left: 0;
  }
  .line.l--25 {
    left: 25%;
  }
  .line.l--50 {
    left: 50%;
  }
  .line.l--75 {
    left: 75%;
  }
  .line.l--100 {
    left: calc(100% - 1px);
  }

  .line__label {
    display: block;
    width: 100px;
    text-align: center;
    position: absolute;
    bottom: -20px;
    right: -50px;
  }
  .line__label.title {
    text-transform: uppercase;
    font-weight: bold;
  }

  .charts {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .chart {
    margin: 30px 0 0;
  }
  .chart:first-child {
    margin: 0;
  }

  .chart__title {
    margin: 0 10px 0 0;
    color: #777;
    font-weight: bold;
    font-size: 1.2em;
    opacity: 0;
    animation: 1s anim-lightspeed-in ease forwards;

    &.active {
      color: black;
      border-bottom: 1px solid $btn;
    }
  }


  .chart--horiz {
    overflow: hidden;
  }

  .chart__bar {
    height: 30px;
    margin-bottom: 10px;
    background: linear-gradient(to left, #4cb8c4, #3cd3ad);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    opacity: 0;
    animation: 1s anim-lightspeed-in ease forwards;
  }
  .chart--dev .chart__bar:nth-of-type(5) {
    animation-delay: 1.5s;
  }
  .chart--dev .chart__bar:nth-of-type(4) {
    animation-delay: 1.3s;
  }
  .chart--dev .chart__bar:nth-of-type(3) {
    animation-delay: 1.1s;
  }
  .chart--dev .chart__bar:nth-of-type(2) {
    animation-delay: 0.9s;
  }
  .chart--dev .chart__bar:nth-of-type(1) {
    animation-delay: 0.7s;
  }
  .chart--design .chart__bar:nth-of-type(5) {
    animation-delay: 1.5s;
  }
  .chart--design .chart__bar:nth-of-type(4) {
    animation-delay: 1.3s;
  }
  .chart--design .chart__bar:nth-of-type(3) {
    animation-delay: 1.1s;
  }
  .chart--design .chart__bar:nth-of-type(2) {
    animation-delay: 0.9s;
  }
  .chart--design .chart__bar:nth-of-type(1) {
    animation-delay: 0.7s;
  }
  .chart--prod .chart__bar:nth-of-type(5) {
    animation-delay: 1.5s;
  }
  .chart--prod .chart__bar:nth-of-type(4) {
    animation-delay: 1.3s;
  }
  .chart--prod .chart__bar:nth-of-type(3) {
    animation-delay: 1.1s;
  }
  .chart--prod .chart__bar:nth-of-type(2) {
    animation-delay: 0.9s;
  }
  .chart--prod .chart__bar:nth-of-type(1) {
    animation-delay: 0.7s;
  }


  .chart__label {
    padding-left: 10px;
    line-height: 30px;
    color: white;
  }

  @keyframes anim-lightspeed-in {
    0% {
      transform: translateX(-200%);
      opacity: 1;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
