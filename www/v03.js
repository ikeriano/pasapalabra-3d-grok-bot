// ======================================================================
//  v0.3 · cortinillas fieles, cabeceras plano a plano, realización TV y vida en el plató
// ======================================================================
// ---- título que llega letra a letra (Keedy con bisel), como en TV ----
function flyTitle(lines,fs,al,mode){const g=new T.Group(),k=2,lh=fs*1.1,F=mode=='burst'?`900 ${fs*k}px N,Arial`:`400 ${fs*k}px K,N,Arial`;
 const mc=document.createElement('canvas').getContext('2d');mc.font=F;const lw=lines.map(s=>mc.measureText(s).width/k);
 const W=Math.ceil(Math.max(...lw)+40),Hh=Math.ceil(lines.length*lh+40),c=document.createElement('canvas');c.width=W*k;c.height=Hh*k;const x=c.getContext('2d');x.font=F;x.textBaseline='middle';
 const L=[];lines.forEach((s,li)=>{const y=20+lh*(li+.5);let cx=al=='left'?20:(W-lw[li])/2;for(const ch of s){const w=x.measureText(ch).width/k;if(ch!=' ')L.push({ch,x0:cx,w,y});cx+=w;}});
 L.forEach(l=>{for(let d=5;d>=1;d--){x.fillStyle=d>2?'#4c5266':'#a9b0c4';x.fillText(l.ch,(l.x0+d*.8)*k,(l.y+d*1.0)*k);}x.fillStyle='#ffffff';x.fillText(l.ch,l.x0*k,l.y*k);});
 const tex=new T.CanvasTexture(c);tex.minFilter=T.LinearFilter;tex.generateMipmaps=false;const ox=al=='left'?-20:-W/2;
 L.forEach(l=>{const x0=Math.max(0,l.x0-4),x1=Math.min(W,l.x0+l.w+9),y0=l.y-lh*.56,y1=Math.min(Hh,l.y+lh*.56+6);const geo=new T.PlaneGeometry(x1-x0,y1-y0),uv=geo.attributes.uv;
  for(let j=0;j<4;j++)uv.setXY(j,(uv.getX(j)?x1:x0)/W,1-(uv.getY(j)?y0:y1)/Hh);
  const m=new T.Mesh(geo,new T.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,depthTest:false}));m.renderOrder=5;l.home=new T.Vector3((x0+x1)/2+ox,Hh/2-(y0+y1)/2,0);m.position.copy(l.home);g.add(m);l.m=m;});
 const n=L.length,ord=L.map((_,i)=>i).sort(()=>Math.random()-.5);
 L.forEach((l,i)=>{l.d=mode=='drop'?ord.indexOf(i)*(1.1/n):i*.13;l.sy=(Math.random()<.5?-1:1)*rnd(25,55);l.rx=rnd(-1,1);l.ry=rnd(-1,1);});
 g.anim=t=>{L.forEach(l=>{let s=1,op=1,X=l.home.x,Y=l.home.y,Z=0,r=0;
  if(mode=='drop'){const q=Math.min(1,Math.max(0,(t-l.d)/.3));op=q;Y+=l.sy*(1-eout(q));}
  else if(mode=='zoom'){const q=Math.min(1,Math.max(0,(t-l.d)/.45)),e=eout(q);s=1+2.4*(1-e);Z=(1-e)*700;r=(1-e)*.25;l.m.rotation.y=(1-e)*1.5;op=Math.min(1,q*2.5);X*=1+(1-e)*.5;}
  else{const q=Math.min(1,Math.max(0,(t+.25)/.6)),e=eout(q);s=.35+.65*e;op=q;const b=t-2.25;l.m.rotation.y=b>0?b*5*(l.rx>0?1:-1):0;if(b>0){Z=b*b*2200;X+=l.rx*b*b*900;Y+=l.ry*b*b*500;r=l.rx*b*1.5;op=Math.max(0,1-b*.9);}}
  l.m.position.set(X,Y,Z);l.m.scale.setScalar(Math.max(.001,s));l.m.rotation.z=r;if(mode!='zoom')l.m.rotation.y=0;l.m.material.opacity=op;l.m.visible=op>.01;});};
 g.anim(-9);return g;}
