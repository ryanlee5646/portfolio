<template>
  <div>
    <h3>{{ aboutme.title }}</h3>
    <div v-html="aboutme.content"> </div>
    <h3 class="personal-header">{{ userName }}</h3>
    <div class="user-info email"><strong>E-mail:</strong> {{ aboutme.meta.email }}</div>
    <div class="user-info"><strong>Github: </strong> {{ aboutme.meta.skype }}</div>
    <div class="user-info"><strong>Position: </strong> {{ aboutme.meta.phone }}</div>
    <div class="user-info"><strong>Skills: </strong> {{ aboutme.meta.city }}</div>

    <Social :items="aboutme.meta.font_awesome"/>
  </div>
</template>

<script>
import Social from './Social.vue';

export default {
  name: 'PersonalInfo',
  props: ['aboutme', 'userName'],
  components: {
    Social,
  },
};
</script>

<style scoped lang="scss">
@import '@/style/css/variables.scss';

.user-info {
  margin-bottom: 10px;
}

.email {
  color: map-get($colors, primary);

  strong {
    color: lighten($text-color, 30%);
  }
}
</style>
