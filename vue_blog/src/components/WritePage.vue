<template>
<v-card id="create">
  <v-speed-dial v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :open-on-hover="hover"
   :transition="transition" style="position:fixed; bottom:18%; left:90%">
    <template v-slot:activator>
      <v-btn v-model="fab" fab small flat style="background:rgba(240,120,100,0.0);">
        <!-- <i class="fa fa-chevron-up notranslate arrow" style="background:rgba(240,120,100,0.0);"></i> -->
        <img src="https://image.flaticon.com/icons/svg/148/148876.svg" width="90%;" height="90%;"/>
        <!-- <v-icon class="notranslate" style="background:rgba(240,120,100,0.0)">close</v-icon> -->
      </v-btn>
    </template>

    <v-btn fab dark small style="background:rgba(240,120,100,0.0);">
      <a @click="reload()" href="/portfolio/write" class="lang-en-lang-select"  >
        <img src="https://image.flaticon.com/icons/svg/1967/1967169.svg" v-b-tooltip.hover title="Portfolio Write" alt="port" width="90%;" height="90%;" />
      </a>
    </v-btn>
    <v-btn fab dark small style="background:rgba(240,120,100,0.0);">
      <a @click="reload()" href="/post/write" class="lang-en-lang-select" >
        <img src="https://image.flaticon.com/icons/svg/1980/1980659.svg" v-b-tooltip.hover title="Post Write" alt="post" width="90%;" height="90%;" />
      </a>
    </v-btn>


  </v-speed-dial>
</v-card>
</template>

<script>
export default {
  name: "translate",
  data: () => ({
    direction: "top",
    fab: false,
    fling: true,
    hover: true,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    transition: "slide-y-transition"
  }),
  methods: {
    reload: function() {
      setTimeout(function() {
        window.location.reload(0.3);
      }, 600);
    }
  }
};
</script>
<style>
.arrow {
  left: 26% !important;
  font-size: 1.5em !important;
  padding-bottom: 10%;
}


</style>
