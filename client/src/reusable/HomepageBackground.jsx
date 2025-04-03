import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const HomepageBackground = () => {
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
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Append to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Create cloth-like effect
    const clothWidth = 20;
    const clothHeight = 15;
    const segments = 30;

    // Create geometry with more detail for cloth-like effect
    const geometry = new THREE.PlaneGeometry(
      clothWidth,
      clothHeight,
      segments,
      segments
    );

    // Create elegant material with soft colors
    const material = new THREE.MeshBasicMaterial({
      color: 0xb58863,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const cloth = new THREE.Mesh(geometry, material);
    cloth.position.z = -5;
    scene.add(cloth);

    // Add gold particles for a luxury feel
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position particles in a more controlled pattern
      posArray[i] = (Math.random() - 0.5) * clothWidth * 1.5;
      posArray[i + 1] = (Math.random() - 0.5) * clothHeight * 1.5;
      posArray[i + 2] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Gold particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xd4af37, // Gold color
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add subtle light for depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Animation variables
    let time = 0;
    const speed = 0.3;

    // Handle mouse movement for interactive effect
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      // Normalize mouse position
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.01;

      // Get vertices for wave animation
      const { position } = geometry.attributes;

      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);

        // Create elegant flowing wave pattern
        const waveX = Math.sin(x / 2 + time * speed) * 0.5;
        const waveY = Math.cos(y / 2 + time * speed) * 0.5;
        const mouseEffect = (mouse.x * waveX + mouse.y * waveY) * 0.1;

        // Apply combined effect
        const z = waveX + waveY + mouseEffect;

        position.setZ(i, z);
      }

      position.needsUpdate = true;

      // Rotate particles slowly
      particles.rotation.y += 0.001;
      particles.rotation.z += 0.0005;

      // Subtle cloth rotation for added dimension
      cloth.rotation.y = Math.sin(time * 0.1) * 0.05;

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

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
      scene.clear();
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

export default HomepageBackground;
