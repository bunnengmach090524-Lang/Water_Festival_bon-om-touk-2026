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
    radial-gradient(circle, color-mix(in srgb, var(--scene-paper) 85%, transparent) 1px, transparent 1.6px),
    radial-gradient(circle, color-mix(in srgb, var(--scene-glow) 70%, transparent) 1px, transparent 1.6px),
    radial-gradient(circle, color-mix(in srgb, var(--scene-paper) 55%, transparent) 1px, transparent 1.6px);
  background-size: 173px 149px, 257px 211px, 113px 191px;
  background-position: 12px 30px, 90px 70px, 40px 110px;
  animation: twinkle 7s ease-in-out infinite;
  opacity: 0.65;
}

.moon-halo {
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--scene-glow) 28%, transparent) 0%,
    color-mix(in srgb, var(--scene-gold) 14%, transparent) 34%,
    color-mix(in srgb, var(--scene-gold) 4%, transparent) 58%,
    transparent 72%
  );
}

.moon-core {
  background: radial-gradient(circle at 34% 28%, var(--scene-moon) 0%, color-mix(in srgb, var(--scene-glow) 72%, var(--scene-moon)) 42%, var(--scene-gold) 100%);
  box-shadow:
    0 0 34px color-mix(in srgb, var(--scene-glow) 55%, transparent),
    0 0 90px color-mix(in srgb, var(--scene-gold) 30%, transparent),
    inset -12px -14px 30px color-mix(in srgb, var(--scene-ink) 22%, transparent);
}

.moon-shadow {
  background:
    radial-gradient(circle at 32% 36%, color-mix(in srgb, var(--scene-paper) 28%, transparent) 0 6%, transparent 7%),
    radial-gradient(circle at 62% 58%, color-mix(in srgb, var(--scene-ink) 12%, transparent) 0 9%, transparent 10%),
    radial-gradient(circle at 48% 74%, color-mix(in srgb, var(--scene-ink) 10%, transparent) 0 6%, transparent 7%);
}

.moon-drift {
  animation: moon-drift 18s ease-in-out infinite;
  will-change: transform;
}
</style>
