import React, { useRef, useEffect } from "react";
import * as THREE from "three";

import gfg from "@/assets/gfg.png";
import gdg from "@/assets/gdg.png";

const RotatingCoin = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(500, 500);
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMappingExposure = 1.2;

    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sideLight1 = new THREE.DirectionalLight(0xffffcc, 1.5);
    sideLight1.position.set(3, 0, 0);
    scene.add(sideLight1);

    const sideLight2 = new THREE.DirectionalLight(0xffffcc, 1.5);
    sideLight2.position.set(-3, 0, 0);
    scene.add(sideLight2);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.7);
    topLight.position.set(0, 5, 2);
    scene.add(topLight);

    // Gold Plated Texture
    const createGoldPlatedTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext("2d");

      const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, "#FFD700");
      gradient.addColorStop(0.7, "#FFD700");
      gradient.addColorStop(1, "#DAA520");

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      return new THREE.CanvasTexture(canvas);
    };

    const goldTexture = createGoldPlatedTexture();

    // Coin Materials
    const baseMaterial = new THREE.MeshStandardMaterial({
      map: goldTexture,
      metalness: 1.0,
      roughness: 0.3,
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      metalness: 1.0,
      roughness: 0.1,
      emissive: 0xFFC000,
      emissiveIntensity: 0.3,
    });

    // Coin Geometry
    const coinRadius = 1;
    const coinThickness = 0.1;
    const coinSegments = 64;

    const frontGeometry = new THREE.CircleGeometry(coinRadius, coinSegments);
    const backGeometry = new THREE.CircleGeometry(coinRadius, coinSegments);
    const edgeGeometry = new THREE.CylinderGeometry(
      coinRadius,
      coinRadius,
      coinThickness,
      coinSegments,
      1,
      true
    );

    // Coin Meshes
    const frontMesh = new THREE.Mesh(frontGeometry, baseMaterial);
    frontMesh.position.z = coinThickness / 2;

    const backMesh = new THREE.Mesh(backGeometry, baseMaterial);
    backMesh.position.z = -coinThickness / 2;
    backMesh.rotation.y = Math.PI;

    const edgeMesh = new THREE.Mesh(edgeGeometry, edgeMaterial);
    edgeMesh.rotation.x = Math.PI / 2;

    // Create Coin Group
    const coin = new THREE.Group();
    coin.add(frontMesh);
    coin.add(backMesh);
    coin.add(edgeMesh);

    scene.add(coin);
    camera.position.z = 3;

    // Function to Create Engraved Logo Mesh
    const createEngravedLogoMesh = (texture) => {
      // texture.flipY = false; // Ensure correct orientation
      texture.needsUpdate = true;

      const aspectRatio = texture.image.width / texture.image.height;
      const logoHeight = 0.75;
      const logoWidth = logoHeight * aspectRatio;

      const geometry = new THREE.PlaneGeometry(logoWidth, logoHeight);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        displacementMap: texture, // Engraving effect
        // displacementScale: 0.03, // Fine-tune depth (negative for engrave)
        // displacementBias: 0.01, // Ensures only logo is affected
        metalness: 1.0,
        roughness: 0.4,
        transparent: true, // Removes unwanted background
        alphaTest: 0.5, // Makes background transparent
      });

      return new THREE.Mesh(geometry, material);
    };

    // Load Logo Textures & Apply Engraving
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(gfg, (texture) => {
      const frontLogoMesh = createEngravedLogoMesh(texture);
      frontLogoMesh.position.z = coinThickness / 2 + 0.005;
      coin.add(frontLogoMesh);
    });

    textureLoader.load(gdg, (texture) => {
      const backLogoMesh = createEngravedLogoMesh(texture);
      backLogoMesh.position.z = -coinThickness / 2 - 0.005;
      backLogoMesh.rotation.y = Math.PI;
      coin.add(backLogoMesh);
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      coin.rotation.y += 0.03;
      coin.rotation.x = Math.PI / 14;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div
        ref={containerRef}
        className="w-full h-64 flex justify-center items-center bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg"
      />
    </div>
  );
};

export default RotatingCoin;
