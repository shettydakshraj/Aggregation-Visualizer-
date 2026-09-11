import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import styles from './GroupBy3DVisualizer.module.css';

const RAW_DATA = [
  { id: 1, project: 'Metro Rail', material: 'Steel', location: 'North District', cost: 450000 },
  { id: 2, project: 'Metro Rail', material: 'Concrete', location: 'North District', cost: 320000 },
  { id: 3, project: 'Harbour Bridge', material: 'Steel', location: 'Coastal Bay', cost: 850000 },
  { id: 4, project: 'Harbour Bridge', material: 'Timber', location: 'Coastal Bay', cost: 120000 },
  { id: 5, project: 'Sky Tower', material: 'Concrete', location: 'Downtown Metro', cost: 650000 },
  { id: 6, project: 'Sky Tower', material: 'Glass', location: 'Downtown Metro', cost: 290000 },
  { id: 7, project: 'Solar Park', material: 'Steel', location: 'North District', cost: 180000 },
  { id: 8, project: 'Coastal Highway', material: 'Concrete', location: 'Coastal Bay', cost: 510000 },
];

const COLOR_PALETTE = {
  // By location
  'North District': 0x4F7FFF,
  'Coastal Bay': 0xC8A96E,
  'Downtown Metro': 0x7FCC8A,
  // By material
  'Steel': 0x4F7FFF,
  'Concrete': 0xC8A96E,
  'Timber': 0x7FCC8A,
  'Glass': 0xFF7F8A,
  // By project
  'Metro Rail': 0x4F7FFF,
  'Harbour Bridge': 0xC8A96E,
  'Sky Tower': 0x7FCC8A,
  'Solar Park': 0x9D65C9,
  'Coastal Highway': 0x5DADE2,
};

