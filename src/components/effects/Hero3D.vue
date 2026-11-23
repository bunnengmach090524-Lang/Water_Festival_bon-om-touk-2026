<script setup>
/**
 * Lazy-loaded, lightweight three.js lantern scene.
 * three.js is imported only when WebGL is available and motion is allowed,
 * and the whole scene is disposed on unmount.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const host = ref(null)
let disposed = false
let running = false
let visible = true
let frameId = 0
let clock = null
let cleanup = () => {}
let intersectionObserver = null
let resizeObserver = null

function canStart() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  // Low-end small devices get the CSS-only fallback.
  if ((navigator.hardwareConcurrency || 8) <= 4 && window.innerWidth < 768) return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

function tick() {
  if (!running || disposed) return
  frameId = requestAnimationFrame(tick)

  const { scene, renderer, camera, lanterns, positions, glowGeometry, bodies, dummy } = sceneState
  const dt = Math.min(clock.getDelta(), 0.05)
  const time = clock.elapsedTime

  lanterns.forEach((lantern, index) => {
    lantern.y += lantern.speed * dt
    if (lantern.y > 4.2) {
      lantern.y = -3.6
      lantern.x = (Math.random() - 0.5) * 10
    }
    const x = lantern.x + Math.sin(time * 0.45 + lantern.phase) * 0.18
    positions[index * 3] = x
    positions[index * 3 + 1] = lantern.y
    positions[index * 3 + 2] = lantern.z

    dummy.position.set(x, lantern.y, lantern.z)
    dummy.rotation.set(0, time * 0.35 + lantern.phase, 0)
    dummy.scale.setScalar(lantern.scale)
    dummy.updateMatrix()
    bodies.setMatrixAt(index, dummy.matrix)
  })

  glowGeometry.attributes.position.needsUpdate = true
  bodies.instanceMatrix.needsUpdate = true
  renderer.render(scene, camera)
}

let sceneState = null

function updateRunning() {
  const shouldRun = visible && !document.hidden && !disposed && !!sceneState
  if (shouldRun && !running) {
    running = true
    clock?.getDelta()
    tick()
  } else if (!shouldRun && running) {
    running = false
    cancelAnimationFrame(frameId)
  }
}

function onVisibilityChange() {
  updateRunning()
}

async function start() {
  if (!canStart() || !host.value) return
  let THREE
  try {
    THREE = await import('three')
  } catch {
    return // Offline or unsupported: the CSS scene remains.
  }
  if (disposed || !host.value) return

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
  camera.position.set(0, 0.4, 9)
  camera.lookAt(0, 0.2, 0)

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;'
  host.value.appendChild(renderer.domElement)

  // One shared radial-gradient texture for all glowing points.
  const textureCanvas = document.createElement('canvas')
  textureCanvas.width = 64
  textureCanvas.height = 64
  const context = textureCanvas.getContext('2d')
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255, 235, 175, 1)')
  gradient.addColorStop(0.22, 'rgba(240, 207, 122, 0.65)')
  gradient.addColorStop(1, 'rgba(212, 165, 72, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 64, 64)
  const glowTexture = new THREE.CanvasTexture(textureCanvas)

  const COUNT = 32
  const positions = new Float32Array(COUNT * 3)
  const lanterns = []
  for (let i = 0; i < COUNT; i += 1) {
    lanterns.push({
      x: (Math.random() - 0.5) * 10,
      y: -3.6 + Math.random() * 7.8,
      z: (Math.random() - 0.5) * 3 - 1,
      speed: 0.14 + Math.random() * 0.24,
      phase: Math.random() * Math.PI * 2,
      scale: 0.65 + Math.random() * 0.8,
    })
  }

  const glowGeometry = new THREE.BufferGeometry()
  glowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const glowMaterial = new THREE.PointsMaterial({
    map: glowTexture,
    color: 0xf0cf7a,
    size: 1.15,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })
  scene.add(new THREE.Points(glowGeometry, glowMaterial))

  const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.13, 0.2, 6)
  const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xffe0a0, transparent: true, opacity: 0.9 })
  const bodies = new THREE.InstancedMesh(bodyGeometry, bodyMaterial, COUNT)
  bodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  scene.add(bodies)
  const dummy = new THREE.Object3D()

  // Dark water plane and faint gold reflection lines (one extra draw call).
  const waterGeometry = new THREE.PlaneGeometry(34, 14)
  const waterMaterial = new THREE.MeshBasicMaterial({ color: 0x0b1026, transparent: true, opacity: 0.72 })
  const water = new THREE.Mesh(waterGeometry, waterMaterial)
  water.rotation.x = -Math.PI / 2
  water.position.set(0, -3, -2)
  scene.add(water)

  const reflectionPositions = []
  for (let i = 0; i < 14; i += 1) {
    const x = (Math.random() - 0.5) * 9
    const z = -1.5 + Math.random() * 5
    const length = 0.4 + Math.random() * 1.9
    reflectionPositions.push(x - length / 2, -2.97, z, x + length / 2, -2.97, z)
  }
  const reflectionGeometry = new THREE.BufferGeometry()
  reflectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(reflectionPositions, 3))
  const reflectionMaterial = new THREE.LineBasicMaterial({ color: 0xd4a548, transparent: true, opacity: 0.16 })
  scene.add(new THREE.LineSegments(reflectionGeometry, reflectionMaterial))

  function resize() {
    if (!host.value) return
    const width = Math.max(1, host.value.clientWidth)
    const height = Math.max(1, host.value.clientHeight)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }
  resize()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host.value)

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      updateRunning()
    },
    { threshold: 0.01 },
  )
  intersectionObserver.observe(host.value)
  document.addEventListener('visibilitychange', onVisibilityChange)

  sceneState = { scene, camera, renderer, lanterns, positions, glowGeometry, bodies, dummy }
  clock = new THREE.Clock()
  updateRunning()

  cleanup = () => {
    running = false
    cancelAnimationFrame(frameId)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    intersectionObserver?.disconnect()
    resizeObserver?.disconnect()
    renderer.domElement.remove()
    glowGeometry.dispose()
    glowMaterial.dispose()
    glowTexture.dispose()
    bodyGeometry.dispose()
    bodyMaterial.dispose()
    waterGeometry.dispose()
    waterMaterial.dispose()
    reflectionGeometry.dispose()
    reflectionMaterial.dispose()
    renderer.dispose()
    sceneState = null
    clock = null
  }
}

onMounted(start)

onBeforeUnmount(() => {
  disposed = true
  cleanup()
})
</script>

<template>
  <div ref="host" class="pointer-events-none absolute inset-0" aria-hidden="true"></div>
</template>
