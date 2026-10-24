// ======================================================================
//  v0.4 — personajes estilo «Ahora Caigo 3D» (presentador con traje, caras, público con gorras),
//  Una de Cuatro como la app oficial y Sopa de Letras deslizando el dedo.
// ======================================================================
const V4={};
function v4Face(fem){return cv(128,128,(E)=>{E.clearRect(0,0,128,128);E.fillStyle='#1a1a1a';E.beginPath();E.ellipse(42,54,9,12,0,0,7);E.fill();E.beginPath();E.ellipse(86,54,9,12,0,0,7);E.fill();
 E.fillStyle='#fff';E.beginPath();E.arc(45,50,3.5,0,7);E.fill();E.beginPath();E.arc(89,50,3.5,0,7);E.fill();
 E.strokeStyle='#3a2414';E.lineWidth=5;E.lineCap='round';E.beginPath();E.moveTo(30,34);E.lineTo(54,30);E.stroke();E.beginPath();E.moveTo(74,30);E.lineTo(98,34);E.stroke();
 if(fem){E.lineWidth=3;E.strokeStyle='#1a1a1a';for(const x of[32,96]){E.beginPath();E.moveTo(x,46);E.lineTo(x+(x<64?-6:6),40);E.stroke();}}
 E.fillStyle=fem?'#c0304a':'#8a1c1c';E.beginPath();E.moveTo(38,82);E.quadraticCurveTo(64,112,90,82);E.closePath();E.fill();E.fillStyle='#fff';E.fillRect(44,82,40,7);});}
function v4Geo(){if(V4.g)return V4.g;const G={};
 G.sph=new T.SphereGeometry(.16,16,12);G.hair=new T.SphereGeometry(.165,14,8,0,PI*2,0,PI*.55);G.hairL=new T.SphereGeometry(.17,14,10,0,PI*2,0,PI*.75);
 G.ear=new T.SphereGeometry(.035,6,6);G.neck=new T.CylinderGeometry(.06,.07,.12,8);G.face=new T.CircleGeometry(.13,20);G.hand=new T.SphereGeometry(.07,8,6);
 G.shoe=new T.BoxGeometry(.13,.08,.26);G.torso=new T.CapsuleGeometry(.21,.42,4,12);G.badge=new T.CylinderGeometry(.055,.055,.015,14);G.cone=new T.ConeGeometry(.08,.16,8);
 G.long=new T.CylinderGeometry(.16,.17,.36,12,1,true,PI*.3,PI*1.4);return V4.g=G;}
