'use strict';
// ===== Pasapalabra 3D · Etapa 2007 · v0.1 =====
const T=THREE,$=s=>document.querySelector(s),PI=Math.PI;
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const OPT=Object.assign({mus:0.8,sfx:0.9,plato:2007,etapa:2007},JSON.parse(localStorage.getItem('pp3d_opt')||'{}'));
const saveOpt=()=>localStorage.setItem('pp3d_opt',JSON.stringify(OPT));
// ---------- render ----------
const R=new T.WebGLRenderer({canvas:$('#c'),antialias:false,powerPreference:'high-performance'});
const PR=Math.min(window.devicePixelRatio||1,1.25);R.setPixelRatio(PR);R.autoClear=false;
R.outputColorSpace=T.SRGBColorSpace;
const S=new T.Scene();S.background=new T.Color(0x0b1838);S.fog=new T.Fog(0x0b1838,26,60);
const cam=new T.PerspectiveCamera(38,16/9,0.1,120);
const cam2=new T.PerspectiveCamera(30,8/9,0.1,120);
const GS=new T.Scene();const GZ=2041.5;const gcam=new T.PerspectiveCamera(20,16/9,200,4000);gcam.position.z=GZ;
GS.add(new T.AmbientLight(0xffffff,1.25));{const d=new T.DirectionalLight(0xffffff,2.2);d.position.set(-300,500,900);GS.add(d);const d2=new T.DirectionalLight(0x9fc0ff,0.8);d2.position.set(400,-300,500);GS.add(d2);}
let W=1280,H=720,GW=1280;
function resize(){if(typeof ASK!=='undefined'&&ASK&&document.activeElement===document.getElementById('kb')&&innerWidth===W&&innerHeight<H)return;/* v0.9.1: con el teclado abierto NO se reescala el 3D */W=innerWidth;H=innerHeight;R.setSize(W,H,false);cam.aspect=W/H;cam.updateProjectionMatrix();gcam.aspect=W/H;gcam.updateProjectionMatrix();GW=720*W/H;if(window.onGW)onGW();}
addEventListener('resize',resize);
// v0.9.1: al tocar la escena 3D mientras se escribe no se pierde el foco del campo (el teclado no se cierra) y el documento no se desplaza
(()=>{const c=document.getElementById('c');document.addEventListener('pointerdown',e=>{const t=e.target;if(document.body.classList.contains('askon')&&document.activeElement===document.getElementById('kb')&&!(t.closest&&t.closest('button,input,a,#menu,#modal,#dvdhost9')))e.preventDefault();},true);addEventListener('scroll',()=>{if(scrollX||scrollY)scrollTo(0,0);});document.getElementById('kb').addEventListener('blur',()=>setTimeout(resize,60));})();
// ---------- anim ----------
const AN=[];const anim=f=>AN.push(f);
const eio=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,eout=k=>1-Math.pow(1-k,3),eback=k=>{const c=1.7;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);};
function tween(d,f,e=eio){return new Promise(r=>{let t=0;anim(dt=>{t+=dt;const k=Math.min(1,t/d);f(e(k),k);if(k>=1){r();return false;}return true;});});}
let RUN=0;// programme run id (cancels flows)
class Stop extends Error{}
const chk=id=>{if(id!==RUN)throw new Stop();};
function wait(s,id){return new Promise((r,j)=>{let t=0;anim(dt=>{if(id!==undefined&&id!==RUN){j(new Stop());return false;}t+=dt;if(t>=s){r();return false;}return true;});});}
// ---------- audio (solo audio original de los ficheros de Iker) ----------
const AU={};let musA=null;
function snd(n){if(!AU[n]){AU[n]=new Audio('snd/'+n+'.ogg');AU[n].preload='auto';}return AU[n];}
function sfx(n){if(OPT.sfx<=0)return;try{const a=snd(n).cloneNode();a.volume=OPT.sfx;a.play().catch(()=>{});}catch(e){}}
function music(n,loop=false){stopMusic();if(!n||OPT.mus<=0)return;const a=snd(n);a.currentTime=0;a.loop=loop;a.volume=OPT.mus;a.play().catch(()=>{});musA=a;}
function stopMusic(){if(musA){musA.pause();musA=null;}}
// ---------- textures ----------
function cv(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t._c=c;return t;}
function ftxt(g,s,x,y,size,col='#fff',al='center',maxw=1e9,stroke=0,w=900){const F=s==='Pasapalabra'?'K,N,Arial':'N,Arial';if(s==='Pasapalabra')w=400;let z=size;g.font=`${w} ${z}px ${F}`;while(g.measureText(s).width>maxw&&z>8){z-=1;g.font=`${w} ${z}px ${F}`;}g.textAlign=al;g.textBaseline='middle';if(stroke){g.lineJoin='round';g.lineWidth=stroke;g.strokeStyle='rgba(10,15,40,.85)';g.strokeText(s,x,y);}g.fillStyle=col;g.fillText(s,x,y);}
const AL='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';let ATLAS;
function makeAtlas(){ATLAS=cv(512,512,g=>{for(let i=0;i<AL.length;i++){const x=i%6,y=Math.floor(i/6);ftxt(g,AL[i],x*85.33+42.7,y*85.33+46,72);}});}
// merged quads of letters (1 draw call)
function letterCloud(items,opt={}){const n=items.length,P=new Float32Array(n*12),U=new Float32Array(n*8),C=new Float32Array(n*12),I=[];
 const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(P,3));g.setAttribute('uv',new T.BufferAttribute(U,2));g.setAttribute('color',new T.BufferAttribute(C,3));
 for(let i=0;i<n;i++){const it=items[i],k=Math.max(0,AL.indexOf(it.ch)),cx=k%6,cy=Math.floor(k/6),u0=cx/6,v1=1-cy/6,v0=v1-1/6,u1=u0+1/6;U.set([u0,v0,u1,v0,u1,v1,u0,v1],i*8);const c=new T.Color(it.c||0xffffff);for(let j=0;j<4;j++)C.set([c.r,c.g,c.b],i*12+j*3);I.push(i*4,i*4+1,i*4+2,i*4,i*4+2,i*4+3);}
 g.setIndex(I);const m=new T.Mesh(g,new T.MeshBasicMaterial({map:ATLAS,vertexColors:true,transparent:true,depthWrite:false,side:T.DoubleSide,fog:false,opacity:opt.op??1}));m.items=items;m.frustumCulled=false;
 const tmp=new T.Vector3(),u=new T.Vector3(),v=new T.Vector3(),up=new T.Vector3(0,1,0);
 m.upd=()=>{for(let i=0;i<n;i++){const it=items[i],s=it.s/2,p=it.p;if(it.n){u.crossVectors(up,it.n).normalize();if(u.lengthSq()<.01)u.set(1,0,0);v.crossVectors(it.n,u);}else{const a=it.r||0;u.set(Math.cos(a),Math.sin(a),0);v.set(-Math.sin(a),Math.cos(a),0);}
  const q=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let j=0;j<4;j++){tmp.copy(p).addScaledVector(u,q[j][0]*s).addScaledVector(v,q[j][1]*s);P.set([tmp.x,tmp.y,tmp.z],i*12+j*3);}}
  g.attributes.position.needsUpdate=true;};m.upd();return m;}
function sphereItems(n,r,colFn){const a=[];for(let i=0;i<n;i++){const y=1-2*(i+.5)/n,rr=Math.sqrt(1-y*y),th=i*2.39996;const nn=new T.Vector3(Math.cos(th)*rr,y,Math.sin(th)*rr);a.push({ch:AL[Math.floor(Math.random()*AL.length)],p:nn.clone().multiplyScalar(r),n:nn,s:r*.2,c:colFn(nn)});}return a;}
// ---------- materials ----------
const ML=c=>new T.MeshLambertMaterial({color:c}),MB=c=>new T.MeshBasicMaterial({color:c}),MP=(c,sh=60)=>new T.MeshPhongMaterial({color:c,shininess:sh,specular:0x666666});
// ---------- people (estilizadas, sin caras) ----------
const GEO={};
function geos(){GEO.torso=new T.CylinderGeometry(.19,.24,.62,8);GEO.head=new T.SphereGeometry(.13,10,8);GEO.hair=new T.SphereGeometry(.137,10,6,0,PI*2,0,PI*.55);GEO.leg=new T.BoxGeometry(.13,.5,.14);GEO.arm=new T.CylinderGeometry(.055,.05,.52,6);GEO.neck=new T.CylinderGeometry(.05,.06,.1,6);GEO.badge=new T.CylinderGeometry(.06,.06,.015,14);}
function person(o){const g=new T.Group(),sk=ML(o.skin||0xe0b090),sh=ML(o.shirt),pa=ML(o.pants||0x22252e);
 const t=new T.Mesh(GEO.torso,sh);t.position.y=1.12;g.add(t);const nk=new T.Mesh(GEO.neck,sk);nk.position.y=1.47;g.add(nk);
 const h=new T.Mesh(GEO.head,sk);h.position.y=1.62;h.scale.set(.95,1.08,1);g.add(h);const hr=new T.Mesh(GEO.hair,ML(o.hair||0x3a2a1a));hr.position.y=1.635;hr.rotation.x=-.25;g.add(hr);g.head=h;{const em=MB(0x1a1410);for(const ex of[-.045,.045]){const e=new T.Mesh(GEO.eye||(GEO.eye=new T.SphereGeometry(.016,6,4)),em);e.position.set(ex,1.64,.122);g.add(e);}}
 if(o.long){const lh=new T.Mesh(new T.CylinderGeometry(.14,.16,.3,10,1,true,PI*.32,PI*1.36),hr.material);lh.position.set(0,1.52,-.01);g.add(lh);}
 const armL=new T.Mesh(GEO.arm,sh),armR=new T.Mesh(GEO.arm,sh);armL.position.set(-.27,1.13,0);armR.position.set(.27,1.13,0);armL.rotation.z=.12;armR.rotation.z=-.12;g.add(armL,armR);g.arms=[armL,armR];
 const l1=new T.Mesh(GEO.leg,pa),l2=new T.Mesh(GEO.leg,pa);
 if(o.sit){t.position.y=1.12;[l1,l2].forEach((l,i)=>{l.position.set(i?.1:-.1,.78,.22);l.rotation.x=PI/2;g.add(l);const s=new T.Mesh(GEO.leg,pa);s.position.set(i?.1:-.1,.5,.45);g.add(s);});armL.rotation.x=armR.rotation.x=-.9;armL.position.z=armR.position.z=.18;armL.position.y=armR.position.y=1.08;}
 else{l1.position.set(-.1,.55,0);l2.position.set(.1,.55,0);l1.scale.y=l2.scale.y=2.2;l1.position.y=l2.position.y=.55;g.add(l1,l2);}
 if(o.badge){const b=new T.Mesh(GEO.badge,MP(o.badge));b.rotation.x=PI/2;b.position.set(.1,1.28,.215);g.add(b);}
 if(!o.sit)g.children.forEach(m=>{if(m!==l1&&m!==l2)m.position.y+=.3;});return g;}