// ---- efectos de la cortinilla: brillo que barre, letras gigantes de Coco Loco, estallido 2019 ----
function cortFx(id,blue,inner){const fx=[];
 const sw=new T.Mesh(new T.PlaneGeometry(70,1100),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false,depthTest:false}));sw.rotation.z=.45;sw.renderOrder=6;inner.add(sw);
 fx.push(t=>{const q=(t-(blue?2.0:3.0))/.6;sw.visible=q>0&&q<1;sw.position.set(-GW*.6+q*GW*1.2,0,200);sw.material.opacity=.28*Math.sin(Math.max(0,Math.min(1,q))*PI);});
 if(id=='coco'){const big=['O','C'].map(ch=>{const b=bigTxt(300,340,ch,{col:'#ffffff',side:'#8a90a4',layers:6});inner.add(b);return b;});
  fx.push(t=>{big.forEach((b,i)=>{const q=(t-2.3-i*.22)/.45;b.visible=q>0&&q<1;b.position.set((i?1:-1)*(260-q*120),(i?-60:80),200+q*1700);b.rotation.y=(i?-1:1)*(.6-q*.6);});});}
 if(blue){const cols=[0xffffff,0xff8a1a,0xffc21a];const it=[];for(let i=0;i<80;i++)it.push({ch:AL[i%AL.length],v:new T.Vector3(rnd(-1,1),rnd(-.7,.7),rnd(.2,1)).normalize(),p:new T.Vector3(),s:rnd(30,70),r:rnd(-3,3),c:cols[i%3]});
  const burst=letterCloud(it,{op:1});inner.add(burst);const ring=new T.Mesh(new T.TorusGeometry(1,.06,6,64),new T.MeshBasicMaterial({color:0xffffff,transparent:true}));inner.add(ring);
  const fl=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({color:0xffffff,transparent:true,depthTest:false}));fl.renderOrder=9;inner.parent.add(fl);
  fx.push(t=>{const q=Math.max(0,t-.5);burst.visible=q>0&&q<1.6;it.forEach(x=>{x.p.copy(x.v).multiplyScalar(eout(Math.min(1,q/1.4))*1500);x.p.z=x.v.z*q*900;x.r+=.05;});burst.upd();
   const rq=(t-.6)/.35;ring.visible=rq>0&&rq<1;ring.scale.setScalar(40+rq*600);ring.material.opacity=1-rq;
   const fq=t<1?Math.max(0,1-Math.abs(t-.75)/.15):Math.max(0,1-Math.abs(t-4.35)/.18);fl.visible=fq>0;fl.material.opacity=fq*.9;fl.scale.set(GW+40,760,1);fl.position.z=600;});}
 return t=>fx.forEach(f=>f(t));}