const V4cap={};function v4Cap(r,l){const k=r+'_'+l;return V4cap[k]||(V4cap[k]=new T.CapsuleGeometry(r,l,3,8));}
function v4Limb(r,l,m){const p=new T.Group(),c=new T.Mesh(v4Cap(r,l),m);c.position.y=-l/2-r*.5;p.add(c);return p;}
function personV4(o){const G=v4Geo(),g=new T.Group(),b=new T.Group();g.add(b);const s=o.sit?1:1.12;b.scale.setScalar(s);
 const host=o.shirt===0x26262c&&!o.sit&&!o.badge;if(host)Object.assign(o,{suit:0x17171b,hair:0x4a2c16,skin:0xf2c09a,mic:true});
 const L=c=>new T.MeshLambertMaterial({color:c}),skin=L(o.skin||0xf0c49c),top=L(host?o.suit:o.shirt),pants=L(o.pants||(host?o.suit:0x2b3348)),shoe=L(0x141414),hm=L(o.hair||0x3a2414);
 skin.emissive=new T.Color(0x2a1408);
 if(o.sit){for(const x of[-.11,.11]){const th=v4Limb(.09,.32,pants);th.position.set(x,.86,0);th.rotation.x=-PI/2;b.add(th);const kn=new T.Group();kn.position.y=-.45;kn.rotation.x=PI/2;th.add(kn);
   const sh=v4Limb(.085,.42,pants);kn.add(sh);const so=new T.Mesh(G.shoe,shoe);so.position.set(0,-.62,.05);kn.add(so);}}
 else for(const x of[-.11,.11]){const l=v4Limb(.09,.62,pants);l.position.set(x,.88,0);b.add(l);const so=new T.Mesh(G.shoe,shoe);so.position.set(0,-.84,.05);l.add(so);}
 const t=new T.Mesh(G.torso,top);t.position.y=1.17;t.scale.set(1,1,.72);b.add(t);
 const pl=(w,h,m,x,y,z,rz=0)=>{const p=new T.Mesh(new T.PlaneGeometry(w,h),m);p.position.set(x,y,z);p.rotation.z=rz;b.add(p);return p;};
 if(host){pl(.16,.36,L(0xffffff),0,1.3,.156);pl(.06,.3,new T.MeshLambertMaterial({color:0xc8102e,emissive:0x220000}),0,1.29,.159);for(const e of[-1,1])pl(.06,.3,top,e*.075,1.3,.161,e*.25);}
 else{const col=new T.Mesh(new T.CylinderGeometry(.075,.09,.05,10),L(o.collar||0xffffff));col.position.set(0,1.47,.0);b.add(col);}
 const arms=[];for(const sx of[-1,1]){const tilt=new T.Group();tilt.position.set(sx*.29,1.44,0);if(o.sit)tilt.rotation.x=-.55;b.add(tilt);
  const a=v4Limb(.07,.5,top);tilt.add(a);const hd=new T.Mesh(G.hand,skin);hd.position.y=-.66;a.add(hd);arms.push(a);
  if(o.mic&&sx>0){const mg=new T.Group(),m1=new T.Mesh(new T.CylinderGeometry(.02,.016,.2,8),L(0x222222)),m2=new T.Mesh(new T.SphereGeometry(.04,10,8),new T.MeshLambertMaterial({color:0x999999,emissive:0x222222}));m2.position.y=.12;mg.add(m1,m2);mg.position.set(0,-.68,.06);mg.rotation.x=-.6;a.add(mg);}}
 const nk=new T.Mesh(G.neck,skin);nk.position.y=1.52;b.add(nk);
 const h=new T.Group();h.position.y=1.7;b.add(h);const hs=new T.Mesh(G.sph,skin);hs.scale.set(.92,1.08,.98);h.add(hs);
 const fm=V4.face||(V4.face=[new T.MeshLambertMaterial({map:v4Face(0),transparent:true,depthWrite:false}),new T.MeshLambertMaterial({map:v4Face(1),transparent:true,depthWrite:false})]);
 const fc=new T.Mesh(G.face,fm[o.long?1:0]);fc.position.set(0,-.01,.153);h.add(fc);
 const hr=new T.Mesh(o.long?G.hairL:G.hair,hm);hr.position.y=.03;hr.scale.set(1,1.05,1.02);hr.rotation.x=o.long?-.35:0;h.add(hr);
 if(o.long){const lh=new T.Mesh(G.long,hm);lh.position.set(0,-.12,-.01);h.add(lh);}else{const ck=new T.Mesh(G.cone,hm);ck.position.set(.02,.17,.08);ck.rotation.set(.9,0,-.3);h.add(ck);}
 for(const e of[-1,1]){const ea=new T.Mesh(G.ear,skin);ea.scale.set(.6,1,1);ea.position.set(e*.15,-.01,0);h.add(ea);}
 let bd=null;if(o.badge){bd=new T.Mesh(G.badge,new T.MeshPhongMaterial({color:o.badge,shininess:80}));bd.rotation.x=PI/2;bd.position.set(.1,1.3,.158);b.add(bd);}
 // proxies: v0.3 (live) escribe la rotación de los brazos aquí; v4Arms los copia con los brazos hacia fuera
 const px=[new T.Object3D(),new T.Object3D()];g.arms=px;g.armsV4=arms;g.head=h;g.mats={top,hair:hm,badge:bd&&bd.material};(V4.people||(V4.people=[])).push(g);return g;}
