"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useScroll, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

export function Scene() {
  const scroll = useScroll()
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const starsRef = useRef<THREE.Points>(null)
  const starsRef2 = useRef<THREE.Points>(null)
  const starsRef3 = useRef<THREE.Points>(null)
  const twinkleStarsRef = useRef<THREE.Points>(null)

  // Create a starfield for parallax background
  const starfield = useMemo(() => {
    const starCount = 2000
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    const colors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 100
      sizes[i] = Math.random() * 2

      // White stars
      colors[i3] = 1
      colors[i3 + 1] = 1
      colors[i3 + 2] = 1
    }

    return { positions, sizes, colors }
  }, [])

  // Create a second starfield layer for parallax effect
  const starfield2 = useMemo(() => {
    const starCount = 1500
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    const colors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 150
      positions[i3 + 1] = (Math.random() - 0.5) * 150
      positions[i3 + 2] = (Math.random() - 0.5) * 150
      sizes[i] = Math.random() * 1.5

      // Slightly blue tint
      colors[i3] = 0.8 + Math.random() * 0.2
      colors[i3 + 1] = 0.8 + Math.random() * 0.2
      colors[i3 + 2] = 1
    }

    return { positions, sizes, colors }
  }, [])

  // Create a third starfield layer for distant stars
  const starfield3 = useMemo(() => {
    const starCount = 1000
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    const colors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 200
      positions[i3 + 1] = (Math.random() - 0.5) * 200
      positions[i3 + 2] = (Math.random() - 0.5) * 200
      sizes[i] = Math.random() * 1

      // Slightly red/purple tint
      colors[i3] = 1
      colors[i3 + 1] = 0.6 + Math.random() * 0.4
      colors[i3 + 2] = 0.8 + Math.random() * 0.2
    }

    return { positions, sizes, colors }
  }, [])

  // Create special twinkling stars
  const twinkleStars = useMemo(() => {
    const starCount = 200
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    const colors = new Float32Array(starCount * 3)
    const twinkleSpeed = new Float32Array(starCount)
    const twinkleOffset = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 120
      positions[i3 + 1] = (Math.random() - 0.5) * 120
      positions[i3 + 2] = (Math.random() - 0.5) * 120
      sizes[i] = 1.5 + Math.random() * 2.5 // Larger stars

      // Random colors for twinkling stars
      const colorChoice = Math.random()
      if (colorChoice < 0.3) {
        // Blue-ish
        colors[i3] = 0.5 + Math.random() * 0.3
        colors[i3 + 1] = 0.7 + Math.random() * 0.3
        colors[i3 + 2] = 1
      } else if (colorChoice < 0.6) {
        // Yellow-ish
        colors[i3] = 1
        colors[i3 + 1] = 0.9 + Math.random() * 0.1
        colors[i3 + 2] = 0.5 + Math.random() * 0.3
      } else {
        // White with slight tint
        colors[i3] = 0.9 + Math.random() * 0.1
        colors[i3 + 1] = 0.9 + Math.random() * 0.1
        colors[i3 + 2] = 0.9 + Math.random() * 0.1
      }

      // Random twinkle speeds and offsets
      twinkleSpeed[i] = 0.3 + Math.random() * 1.7
      twinkleOffset[i] = Math.random() * Math.PI * 2
    }

    return { positions, sizes, colors, twinkleSpeed, twinkleOffset }
  }, [])

  useFrame((state, delta) => {
    const offset = scroll.offset
    const r1 = scroll.range(0, 1 / 4)
    const r2 = scroll.range(1 / 4, 1 / 4)
    const r3 = scroll.range(2 / 4, 1 / 4)
    const r4 = scroll.range(3 / 4, 1 / 4)

    // Camera movement based on scroll
    if (cameraRef.current) {
      // Move camera back as we scroll
      cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, 10 - offset * 5, 4, delta)

      // Tilt camera up slightly as we scroll
      cameraRef.current.rotation.x = THREE.MathUtils.damp(cameraRef.current.rotation.x, offset * 0.2, 4, delta)
    }

    // Animate stars for parallax effect
    if (starsRef.current) {
      // Rotate stars slowly
      starsRef.current.rotation.y += delta * 0.02
      starsRef.current.rotation.z += delta * 0.01

      // Move stars based on scroll for parallax
      starsRef.current.position.z = -10 + offset * 5
    }

    if (starsRef2.current) {
      // Rotate second star layer at different speed
      starsRef2.current.rotation.y -= delta * 0.01
      starsRef2.current.rotation.z -= delta * 0.005

      // Move second star layer at different rate for parallax
      starsRef2.current.position.z = -20 + offset * 10
    }

    if (starsRef3.current) {
      // Rotate third star layer very slowly
      starsRef3.current.rotation.y += delta * 0.005

      // Move third star layer at slowest rate for distant parallax
      starsRef3.current.position.z = -30 + offset * 15
    }

    // Animate twinkling stars
    if (twinkleStarsRef.current && twinkleStarsRef.current.material instanceof THREE.PointsMaterial) {
      const sizes = twinkleStarsRef.current.geometry.attributes.size as THREE.BufferAttribute
      const time = state.clock.elapsedTime

      for (let i = 0; i < twinkleStars.twinkleSpeed.length; i++) {
        const speed = twinkleStars.twinkleSpeed[i]
        const offset = twinkleStars.twinkleOffset[i]
        // Create pulsing effect with sine wave
        const pulse = Math.sin(time * speed + offset) * 0.5 + 0.5
        sizes.array[i] = twinkleStars.sizes[i] * (0.7 + pulse * 0.8)
      }

      sizes.needsUpdate = true
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={60} />
      <color attach="background" args={["#030014"]} />

      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.2} />

      {/* Main directional light (like sun) */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#8566ff" />

      {/* Point lights for accent lighting */}
      <pointLight position={[-5, 2, -10]} intensity={0.5} color="#ff6f88" />
      <pointLight position={[5, -2, -10]} intensity={0.5} color="#36a3ff" />

      {/* Starfields for parallax background */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starfield.positions.length / 3}
            array={starfield.positions}
            itemSize={3}
            args={[starfield.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starfield.sizes.length}
            array={starfield.sizes}
            itemSize={1}
            args={[starfield.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starfield.colors.length / 3}
            array={starfield.colors}
            itemSize={3}
            args={[starfield.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} vertexColors sizeAttenuation={true} transparent opacity={0.8} />
      </points>

      <points ref={starsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starfield2.positions.length / 3}
            array={starfield2.positions}
            itemSize={3}
            args={[starfield2.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starfield2.sizes.length}
            array={starfield2.sizes}
            itemSize={1}
            args={[starfield2.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starfield2.colors.length / 3}
            array={starfield2.colors}
            itemSize={3}
            args={[starfield2.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} vertexColors sizeAttenuation={true} transparent opacity={0.6} />
      </points>

      <points ref={starsRef3}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starfield3.positions.length / 3}
            array={starfield3.positions}
            itemSize={3}
            args={[starfield3.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starfield3.sizes.length}
            array={starfield3.sizes}
            itemSize={1}
            args={[starfield3.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starfield3.colors.length / 3}
            array={starfield3.colors}
            itemSize={3}
            args={[starfield3.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors sizeAttenuation={true} transparent opacity={0.4} />
      </points>

      {/* Special twinkling stars */}
      <points ref={twinkleStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={twinkleStars.positions.length / 3}
            array={twinkleStars.positions}
            itemSize={3}
            args={[twinkleStars.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={twinkleStars.sizes.length}
            array={twinkleStars.sizes}
            itemSize={1}
            args={[twinkleStars.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={twinkleStars.colors.length / 3}
            array={twinkleStars.colors}
            itemSize={3}
            args={[twinkleStars.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          sizeAttenuation={true}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