// ---------- PLATÓ 2007 ----------
const P={};// refs
function floorTex(){return cv(1024,1024,(g,w)=>{const c=w/2;let gr=g.createRadialGradient(c,c,0,c,c,c);gr.addColorStop(0,'#e9eef6');gr.addColorStop(.14,'#dfe6f1');gr.addColorStop(.17,'#9ec4ff');gr.addColorStop(.185,'#3f7dff');gr.addColorStop(.205,'#cfd8e6');gr.addColorStop(.27,'#c4cedd');gr.addColorStop(.3,'#5d8cf0');gr.addColorStop(.315,'#9aa8bf');gr.addColorStop(.6,'#6f7d96');gr.addColorStop(1,'#2a3550');g.fillStyle=gr;g.fillRect(0,0,w,w);
 g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=3;for(let r of [.33,.42]){g.beginPath();g.arc(c,c,c*r,0,PI*2);g.stroke();}});}
function screenTex(){return cv(1024,512,(g,w,h)=>{let gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#3d8dfa');gr.addColorStop(.5,'#2f7ef5');gr.addColorStop(1,'#1f5fd8');g.fillStyle=gr;g.fillRect(0,0,w,h);
 for(let i=0;i<260;i++){g.globalAlpha=rnd(.25,.75);ftxt(g,pick([...AL]),rnd(0,w),rnd(0,h),rnd(16,46),'#bfe0ff');}g.globalAlpha=1;
 g.save();g.shadowColor='rgba(0,40,120,.6)';g.shadowBlur=10;g.restore();scrBall(g,w,h,0);});}
function scrBall(g,w,h,bl){const cx=w/2,cy=h/2,r=h*.38;for(let i=0;i<300;i++){const y=1-2*(i+.5)/300,rr=Math.sqrt(1-y*y),th=i*2.39996,z=(Math.sin(th)*rr+1)/2;g.globalAlpha=.3+z*.6;ftxt(g,pick([...AL]),cx+Math.cos(th)*rr*r,cy-y*r,8+z*14,bl?`hsl(210,90%,${60+z*25}%)`:`hsl(${345-(1-y)*40},85%,${50+z*25}%)`);}g.globalAlpha=1;g.save();g.shadowColor='rgba(0,30,90,.7)';g.shadowBlur=10;ftxt(g,'Pasapalabra',cx,cy,h*.5,'#ffffff','center',r*3.44,0,700);g.restore();}
function wallTex(){const L='BPKDNGRSZCFW';return cv(512,256,(g,w,h)=>{for(let i=0;i<4;i++){const x=i*128;let gr=g.createLinearGradient(x,0,x+128,h);gr.addColorStop(0,'#f4f6fa');gr.addColorStop(1,'#c9d0dc');g.fillStyle=gr;g.fillRect(x+4,4,120,h-8);
 ftxt(g,pick([...L]),x+64,h*.55,150,'#1b1d24');ftxt(g,pick([...L]),x+30,40,40,pick(['#1b1d24','#d12a2a','#2a56d1']));g.fillStyle='#8890a0';g.fillRect(x,0,4,h);}});}
function buildPlato(){const root=new T.Group();S.add(root);P.root=root;
 S.add(new T.HemisphereLight(0xe8f0ff,0x2a3a66,1.6));const d=new T.DirectionalLight(0xffffff,1.6);d.position.set(4,12,10);S.add(d);
 const fl=new T.Mesh(new T.CircleGeometry(30,48),new T.MeshBasicMaterial({map:floorTex()}));fl.rotation.x=-PI/2;fl.position.y=-.22;root.add(fl);P.fl=fl;
 const plat=new T.Mesh(new T.CylinderGeometry(5.6,5.6,.22,64),[MP(0xdfe6f0,60),MP(0xf3f6fb,80),MP(0xf3f6fb)]);plat.position.y=-.11;root.add(plat);
 const led=new T.Mesh(new T.TorusGeometry(5.62,.05,6,80),MB(0x5aa0ff));P.led=led;led.rotation.x=PI/2;led.position.y=-.2;root.add(led);
 // mesa central circular (anillo blanco, frontal plateado, aro de luz azul)
 const top=new T.Mesh(new T.RingGeometry(2.45,3.65,56),MP(0xf6f8fc,90));top.rotation.x=-PI/2;top.position.y=1.06;root.add(top);
 const front=new T.Mesh(new T.CylinderGeometry(3.6,3.45,1.0,56,1,true),MP(0xc9d2de,40));front.position.y=.55;root.add(front);
 const inner=new T.Mesh(new T.CylinderGeometry(2.48,2.48,1.0,40,1,true),new T.MeshLambertMaterial({color:0x8fa0b8,side:T.BackSide}));inner.position.y=.55;root.add(inner);
 const band=new T.Mesh(new T.CylinderGeometry(3.66,3.66,.12,56,1,true),MB(0x5aa0ff));band.position.y=.9;P.band=band;root.add(band);
 const glow=new T.Mesh(new T.TorusGeometry(3.5,.07,6,64),MB(0x3a7bff));P.glow=glow;glow.rotation.x=PI/2;glow.position.y=.06;root.add(glow);
 const lip=new T.Mesh(new T.TorusGeometry(3.64,.04,4,64),MP(0xffffff,100));lip.rotation.x=PI/2;lip.position.y=1.06;root.add(lip);
 const glass=new T.Mesh(new T.CircleGeometry(2.45,40),new T.MeshBasicMaterial({color:0x6ea0e0,transparent:true,opacity:.55}));glass.rotation.x=-PI/2;glass.position.y=.7;root.add(glass);
 // taburetes negros con pie cromado
 const stoolG=new T.CylinderGeometry(.26,.26,.08,14),poleG=new T.CylinderGeometry(.035,.035,.8,6),baseG=new T.CylinderGeometry(.28,.3,.04,14),bk=ML(0x15161a),cr=MP(0xd8dde6,120);
 P.stool=(x,z)=>{const g=new T.Group();const s=new T.Mesh(stoolG,bk);s.position.y=.82;const p=new T.Mesh(poleG,cr);p.position.y=.4;const b=new T.Mesh(baseG,cr);b.position.y=.02;g.add(s,p,b);g.position.set(x,0,z);root.add(g);return g;};
 // pantalla azul grande + esfera de letras girando
 const scr=new T.Mesh(new T.PlaneGeometry(13,6.5),new T.MeshBasicMaterial({map:screenTex()}));scr.position.set(0,3.6,-11);root.add(scr);P.scr=scr;
 const frame=new T.Mesh(new T.BoxGeometry(13.4,6.9,.3),MP(0xd0d6e2));frame.position.set(0,3.6,-11.2);P.frame=frame;root.add(frame);
 P.sphere=letterCloud(sphereItems(150,2.3,n=>new T.Color().setHSL(.58,.8,.82+n.y*.1)),{op:.9});P.sphere.material.opacity=.85;P.sphere.position.set(0,3.2,-10.2);root.add(P.sphere);
 // paredes con letras en relieve
 const wt=wallTex();wt.wrapS=T.RepeatWrapping;wt.repeat.set(-6,1);
 for(const [a0,a1] of [[PI*.62,PI*1.18],[-PI*.18,PI*.38]]){const wall=new T.Mesh(new T.CylinderGeometry(17,17,5,24,1,true,a0+PI/2,a1-a0),new T.MeshBasicMaterial({map:wt,side:T.BackSide}));wall.position.y=7.2;(P.walls=P.walls||[]).push(wall);wall.rotation.y=PI;root.add(wall);}
 for(let i=0;i<14;i++){const a=PI*.62+i*(PI*.56)/13,b=new T.Mesh(new T.BoxGeometry(.5,9.7,.5),MP(0xe8ecf3));b.position.set(Math.cos(a)*16.6,4.85,-Math.sin(a)*16.6);root.add(b);const a2=-PI*.18+i*(PI*.56)/13,b2=b.clone();b2.position.set(Math.cos(a2)*16.6,4.85,-Math.sin(a2)*16.6);root.add(b2);}
 // gradas con público
 const tiers=[[PI*.58,PI*1.22],[-PI*.22,PI*.42]];const steps=new T.Group();root.add(steps);
 const seatsPos=[];
 for(const [a0,a1] of tiers)for(let k=0;k<4;k++){const r=9+k*1.5,y=k*.75;const tp=new T.Mesh(new T.RingGeometry(r-.2,r+1.3,24,1,a0,a1-a0),ML(k%2?0x2d4f9a:0x3a63b8));tp.rotation.x=-PI/2;tp.position.y=y+.75;steps.add(tp);const fr=new T.Mesh(new T.CylinderGeometry(r-.2,r-.2,y+.75,24,1,true,PI/2+a0,a1-a0),ML(0x1d2f60));fr.position.y=(y+.75)/2;fr.rotation.y=PI;steps.add(fr);
  const n=Math.floor((a1-a0)*r/.62);for(let i=0;i<n;i++){const a=a0+(i+.5)*(a1-a0)/n;seatsPos.push([Math.cos(a)*(r+.6),y+.75,-Math.sin(a)*(r+.6),a]);}
  const rail=new T.Mesh(new T.TorusGeometry(r-.05,.03,4,40,a1-a0),cr);rail.rotation.x=-PI/2;rail.rotation.z=a0;rail.position.y=y+1.05+(k==0?0:0);if(k==0)steps.add(rail);}
 // público (instanced: 3 draw calls)
 const N=seatsPos.length,bodyM=new T.InstancedMesh(new T.CylinderGeometry(.2,.25,.7,7),new T.MeshLambertMaterial(),N),headM=new T.InstancedMesh(new T.SphereGeometry(.14,8,6),new T.MeshLambertMaterial(),N),hairM=new T.InstancedMesh(new T.SphereGeometry(.148,8,4,0,PI*2,0,PI*.55),new T.MeshLambertMaterial(),N);
 const shirts=[0xc0392b,0xf1f1f1,0x2c3e70,0x7a2e8c,0xe67e22,0x1f1f24,0x3e8e5a,0xd8c9a8,0x5b7fbf,0xb33a6a,0x777777],skins=[0xf0c8a0,0xe0b090,0xc8956a,0xa8754a],hairs=[0x2a1a10,0x5a3a20,0xb08a50,0x111111,0xaaaaaa,0x8a3a1a];
 const m4=new T.Matrix4(),q=new T.Quaternion(),sc=new T.Vector3(1,1,1);P.aud=[];
 seatsPos.forEach((s,i)=>{const pos=new T.Vector3(s[0],s[1]+.35,s[2]);P.aud.push(pos);m4.compose(pos,q,sc);bodyM.setMatrixAt(i,m4);bodyM.setColorAt(i,new T.Color(pick(shirts)));const hp=pos.clone();hp.y+=.52;m4.compose(hp,q,sc);headM.setMatrixAt(i,m4);headM.setColorAt(i,new T.Color(pick(skins)));hp.y+=.02;m4.compose(hp,q,sc);hairM.setMatrixAt(i,m4);hairM.setColorAt(i,new T.Color(pick(hairs)));});
 root.add(bodyM,headM,hairM);P.audM=[bodyM,headM,hairM];
 // techo: focos y barras de luz azul
 const fx=new T.BoxGeometry(.35,.3,.35),fm=MB(0xfff6d8);for(let i=0;i<22;i++){const a=i/22*PI*2,f=new T.Mesh(fx,fm);f.position.set(Math.cos(a)*11,10,Math.sin(a)*11);root.add(f);}
 const ring=new T.Mesh(new T.TorusGeometry(11,.08,4,64),MB(0x3f8cff));ring.rotation.x=PI/2;ring.position.y=10.3;P.cring=ring;root.add(ring);
 const beamM=new T.MeshBasicMaterial({color:0x7fb0ff,transparent:true,opacity:.07,depthWrite:false,side:T.DoubleSide});for(let i=0;i<6;i++){const b=new T.Mesh(new T.ConeGeometry(1.6,10,10,1,true),beamM);const a=PI*.2+i*PI*.12;b.position.set(Math.cos(a)*7,5,-Math.sin(a)*7-2);b.rotation.z=rnd(-.3,.3);root.add(b);}
 // pantallitas laterales con letras
 for(const sx of [-1,1]){const p=new T.Mesh(new T.PlaneGeometry(3.2,1.8),new T.MeshBasicMaterial({map:screenTex()}));p.position.set(sx*9.2,5.2,-8.6);(P.sideS=P.sideS||[]).push(p);p.rotation.y=-sx*.55;root.add(p);}
 // personajes: presentador + equipos (azul = tú, naranja = rival CPU)
 P.host=person({shirt:0x26262c,pants:0x1a1d26,hair:0x9a7a4a});P.host.position.set(0,0,-4.3);root.add(P.host);
 P.seats={b:[[3.95,.5],[3.75,1.6],[4.15,-.65]],o:[[-3.95,.5],[-3.75,1.6],[-4.15,-.65]]};// v0.10: equipos de 3 personas
 const mk=(team,i,o)=>{const [x,z]=P.seats[team][i];P.stool(x,z);const p=person(Object.assign({sit:true,badge:team=='b'?0x2a6af0:0xf07a1a},o));p.position.set(x,0,z);p.lookAt(0,0,z*.5);root.add(p);
  const pul=new T.Group();const hm=MP(0xd5d9e0,140);for(const s of [-1,1]){const hs=new T.Mesh(new T.SphereGeometry(.17,14,8,0,PI*2,0,PI/2),hm);hs.position.x=s*.19;pul.add(hs);}const bs=new T.Mesh(new T.BoxGeometry(.6,.05,.25),MP(0x9aa2b0));pul.add(bs);pul.position.set(x*.86,1.08,z*.86);pul.lookAt(x*2,1.08,z*2);root.add(pul);p.pul=pul;pul.visible=false;return p;};
 P.ply=mk('b',0,{shirt:0xf2f2f6,hair:0x2a1c12});P.ply2=mk('b',1,{shirt:0x3a3f8a,hair:0x6a4a2a,long:true,skin:0xf0c8a0});
 P.cpu=mk('o',0,{shirt:0x8a5a3a,hair:0xa8331a,long:true,skin:0xf0c8a0});P.cpu2=mk('o',1,{shirt:0xffffff,hair:0x1a1a1a});
 P.ply3=mk('b',2,{shirt:0x2b6a5a,hair:0x1a1410,skin:0xc89870});P.cpu3=mk('o',2,{shirt:0x6a2b3a,hair:0x6a4a2a,long:true,skin:0xe0b090});
 // silla del rosco (delante de la pantalla)
 P.rStool=P.stool(0,-4.9);P.rStool.visible=false;
 P.rosc=person({shirt:0xf2f2f6,hair:0x2a1c12,badge:0x2a6af0});P.rosc.position.set(0,0,-4.9);P.rosc.visible=false;root.add(P.rosc);P.heads=[P.host,P.ply,P.ply2,P.ply3,P.cpu,P.cpu2,P.cpu3,P.rosc];
}
// ---------- cámaras de TV ----------
const V3=(x,y,z)=>new T.Vector3(x,y,z);
const SHOTS={
 wide:{p:V3(9.5,6.2,10.5),l:V3(-.5,.6,-1.5),f:42,dr:.4},
 wide2:{p:V3(-8,4.2,9),l:V3(.5,.9,-2),f:40,dr:.4},
 front:{p:V3(0,3.2,10),l:V3(0,1.4,-3),f:38,dr:.3},
 host:{p:V3(0,1.9,-1.9),l:V3(0,1.72,-4.3),f:34,dr:.04},
 hostc:{p:V3(0,1.95,-1.6),l:V3(0,1.95,-4.3),f:26,dr:.04},
 blue:{p:V3(1.5,1.66,.1),l:V3(3.95,1.5,.5),f:30,dr:.03},
 orange:{p:V3(-1.5,1.66,.1),l:V3(-3.95,1.5,.5),f:30,dr:.03},
 team_b:{p:V3(.2,1.8,-1.2),l:V3(3.9,1.4,1),f:40,dr:.05},
 team_o:{p:V3(-.2,1.8,-1.2),l:V3(-3.9,1.4,1),f:40,dr:.05},
 rosco:{p:V3(0,1.86,-2.3),l:V3(0,1.82,-4.9),f:30,dr:.03},
 aud:{p:V3(2,2.4,1),l:V3(-7,1.6,-6),f:40,dr:.2},
 menu:{p:V3(10,5.5,9),l:V3(-1,1,-3),f:44,dr:1},
};
let SHOT=SHOTS.wide,shotT=0,camAuto=null;
function cut(n){SHOT=typeof n=='string'?SHOTS[n]:n;shotT=0;}
function updCam(dt,c=cam,sh=SHOT){shotT+=dt;const s=sh,dr=s.dr,t=shotT;c.position.copy(s.p).add(V3(Math.sin(t*.23)*dr,Math.sin(t*.17)*dr*.4,Math.cos(t*.19)*dr*.5));if(P.heads)for(const h of P.heads){if(!h.parent||!h.visible)continue;const hp=h.position.clone().setY(1.6);const dd=c.position.distanceTo(hp);if(dd<.75){c.position.add(c.position.clone().sub(hp).normalize().multiplyScalar(.75-dd));}}c.fov=s.f;c.updateProjectionMatrix();c.lookAt(s.l);}
// ---------- GRAFISMOS 3D (escena superpuesta con luz y volumen) ----------
const COL={or:0xec7a16,orD:0xb85a08,bl:0x2f5fe0,blD:0x163a9e,pu:0xa21f9a,gr:0x37c23a,rd:0xd42020,wh:0xf4f6fb,gold:0xffc21a};
const G=new T.Group();GS.add(G);
function rrShape(w,h,r){const s=new T.Shape(),x=-w/2,y=-h/2;r=Math.min(r,h/2,w/2);s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;}
function ext(shape,d,b=2){return new T.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelThickness:b,bevelSize:b*.8,bevelSegments:2,curveSegments:4});}
// etiqueta de texto (canvas) — con brillo superior tipo TV
function label(w,h,draw){const k=Math.min(2,1400/w);const t=cv(Math.round(w*k),Math.round(h*k),(g,cw,ch)=>draw(g,cw,ch,k));t.minFilter=T.LinearFilter;t.generateMipmaps=false;const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:t,transparent:true,depthWrite:false}));
 m.set=fn=>{const c=t._c,g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);(fn||draw)(g,c.width,c.height,k);t.needsUpdate=true;};return m;}