function v4Arms(){for(const g of V4.people||[]){if(!g.visible)continue;const[pl,pr]=g.arms,[al,ar]=g.armsV4;
 const f=a=>a<=.12?a:.24-a;al.rotation.set(pl.rotation.x,0,f(pl.rotation.z));ar.rotation.set(pr.rotation.x,0,-f(-pr.rotation.z));}}
person=personV4;
const SHIRT4={0:0xf2f2f6,1:0x8a5a3a},HAIR4={0:0x2a1c12,1:0xa8331a};
roscoPerson=function(team){const p=P.rosc;p.mats.top.color.setHex(SHIRT4[team]);p.mats.hair.color.setHex(HAIR4[team]);if(p.mats.badge)p.mats.badge.color.setHex(team?0xf07a1a:0x2a6af0);};
// ---------- público: geometría fusionada + instancias (≈8 draw calls) ----------
function v4Merge(list){let nv=0,ni=0;list.forEach(g=>{nv+=g.attributes.position.count;ni+=g.index?g.index.count:g.attributes.position.count;});
 const P_=new Float32Array(nv*3),N_=new Float32Array(nv*3),U_=new Float32Array(nv*2),I_=new Uint32Array(ni);let o=0,k=0;
 for(const g of list){const c=g.attributes.position.count;P_.set(g.attributes.position.array,o*3);N_.set(g.attributes.normal.array,o*3);if(g.attributes.uv&&!g.noUV)U_.set(g.attributes.uv.array,o*2);
  if(g.index){for(let i=0;i<g.index.count;i++)I_[k+i]=g.index.getX(i)+o;k+=g.index.count;}else{for(let i=0;i<c;i++)I_[k+i]=i+o;k+=c;}o+=c;}
 const r=new T.BufferGeometry();r.setAttribute('position',new T.BufferAttribute(P_,3));r.setAttribute('normal',new T.BufferAttribute(N_,3));r.setAttribute('uv',new T.BufferAttribute(U_,2));r.setIndex(new T.BufferAttribute(I_,1));r.computeBoundingSphere();return r;}
function v4AudGeo(){const cap=(r,l)=>new T.CapsuleGeometry(r,l,2,7);const G={};
 G.torso=cap(.17,.28);G.torso.scale(1,1,.72);G.torso.translate(0,.69,0);
 const nk=new T.CylinderGeometry(.05,.055,.1,6);nk.translate(0,.93,0);nk.noUV=1;const hd=new T.SphereGeometry(.13,12,9);hd.scale(.95,1.1,1);hd.translate(0,1.06,0);G.head=v4Merge([nk,hd]);
 const lg=[];for(const x of[-.085,.085]){const a=cap(.075,.24);a.rotateX(PI/2);a.translate(x,.42,.15);const s=cap(.065,.26);s.translate(x,.24,.32);const sh=new T.BoxGeometry(.1,.07,.18);sh.translate(x,.035,.36);lg.push(a,s,sh);}G.legs=v4Merge(lg);
 const sb=new T.BoxGeometry(.46,.36,.4);sb.translate(0,.18,-.02);G.seat=sb;
 const ar=cap(.05,.28);ar.translate(0,-.19,0);const hn=new T.SphereGeometry(.05,6,4);hn.translate(0,-.4,0);G.arm=v4Merge([ar,hn]);
 const hc=new T.SphereGeometry(.138,10,5,0,PI*2,0,PI*.55);hc.rotateX(-.35);hc.translate(0,1.075,-.012);G.hair=hc;
 const hl=new T.SphereGeometry(.142,10,6,0,PI*2,0,PI*.72);hl.rotateX(-.6);hl.scale(1.04,1.08,1.06);hl.translate(0,1.07,-.02);G.hairL=hl;
 const cp=new T.SphereGeometry(.142,10,5,0,PI*2,0,PI*.5);cp.translate(0,1.085,0);const vi=new T.BoxGeometry(.17,.014,.12);vi.translate(0,1.1,.16);G.cap=v4Merge([cp,vi]);return G;}
