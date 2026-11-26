// v0.35 · concursantes SENTADOS realistas (opción Personajes: Realistas). Monigotes intactos (se ocultan, no se borran).
(function(){if(/[?&]nogl/.test(location.search)||!THREE.GLTFLoader)return;const ld=new THREE.GLTFLoader();let L=false;const SEAT=[];
const want=()=>(OPT.pers|0)==1;
function bone(m,n){let r=null;m.traverse(o=>{if(!r&&o.name==n)r=o;});return r;}
function prep(m){m.traverse(o=>{if(o.isMesh&&/teeth|tongue|eyelash/i.test(o.name+(o.material&&o.material.name||'')))o.visible=false;if(o.isMesh){o.frustumCulled=false;const a=o.material;if(a){const n=new THREE.MeshLambertMaterial({map:a.map||null,color:a.color?a.color.clone():0xffffff,transparent:a.transparent,alphaTest:a.alphaTest||(a.transparent?.3:0),side:a.side});if(a.map){n.emissiveMap=a.map;n.emissive=new THREE.Color(0x555555);}o.material=n;}}});}
function sit(m){const A=window.__az35aim;if(!A)return;m.updateWorldMatrix(true,true);const q=m.getWorldQuaternion(new THREE.Quaternion());const fw=new THREE.Vector3(0,0,1).applyQuaternion(q),dn=new THREE.Vector3(0,-1,0);
 ['l','r'].forEach(s=>{const th=bone(m,'thigh_'+s),ca=bone(m,'calf_'+s),ft=bone(m,'foot_'+s);if(th&&ca)A(th,ca,fw.clone().add(dn.clone().multiplyScalar(.08)));if(ca&&ft)A(ca,ft,dn.clone().add(fw.clone().multiplyScalar(.12)));
  const ua=bone(m,'upperarm_'+s),la=bone(m,'lowerarm_'+s),h=bone(m,'hand_'+s);if(ua&&la)A(ua,la,dn.clone().add(fw.clone().multiplyScalar(.35)));if(la&&h)A(la,h,fw.clone().add(dn.clone().multiplyScalar(.2)));});}
function put(p,url){ld.load(url,g=>{const m=g.scene;prep(m);const b=new THREE.Box3().setFromObject(m);const h=b.max.y-b.min.y;m.scale.setScalar(1.76/h);m.position.y=-b.min.y*1.76/h;
 const old=new THREE.Group();[...p.children].forEach(c=>old.add(c));p.add(old);p.add(m);m.updateWorldMatrix(true,true);sit(m);m.updateWorldMatrix(true,true);
 const b2=new THREE.Box3().setFromObject(m);const pw=p.getWorldPosition(new THREE.Vector3());m.position.y+= (pw.y-b2.min.y)/p.scale.y;
 p.__sOld=old;p.__sReal=m;p.__sArms=p.arms;SEAT.push(p);ap(p);});}
function ap(p){const r=want();p.__sReal.visible=r;p.__sOld.visible=!r;}
let last=-1;setInterval(()=>{const v=OPT.pers|0;if(v===last)return;last=v;if(v==1&&!L&&window.P&&P.ply||v==1&&!L&&typeof P!='undefined'&&P.ply){L=true;put(P.ply,'humanos/burak.glb');put(P.cpu,'humanos/tarik.glb');}SEAT.forEach(ap);},700);
window.__seat35=()=>SEAT.map(p=>[p.__sReal.visible,p.__sOld.visible]);})();
