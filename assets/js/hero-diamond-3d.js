import * as THREE from 'three';

const mount = document.querySelector('#hero-diamond-canvas');
if (mount) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
  camera.position.set(0, 0, 6.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  mount.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  function glowTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(91,140,255,0.9)');
    g.addColorStop(0.5, 'rgba(91,140,255,0.25)');
    g.addColorStop(1, 'rgba(91,140,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  glow.scale.set(3.4, 3.4, 1);
  group.add(glow);

  const geo = new THREE.OctahedronGeometry(1.5, 0);
  const solid = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x2E5BD0, transparent: true, opacity: 0.08 }));
  group.add(solid);
  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(geo),
    new THREE.LineBasicMaterial({ color: 0x5B8CFF, transparent: true, opacity: 0.9 })
  );
  group.add(wire);

  const innerGeo = new THREE.OctahedronGeometry(0.82, 0);
  const innerWire = new THREE.LineSegments(
    new THREE.WireframeGeometry(innerGeo),
    new THREE.LineBasicMaterial({ color: 0x9DB8FF, transparent: true, opacity: 0.6 })
  );
  group.add(innerWire);

  const outerGeo = new THREE.IcosahedronGeometry(2.4, 1);
  const outerWire = new THREE.LineSegments(
    new THREE.WireframeGeometry(outerGeo),
    new THREE.LineBasicMaterial({ color: 0x2E5BD0, transparent: true, opacity: 0.22 })
  );
  group.add(outerWire);

  const ptsGeo = new THREE.BufferGeometry();
  ptsGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(geo.attributes.position.array), 3));
  const points = new THREE.Points(ptsGeo, new THREE.PointsMaterial({ color: 0xDCE5FB, size: 0.1, transparent: true, opacity: 0.95 }));
  group.add(points);

  const dustCount = 90;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i += 1) {
    const r = 2.9 + Math.random() * 1.3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    dustPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    dustPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    dustPos[i * 3 + 2] = r * Math.cos(phi);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x9DB8FF, size: 0.035, transparent: true, opacity: 0.55 }));
  group.add(dust);

  function resize() {
    const rect = mount.getBoundingClientRect();
    if (rect.width < 1) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();
  renderer.render(scene, camera);

  let targetTiltX = 0, targetTiltY = 0, tiltX = 0, tiltY = 0;
  mount.addEventListener('pointermove', (e) => {
    const rect = mount.getBoundingClientRect();
    targetTiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
    targetTiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -0.5;
  });
  mount.addEventListener('pointerleave', () => { targetTiltX = 0; targetTiltY = 0; });

  if (!reduced) {
    let t = 0;
    function animate() {
      t += 0.006;
      tiltX += (targetTiltX - tiltX) * 0.06;
      tiltY += (targetTiltY - tiltY) * 0.06;
      group.rotation.y = t + tiltY;
      group.rotation.x = Math.sin(t * 0.6) * 0.22 + tiltX;
      group.position.y = Math.sin(t * 0.8) * 0.08;
      innerWire.rotation.y = -t * 1.6;
      outerWire.rotation.y = t * 0.35;
      outerWire.rotation.x = t * 0.18;
      dust.rotation.y = t * 0.12;
      const pulse = 0.85 + Math.sin(t * 1.8) * 0.15;
      glow.material.opacity = pulse;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  } else {
    outerWire.rotation.y = 0.4;
    renderer.render(scene, camera);
  }
}