function v4AudTex(){return cv(256,128,(E)=>{E.fillStyle='#fff';E.fillRect(0,0,256,128);E.fillStyle='#1a1410';for(const x of[52,76]){E.beginPath();E.ellipse(x,57,3.2,4.2,0,0,7);E.fill();}
 E.strokeStyle='#7a2a20';E.lineWidth=2.4;E.lineCap='round';E.beginPath();E.arc(64,70,8,.25*PI,.75*PI);E.stroke();});}
function buildAudV4(root){const old=P.audM||[];old.forEach(m=>{root.remove(m);m.geometry.dispose();});const pos=(P.aud||[]).map(p=>V3(p.x,p.y-.35,p.z));
 const G=v4AudGeo(),N=pos.length,mk=(g,n,mat)=>{const m=new T.InstancedMesh(g,mat||new T.MeshLambertMaterial(),Math.max(1,n));m.count=n;m.frustumCulled=false;root.add(m);return m;};
 const shirts=[0xe8322a,0x2fb04a,0x2a7bff,0x22c6e0,0xffc61a,0x9a4ae0,0xff7a1a,0xff4fa0,0xf4f4f4,0x3ad18a,0x1a3a9a,0xd8203a],pants=[0x1d2a44,0x2b3348,0x3a3a40,0x1a1a1a,0x40566a,0x5a4a3a],
  skins=[0xf6d0b0,0xeec29c,0xe0a880,0xc68a5e,0xa66f45,0x7d522f,0x5a3a22,0xf3c4a8],hairs=[0x1a1208,0x2e1d12,0x4a2e18,0x7a4a24,0xc8964a,0xe0c48a,0x8a8a8a,0x2a1c10,0xa8401a];
 let seed=7;const R=()=>(seed=(seed*16807)%2147483647)/2147483647,pk=a=>a[Math.floor(R()*a.length)];
 const ppl=pos.map(p=>{const r=R(),o={p,yaw:Math.atan2(-p.x,-p.z),ph:R()*6.28,shirt:pk(shirts),pants:pk(pants),skin:pk(skins),acc:null,sc:.95+R()*.1};
  if(r<.24)o.acc=['cap',pk(shirts)];else if(r<.62)o.acc=['hair',pk(hairs)];else if(r<.93)o.acc=['hairL',pk(hairs)];return o;});
 const cnt={cap:0,hair:0,hairL:0};ppl.forEach(o=>{if(o.acc){o.ai=cnt[o.acc[0]]++;}});
 const tex=v4AudTex(),M={torso:mk(G.torso,N),head:mk(G.head,N,new T.MeshLambertMaterial({map:tex})),legs:mk(G.legs,N),seat:mk(G.seat,N,new T.MeshLambertMaterial({color:0x22346e})),arm:mk(G.arm,N*2),
  cap:mk(G.cap,cnt.cap),hair:mk(G.hair,cnt.hair),hairL:mk(G.hairL,cnt.hairL)};
 const C=new T.Color(),m4=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler(),s=V3(1,1,1);
 ppl.forEach((o,i)=>{q.setFromEuler(e.set(0,o.yaw,0));s.setScalar(o.sc);m4.compose(o.p,q,s);M.legs.setMatrixAt(i,m4);M.seat.setMatrixAt(i,m4);
  M.torso.setColorAt(i,C.setHex(o.shirt));M.head.setColorAt(i,C.setHex(o.skin));M.legs.setColorAt(i,C.setHex(o.pants));M.seat.setColorAt(i,C.setHex(0x22346e));M.arm.setColorAt(i*2,C.setHex(o.shirt));M.arm.setColorAt(i*2+1,C);
  if(o.acc)M[o.acc[0]].setColorAt(o.ai,C.setHex(o.acc[1]));});
 Object.values(M).forEach(m=>{if(m.instanceColor)m.instanceColor.needsUpdate=true;});
 V4.aud={ppl,M};P.aud=pos;P.audM=[M.torso,M.head,M.legs];}
