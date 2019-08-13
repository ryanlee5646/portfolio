<template>
  <div id="homeBanner" class="banner">
    <!-- Please typing your favorite word!-->
    <div class="slogun-wrapper">
      <div id="slogun">
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
        <div class="text">CREATIVITY HUMANITY CONFIDENCE</div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'HomeBanner'
};
</script>

<style lang="scss" scoped>

// Please change your favorite font-size!
$fontSize: 8vw;


.banner {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  overflow: hidden;
}


.slogun-wrapper {
  flex: 1;
  background: #222;
  // overflow: hidden;
  // display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  perspective: 800px;
  min-height: 500px;
  min-width: 500px;
  position: relative;
}

#slogun {
  .text {
    position: absolute;
    font-size: $fontSize;
    color: #fff;
    line-height: $fontSize * 1.2;
    opacity: 1;
    max-width: 50%;
    font-family: 'Anton', sans-serif;
    transform: translate(10%, 0%);
    mix-blend-mode: screen;

    @for $i from 0 through 100 {
      $key: $i + 1;
      &:nth-child(#{$key}) {
        $row: floor($i / 20);
        color: rgba(255 - $key * 2, 50 - $key / 2, $key * 3, 1);
        clip-path: polygon(
          floor($i / 2) * 10% - $row * 100% $row * 50%,
          floor($key / 2) * 10% - $row * 100% ceil($key % 2) * 50% + ($row * 50%),
          ceil($key / 2) * 10% - $row * 100% ($row + 1) * 50%
        );
        transform-origin: random(100) - 50 + floor($i / 2) * 10% - $row * 100%  random(100) - 50 + $row * 50%;
        animation: fly#{$key} 5000ms $i * 40ms cubic-bezier(0.360, 0.100, 0.160, 1.000) alternate;

        @keyframes fly#{$key} {
          $initX: random(1000) - 500;
          $initY: random(1000) - 500;
          $initZ: random(1000) - 500;
          $initDepth: random(3000) - 2500;
          0% {
            opacity: 0;
            transform: translate(10%, 0%) rotateX(#{$initX}deg) rotateY(#{$initY}deg) rotateZ(#{$initZ}deg) translateZ(#{$initDepth}px);
          }
          10% {
            opacity: 0;
            transform: translate(10%, 0%) rotateX(#{$initX}deg) rotateY(#{$initY}deg) rotateZ(#{$initZ}deg) translateZ(#{$initDepth}px);
          }
          90% {
            opacity: 1;
            transform: translate(10%, 0%) rotate(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0px);
          }
          100% {
            opacity: 1;
            transform: translate(10%, 0%) rotate(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0px);
          }
        }
      }
    }
  }
}

</style>
