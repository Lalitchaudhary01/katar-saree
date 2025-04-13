import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const FloatingSaree = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, 500);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create a saree using cloth simulation
    const createFabric = () => {
      // Create a plane geometry to represent the fabric
      const geometry = new THREE.PlaneGeometry(5, 8, 20, 20);

      // Create a rich texture for the saree
      const textureLoader = new THREE.TextureLoader();

      // We'll simulate a texture here since we can't load external images
      // In a real implementation, you would load actual saree textures
      const material = new THREE.MeshPhongMaterial({
        color: 0xd4af37, // Gold base color
        side: THREE.DoubleSide,
        shininess: 50,
        specular: 0xffffff,
        emissive: 0x220000,
        wireframe: false,
        flatShading: false,
      });

      // Create a fabric mesh
      const fabric = new THREE.Mesh(geometry, material);

      // Add pattern to the saree
      addPatternToSaree(fabric);

      return fabric;
    };

    // Add decorative pattern to saree
    const addPatternToSaree = (saree) => {
      // Create small decorative elements to add to the saree
      // These represent the intricate embroidery on Banarasi sarees
      for (let i = 0; i < 50; i++) {
        const patternGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const patternMaterial = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.05, 0.9, 0.6),
          shininess: 100,
          specular: 0xffffff,
        });

        const pattern = new THREE.Mesh(patternGeometry, patternMaterial);

        // Position patterns across the saree
        pattern.position.x = (Math.random() - 0.5) * 4.5;
        pattern.position.y = (Math.random() - 0.5) * 7.5;
        pattern.position.z = 0.05; // Slightly raised from the fabric

        saree.add(pattern);
      }
    };

    // Create saree and add to scene
    const saree = createFabric();
    scene.add(saree);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);

    // Add another light from opposite direction for better illumination
    const backLight = new THREE.DirectionalLight(0xffffbb, 0.4);
    backLight.position.set(-1, -1, -1);
    scene.add(backLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Create gentle wave-like motion in the fabric
      const vertices = saree.geometry.attributes.position;
      const time = Date.now() * 0.001; // Slow time factor

      for (let i = 0; i < vertices.count; i++) {
        const x = vertices.getX(i);
        const y = vertices.getY(i);

        // Create wave effect
        const waveX = Math.sin(x * 0.5 + time) * 0.1;
        const waveY = Math.cos(y * 0.5 + time) * 0.1;

        vertices.setZ(i, waveX + waveY);
      }

      vertices.needsUpdate = true;
      saree.geometry.computeVertexNormals();

      // Gentle rotation of the entire saree
      saree.rotation.x = Math.sin(time * 0.2) * 0.1;
      saree.rotation.y = Math.sin(time * 0.1) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 500;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 500);
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
        height: "500px",
        margin: "60px 0",
        position: "relative",
      }}
    />
  );
};

export default FloatingSaree;