export default function GroupBy3DVisualizer() {
  const mountRef = useRef(null);
  const [groupByCol, setGroupByCol] = useState('location');
  const [aggFunc, setAggFunc] = useState('SUM');
  const [step, setStep] = useState(0); // 0: Raw, 1: Grouped, 2: Aggregated, 3: Final
  const [isPlaying, setIsPlaying] = useState(false);

  // References to keep Three.js scene objects
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const blocksRef = useRef([]);
  const groupPlatformsRef = useRef([]);
  const animTimelineRef = useRef(null);
  const labelSpritesRef = useRef([]);

  // Calculate grouped categories and their metrics
  const groupSummary = useMemo(() => {
    const map = {};
    RAW_DATA.forEach(row => {
      const key = row[groupByCol];
      if (!map[key]) map[key] = [];
      map[key].push(row);
    });

    const groups = Object.keys(map).map((key, idx) => {
      const items = map[key];
      const costs = items.map(r => r.cost);
      let metricVal = 0;
      let metricStr = '';

      if (aggFunc === 'SUM') {
        metricVal = costs.reduce((a, b) => a + b, 0);
        metricStr = `₹${(metricVal / 1000).toFixed(0)}k`;
      } else if (aggFunc === 'COUNT') {
        metricVal = items.length;
        metricStr = `${metricVal} rows`;
      } else if (aggFunc === 'AVG') {
        metricVal = costs.reduce((a, b) => a + b, 0) / items.length;
        metricStr = `₹${(metricVal / 1000).toFixed(1)}k`;
      } else if (aggFunc === 'MIN') {
        metricVal = Math.min(...costs);
        metricStr = `₹${(metricVal / 1000).toFixed(0)}k`;
      } else if (aggFunc === 'MAX') {
        metricVal = Math.max(...costs);
        metricStr = `₹${(metricVal / 1000).toFixed(0)}k`;
      }

      return {
        key,
        items,
        metricVal,
        metricStr,
        color: COLOR_PALETTE[key] || 0x4F7FFF,
        groupIndex: idx,
      };
    });

    return groups;
  }, [groupByCol, aggFunc]);

  // Create text sprite helper
  const createTextSprite = (text, color = '#FFFFFF', subtext = '') => {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 110;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(17, 17, 24, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(6, 6, 308, 98, 8);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, 160, 48);

    if (subtext) {
      ctx.font = '20px JetBrains Mono, monospace';
      ctx.fillStyle = '#A0A0B8';
      ctx.fillText(subtext, 160, 82);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(2.4, 0.8, 1);
    return sprite;
  };

  // Setup Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 480;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.035);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 11, 16);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x4f7fff, 2, 25);
    blueLight.position.set(-8, 5, 2);
    scene.add(blueLight);

    const amberLight = new THREE.PointLight(0xc8a96e, 1.5, 25);
    amberLight.position.set(8, 5, 2);
    scene.add(amberLight);

    // 5. Ground Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x222233, 0x14141e);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Interactive dragging (orbit rotation)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let spherical = { radius: 19, theta: 0, phi: 0.95 };

    const updateCameraPos = () => {
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 0.5, 0);
    };
    updateCameraPos();

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
      spherical.phi = Math.max(0.3, Math.min(1.4, spherical.phi - dy * 0.007));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      updateCameraPos();
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Render loop
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      camera.aspect = newW / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, []);

  // Handle stepping animation with GSAP
  const applyStepPositions = (targetStep, duration = 0.9) => {
    if (animTimelineRef.current) animTimelineRef.current.kill();
    const tl = gsap.timeline();
    animTimelineRef.current = tl;

    blocksRef.current.forEach((mesh) => {
      const { rawPos, groupedPos, aggPos, finalPos, itemIdxInGroup } = mesh.userData;

      let targetPos;
      let targetScale = { x: 1, y: 1, z: 1 };
      let targetOpacity = 1;

      if (targetStep === 0) {
        targetPos = rawPos;
      } else if (targetStep === 1) {
        targetPos = groupedPos;
      } else if (targetStep === 2) {
        targetPos = aggPos;
      } else if (targetStep === 3) {
        // In final step: first item in group expands to represent the aggregate, others fade
        if (itemIdxInGroup === 0) {
          targetPos = finalPos;
          targetScale = { x: 2.2, y: 1.1, z: 1.8 };
        } else {
          targetPos = aggPos;
          targetScale = { x: 0.01, y: 0.01, z: 0.01 };
          targetOpacity = 0;
        }
      }

      tl.to(
        mesh.position,
        {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z,
          duration,
          ease: 'power3.inOut',
        },
        0
      );

      tl.to(
        mesh.scale,
        {
          x: targetScale.x,
          y: targetScale.y,
          z: targetScale.z,
          duration,
          ease: 'back.out(1.4)',
        },
        0.1
      );

      tl.to(
        mesh.material,
        {
          opacity: targetOpacity,
          transparent: true,
          duration: duration * 0.8,
        },
        0
      );
    });
  };

  // Re-build 3D objects when groupByCol, aggFunc, or groupSummary changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clean up old blocks, platforms, sprites
    blocksRef.current.forEach(mesh => scene.remove(mesh));
    blocksRef.current = [];

    groupPlatformsRef.current.forEach(mesh => scene.remove(mesh));
    groupPlatformsRef.current = [];

    labelSpritesRef.current.forEach(sprite => scene.remove(sprite));
    labelSpritesRef.current = [];

    // Create 3D block for each raw record
    const numGroups = groupSummary.length;
    const groupSpacing = 4.2;
    const startX = -((numGroups - 1) * groupSpacing) / 2;

    // Create platforms for each group
    groupSummary.forEach((grp, gIdx) => {
      const pX = startX + gIdx * groupSpacing;
      const platGeo = new THREE.BoxGeometry(3.6, 0.15, 4.4);
      const platMat = new THREE.MeshStandardMaterial({
        color: 0x161622,
        roughness: 0.8,
        metalness: 0.2,
      });
      const platform = new THREE.Mesh(platGeo, platMat);
      platform.position.set(pX, 0.08, 0);
      platform.receiveShadow = true;
      scene.add(platform);
      groupPlatformsRef.current.push(platform);

      // Platform outline wireframe
      const edges = new THREE.EdgesGeometry(platGeo);
      const lineMat = new THREE.LineBasicMaterial({ color: grp.color, transparent: true, opacity: 0.35 });
      const line = new THREE.LineSegments(edges, lineMat);
      platform.add(line);

      // Platform label sprite
      const sprite = createTextSprite(grp.key, `#${grp.color.toString(16).padStart(6, '0')}`, `Group #${gIdx + 1}`);
      sprite.position.set(pX, 0.4, 2.7);
      scene.add(sprite);
      labelSpritesRef.current.push(sprite);
    });

    // Create data blocks
    RAW_DATA.forEach((row, rIdx) => {
      const key = row[groupByCol];
      const grp = groupSummary.find(g => g.key === key);
      const gIdx = grp ? grp.groupIndex : 0;
      const itemIdxInGroup = grp ? grp.items.findIndex(it => it.id === row.id) : 0;

      // Color from category
      const colHex = COLOR_PALETTE[key] || 0x4F7FFF;
      const geo = new THREE.BoxGeometry(1.3, 0.7, 1.1);
      const mat = new THREE.MeshStandardMaterial({
        color: colHex,
        roughness: 0.25,
        metalness: 0.4,
        emissive: colHex,
        emissiveIntensity: 0.15,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Border outline for high visual fidelity
      const edges = new THREE.EdgesGeometry(geo);
      const wire = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 }));
      mesh.add(wire);

      // Raw position: sequentially in a line (Z = 5)
      const rawX = -6.2 + (rIdx * 1.75);
      const rawY = 0.45;
      const rawZ = 4.8;

      // Grouped position: in their category platform
      const groupCenterX = startX + gIdx * groupSpacing;
      const rowInGroupX = groupCenterX + ((itemIdxInGroup % 2 === 0 ? -0.8 : 0.8) * 0.75);
      const rowInGroupZ = -0.8 + Math.floor(itemIdxInGroup / 2) * 1.5;
      const rowInGroupY = 0.45;

      // Aggregated position: collapsing to group center
      const aggX = groupCenterX;
      const aggY = 0.45 + (itemIdxInGroup * 0.4);
      const aggZ = 0;

      // Final position: single merged block
      const finalX = groupCenterX;
      const finalY = 0.6;
      const finalZ = 0;

      mesh.userData = {
        row,
        key,
        gIdx,
        itemIdxInGroup,
        rawPos: new THREE.Vector3(rawX, rawY, rawZ),
        groupedPos: new THREE.Vector3(rowInGroupX, rowInGroupY, rowInGroupZ),
        aggPos: new THREE.Vector3(aggX, aggY, aggZ),
        finalPos: new THREE.Vector3(finalX, finalY, finalZ),
        originalScale: new THREE.Vector3(1, 1, 1),
      };

      mesh.position.copy(mesh.userData.rawPos);
      scene.add(mesh);
      blocksRef.current.push(mesh);
    });

    // Update positions based on current step
    applyStepPositions(step, 0);
  }, [groupByCol, aggFunc, groupSummary, step]);

  const handleStepChange = (newStep) => {
    const clamped = Math.max(0, Math.min(3, newStep));
    setStep(clamped);
    applyStepPositions(clamped, 0.8);
  };

  // Auto-play loop
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep(prev => {
          const next = (prev + 1) % 4;
          applyStepPositions(next, 0.8);
          return next;
        });
      }, 2600);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const stepDescriptions = [
    {
      title: 'Step 1 of 4: Raw Table Records',
      desc: 'The database engine scans the unorganized raw rows in the physical table layout prior to grouping.',
    },
    {
      title: 'Step 2 of 4: Partitioning into Groups',
      desc: `Rows with identical "${groupByCol}" values migrate into dedicated category buckets in memory.`,
    },
    {
      title: 'Step 3 of 4: Mathematical Accumulation',
      desc: `The ${aggFunc}() accumulator evaluates the values within each partition block.`,
    },
    {
      title: `Step 4 of 4: Consolidated ${aggFunc} Output`,
      desc: `Each group collapses into a single distinct row with its computed ${aggFunc} result.`,
    },
  ];

  return (
    <section id="viz-section" className={styles.section} aria-label="3D Demonstration">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 03 · Spatial 3D Demonstration</p>
          <h2 className="display-lg">Watch Rows Collapse in Real Time</h2>
          <p className="body-lg">
            Interact with this 3D demonstration. Drag to rotate the 3D camera. Select grouping keys and aggregate functions to observe 
            how database rows are partitioned and synthesized.
          </p>
        </div>

        <div className={styles.vizCard}>
          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <div className={styles.selectGroup}>
              <label className={styles.controlLabel}>Group By Column:</label>
              <div className={styles.btnToggleGroup}>
                {['location', 'material', 'project'].map(col => (
                  <button
                    key={col}
                    className={`${styles.toggleBtn} ${groupByCol === col ? styles.toggleActive : ''}`}
                    onClick={() => { setGroupByCol(col); setStep(0); }}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.selectGroup}>
              <label className={styles.controlLabel}>Aggregate Function:</label>
              <div className={styles.btnToggleGroup}>
                {['SUM', 'COUNT', 'AVG', 'MIN', 'MAX'].map(fn => (
                  <button
                    key={fn}
                    className={`${styles.toggleBtn} ${aggFunc === fn ? styles.toggleActive : ''}`}
                    onClick={() => { setAggFunc(fn); }}
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
                title="Previous step"
              >
                ◀ Step
              </button>
              <button
                className={`${styles.actionBtn} ${styles.playBtn}`}
                onClick={() => setIsPlaying(p => !p)}
              >
                {isPlaying ? '❚❚ Pause' : '▶ Play Auto'}
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleStepChange(step + 1)}
                disabled={step === 3}
                title="Next step"
              >
                Step ▶
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => { setIsPlaying(false); handleStepChange(0); }}
                title="Reset to raw table"
              >
                ↺ Reset
              </button>
            </div>
          </div>

          {/* 3D Canvas Mount */}
          <div className={styles.canvasContainer}>
            <div ref={mountRef} className={styles.canvasMount} />
            <div className={styles.dragHint}>Drag to rotate 3D view</div>
          </div>

          {/* Stepper Progress Bar */}
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
                    {s === 0 ? 'Raw Rows' : s === 1 ? 'Partition' : s === 2 ? 'Aggregate' : 'Final Result'}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.statusBanner}>
              <div className={styles.statusTitle}>{stepDescriptions[step].title}</div>
              <p className={styles.statusDesc}>{stepDescriptions[step].desc}</p>
            </div>

            {/* Live Aggregate Metrics Preview */}
            <div className={styles.metricsSummary}>
              <span className={styles.metricsTitle}>Computed {aggFunc} per Group:</span>
              <div className={styles.metricsRow}>
                {groupSummary.map(g => (
                  <div key={g.key} className={styles.metricItem}>
                    <span className={styles.metricKey} style={{ color: `#${g.color.toString(16).padStart(6, '0')}` }}>
                      {g.key}
                    </span>
                    <span className={styles.metricVal}>{step >= 2 ? g.metricStr : '...'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