// ---- CABECERA plano a plano ----
function makeCab(blue){return blue?cabAzul():cabRoja();}
const cyc=(a,b,t)=>Math.min(1,Math.max(0,(t-a)/(b-a)));
function cabRoja(){// 2007-2017: plano continuo CG (t0 = fundido morado)
 const g=new T.Group();G.add(g);const bg=redBg(false);g.add(bg);const inner=new T.Group();g.add(inner);
 const pur=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({color:0x4a1478,transparent:true,depthWrite:false}));pur.renderOrder=-1;pur.position.z=1;pur.scale.set(GW+60,800,1);g.add(pur);
 const fc=[0xffffff,0xffd0e0,0x8fb4ff,0xff9ab4];const fi=[];for(let i=0;i<560;i++)fi.push({ch:AL[i%AL.length],b:new T.Vector3(rnd(-1700,1700),i%5?rnd(-520,-90):rnd(20,320),rnd(-4000,1400)),p:new T.Vector3(),s:rnd(55,100),r:rnd(-.6,.6),c:fc[i%4]});
 const field=letterCloud(fi,{op:.95});inner.add(field);
 const ri=[];[250,290,325].forEach((R,j)=>{const n=Math.round(R/8);for(let i=0;i<n;i++)ri.push({ch:'O',a:i/n*PI*2,R,j,p:new T.Vector3(),s:17,r:0,c:j==1?0xff9ab4:0xffffff});});const rings=letterCloud(ri,{op:.95});inner.add(rings);
 const sp=sphereItems(300,170,n=>new T.Color().setHSL(n.x>.3?.62:.98,.85,.5+n.y*.15));sp.forEach(x=>{x.home=x.p.clone();x.hn=x.n.clone();});const sph=letterCloud(sp,{op:1});inner.add(sph);
 const word='pasapalabra',gl=word.split('').map((ch,i)=>{const b=bigTxt(240,300,ch,{col:'#f4f4f8',side:'#7d8494',layers:7});b.visible=false;inner.add(b);return b;});
 const logo=bigTxt(560,120,'Pasapalabra',{col:'#ffffff',side:'#9aa3b5',layers:6});logo.position.z=300;inner.add(logo);
 const rot=new T.Matrix4(),e=new T.Euler();
 const o={g,dur:14.8,setT(t){const H=RHYP();bg.pl.material.uniforms.t.value=t;
  pur.material.opacity=1-eio(cyc(.2,2.0,t));pur.visible=pur.material.opacity>.01;
  // 1) travelling sobre el campo de letras inclinado (0-6.5)
  const fv=t<7;field.visible=fv;if(fv){const tilt=.35-cyc(0,6,t)*.25,fade=1-cyc(5.4,6.8,t);field.material.opacity=.95*fade;fi.forEach(x=>{let z=((x.b.z+t*650+4000)%5400)-4000;x.p.set(x.b.x,x.b.y+tilt*200,z);});field.upd();}
  // 2) anillos de puntos en túnel (5-11)
  const rv=t>5&&t<12.2;rings.visible=rv;if(rv){const k=eout(cyc(5,7,t));ri.forEach(x=>{const a=x.a+t*(x.j==1?-.35:.25),R=x.R*(1+(1-k)*3);x.p.set(Math.cos(a)*R,Math.sin(a)*R,(1-k)*900);});rings.material.opacity=1-cyc(11.4,12.1,t);rings.upd();}
  // 3) esfera de letras (6.5-13.7)
  const sv=t>6.4&&t<13.8;sph.visible=sv;if(sv){const k=eback(cyc(6.4,7.6,t));e.set(.3,t*.6,0);rot.makeRotationFromEuler(e);sp.forEach(x=>{x.p.copy(x.home).applyMatrix4(rot).multiplyScalar(Math.max(.01,k));x.n=x.hn.clone().applyMatrix4(rot);});sph.upd();
   const zf=eio(cyc(10.6,11.4,t))*(1-eio(cyc(12,12.5,t)));sph.scale.setScalar(1+zf*2.4);sph.material.opacity=1-cyc(12.8,13.6,t)*.5;}
  // 4) letras gigantes que orbitan la esfera y pasan rozando la cámara (7.8-10.8)
  gl.forEach((b,i)=>{const q=(t-7.8-i*.29)/.5;b.visible=q>0&&q<1;if(!b.visible)return;const a=-1.4+q*2.8,side=i%2?1:-1;b.scale.setScalar(2.2);b.position.set(Math.sin(a)*620*side,(i%3-1)*70,Math.cos(a)*-420+900*Math.max(0,1-Math.abs(a))*.9);b.rotation.y=a*side+(Math.cos(a)<0?PI:0);});
  // 5) logotipo que entra girando (espejo) y se asienta (12.2-13)
  const lk=cyc(12.2,13,t);logo.visible=t>12.2;logo.rotation.y=(1-eout(lk))*PI;logo.scale.setScalar(.8+eback(lk)*.5);
  // 6) iris de salida al plató (13.7-14.8)
  if(t<13.7)bg.set(0,9,'none');else{const k=eio(cyc(13.7,14.8,t));bg.set(k*H,9,'out');sph.visible=false;logo.visible=k<.85;}
  inner.rotation.z=Math.sin(t*.4)*.04;},free(){G.remove(g);g.traverse(m=>{if(m.geometry)m.geometry.dispose();});}};
 o.setT(0);return o;}
