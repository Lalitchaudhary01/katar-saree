import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SareeAnimation = () => {
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
    camera.position.z = 20;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Append to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Create flowing saree-like cloth
    const clothWidth = 30;
    const clothHeight = 15;
    const segments = 50;

    // Create geometry with more detail for realistic cloth
    const geometry = new THREE.PlaneGeometry(
      clothWidth,
      clothHeight,
      segments,
      segments
    );

    // Create gradient texture to simulate saree patterns
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d");

    // Create gradient background
    const gradient = context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#8B0000"); // Dark red
    gradient.addColorStop(0.5, "#B8860B"); // Golden color
    gradient.addColorStop(1, "#8B0000"); // Dark red

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add some pattern lines to simulate saree design
    context.strokeStyle = "#FFD700"; // Gold for border
    context.lineWidth = 5;

    // Border
    context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Pattern lines
    for (let i = 40; i < canvas.height; i += 40) {
      context.beginPath();
      context.moveTo(20, i);
      context.lineTo(canvas.width - 20, i);
      if (i % 80 === 0) {
        context.strokeStyle = "#FFD700"; // Gold
      } else {
        context.strokeStyle = "#FFF8DC"; // Cream
      }
      context.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);

    // Create material with the texture
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });

    const cloth = new THREE.Mesh(geometry, material);
    scene.add(cloth);

    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation variables
    let time = 0;
    const windForce = 0.3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.01;

      // Get vertices for flowing animation
      const { position } = geometry.attributes;

      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);

        // Create realistic flowing fabric effect
        const waveX1 = Math.sin(x / 3 + time) * Math.cos(y / 2) * windForce;
        const waveX2 =
          Math.cos(x / 5 + time * 0.7) * Math.sin(y / 4) * windForce * 0.6;

        // Apply flowing effect
        const z = waveX1 + waveX2;

        position.setZ(i, z);
      }

      position.needsUpdate = true;

      // Subtle rotation for added dimension
      cloth.rotation.y = Math.sin(time * 0.1) * 0.05;
      cloth.rotation.x = Math.cos(time * 0.08) * 0.03;

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

export default SareeAnimation;