const v4m=new T.Matrix4(),v4a=new T.Matrix4(),v4q=new T.Quaternion(),v4e=new T.Euler(),v4v=V3(0,0,0),v4s=V3(1,1,1);
liveSetup=function(){if(HANDS||!V4.aud)return;HANDS=V4.aud.M.arm;
 BEAMS=[];const bm=new T.MeshBasicMaterial({color:0x9cc8ff,transparent:true,opacity:.07,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide});const bg=new T.ConeGeometry(1.4,11,12,1,true);bg.translate(0,-5.5,0);
 for(let i=0;i<6;i++){const m=new T.Mesh(bg,bm);const a=i/6*PI*2;m.position.set(Math.cos(a)*6.5,11,Math.sin(a)*6.5-2);m.ph=i*1.1;P.root.add(m);BEAMS.push(m);}updAud(0,1);};
updAud=function(t){const A=V4.aud;if(!A)return;const M=A.M,e=CLAP;
 A.ppl.forEach((o,i)=>{const ph=o.ph,j=e*Math.abs(Math.sin(t*7+ph))*.05;v4v.copy(o.p);v4v.y+=j;v4q.setFromEuler(v4e.set(0,o.yaw,0));v4s.setScalar(o.sc);v4m.compose(v4v,v4q,v4s);
  M.torso.setMatrixAt(i,v4m);M.head.setMatrixAt(i,v4m);if(o.acc)M[o.acc[0]].setMatrixAt(o.ai,v4m);
  const cl=e>.02,h=cl?Math.abs(Math.sin(t*15+ph)):0,rx=cl?-1.3:-.75;
  for(const sx of[-1,1]){const rz=cl?sx*(-.08-.32*h)*-1:sx*-.1;v4a.makeRotationFromEuler(v4e.set(rx,0,sx<0?(cl?.08+.32*(1-h)*0+.1*h+.15:.1):(cl?-(.08+.1*h+.15):-.1)));v4a.setPosition(sx*.21,.86,0);
   M.arm.setMatrixAt(i*2+(sx>0?1:0),v4a.premultiply(v4m));}});
 [M.torso,M.head,M.arm,M.cap,M.hair,M.hairL].forEach(m=>m.instanceMatrix.needsUpdate=true);};