function gloss(g,w,h){const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'rgba(255,255,255,.38)');gr.addColorStop(.48,'rgba(255,255,255,.08)');gr.addColorStop(.5,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,30,.18)');g.fillStyle=gr;g.fillRect(0,0,w,h);}
// barra: cuerpo de color con borde blanco biselado
function bar(w,h,col,txt='',o={}){const g=new T.Group();const bw=o.bw??4;
 const back=new T.Mesh(ext(rrShape(w+bw*2,h+bw*2,o.r??3),6,2),MP(o.border??COL.wh,90));back.position.z=-8;g.add(back);
 const face=new T.Mesh(ext(rrShape(w,h,o.r??2),4,1.5),MP(col,50));face.position.z=-1;g.add(face);g.face=face;
 const L=label(w,h,(c,cw,ch,k)=>{gloss(c,cw,ch);if(g.txt)ftxt(c,g.txt,o.al=='l'?14*k:cw/2,ch/2+2*k,(o.fs||h*.62)*k,'#fff',o.al=='l'?'left':'center',cw-20*k,0);if(g.hl)g.hl(c,cw,ch,k);});L.position.z=6;g.add(L);g.L=L;g.txt=txt;L.set();
 g.setT=(s,c)=>{g.txt=s;if(c!==undefined)face.material.color.setHex(c);L.set();};g.setC=c=>face.material.color.setHex(c);return g;}
// círculo de tiempo ovalado (naranja o azul) con aro blanco
function timer(col){const g=new T.Group();const d=new T.Mesh(new T.CylinderGeometry(44,44,14,40),[MP(col,40),MP(col,70),MP(col)]);d.rotation.x=PI/2;g.add(d);g.d=d;
 const rim=new T.Mesh(new T.TorusGeometry(44,4.5,8,48),MP(COL.wh,120));rim.position.z=2;g.add(rim);
 const L=label(100,70,(c,cw,ch)=>{ftxt(c,String(g.v??''),cw/2,ch/2+4,ch*.78,'#fff','center',cw,0);});L.position.z=10;g.add(L);g.scale.x=1.32;
 g.set=v=>{if(v===g.v)return;g.v=v;L.set();};g.setC=c=>d.material.forEach(m=>m.color.setHex(c));g.set(0);return g;}
function bigTxt(w,h,s,o={}){// texto con volumen: capas apiladas
 const g=new T.Group();const n=o.layers??7;for(let i=n;i>=0;i--){const L=label(w,h,(c,cw,ch)=>{c.save();if(i==0&&o.glow){c.shadowColor=o.glow;c.shadowBlur=20;}ftxt(c,s,cw/2,ch/2,ch*.7,i==0?(o.grad?(()=>{const gr=c.createLinearGradient(0,ch*.15,0,ch*.85);o.grad.forEach((x,j)=>gr.addColorStop(j/(o.grad.length-1),x));return gr;})():o.col||'#fff'):(o.side||'#8a5a00'),'center',cw-10,0);c.restore();});L.position.set(i*.9,-i*1.1,-i*1.5);g.add(L);}return g;}
