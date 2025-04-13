import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SilkThreadAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true, // Transparent background
      antialias: true,
    });
    renderer.setSize(window.innerWidth, 400); // Limited height
    renderer.setClearColor(0x000000, 0); // Transparent
    mountRef.current.appendChild(renderer.domElement);

    // Create curves representing silk threads
    const createSilkThread = (color, yOffset, amplitude) => {
      const points = [];
      for (let i = 0; i <= 100; i++) {
        const x = (i - 50) * 0.5;
        const y = Math.sin(i * 0.05) * amplitude + yOffset;
        const z = 0;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 100, 0.05, 8, false);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 100,
        specular: 0xffffff,
      });

      return new THREE.Mesh(geometry, material);
    };

    // Create multiple silk threads with different colors
    const threads = [
      createSilkThread(0xd4af37, 0, 1.5), // Gold
      createSilkThread(0xb87333, 2, 1), // Copper
      createSilkThread(0xb76e79, -2, 1.2), // Rose Gold
      createSilkThread(0x8a2be2, 4, 0.8), // Purple
      createSilkThread(0xe32636, -4, 0.9), // Red
      createSilkThread(0x046307, 6, 1.1), // Green
    ];

    // Add threads to scene
    threads.forEach((thread) => scene.add(thread));

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate threads with subtle movement
      threads.forEach((thread, index) => {
        thread.rotation.z = Math.sin(Date.now() * 0.0005 + index * 0.2) * 0.05;
        thread.position.x = Math.sin(Date.now() * 0.0003 + index) * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 400);
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
        width: "100%",
        height: "400px",
        overflow: "hidden",
        margin: "40px 0",
      }}
    />
  );
};

export default SilkThreadAnimation;