function cabAzul(){// 2019: varios planos (cortes 0.3/1.5/2.7/3.7/8.4/12.6/16.2)
 const g=new T.Group();G.add(g);const bg=redBg(true);g.add(bg);const inner=new T.Group();g.add(inner);
 const cols=[0xffffff,0xff8a1a,0xffffff,0xffc21a,0x9cc4ff];const it=[];for(let i=0;i<260;i++)it.push({ch:AL[i%AL.length],b:new T.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)),p:new T.Vector3(),s:rnd(26,60),r:rnd(-3,3),c:cols[i%5],ph:rnd(0,6.28),R:rnd(150,700)});
 const sw=letterCloud(it,{op:1});inner.add(sw);sp=sphereItems(it.length,175,n=>new T.Color(1,1,1));it.forEach((x,i)=>{x.home=sp[i].p;x.hn=sp[i].n;});
 const arcs=[0xff8a1a,0xffc21a].map((c,i)=>{const m=new T.Mesh(new T.TorusGeometry(380+i*80,10,6,60,PI*1.2),new T.MeshBasicMaterial({color:c,transparent:true}));inner.add(m);return m;});
 const wr=[0,1,2].map(i=>{const m=new T.Mesh(new T.TorusGeometry(1,.012,4,64),new T.MeshBasicMaterial({color:0xffffff,transparent:true}));inner.add(m);return m;});
 const bigs=['M','U'].map(ch=>{const b=bigTxt(300,340,ch,{col:'#ffffff',side:'#ff8a1a',layers:6});inner.add(b);return b;});
 const logo=bigTxt(560,120,'Pasapalabra',{col:'#ffffff',side:'#ff8a1a',layers:6});logo.position.z=300;inner.add(logo);
 const fl=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({color:0xffffff,transparent:true,depthTest:false}));fl.renderOrder=9;fl.position.z=700;g.add(fl);
 const rot=new T.Matrix4(),e=new T.Euler();
 const o={g,dur:16.2,setT(t){const H=RHYP();bg.pl.material.uniforms.t.value=t;fl.scale.set(GW+60,800,1);
  const fq=Math.max(0,1-t/.4,1-Math.abs(t-9)/.2,1-Math.abs(t-12.4)/.25);fl.visible=fq>0;fl.material.opacity=fq;
  const conv=eio(cyc(9.6,12.2,t));e.set(.3,t*.7,0);rot.makeRotationFromEuler(e);const shot=t<1.5?0:t<2.7?1:t<3.7?2:t<8.4?3:4;
  it.forEach((x,i)=>{const a=x.ph+t*(.6+shot*.15)*(i%2?1:-1);let px,py,pz;
   if(t<4.5){px=Math.cos(a)*x.R;py=x.b.y*300+Math.sin(a*1.3)*80;pz=((x.b.z*1500+t*900*(1+shot*.3))%2400)-1400;}
   else if(t<6.3){const s=cyc(4.5,5.5,t),rr=120+(i%40)*14;px=Math.cos(a)*rr;py=Math.sin(a)*rr*.8;pz=x.b.z*200*(1-s);}
   else if(t<7.5){px=x.b.x*3000;py=x.b.y*3000;pz=-3000;}
   else{const s=eout(cyc(7.5,8.5,t));px=Math.cos(a)*x.R*(2-s);py=x.b.y*400;pz=x.b.z*600;}
   const hp=x.home.clone().applyMatrix4(rot);x.p.set(px+(hp.x-px)*conv,py+(hp.y-py)*conv,pz+(hp.z-pz)*conv);x.n=conv>.95?x.hn.clone().applyMatrix4(rot):null;x.r+=.03*(1-conv);});
  sw.visible=t<15.8;sw.upd();sw.scale.setScalar(t>12.4?1.15:1);
  arcs.forEach((m,i)=>{const v=t>1.5&&t<4.6||t>7.6&&t<9.6;m.visible=v;m.rotation.set(.9+i*.3,t*.8*(i?-1:1),t*1.6*(i?1:-1));m.material.opacity=.9;});
  wr.forEach((m,i)=>{const q=cyc(6.3+i*.25,7.4+i*.25,t);m.visible=q>0&&q<1;m.scale.setScalar(80+q*900);m.material.opacity=1-q;});
  bigs.forEach((b,i)=>{const q=(t-2.7-i*.5)/.9;b.visible=q>0&&q<1;b.position.set((i?1:-1)*(300-q*150),(i?-80:90),q*1600);b.rotation.y=(i?-1:1)*(1-q)*.8;});
  const lk=cyc(12.75,13.4,t);logo.visible=t>12.6;logo.scale.setScalar(.3+eback(lk)*.7);
  if(t<15.6)bg.set(0,9,'none');else{const k=eio(cyc(15.6,16.2,t));bg.set(k*H,9,'out');logo.visible=k<.6;}},free(){G.remove(g);g.traverse(m=>{if(m.geometry)m.geometry.dispose();});}};
 o.setT(0);return o;}