function clearG(){while(G.children.length){const c=G.children.pop();c.traverse(m=>{if(m.geometry)m.geometry.dispose();if(m.material){[].concat(m.material).forEach(x=>{if(x.map&&x.map!==ATLAS)x.map.dispose();x.dispose();});}});}}
// "mosca" de la cadena abajo a la derecha (estilizada)
let MOSCA;function mosca(){MOSCA=bigTxt(70,70,'5',{col:'#e8ecf4',side:'#7d8494',layers:3});GS.add(MOSCA);MOSCA.visible=false;}
function placeMosca(){if(MOSCA)MOSCA.position.set(GW/2-70,-300,200);}
// ===== ROSCO 2007: discos 3D con aro metálico alrededor de la cabeza =====
const LETRAS='ABCDEFGHIJLMNÑOPQRSTUVXYZ'.split('');
function roscoGraf(){const g=new T.Group();G.add(g);const discG=new T.CylinderGeometry(25,25,9,28),ringG=new T.TorusGeometry(25,3.4,6,30),side=MP(0xd8dde8,140),rim=MP(0xe6eaf2,150);g.d=[];
 LETRAS.forEach((ch,i)=>{const a=PI/2-i*(2*PI/25)-PI/25,dg=new T.Group(),top=MP(COL.bl,80);const cyl=new T.Mesh(discG,[side,top,side]);cyl.rotation.x=PI/2;dg.add(cyl);const r=new T.Mesh(ringG,rim);r.position.z=4.6;dg.add(r);
  const L=label(48,48,(c,cw,ch)=>{gloss(c,cw,ch);ftxt(c,ch=='Ñ'?'Ñ':ch,cw/2,ch/2+3,ch*.72,'#fff','center',cw,6);});L.position.z=5.2;L.material.map.minFilter=T.LinearFilter;dg.add(L);
  // máscara redonda del brillo
  L.set((c,cw,chh)=>{c.save();c.beginPath();c.arc(cw/2,chh/2,cw/2-1,0,PI*2);c.clip();gloss(c,cw,chh);c.restore();ftxt(c,ch,cw/2,chh/2+3,chh*.7,'#fff','center',cw,6);});
  dg.home=new T.Vector3(Math.cos(a)*218,Math.sin(a)*238+18,0);dg.position.copy(dg.home);dg.top=top;dg.st=0;g.add(dg);g.d.push(dg);});
 g.state=(i,s)=>{const d=g.d[i];d.st=s;d.top.color.setHex(s==1?COL.gr:s==2?COL.rd:COL.bl);};
 g.act=-1;g.setAct=i=>{g.act=i;};
 g.tick=t=>{g.d.forEach((d,i)=>{const on=i==g.act&&d.st==0;const s=on?1.28+Math.sin(t*6)*.04:1;d.scale.setScalar(d.scale.x+(s-d.scale.x)*.2);d.position.z=on?30:0;});};
 g.fly=async(dur=1.6)=>{g.d.forEach((d,i)=>{d.from=new T.Vector3(rnd(-900,900),rnd(-600,600),rnd(600,1400));d.position.copy(d.from);d.rotation.set(rnd(-3,3),rnd(-3,3),0);});
  await tween(dur,(e,k)=>{g.d.forEach((d,i)=>{const kk=Math.min(1,Math.max(0,(k*dur-i*.03)/(dur-.75)));const ee=eout(kk);d.position.lerpVectors(d.from,d.home,ee);d.rotation.x=(1-ee)*3;d.rotation.y=(1-ee)*-4;});},x=>x);};
 // tiempo y aciertos abajo-izquierda
 g.tm=timer(COL.bl);g.ac=bar(64,40,COL.bl,'0',{fs:32});G.add(g.tm,g.ac);
 g.place=()=>{g.tm.position.set(-GW/2+120,-215,0);g.ac.position.set(-GW/2+120,-280,0);};g.place();
 g.team=c=>{g.tm.setC(c);g.ac.setC(c);};
 return g;}
// ===== FONDO ROJO BURDEOS con iris (entrada: disco que crece; salida: agujero que se abre) =====
function redBg(blue){const m=new T.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{inR:{value:0},outR:{value:0},asp:{value:1.7},t:{value:0},bl:{value:blue?1:0},cen:{value:new T.Vector2(0,0)}},
 vertexShader:'varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'varying vec2 v;uniform float inR,outR,asp,t,bl;uniform vec2 cen;void main(){vec2 p=(v-.5)*vec2(asp,1.);float d=length(p-cen);if(d<inR||d>outR)discard;float k=smoothstep(0.,.75,length(p-vec2(-.1,.15)));vec3 c=mix(mix(vec3(.86,.05,.11),vec3(.36,0.,.04),k),mix(vec3(.42,.72,1.),vec3(.08,.3,.85),k),bl);c+=.03*sin(p.x*40.+t)*sin(p.y*30.-t);gl_FragColor=vec4(c,1.);}'});
 const pl=new T.Mesh(new T.PlaneGeometry(1,1),m);pl.renderOrder=-1;
 const ring=new T.Mesh(new T.TorusGeometry(1,.05,10,72),MP(0xffffff,150));ring.renderOrder=0;
 const ring2=new T.Mesh(new T.TorusGeometry(1,.028,8,72),MP(blue?0x1040c0:0xc0101c,60));
 const g=new T.Group();g.add(pl,ring,ring2);g.pl=pl;g.ring=ring;g.ring2=ring2;
 g.fit=()=>{pl.scale.set(GW+40,760,1);m.uniforms.asp.value=(GW+40)/760;};g.fit();
 g.set=(inR,outR,mode)=>{m.uniforms.inR.value=inR;m.uniforms.outR.value=outR;const r=(mode=='in'?outR:inR)*760;const tube=mode=='in'?Math.max(6,r*.08):Math.max(6,r*.07);ring.visible=ring2.visible=r>1&&r<GW*1.2;ring.scale.setScalar(r);ring2.scale.setScalar(r*.9);ring.position.z=40;ring2.position.z=38;const c=m.uniforms.cen.value;ring.position.x=ring2.position.x=c.x*760;ring.position.y=ring2.position.y=c.y*760;};
 return g;}
const RHYP=()=>Math.hypot(GW/760/2+.05,.55);
// texto que se escribe letra a letra
function typeLabel(w,h,lines,fs,al='center'){const L=label(w,h,()=>{});L.n=0;L.draw=n=>{L.set((c,cw,ch,k)=>{let left=n;lines.forEach((s,i)=>{const sub=s.slice(0,Math.max(0,Math.min(s.length,left)));left-=s.length;ftxt(c,sub,al=='left'?4:cw/2,ch/2+(i-(lines.length-1)/2)*fs*k*1.05,fs*k,'#fff',al,cw,0,800);});});};L.total=lines.join('').length;L.draw(0);return L;}
const CORT={
 escalera:{title:['La Escalera'],tx:.2,ty:.06,fs:70},
 pulsador:{title:['El Pulsador'],tx:.22,ty:0,fs:70},
 depar:{title:['de Par','en Par'],tx:0,ty:0,fs:72},
 imposible:{title:['La Palabra','imposible'],tx:0,ty:.02,fs:72},
 rosco:{title:["El","Rosco"],tx:0,ty:0,fs:100},
};
function letterRain(n,w,h,zr,blue){const it=[];for(let i=0;i<n;i++)it.push({ch:AL[Math.floor(Math.random()*AL.length)],p:new T.Vector3(rnd(-w/2,w/2),rnd(-h/2,h/2),rnd(zr[0],zr[1])),s:rnd(14,34),r:rnd(-.4,.4),c:blue?new T.Color(rnd(.6,.8),rnd(.78,.9),1):new T.Color(1,rnd(.55,.85),rnd(.6,.85)),vy:rnd(6,20),vx:rnd(-8,8)});return letterCloud(it,{op:.55});}
// construye la cortinilla de una prueba; devuelve objeto con setT(t) (t en segundos, total ≈5.5 s)
function makeCort(id,blue){const c=CORT[id],g=new T.Group();G.add(g);const bg=redBg(blue);g.add(bg);const inner=new T.Group();g.add(inner);
 const rain=letterRain(70,GW+200,800,[-300,100],blue);inner.add(rain);
 let art;const AW=GW;
 if(id=='escalera'){const it=[];for(let r=0;r<9;r++){const len=8+r;for(let i=0;i<len;i++)it.push({ch:AL[(r*7+i*3)%27],base:new T.Vector3(-AW*.45+r*40+i*46,-300+r*70,0),p:new T.Vector3(),s:36,r:0,c:0xffffff,row:r});}art=letterCloud(it,{op:.95});art.items.forEach(x=>x.p.copy(x.base));
  art.anim=t=>{art.items.forEach(x=>{const k=Math.min(1,Math.max(0,t*1.6-x.row*.12));x.p.set(x.base.x,x.base.y-(1-eout(k))*500,0);});art.upd();};art.rotation.set(-.85,.45,.2);art.position.set(-AW*.12,-60,0);}
 if(id=='pulsador'){const it=[];for(const s of [-1,1]){sphereItems(150,190,()=>new T.Color(1,1,1)).forEach(x=>{x.base=x.p.clone();x.lobe=s;x.s=17;it.push(x);});}art=letterCloud(it,{op:.9});
  art.anim=t=>{const q=new T.Quaternion();art.items.forEach(x=>{const a=t*1.1*x.lobe;const c=Math.cos(a),sn=Math.sin(a);const bx=x.base.x*c+x.base.z*sn,bz=-x.base.x*sn+x.base.z*c;const k=eout(Math.min(1,t*.8));x.p.set(-AW*.2+x.lobe*120*k+bx*1.0,bz*.15+x.base.y*.95+x.lobe*30,bz);x.n=null;x.r=0;});art.upd();};}
 if(id=='depar'){const it=[];const s='DEPARENPAR';for(let r=0;r<16;r++)for(let i=0;i<34;i++)it.push({ch:s[(i+r)%s.length],base:new T.Vector3(-AW*.7+i*44+r*36,-420+r*58,-60),p:new T.Vector3(),s:13,r:.42,c:0xffc8cc,row:r});art=letterCloud(it,{op:.7});
  art.anim=t=>{art.items.forEach(x=>{x.p.set(x.base.x+((t*90*(x.row%2?1:-1))%44),x.base.y+((t*40)%58),x.base.z);});art.upd();};}
 if(id=='imposible'){const it=[];const s='PIMPOSIBLE';for(let i=0;i<10;i++)it.push({ch:s[i],base:new T.Vector3(-AW*.38+i*AW*.085,rnd(-40,140),rnd(-100,60)),p:new T.Vector3(),s:i==0?240:rnd(80,150),r:rnd(-.5,.5),r0:0,c:0xffffff,d:i*.12});it.forEach(x=>x.r0=x.r);art=letterCloud(it,{op:.85});
  art.anim=t=>{art.items.forEach(x=>{const k=Math.min(1,Math.max(0,(t-x.d)*1.3));x.p.set(x.base.x,x.base.y+(1-eout(k))*700-(k>=1?Math.min(1,(t-x.d-.77)*.6)*60:0),x.base.z);x.r=x.r0*(1-k)*3;});art.upd();};
  art.material.opacity=.55;}
 if(id=='rosco'){const it=[];'ROSCO'.split('').forEach((ch,i)=>it.push({ch,a:i/5*PI*2,big:1,p:new T.Vector3(),s:90,s0:90,r:0,c:0xffffff}));for(let i=0;i<25;i++){const a=PI/2-i/25*PI*2;it.push({ch:AL[i%AL.length],a,small:1,p:new T.Vector3(),s:0,r:0,c:blue?0xffffff:0x9a0c22});}art=letterCloud(it,{op:.95});
  {const dg=new T.CircleGeometry(21,20),dm=new T.MeshBasicMaterial({color:blue?0x2a6af0:0xf2a8b4,transparent:true,opacity:.92});art.items.forEach(x=>{if(x.small){x.disc=new T.Mesh(dg,dm);x.c=blue?0xffffff:0xb0102a;}});art.discs=art.items.filter(x=>x.disc).map(x=>x.disc);}
  art.anim=t=>{const cx=0;art.items.forEach(x=>{if(x.big){const k=Math.min(1,t/1.3),a=x.a+t*2.2,R=40+130*eout(k);x.p.set(cx+Math.cos(a)*R,Math.sin(a)*R,0);x.r=a-PI/2;x.s=x.s0*Math.max(0,1-Math.max(0,t-.9)*1.6);}else{const k=Math.min(1,Math.max(0,(t-.9)*1.5)),a=x.a-t*.12;x.s=28*eout(k);x.p.set(cx+Math.cos(a)*300,Math.sin(a)*228,6);if(x.disc){x.disc.position.set(x.p.x,x.p.y,-4);x.disc.scale.setScalar(Math.max(.001,eout(k)));};x.r=a-PI/2;}});art.upd();};}
 if(c.mk)art=c.mk(AW,blue);
 inner.add(art);if(art.discs)inner.add(...art.discs);
 const tl=flyTitle(c.title,c.fs*(blue?1.45:1.05),c.al||(id=='escalera'||id=='pulsador'?'left':'center'),blue?'burst':OPT.etapa==2007?'drop':'zoom');tl.position.set(c.tx*GW+((c.al=='left'||id=='escalera'||id=='pulsador')?-190:0),c.ty*720,120);inner.add(tl);const fx=cortFx(id,blue,inner);
 const TM=blue?{inE:.5,ex:4.2,exD:.8,ts:1.45,dur:5}:OPT.etapa==2007?{inE:.9,ex:3.8,exD:2.0,ts:1.5,dur:5.9}:{inE:1.4,ex:3.8,exD:1.7,ts:1.2,dur:5.6};const CEN=bg.pl.material.uniforms.cen.value;
 const o={g,dur:TM.dur,setT(t){bg.pl.material.uniforms.t.value=t;const H=RHYP();
   if(t<TM.inE){const k=eio(t/TM.inE),kc=1-eio(Math.min(1,t/(TM.inE*.8)));CEN.set(blue?0:.13*kc,blue?0:.08*kc);bg.set(0,(.06+k*.94)*H*(1+.08*Math.sin(k*PI)),'in');if(blue)inner.visible=true;else bg.ring.scale.y*=1-.3*kc;bg.ring2.scale.y*=1-.3*kc;bg.ring.rotation.z=bg.ring2.rotation.z=kc*.6;inner.visible=blue||t>TM.inE*.5;}else if(t<TM.ex){CEN.set(0,0);bg.set(0,9,'none');inner.visible=true;}else{const k=eio(Math.min(1,(t-TM.ex)/TM.exD)),kc=1-eio(Math.min(1,(t-TM.ex)/TM.exD*1.3));CEN.set(blue?0:tl.position.x/760*kc*.8,blue?0:tl.position.y/760*kc*.8);bg.set(k*H*1.1,9,'out');inner.visible=blue?k<.15:k<.7;if(!blue){rain.visible=art.visible=k<.2;}}
   rain.items.forEach(x=>{x.p.y=((x.p.y+x.vy*.016+400)%800)-400;x.p.x+=x.vx*.016;});rain.upd();
   if(art.anim)art.anim(Math.max(0,t-.8));tl.anim(t-TM.ts);fx(t);
   inner.scale.setScalar(1+Math.max(0,t-.6)*.035);inner.rotation.y=Math.sin(t*.7)*.06;inner.rotation.x=-.04+t*.01;inner.position.y=-Math.max(0,t-1)*4;},
  free(){G.remove(g);g.traverse(m=>{if(m.geometry)m.geometry.dispose();});}};
 o.setT(0);return o;}
