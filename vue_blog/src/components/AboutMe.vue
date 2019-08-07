<template>
  <section id="about">
    <Title :title="category.name" :description="category.description" />
    <div class="section-content">
      <div class="container-fluid">
        <div class="row">
          <AnimateWhenVisible name="fadeLeft" class="col-12 col-md">
            <Description :post="groupedPosts[user.name]['few-words-about-me']"/>
          </AnimateWhenVisible>
          <Photo class="col-12 col-md text-center"/>
          <AnimateWhenVisible name="fadeRight" class="col-12 col-md">
            <PersonalInfo :post="groupedPosts[user.name]['personal-information']" :userName="user.name"/>
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
import Description from './Description.vue';

export default {
  name: 'AboutMe',
  props: ['category', 'posts', 'user'],
  components: {
    Title,
    Photo,
    Description,
    PersonalInfo
  },
  computed: {
    groupedPosts() {
      return group(this.posts)
    },
  }
}
</script>


<style scope lang="scss">
@import '@/style/css/variables.scss';

$bg-about-me: map-get($colors, dark);

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

</style>
