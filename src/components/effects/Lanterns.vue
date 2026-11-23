<script setup>
/** A few CSS-only lanterns; always present, including when WebGL is skipped. */
const lanterns = [
  { x: '6%', delay: '-2s', duration: '19s', scale: 0.8 },
  { x: '18%', delay: '-11s', duration: '23s', scale: 1.05 },
  { x: '31%', delay: '-6s', duration: '17s', scale: 0.65 },
  { x: '44%', delay: '-15s', duration: '25s', scale: 1.1 },
  { x: '56%', delay: '-9s', duration: '21s', scale: 0.75 },
  { x: '70%', delay: '-3s', duration: '18s', scale: 0.95 },
  { x: '82%', delay: '-13s', duration: '24s', scale: 0.7 },
  { x: '93%', delay: '-7s', duration: '20s', scale: 1 },
]
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div
      v-for="(lantern, index) in lanterns"
      :key="index"
      class="lantern-float absolute bottom-0"
      :style="{
        left: lantern.x,
        '--delay': lantern.delay,
        '--duration': lantern.duration,
        '--scale': lantern.scale,
      }"
    >
      <div class="lantern-glow"></div>
      <div class="lantern-body">
        <div class="lantern-flame"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lantern-float {
  animation: lantern-rise var(--duration) linear var(--delay) infinite;
  will-change: transform, opacity;
}

.lantern-glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 76px;
  height: 76px;
  margin: -38px 0 0 -38px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(240, 207, 122, 0.32), rgba(212, 165, 72, 0.08) 45%, transparent 70%);
}

.lantern-body {
  position: relative;
  width: 22px;
  height: 28px;
  border: 1px solid rgba(240, 207, 122, 0.9);
  border-radius: 5px 5px 8px 8px;
  background: linear-gradient(180deg, rgba(255, 230, 160, 0.9), rgba(212, 165, 72, 0.45));
  box-shadow: 0 0 14px rgba(240, 207, 122, 0.55);
  transform: scale(var(--scale));
}

.lantern-body::before {
  content: "";
  position: absolute;
  left: 3px;
  right: 3px;
  top: 4px;
  height: 1px;
  background: rgba(11, 16, 38, 0.35);
}

.lantern-flame {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 5px;
  height: 8px;
  margin: -4px 0 0 -2.5px;
  border-radius: 50%;
  background: #fff6d5;
  box-shadow: 0 0 10px 3px rgba(255, 224, 149, 0.85);
}
</style>
