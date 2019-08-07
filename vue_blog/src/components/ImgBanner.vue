<!--메인 페이지가 아닌 배너 이미지 (포트폴리오 페이지)-->
<template>
  <div>
    <v-img :src="imgSrc"
           aspect-ratio="1.7">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light dohyeon-font">
            <slot name="text"/>
          </span>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>


<script>

export default {
  name: 'ImgBanner',
  props: {
    imgSrc: { type: String },
    text: { type: String },
  },
  methods: {
  },
};
</script>
<style>
  .text-shadow {
    text-shadow: 0 0 15px rgb(255,255,255);
  }
</style>
