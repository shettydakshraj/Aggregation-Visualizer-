import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import styles from './Rollup3DVisualizer.module.css';

const ROLLUP_DATA = [
  { id: 1, location: 'North District', material: 'Steel', cost: 450000 },
  { id: 2, location: 'North District', material: 'Concrete', cost: 320000 },
  { id: 3, location: 'North District', material: 'Steel', cost: 180000 },
  { id: 4, location: 'Coastal Bay', material: 'Steel', cost: 850000 },
  { id: 5, location: 'Coastal Bay', material: 'Timber', cost: 120000 },
  { id: 6, location: 'Coastal Bay', material: 'Concrete', cost: 510000 },
  { id: 7, location: 'Downtown Metro', material: 'Concrete', cost: 650000 },
  { id: 8, location: 'Downtown Metro', material: 'Glass', cost: 290000 },
];

const LOCATION_COLORS = {
  'North District': 0x4F7FFF,
  'Coastal Bay': 0xC8A96E,
  'Downtown Metro': 0x7FCC8A,
};

export default function Rollup3DVisualizer() {
  const mountRef = useRef(null);
  const [aggFunc, setAggFunc] = useState('SUM');
  const [step, setStep] = useState(0); // 0: Base Detail, 1: Subtotals, 2: Grand Total
  const [isPlaying, setIsPlaying] = useState(false);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const detailBlocksRef = useRef([]);
  const subtotalBlocksRef = useRef([]);
  const grandTotalBlockRef = useRef(null);
  const animTimelineRef = useRef(null);

  // Compute subtotals and grand totals
  const hierarchyData = useMemo(() => {
    // 1. Group by location
    const locations = ['North District', 'Coastal Bay', 'Downtown Metro'];
    let grandVal = 0;

    const locationGroups = locations.map(loc => {
      const rows = ROLLUP_DATA.filter(r => r.location === loc);
      const costs = rows.map(r => r.cost);
      let subtotalVal = 0;
      let subtotalStr = '';

      if (aggFunc === 'SUM') {
        subtotalVal = costs.reduce((a, b) => a + b, 0);
        subtotalStr = `₹${(subtotalVal / 1000).toFixed(0)}k`;
      } else if (aggFunc === 'COUNT') {
        subtotalVal = rows.length;
        subtotalStr = `${subtotalVal} items`;
      } else if (aggFunc === 'AVG') {
        subtotalVal = costs.reduce((a, b) => a + b, 0) / rows.length;
        subtotalStr = `₹${(subtotalVal / 1000).toFixed(1)}k`;
      }

      grandVal += (aggFunc === 'SUM' ? subtotalVal : aggFunc === 'COUNT' ? rows.length : subtotalVal);

      return {
        location: loc,
        rows,
        subtotalVal,
        subtotalStr,
        color: LOCATION_COLORS[loc],
      };
    });

    let grandStr = '';
    if (aggFunc === 'SUM') {
      grandStr = `₹${(grandVal / 1000).toFixed(0)}k`;
    } else if (aggFunc === 'COUNT') {
      grandStr = `${ROLLUP_DATA.length} total rows`;
    } else if (aggFunc === 'AVG') {
      const allCosts = ROLLUP_DATA.map(r => r.cost);
      const avg = allCosts.reduce((a, b) => a + b, 0) / allCosts.length;
      grandStr = `₹${(avg / 1000).toFixed(1)}k`;
    }

    return { locationGroups, grandStr };
  }, [aggFunc]);



  // GSAP position application
  const applyRollupStep = (targetStep, duration = 0.9) => {
    if (animTimelineRef.current) animTimelineRef.current.kill();
    const tl = gsap.timeline();
    animTimelineRef.current = tl;

    // 1. Detail blocks (Tier 1)
    detailBlocksRef.current.forEach(mesh => {
      const { basePos, subPos, grandPos } = mesh.userData;
      let targetPos = basePos;
      let targetOpacity = 1;
      let targetScale = { x: 1, y: 1, z: 1 };

      if (targetStep === 1) {
        targetPos = subPos;
        targetOpacity = 0.45;
        targetScale = { x: 0.8, y: 0.8, z: 0.8 };
      } else if (targetStep === 2) {
        targetPos = grandPos;
        targetOpacity = 0.15;
        targetScale = { x: 0.4, y: 0.4, z: 0.4 };
      }

      tl.to(mesh.position, { x: targetPos.x, y: targetPos.y, z: targetPos.z, duration, ease: 'power3.inOut' }, 0);
      tl.to(mesh.scale, { ...targetScale, duration, ease: 'power2.out' }, 0);
      tl.to(mesh.material, { opacity: targetOpacity, transparent: true, duration }, 0);
    });

    // 2. Subtotal blocks (Tier 2)
    subtotalBlocksRef.current.forEach(mesh => {
      const { subPos, grandPos } = mesh.userData;
      let targetPos = subPos;
      let targetScale = { x: 1, y: 1, z: 1 };
      let targetOpacity = 0;

      if (targetStep === 0) {
        targetOpacity = 0;
        targetScale = { x: 0.1, y: 0.1, z: 0.1 };
      } else if (targetStep === 1) {
        targetOpacity = 1;
        targetScale = { x: 1.4, y: 1.2, z: 1.4 };
      } else if (targetStep === 2) {
        targetPos = grandPos;
        targetOpacity = 0.5;
        targetScale = { x: 0.8, y: 0.8, z: 0.8 };
      }

      tl.to(mesh.position, { x: targetPos.x, y: targetPos.y, z: targetPos.z, duration, ease: 'power3.inOut' }, 0.05);
      tl.to(mesh.scale, { ...targetScale, duration, ease: 'back.out(1.5)' }, 0.1);
      tl.to(mesh.material, { opacity: targetOpacity, transparent: true, duration: duration * 0.7 }, 0.05);
    });

    // 3. Grand total apex block (Tier 3)
    if (grandTotalBlockRef.current) {
      const mesh = grandTotalBlockRef.current;
      let targetOpacity = 0;
      let targetScale = { x: 0.01, y: 0.01, z: 0.01 };

      if (targetStep === 2) {
        targetOpacity = 1;
        targetScale = { x: 2.2, y: 1.8, z: 2.2 };
      }

      tl.to(mesh.scale, { ...targetScale, duration, ease: 'back.out(1.6)' }, 0.15);
      tl.to(mesh.material, { opacity: targetOpacity, transparent: true, duration: duration * 0.8 }, 0.1);
    }
  };

  // Setup Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.03);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 13, 19);
    camera.lookAt(0, 2, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const goldLight = new THREE.DirectionalLight(0xffdf9e, 1.8);
    goldLight.position.set(12, 24, 12);
    goldLight.castShadow = true;
    scene.add(goldLight);

    const apexPointLight = new THREE.PointLight(0xc8a96e, 3, 20);
    apexPointLight.position.set(0, 8, 0);
    scene.add(apexPointLight);

    // Floor grid
    const grid = new THREE.GridHelper(32, 32, 0x2d2b24, 0x161514);
    grid.position.y = -0.01;
    scene.add(grid);

    // 3-Tier Architectural Platforms (Stepped Pyramid)
    // Tier 1 Base Platform
    const t1Geo = new THREE.BoxGeometry(16, 0.2, 8);
    const t1Mat = new THREE.MeshStandardMaterial({ color: 0x14141c, roughness: 0.8 });
    const t1Mesh = new THREE.Mesh(t1Geo, t1Mat);
    t1Mesh.position.set(0, 0.1, 0);
    scene.add(t1Mesh);

    // Tier 2 Mid Shelf (Elevated)
    const t2Geo = new THREE.BoxGeometry(12, 0.3, 5.5);
    const t2Mat = new THREE.MeshStandardMaterial({ color: 0x1c1a16, roughness: 0.7 });
    const t2Mesh = new THREE.Mesh(t2Geo, t2Mat);
    t2Mesh.position.set(0, 2.2, 0);
    scene.add(t2Mesh);

    // Tier 3 Apex Podium (Top)
    const t3Geo = new THREE.BoxGeometry(4.5, 0.4, 4.5);
    const t3Mat = new THREE.MeshStandardMaterial({ color: 0x282318, roughness: 0.5, metalness: 0.5 });
    const t3Mesh = new THREE.Mesh(t3Geo, t3Mat);
    t3Mesh.position.set(0, 4.8, 0);
    scene.add(t3Mesh);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let spherical = { radius: 23, theta: 0, phi: 1.05 };

    const updateCamera = () => {
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 2.2, 0);
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

  // Re-build 3D data blocks when hierarchyData changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    detailBlocksRef.current.forEach(m => scene.remove(m));
    detailBlocksRef.current = [];

    subtotalBlocksRef.current.forEach(m => scene.remove(m));
    subtotalBlocksRef.current = [];

    if (grandTotalBlockRef.current) {
      scene.remove(grandTotalBlockRef.current);
      grandTotalBlockRef.current = null;
    }

    const { locationGroups } = hierarchyData;
    const locPositionsX = [-5.2, 0, 5.2];

    // 1. Create detail blocks on Tier 1
    ROLLUP_DATA.forEach((row) => {
      const locIdx = locationGroups.findIndex(g => g.location === row.location);
      const locGrp = locationGroups[locIdx];
      const itemIdx = locGrp.rows.findIndex(r => r.id === row.id);

      const colHex = locGrp.color;
      const geo = new THREE.BoxGeometry(1.2, 0.65, 1.0);
      const mat = new THREE.MeshStandardMaterial({
        color: colHex,
        roughness: 0.3,
        metalness: 0.3,
        emissive: colHex,
        emissiveIntensity: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);

      // Base position (Tier 1: Y = 0.55)
      const baseX = locPositionsX[locIdx] + (itemIdx === 0 ? -1.0 : itemIdx === 1 ? 0 : 1.0);
      const baseY = 0.55;
      const baseZ = 2.2;

      // Subtotal target position (Tier 2: Y = 2.8)
      const subX = locPositionsX[locIdx];
      const subY = 2.8;
      const subZ = 0;

      // Grand total target position (Tier 3: Y = 5.5)
      const grandX = 0;
      const grandY = 5.5;
      const grandZ = 0;

      mesh.userData = {
        row,
        basePos: new THREE.Vector3(baseX, baseY, baseZ),
        subPos: new THREE.Vector3(subX, subY, subZ),
        grandPos: new THREE.Vector3(grandX, grandY, grandZ),
      };

      mesh.position.copy(mesh.userData.basePos);
      scene.add(mesh);
      detailBlocksRef.current.push(mesh);
    });

    // 2. Create subtotal blocks on Tier 2
    locationGroups.forEach((grp, idx) => {
      const geo = new THREE.BoxGeometry(2.2, 1.1, 1.8);
      const mat = new THREE.MeshStandardMaterial({
        color: grp.color,
        roughness: 0.2,
        metalness: 0.5,
        emissive: grp.color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const subX = locPositionsX[idx];
      const subY = 2.9;
      const subZ = 0;

      const grandX = 0;
      const grandY = 5.5;
      const grandZ = 0;

      mesh.userData = {
        grp,
        subPos: new THREE.Vector3(subX, subY, subZ),
        grandPos: new THREE.Vector3(grandX, grandY, grandZ),
      };

      mesh.position.copy(mesh.userData.subPos);
      mesh.scale.set(0.1, 0.1, 0.1);
      scene.add(mesh);
      subtotalBlocksRef.current.push(mesh);
    });

    // 3. Create Grand Total Block on Tier 3
    const gGeo = new THREE.BoxGeometry(2.6, 1.6, 2.6);
    const gMat = new THREE.MeshStandardMaterial({
      color: 0xC8A96E,
      roughness: 0.15,
      metalness: 0.7,
      emissive: 0xC8A96E,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0,
    });
    const gMesh = new THREE.Mesh(gGeo, gMat);
    gMesh.position.set(0, 5.7, 0);
    gMesh.scale.set(0.01, 0.01, 0.01);
    scene.add(gMesh);
    grandTotalBlockRef.current = gMesh;

    applyRollupStep(step, 0);
  }, [hierarchyData, step]);

  const handleStepChange = (newStep) => {
    const clamped = Math.max(0, Math.min(2, newStep));
    setStep(clamped);
    applyRollupStep(clamped, 0.85);
  };

  // Auto-play loop
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep(prev => {
          const next = (prev + 1) % 3;
          applyRollupStep(next, 0.85);
          return next;
        });
      }, 2800);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const stepDescriptions = [
    {
      title: 'Tier 1: Base Granular Groups (location, material)',
      desc: 'Records maintain discrete grouping by both location and material on the base platform.',
    },
    {
      title: 'Tier 2: Location Subtotal Rollup (location, NULL)',
      desc: 'Material is rolled up to NULL. Records consolidate on Tier 2 shelves to form 3 location subtotals.',
    },
    {
      title: 'Tier 3: Apex Grand Total (NULL, NULL)',
      desc: 'All locations roll up into a single Grand Total block at the apex podium, summarizing the full dataset.',
    },
  ];

  return (
    <section id="viz-section" className={styles.section} aria-label="3D Hierarchical Demonstration">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 03 · Spatial 3D Demonstration</p>
          <h2 className="display-lg">The Subtotal Pyramid in Action</h2>
          <p className="body-lg">
            Witness hierarchical aggregation in 3D space. Watch base records climb the stepped pyramid to compute 
            location subtotals and the culminating grand total.
          </p>
        </div>

        <div className={styles.vizCard}>
          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.selectGroup}>
              <label className={styles.controlLabel}>Aggregate Function:</label>
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
                {isPlaying ? '❚❚ Pause' : '▶ Play Hierarchy'}
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleStepChange(step + 1)}
                disabled={step === 2}
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
            <div className={styles.dragHint}>Drag to orbit 3D view</div>
          </div>

          {/* Stepper Footer */}
          <div className={styles.stepperFooter}>
            <div className={styles.stepDots}>
              {[0, 1, 2].map((s) => (
                <button
                  key={s}
                  className={`${styles.stepDot} ${step === s ? styles.stepDotActive : ''}`}
                  onClick={() => { setIsPlaying(false); handleStepChange(s); }}
                >
                  <span className={styles.dotNum}>{s + 1}</span>
                  <span className={styles.dotLabel}>
                    {s === 0 ? 'Tier 1: Base (A, B)' : s === 1 ? 'Tier 2: Subtotals (A, NULL)' : 'Tier 3: Apex Grand Total (NULL, NULL)'}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.statusBanner}>
              <div className={styles.statusTitle}>{stepDescriptions[step].title}</div>
              <p className={styles.statusDesc}>{stepDescriptions[step].desc}</p>
            </div>

            {/* Live Subtotal Readouts */}
            <div className={styles.readoutGrid}>
              <div className={styles.readoutCard}>
                <span className={styles.readoutLabel}>Tier 2 Location Subtotals:</span>
                <div className={styles.readoutPills}>
                  {hierarchyData.locationGroups.map(g => (
                    <div key={g.location} className={styles.subtotalPill}>
                      <span style={{ color: `#${g.color.toString(16).padStart(6, '0')}` }}>{g.location}:</span>
                      <strong>{step >= 1 ? g.subtotalStr : '...'}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.readoutCard} style={{ borderColor: 'rgba(200, 169, 110, 0.4)' }}>
                <span className={styles.readoutLabel}>Tier 3 Grand Total:</span>
                <div className={styles.grandTotalVal}>
                  {step === 2 ? hierarchyData.grandStr : '...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
