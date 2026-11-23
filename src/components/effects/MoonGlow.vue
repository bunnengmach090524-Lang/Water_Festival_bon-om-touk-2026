<template>
  <!-- Decorative CSS-only moon and starfield (no WebGL, no images). -->
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="starfield absolute inset-0"></div>
    <div class="moon-drift absolute left-[58%] top-[8%] h-40 w-40 sm:left-[62%] sm:h-56 sm:w-56 lg:h-72 lg:w-72">
      <div class="moon-halo absolute -inset-[65%] rounded-full"></div>
      <div class="moon-core absolute inset-0 rounded-full"></div>
      <div class="moon-shadow absolute inset-0 rounded-full"></div>
    </div>
  </div>
</template>

<style scoped>
.starfield {
  background-image:
    radial-gradient(circle, rgba(246, 239, 224, 0.85) 1px, transparent 1.6px),
    radial-gradient(circle, rgba(240, 207, 122, 0.7) 1px, transparent 1.6px),
    radial-gradient(circle, rgba(246, 239, 224, 0.55) 1px, transparent 1.6px);
  background-size: 173px 149px, 257px 211px, 113px 191px;
  background-position: 12px 30px, 90px 70px, 40px 110px;
  animation: twinkle 7s ease-in-out infinite;
  opacity: 0.65;
}

.moon-halo {
  background: radial-gradient(
    circle,
    rgba(240, 207, 122, 0.28) 0%,
    rgba(212, 165, 72, 0.14) 34%,
    rgba(212, 165, 72, 0.04) 58%,
    transparent 72%
  );
}

.moon-core {
  background: radial-gradient(circle at 34% 28%, #fff7e2 0%, #f7e1a8 32%, #e5bc62 66%, #c7963a 100%);
  box-shadow:
    0 0 34px rgba(240, 207, 122, 0.55),
    0 0 90px rgba(212, 165, 72, 0.3),
    inset -12px -14px 30px rgba(120, 76, 22, 0.22);
}

.moon-shadow {
  background:
    radial-gradient(circle at 32% 36%, rgba(255, 255, 255, 0.28) 0 6%, transparent 7%),
    radial-gradient(circle at 62% 58%, rgba(120, 76, 22, 0.12) 0 9%, transparent 10%),
    radial-gradient(circle at 48% 74%, rgba(120, 76, 22, 0.1) 0 6%, transparent 7%);
}

.moon-drift {
  animation: moon-drift 18s ease-in-out infinite;
  will-change: transform;
}
</style>
