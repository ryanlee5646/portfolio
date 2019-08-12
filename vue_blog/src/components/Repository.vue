<template>
    <v-layout wrap>
       <v-flex xs12 class="py-5" v-for="(team, index) in teams" :key="index">
        <v-flex class="px-5">
          <h1 class="repo-name">{{team.name}}</h1>
          
          <div class="repo-info">
            <span> &nbsp; {{userCommitNum[index]}} commits</span>
            <span>{{team.gitlabID}}</span>
          </div>
        </v-flex>
        <apexchart type=area height=160 :options="chartOptionsAreas[index]" :series="series[index]" />
      </v-flex> 
    </v-layout>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts';
    import GitlabService from '@/services/GitlabService';

    // The global window.Apex variable below can be used to set common options for all charts on the page
    Apex = {
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      toolbar: {
        tools: {
          selection: false
        }
      },
      markers: {
        size: 6,
        hover: {
          size: 10
        }
      },
      tooltip: {
        followCursor: false,
        theme: 'dark',
        x: {
          show: false
        },
        marker: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        }
      },
      grid: {
        clipMarkers: false
      },
      yaxis: {
        tickAmount: 2
      },
      xaxis: {
        type: 'datetime'
      },
    }

    export default({
      name: 'Repository',
      props: {
        gitlabToken: {type: String},
        teams: {type: Array}
      },
      components: {
        apexchart: VueApexCharts,
      },
      data() {
        return {
          series:[],
          userCommitNum:[],
          chartOptionsAreas:[],
        }
      },
      computed: {
        getChartOptions() {
          return this.chartOptionsArea;
        }
      },
      created() {
        console.log("[info] Repository Vue Created()");
        console.log(this.teams);
        console.log(this.gitlabToken);

        this.drawChart().then((max)=>{
            this.giveOptions(max);
        });
      },
      methods: {
        giveOptions(max){
          console.log(max);
          for(let i = 0; i < this.teams.length; ++i){
            this.chartOptionsAreas.push({chart:{id: i+1, group: 'commits'}, colors:[], yaxis:{min:0, max: max, labels: {minWidth: -1,maxWidth: 160,},}});
            this.chartOptionsAreas[i].colors.push("#"+Math.round(Math.random() * 0xffffff).toString(16));
          }
        },
        async drawChart(){

          const response  = await GitlabService.getProjectCommits('6096', '');

          // initialize series array
          for(let j = 0; j < this.teams.length; ++j){
            this.series.push([{data:[],}]);  
          }

          // initialize commit per time
          for(let i = response.data.length-1; i >= 0 ; --i){
              for(let j = 0; j < this.teams.length; ++j){
              var time = new Date(response.data[i].committed_date.split("T")[0].replace(/-/gi,"/")).getTime();
                // 중복체크
                let index = this.series[j][0].data.findIndex((date) =>{return (date[0] === time);});

                if(index == -1){
                  this.series[j][0].data.push([time, 0]);
                }
              }
           }

          // initialize user commit array
          this.userCommitNum = new Array(this.teams.length);
          for(let i = 0; i < this.userCommitNum.length; ++i){
            this.userCommitNum[i] = 0;
          }

          let maxCommits = 0;
          // input user commit history
          for(let i = response.data.length-1; i >= 0 ; --i){
            for(let j = 0; j < this.teams.length; ++j){
              if(response.data[i].committer_email === this.teams[j].gitlabID){
                var time = new Date(response.data[i].committed_date.split("T")[0].replace(/-/gi,"/")).getTime();
                let index = this.series[j][0].data.findIndex((date) =>{return (date[0] === time);});
                this.series[j][0].data[index][1] += 1;
                maxCommits = Math.max(maxCommits, this.series[j][0].data[index][1]);
                this.userCommitNum[j] += 1;
              }
            }
          }
          return maxCommits;
        },
      },
    })
  
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
  .repo-name{
    font-weight: bold;
  }
  .repo-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
</style>