async function playCort(id,rid){const E=ETAPAS[OPT.etapa]||{};say();sfx(OPT.etapa==2007?'cortinilla':'cort'+OPT.etapa);const bl=!!E.blue;const c=makeCort(bl&&CORT[id+'B']?id+'B':id,bl);await tween(c.dur,(e,k)=>c.setT(k*c.dur),x=>x);c.free();chk(rid);}
// ===== CABECERA: rojo, letras que vuelan y forman la esfera, logo «Pasapalabra» =====
function makeCab(blue){const g=new T.Group();G.add(g);const bg=redBg(blue);g.add(bg);const inner=new T.Group();g.add(inner);
 const sp=sphereItems(240,210,n=>new T.Color().setHSL(blue?.6-(1-n.y)*.05:.97-(1-n.y)*.1,.9,.55+n.y*.08));sp.forEach(x=>{x.home=x.p.clone();x.hn=x.n.clone();x.from=new T.Vector3(rnd(-1500,1500),rnd(-900,900),rnd(-1200,900));x.s=34;});
 const cl=letterCloud(sp,{op:.95});inner.add(cl);const rain=letterRain(60,GW+200,800,[-400,0],blue);inner.add(rain);
 const logo=bigTxt(722,150,'Pasapalabra',{col:'#ffffff',side:'#9aa3b5',layers:6});logo.position.z=260;logo.scale.setScalar(.01);inner.add(logo);
 const rot=new T.Matrix4(),e=new T.Euler();
 const o={g,dur:9,setT(t){const H=RHYP();bg.pl.material.uniforms.t.value=t;
  if(t<7.6)bg.set(0,9,'none');else{const k=eio(Math.min(1,(t-7.6)/1.2));bg.set(k*H,9,'out');inner.visible=k<.4;}
  const k=Math.min(1,Math.max(0,(t-.3)/3.2));e.set(.3,t*.5,0);rot.makeRotationFromEuler(e);
  sp.forEach((x,i)=>{const kk=eout(Math.min(1,Math.max(0,k*1.4-i/sp.length*.4)));const hp=x.home.clone().applyMatrix4(rot);x.p.lerpVectors(x.from,hp,kk);x.n=x.hn.clone().applyMatrix4(rot);if(kk<1){x.n=null;x.r=(1-kk)*4;}const c=new T.Color().setHSL(.97-(1-hp.y/210)*.12,.9,.5+(hp.z/210)*.15);});cl.upd();
  rain.items.forEach(x=>{x.p.z+=4;if(x.p.z>300)x.p.z=-400;});rain.upd();
  const lk=Math.min(1,Math.max(0,(t-3.8)/.8));logo.scale.setScalar(.01+eback(lk)*1);logo.rotation.y=(1-lk)*1.2;
  inner.scale.setScalar(1+t*.02);},free(){G.remove(g);}};
 o.setT(0);return o;}
// ---------- UI ----------
const sub=$('#sub'),ansE=$('#ans'),acts=$('#acts'),KB=$('#kb'),toastE=$('#toast');
function say(html){if(!html){sub.classList.add('hidden');return;}sub.innerHTML=html;sub.classList.remove('hidden');}
function toast(s,ms=1800){toastE.textContent=s;toastE.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>toastE.classList.add('hidden'),ms);}
function setActs(list){acts.innerHTML='';(list||[]).forEach(b=>{const e=document.createElement('button');e.className='mbtn '+(b.cls||'');e.innerHTML=(b.ic?`<span class="ic">${b.ic}</span>`:'')+b.t;e.onpointerdown=ev=>{ev.stopPropagation();ev.preventDefault();b.cb();};acts.appendChild(e);});}
const norm=s=>s.toUpperCase().replace(/Ñ/g,'#').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/#/g,'Ñ').replace(/[^A-ZÑ0-9 ]/g,'').replace(/\s+/g,' ').trim();
let ASK=null;
function ask(stop){return new Promise(res=>{clearTimeout(KB.__t);KB.value='';ASK={res,stop};const upd=()=>{ansE.innerHTML=KB.value?KB.value.toUpperCase():'<i>Toca aquí para escribir ⌨</i>';};upd();ansE.classList.remove('hidden');document.body.classList.add('askon');KB.oninput=upd;
 // v0.9.1: el campo de texto es visible y se toca directamente (el teclado del sistema sale con un toque real); se escucha «input» (también durante la composición del teclado predictivo), nunca solo keydown
 try{KB.focus({preventScroll:true});}catch(e){}
 const fin=v=>{if(!ASK||ASK.res!==res)return;ASK=null;ansE.classList.add('hidden');clearTimeout(KB.__t);
  // sin parpadeo del teclado entre preguntas seguidas: si no llega otra pregunta en 350 ms, se oculta
  KB.__t=setTimeout(()=>{if(!ASK){document.body.classList.remove('askon');KB.blur();resize();}},350);res(v);};ASK.fin=fin;
 KB.onkeydown=e=>{if(e.key==='Enter'||e.keyCode===13){if(e.isComposing&&e.keyCode===229)return;e.preventDefault();fin(KB.value);}};
 $('#kbf').onsubmit=e=>{e.preventDefault();fin(KB.value);return false;};
 anim(()=>{if(!ASK||ASK.res!==res)return false;if(stop&&stop()){fin(null);return false;}return true;});});}
function askEnd(v=null){if(ASK)ASK.fin(v);}
// toques sobre los grafismos 3D
const ray=new T.Raycaster(),mv=new T.Vector2();let TAP=null;
// v0.8: el toque se resuelve al LEVANTAR el dedo y solo si no se ha movido (un deslizamiento ya no pulsa nada)
const TAP8={};$('#c').addEventListener('pointerdown',e=>{TAP8.id=e.pointerId;TAP8.x=e.clientX;TAP8.y=e.clientY;});$('#c').addEventListener('pointercancel',()=>{TAP8.id=null;});
$('#c').addEventListener('pointerup',e=>{if(TAP8.id!==e.pointerId)return;TAP8.id=null;if(Math.hypot(e.clientX-TAP8.x,e.clientY-TAP8.y)>12)return;if(MODE.menu)return;mv.set(e.clientX/W*2-1,-(e.clientY/H)*2+1);ray.setFromCamera(mv,gcam);const h=ray.intersectObjects(G.children,true).find(x=>{let o=x.object;while(o){if(o.userData.tap!==undefined)return true;o=o.parent;}return false;});
 if(h){let o=h.object;while(o.userData.tap===undefined)o=o.parent;if(TAP)TAP(o.userData.tap,o);return;}if(TAP)TAP(null,null,e);});
// ---------- estado de juego ----------
const MODE={menu:true,split:false};
const GAME={sec:[0,0],names:['Tú','Rival'],ac:[0,0]};
function setPeople(rosco){P.host.visible=!rosco;P.rStool.visible=false;P.rosc.visible=!!rosco;}
function hostSay(t){say('<b>Presentador:</b> '+t);}
let vozA=null;async function voz(k,rid){const V=(typeof VOZ!=='undefined'&&VOZ[OPT.etapa])||{};const c=V[k];if(!c)return false;cut('host');stopMusic();hostSay(c.t);if(OPT.mus>0||OPT.sfx>0){try{vozA=new Audio('snd/voz/'+c.f);vozA.volume=Math.max(OPT.mus,OPT.sfx,.6);vozA.play().catch(()=>{});}catch(e){}}try{await wait(c.d+.3,rid);}finally{if(vozA){vozA.pause();vozA=null;}}say();return true;}
async function rotulo(text,col,rid,secs=2.2){const b=bar(Math.min(GW*.6,560),56,col,text,{fs:30});b.position.set(0,-250,0);b.scale.set(.01,1,1);G.add(b);await tween(.35,e=>b.scale.x=e,eout);await wait(secs,rid);await tween(.25,e=>b.scale.x=1-e*.99);G.remove(b);}
async function cpuTurn(name,col,n,rid){// turno rápido del rival en las pruebas individuales
 cut('orange');const b=bar(420,50,col,'',{fs:28});b.position.set(-GW/2+280,-200,0);G.add(b);let a=0;for(let i=0;i<5;i++){const ok=Math.random()<n;if(ok)a++;b.setT(`ACIERTOS: ${a}`);sfx(ok?'ok':'error');await wait(.9,rid);}
 G.remove(b);return a;}
