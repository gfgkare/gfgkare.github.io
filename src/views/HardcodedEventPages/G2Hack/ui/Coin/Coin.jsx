import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

import gfg from "@/assets/gfg.png"
import gdg from "@/assets/gdg.png"

const RotatingCoin = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Set size to fit container
    renderer.setSize(500, 500);
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMappingExposure = 1.2;
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Create lighting - focused on edges, not faces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    // Side light to illuminate edges
    const sideLight1 = new THREE.DirectionalLight(0xffffcc, 1.5);
    sideLight1.position.set(3, 0, 0);
    scene.add(sideLight1);
    
    const sideLight2 = new THREE.DirectionalLight(0xffffcc, 1.5);
    sideLight2.position.set(-3, 0, 0);
    scene.add(sideLight2);
    
    // Soft top light
    const topLight = new THREE.DirectionalLight(0xffffff, 0.7);
    topLight.position.set(0, 5, 2);
    scene.add(topLight);
    
    // Create gold plated texture with small centered logo
    const createGoldPlatedTexture = (text, smallerScale = true) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      
      // Create gold plated background with a subtle radial gradient for a plated look
      const gradient = context.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, canvas.width/2
      );
      gradient.addColorStop(0, '#FFD700');     // Bright gold in center
      gradient.addColorStop(0.7, '#FFD700');   // Gold
      gradient.addColorStop(1, '#DAA520');     // Slightly darker at edges for dimension
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw a smaller logo in the center (simulating a transparent PNG)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      let logoSize = 60;
      if (smallerScale) {
        logoSize = 40; // Even smaller for better visibility
      }
      
      // Create a "transparent background" area for the logo
      // This is a simulation of a transparent PNG
      const logoWidth = logoSize * 4;
      const logoHeight = logoSize * 2;
      
      // Draw the "PNG" logo (text as a placeholder for the actual PNG)
      context.font = `bold ${logoSize}px Arial`;
      context.fillStyle = '#000000';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, centerX, centerY);
      
      return new THREE.CanvasTexture(canvas);
    };

    function convertToGrayscale(texture) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = texture.image;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    
      let imageData = ctx.getImageData(0, 0, img.width, img.height);
      let data = imageData.data;
    
      for (let i = 0; i < data.length; i += 4) {
        let gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
        data[i] = gray; // Red
        data[i + 1] = gray; // Green
        data[i + 2] = gray; // Blue
      }
    
      ctx.putImageData(imageData, 0, 0);
      return new THREE.CanvasTexture(canvas);
    }
    
    // Create the coin faces with gold plated textures
    const textureLoader = new THREE.TextureLoader();
    // const frontLogoTexture = createGoldPlatedTexture('LOGO A', true);
    // const backLogoTexture = createGoldPlatedTexture('LOGO B', true);
    const frontLogoPNG = textureLoader.load(gfg);
    const backLogoPNG = textureLoader.load(gdg);
     
    // Create gold plated face materials
    const goldTexture = createGoldPlatedTexture('');

    const frontMaterial = new THREE.MeshBasicMaterial({
      map: goldTexture
    });

    const backMaterial = new THREE.MeshBasicMaterial({
      map: goldTexture
    });

    const frontLogoMaterial = new THREE.MeshBasicMaterial({
      map: frontLogoPNG,
      transparent: true
    });

    const backLogoMaterial = new THREE.MeshBasicMaterial({
      map: backLogoPNG,
      transparent: true
    });

    textureLoader.load(gfg, (texture) => {
      const engravedTexture = convertToGrayscale(texture);
      
      frontLogoMaterial.map = engravedTexture;
      frontLogoMaterial.roughness = 0.6; // Slightly rougher
      frontLogoMaterial.metalness = 0.8;
      frontLogoMaterial.color = new THREE.Color(0xA68B00); // Dark gold
      frontLogoMaterial.needsUpdate = true;
    });
    
    textureLoader.load(gdg, (texture) => {
      const engravedTexture = convertToGrayscale(texture);
    
      backLogoMaterial.map = engravedTexture;
      backLogoMaterial.roughness = 0.6;
      backLogoMaterial.metalness = 0.8;
      backLogoMaterial.color = new THREE.Color(0xA68B00);
      backLogoMaterial.needsUpdate = true;
    });

    const logoSize = .75;
    const coinThickness = 0.1;
    const frontLogoGeometry = new THREE.PlaneGeometry(logoSize, logoSize);
    const backLogoGeometry = new THREE.PlaneGeometry(logoSize, logoSize);

    const frontLogoMesh = new THREE.Mesh(frontLogoGeometry, frontLogoMaterial);
    frontLogoMesh.position.z = coinThickness / 2 + 0.01;

    const backLogoMesh = new THREE.Mesh(backLogoGeometry, backLogoMaterial);
    backLogoMesh.position.z = -coinThickness / 2 - 0.01;
    backLogoMesh.rotation.y = Math.PI;

    textureLoader.manager.onLoad = () => {
      // Adjust front logo aspect ratio
      if (frontLogoPNG.image) {
        const frontAspect = frontLogoPNG.image.width / frontLogoPNG.image.height;
        frontLogoGeometry.scale(frontAspect, 1, 1);
      }
      
      // Adjust back logo aspect ratio
      if (backLogoPNG.image) {
        const backAspect = backLogoPNG.image.width / backLogoPNG.image.height;
        backLogoGeometry.scale(backAspect, 1, 1);
      }
    };
    
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      metalness: 1.0,
      roughness: 0.1,
      emissive: 0xFFC000,
      emissiveIntensity: 0.3
    });
    
    // geometry
    const coinRadius = 1;
    const coinSegments = 64;
    
    const frontGeometry = new THREE.CircleGeometry(coinRadius, coinSegments);
    const backGeometry = new THREE.CircleGeometry(coinRadius, coinSegments);
    const edgeGeometry = new THREE.CylinderGeometry(
      coinRadius, coinRadius, coinThickness, coinSegments, 1, true
    );
    
    // meshes
    const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
    frontMesh.position.z = coinThickness / 2;
    
    const backMesh = new THREE.Mesh(backGeometry, backMaterial);
    backMesh.position.z = -coinThickness / 2;
    backMesh.rotation.y = Math.PI;
    
    const edgeMesh = new THREE.Mesh(edgeGeometry, edgeMaterial);
    edgeMesh.rotation.x = Math.PI / 2;
    
    // coin group
    const coin = new THREE.Group();
    coin.add(frontMesh);
    coin.add(backMesh);
    coin.add(edgeMesh);
    coin.add(frontLogoMesh);
    coin.add(backLogoMesh);
    
    scene.add(coin);
    
    camera.position.z = 3;
    
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