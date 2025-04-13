import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const GoldenParticles = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create golden particles system
    const particlesCount = 3000;
    const particles = new THREE.BufferGeometry();

    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    const color = new THREE.Color();

    for (let i = 0; i < particlesCount; i++) {
      // Position particles in a sphere
      const i3 = i * 3;
      const radius = Math.random() * 10;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(theta);

      // Gold color variations
      const shade = Math.random() * 0.2 + 0.8; // 0.8 to 1.0
      color.setHSL(0.12, 0.8, shade); // Gold hue with varying lightness

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Random sizes for depth effect
      sizes[i] = Math.random() * 0.1 + 0.02;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Particle shader material
    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create circular particles
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          
          // Add glow effect
          float glow = 1.0 - (r / 0.5);
          
          gl_FragColor = vec4(vColor, glow);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    // Create particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0001;

      // Rotate particle system slowly
      particleSystem.rotation.x = time * 0.3;
      particleSystem.rotation.y = time * 0.2;

      // Add pulsing effect
      const positions = particles.attributes.position.array;
      const sizes = particles.attributes.size.array;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Create subtle pulsing effect
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        // Make particles "breathe"
        const scale = Math.sin(time * 5 + i) * 0.1 + 1;
        positions[i3] = x * scale;
        positions[i3 + 1] = y * scale;
        positions[i3 + 2] = z * scale;

        // Vary particle sizes
        sizes[i] = (Math.sin(time * 3 + i) * 0.05 + 0.1) * 0.5;
      }

      particles.attributes.position.needsUpdate = true;
      particles.attributes.size.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default GoldenParticles;
