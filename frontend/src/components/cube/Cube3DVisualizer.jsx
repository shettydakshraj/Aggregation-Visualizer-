import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import styles from './Cube3DVisualizer.module.css';

const CUBE_RAW_DATA = [
  { id: 1, location: 'North District', material: 'Steel', cost: 450000 },
  { id: 2, location: 'North District', material: 'Concrete', cost: 320000 },
  { id: 3, location: 'North District', material: 'Steel', cost: 180000 },
  { id: 4, location: 'Coastal Bay', material: 'Steel', cost: 850000 },
  { id: 5, location: 'Coastal Bay', material: 'Timber', cost: 120000 },
  { id: 6, location: 'Coastal Bay', material: 'Concrete', cost: 510000 },
  { id: 7, location: 'Downtown Metro', material: 'Concrete', cost: 650000 },
  { id: 8, location: 'Downtown Metro', material: 'Glass', cost: 290000 },
];

const LOCATIONS = ['North District', 'Coastal Bay', 'Downtown Metro'];
const MATERIALS = ['Steel', 'Concrete', 'Timber', 'Glass'];

const LOC_COLORS = {
  'North District': 0x4F7FFF,
  'Coastal Bay': 0xC8A96E,
  'Downtown Metro': 0x7FCC8A,
};

export default function Cube3DVisualizer() {
  const mountRef = useRef(null);
  const [aggFunc, setAggFunc] = useState('SUM');
  const [step, setStep] = useState(0); // 0: Base, 1: Loc Subtotals, 2: Mat Subtotals, 3: Grand Total
  const [isPlaying, setIsPlaying] = useState(false);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const dataNodesRef = useRef([]);
  const animTimelineRef = useRef(null);

  // Pre-calculate metrics for all dimensions
  const metrics = useMemo(() => {
    // 1. Location subtotals
    const locMap = {};
    LOCATIONS.forEach(l => {
      const items = CUBE_RAW_DATA.filter(r => r.location === l);
      const total = items.reduce((acc, r) => acc + r.cost, 0);
      locMap[l] = {
        total,
        count: items.length,
        avg: Math.round(total / items.length),
      };
    });

    // 2. Material subtotals (Cross-dimensional!)
    const matMap = {};
    MATERIALS.forEach(m => {
      const items = CUBE_RAW_DATA.filter(r => r.material === m);
      const total = items.reduce((acc, r) => acc + r.cost, 0);
      matMap[m] = {
        total,
        count: items.length,
        avg: items.length > 0 ? Math.round(total / items.length) : 0,
      };
    });

    // 3. Grand total
    const grandSum = CUBE_RAW_DATA.reduce((acc, r) => acc + r.cost, 0);
    const grand = {
      total: grandSum,
      count: CUBE_RAW_DATA.length,
      avg: Math.round(grandSum / CUBE_RAW_DATA.length),
    };

    return { locMap, matMap, grand };
  }, []);

  // Format value with ₹
  const formatVal = (num) => {
    if (aggFunc === 'COUNT') return `${num} items`;
    return `₹${(num / 1000).toFixed(0)}k`;
  };

  // GSAP animation across 4 dimensional cube stages
  const applyCubeStep = (targetStep, duration = 0.9) => {
    if (animTimelineRef.current) animTimelineRef.current.kill();
    const tl = gsap.timeline();
    animTimelineRef.current = tl;

    dataNodesRef.current.forEach((mesh) => {
      const { basePos, locSubPos, matSubPos, grandPos, isPrimaryInLoc, isPrimaryInMat, isMasterGrand } = mesh.userData;

      let targetPos = basePos;
      let targetScale = { x: 1, y: 1, z: 1 };
      let targetOpacity = 1;

      if (targetStep === 0) {
        // Base Detail
        targetPos = basePos;
        targetScale = { x: 1, y: 1, z: 1 };
        targetOpacity = 1;
      } else if (targetStep === 1) {
        // Location Subtotal plane (Z = -4.5)
        targetPos = locSubPos;
        if (isPrimaryInLoc) {
          targetScale = { x: 1.8, y: 1.4, z: 1.8 };
          targetOpacity = 1;
        } else {
          targetScale = { x: 0.01, y: 0.01, z: 0.01 };
          targetOpacity = 0;
        }
      } else if (targetStep === 2) {
        // Material Subtotal plane (X = -5.5) - CUBE EXCLUSIVE
        targetPos = matSubPos;
        if (isPrimaryInMat) {
          targetScale = { x: 1.8, y: 1.4, z: 1.8 };
          targetOpacity = 1;
        } else {
          targetScale = { x: 0.01, y: 0.01, z: 0.01 };
          targetOpacity = 0;
        }
      } else if (targetStep === 3) {
        // Grand Total apex origin
        targetPos = grandPos;
        if (isMasterGrand) {
          targetScale = { x: 2.6, y: 2.0, z: 2.6 };
          targetOpacity = 1;
        } else {
          targetScale = { x: 0.01, y: 0.01, z: 0.01 };
          targetOpacity = 0;
        }
      }

      tl.to(mesh.position, { x: targetPos.x, y: targetPos.y, z: targetPos.z, duration, ease: 'power3.inOut' }, 0);
      tl.to(mesh.scale, { ...targetScale, duration, ease: 'back.out(1.5)' }, 0.1);
      tl.to(mesh.material, { opacity: targetOpacity, transparent: true, duration: duration * 0.75 }, 0.05);
    });
  };

  // Setup Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.025);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(15, 14, 18);
    camera.lookAt(0, 1.5, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));

    const dirLight = new THREE.DirectionalLight(0xbdf0c4, 1.6);
    dirLight.position.set(14, 22, 14);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const greenPoint = new THREE.PointLight(0x7fcc8a, 2.5, 25);
    greenPoint.position.set(-6, 8, -6);
    scene.add(greenPoint);

    // Coordinate Grid
    const grid = new THREE.GridHelper(26, 26, 0x1f2e22, 0x121a14);
    grid.position.y = -0.01;
    scene.add(grid);

    // 3D Data Cube Wireframe Boundary (The OLAP Hypercube)
    const cubeBoxGeo = new THREE.BoxGeometry(11, 7, 10);
    const cubeEdges = new THREE.EdgesGeometry(cubeBoxGeo);
    const cubeWire = new THREE.LineSegments(
      cubeEdges,
      new THREE.LineBasicMaterial({ color: 0x7fcc8a, transparent: true, opacity: 0.25 })
    );
    cubeWire.position.set(0, 3.5, 0);
    scene.add(cubeWire);

    // Dimension Axis indicator arrows
    const axisXGeo = new THREE.CylinderGeometry(0.04, 0.04, 11);
    const axisXMat = new THREE.MeshBasicMaterial({ color: 0x4f7fff });
    const axisX = new THREE.Mesh(axisXGeo, axisXMat);
    axisX.rotation.z = Math.PI / 2;
    axisX.position.set(0, 0.05, 5);
    scene.add(axisX);

    const axisZGeo = new THREE.CylinderGeometry(0.04, 0.04, 10);
    const axisZMat = new THREE.MeshBasicMaterial({ color: 0xc8a96e });
    const axisZ = new THREE.Mesh(axisZGeo, axisZMat);
    axisZ.rotation.x = Math.PI / 2;
    axisZ.position.set(-5.5, 0.05, 0);
    scene.add(axisZ);

    // Orbit drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let spherical = { radius: 26, theta: 0.7, phi: 1.0 };

    const updateCamera = () => {
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 2, 0);
    };
    updateCamera();

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      spherical.theta -= dx * 0.007;
      spherical.phi = Math.max(0.4, Math.min(1.4, spherical.phi - dy * 0.007));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      updateCamera();
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, []);

  // Build 3D data nodes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    dataNodesRef.current.forEach(m => scene.remove(m));
    dataNodesRef.current = [];

    const locSpacingX = [-3.8, 0, 3.8];
    const matSpacingZ = [-3.2, -1.0, 1.2, 3.4];

    CUBE_RAW_DATA.forEach((row, idx) => {
      const locIdx = LOCATIONS.indexOf(row.location);
      const matIdx = MATERIALS.indexOf(row.material);

      const color = LOC_COLORS[row.location];
      const geo = new THREE.BoxGeometry(1.2, 0.7, 1.1);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.4,
        emissive: color,
        emissiveIntensity: 0.25,
      });

      const mesh = new THREE.Mesh(geo, mat);

      // 1. Base detail position (X = loc, Z = mat, Y = 0.6)
      const baseX = locSpacingX[locIdx];
      const baseY = 0.6 + (idx % 2 === 0 ? 0 : 0.7);
      const baseZ = matSpacingZ[matIdx];

      // 2. Location Subtotal plane (collapse along Z to front edge Z = -4.2)
      const locSubX = locSpacingX[locIdx];
      const locSubY = 2.4;
      const locSubZ = -4.2;

      // 3. Material Subtotal plane (collapse along X to left edge X = -5.0) - CUBE ONLY
      const matSubX = -5.0;
      const matSubY = 2.4;
      const matSubZ = matSpacingZ[matIdx];

      // 4. Grand Total origin (center apex)
      const grandX = 0;
      const grandY = 5.6;
      const grandZ = 0;

      // Primary markers to represent consolidated results
      const isPrimaryInLoc = (locIdx === 0 && row.id === 1) || (locIdx === 1 && row.id === 4) || (locIdx === 2 && row.id === 7);
      const isPrimaryInMat = (matIdx === 0 && row.id === 1) || (matIdx === 1 && row.id === 2) || (matIdx === 2 && row.id === 5) || (matIdx === 3 && row.id === 8);
      const isMasterGrand = row.id === 1;

      mesh.userData = {
        row,
        basePos: new THREE.Vector3(baseX, baseY, baseZ),
        locSubPos: new THREE.Vector3(locSubX, locSubY, locSubZ),
        matSubPos: new THREE.Vector3(matSubX, matSubY, matSubZ),
        grandPos: new THREE.Vector3(grandX, grandY, grandZ),
        isPrimaryInLoc,
        isPrimaryInMat,
        isMasterGrand,
      };

      mesh.position.copy(mesh.userData.basePos);
      scene.add(mesh);
      dataNodesRef.current.push(mesh);
    });

    applyCubeStep(step, 0);
  }, [step]);

  const handleStepChange = (newStep) => {
    const clamped = Math.max(0, Math.min(3, newStep));
    setStep(clamped);
    applyCubeStep(clamped, 0.85);
  };

  // Auto-cycle loop
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep(prev => {
          const next = (prev + 1) % 4;
          applyCubeStep(next, 0.85);
          return next;
        });
      }, 2900);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const stepDescriptions = [
    {
      title: 'Stage 1 of 4: Base Multidimensional Points (location, material)',
      desc: 'Records are plotted across the 3D lattice at their discrete Location (X) and Material (Z) intersections.',
    },
    {
      title: 'Stage 2 of 4: Location Subtotals (location, NULL)',
      desc: 'Material dimension collapses to NULL. Records merge along the Z axis into 3 metropolitan location subtotals.',
    },
    {
      title: 'Stage 3 of 4: Material Cross-Subtotals (NULL, material) [CUBE ONLY]',
      desc: 'Location collapses to NULL. Records merge along the X axis into material totals. ROLLUP cannot produce this plane!',
    },
    {
      title: 'Stage 4 of 4: Complete Apex Grand Total (NULL, NULL)',
      desc: 'All axes collapse into a central golden beacon representing the holistic dataset aggregate.',
    },
  ];

  return (
    <section id="viz-section" className={styles.section} aria-label="3D Data Cube Demonstration">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 03 · Spatial 3D Demonstration</p>
          <h2 className="display-lg">The Interactive 3D OLAP Cube</h2>
          <p className="body-lg">
            Drag the 3D canvas to rotate through the hypercube coordinate frame. Step through the 4 stages 
            to witness cross-dimensional collapsing along both spatial axes.
          </p>
        </div>

        <div className={styles.vizCard}>
          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.selectGroup}>
              <label className={styles.controlLabel}>Metric:</label>
              <div className={styles.btnToggleGroup}>
                {['SUM', 'COUNT', 'AVG'].map(fn => (
                  <button
                    key={fn}
                    className={`${styles.toggleBtn} ${aggFunc === fn ? styles.toggleActive : ''}`}
                    onClick={() => setAggFunc(fn)}
                  >
                    {fn}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.playbackControls}>
              <button
                className={styles.actionBtn}
                onClick={() => handleStepChange(step - 1)}
                disabled={step === 0}
              >
                ◀ Step
              </button>
              <button
                className={`${styles.actionBtn} ${styles.playBtn}`}
                onClick={() => setIsPlaying(p => !p)}
              >
                {isPlaying ? '❚❚ Pause' : '▶ Play Hypercube'}
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleStepChange(step + 1)}
                disabled={step === 3}
              >
                Step ▶
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => { setIsPlaying(false); handleStepChange(0); }}
              >
                ↺ Reset
              </button>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className={styles.canvasContainer}>
            <div ref={mountRef} className={styles.canvasMount} />
            <div className={styles.axesGuide}>
              <span style={{ color: '#4F7FFF' }}>— X: Location</span>
              <span style={{ color: '#C8A96E' }}>— Z: Material</span>
              <span style={{ color: '#7FCC8A' }}>— Y: Aggregate</span>
            </div>
            <div className={styles.dragHint}>Drag to rotate 3D view</div>
          </div>

          {/* Stepper Footer */}
          <div className={styles.stepperFooter}>
            <div className={styles.stepDots}>
              {[0, 1, 2, 3].map((s) => (
                <button
                  key={s}
                  className={`${styles.stepDot} ${step === s ? styles.stepDotActive : ''}`}
                  onClick={() => { setIsPlaying(false); handleStepChange(s); }}
                >
                  <span className={styles.dotNum}>{s + 1}</span>
                  <span className={styles.dotLabel}>
                    {s === 0 ? 'Base Detail (A, B)' : s === 1 ? 'Loc Subtotals (A, ∅)' : s === 2 ? 'Mat Subtotals (∅, B)' : 'Grand Total (∅, ∅)'}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.statusBanner}>
              <div className={styles.statusTitle}>{stepDescriptions[step].title}</div>
              <p className={styles.statusDesc}>{stepDescriptions[step].desc}</p>
            </div>

            {/* Readouts of current stage */}
            <div className={styles.readoutRow}>
              {step === 0 && (
                <div className={styles.readoutCard}>
                  <span className={styles.readoutTitle}>Active Grouping Set:</span>
                  <span className={styles.readoutVal}>(location, material) — 8 Detail Combinations</span>
                </div>
              )}
              {step === 1 && (
                <div className={styles.readoutCard}>
                  <span className={styles.readoutTitle}>Active Grouping Set:</span>
                  <span className={styles.readoutVal}>
                    (location, NULL) — North: {formatVal(metrics.locMap['North District'][aggFunc.toLowerCase()])} | Coastal: {formatVal(metrics.locMap['Coastal Bay'][aggFunc.toLowerCase()])} | Downtown: {formatVal(metrics.locMap['Downtown Metro'][aggFunc.toLowerCase()])}
                  </span>
                </div>
              )}
              {step === 2 && (
                <div className={styles.readoutCard} style={{ borderColor: 'rgba(127, 204, 138, 0.4)' }}>
                  <span className={styles.readoutTitle} style={{ color: 'var(--accent-green)' }}>
                    Active Grouping Set (CUBE Exclusive):
                  </span>
                  <span className={styles.readoutVal}>
                    (NULL, material) — Steel: {formatVal(metrics.matMap['Steel'][aggFunc.toLowerCase()])} | Concrete: {formatVal(metrics.matMap['Concrete'][aggFunc.toLowerCase()])} | Timber: {formatVal(metrics.matMap['Timber'][aggFunc.toLowerCase()])} | Glass: {formatVal(metrics.matMap['Glass'][aggFunc.toLowerCase()])}
                  </span>
                </div>
              )}
              {step === 3 && (
                <div className={styles.readoutCard} style={{ borderColor: 'rgba(200, 169, 110, 0.4)' }}>
                  <span className={styles.readoutTitle} style={{ color: 'var(--accent-warm)' }}>
                    Active Grouping Set:
                  </span>
                  <span className={styles.readoutVal} style={{ color: 'var(--accent-warm)', fontWeight: 700 }}>
                    (NULL, NULL) Grand Total: {formatVal(metrics.grand[aggFunc.toLowerCase()])}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