let sp;
cabecera=async function(rid){const y=OPT.etapa;music('cabv3_'+y);cut({p:V3(0,3.3,-6.2),l:V3(0,3.25,-10.5),f:40,dr:0});const c=makeCab(!!(ETAPAS[y]||{}).blue);
 await tween(c.dur,(e,k)=>c.setT(k*c.dur),x=>x);c.free();chk(rid);
 // grúa: del pantallón con la esfera hacia el plano general, con aplausos
 sfx('aplauso');clap(1);const p0=V3(0,3.3,-6.2),p1=V3(-11,8.5,12),l0=V3(0,3.25,-10.5),l1=V3(0,.8,-2);SHOT={p:p0.clone(),l:l0.clone(),f:40,dr:0};shotT=0;
 await tween(3.2,e=>{SHOT.p.lerpVectors(p0,p1,e);SHOT.l.lerpVectors(l0,l1,e);SHOT.f=40+e*4;});chk(rid);cut('wide');};
// ---- REALIZACIÓN: planos con movimiento (grúa, travelling, órbita) ----
Object.assign(SHOTS,{
 craneA:{p:V3(-12,9.5,12),p2:V3(-7,4.2,9.5),l:V3(0,.5,-2),l2:V3(.3,1,-2),f:44,dr:.1,mv:5},
 dollyW:{p:V3(9.5,6.2,10.5),p2:V3(7.6,5,8.2),l:V3(-.5,.6,-1.5),f:42,dr:.2,mv:6},
 trackF:{p:V3(-4,3.2,10),p2:V3(4,3.2,10),l:V3(-1,1.3,-3),l2:V3(1,1.3,-3),f:38,dr:.1,mv:7},
 hostIn:{p:V3(0,1.9,-1.6),p2:V3(0,1.93,-2.4),l:V3(0,1.72,-4.3),f:34,dr:.02,mv:5},
 hostSide:{p:V3(1.6,1.85,-2.2),p2:V3(1.2,1.85,-2.6),l:V3(0,1.7,-4.3),f:32,dr:.02,mv:5},
 audL:{p:V3(2,2.4,1),p2:V3(1.4,2.6,1.2),l:V3(-7,1.6,-6),l2:V3(-8,1.9,-2),f:38,dr:.05,mv:2.4},
 audR:{p:V3(-2,2.4,1),p2:V3(-1.4,2.6,1.2),l:V3(7,1.6,-6),l2:V3(8,1.9,-2),f:38,dr:.05,mv:2.4},
 orbitR:{orb:{c:V3(0,1.7,-4.9),r:3.2,y:2.3,a0:-1.1,a1:.05,d:3.4},l:V3(0,1.75,-4.9),f:34,dr:0},
});
const _upd=updCam;let KICK=0;
updCam=function(dt,c=cam,sh=SHOT){if(c!==cam||!(sh.mv||sh.orb)){if(c===cam&&KICK>0){KICK=Math.max(0,KICK-dt*1.5);return _upd(dt,c,{...sh,f:sh.f-KICK*3});}return _upd(dt,c,sh);}
 const t=shotT+dt;let p,l;if(sh.orb){const o=sh.orb,a=o.a0+(o.a1-o.a0)*eio(Math.min(1,t/o.d));p=V3(o.c.x+Math.sin(a)*o.r,o.y,o.c.z+Math.cos(a)*o.r);l=sh.l;}
 else{const k=eio(Math.min(1,t/sh.mv));p=sh.p2?sh.p.clone().lerp(sh.p2,k):sh.p;l=sh.l2?sh.l.clone().lerp(sh.l2,k):sh.l;}
 KICK=Math.max(0,KICK-dt*1.5);return _upd(dt,c,{p,l,f:sh.f-KICK*3,dr:sh.dr});};
