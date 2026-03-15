'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    THREE: {
      Camera: new () => { position: { z: number } }
      Scene: new () => { add: (mesh: unknown) => void }
      PlaneBufferGeometry: new (width: number, height: number) => unknown
      Vector2: new () => { x: number; y: number }
      ShaderMaterial: new (config: {
        uniforms: {
          time: { type: string; value: number }
          resolution: { type: string; value: { x: number; y: number } }
        }
        vertexShader: string
        fragmentShader: string
      }) => unknown
      Mesh: new (geometry: unknown, material: unknown) => unknown
      WebGLRenderer: new (config?: { alpha?: boolean }) => {
        domElement: HTMLCanvasElement
        setPixelRatio: (ratio: number) => void
        setSize: (width: number, height: number) => void
        render: (scene: unknown, camera: unknown) => void
        dispose: () => void
      }
    }
  }
}

type SceneState = {
  camera: unknown
  scene: unknown
  renderer: {
    domElement: HTMLCanvasElement
    setPixelRatio: (ratio: number) => void
    setSize: (width: number, height: number) => void
    render: (scene: unknown, camera: unknown) => void
    dispose: () => void
  } | null
  uniforms: {
    time: { type: string; value: number }
    resolution: { type: string; value: { x: number; y: number } }
  } | null
  animationId: number | null
  cleanupResize: (() => void) | null
}

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<SceneState>({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
    cleanupResize: null,
  })

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-three-cdn="true"]'
    )

    const initIfReady = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS()
      }
    }

    if (existingScript) {
      if (window.THREE) {
        initIfReady()
      } else {
        existingScript.addEventListener('load', initIfReady, { once: true })
      }
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js'
      script.dataset.threeCdn = 'true'
      script.onload = initIfReady
      document.head.appendChild(script)
    }

    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      if (sceneRef.current.cleanupResize) {
        sceneRef.current.cleanupResize()
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose()
      }
    }
  }, [])

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return

    const THREE = window.THREE
    const container = containerRef.current

    container.innerHTML = ''

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneBufferGeometry(2, 2)

    const uniforms = {
      time: { type: 'f', value: 1.0 },
      resolution: { type: 'v2', value: new THREE.Vector2() },
    }

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }

      varying vec2 vUv;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

        float t = time * 0.038 + random(uv.x) * 0.22;
        float lineWidth = 0.00042;

        float signal = 0.0;
        for (int i = 0; i < 6; i++) {
          signal += lineWidth * float((i + 1) * (i + 1)) /
            abs(fract(t + float(i) * 0.018) - length(uv));
        }

        float scan = smoothstep(0.85, 0.15, abs(uv.y + 0.06 * sin(time * 0.12)));
        float glow = clamp(signal * 0.72, 0.0, 1.0);

        vec3 base = vec3(0.0, 0.095, 0.14);
        vec3 cyan = vec3(0.0, 0.78, 1.0);
        vec3 ice = vec3(0.72, 0.95, 1.0);
        vec3 color = base + cyan * glow * 0.85 + ice * pow(glow, 3.0) * 0.25;
        color += cyan * scan * 0.03;

        float vignette = smoothstep(1.4, 0.2, length(uv));
        color *= vignette;

        gl_FragColor = vec4(color, 0.96);
      }
    `

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: null,
      cleanupResize: null,
    }

    const onWindowResize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onWindowResize()
    window.addEventListener('resize', onWindowResize, false)
    sceneRef.current.cleanupResize = () => {
      window.removeEventListener('resize', onWindowResize, false)
    }

    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }

    animate()
  }

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />
}
