import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Seconds for one full turn of this globe. Local to the CTA only. */
const CTA_REVOLUTION_SECONDS = 46;

interface CtaNode {
  lat: number;
  lon: number;
}

const CTA_SURFACE_NODES: CtaNode[] = [
  { lat: 22, lon: 78 },
  { lat: 35, lon: 105 },
  { lat: 14, lon: 121 },
  { lat: 1, lon: 104 },
  { lat: 36, lon: 140 },
  { lat: -25, lon: 134 },
  { lat: 51, lon: 10 },
  { lat: 25, lon: 55 },
];

const CTA_SURFACE_ARCS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [2, 5],
  [0, 6],
  [0, 7],
  [6, 7],
];

function ctaLatLonToVector(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

type LonLat = [number, number];

const CTA_LANDMASSES: LonLat[][] = [
  [[-168, 71], [-166, 60], [-161, 55], [-153, 58], [-148, 60], [-140, 60], [-130, 55], [-124, 49], [-125, 40], [-122, 37], [-117, 32], [-110, 24], [-105, 21], [-97, 16], [-91, 17], [-87, 21], [-90, 29], [-94, 30], [-97, 26], [-103, 29], [-106, 32], [-114, 32], [-117, 33], [-122, 36], [-124, 40], [-124, 48], [-128, 50], [-133, 54], [-136, 57], [-148, 60], [-153, 59], [-161, 66], [-166, 68], [-168, 71]],
  [[-73, 78], [-68, 76], [-60, 83], [-44, 83], [-22, 82], [-20, 70], [-30, 68], [-44, 60], [-52, 61], [-60, 66], [-68, 70], [-73, 78]],
  [[-81, 8], [-77, 7], [-71, 12], [-63, 10], [-60, 8], [-50, 1], [-35, -5], [-35, -8], [-39, -15], [-40, -22], [-48, -28], [-52, -33], [-58, -38], [-62, -40], [-65, -46], [-68, -55], [-71, -55], [-75, -47], [-74, -40], [-72, -15], [-76, -12], [-81, -5], [-79, 1], [-80, 8]],
  [[-17, 15], [-16, 21], [-9, 32], [-6, 35], [10, 37], [11, 33], [20, 32], [25, 32], [32, 31], [34, 28], [43, 12], [51, 12], [51, 2], [42, -1], [41, -15], [35, -20], [33, -26], [28, -33], [20, -35], [18, -32], [14, -22], [12, -17], [13, -8], [10, 2], [9, 4], [-5, 5], [-8, 4], [-15, 11], [-17, 14]],
  [[-10, 36], [-9, 42], [-8, 43], [-1, 43], [-2, 48], [2, 51], [5, 52], [8, 56], [5, 62], [10, 64], [16, 69], [25, 71], [44, 68], [66, 70], [90, 72], [104, 77], [140, 71], [170, 66], [180, 66], [180, 64], [169, 60], [162, 54], [157, 51], [145, 44], [142, 47], [135, 48], [131, 43], [127, 35], [122, 30], [121, 25], [109, 13], [104, 1], [103, 8], [99, 8], [98, 16], [92, 22], [88, 22], [80, 16], [77, 8], [73, 7], [72, 21], [67, 24], [62, 25], [57, 26], [51, 26], [48, 30], [44, 13], [39, 14], [35, 28], [34, 31], [29, 41], [19, 41], [12, 42], [9, 44], [3, 43], [-5, 36], [-9, 37]],
  [[-10, 51], [-6, 55], [-5, 58], [-2, 58], [2, 53], [1, 51], [-2, 50], [-5, 50], [-10, 51]],
  [[44, -12], [44, -16], [47, -25], [44, -25], [43, -22], [43, -16], [44, -12]],
  [[130, 31], [131, 34], [140, 35], [141, 41], [145, 43], [145, 41], [142, 36], [140, 35], [134, 34], [131, 31]],
  [[139, 35], [140, 36], [142, 41], [141, 45], [145, 43], [141, 39], [140, 35]],
  [[114, -22], [113, -26], [115, -34], [124, -33], [129, -32], [134, -33], [137, -35], [140, -38], [147, -39], [150, -38], [153, -26], [146, -19], [142, -11], [136, -12], [127, -14], [122, -17], [114, -21]],
  [[131, -1], [134, -3], [141, -2], [147, -6], [151, -10], [147, -8], [143, -8], [141, -6], [137, -5], [134, -3], [131, -1]],
  [[95, 6], [98, -1], [105, -1], [106, -3], [114, -3], [117, 0], [109, 2], [105, 1], [98, 4]],
  [[119, -5], [120, 0], [122, 1], [125, 1], [127, -2], [122, -4], [119, -5]],
  [[172, -34], [173, -41], [175, -41], [178, -37], [177, -35], [174, -35]],
];

function ctaPointInLand(lon: number, lat: number): boolean {
  for (let ringIndex = 0; ringIndex < CTA_LANDMASSES.length; ringIndex += 1) {
    const ring = CTA_LANDMASSES[ringIndex];
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      const crosses = (yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
      if (crosses) inside = !inside;
    }
    if (inside) return true;
  }
  return false;
}

function paintCtaEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const ocean = ctx.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, '#f7fdf9');
  ocean.addColorStop(0.5, '#eef8f2');
  ocean.addColorStop(1, '#e5f4eb');
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(10, 171, 42, 0.08)';
  ctx.lineWidth = 1;
  for (let lon = 0; lon <= 360; lon += 20) {
    const x = (lon / 360) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const latStep = 2.05;
  for (let lat = -56; lat <= 78; lat += latStep) {
    const lonStep = latStep / Math.max(0.42, Math.cos((lat * Math.PI) / 180));
    for (let lon = -180; lon < 180; lon += lonStep) {
      const jitter = Math.sin(lon * 12.9898 + lat * 78.233) * 43758.5453;
      const unit = jitter - Math.floor(jitter);
      const jLon = lon + (unit - 0.5) * lonStep * 0.55;
      const jLat = lat + (Math.sin(jitter * 13.2) * 0.5) * latStep * 0.55;
      const sampleLon = Math.max(-179.5, Math.min(179.5, jLon));
      const sampleLat = jLat;
      if (!ctaPointInLand(sampleLon, sampleLat)) continue;
      const x = ((sampleLon + 180) / 360) * canvas.width;
      const y = ((90 - sampleLat) / 180) * canvas.height;
      ctx.fillStyle = 'rgba(36, 48, 44, 0.92)';
      ctx.beginPath();
      ctx.arc(x, y, 2.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeOrbit(radiusX: number, radiusY: number, tilt: number): THREE.LineLoop {
  const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(160).map((point) => new THREE.Vector3(point.x, 0, point.y));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x3dce62,
    transparent: true,
    opacity: 0.55,
    depthTest: false,
    depthWrite: false,
  });
  const orbit = new THREE.LineLoop(geometry, material);
  orbit.rotation.x = tilt;
  orbit.renderOrder = 5;
  return orbit;
}

/**
 * CTA-only globe. Scene, camera, materials, texture, nodes, arcs, and spin
 * are created here and are not shared with any other earth.
 */
export const CTAGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0.15, 5.35);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.55);
    key.position.set(3.2, 2.4, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb7f0c8, 0.7);
    rim.position.set(-3.5, -1.2, -2);
    scene.add(rim);

    const tilt = new THREE.Group();
    tilt.rotation.z = 0.38;
    scene.add(tilt);

    const spinningGlobe = new THREE.Group();
    tilt.add(spinningGlobe);

    const radius = 1;
    const earthTexture = paintCtaEarthTexture();
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 64, 64),
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        color: 0xffffff,
        roughness: 0.72,
        metalness: 0.02,
        emissive: 0xdff6e6,
        emissiveIntensity: 0.18,
      }),
    );
    spinningGlobe.add(earth);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.08, 48, 48),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float rim = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
            gl_FragColor = vec4(0.45, 0.86, 0.58, 1.0) * rim;
          }
        `,
      }),
    );
    spinningGlobe.add(atmosphere);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.22, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xc8f5d4,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    );
    spinningGlobe.add(glow);

    const nodePositions = CTA_SURFACE_NODES.map((node) => ctaLatLonToVector(node.lat, node.lon, radius * 1.012));
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x12b53a });
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x3dce62,
      transparent: true,
      opacity: 0.35,
    });

    nodePositions.forEach((position) => {
      const marker = new THREE.Mesh(new THREE.SphereGeometry(0.028, 16, 16), nodeMaterial);
      marker.position.copy(position);
      spinningGlobe.add(marker);

      const halo = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), haloMaterial);
      halo.position.copy(position);
      spinningGlobe.add(halo);
    });

    const arcMaterial = new THREE.LineBasicMaterial({
      color: 0x14b83c,
      transparent: true,
      opacity: 0.9,
    });

    CTA_SURFACE_ARCS.forEach(([from, to]) => {
      const start = nodePositions[from];
      const end = nodePositions[to];
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(radius + Math.max(0.18, start.distanceTo(end) * 0.42));
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      spinningGlobe.add(new THREE.Line(geometry, arcMaterial));
    });

    const orbitAnchor = new THREE.Group();
    scene.add(orbitAnchor);
    orbitAnchor.add(makeOrbit(1.34, 1.34, Math.PI / 2.35));
    orbitAnchor.add(makeOrbit(1.5, 1.12, Math.PI / 3.1));

    const clock = new THREE.Clock();
    let frameId = 0;
    const spinStep = (Math.PI * 2) / CTA_REVOLUTION_SECONDS;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const delta = clock.getDelta();
      spinningGlobe.rotation.y += spinStep * delta;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      renderer.dispose();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material;
        if (!material) return;
        const materials = Array.isArray(material) ? material : [material];
        materials.forEach((item) => {
          const textured = item as THREE.MeshStandardMaterial;
          if (textured.map) textured.map.dispose();
          item.dispose();
        });
      });
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
};
