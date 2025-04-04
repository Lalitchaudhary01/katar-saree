// src/components/ThreeBackground.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackground = ({ effect = "particles" }) => {
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
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Append to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Create background based on selected effect
    let particles;
    let animationFunction;

    if (effect === "particles") {
      // Particles effect
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1500;

      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x9e8a78,
        transparent: true,
        opacity: 0.8,
      });

      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      animationFunction = () => {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
      };
    } else if (effect === "waves") {
      // Waves effect
      const planeGeometry = new THREE.PlaneGeometry(15, 15, 100, 100);
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x9e8a78,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      scene.add(plane);

      // Get vertices for animation
      const { position } = planeGeometry.attributes;

      animationFunction = () => {
        const time = Date.now() * 0.0005;

        for (let i = 0; i < position.count; i++) {
          const x = position.getX(i);
          const y = position.getY(i);

          // Create wave effect
          const z = Math.sin(x / 2 + time) * 0.5 + Math.cos(y / 2 + time) * 0.5;

          position.setZ(i, z);
        }

        position.needsUpdate = true;
      };
    } else if (effect === "floatingCubes") {
      // Floating cubes effect
      const cubes = [];
      const cubeCount = 50;

      for (let i = 0; i < cubeCount; i++) {
        const size = Math.random() * 0.3 + 0.1;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshBasicMaterial({
          color: 0x9e8a78,
          transparent: true,
          opacity: Math.random() * 0.4 + 0.1,
        });

        const cube = new THREE.Mesh(geometry, material);

        cube.position.x = (Math.random() - 0.5) * 10;
        cube.position.y = (Math.random() - 0.5) * 10;
        cube.position.z = (Math.random() - 0.5) * 10;

        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;

        // Store random rotation speeds
        cube.userData = {
          rotSpeed: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01,
          },
          floatSpeed: (Math.random() - 0.5) * 0.005,
        };

        scene.add(cube);
        cubes.push(cube);
      }

      animationFunction = () => {
        cubes.forEach((cube) => {
          cube.rotation.x += cube.userData.rotSpeed.x;
          cube.rotation.y += cube.userData.rotSpeed.y;
          cube.rotation.z += cube.userData.rotSpeed.z;

          cube.position.y += cube.userData.floatSpeed;

          // Reset position if out of view
          if (cube.position.y > 5 || cube.position.y < -5) {
            cube.userData.floatSpeed = -cube.userData.floatSpeed;
          }
        });
      };
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (animationFunction) {
        animationFunction();
      }

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
  }, [effect]);

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

export default ThreeBackground;
