<template>
  <v-container justify-center py-5>
    <v-layout justify-center>
      <v-flex xs8 class="notranslate text-xs-center">
        <h2>{{getPortfolios.title}}</h2>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs8 class="notranslate text-xs-center">
        <div class="editor" v-html="compiledMarkdown"></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import marked from 'marked';

export default {
  props: {
    id: { type: String, default: '-1' },
  },
  computed: {
    getPortfolios() {
      return (this.id === '-1') ? [] : this.$store.state.portfolios[parseInt(this.id)].portfolio;
    },
    compiledMarkdown() {
      return marked(this.getPortfolios.content, { sanitize: true });
    },
  },
  mounted() {
    console.log(this.getPortfolios);
  },
};
</script>

<style>
  .editor{
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  img[alt=image]{
    width: 300px;
    height: 300px;
  }
</style>
