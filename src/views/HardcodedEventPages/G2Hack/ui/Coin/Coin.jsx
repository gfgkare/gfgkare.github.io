import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

import gfg from "@/assets/gfg.png";
import gdg from "@/assets/g2hack/gdg.png";

import "./Coin.css";


const RotatingCoin = () => {
  const containerRef = useRef(null);
  
  const [rotationSpeed, setRotationSpeed] = useState(0.03)

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(400, 400);
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMappingExposure = 1.2;

    containerRef.current.appendChild(renderer.domElement);

    // lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.68);
    scene.add(ambientLight);

    const sideLight1 = new THREE.DirectionalLight(0xffffcc, 1.5);
    sideLight1.position.set(3, 0, 4);
    scene.add(sideLight1);

    const sideLight2 = new THREE.DirectionalLight(0xffffcc, 1.5);
    sideLight2.position.set(-3, 1, 8);
    scene.add(sideLight2);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.7);
    topLight.position.set(-3, -2, 6);
    scene.add(topLight);

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

    const createCoinFaceTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      
      // Create a radial gradient for a metallic gold look
      const gradient = context.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, canvas.width/2
      );
      gradient.addColorStop(0, '#FFD700');     // Center gold
      gradient.addColorStop(0.7, '#E6C200');   // Mid gold
      gradient.addColorStop(0.9, '#DAA520');   // Darker gold
      gradient.addColorStop(1, '#B8860B');     // Edge darker gold
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some noise/texture to the coin surface
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        
        // Calculate distance from center to create circular coin
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        
        if (distanceFromCenter < canvas.width / 2) {
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI);
          
          // Randomize between slightly lighter and darker dots
          const brightness = Math.random() > 0.5 ? '0, 0, 0' : '255, 255, 255';
          context.fillStyle = `rgba(${brightness}, ${Math.random() * 0.08})`;
          context.fill();
        }
      }
      
      // Add a thin rim/border around the edge
      context.strokeStyle = '#B8860B';
      context.lineWidth = 6;
      context.beginPath();
      context.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 4, 0, 2 * Math.PI);
      context.stroke();
      
      // Add a subtle inner ring to simulate stamped edge
      context.strokeStyle = '#CEA243';
      context.lineWidth = 3;
      context.beginPath();
      context.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 20, 0, 2 * Math.PI);
      context.stroke();
      
      // Add some linear scratches for worn look
      for (let i = 0; i < 20; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const length = 20 + Math.random() * 40;
        const angle = Math.random() * Math.PI * 2;
        const endX = startX + Math.cos(angle) * length;
        const endY = startY + Math.sin(angle) * length;
        
        // Calculate if scratch is within coin boundary
        const startDist = Math.sqrt(Math.pow(startX - canvas.width/2, 2) + Math.pow(startY - canvas.height/2, 2));
        const endDist = Math.sqrt(Math.pow(endX - canvas.width/2, 2) + Math.pow(endY - canvas.height/2, 2));
        
        if (startDist < canvas.width/2 - 10 && endDist < canvas.width/2 - 10) {
          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          context.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }
      
      return new THREE.CanvasTexture(canvas);
    };
    
    // Create edge ridges texture
    const createCoinEdgeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      
      // Base color
      context.fillStyle = '#DAA520';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create ridges
      const ridgeCount = 120;
      const ridgeWidth = canvas.width / ridgeCount;
      
      for (let i = 0; i < ridgeCount; i++) {
        // Alternate between light and dark for ridges
        if (i % 2 === 0) {
          context.fillStyle = '#B8860B';  // Darker gold
        } else {
          context.fillStyle = '#FFD700';  // Brighter gold
        }
        
        context.fillRect(i * ridgeWidth, 0, ridgeWidth, canvas.height);
      }
      
      // Add some noise for texture
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1;
        
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        
        // Randomize between slightly lighter and darker dots
        const brightness = Math.random() > 0.5 ? '0, 0, 0' : '255, 255, 255';
        context.fillStyle = `rgba(${brightness}, ${Math.random() * 0.1})`;
        context.fill();
      }
      
      // Create a texture that repeats horizontally but not vertically
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.set(4, 1);
      
      return texture;
    };
    
    // Create the coin face textures
    const coinFaceTexture = createCoinFaceTexture();
    const coinEdgeTexture = createCoinEdgeTexture();

    const goldTexture = createGoldPlatedTexture();

    const baseMaterial = new THREE.MeshStandardMaterial({
      // map: goldTexture,
      map: coinFaceTexture,
      metalness: 0.8,
      roughness: 0.3,
      envMapIntensity: 1.0,
      // color: 0xFFD700,
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      map: coinEdgeTexture,
      color: 0xFFD700,
      metalness: 0.9,
      roughness: 0.3,
      emissive: 0xFFC000,
      emissiveIntensity: 0.3,
    });

    const coinRadius = 1.2;
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

    const createEngravedLogoMesh = (texture) => {
      // texture.flipY = false;
      texture.needsUpdate = true;

      const aspectRatio = texture.image.width / texture.image.height;
      const logoHeight = 0.75;
      const logoWidth = logoHeight * aspectRatio;

      const geometry = new THREE.PlaneGeometry(logoWidth, logoHeight);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        displacementMap: texture,
        // displacementScale: 0.03,
        // displacementBias: 0.01,
        metalness: 1.0,
        roughness: 0.4,
        transparent: true,
        alphaTest: 0.5,
      });

      return new THREE.Mesh(geometry, material);
    };

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

      coin.rotation.y += rotationSpeed;
      coin.rotation.x = Math.PI / 20;

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
    <div 
      className="coinWrapper"
      onMouseEnter={() => {
        console.log("mouse enter");
        setRotationSpeed(0.001)
      }}
      onMouseLeave={() => setRotationSpeed(0.03)}
    >
      <div
        ref={containerRef}
        className="coin"
      />
    </div>
  );
};

export default RotatingCoin;