const VAR={wide:['wide','craneA','dollyW','trackF'],host:['host','hostIn','hostSide'],front:['front','trackF']};let varI=0;
const _cut=cut;cut=function(n){if(typeof n=='string'&&VAR[n]){n=VAR[n][(varI++)%VAR[n].length];}return _cut(n);};
// reacciones: cortes al acertar o fallar (fuera del Rosco, que mantiene su plano con un pequeño empuje)
const _sfx=sfx;let reactT=0;
sfx=function(n){_sfx(n);if(MODE.menu||(n!='ok'&&n!='error'))return;const ok=n=='ok',who=nearestPlayer();if(who)gest(who,ok?'cheer':'sad');
 if(ok){clap(.8);setTimeout(()=>_sfx('aplauso'),120);}
 if(P.rosc.visible){if(ok)KICK=1;return;}
 const now=performance.now();if(now-reactT<2500)return;reactT=now;const prev=SHOT,prevT=shotT;
 setTimeout(()=>{if(SHOT!==prev)return;_cut(ok?(Math.random()<.5?'audL':'audR'):prev);if(!ok&&who){const hp=who.position;_cut({p:V3(hp.x*.55,1.75,hp.z+2.6),l:V3(hp.x,1.5,hp.z),f:32,dr:.03});}
  const mine=SHOT;setTimeout(()=>{if(SHOT===mine){SHOT=prev;shotT=prevT;}},1100);},250);};
function nearestPlayer(){const L=cam.getWorldDirection(V3(0,0,0));let best=null,bd=-9;for(const h of P.heads||[]){if(!h.visible||h===P.host)continue;let o=h,vis=true;while(o){if(!o.visible)vis=false;o=o.parent;}if(!vis)continue;const d=h.getWorldPosition(V3(0,0,0)).sub(cam.position).normalize().dot(L);if(d>bd){bd=d;best=h;}}return best;}
// presentación del Rosco: órbita alrededor del concursante
ETAPAS&&Object.values(ETAPAS).forEach(E=>E.pr&&E.pr.forEach(pr=>{if(pr[0]=='rosco'&&!pr[1].v3){const f=pr[1];pr[1]=async function(rid){cut('orbitR');return f(rid);};pr[1].v3=1;}}));
// ---- VIDA: gestos, público que aplaude, luces que se mueven ----
function gest(p,type){p.gest={type,t:0,y0:p.gest&&p.gest.y0!==undefined?p.gest.y0:p.position.y};}
let CLAP=0;function clap(e){CLAP=Math.max(CLAP,e);}
let HANDS=null,BEAMS=null,lt=0;
function liveSetup(){if(HANDS||!P.aud)return;const N=P.aud.length;HANDS=new T.InstancedMesh(new T.SphereGeometry(.07,5,4),new T.MeshLambertMaterial({color:0xe0b090}),N*2);P.audM[0].parent.add(HANDS);HANDS.ph=P.aud.map(()=>rnd(0,6.28));
 BEAMS=[];const bm=new T.MeshBasicMaterial({color:0x9cc8ff,transparent:true,opacity:.07,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide});const bg=new T.ConeGeometry(1.4,11,12,1,true);bg.translate(0,-5.5,0);
 for(let i=0;i<6;i++){const m=new T.Mesh(bg,bm);const a=i/6*PI*2;m.position.set(Math.cos(a)*6.5,11,Math.sin(a)*6.5-2);m.ph=i*1.1;P.audM[0].parent.add(m);BEAMS.push(m);}
 updAud(0,1);}