const _bp4=buildPlato;buildPlato=function(){_bp4();buildAudV4(P.root);};
anim(dt=>{v4Arms();return true;});
// ---------- overlay común ----------
function v4css(){if(V4.css)return;V4.css=1;const st=document.createElement('style');st.textContent=`
.v4o{position:fixed;inset:0;z-index:15;display:flex;flex-direction:column;align-items:center;font-family:N,Arial,sans-serif;color:#fff;touch-action:none}
.u4bg{background:radial-gradient(circle at 50% 58%,#46b6ff 0,#2aa0f8 6vh,#43b0ff 6.2vh,#33a6fb 14vh,#4ab3ff 14.2vh,#2c9cf6 24vh,#46aefd 24.2vh,#2896f2 36vh,#3fa8fb 36.2vh,#1f8cec 52vh,#3aa2f7 52.2vh,#1680e2 80vh)}
.u4top{width:100%;display:flex;align-items:center;justify-content:space-between;padding:1.2vh 3vw 0}
.u4salir{display:flex;flex-direction:column;align-items:center;font:900 2.4vh N;cursor:pointer}
.u4salir i{width:6.6vh;height:6.6vh;border-radius:50%;background:radial-gradient(circle at 40% 35%,#ffd76a,#f0a020 55%,#8a2ad0 56%,#5a1aa0);display:flex;align-items:center;justify-content:center;font:900 3.4vh N;font-style:normal;color:#fff;text-shadow:0 2px 0 #3a1080}
.u4tit{font:800 6.2vh N;text-shadow:0 2px 4px #0b4fa0}
.u4ico{width:7vh;height:7vh;border-radius:1.6vh;background:#2a8fe8;box-shadow:inset 0 0 0 2px #59b4ff;display:flex;align-items:center;justify-content:center}
.u4cnt{font:800 3.2vh N;margin:.4vh 0}
.u4card{width:min(80vw,130vh);background:#fff;border-radius:2vh;box-shadow:0 .6vh 1.4vh #0a4a9a66;color:#1677e0;font:900 4.8vh/1.3 N;text-transform:uppercase;text-align:center;padding:2.2vh 3vw;min-height:22vh;display:flex;align-items:center;justify-content:center;letter-spacing:.02em}
.u4grid{display:grid;grid-template-columns:1fr 1fr;gap:2.4vh 4vw;width:min(80vw,130vh);margin-top:3vh}
.u4pill{height:11.5vh;border-radius:6vh;background:linear-gradient(#7cc9ff,#3fa6f7 55%,#2f95ee);border:.45vh solid #b9e2ff;box-shadow:0 .5vh 1vh #0a4a9a55;display:flex;align-items:center;justify-content:center;font:900 4.6vh N;text-transform:uppercase;text-shadow:0 1px 2px #0a4a9a;cursor:pointer;transition:transform .08s}
.u4pill:active{transform:scale(.97)}.u4pill.ok{background:linear-gradient(#5ee07a,#24b04a);border-color:#c8ffd4}.u4pill.ko{background:linear-gradient(#ff7a6a,#e0302a);border-color:#ffd0c8}.u4pill.off{opacity:.25}
.u4bot{position:absolute;left:0;right:0;bottom:.8vh;height:22vh;display:flex;align-items:center;justify-content:space-between;padding:0 6vw}
.u4bub{display:flex;align-items:flex-end}.u4bub b{display:flex;align-items:center;justify-content:center;border-radius:50%;font:900 4.4vh N;border:.5vh solid #fff;box-shadow:0 .4vh .8vh #0005}
.u4bub .g{width:10vh;height:10vh;background:radial-gradient(circle at 40% 35%,#6eea6e,#1ea83a)}.u4bub .r{width:7.4vh;height:7.4vh;margin-left:-1.6vh;font-size:3.4vh;background:radial-gradient(circle at 40% 35%,#ff6a5a,#c41a1a)}
.u4tm{width:21vh;height:21vh;border-radius:50%;background:radial-gradient(#2f98f0 60%,#4ab0ff 61%,#4ab0ff 66%,#2a90ea 67%);border:.7vh solid #bfe4ff;display:flex;align-items:center;justify-content:center;font:900 6.4vh N;box-shadow:0 .6vh 1.4vh #0a4a9a77;position:absolute;left:50%;transform:translateX(-50%)}
.u4bulb{width:9vh;height:9vh;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fff28a,#ffc21a 60%,#e89a00);border:.4vh solid #fff6c0;display:flex;align-items:center;justify-content:center;font-size:5vh;cursor:pointer}
.u4bulb.used{filter:grayscale(1);opacity:.5}
.sopa{background:radial-gradient(ellipse at center,#06215ab3,#020a28e6);flex-direction:row;justify-content:center;gap:5vw}
.sgrid{display:grid;grid-template-columns:repeat(5,14vh);grid-template-rows:repeat(5,14vh);gap:1.4vh;touch-action:none;padding:1.4vh;background:#0a2a7acc;border-radius:2.4vh;border:.4vh solid #8fc4ff;margin-top:6vh}
.scell{border-radius:1.6vh;background:linear-gradient(#4f8cff,#1c4fd0);border:.3vh solid #9cc4ff;display:flex;align-items:center;justify-content:center;font:900 7vh N;pointer-events:none}
.scell.sel{background:linear-gradient(#ffc04a,#ff8a1a);border-color:#fff0b0;transform:scale(1.06)}.scell.ok{background:linear-gradient(#5ee07a,#1ea83a);border-color:#c8ffd4}.scell.miss{background:linear-gradient(#ffb06a,#e06a1a)}
.spanel{display:flex;flex-direction:column;gap:2vh;margin-top:6vh;width:30vw}.spanel h3{margin:0;font:900 4.4vh N;color:#ffd23a}
.spanel .w{font:900 4vh N;background:#0a2fa8cc;border:.3vh solid #8fc4ff;border-radius:4vh;padding:.8vh 2.4vh}.spanel .w.f{background:#1ea83a;text-decoration:line-through}
.spanel .tm{font:900 6vh N}.spanel .hint{font:700 2.6vh N;color:#cfe0ff}`;document.head.appendChild(st);}
function v4ui(cls,html){v4css();const d=document.createElement('div');d.className='v4o '+cls;d.innerHTML=html;document.body.appendChild(d);return d;}
const mmss=s=>{s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
// ---------- UNA DE CUATRO (2019) como la app oficial ----------
unaDeCuatro=async function(rid){prep();const [theme,opts,qs0]=pick(D2.U4),qs=shuffle(qs0).slice(0,6);let t=90,ac=0,ko=0,qi=0,busy=false,done=false,bulb=false;
 cut('host');hostSay(`<b>Una de Cuatro</b>: cada definición corresponde a una de las cuatro respuestas. Tema: <b>${theme}</b>.`);await wait(3.2,rid);say();
 const skip=$('#skip'),skH=skip.classList.contains('hidden');skip.classList.add('hidden');
 const d=v4ui('u4bg',`<div class="u4top"><div class="u4salir"><i>P</i>SALIR</div><div class="u4tit">Una de Cuatro</div><div class="u4ico"><svg viewBox="0 0 40 40" width="70%" height="70%" fill="none" stroke="#fff" stroke-width="3"><rect x="9" y="9" width="22" height="22" rx="2"/><circle cx="9" cy="9" r="5" fill="#2a8fe8"/><circle cx="31" cy="9" r="5" fill="#2a8fe8"/><circle cx="9" cy="31" r="5" fill="#2a8fe8"/><circle cx="31" cy="31" r="5" fill="#2a8fe8"/></svg></div></div>
 <div class="u4cnt"></div><div class="u4card"></div><div class="u4grid">${opts.map((o,i)=>`<div class="u4pill" data-i="${i}">${o}</div>`).join('')}</div>
 <div class="u4bot"><div class="u4bub"><b class="g">0</b><b class="r">0</b></div><div class="u4tm">1:30</div><div class="u4bulb">💡</div></div>`);
 const q=s=>d.querySelector(s),pills=[...d.querySelectorAll('.u4pill')];
 const show=()=>{if(qi<qs.length){q('.u4cnt').textContent=`${qi+1}/${qs.length}`;q('.u4card').textContent=qs[qi][0];}};show();
 q('.u4salir').onpointerdown=e=>{e.preventDefault();showMenu();};
 q('.u4bulb').onpointerdown=e=>{e.preventDefault();if(bulb||busy||qi>=qs.length)return;bulb=true;q('.u4bulb').classList.add('used');sfx('ok');shuffle(pills.filter((p,i)=>i!==qs[qi][1])).slice(0,2).forEach(p=>p.classList.add('off'));};
 pills.forEach((p,i)=>p.onpointerdown=async e=>{e.preventDefault();if(busy||qi>=qs.length||p.classList.contains('off'))return;busy=true;const ok=i===qs[qi][1];p.classList.add(ok?'ok':'ko');if(!ok)pills[qs[qi][1]].classList.add('ok');
  sfx(ok?'ok':'error');if(ok)ac++;else ko++;q('.u4bub .g').textContent=ac;q('.u4bub .r').textContent=ko;try{await wait(.9,rid);}catch(x){return;}pills.forEach(x=>x.className='u4pill');qi++;show();busy=false;});
 try{await new Promise((r,j)=>anim(dt=>{if(rid!==RUN){j(new Stop());return false;}t-=dt;q('.u4tm').textContent=mmss(t);if(t<=0||qi>=qs.length){r();return false;}return true;}));await wait(.8,rid);}
 finally{d.remove();if(!skH)skip.classList.remove('hidden');}
 await soloEnd(ac,rid);};
// ---------- SOPA DE LETRAS (2019): deslizar el dedo ----------
sopaDeLetras=async function(rid){prep();let set,S5;do{set=pick(D2.SOPA);S5=makeSopa(set[1]);}while(!S5);let t=60,ac=0;const found=new Set();
 cut('host');hostSay(`<b>Sopa de Letras</b>: busca las palabras del tema <b>${set[0]}</b>. Desliza el dedo desde la primera hasta la última letra.`);await wait(3.4,rid);say();
 cut({p:V3(1.6,1.75,-.6),l:V3(4.6,1.5,.9),f:30,dr:.04});
 const d=v4ui('sopa',`<div class="sgrid">${S5.g.map(c=>`<div class="scell">${c}</div>`).join('')}</div><div class="spanel"><h3>${set[0]}</h3>${set[1].map(w=>`<div class="w" data-w="${w}">${'_ '.repeat(w.length).trim()}</div>`).join('')}<div class="tm">1:00</div><div class="hint">Desliza el dedo sobre las letras</div></div>`);
 const grid=d.querySelector('.sgrid'),cells=[...grid.children];let start=null,line=[],pid=null;
 const cellAt=(x,y)=>{const r=grid.getBoundingClientRect(),cw=(r.width-2*r.width*0)/5;const c=Math.floor((x-r.left)/r.width*5),rw=Math.floor((y-r.top)/r.height*5);return[Math.max(0,Math.min(4,rw)),Math.max(0,Math.min(4,c))];};
 const paint=()=>cells.forEach((c,i)=>{c.classList.toggle('sel',line.includes(i));c.classList.toggle('ok',[...found].some(w=>S5.pos[w].includes(i)));});
 const mkLine=([r1,c1])=>{const[r0,c0]=start;let dr=r1-r0,dc=c1-c0;const n=Math.max(Math.abs(dr),Math.abs(dc));if(!n)return[r0*5+c0];
  const a=Math.atan2(dr,dc),k=Math.round(a/(PI/4)),sr=Math.round(Math.sin(k*PI/4)),sc=Math.round(Math.cos(k*PI/4)),L=[];for(let i=0;i<=n;i++){const r=r0+sr*i,c=c0+sc*i;if(r<0||r>4||c<0||c>4)break;L.push(r*5+c);}return L;};
 grid.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();pid=e.pointerId;try{grid.setPointerCapture(pid);}catch(x){}start=cellAt(e.clientX,e.clientY);line=mkLine(start);paint();});
 grid.addEventListener('pointermove',e=>{if(pid!==e.pointerId||!start)return;e.preventDefault();line=mkLine(cellAt(e.clientX,e.clientY));paint();});
 const end=e=>{if(pid!==e.pointerId||!start)return;e.preventDefault();pid=null;start=null;const L=line.join(','),w=set[1].find(w=>!found.has(w)&&(S5.pos[w].join(',')===L||[...S5.pos[w]].reverse().join(',')===L));
  if(w){found.add(w);ac++;sfx('ok');const el=d.querySelector(`[data-w="${w}"]`);el.textContent=w;el.classList.add('f');}else if(line.length>1)sfx('error');line=[];paint();};
 grid.addEventListener('pointerup',end);grid.addEventListener('pointercancel',end);
 V4.sopa={grid,S5,set};
 try{await new Promise((r,j)=>anim(dt=>{if(rid!==RUN){j(new Stop());return false;}t-=dt;d.querySelector('.tm').textContent=mmss(t);if(t<=0||found.size>=set[1].length){r();return false;}return true;}));
  set[1].forEach(w=>{if(!found.has(w)){S5.pos[w].forEach(i=>cells[i].classList.add('miss'));const el=d.querySelector(`[data-w="${w}"]`);el.textContent=w;}});
  say(found.size<set[1].length?`Estaban: <b>${set[1].filter(w=>!found.has(w)).join(', ')}</b>`:'¡Todas encontradas!');await wait(1.8,rid);}finally{d.remove();}
 await soloEnd(ac,rid);};
ETAPAS[2019].pr.forEach(p=>{if(p[0]=='u4')p[1]=unaDeCuatro;if(p[0]=='sopa')p[1]=sopaDeLetras;});
Object.assign(DBG,{unaDeCuatro,sopaDeLetras,V4,personV4});
