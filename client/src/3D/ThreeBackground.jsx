import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f8f3ed"); // Elegant cream color

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Golden particles (representing gold thread used in Banarasi sarees)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;

    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      // Spread particles in a large area but keep them subtle
      posArray[i] = (Math.random() - 0.5) * 25;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Gold material for particles
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color("#D4AF37"), // Gold color
      transparent: true,
      opacity: 0.8,
    });

    const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleMesh);

    // Add soft ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light to create depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles slowly for an elegant effect
      particleMesh.rotation.x += 0.0003;
      particleMesh.rotation.y += 0.0002;

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
      }}
    />
  );
};

export default ThreeBackground;