// ===== 1. LA ESCALERA =====
async function escalera(rid){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;const sets=shuffle(ORIG.ESC);let si=0,t=65,ac=0;
 cut('host');hostSay('<b>La Escalera</b>: cada palabra tiene una letra más que la anterior. ¡Sube todo lo que puedas!');await wait(3.2,rid);
 cut('blue');const tm=timer(COL.bl);tm.position.set(-GW/2+250,-235,20);G.add(tm);tm.set(t);
 const stack=new T.Group();G.add(stack);
 let run=true;anim(dt=>{if(!run||rid!==RUN)return false;if(!ASK)return true;t-=dt;tm.set(Math.max(0,Math.ceil(t)));return true;});
 while(t>0&&si<sets.length){const words=sets[si++].slice().reverse();while(stack.children.length)stack.remove(stack.children[0]);let prev='';
  for(let wi=0;wi<words.length&&t>0;wi++){const [w,,def]=words[wi];const b=bar(Math.max(210,w.length*34+40),48,COL.bl,'',{fs:30});b.position.set(-GW/2+250,-160+wi*62,0);stack.add(b);
   const mask=newLetters(prev,w);b.hl=(c,cw,ch,k)=>{const sp=30*k,x0=cw/2-(w.length-1)*sp/2;for(let i=0;i<w.length;i++)ftxt(c,b.show?w[i]:(i==0&&wi==0?w[0]:'_'),x0+i*sp,ch/2+2*k,26*k,b.show&&mask[i]?'#ffe36a':'#fff');};b.L.set();
   b.scale.set(.01,1,1);tween(.3,e=>b.scale.x=e,eback);
   hostSay(`${def} <b>(${w.length} letras)</b>`);
   const a=await ask(()=>t<=0||rid!==RUN);chk(rid);if(a===null)break;
   const ok=norm(a)===norm(w);b.show=true;b.setC(ok?COL.bl:COL.rd);b.L.set();sfx(ok?'ok':'error');if(ok)ac++;else{hostSay(`Era <b>${w}</b>.`);await wait(1,rid);}
   prev=w;}
 }
 run=false;say();chk(rid);sfx('winner');GAME.sec[0]+=ac*5;GAME.ac[0]+=ac;
 await rotulo(`AZUL: ${ac} ACIERTOS · +${ac*5} s`,COL.bl,rid);
 clearG();const c=await cpuTurn('Rival',COL.or,.65,rid);GAME.sec[1]+=c*5;await rotulo(`NARANJA: ${c} ACIERTOS · +${c*5} s`,COL.or,rid);clearG();}
function newLetters(prev,w){const m=[];const pool=prev.split('');for(const ch of w){const i=pool.indexOf(ch);if(i>=0){pool.splice(i,1);m.push(false);}else m.push(true);}return m;}
// ===== 2. EL PULSADOR (pantalla partida naranja / azul) =====
async function pulsador(rid){clearG();const set=pick(ORIG.PUL),qs=shuffle(set[1]).slice(0,5),sc=[0,0];
 cut('host');hostSay(`<b>El Pulsador</b>: pulsa antes que tu rival y acierta. Tema: <b>${set[0]}</b>.`);await wait(3,rid);
 P.ply.pul.visible=P.cpu.pul.visible=true;MODE.split=true;
 const fr=[];const mkFrame=(x0,col)=>{const w=GW/2-14,h=700;const g=new T.Group();const th=10;[[0,h/2-th/2,w,th],[0,-h/2+th/2,w,th],[-w/2+th/2,0,th,h],[w/2-th/2,0,th,h]].forEach(([x,y,ww,hh])=>{const m=new T.Mesh(ext(rrShape(ww,hh,2),6,2),MP(col,70));m.position.set(x,y,0);g.add(m);});g.position.set(x0,0,0);G.add(g);return g;};
 mkFrame(-GW/4,COL.or);mkFrame(GW/4,COL.bl);
 const qb=bar(GW*.62,74,COL.pu,'',{fs:26});qb.position.set(0,-286,30);G.add(qb);qb.hl=(c,cw,ch,k)=>{wrap(c,qb.q||'',cw/2,ch/2,cw-30*k,24*k);};
 const sb=[bar(56,42,COL.or,'0',{fs:30}),bar(56,42,COL.bl,'0',{fs:30})];sb[0].position.set(-GW*.31-40,-268,30);sb[1].position.set(GW*.31+40,-268,30);G.add(...sb);
 const strip=[bar(56,14,COL.or,''),bar(56,14,0xf2d21a,'')];strip[0].position.set(-GW*.31-40,-300,30);strip[1].position.set(GW*.31+40,-300,30);G.add(...strip);
 const flash=(p,c)=>{p.pul.children.forEach(m=>{m.material.emissive=new T.Color(c);});setTimeout(()=>p.pul.children.forEach(m=>m.material.emissive=new T.Color(0)),900);};
 for(let qi=0;qi<qs.length;qi++){const [q,a]=qs[qi];qb.q=q.toUpperCase();qb.L.set();qb.scale.y=.01;await tween(.3,e=>qb.scale.y=e,eback);
  let who=-1;const cpuAt=rnd(2.6,6.5);let tt=0;TAP=(id,o,e)=>{if(who<0&&(!e||e.clientX>W/2))who=0;};setActs([{t:'¡PULSAR!',ic:'●',cls:'y',cb:()=>{if(who<0)who=0;}}]);
  await new Promise(r=>anim(dt=>{if(rid!==RUN){r();return false;}tt+=dt;if(who<0&&tt>cpuAt)who=1;if(who>=0||tt>9){r();return false;}return true;}));chk(rid);setActs();TAP=null;
  const solve=async(p,reb)=>{if(p==0){flash(P.ply,0x2a6af0);sfx('ok');say('<b>¡Has pulsado tú!</b> Escribe la respuesta.');let tl=12;const v=await ask(()=>(tl-=.016)<=0||rid!==RUN);chk(rid);const ok=v!==null&&norm(v)===norm(a);return ok;}
   flash(P.cpu,0xf07a1a);sfx('ok');say('<b>Pulsa el equipo naranja…</b>');await wait(1.4,rid);const ok=Math.random()<(reb?.5:.66);say(`Naranja responde: <b>${ok?a.toUpperCase():pick(qs.filter(x=>x[1]!==a))[1].toUpperCase()}</b>`);await wait(1.3,rid);return ok;};
  if(who<0){say(`La respuesta era <b>${a.toUpperCase()}</b>.`);sfx('error');await wait(1.6,rid);continue;}
  let ok=await solve(who,false);if(ok){sc[who]++;sb[who].setT(String(sc[who]));sfx('ok');say(`¡<b>${a.toUpperCase()}</b>! Punto para el equipo ${who?'naranja':'azul'}.`);await wait(1.6,rid);continue;}
  sfx('error');const o=1-who;say('¡Rebote para el otro equipo!');await wait(1,rid);ok=await solve(o,true);if(ok){sc[o]++;sb[o].setT(String(sc[o]));sfx('ok');}say(`La respuesta: <b>${a.toUpperCase()}</b>.`);await wait(1.6,rid);}
 MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;say();clearG();GAME.sec[0]+=sc[0]*5;GAME.sec[1]+=sc[1]*5;GAME.ac[0]+=sc[0];sfx('winner');
 cut('wide');await rotulo(`AZUL ${sc[0]} · NARANJA ${sc[1]}`,COL.pu,rid);}
function wrap(c,s,x,y,maxw,fs){c.font=`900 ${fs}px N,Arial`;const ws=s.split(' ');const L=[];let cur='';ws.forEach(w=>{const t=cur?cur+' '+w:w;if(c.measureText(t).width>maxw&&cur){L.push(cur);cur=w;}else cur=t;});if(cur)L.push(cur);L.forEach((l,i)=>ftxt(c,l,x,y+(i-(L.length-1)/2)*fs*1.1,fs,'#fff','center',maxw));}
// ===== 3. DE PAR EN PAR =====
async function depar(rid){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;const set=pick(ORIG.PAR),items=set[1],names=shuffle(items.map(x=>x[0])),clues=shuffle(items.slice());let t=45,ac=0,done=new Set();
 cut('host');hostSay(`<b>De Par en Par</b>: toca la barra que forma pareja con el dato de abajo. Tema: <b>${set[0]}</b>.`);await wait(3,rid);
 cut({p:V3(1.6,1.75,-.6),l:V3(4.6,1.5,.9),f:30,dr:.04});
 const col=new T.Group();G.add(col);const X=GW/2-215,bw=330;const bars=names.map((n,i)=>{const b=bar(bw,34,COL.bl,n.toUpperCase(),{fs:21});b.position.set(X,232-i*46,0);b.userData.tap=i;col.add(b);return b;});
 const tb=bar(110,26,COL.bl,'');tb.position.set(X+110,288,0);const bb=bar(110,26,COL.bl,'');bb.position.set(X+110,232-9*46,0);col.add(tb,bb);
 const clue=bar(GW*.52,46,COL.bl,'',{fs:26});clue.position.set(GW*.04,-290,0);const cnt=bar(60,46,COL.bl,'9',{fs:30});cnt.position.set(GW*.04+GW*.26+50,-290,0);const tm=timer(COL.bl);tm.position.set(-GW/2+120,-280,20);G.add(clue,cnt,tm);
 bars.forEach((b,i)=>{b.position.x+=600;tween(.5+i*.06,e=>b.position.x=X+600*(1-e),eout);});
 let ci=0,run=true;anim(dt=>{if(!run||rid!==RUN)return false;t-=dt;tm.set(Math.max(0,Math.ceil(t)));return true;});
 while(t>0&&ci<clues.length){const [n,c]=clues[ci];clue.setT(c.toUpperCase());cnt.setT(String(9-ci));
  const pickI=await new Promise(r=>{TAP=i=>{if(i!==null&&!done.has(i))r(i);};anim(()=>{if(t<=0||rid!==RUN){r(-1);return false;}return TAP!==null;});});TAP=null;chk(rid);if(pickI<0)break;
  const ok=names[pickI]===n,b=bars[pickI];sfx(ok?'ok':'error');b.setC(ok?COL.gr:COL.rd);if(ok){ac++;}
  const ri=names.indexOf(n);done.add(ri);if(!ok){bars[ri].setC(COL.gr);}await wait(.7,rid);
  // la barra se vacía
  [b,bars[ri]].forEach(x=>{x.setT('',COL.bl);});ci++;}
 run=false;TAP=null;chk(rid);sfx('winner');GAME.sec[0]+=ac*5;GAME.ac[0]+=ac;await rotulo(`AZUL: ${ac} PAREJAS · +${ac*5} s`,COL.bl,rid);clearG();
 const c=await cpuTurn('Rival',COL.or,.6,rid);GAME.sec[1]+=c*5;await rotulo(`NARANJA: ${c} PAREJAS · +${c*5} s`,COL.or,rid);clearG();}