const m4=new T.Matrix4(),q4=new T.Quaternion(),s1=V3(1,1,1),tv=V3(0,0,0);
function updAud(t,force){const N=P.aud.length,[b,h,hr]=P.audM;const e=CLAP;
 for(let i=0;i<N;i++){const p=P.aud[i],ph=HANDS.ph[i],j=e*Math.abs(Math.sin(t*7+ph))*.06;tv.copy(p);tv.y+=j;m4.compose(tv,q4,s1);b.setMatrixAt(i,m4);tv.y+=.52;m4.compose(tv,q4,s1);h.setMatrixAt(i,m4);tv.y+=.02;m4.compose(tv,q4,s1);hr.setMatrixAt(i,m4);
  const dx=-p.x,dz=-p.z,dl=Math.hypot(dx,dz)||1,fx=dx/dl,fz=dz/dl,sep=.06+(e>.02?Math.abs(Math.sin(t*15+ph))*.09:.1),up=e>.02?.32:.12;
  for(const s of[-1,1]){tv.set(p.x+fx*.26-fz*sep*s,p.y+up+j,p.z+fz*.26+fx*sep*s);m4.compose(tv,q4,s1);HANDS.setMatrixAt(i*2+(s>0?1:0),m4);}}
 [b,h,hr,HANDS].forEach(m=>m.instanceMatrix.needsUpdate=true);}
function pulse(m,t,a){if(!m)return;const c=m.material.color;if(m.lastSet===undefined||c.getHex()!==m.lastSet)m.base=c.clone();c.copy(m.base).multiplyScalar(1-a+a*(.5+.5*Math.sin(t)));m.lastSet=c.getHex();}
let liveT=0,audWas=1;
function live(dt){liveSetup();if(!HANDS)return;liveT+=dt;const t=liveT;
 CLAP=Math.max(0,CLAP-dt*.35);if(CLAP>.02||audWas){updAud(t);audWas=CLAP>.02;}
 BEAMS.forEach((m,i)=>{m.rotation.x=Math.sin(t*.5+m.ph)*.45;m.rotation.z=Math.cos(t*.37+m.ph)*.45;});
 pulse(P.band,t*2.2,.25);pulse(P.led,t*3.1+1,.3);pulse(P.glow,t*1.7+2,.3);if(P.cring)pulse(P.cring,t*2.6,.25);pulse(P.scr,t*1.3,.1);
 const talking=!sub.classList.contains('hidden');
 for(const p of P.heads||[]){if(!p.visible||!p.arms)continue;const ph=p.id*1.7,[aL,aR]=p.arms;let hx=0,hy=Math.sin(t*.6+ph)*.15,lz=.12,rz=-.12,lx=Math.sin(t*1.3+ph)*.06,rx=-Math.sin(t*1.3+ph)*.06,y=0;
  if(p===P.host&&talking){rx=-.7+Math.sin(t*3.2)*.35;rz=-.35;lx=-.3+Math.sin(t*2.1+1)*.25;hy=Math.sin(t*1.1)*.25;}
  const g=p.gest;if(g){g.t+=dt;const k=Math.min(1,g.t/.25)*Math.min(1,Math.max(0,(1.8-g.t)/.4));
   if(g.type=='cheer'){lz=.12+2.5*k;rz=-.12-2.5*k;lx=rx=Math.sin(t*12)*.2*k;y=Math.abs(Math.sin(g.t*8))*.1*k;}else{hx=.35*k;hy=Math.sin(g.t*9)*.25*k;lx=rx=.15*k;}
   if(g.t>1.8){p.position.y=g.y0;p.gest=null;}else p.position.y=g.y0+y;}
  aL.rotation.set(lx,0,lz);aR.rotation.set(rx,0,rz);if(p.head){p.head.rotation.x=hx;p.head.rotation.y=hy;}}}
anim(dt=>{live(dt);return true;});
Object.assign(DBG,{makeCab,makeCort,flyTitle,cabecera,live});
