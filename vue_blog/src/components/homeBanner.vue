<template>
  <div class="banner">
    <div id="mainDiv">
        <div id="boxDiv">
            <div id="front"></div>
            <div id="back"></div>
            <div id="left"></div>
            <div id="right"></div>
            <div id="top"></div>
            <div id="bottom"></div>
        </div>
    </div>
  </div>
</template>


<script>

export default {

};
</script>

<style>

.banner {
  min-height: 700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.main-img {
  width: 100%;
  height: 500px;
}

#mainDiv {
    width: 400px;
    height: 400px;
    margin: 200px auto;
    perspective: 800px;
}

#boxDiv {
    width: 400px;
    transform-style: preserve-3d;
    animation: rotate 15s linear infinite;
}

#boxDiv div {
    position: absolute;
    width: 400px;
    height: 400px;
    opacity: 0.85;
    color: white;
}

#front {
    transform: translateZ(200px);
    background: black;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;

}


#back {
    transform: rotateY(180deg) translateZ(200px);
    background: #101010;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
}

#left {
    transform: rotateY(-90deg) translateX(-200px);
    transform-origin: left;
    background: black;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
}

#right {
    transform: rotateY(90deg) translateX(200px);
    transform-origin: right;
    background: #101010;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
}

#top {
    transform: rotateX(-90deg) translateY(-200px);
    transform-origin: top;
    background: black;
    background-image: url('/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
}

#bottom {
    transform: rotateX(90deg) translateY(200px);
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