// ===== 4. LA PALABRA IMPOSIBLE =====
async function imposible(rid){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;const set=pick(ORIG.IMP),words=shuffle(set.map(x=>x[0])),defs=shuffle(set.slice());let t=60,ac=0,used=new Set();
 cut('host');hostSay('<b>La Palabra Imposible</b>: palabras raras y parecidas. Toca la que corresponde a la definición.');await wait(3,rid);
 cut({p:V3(-1.5,1.75,-.6),l:V3(-4.6,1.45,.9),f:30,dr:.04});
 const pw=300,ph=56+words.length*34,X=GW/2-pw/2-40;const pan=new T.Group();pan.position.set(X,40,0);G.add(pan);
 const back=new T.Mesh(ext(rrShape(pw+14,ph+14,10),6,3),MP(COL.wh,120));back.position.z=-10;const face=new T.Mesh(ext(rrShape(pw,ph,8),4,2),MP(0x3f6ff0,50));pan.add(back,face);
 const gl=new T.Mesh(new T.PlaneGeometry(pw,ph),new T.MeshBasicMaterial({map:cv(64,256,(g,w,h)=>{gloss(g,w,h);}),transparent:true,depthWrite:false}));gl.position.z=7;pan.add(gl);
 const wl=words.map((w,i)=>{const L=label(pw-20,32,(c,cw,ch)=>{ftxt(c,w,cw/2,ch/2+2,ch*.72,'#fff','center',cw);});L.position.set(0,ph/2-40-i*34,9);L.userData.tap=i;pan.add(L);return L;});
 pan.scale.set(.01,.01,1);tween(.5,e=>pan.scale.set(e,e,1),eback);
 const db=bar(GW*.62,62,COL.pu,'',{fs:24});db.position.set(-GW*.08,-280,0);db.hl=(c,cw,ch,k)=>wrap(c,db.q||'',cw/2,ch/2,cw-30*k,22*k);const tm=timer(COL.bl);tm.position.set(GW/2-130,-275,20);G.add(db,tm);
 let run=true;anim(dt=>{if(!run||rid!==RUN)return false;t-=dt;tm.set(Math.max(0,Math.ceil(t)));return true;});
 for(let di=0;di<defs.length&&t>0;di++){const [w,d]=defs[di];db.q=d;db.L.set();
  const i=await new Promise(r=>{TAP=x=>{if(x!==null&&!used.has(x))r(x);};anim(()=>{if(t<=0||rid!==RUN){r(-1);return false;}return TAP!==null;});});TAP=null;chk(rid);if(i<0)break;
  const ok=words[i]===w;sfx(ok?'ok':'error');if(ok)ac++;const ri=words.indexOf(w);used.add(ri);
  const mark=(L,c)=>L.set((cx,cw,ch)=>{cx.fillStyle=c;cx.fillRect(0,2,cw,ch-4);ftxt(cx,words[wl.indexOf(L)],cw/2,ch/2+2,ch*.72,'#fff','center',cw);});
  mark(wl[ri],'#37c23a');if(!ok)mark(wl[i],'#d42020');await wait(.8,rid);if(!ok)wl[i].set((cx,cw,ch)=>ftxt(cx,words[i],cw/2,ch/2+2,ch*.72,'#fff','center',cw));wl[ri].visible=false;}
 run=false;TAP=null;chk(rid);sfx('winner');GAME.sec[0]+=ac*5;GAME.ac[0]+=ac;await rotulo(`AZUL: ${ac} ACIERTOS · +${ac*5} s`,COL.bl,rid);clearG();
 const c=await cpuTurn('Rival',COL.or,.55,rid);GAME.sec[1]+=c*5;await rotulo(`NARANJA: ${c} ACIERTOS · +${c*5} s`,COL.or,rid);clearG();}
// ===== 5. EL ROSCO =====
const SHIRT={0:0xf2f2f6,1:0x8a5a3a},HAIR={0:0x2a1c12,1:0xa8331a};
function roscoPerson(team){const p=P.rosc;p.children[0].material.color.setHex(SHIRT[team]);p.arms.forEach(a=>a.material.color.setHex(SHIRT[team]));p.children[3].material.color.setHex(HAIR[team]);p.children.forEach(m=>{if(m.geometry===GEO.badge)m.material.color.setHex(team?0xf07a1a:0x2a6af0);});}
async function rosco(rid){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;const items=ORIG.ROS.map(a=>pick(a));const st=[Array(25).fill(0),Array(25).fill(0)],tm=[120+GAME.sec[0],120+GAME.sec[1]],pos=[0,0];
 cut('host');hostSay('¡Llega <b>El Rosco</b>! 25 letras. Si dudas, di <b>«Pasapalabra»</b> y vuelves a ella después.');await wait(3.2,rid);
 setPeople(true);let turn=0;const g=roscoGraf();
 const next=tm=>{for(let k=0;k<25;k++){const i=(pos[turn]+k)%25;if(st[turn][i]==0)return i;}return -1;};
 const show=async()=>{roscoPerson(turn);cut('rosco');g.team(turn?COL.or:COL.bl);st[turn].forEach((s,i)=>g.state(i,s));g.tm.set(Math.ceil(tm[turn]));g.ac.setT(String(st[turn].filter(x=>x==1).length));await g.fly(1.5);};
 await show();chk(rid);let tl=0;anim(dt=>{if(rid!==RUN||!g.parent)return false;tl+=dt;g.tick(tl);return true;});
 const alive=p=>tm[p]>0&&st[p].some(x=>x==0);
 while((alive(0)||alive(1))&&st[0].filter(x=>x==1).length<25){chk(rid);if(!alive(turn)){turn=1-turn;await show();continue;}
  const i=next();pos[turn]=i;g.setAct(i);const [ans,def]=items[i],L=LETRAS[i],starts=norm(ans[0]).startsWith(L);
  hostSay(`<b>${starts?'Empieza por':'Contiene la'} ${L}:</b> ${def.charAt(0)+def.slice(1).toLowerCase()}`);
  let res;
  if(turn==0){let pasa=false;setActs([{t:'Pasapalabra',ic:'⟳',cls:'y',cb:()=>{pasa=true;askEnd('');}}]);
   const tick=dt=>{tm[0]-=dt;g.tm.set(Math.max(0,Math.ceil(tm[0])));};let on=true;anim(dt=>{if(!on||rid!==RUN)return false;tick(dt);return true;});
   const v=await ask(()=>tm[0]<=0||rid!==RUN);on=false;setActs();chk(rid);
   res=v===null?'time':pasa||!norm(v)?'pasa':ans.some(a=>norm(a)===norm(v))?'ok':'ko';}
  else{const d=rnd(1.4,2.6);await tween(d,()=>{},x=>x);tm[1]-=d;g.tm.set(Math.max(0,Math.ceil(tm[1])));chk(rid);const r=Math.random();res=tm[1]<=0?'time':r<.7?'ok':r<.85?'pasa':'ko';say(res=='pasa'?'<b>«¡Pasapalabra!»</b>':`Naranja responde: <b>${res=='ok'?ans[0]:'…'}</b>`);await wait(.6,rid);}
  if(res=='ok'){st[turn][i]=1;g.state(i,1);sfx('ok');g.ac.setT(String(st[turn].filter(x=>x==1).length));pos[turn]=(i+1)%25;continue;}
  if(res=='ko'){st[turn][i]=2;g.state(i,2);sfx('error');say(`La respuesta correcta: <b>${ans[0]}</b>`);await wait(1.6,rid);}
  if(res=='pasa'){sfx('splash');pos[turn]=(i+1)%25;}
  g.setAct(-1);if(alive(1-turn)){turn=1-turn;await show();chk(rid);}else if(res=='pasa'){continue;}}
 say();setActs();const a=[0,1].map(p=>st[p].filter(x=>x==1).length);GAME.ac=a;GAME.res=a;
 if(a[0]==25){music('winner');await bote(rid,true);}else{sfx(a[0]>=a[1]?'winner':'loser');}
 await wait(1,rid);G.remove(g);clearG();setPeople(false);}
// ===== bote rótulo dorado 3D =====
function boteTxt(){return (OPT.bote||60000).toLocaleString('es-ES').replace(/,/g,'.')+' €';}
async function bote(rid,won){const b=bigTxt(560,130,boteTxt(),{grad:['#fff6b0','#ffd23a','#f0a000','#ffe680'],side:'#8a5200',layers:9,glow:'#ffcf40'});b.position.set(0,-230,100);b.scale.setScalar(.01);G.add(b);
 await tween(.6,e=>{b.scale.setScalar(.01+e);b.rotation.y=(1-e)*1.4;},eback);let t=0;anim(dt=>{t+=dt;b.rotation.y=Math.sin(t*1.6)*.12;return !!b.parent;});
 if(won)say('<b>¡¡HAS GANADO EL BOTE!!</b> 🎉');await wait(2.8,rid);G.remove(b);}
// ===== PROGRAMA COMPLETO 2007 =====
async function cabecera(rid){music(OPT.etapa==2007?'cabecera':'cab'+OPT.etapa);cut('wide');const c=makeCab(!!(ETAPAS[OPT.etapa]||{}).blue);
 let t=0;await tween(c.dur,(e,k)=>{t=k*c.dur;c.setT(t);if(t>7.6){SHOT=SHOTS.wide;}},x=>x);c.free();chk(rid);
 // grúa sobre el plató
 const p0=V3(-12,9,13),p1=SHOTS.wide.p.clone();SHOT={p:p0.clone(),l:V3(0,.6,-2),f:44,dr:0};await tween(2.6,e=>{SHOT.p.lerpVectors(p0,p1,e);});chk(rid);}
async function programa(){const rid=++RUN;GAME.sec=[0,0];GAME.ac=[0,0];MOSCA.visible=true;setPeople(false);
 try{await cabecera(rid);
  if(!await voz('intro',rid)){cut('host');hostSay('¡Hola, hola! Bienvenidos a <b>Pasapalabra</b>. ¡Hoy jugamos el equipo <b>azul</b> contra el equipo <b>naranja</b>!');await wait(3.6,rid);}
  cut('wide');hostSay('Y en el bote hoy hay…');await bote(rid,false);
  cut('team_b');hostSay('Equipo <b>azul</b>: ¡tú y tus dos invitados!');await wait(2.2,rid);cut('team_o');hostSay('Equipo <b>naranja</b>: ¡nuestro rival!');await wait(2.2,rid);say();
  const E=ETAPAS[OPT.etapa]||ETAPAS[2007];
  for(const [id,fn] of E.pr){cut('host');stopMusic();if(!await voz(id+'_pre',rid)){if(E.lines&&E.lines[id]){hostSay(E.lines[id]);await wait(2.4,rid);say();}else await wait(.6,rid);}await playCort(id,rid);await voz(id+'_exp',rid);await fn(rid);}
  await despedida(rid);}catch(e){if(!(e instanceof Stop))console.error(e);}}
async function despedida(rid){clearG();stopMusic();music(OPT.etapa==2007?'despedida':'desp'+OPT.etapa);setPeople(false);cut('front');const a=GAME.res||[0,0];
 hostSay(a[0]==25?'¡Rosco completo! ¡Enhorabuena, campeón!':a[0]>=a[1]?`¡Ganas el programa con <b>${a[0]}</b> aciertos! ¡Mañana vuelves a por el bote!`:`¡Gran rosco, con <b>${a[0]}</b> aciertos! ¡Mañana más y mejor!`);
 if(a[0]<25){OPT.bote=(OPT.bote||60000)+6000;saveOpt();}
 await wait(3,rid);const p0=SHOTS.front.p.clone();SHOT={p:p0.clone(),l:V3(0,1,-3),f:38,dr:0};const p1=V3(0,9,16);await tween(6,e=>SHOT.p.lerpVectors(p0,p1,e));
 if(!await voz('desp',rid)){hostSay('¡Hasta mañana! ¡Pasapalabra!');await wait(3,rid);}say();stopMusic();MOSCA.visible=false;showMenu();}
