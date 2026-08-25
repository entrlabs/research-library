import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('#library-map');
if (canvas) {
  const shell = canvas.closest('.research-map-shell');
  const tooltip = document.querySelector('#library-map-tooltip');
  const hint = shell.querySelector('.research-map-hint');
  const roman = ['I', 'II', 'III', 'IV', 'V'];
  const anchors = ['foundations-theory', 'reviews-meta-analyses', 'design-reflection', 'reciprocity-justice', 'outcomes-institutional-practice'];
  const domains = [
    { name: 'Foundations & Theory', count: 5, color: 0x2E5BD0 },
    { name: 'Reviews & Meta-Analyses', count: 4, color: 0x4A74E0 },
    { name: 'Design & Reflection', count: 5, color: 0x5B8CFF },
    { name: 'Reciprocity & Justice', count: 5, color: 0x8FB0FF },
    { name: 'Outcomes & Institutional Practice', count: 6, color: 0xB7C8FF }
  ];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const goToDomain = (i) => { window.location.href = '/collections/entrsl/#' + anchors[i]; };

  if (hint) hint.textContent = isTouch ? 'Tap a domain to open its collection' : 'Drag to rotate \u00b7 hover or click a domain to open its collection';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 7.4, 4.3);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minPolarAngle = 0.25;
  controls.maxPolarAngle = 1.3;
  controls.autoRotate = !reduced;
  controls.autoRotateSpeed = 0.55;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  if (isTouch) controls.enabled = false; // keep page scroll free on touch; autoRotate still animates

  const root = new THREE.Group();
  scene.add(root);

  const centerGeo = new THREE.IcosahedronGeometry(0.36, 1);
  const centerMat = new THREE.MeshBasicMaterial({ color: 0x2E5BD0, transparent: true });
  const center = new THREE.Mesh(centerGeo, centerMat);
  root.add(center);
  const centerWire = new THREE.LineSegments(
    new THREE.WireframeGeometry(centerGeo),
    new THREE.LineBasicMaterial({ color: 0x9DB8FF, transparent: true })
  );
  center.add(centerWire);

  const totalPapers = domains.reduce((sum, d) => sum + d.count, 0);
  const centerLabel = document.createElement('div');
  centerLabel.className = 'map-node-label map-node-label--center';
  centerLabel.innerHTML = '<b>EntrSL</b><small>' + totalPapers + ' papers</small>';
  centerLabel.title = 'EntrSL Research Collection \u00b7 ' + totalPapers + ' papers total';
  shell.appendChild(centerLabel);

  const clusterRadius = 3.1;
  const hitTargets = [];
  const clusterGroups = [];
  const labelEls = [];

  const groundPts = [];
  for (let i = 0; i <= 64; i += 1) {
    const a = (i / 64) * Math.PI * 2;
    groundPts.push(new THREE.Vector3(Math.cos(a) * clusterRadius * 1.28, 0, Math.sin(a) * clusterRadius * 1.28));
  }
  const groundRing = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(groundPts),
    new THREE.LineBasicMaterial({ color: 0x5B8CFF, transparent: true, opacity: 0.16 })
  );
  root.add(groundRing);

  const makeLine = (a, b, color, opacity) => {
    const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    mat.userData.baseOpacity = opacity;
    return new THREE.Line(geo, mat);
  };

  domains.forEach((domain, di) => {
    const angle = (di / domains.length) * Math.PI * 2 - Math.PI / 2;
    const cx = Math.cos(angle) * clusterRadius;
    const cz = Math.sin(angle) * clusterRadius;
    const cy = Math.sin(di * 1.7) * 0.4;
    const clusterGroup = new THREE.Group();
    clusterGroup.position.set(cx, cy, cz);
    root.add(clusterGroup);
    clusterGroups.push(clusterGroup);

    root.add(makeLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(cx, cy, cz), 0x5B8CFF, 0.62));

    const clusterCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.24, 0),
      new THREE.MeshBasicMaterial({ color: domain.color, transparent: true })
    );
    clusterCore.material.userData.baseOpacity = 1;
    clusterCore.userData = { domainIndex: di, domainName: domain.name, domainCount: domain.count, isCluster: true };
    clusterGroup.add(clusterCore);
    hitTargets.push(clusterCore);

    for (let p = 0; p < domain.count; p += 1) {
      const pa = (p / domain.count) * Math.PI * 2 + di * 0.6;
      const orbit = 0.62 + (p % 2) * 0.22;
      const px = Math.cos(pa) * orbit;
      const py = Math.sin(pa * 1.3) * 0.28;
      const pz = Math.sin(pa) * orbit;
      const paperMat = new THREE.MeshBasicMaterial({ color: 0xDCE5FB, transparent: true });
      paperMat.userData.baseOpacity = 1;
      const paperMesh = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 12), paperMat);
      paperMesh.position.set(px, py, pz);
      paperMesh.userData = { domainIndex: di, domainName: domain.name, domainCount: domain.count };
      clusterGroup.add(paperMesh);
      hitTargets.push(paperMesh);
      clusterGroup.add(makeLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(px, py, pz), 0x9DB8FF, 0.34));
    }

    const label = document.createElement('div');
    label.className = 'map-node-label';
    label.innerHTML = '<b>' + roman[di] + '</b><small>' + domain.count + '</small>';
    label.title = domain.name + ' \u00b7 ' + domain.count + ' papers';
    label.addEventListener('pointerenter', () => setActiveDomain(di));
    label.addEventListener('pointerleave', () => setActiveDomain(-1));
    label.addEventListener('click', () => goToDomain(di));
    shell.appendChild(label);
    labelEls.push(label);
  });

  let shellRect = { width: 0, height: 0 };
  function resize() {
    shellRect = shell.getBoundingClientRect();
    if (shellRect.width < 1 || shellRect.height < 1) return;
    renderer.setSize(shellRect.width, shellRect.height, false);
    camera.aspect = shellRect.width / shellRect.height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  const projected = new THREE.Vector3();
  function updateLabels() {
    clusterGroups.forEach((g, i) => {
      g.getWorldPosition(projected);
      projected.project(camera);
      const x = (projected.x * 0.5 + 0.5) * shellRect.width;
      const y = (-projected.y * 0.5 + 0.5) * shellRect.height;
      labelEls[i].style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -150%)';
    });
    const cx = (0.5) * shellRect.width, cy = (0.5) * shellRect.height;
    centerLabel.style.transform = 'translate(' + cx + 'px, ' + cy + 'px) translate(-50%, -50%)';
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = null;
  let activeDomain = -1;

  function setActiveDomain(index) {
    activeDomain = index;
    clusterGroups.forEach((g, i) => {
      const dim = activeDomain >= 0 && activeDomain !== i;
      g.traverse((obj) => {
        if (obj.material) obj.material.opacity = dim ? 0.12 : (obj.material.userData.baseOpacity ?? 1);
      });
      labelEls[i].classList.toggle('is-active', i === activeDomain);
      labelEls[i].classList.toggle('is-dim', dim);
    });
  }

  function setPointerFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
  }

  canvas.addEventListener('pointermove', (event) => {
    setPointerFromEvent(event);
    const hits = raycaster.intersectObjects(hitTargets);
    if (hits.length) {
      const mesh = hits[0].object;
      if (hovered !== mesh) {
        if (hovered) hovered.scale.setScalar(1);
        hovered = mesh;
        hovered.scale.setScalar(mesh.userData.isCluster ? 1.35 : 1.8);
      }
      canvas.style.cursor = 'pointer';
      if (tooltip) {
        const rect = canvas.getBoundingClientRect();
        tooltip.textContent = mesh.userData.domainName + ' \u00b7 ' + mesh.userData.domainCount + ' papers \u00b7 click to open';
        tooltip.style.left = (event.clientX - rect.left + 16) + 'px';
        tooltip.style.top = (event.clientY - rect.top + 16) + 'px';
        tooltip.setAttribute('aria-hidden', 'false');
      }
    } else {
      if (hovered) { hovered.scale.setScalar(1); hovered = null; }
      canvas.style.cursor = 'default';
      if (tooltip) tooltip.setAttribute('aria-hidden', 'true');
    }
  });
  canvas.addEventListener('pointerleave', () => {
    if (hovered) { hovered.scale.setScalar(1); hovered = null; }
    if (tooltip) tooltip.setAttribute('aria-hidden', 'true');
  });
  canvas.addEventListener('click', (event) => {
    setPointerFromEvent(event);
    const hits = raycaster.intersectObjects(hitTargets);
    if (hits.length) goToDomain(hits[0].object.userData.domainIndex);
  });

  let idleTimer;
  canvas.addEventListener('pointerdown', () => {
    controls.autoRotate = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { if (!reduced) controls.autoRotate = true; }, 3000);
  });

  document.querySelectorAll('[data-map-domain]').forEach((item) => {
    const idx = Number(item.dataset.mapDomain);
    item.addEventListener('pointerenter', () => setActiveDomain(idx));
    item.addEventListener('pointerleave', () => setActiveDomain(-1));
  });

  window.__mapDebug = { frames: 0, error: null };
  updateLabels();
  renderer.render(scene, camera);
  function animate() {
    try {
      controls.update();
      updateLabels();
      renderer.render(scene, camera);
      window.__mapDebug.frames += 1;
    } catch (err) {
      window.__mapDebug.error = err.message;
      console.error('library-map-3d animate() error:', err);
      return;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
