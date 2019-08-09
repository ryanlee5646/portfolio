<template>
  <div id="mainDiv" @click="siteMove('/#toolbar')">
      <div id="boxDiv">
          <div id="front"></div>
          <div id="back"></div>
          <div id="left"></div>
          <div id="right"></div>
          <div id="top"></div>
          <div id="bottom"></div>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    siteMove(target) {
      this.$router.push({ path: target });
    },
  },
};
</script>

<style>


#mainDiv {
    width: 50px;
    height: 50px;
    margin:  20px;
    perspective: 200px;
    position: fixed;
    left: 15px;
    z-index: 100;
}

#boxDiv {
    width: 50px;
    transform-style: preserve-3d;
    animation: rotate 15s linear infinite;
}

#boxDiv div {
    position: absolute;
    width: 50px;
    height: 50px;
    opacity: 1;
    color: white;
}

#front {
    transform: translateZ(25px);
    background: black;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;

}


#back {
    transform: rotateY(180deg) translateZ(25px);
    background: #101010;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
}

#left {
    transform: rotateY(-90deg) translateX(-25px);
    transform-origin: left;
    background: black;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
}

#right {
    transform: rotateY(90deg) translateX(25px);
    transform-origin: right;
    background: #101010;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
}

#top {
    transform: rotateX(-90deg) translateY(-25px);
    transform-origin: top;
    background: black;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
}

#bottom {
    transform: rotateX(90deg) translateY(25px);
    transform-origin: bottom;
    background: #101010;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
}

@keyframes rotate {
    0% { transform: rotateY(0); }
    100% { transform: rotateY(360deg); }
}
</style>
