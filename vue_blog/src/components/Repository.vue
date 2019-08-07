<template>
  <div class="py-3">
    <v-layout wrap>
      <v-flex xs11 sm8>
        <h2 class="font-weight-regular yeonsung-font git-repository-url text-truncate"><a :href="url" class="hvr-grow hvr-icon-pulse">h2</a></h2>
        <p class="subheading mb-1 text--darken-1 font-weight-light"><span class="yeonsung-font">h2</span></p>
        <!-- <h2 class="font-weight-regular yeonsung-font git-repository-url text-truncate"><a :href="url" class="hvr-grow hvr-icon-pulse">{{repos.path_with_namespace}}</a></h2> -->
        <!-- <p class="subheading mb-1 text--darken-1 font-weight-light"><span class="yeonsung-font">{{repos.namespace.name}}</span></p> -->
      </v-flex>
      <v-flex xs1 sm1>
        <i class="fa fa-chevron-circle-right hvr-icon"></i>
      </v-flex>
    </v-layout>
    <v-layout>
          <v-flex class=" hidden-sm-and-down">
      <GChart
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
      />
    </v-flex>
    </v-layout>
  </div>
</template>

<script>
import GitlabService from '@/services/GitlabService'
import { GChart } from "vue-google-charts";

export default {
	name: 'Repository',
	props: {
		repos: {type: null}
  },
	data() {
		return {
      items: [],
      stats: {},
      chartData: [
        ["Name", "Commit"],
        ["2014", 1000],
        ["2015", 1170],
        ["2016", 660],
        ["2017", 1030]
      ],
      chartOptions:{
        chart: {
          title: "this proj commit",
          subtitle: "wowwwwwwww"
        }
      },
      url: '',
      featuresOpen: false
		}
  },
  components: {
    GChart
  },
  mounted() {
    //this.drawGraph()
    //this.drawStatGraph()
    //this.setURL()
    this.drawChart()
  },
	methods: {
    async drawChart(){
       const response  = await GitlabService.getProjectCommits('6096');
       console.log(response);
    },
    async drawGraph() {
      const response  = await GitlabService.getCommits('Z-zxsvCm5KuBNpbkSxjx', '7096')

      console.log("hihihihihihi"+JSON.stringify(response))
      for(var i = 0; i < response.data.length; i++){
          this.date = response.data[i].committed_date.substr(0,10);
          this.content = "["+response.data[i].committer_email+"] : " + response.data[i].message;
          this.items =  this.items.concat({'tag' : this.date, 'content' : this.content});
      }
    },
		async drawStatGraph() {
      const response  = await GitlabService.getCommits('Z-zxsvCm5KuBNpbkSxjx', '7096')
      for(var i = 0; i < response.data.length; i++){
          this.date = response.data[i].committed_date.substr(0,10);
          this.content = "["+response.data[i].committer_email+"] : " + response.data[i].message;
          this.items =  this.items.concat({'tag' : this.date, 'content' : this.content});
      }
    },
    setURL(){
      this.url = 'https://lab.ssafy.com/'+this.repos.path_with_namespace
    },
    toggleFeatures () {
      this.featuresOpen = !this.featuresOpen
    }
	}
}
</script>

<style>
  a:link { color: black; text-decoration: none;}
  a:visited { color: black; text-decoration: none;}
  a:hover { color: black !important; text-decoration: none !important;}

  .git-repository-url{
    font-size: 1.5em;
  }

  @media (min-width : 600px){
    .git-repository-url{
      font-size: 2vw;
    }
  }

  @media (min-width : 960px){
    .git-repository-url{
      font-size: 1.5em;
    }
  }
</style>