// ---------- LOGO 2007 (recreado: esfera de letras roja/morada + «Pasapalabra») ----------
function logoURL(w=900,h=560,y=OPT.plato){const BL=y>=2014;const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');const cx=w/2,cy=h*.5,r=h*.36;
 let gr=g.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r*1.1);gr.addColorStop(0,BL?'rgba(90,170,255,.55)':'rgba(255,90,120,.55)');gr.addColorStop(.7,BL?'rgba(20,70,190,.35)':'rgba(150,20,90,.35)');gr.addColorStop(1,'rgba(0,10,60,0)');g.fillStyle=gr;g.beginPath();g.arc(cx,cy,r*1.1,0,PI*2);g.fill();
 const pts=[];for(let i=0;i<520;i++){const y=1-2*(i+.5)/520,rr=Math.sqrt(1-y*y),th=i*2.39996;pts.push([Math.cos(th)*rr,y,Math.sin(th)*rr]);}pts.sort((a,b)=>a[2]-b[2]);
 pts.forEach(p=>{const z=(p[2]+1)/2,col=BL?`hsl(${208+(1-p[1])*10},85%,${62+z*30}%)`:`hsl(${345-(1-p[1])*45},90%,${38+z*30}%)`;g.globalAlpha=.35+z*.65;ftxt(g,pick([...AL]),cx+p[0]*r,cy-p[1]*r,10+z*20,col);});g.globalAlpha=1;
 g.save();g.translate(cx,cy);g.shadowColor='rgba(0,0,0,.6)';g.shadowBlur=8;g.shadowOffsetY=3;for(let i=3;i>0;i--)ftxt(g,'Pasapalabra',i*.8,i*1.2,h*.5,'#8f97aa','center',Math.min(w*.96,r*3.44),0,700);g.shadowColor='transparent';
 const tg=g.createLinearGradient(0,-h*.1,0,h*.1);tg.addColorStop(0,'#ffffff');tg.addColorStop(1,'#dfe4ee');ftxt(g,'Pasapalabra',0,0,h*.5,tg,'center',Math.min(w*.96,r*3.44),0,700);g.restore();return c.toDataURL();}
// ---------- MENÚ (mismo diseño que ¡Ahora Caigo! 3D) ----------
const menu=$('#menu');let LOGO='';
const YEARS=[2007,2011,2014,2017,2019];
function showMenu(screen='main'){RUN++;MODE.menu=true;MODE.split=false;clearG();say();setActs();askEnd();stopMusic();setPeople(false);P.host.visible=true;$('#skip').classList.add('hidden');MOSCA.visible=false;$('#ver').classList.remove('hidden');
 if(screen=='title'){menu.innerHTML=`<div class="title"><img class="tlogo" src="${LOGO}"><div class="tsub">EL JUEGO</div><div class="ttap">Toca para empezar</div></div>`;menu.firstChild.onpointerdown=()=>{music('splash');showMenu();};menu.classList.remove('hidden');return;}
 const side=`<div class="logo"><img class="mlogo" src="${LOGO}"><div class="mtag">EL JUEGO · 3D</div></div>`;
 if(screen=='main'){menu.innerHTML=`<div class="mbox">${side}<div class="col">
  ${btn('y','▶','Jugar',`Programa completo · plató ${OPT.plato} · etapa ${OPT.etapa}: ${(ETAPAS[OPT.etapa]||ETAPAS[2007]).names}`,'play')}
  ${btn('','⚙','Opciones','Música, efectos, plató y etapa','opt')}
  ${btn('','📜','La historia de Pasapalabra','Del año 2000 a hoy','hist')}
  ${btn('','❓','Cómo se juega','Todas las pruebas, de 2007 a 2019','how')}
  ${btn('','⭐','Créditos','Quién ha hecho este juego','cred')}</div></div>`;}
 if(screen=='opt'){const sel=(k)=>YEARS.map(y=>`<button class="tbtn ${OPT[k]==y?'on':''}" data-k="${k}" data-y="${y}">${y}</button>`).join('');
  menu.innerHTML=`<div class="mbox">${side}<div class="col"><h2>Opciones</h2>
  <div class="orow"><label>🎵 Música</label><input type="range" min="0" max="1" step=".1" value="${OPT.mus}" data-o="mus"></div>
  <div class="orow"><label>🔊 Efectos</label><input type="range" min="0" max="1" step=".1" value="${OPT.sfx}" data-o="sfx"></div>
  <div class="orow"><label>🎬 PLATÓ</label>${sel('plato')}</div>
  <div class="orow"><label>🧩 ETAPA (pruebas)</label>${sel('etapa')}</div>
  <div class="mtext">Al elegir un plató se elige también su etapa. La etapa se puede cambiar por separado: por ejemplo, pruebas de 2019 en el plató de 2007.</div>
  ${btn('y','⟵','Volver','','main')}</div></div>`;
  menu.querySelectorAll('input[type=range]').forEach(i=>i.oninput=()=>{OPT[i.dataset.o]=+i.value;saveOpt();if(musA)musA.volume=OPT.mus;});
  menu.querySelectorAll('.tbtn').forEach(b=>b.onpointerdown=()=>{const y=+b.dataset.y,k=b.dataset.k;OPT[k]=y;if(k=='plato')OPT.etapa=y;saveOpt();if(k=='plato'){applyPlato(y);LOGO=logoURL();}sfx('ok');showMenu('opt');});}
 if(screen=='hist'||screen=='how'||screen=='cred'){menu.innerHTML=`<div class="mbox">${side}<div class="col text"><h2>${{hist:'La historia de Pasapalabra',how:'Cómo se juega',cred:'Créditos'}[screen]}</h2><div class="mtext">${TEXTS[screen]}</div>${btn('y','⟵','Volver','','main')}</div></div>`;}
 menu.classList.remove('hidden');
 menu.querySelectorAll('[data-go]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();sfx('ok');const g=b.dataset.go;if(g=='play')startGame();else showMenu(g);});}
function btn(cls,ic,t,s,go){return `<div class="mbtn ${cls}" data-go="${go}"><span class="ic">${ic}</span><div>${t}${s?`<small>${s}</small>`:''}</div></div>`;}
const TEXTS={
 hist:`<p><b>2000 · Antena 3.</b> Pasapalabra llega a España, basado en el formato británico <i>The Alphabet Game</i>. Lo presenta Silvia Jato.</p>
 <p><b>2007 · Telecinco.</b> Estrena plató: la gran mesa redonda blanca con su aro de luz azul, las gradas con el público y la pantalla azul con la esfera de letras. Lo presenta Christian Gálvez. Pruebas: <b>La Escalera, El Pulsador, De Par en Par, La Palabra Imposible</b> y <b>El Rosco</b>.</p>
 <p><b>2011 · Programa 1000.</b> Llegan Letra a letra, La Pista, Palabras Cruzadas y ¿Qué es Qué?</p>
 <p><b>2014-2017.</b> Coco Loco y sus globos, y botes enormes.</p>
 <p><b>2019.</b> Cortinillas azules, Una de Cuatro, Sopa de Letras y ¿Dónde Están?</p>
 <p><b>2020 · Vuelta a Antena 3</b> con Roberto Leal, ¡y El Rosco sigue siendo el rey de la tarde!</p>`,
 how:`<p>Juegas con el equipo <b>azul</b> contra el equipo <b>naranja</b> (el rival lo maneja el móvil). Cada acierto en las pruebas suma <b>5 segundos</b> para El Rosco.</p>
 <p>🪜 <b>La Escalera:</b> cada palabra tiene una letra más que la anterior. Escribe la respuesta con el teclado del móvil.</p>
 <p>🔘 <b>El Pulsador:</b> pantalla partida. Toca <b>¡PULSAR!</b> antes que el rival y escribe la respuesta.</p>
 <p>👫 <b>De Par en Par:</b> toca la barra azul que forma pareja con el dato de la barra de abajo.</p>
 <p>📖 <b>La Palabra Imposible:</b> toca la palabra rara que corresponde a la definición morada.</p>
 <p>🔵 <b>El Rosco:</b> 25 letras. Escribe la palabra o toca <b>Pasapalabra</b> para volver a ella luego. Verde = acierto, rojo = fallo. ¡Con las 25 te llevas el bote!</p>`,
 cred:`<p><b>Pasapalabra 3D · El juego</b> — versión 0.1, etapa 2007.</p><p>Idea, referencias y dirección: <b>Iker</b>.</p><p>Programación y 3D: <b>Grok Bot</b> con three.js.</p><p>Preguntas y música del juego original de móvil Pasapalabra (2007). Sonido de cabecera, cortinilla y despedida del programa de 2007.</p><p class="small">Proyecto de aficionado, hecho con cariño. Pasapalabra es una marca de sus propietarios.</p>`};
function startGame(){menu.classList.add('hidden');$('#ver').classList.add('hidden');MODE.menu=false;$('#skip').classList.remove('hidden');programa();}
$('#skip').onpointerdown=e=>{e.preventDefault();showMenu();};
window.onBack=()=>{if(MODE.menu)showMenu();else showMenu();};
// ---------- bucle ----------
let last=performance.now(),mT=0;
function loop(now){requestAnimationFrame(loop);if(window.DVD9){last=now;return;}const dt=Math.min(.1,(now-last)/1000);last=now;
 if(!window.PAUSE){const d=dt*(window.SPEED||1);for(let i=AN.length-1;i>=0;i--){if(AN[i](d)===false)AN.splice(i,1);}}
 P.sphere.rotation.y+=dt*.35;P.sphere.rotation.x=Math.sin(now/4000)*.15;
 if(MODE.menu){mT+=dt;const a=mT*.06;cam.position.set(Math.sin(a+.8)*14,5.2+Math.sin(mT*.2)*.6,Math.cos(a+.8)*14);cam.fov=44;cam.updateProjectionMatrix();cam.lookAt(0,1,-2);}else updCam(dt);
 R.setScissorTest(false);R.setViewport(0,0,W,H);R.clear();
 if(MODE.split){R.setScissorTest(true);const hw=W/2;[[0,SHOTS.orange],[hw,SHOTS.blue]].forEach(([x,sh])=>{R.setViewport(x,0,hw,H);R.setScissor(x,0,hw,H);cam2.aspect=hw/H;updCam(0,cam2,{...sh,f:34,l:sh.l.clone().add(V3(0,.05,0))});R.render(S,cam2);});R.setScissorTest(false);R.setViewport(0,0,W,H);}
 else R.render(S,cam);
 R.clearDepth();placeMosca();R.render(GS,gcam);}
// ---------- arranque ----------
async function boot(){try{await document.fonts.load('900 40px N');await document.fonts.load('800 40px N');await document.fonts.load('400 40px K');}catch(e){}
 makeAtlas();geos();buildPlato();applyPlato(OPT.plato);mosca();resize();window.onGW=()=>{};LOGO=logoURL();requestAnimationFrame(loop);
 if(location.hash.startsWith('#dbg'))return;showMenu('title');}
window.addEventListener('load',boot);
// ---------- ganchos para capturas ----------
window.DBG={get TAP(){return !!TAP;},get ASK(){return !!ASK;},showMenu,cut,clearG,G,P,GAME,MODE,makeCort,makeCab,roscoGraf,escalera,pulsador,depar,imposible,rosco,bote,programa,startGame,OPT,get ETAPAS(){return ETAPAS;},playCort,setPeople,roscoPerson,run:()=>++RUN,get RUN(){return RUN;},say,SHOTS,COL,bar,timer,
 ask:v=>{KB.value=v;KB.oninput&&KB.oninput();},enter:()=>askEnd(KB.value)};
