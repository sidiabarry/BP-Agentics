// Friendly tabletop assistant. No imports; THREE is supplied by the host scene.
// Portiert unverändert aus der Werkstatt-Vorlage — siehe robot.d.ts für den Typ.
export function createRobot(THREE, parent) {
  const group = new THREE.Group();
  group.name = 'Friendly paper assistant';
  if (parent) parent.add(group);

  const ceramic = new THREE.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.57, metalness: 0.04 });
  const inset = new THREE.MeshStandardMaterial({ color: 0xadaf9f, roughness: 0.67, metalness: 0.22 });
  const metal = new THREE.MeshStandardMaterial({ color: 0x636e6a, roughness: 0.43, metalness: 0.72 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x263c3c, roughness: 0.88 });
  const yellow = new THREE.MeshStandardMaterial({ color: 0xe0ac4f, roughness: 0.48, metalness: 0.22 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x092e35, roughness: 0.22, metalness: 0.22, emissive: 0x063c43, emissiveIntensity: 0.2 });
  const aqua = new THREE.MeshStandardMaterial({ color: 0x8dcee2, roughness: 0.35, emissive: 0x549fba, emissiveIntensity: 0.65, toneMapped: false });
  const eyeShine = new THREE.MeshBasicMaterial({ color: 0xe8fff5, toneMapped: false });
  const paperMat = new THREE.MeshStandardMaterial({ color: 0xf4ecd9, roughness: 0.92 });
  const ink = new THREE.MeshStandardMaterial({ color: 0x678c8b, roughness: 0.9 });
  const signalBlue = new THREE.MeshStandardMaterial({ color: 0x9fd0f8, roughness: 0.32, emissive: 0x198be8, emissiveIntensity: 1.1, toneMapped: false });
  const geometryCache = new Map();
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 24);
  const linkGeometry = new THREE.CylinderGeometry(1, 1, 1, 32);
  const up = new THREE.Vector3(0, 1, 0);

  function roundedGeometry(w, h, d, radius) {
    const key = [w, h, d, radius].join('/');
    if (geometryCache.has(key)) return geometryCache.get(key);
    const b = Math.max(0.0003, Math.min(d * 0.32, radius * 0.46));
    const x = w / 2 - b, y = h / 2 - b;
    const r = Math.max(0.0003, Math.min(radius - b, x, y));
    const s = new THREE.Shape();
    s.moveTo(-x + r, -y);
    s.lineTo(x - r, -y); s.quadraticCurveTo(x, -y, x, -y + r);
    s.lineTo(x, y - r); s.quadraticCurveTo(x, y, x - r, y);
    s.lineTo(-x + r, y); s.quadraticCurveTo(-x, y, -x, y - r);
    s.lineTo(-x, -y + r); s.quadraticCurveTo(-x, -y, -x + r, -y);
    const g = new THREE.ExtrudeGeometry(s, { depth: d - 2 * b, bevelEnabled: true, bevelSegments: 8, steps: 1, bevelSize: b, bevelThickness: b, curveSegments: 16 });
    g.translate(0, 0, -(d - 2 * b) / 2);
    g.computeVertexNormals();
    // Extrusion duplicates edge vertices; share their normals for a smooth shell.
    const positions=g.attributes.position,normals=g.attributes.normal,shared=new Map();
    const vertexKey=i=>[positions.getX(i),positions.getY(i),positions.getZ(i)].map(n=>Math.round(n*1e6)).join('/');
    for(let i=0;i<positions.count;i++){
      const key=vertexKey(i),sum=shared.get(key)||new THREE.Vector3();
      sum.x+=normals.getX(i);sum.y+=normals.getY(i);sum.z+=normals.getZ(i);shared.set(key,sum);
    }
    for(const sum of shared.values())sum.normalize();
    for(let i=0;i<positions.count;i++){const n=shared.get(vertexKey(i));normals.setXYZ(i,n.x,n.y,n.z);}
    geometryCache.set(key, g);
    return g;
  }
  function mesh(geometry, material, x, y, z, owner = group) {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(x, y, z);
    m.castShadow = true; m.receiveShadow = true;
    owner.add(m);
    return m;
  }
  function box(w, h, d, r, material, x, y, z, owner = group) {
    return mesh(roundedGeometry(w, h, d, r), material, x, y, z, owner);
  }
  function ball(radius, material, x, y, z, owner = group) {
    const m = mesh(sphereGeometry, material, x, y, z, owner);
    m.scale.setScalar(radius);
    return m;
  }
  function cylinder(radius, height, material, x, y, z, owner = group) {
    const m = mesh(linkGeometry, material, x, y, z, owner);
    m.scale.set(radius, height, radius);
    return m;
  }

  // Short boots and a soft shell give the robot a compact, toy-like silhouette.
  box(0.27, 0.15, 0.40, 0.065, rubber, -0.20, 0.077, 0.025);
  box(0.27, 0.15, 0.40, 0.065, rubber, 0.20, 0.077, 0.025);
  box(0.265, 0.14, 0.35, 0.065, ceramic, -0.20, 0.145, 0.045);
  box(0.265, 0.14, 0.35, 0.065, ceramic, 0.20, 0.145, 0.045);
  cylinder(0.077, 0.18, metal, -0.20, 0.27, -0.015);
  cylinder(0.077, 0.18, metal, 0.20, 0.27, -0.015);
  box(0.62, 0.64, 0.45, 0.155, ceramic, 0, 0.635, -0.045);
  box(0.47, 0.33, 0.025, 0.09, inset, 0, 0.63, 0.187);
  box(0.405, 0.27, 0.027, 0.065, ceramic, 0, 0.642, 0.205);
  for (let i = 0; i < 4; i++) box(0.15, 0.017, 0.012, 0.006, metal, -0.035, 0.682 - i * 0.033, 0.224);
  const badge = cylinder(0.04, 0.018, yellow, 0.137, 0.672, 0.23);
  badge.rotation.x = Math.PI / 2;
  box(0.22, 0.055, 0.025, 0.015, yellow, 0, 0.39, 0.177);
  cylinder(0.125, 0.12, metal, 0, 0.98, -0.06);
  cylinder(0.143, 0.038, yellow, 0, 1.015, -0.06);

  const head = new THREE.Group();
  head.position.set(0, 1.26, -0.035);
  group.add(head);
  box(0.87, 0.62, 0.57, 0.17, ceramic, 0, 0, 0, head);
  box(0.75, 0.445, 0.057, 0.14, rubber, 0, -0.018, 0.278, head);
  box(0.697, 0.394, 0.036, 0.12, glass, 0, -0.014, 0.31, head);
  const leftEye = box(0.078, 0.132, 0.022, 0.037, aqua, -0.145, 0.033, 0.336, head);
  const rightEye = box(0.078, 0.132, 0.022, 0.037, aqua, 0.145, 0.033, 0.336, head);
  const shineL = ball(0.013, eyeShine, -0.154, 0.07, 0.351, head);
  const shineR = ball(0.013, eyeShine, 0.136, 0.07, 0.351, head);
  const smileCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.063, -0.081, 0.338),
    new THREE.Vector3(-0.032, -0.102, 0.341),
    new THREE.Vector3(0.005, -0.109, 0.341),
    new THREE.Vector3(0.041, -0.101, 0.341),
    new THREE.Vector3(0.063, -0.08, 0.338)
  ]);
  mesh(new THREE.TubeGeometry(smileCurve, 14, 0.009, 8, false), aqua, 0, 0, 0, head);
  for (const side of [-1, 1]) {
    const ear = cylinder(0.112, 0.075, yellow, side * 0.454, -0.025, -0.018, head);
    ear.rotation.z = Math.PI / 2;
    const earInset = cylinder(0.068, 0.078, metal, side * 0.473, -0.025, -0.018, head);
    earInset.rotation.z = Math.PI / 2;
    for (let k = 0; k < 2; k++) ball(0.012, yellow, side * (0.226 + k * 0.03), -0.107, 0.334, head);
  }
  box(0.13, 0.017, 0.17, 0.006, inset, 0, 0.312, -0.055, head);
  const topSignal = ball(0.027, signalBlue, 0, 0.343, -0.055, head);

  function makeArm(side) {
    const shoulder = new THREE.Vector3(side * 0.348, 0.815, -0.025);
    ball(0.112, yellow, shoulder.x, shoulder.y, shoulder.z);
    const upper = mesh(linkGeometry, ceramic, 0, 0, 0);
    const forearm = mesh(linkGeometry, ceramic, 0, 0, 0);
    const joint = ball(0.068, metal, 0, 0, 0);
    const hand = box(0.135, 0.103, 0.125, 0.044, ceramic, 0, 0, 0);
    box(0.085, 0.02, 0.024, 0.009, yellow, 0, -0.037, 0.051, hand);
    return { side, shoulder, upper, forearm, joint, hand, elbow: new THREE.Vector3(), wrist: new THREE.Vector3(), delta: new THREE.Vector3() };
  }
  const leftArm = makeArm(-1), rightArm = makeArm(1);
  function setLink(m, start, end, radius, scratch) {
    scratch.subVectors(end, start);
    const length = Math.max(0.0001, scratch.length());
    m.position.copy(start).add(end).multiplyScalar(0.5);
    m.scale.set(radius, length, radius);
    m.quaternion.setFromUnitVectors(up, scratch.multiplyScalar(1 / length));
  }
  function setArm(a, wrist) {
    a.wrist.copy(wrist);
    a.elbow.copy(a.shoulder).lerp(wrist, 0.52);
    a.elbow.x += a.side * 0.13;
    a.elbow.y -= 0.11;
    a.elbow.z += 0.035;
    setLink(a.upper, a.shoulder, a.elbow, 0.058, a.delta);
    setLink(a.forearm, a.elbow, a.wrist, 0.052, a.delta);
    a.joint.position.copy(a.elbow);
    a.hand.position.copy(a.wrist);
    a.hand.rotation.set(0.05, a.side * -0.12, a.side * -0.08);
  }

  // A small incoming pile and an orderly outgoing tray explain the task visually.
  const source = new THREE.Vector3(0.445, 0.070, 0.455);
  const read = new THREE.Vector3(0, 0.775, 0.46);
  const destination = new THREE.Vector3(-0.445, 0.078, 0.455);
  box(0.39, 0.034, 0.43, 0.013, rubber, source.x, 0.02, source.z);
  box(0.405, 0.028, 0.45, 0.013, metal, destination.x, 0.018, destination.z);
  box(0.018, 0.075, 0.45, 0.008, yellow, destination.x - 0.195, 0.047, destination.z);
  box(0.018, 0.075, 0.45, 0.008, yellow, destination.x + 0.195, 0.047, destination.z);
  box(0.39, 0.075, 0.018, 0.008, yellow, destination.x, 0.047, destination.z - 0.216);
  function makePaper(owner, decorated) {
    const p = new THREE.Group();
    owner.add(p);
    box(0.29, 0.335, 0.008, 0.008, paperMat, 0, 0, 0, p);
    if (decorated) {
      box(0.091, 0.032, 0.002, 0.001, yellow, -0.052, 0.105, 0.0055, p);
      for (let i = 0; i < 2; i++) box(0.197, 0.009, 0.002, 0.001, ink, 0, 0.051 - i * 0.027, 0.0055, p);
    }
    return p;
  }
  for (let i = 0; i < 4; i++) {
    const incoming = makePaper(group, i === 3);
    incoming.position.set(source.x + (i % 2 ? 0.013 : -0.008), 0.041 + i * 0.006, source.z);
    incoming.rotation.set(-Math.PI / 2, 0, (i - 1.5) * 0.025);
    const outgoing = makePaper(group, i === 3);
    outgoing.position.set(destination.x, 0.039 + i * 0.006, destination.z);
    outgoing.rotation.x = -Math.PI / 2;
  }
  const activePaper = makePaper(group, true);
  const completedSignal = box(0.095, 0.025, 0.032, 0.009, signalBlue, destination.x, 0.052, destination.z + 0.212);
  const rightRest = new THREE.Vector3(0.43, 0.48, 0.27);
  const leftRest = new THREE.Vector3(-0.43, 0.48, 0.27);
  const rightWrist = new THREE.Vector3(), leftWrist = new THREE.Vector3();
  const rightGrip = new THREE.Vector3(), leftGrip = new THREE.Vector3();
  // The pen belongs to the hand. Its tip and the revealed ink share one path.
  const pen = new THREE.Group();
  rightArm.hand.add(pen);
  pen.position.y = -0.145;
  const penNavy = new THREE.MeshStandardMaterial({ color: 0x102633, roughness: 0.3, metalness: 0.4 });
  const nibMat = new THREE.MeshStandardMaterial({ color: 0xe5edf0, roughness: 0.2, metalness: 0.8 });
  cylinder(0.018, 0.265, penNavy, 0, 0.1825, 0, pen);
  cylinder(0.022, 0.025, yellow, 0, 0.067, 0, pen);
  cylinder(0.021, 0.014, yellow, 0, 0.312, 0, pen);
  mesh(new THREE.CylinderGeometry(0.017, 0.0015, 0.05, 24), nibMat, 0, 0.025, 0, pen);
  box(0.009, 0.086, 0.01, 0.003, yellow, 0.019, 0.256, 0, pen);
  const inkMat = new THREE.MeshStandardMaterial({ color: 0x234856, roughness: 0.8 });
  const checkMat = new THREE.MeshStandardMaterial({ color: 0x35755e, roughness: 0.8 });
  const paths = [
    [[-.096,-.023],[-.025,-.019],[.013,-.027],[.081,-.022]],
    [[-.096,-.059],[-.037,-.055],[.010,-.063],[.051,-.058]],
    [[.041,-.105],[.062,-.123],[.106,-.083]]
  ];
  const strokes = paths.map((points,index)=>{
    const segments=[];
    for(let i=1;i<points.length;i++){
      const start=new THREE.Vector3(...points[i-1],.010), end=new THREE.Vector3(...points[i],.010);
      segments.push({start,end,mesh:mesh(linkGeometry,index===2?checkMat:inkMat,0,0,0,activePaper)});
    }
    return segments;
  });
  const penDirection=new THREE.Vector3(.55,.76,.45).normalize();
  const tip=new THREE.Vector3(), localTip=new THREE.Vector3(), scratch=new THREE.Vector3(), partial=new THREE.Vector3();
  function smooth(a, b, n) {
    const x = THREE.MathUtils.clamp((n - a) / (b - a), 0, 1);
    return x * x * (3 - 2 * x);
  }
  function animate(t, reduced) {
    const time = Number.isFinite(t) ? Math.max(0, t) : 0;
    const phase = reduced ? 6.25 : time % 10;
    const lift = smooth(0.55, 2.2, phase);
    const place = smooth(6.8, 8.2, phase);
    activePaper.position.copy(source).lerp(read, lift).lerp(destination, place);
    activePaper.rotation.set(THREE.MathUtils.lerp(-Math.PI / 2, -0.06, lift) * (1 - place) - Math.PI / 2 * place, 0, 0);
    activePaper.visible = phase < 8.65;
    leftGrip.set(-0.155, -0.015, 0.018).applyEuler(activePaper.rotation).add(activePaper.position);
    const rightEngage = smooth(2.05, 2.6, phase) * (1 - smooth(6.3, 6.8, phase));
    const leftEngage = smooth(0, .55, phase) * (1 - smooth(8.25, 8.8, phase));
    localTip.set(-.096,-.023,.010);
    strokes.forEach((segments,index)=>{
      const progress=THREE.MathUtils.clamp((phase-(2.65+index*1.05))/.82,0,1);
      const scaled=progress*segments.length;
      segments.forEach((segment,i)=>{
        const amount=THREE.MathUtils.clamp(scaled-i,0,1);
        segment.mesh.visible=amount>0;
        partial.copy(segment.start).lerp(segment.end,amount);
        setLink(segment.mesh,segment.start,partial,index===2?.004:.0028,scratch);
      });
      if(phase>=2.65+index*1.05){
        const segment=segments[Math.min(segments.length-1,Math.floor(scaled))];
        localTip.copy(segment.start).lerp(segment.end,progress===1?1:scaled%1);
        if(progress===1&&index<2)localTip.z+=.045*smooth(0,.15,phase-(3.47+index*1.05));
      }
    });
    tip.copy(localTip).applyEuler(activePaper.rotation).add(activePaper.position);
    rightGrip.copy(tip).addScaledVector(penDirection,.145);
    rightWrist.copy(rightRest).lerp(rightGrip, rightEngage);
    leftWrist.copy(leftRest).lerp(leftGrip, leftEngage);
    setArm(rightArm, rightWrist);
    setArm(leftArm, leftWrist);
    rightArm.hand.quaternion.setFromUnitVectors(up,penDirection);

    head.rotation.x = 0.045 + 0.11 * lift * (1 - place);
    head.rotation.y = reduced ? 0 : 0.12 * (1 - lift) - 0.13 * place + 0.035 * Math.sin(time * 0.8);
    head.rotation.z = reduced ? -0.025 : -0.025 + 0.035 * Math.sin(time * 0.72);
    const blinkAt = time % 4.7;
    const blink = reduced ? 1 : 1 - 0.9 * Math.max(0, 1 - Math.abs(blinkAt - 4.35) / 0.085);
    leftEye.scale.y = blink; rightEye.scale.y = blink;
    shineL.visible = shineR.visible = blink > 0.55;
    const success = smooth(5.5, 5.8, phase) * (1 - smooth(9, 9.8, phase));
    signalBlue.emissiveIntensity = reduced ? .8 : 0.35 + success * .65;
    topSignal.scale.setScalar(0.027 * (1 + (reduced ? 0 : success * 0.08)));
    completedSignal.visible = true;
  }
  animate(0, false);
  return { group, animate };
}
