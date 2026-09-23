import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Kite3DViewProps {
  className?: string;
  onInteractiveClick?: () => void;
}

export const Kite3DView: React.FC<Kite3DViewProps> = ({ className, onInteractiveClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff3d6, 1.4);
    sunLight.position.set(4, 6, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.8);
    rimLight.position.set(-5, -3, -2);
    scene.add(rimLight);

    // Main Kite Root Group
    const kiteRoot = new THREE.Group();
    scene.add(kiteRoot);

    // Create Kite 3D Wings (4 distinct aerodynamic facets with dihedral depth)
    // Vertices:
    // Top: (0, 1.75, 0.08)
    // Left: (-1.45, 0.35, -0.1)
    // Center Spine: (0, 0.35, 0.32) -> raised center gives real 3D volume!
    // Right: (1.45, 0.35, -0.1)
    // Bottom: (0, -1.85, 0.08)

    const vTop = new THREE.Vector3(0, 1.75, 0.08);
    const vLeft = new THREE.Vector3(-1.45, 0.35, -0.1);
    const vCenter = new THREE.Vector3(0, 0.35, 0.32);
    const vRight = new THREE.Vector3(1.45, 0.35, -0.1);
    const vBottom = new THREE.Vector3(0, -1.85, 0.08);

    const createFacet = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, color: number) => {
      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array([
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z,
      ]);
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.32,
        metalness: 0.08,
        side: THREE.DoubleSide,
      });
      return new THREE.Mesh(geom, mat);
    };

    // 4 Facets with bright, joyful, celebratory colors
    // Top-Left: Bright Coral Red
    const facetTL = createFacet(vTop, vLeft, vCenter, 0xff3355);
    // Top-Right: Vibrant Golden Yellow
    const facetTR = createFacet(vTop, vCenter, vRight, 0xffbe0b);
    // Bottom-Left: Electric Cyan Blue
    const facetBL = createFacet(vCenter, vLeft, vBottom, 0x00b4d8);
    // Bottom-Right: Emerald Spring Green
    const facetBR = createFacet(vCenter, vRight, vBottom, 0x06d6a0);

    kiteRoot.add(facetTL);
    kiteRoot.add(facetTR);
    kiteRoot.add(facetBL);
    kiteRoot.add(facetBR);

    // Decorative Gold border trim along outer perimeter
    const borderPoints = [
      vTop, vLeft, vBottom, vRight, vTop
    ];
    const borderGeom = new THREE.BufferGeometry().setFromPoints(borderPoints);
    const borderMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });
    const borderLine = new THREE.Line(borderGeom, borderMat);
    kiteRoot.add(borderLine);

    // Bamboo Spars (Cross frame structure)
    // 1. Vertical Spine Bamboo Rod
    const spineCurve = new THREE.LineCurve3(
      new THREE.Vector3(0, 1.82, 0.12),
      new THREE.Vector3(0, -1.92, 0.12)
    );
    const spineGeom = new THREE.TubeGeometry(spineCurve, 16, 0.038, 8, false);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.6 });
    const spineMesh = new THREE.Mesh(spineGeom, woodMat);
    kiteRoot.add(spineMesh);

    // 2. Horizontal Curved Cross Spar
    const crossCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1.48, 0.35, -0.08),
      new THREE.Vector3(0, 0.42, 0.34),
      new THREE.Vector3(1.48, 0.35, -0.08)
    );
    const crossGeom = new THREE.TubeGeometry(crossCurve, 20, 0.034, 8, false);
    const crossMesh = new THREE.Mesh(crossGeom, woodMat);
    kiteRoot.add(crossMesh);

    // Bridle String (attached to top and bottom spine meeting in front)
    const bridleGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 1.0, 0.2),
      new THREE.Vector3(0, 0.1, 0.85),
      new THREE.Vector3(0, -0.9, 0.2),
    ]);
    const bridleMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.75, transparent: true });
    const bridleLine = new THREE.Line(bridleGeom, bridleMat);
    kiteRoot.add(bridleLine);

    // 3D Animated Tail with Colorful Bow Ribbons
    const TAIL_SEGMENTS = 24;
    const tailPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= TAIL_SEGMENTS; i++) {
      tailPoints.push(new THREE.Vector3(0, -1.85 - i * 0.14, 0.08));
    }
    const tailGeom = new THREE.BufferGeometry().setFromPoints(tailPoints);
    const tailMat = new THREE.LineBasicMaterial({ color: 0xf8fafc, linewidth: 2 });
    const tailLine = new THREE.Line(tailGeom, tailMat);
    kiteRoot.add(tailLine);

    // Bow Ribbons attached along the tail
    const bowColors = [0xff006e, 0x8338ec, 0x3a86ff, 0xfb5607, 0xffbe0b, 0x06d6a0];
    const bows: { mesh: THREE.Group; segIndex: number }[] = [];

    const bowIndices = [3, 7, 11, 15, 19, 23];
    bowIndices.forEach((segIdx, idx) => {
      const bowGroup = new THREE.Group();
      const color = bowColors[idx % bowColors.length];
      const ribbonMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });

      // Left wing of bow
      const leftGeom = new THREE.ConeGeometry(0.12, 0.22, 5);
      leftGeom.rotateZ(Math.PI / 2);
      const leftWing = new THREE.Mesh(leftGeom, ribbonMat);
      leftWing.position.x = -0.1;
      bowGroup.add(leftWing);

      // Right wing of bow
      const rightGeom = new THREE.ConeGeometry(0.12, 0.22, 5);
      rightGeom.rotateZ(-Math.PI / 2);
      const rightWing = new THREE.Mesh(rightGeom, ribbonMat);
      rightWing.position.x = 0.1;
      bowGroup.add(rightWing);

      // Center Knot
      const knotGeom = new THREE.SphereGeometry(0.06, 8, 8);
      const knot = new THREE.Mesh(knotGeom, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 }));
      bowGroup.add(knot);

      kiteRoot.add(bowGroup);
      bows.push({ mesh: bowGroup, segIndex: segIdx });
    });

    // Floating Sparkle Particles in the Sky
    const particleCount = 20;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 7;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Interactive Drag / Touch rotation
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    let targetRotationX = 0.12;
    let targetRotationY = 0;
    let spinVelocity = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerPosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousPointerPosition.x;
      const deltaY = clientY - previousPointerPosition.y;

      targetRotationY += deltaX * 0.012;
      targetRotationX += deltaY * 0.012;
      // Clamp vertical tilt
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));

      previousPointerPosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    // Barrel roll on click
    const handleClick = () => {
      spinVelocity = Math.PI * 2;
      onInteractiveClick?.();
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    dom.addEventListener('click', handleClick);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Barrel roll decay
      if (spinVelocity > 0.05) {
        kiteRoot.rotation.z += spinVelocity * 0.15;
        spinVelocity *= 0.92;
      } else {
        spinVelocity = 0;
      }

      // Smooth floating wind wave
      const floatY = Math.sin(elapsedTime * 2.2) * 0.18;
      const floatX = Math.cos(elapsedTime * 1.5) * 0.12;
      kiteRoot.position.y = floatY + 0.35;
      kiteRoot.position.x = floatX;

      // Wind tilt
      const windTiltZ = Math.sin(elapsedTime * 1.8) * 0.12;
      const windTiltX = Math.cos(elapsedTime * 2.0) * 0.08;

      if (!isDragging) {
        // Return gently to wind sway
        kiteRoot.rotation.x += (targetRotationX + windTiltX - kiteRoot.rotation.x) * 0.08;
        kiteRoot.rotation.y += (targetRotationY - kiteRoot.rotation.y) * 0.08;
        if (spinVelocity === 0) {
          kiteRoot.rotation.z += (windTiltZ - kiteRoot.rotation.z) * 0.08;
        }
      } else {
        kiteRoot.rotation.x += (targetRotationX - kiteRoot.rotation.x) * 0.2;
        kiteRoot.rotation.y += (targetRotationY - kiteRoot.rotation.y) * 0.2;
      }

      // Animate 3D Tail Spline in the wind
      const posAttr = tailGeom.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 1; i <= TAIL_SEGMENTS; i++) {
        const factor = i / TAIL_SEGMENTS;
        const waveX = Math.sin(elapsedTime * 3.5 - i * 0.35) * (0.12 + factor * 0.45);
        const waveZ = Math.cos(elapsedTime * 3.0 - i * 0.3) * (0.08 + factor * 0.35);
        const curY = -1.85 - i * 0.14;

        posAttr.setXYZ(i, waveX, curY, 0.08 + waveZ);
      }
      posAttr.needsUpdate = true;

      // Update bow ribbon positions and rotations along the tail
      bows.forEach((b) => {
        const px = posAttr.getX(b.segIndex);
        const py = posAttr.getY(b.segIndex);
        const pz = posAttr.getZ(b.segIndex);
        b.mesh.position.set(px, py, pz);
        b.mesh.rotation.z = Math.sin(elapsedTime * 4 + b.segIndex) * 0.4;
        b.mesh.rotation.y = Math.cos(elapsedTime * 3 + b.segIndex) * 0.3;
      });

      // Gently rotate sparkles
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      dom.removeEventListener('click', handleClick);

      renderer.dispose();
      facetTL.geometry.dispose();
      facetTR.geometry.dispose();
      facetBL.geometry.dispose();
      facetBR.geometry.dispose();
      spineGeom.dispose();
      crossGeom.dispose();
      bridleGeom.dispose();
      tailGeom.dispose();
      particleGeom.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onInteractiveClick]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-[360px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none ${className || ''}`}
      title="Uchar Varrakni 3D formatda aylantiring yoki bosing!"
    >
      {/* Subtle wind hint badge on hover */}
      {isHovered && (
        <div className="absolute bottom-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white/90 text-xs font-semibold pointer-events-none transition-opacity animate-fade-in">
          Aylantirish uchun suring 🖐️
        </div>
      )}
    </div>
  );
};
