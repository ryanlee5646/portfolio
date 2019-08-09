<template>
    <div id="wrapper">
      <div id="chart-line">
        <h1>윤관웅</h1>
        <apexchart type=line height=160 :options="chartOptionsLine1" :series="series1" />
      </div>

      <div id="chart-line2">
        <h1>신은정</h1>
        <apexchart type=line height=160 :options="chartOptionsLine2" :series="series2" />
      </div>

      <div id="chart-area">
        <h1>이규진</h1>
        <apexchart type=area height=160 :options="chartOptionsArea" :series="series3" />
      </div>
      <div id="chart-area">
        <h1>문용성</h1>
        <apexchart type=area height=160 :options="chartOptionsArea" :series="series4" />
      </div>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts';
    import GitlabService from '@/services/GitlabService';
    function generateDayWiseTimeSeries(baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
      }
      return series;
    }

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
          series1: [{
          data: [],
        }],
        series2: [{
          data: [],
        }],
        series3: [{
          data: [],
        }],
        series4: [{
          data: [],
        }],
        chartOptionsLine1: {
          chart: {
            id: 'fb',
            group: 'social',
          },
          colors: ['#008FFB'],
          yaxis: {
            min: 0,
            max: 6,
          }
        },
        chartOptionsLine2: {
          chart: {
            id: 'tw',
            group: 'social',
          },
          colors: ['#546E7A'],
          yaxis: {
            min: 0,
            max: 6,
          }

        },
        chartOptionsArea: {
          chart: {
            id: 'yt',
            group: 'social',
          },
          colors: ['#00E396'],
          yaxis: {
            min: 0,
            max: 6,
          }

        }
        }
      },
      mounted() {
        this.drawChart()
      },
      methods: {
        async drawChart(){
          const response  = await GitlabService.getProjectCommits('6096', '');
           for(let i = response.data.length-1; i >= 0 ; --i){
             var time = new Date(response.data[i].committed_date.split("T")[0].replace(/-/gi,"/")).getTime();
              // 중복체크
              let index = this.series1[0].data.findIndex((date) =>{return (date[0] === time);});

              if(index == -1){
                this.series1[0].data.push([time, 0]);
                this.series2[0].data.push([time, 0]);
                this.series3[0].data.push([time, 0]);
                this.series4[0].data.push([time, 0]);
              }
           }
          for(let i = response.data.length-1; i >= 0 ; --i){
            if(response.data[i].committer_email === 'forever9882@gmail.com'){
              var time = new Date(response.data[i].committed_date.split("T")[0].replace(/-/gi,"/")).getTime();
              let index = this.series4[0].data.findIndex((date) =>{return (date[0] === time);});
              this.series4[0].data[index][1] += 1;
            }
            else if(response.data[i].committer_email === 'ryanlee5646@gmail.com'){
              var time = new Date(response.data[i].committed_date.split("T")[0].replace(/-/gi,"/")).getTime();
              let index = this.series3[0].data.findIndex((date) =>{return (date[0] === time);});
              this.series3[0].data[index][1] += 1;
            }
            else if(response.data[i].committer_email === 'sej96226@gmail.com'){
              var time = new Date(response.data[i].committed_date.split("T")[0].replace(/-/gi,"/")).getTime();
              let index = this.series2[0].data.findIndex((date) =>{return (date[0] === time);});
              this.series2[0].data[index][1] += 1;
            }
            else if(response.data[i].committer_email === 'dbsrhksdnd@gmail.com'){
              var time = new Date(response.data[i].committed_date.split("T")[0].replace(/-/gi,"/")).getTime();
              let index = this.series1[0].data.findIndex((date) =>{return (date[0] === time);});
              this.series1[0].data[index][1] += 1;
            }
          }
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
</style>