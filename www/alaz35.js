'use strict';
// v0.35 · A la Z (Antena 3, 2026) recreado del vídeo de Iker: tira de 25 letras abajo (sin K ni W, con Ñ),
// azul juega A→Z, naranja Z→A con la tira invertida (el foco siempre avanza de izquierda a derecha),
// activa = más grande, acierto = verde; pasapalabra y fallo se quedan en blanco (como en el vídeo).
// Barra de definición azul + barra de palabra (color del jugador) encima; píldora tiempo/aciertos dentro del programa:
// azul a la izquierda (tiempo · aciertos), naranja a la derecha y en espejo (aciertos · tiempo).
(()=>{
const RR=(c,x,y,w,h,r)=>{c.beginPath();c.roundRect(x,y,w,h,r);};
function tileDraw(c,x,y,w,h,ch,st,act,k){const r=Math.min(w,h)*.2;
 c.fillStyle='rgba(10,40,140,.45)';RR(c,x+1*k,y+2.5*k,w,h,r);c.fill();
 let g=c.createLinearGradient(0,y,0,y+h);
 if(st==1){g.addColorStop(0,'#3ee034');g.addColorStop(.5,'#22c01a');g.addColorStop(1,'#14880a');}
 else if(st==3){g.addColorStop(0,'#9fd0ff');g.addColorStop(.5,'#5aa2f6');g.addColorStop(1,'#2f74e6');}
 else{g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#f2f8ff');g.addColorStop(1,'#d3e2f6');}
 c.fillStyle=g;RR(c,x,y,w,h,r);c.fill();
 c.lineWidth=(act?2.6:1.8)*k;c.strokeStyle=st==1?'#0f6e0a':st==3?'#d8e6ff':'#4256e2';c.stroke();
 c.save();RR(c,x,y,w,h,r);c.clip();const gl=c.createLinearGradient(0,y,0,y+h*.5);gl.addColorStop(0,'rgba(255,255,255,.6)');gl.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=gl;c.fillRect(x,y,w,h*.45);c.restore();
 const fs=h*.8;c.font=`800 ${fs}px B2,N,Arial`;c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';
 const col=(st==1||st==3)?'#ffffff':'#2448d6';const cy=y+h*.57;
 c.lineWidth=h*.1;c.strokeStyle=st==1?'rgba(0,70,0,.6)':st==3?'rgba(0,30,120,.6)':'#ffffff';c.strokeText(ch,x+w/2,cy);c.lineWidth=h*.045;c.strokeStyle=col;c.strokeText(ch,x+w/2,cy);c.fillStyle=col;c.fillText(ch,x+w/2,cy);}
function barDraw(c,x,y,w,h,top,bot,k){const r=h*.22;c.fillStyle='rgba(0,30,110,.35)';RR(c,x+1*k,y+3*k,w,h,r);c.fill();
 const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,top);g.addColorStop(1,bot);c.fillStyle=g;RR(c,x,y,w,h,r);c.fill();
 c.lineWidth=2.2*k;c.strokeStyle='#d8e4f4';c.stroke();}
function txt(c,s,x,y,fs,al,maxw,fam,wt){wt=wt||800;c.font=`${wt} ${fs}px ${fam||'MS'},N,Arial`;let z=fs;while(c.measureText(s).width>maxw&&z>8){z-=1;c.font=`${wt} ${z}px ${fam||'MS'},N,Arial`;}c.textAlign=al;c.textBaseline='middle';c.fillStyle='rgba(0,25,90,.55)';c.fillText(s,x+1.5*z/28,y+2*z/28);c.fillStyle='#eef3fb';c.fillText(s,x,y);}
// short35 (resumen de la definición)
window.short35=function(d){d=String(d||'').replace(/<[^>]+>/g,'').trim();let s=d.split(/[,;:.(]/)[0].trim();if(s.length>34){const w=s.split(' ');s='';for(const x of w){if((s+' '+x).trim().length>34)break;s=(s+' '+x).trim();}s=s.replace(/\s+(de|del|la|el|los|las|que|y|o|a|en|con|un|una|por|para)$/i,'');}return s.toUpperCase();};
const BL=['#1f7af0','#0b5ee0'],OR=['#f46605','#f86a08'];
try{document.fonts.load('800 20px B2');document.fonts.load('800 20px MS');}catch(_){}
// medidas tomadas del vídeo (1728x1080 → 720 de alto, factor 2/3, centrado)
const M={x0:-507,x1:508,rowY:-204.5,tw:38.3,th:43.5,barY:-146,barH:45,bL:137,oL:155,pillX:474,pillY:-63,ring:102,inner:81,gx:395,gw:52,gh:48};
window.alazBar35=function(){const g=new T.Group();g.st=Array(25).fill(0);g.cur=-1;g.dir=1;g.p=0;g.tm=0;g.hits=0;g.def='';g.word='';g.pas={};
 const W=M.x1-M.x0,P=W/25;
 const row=label(W+6,M.th+10,(c,cw,ch,k)=>{for(let j=0;j<25;j++){const i=g.dir>0?j:24-j;if(i===g.cur)continue;const st=g.st[i]==1?1:0;tileDraw(c,(3+j*P+(P-M.tw)/2)*k,4*k,M.tw*k,M.th*k,LETRAS[i],st,false,k);}});
 row.position.set((M.x0+M.x1)/2,M.rowY,0);g.add(row);
 const AS=1.1,act=label(M.tw*AS+8,M.th*AS+8,(c,cw,ch,k)=>{if(g.cur<0)return;const st=g.st[g.cur]==1?1:0;tileDraw(c,3*k,3*k,M.tw*AS*k,M.th*AS*k,LETRAS[g.cur],st,true,k);});act.position.z=4;act.renderOrder=6;g.add(act);
 const bar=label(W+6,M.barH+8,(c,cw,ch,k)=>{const h=M.barH*k,y=2*k,wl=(M.bL-M.x0)*k,ox=(M.oL-M.x0)*k;barDraw(c,3*k,y,wl,h,BL[0],BL[1],k);const pc=g.p?OR:BL;barDraw(c,ox+3*k,y,cw-ox-6*k,h,pc[0],pc[1],k);
  if(g.def)txt(c,g.def.toUpperCase(),3*k+wl/2,y+h/2+1*k,27.5*k,'center',wl-50*k,'MS',700);if(g.word)txt(c,g.word,ox+(cw-ox)/2,y+h/2+1*k,25*k,'center',cw-ox-24*k,'MS',700);});
 bar.position.set((M.x0+M.x1)/2,M.barY,0);g.add(bar);
 const PW=(M.pillX-M.gx)+M.ring/2+M.gw/2+8,pill=label(PW,M.ring+8,(c,cw,ch,k)=>{const m=g.p==1;const cy=ch/2,R=M.ring/2*k,cx=m?cw-4*k-R:4*k+R;const pc=m?OR:BL;
  const gcx=m?cx-(M.pillX-M.gx)*k:cx+(M.pillX-M.gx)*k,gw=M.gw*k,gh=M.gh*k;let gg=c.createLinearGradient(0,cy-gh/2,0,cy+gh/2);gg.addColorStop(0,'#15d412');gg.addColorStop(1,'#13830f');
  c.fillStyle='rgba(0,30,110,.35)';RR(c,gcx-gw/2+1*k,cy-gh/2+2*k,gw,gh,6*k);c.fill();c.fillStyle=gg;RR(c,gcx-gw/2,cy-gh/2,gw,gh,6*k);c.fill();c.lineWidth=1.6*k;c.strokeStyle='#d8f0d8';c.stroke();
  txt(c,String(g.hits),gcx,cy-1*k,32*k,'center',gw,'MS');
  // marco doble del reloj
  c.lineWidth=2.2*k;c.strokeStyle='#ffffff';RR(c,cx-R+2*k,cy-R+2*k,2*R-4*k,2*R-4*k,R*.42);c.stroke();{const f=Math.max(0,Math.min(1,g.tm/(g.max||g.tm||1)));c.save();c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,R*1.6,-Math.PI/2,-Math.PI/2+f*2*Math.PI);c.closePath();c.clip();c.lineWidth=6*k;c.strokeStyle=m?'#ffd2b0':'#bfe2ff';RR(c,cx-R+7*k,cy-R+7*k,2*R-14*k,2*R-14*k,R*.4);c.stroke();c.restore();}
  const I=M.inner/2*k;gg=c.createLinearGradient(0,cy-I,0,cy+I);gg.addColorStop(0,pc[0]);gg.addColorStop(1,m?'#e85a04':'#0b4fd0');c.fillStyle='rgba(0,30,110,.3)';RR(c,cx-I+1*k,cy-I+2*k,2*I,2*I,I*.42);c.fill();c.fillStyle=gg;RR(c,cx-I,cy-I,2*I,2*I,I*.42);c.fill();c.lineWidth=1.6*k;c.strokeStyle='rgba(255,255,255,.75)';c.stroke();
  txt(c,String(Math.max(0,Math.ceil(g.tm))),cx,cy-1*k,37*k,'center',I*1.8,'MS');});
 g.add(pill);pill.renderOrder=6;
 const place=()=>{const j=g.cur<0?0:(g.dir>0?g.cur:24-g.cur);act.position.set(M.x0+(j+.5)*P,M.rowY-1,4);act.visible=g.cur>=0;const pc=(M.pillX+M.gx)/2;pill.position.set(g.p?pc:-pc,M.pillY,0);};
 g.upd=o=>{const pr={p:g.p,tm:Math.ceil(g.tm),hits:g.hits};const onlyP=Object.keys(o).every(q=>q=='tm'||q=='hits');Object.assign(g,o);if(!onlyP){place();row.set();bar.set();act.set();}if(pr.p!==g.p||pr.tm!==Math.ceil(g.tm)||pr.hits!==g.hits)pill.set();};
 g.position.y=-140;let t0=performance.now();anim(()=>{const e=Math.min(1,(performance.now()-t0)/500);g.position.y=-140*(1-e)*(1-e);return e<1;});
 place();row.set();bar.set();pill.set();act.set();return g;};
alazBar6=function(){return alazBar35();};
// ---- fallo de selección: si la final elegida es A la Z, toda prueba «rosco» del programa juega A la Z ----
function fin35(){try{for(const y in ETAPAS){const E=ETAPAS[y];if(!E||!E.pr)continue;E.pr.forEach(p=>{if(p[0]=='rosco'&&!p[1].fin35){const o=p[1];const f=async function(rid){return OPT.final=='alaz'?alaZ(rid):o.apply(this,arguments);};f.fin35=1;f.orig=o;p[1]=f;}});}}catch(e){console.error('fin35',e);}}
fin35();{const _sm=showMenu;showMenu=function(){const r=_sm.apply(this,arguments);fin35();return r;};}setInterval(fin35,1000);
window.DBG=Object.assign(window.DBG||{},{alazBar35,fin35});
window.__az35={tileDraw,barDraw,txt,RR};
})();
// ---- v0.35 · plató de A la Z: concursante DE PIE en el atril, plano medio de frente con el pantallón LED detrás,
// plano lateral (close-up) con panel de color, marcador grande y palabra; plano general al agotar tiempo; cabecera A⇄Z ----
(()=>{const {tileDraw,barDraw,txt,RR}=window.__az35;
const LED={u:[.3953,.6047]};// columnas naranjas (calibradas con alaz_video_iker_150: x=164 y x=1104 de 1280)
let scr=null,cuP=null,ST=null,pod=null,on=false,mode='f',side=0,CU=null,gg=null,qn=0,t0=performance.now();
function ledTex(){const c=document.createElement('canvas');c.width=1024;c.height=768;const x=c.getContext('2d');
 const g=x.createLinearGradient(0,0,0,768);g.addColorStop(0,'#2aa8f6');g.addColorStop(.5,'#1d97f0');g.addColorStop(1,'#1386e6');x.fillStyle=g;x.fillRect(0,0,1024,768);
 let sd=7;const R=()=>(sd=(sd*16807)%2147483647)/2147483647;
 for(let i=0;i<40;i++){const px=R()*1024,py=R()*768,r=50+R()*130;const gr=x.createRadialGradient(px,py,0,px,py,r);gr.addColorStop(0,R()<.55?'rgba(110,215,255,.5)':'rgba(8,80,215,.45)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(px-r,py-r,2*r,2*r);}
 for(const u of LED.u){const bx=u*1024;let gr=x.createLinearGradient(bx-14,0,bx+14,0);gr.addColorStop(0,'rgba(255,110,20,0)');gr.addColorStop(.3,'rgba(255,120,30,.7)');gr.addColorStop(.5,'#ff7a1c');gr.addColorStop(.7,'rgba(255,120,30,.7)');gr.addColorStop(1,'rgba(255,110,20,0)');x.fillStyle=gr;x.fillRect(bx-14,0,28,768);x.fillStyle='#ff8a2e';x.fillRect(bx-3,0,6,768);}
 const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;return t;}
function panTex(){const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,512,512);g.addColorStop(0,'#ffb21a');g.addColorStop(.5,'#ff9a0e');g.addColorStop(1,'#ff7a08');x.fillStyle=g;x.fillRect(0,0,512,512);
 for(let i=0;i<22;i++){const px=Math.random()*512,py=Math.random()*512,r=30+Math.random()*90;const gr=x.createRadialGradient(px,py,0,px,py,r);gr.addColorStop(0,'rgba(255,70,0,.45)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(px-r,py-r,2*r,2*r);}
 const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;return t;}
function build(){if(scr)return;scr=new T.Mesh(new T.PlaneGeometry(12,7),new T.MeshBasicMaterial({map:ledTex(),toneMapped:false,fog:false}));S.add(scr);
 cuP=new T.Mesh(new T.PlaneGeometry(2.2,3.2),new T.MeshBasicMaterial({map:panTex(),toneMapped:false,fog:false,side:T.DoubleSide}));S.add(cuP);
 ST=[person({shirt:0x8fb8ea,pants:0x2a3040,hair:0x1e1610,badge:0x2a6af0}),person({shirt:0xf3f1ec,pants:0x2a2a30,hair:0x2a1c12,badge:0xf07a1a,skin:0xe6b48c})];
 ST.forEach(p=>{p.visible=false;S.add(p);});
 pod=new T.Group();const top=new T.Mesh(new T.CylinderGeometry(.32,.32,.04,32),new T.MeshBasicMaterial({color:0xe8f0ff,fog:false}));const rim=new T.Mesh(new T.TorusGeometry(.32,.02,8,40),new T.MeshBasicMaterial({color:0xffc23a,fog:false}));rim.rotation.x=Math.PI/2;const leg=new T.Mesh(new T.CylinderGeometry(.06,.18,1,12),new T.MeshBasicMaterial({color:0xd0d8e8,fog:false}));leg.position.y=-.5;pod.add(top,rim,leg);pod.visible=false;S.add(pod);flo=new T.Mesh(new T.CircleGeometry(9,48),new T.MeshBasicMaterial({color:0x0d2a66,fog:false}));flo.rotation.x=-Math.PI/2;flo.position.y=.01;flo.visible=false;S.add(flo);}
const X=4.35,Z=.5;
const HS=[];let flo=null;function setOnly(v){if(v){HS.forEach(c=>c.visible=true);HS.length=0;return;}if(HS.length)return;const ours=new Set([scr,cuP,pod,flo,...ST]);S.children.forEach(c=>{if(!ours.has(c)&&!c.isLight&&c.visible&&!(c.isCamera)){c.visible=false;HS.push(c);}});}
function seated(v){for(const p of [P.ply,P.ply2,P.cpu,P.cpu2,P.ply3,P.cpu3])if(p)p.visible=v;}
function place(o){build();side=o?1:0;const s=o?-1:1;
 scr.position.set(5.15*s,2.4,Z);scr.rotation.set(0,-s*Math.PI/2,0);scr.visible=true;
 ST.forEach((p,i)=>{p.visible=i==side;});const p=ST[side];p.position.set(X*s,0,Z);p.rotation.set(0,-s*Math.PI/2,0);
 pod.position.set((X-.42)*s,1.0,Z-.05);pod.visible=mode=='c';
 cuP.position.set((X+.3)*s,1.6,Z-1.9*-s);cuP.rotation.set(0,o?Math.PI*.22:Math.PI*.78,0);cuP.visible=mode=='c';flo.visible=true;setOnly(false);seated(false);}
function off(){on=false;if(window.__bk)__bk.visible=false;if(window.__pods)__pods.forEach(q=>q.visible=false);arch(false);setOnly(true);if(scr){scr.visible=cuP.visible=pod.visible=flo.visible=false;ST.forEach(p=>p.visible=false);}seated(true);if(CU)CU.visible=false;}
SHOTS.alaz_b={p:V3(1.0,1.55,Z),l:V3(X,1.38,Z),f:17,dr:.012};SHOTS.alaz_o={p:V3(-1.0,1.55,Z),l:V3(-X,1.38,Z),f:17,dr:.012};
SHOTS.alaz_cb={p:V3(2.15,1.5,2*Z-2.55),l:V3(X-.15,1.22,2*Z-.1),f:19,dr:.012};SHOTS.alaz_co={p:V3(-2.15,1.5,2.55),l:V3(-X+.15,1.22,.1),f:19,dr:.012};
SHOTS.alaz_w={p:V3(-1.6,1.9,Z),l:V3(X,1.35,Z),f:30,dr:.03};SHOTS.alaz_wo={p:V3(1.6,1.9,Z),l:V3(-X,1.35,Z),f:30,dr:.03};
// gestos al hablar: brazos abajo con pequeños movimientos de manos y cabeza
anim(()=>{if(on&&ST){const t=(performance.now()-t0)/1000,p=ST[side];const a=p.arms;if(a){a[0].rotation.x=-.12-.10*Math.max(0,Math.sin(t*2.3));a[1].rotation.x=-.12-.09*Math.max(0,Math.sin(t*1.9+1));a[0].rotation.z=.1+.03*Math.sin(t*1.3);a[1].rotation.z=-.1-.03*Math.sin(t*1.7);}
 if(p.head)p.head.rotation.y=.12*Math.sin(t*.9);p.rotation.z=.01*Math.sin(t*.7);}return true;});
let AR=null;function arch(v){if(!v){if(AR)AR.visible=false;return;}if(!AR){const c=document.createElement('canvas');c.width=256;c.height=416;const x=c.getContext('2d');x.lineWidth=14;x.strokeStyle='#ff4a3a';x.shadowColor='#ff7050';x.shadowBlur=14;x.beginPath();x.roundRect(12,12,232,392,90);x.stroke();const t=new T.CanvasTexture(c);AR=new T.Mesh(new T.PlaneGeometry(1.6,2.6),new T.MeshBasicMaterial({map:t,transparent:true,fog:false,side:T.DoubleSide,depthWrite:false}));S.add(AR);}const s=side?-1:1;AR.position.set((X+.25)*s,1.3,Z);AR.rotation.set(0,-s*Math.PI/2,0);AR.visible=true;}
const _cut=cut;cut=function(n){if(n!='wide')arch(false);if(on&&(n=='blue'||n=='orange')){if(mode=='w'){mode='f';if(gg)gg.upd({__f:1});}const o=n=='orange';place(o);return _cut.call(this,(mode=='c'?'alaz_c':'alaz_')+(o?'o':'b'));}
 if(on&&n=='wide'){mode='w';if(gg)gg.upd({__f:1});place(side);if(pod)pod.visible=true;arch(true);return _cut.call(this,side?'alaz_wo':'alaz_w');}
 if(n=='host'&&on&&mode!='f'&&gg){mode='f';gg.upd({__f:1});}if(n=='host'&&on){setOnly(true);[scr,cuP,pod,flo,...ST].forEach(o=>o&&(o.visible=false));}if(n=='host'&&P.host){P.host.visible=true;if(P.rosc)P.rosc.visible=false;}else if(on&&P.host){P.host.visible=false;}
 return _cut.apply(this,arguments);};
const _cg=clearG;clearG=function(){off();return _cg.apply(this,arguments);};
// close-up: panel de color a la derecha (o izquierda en naranja), marcador y reloj grandes, barra de la palabra
const LAY={c:{gx:.397,ty:.169,gs:.0445,rx:.472,rs:.0906,bx:.347,bw:.2,by:.274,bh:.068},w:{gx:.753,ty:.407,gs:.0266,rx:.801,rs:.049,bx:.727,bw:.125,by:.468,bh:.029}};
function mkCU(){const L=label(1280,720,(c,cw,ch,k)=>{if(!gg)return;const Y=LAY[mode]||LAY.c;const m=gg.p==1;const pc=m?['#ff8a12','#f86a08']:['#1f7af0','#0b5ee0'];
  const cx=Y.rx*cw,ty=Y.ty*ch,R=Y.rs*cw/2,u=R/58;
  c.save();c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=12*u;c.fillStyle='#ffffff';RR(c,cx-R,ty-R,2*R,2*R,R*.42);c.fill();c.restore();
  const f=Math.max(0,Math.min(1,gg.tm/(gg.max||gg.tm||1)));c.save();c.beginPath();c.moveTo(cx,ty);c.arc(cx,ty,R*1.6,-Math.PI/2,-Math.PI/2+f*2*Math.PI);c.closePath();c.clip();c.lineWidth=5*u;c.strokeStyle=m?'#ffb27a':'#8fcaff';RR(c,cx-R+8*u,ty-R+8*u,2*R-16*u,2*R-16*u,R*.4);c.stroke();c.restore();
  const I=R*.72;let g=c.createLinearGradient(0,ty-I,0,ty+I);g.addColorStop(0,pc[0]);g.addColorStop(1,pc[1]);c.fillStyle=g;RR(c,cx-I,ty-I,2*I,2*I,I*.42);c.fill();
  txt(c,String(Math.max(0,Math.ceil(gg.tm))),cx,ty+1*u,R*.95,'center',I*1.8,'MS');
  const gx=Y.gx*cw,gw=Y.gs*cw;g=c.createLinearGradient(0,ty-gw/2,0,ty+gw/2);g.addColorStop(0,'#15d412');g.addColorStop(1,'#13830f');c.fillStyle=g;RR(c,gx-gw/2,ty-gw/2,gw,gw,gw*.14);c.fill();c.lineWidth=2.4*u;c.strokeStyle='#e8ffe8';c.stroke();
  txt(c,String(gg.hits),gx,ty+1*u,gw*.62,'center',gw*.9,'MS');
  const bx=Y.bx*cw,bw=Y.bw*cw,by=Y.by*ch,bh=Y.bh*ch;barDraw(c,bx,by,bw,bh,pc[0],pc[1],u);c.lineWidth=3.2*u;c.strokeStyle='#ffffff';RR(c,bx,by,bw,bh,bh*.22);c.stroke();
  if(gg.word)txt(c,gg.word,bx+bw/2,by+bh/2+1*u,bh*.55,'center',bw-20*u,'MS',700);});
 L.renderOrder=7;return L;}
const _ab=window.alazBar35;window.alazBar35=function(){on=true;mode='f';qn=0;const g=_ab.apply(this,arguments);gg=g;CU=mkCU();CU.visible=false;CU.position.z=6;G.add(CU);
 const u=g.upd;g.upd=o=>{if(window.__az35frz&&!o.__f)return;delete o.__f;const nq=o.cur!==undefined&&o.cur>=0&&o.cur!==g.cur;const np=o.p!==undefined&&o.p!==g.p;u(o);
  if(np){qn=0;mode='f';}
  if(nq){qn++;const want=(qn%3==2)?'c':'f';if(want!=mode){mode=want;cut(g.p?'orange':'blue');}}
  const c=mode!='f';if(c){g.children.forEach(ch=>{if(ch!==CU&&ch.visible){ch.visible=false;(g._h||(g._h=[])).push(ch);}});}else if(g._h){g._h.forEach(ch=>ch.visible=true);g._h=null;}CU.visible=c;if(cuP)cuP.visible=c;CU.set();};
 return g;};alazBar6=function(){return window.alazBar35();};
// cabecera «A la Z»: fondo azul con letras flotando, fichas A y Z con flechas; en la salida la A y la Z se intercambian
// cabecera/cierre «A la Z» medidos fotograma a fotograma del vídeo (300.75–305.0 s): entra la A (0–.25), la Z desde la derecha (.25–.5),
// fila (.5), intercambio A⇄Z (1.75–2.0), Z la A (2.0–2.25), vuelta (2.25–2.5), la fila se apaga de izq. a der. (2.75–3.75), salida a la izquierda (3.75–4.25)
const LT={tw:186,th:229,dx:181,cy:.503,la:53,ay:83,al:80,rw:31,rh:34,rp:32,ry:486};
const sm=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
function logoCard(swap,dur){const st={t:0};dur=dur||4.25;const L=label(GW,720,(c,cw,ch,k)=>{const t=st.t;const g=c.createRadialGradient(cw/2,ch*.45,40*k,cw/2,ch/2,cw*.7);g.addColorStop(0,'#3fb0ff');g.addColorStop(1,'#0b6ee0');c.fillStyle=g;c.fillRect(0,0,cw,ch);
  let sd=3;const R=()=>(sd=(sd*16807)%2147483647)/2147483647;for(let i=0;i<160;i++){const x=R()*cw,y=(R()*ch+t*30*k*(.4+R()))%ch,sz=(4+R()*12)*k;c.globalAlpha=.25+R()*.5;c.fillStyle=R()<.5?'#bfe6ff':(R()<.5?'#6cc0ff':'#ff9ad0');c.save();c.translate(x,y);c.rotate(R()*6+t);c.fillRect(-sz/2,-sz/3,sz,sz*.66);c.restore();}c.globalAlpha=1;
  const cx=cw/2,cy=LT.cy*ch,tw=LT.tw*k,th=LT.th*k,dx=LT.dx*k;const oT=swap?3.1:dur-.6;const out=sm((t-oT)/.55),outZ=sm((t-oT-.25)/.45);
  const sw=swap?(sm((t-1.65)/.25)-sm((t-1.92)/.2)):0;
  const posA=[cx-dx+2*dx*sw,cy-Math.sin(sw*Math.PI)*60*k],posZ=[cx+dx-2*dx*sw,cy+Math.sin(sw*Math.PI)*60*k];
  const aIn=sm(t/.12),zIn=sm((t-.08)/.14);
  const tile=(chh,p,inn,ox,ou)=>{if(inn<=0)return;c.save();c.translate(p[0]+ox-ou*cw*.8,p[1]);c.rotate((1-inn)*-.8+ou*-.5);c.scale(.4+.6*inn,.4+.6*inn);c.globalAlpha=Math.min(1,inn*1.5);
   c.fillStyle='rgba(8,40,140,.45)';RR(c,-tw/2+6*k,-th/2+9*k,tw,th,tw*.14);c.fill();
   let gr=c.createLinearGradient(0,-th/2,0,th/2);gr.addColorStop(0,'#ffffff');gr.addColorStop(.55,'#eef4fb');gr.addColorStop(1,'#c9d6ea');c.fillStyle=gr;RR(c,-tw/2,-th/2,tw,th,tw*.14);c.fill();
   c.lineWidth=11*k;c.strokeStyle='#2f55e4';c.stroke();c.lineWidth=3*k;c.strokeStyle='#9fb6ff';RR(c,-tw/2+9*k,-th/2+9*k,tw-18*k,th-18*k,tw*.1);c.stroke();
   c.font=`800 ${th*.86}px B2,Arial`;c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.lineWidth=th*.05;c.strokeStyle='#1d3fc8';c.fillStyle='#2a52e0';c.strokeText(chh,0,th*.06);c.fillText(chh,0,th*.06);
   c.fillStyle='rgba(255,255,255,.35)';c.fillText(chh,-th*.02,th*.03);c.restore();};
  tile('A',posA,aIn,0,out);tile('Z',posZ,zIn,(1-zIn)*cw*.5,outZ);
  if(t>.15){c.globalAlpha=(1-Math.sin(sw*Math.PI))*(1-out);c.fillStyle='#ffffff';c.font=`700 ${LT.la*k}px MS,Arial`;c.textAlign='center';c.textBaseline='middle';c.fillText('la',cx-out*cw*.8,cy+4*k);
   c.strokeStyle='#1840b8';c.fillStyle='#1840b8';c.lineWidth=7*k;c.lineCap='round';for(const [y,d] of [[cy-LT.ay*k,-1],[cy+LT.ay*k,1]]){const x0=cx-out*cw*.8;c.beginPath();c.moveTo(x0-LT.al*k/2,y);c.lineTo(x0+LT.al*k/2,y);c.stroke();const hx=x0+d*LT.al*k/2;c.beginPath();c.moveTo(hx+d*4*k,y);c.lineTo(hx-d*14*k,y-12*k);c.lineTo(hx-d*14*k,y+12*k);c.closePath();c.fill();}c.globalAlpha=1;}
  if(t>=.02){const P=LT.rp*k,x0=cx-12.5*P;for(let j=0;j<25;j++){const gone=t>(swap?2.1:dur-.9)+j*.03;if(gone||t<j*.028)continue;tileDraw(c,x0+j*P+(P-LT.rw*k)/2,LT.ry*k,LT.rw*k,LT.rh*k,LETRAS[j],0,false,k);}}});
 L.renderOrder=9;L.position.z=30;let a0=performance.now();L.st=st;L.seek=v=>{a0=performance.now()-v*1000;st.t=v;L.set();};anim(()=>{if(L.frz)return L.parent!=null;st.t=(performance.now()-a0)/1000;L.set();return L.parent!=null&&st.t<dur+.2;});return L;}
window.alazLogo35=logoCard;window.__az35ST=()=>ST;window.__az35st=()=>({on,mode,qn});window.__az35g=()=>gg;window.__az35mode=v=>{mode=v;};
// ---- créditos finales (vídeo 285–300 s). Reglas de Iker: logo de Showtime TV en lugar de la productora real y nombres inventados marcados 🆕 INVENTADO
const SHW=new Image();SHW.src='aps/logos/showtime_tv_azul.png';
const CRED=[{t:12.5,kind:'agr',logos:['Editorial Brisa','Ludo Norte','Sello Alba','Mestral']},{t:14.0,kind:'agr',logos:['Casa Lexia','Ludo Norte','Enclave Juegos','Ápice']},
 {t:16.0,kind:'txt',l:['Una producción de','@SHOWTIME']},{t:19.0,kind:'txt',l:['Basado en un formato de Laura Benet,','Óscar Riba y Marta Solé (🆕 INVENTADO)']},
 {t:23.0,kind:'txt',l:['AlaZ está basado en el formato DeLaAaLaZ,','propiedad de Televisión Alpina (🆕 INVENTADO)']}];
function credLabel(st){const W=720,H=70;const L=label(W,H,(c,cw,ch,k)=>{const t=st.t;let cur=-1;for(let i=0;i<CRED.length;i++)if(t>=CRED[i].t)cur=i;if(cur<0)return;
  const wIn=sm((t-CRED[0].t)/.4);const r=(H-6)*k/2;c.save();c.beginPath();c.rect(0,0,cw*wIn,ch);c.clip();
  const gr=c.createLinearGradient(0,0,cw,0);gr.addColorStop(0,'#0f5ee8');gr.addColorStop(.5,'#1a72f4');gr.addColorStop(1,'#0f5ee8');c.fillStyle='rgba(0,20,80,.35)';RR(c,4*k,5*k,cw-8*k,ch-8*k,r);c.fill();c.fillStyle=gr;RR(c,3*k,3*k,cw-6*k,ch-6*k,r);c.fill();c.lineWidth=2*k;c.strokeStyle='rgba(220,235,255,.9)';c.stroke();
  const draw=(e,a)=>{c.globalAlpha=a;c.fillStyle='#ffffff';c.textAlign='center';c.textBaseline='middle';
   if(e.kind=='agr'){c.font=`700 ${13*k}px MS,Arial`;c.textAlign='left';c.fillText('AGRADECIMIENTOS',22*k,ch/2);e.logos.forEach((n,i)=>{const x=205*k+i*112*k;c.fillStyle='#ffffff';c.fillRect(x,ch/2-13*k,92*k,26*k);c.fillStyle='#183a8a';c.font=`800 ${10.5*k}px MS,Arial`;c.textAlign='center';c.fillText(n,x+46*k,ch/2-3*k);c.font=`700 ${6.5*k}px MS,Arial`;c.fillStyle='#e0401a';c.fillText('🆕 INVENTADO',x+46*k,ch/2+8*k);c.fillStyle='#ffffff';});}
   else if(e.l[1]=='@SHOWTIME'){c.font=`700 ${16*k}px MS,Arial`;c.textAlign='right';c.fillText(e.l[0],cw/2+10*k,ch/2);const h=58*k,w=SHW.naturalWidth?h*SHW.naturalWidth/SHW.naturalHeight:h;if(SHW.naturalWidth)c.drawImage(SHW,cw/2+22*k,ch/2-h/2,w,h);c.textAlign='left';c.font=`800 ${16*k}px MS,Arial`;c.fillText('SHOWTIME TV',cw/2+28*k+w,ch/2);}
   else{c.font=`700 ${14.5*k}px MS,Arial`;e.l.forEach((s,i)=>{const y=ch/2+(i-.5)*17*k;if(s=='@SHOWTIME'){if(SHW.complete&&SHW.naturalWidth){const h=18*k,w=h*SHW.naturalWidth/SHW.naturalHeight;c.drawImage(SHW,cw/2-w/2,y-h/2,w,h);}else c.fillText('SHOWTIME TV',cw/2,y);}else c.fillText(s,cw/2,y);});}c.globalAlpha=1;};
  const e=CRED[cur],nx=CRED[cur+1];const fo=nx?sm((t-(nx.t-.5))/.5):0;draw(e,1-fo);if(nx&&fo>0)draw(nx,fo);c.restore();});
 L.position.set(0,-288,21);L.renderOrder=9;return L;}
function boteLabel(){const L=label(420,54,(c,cw,ch,k)=>{const gr=c.createLinearGradient(0,0,0,ch);gr.addColorStop(0,'#2a7cff');gr.addColorStop(1,'#0b4fd0');c.fillStyle=gr;RR(c,0,0,cw,ch,8*k);c.fill();
  c.font=`800 ${34*k}px MS,Arial`;c.fillStyle='#ffffff';c.textAlign='center';c.textBaseline='middle';c.fillText(((v=>isFinite(v)&&v>0?v:1216000)(1216000)).toLocaleString('es-ES')+' €',cw/2,ch/2+2*k);});L.position.set(0,330,22);return L;}
SHOTS.alaz_vw={p:V3(0,2.3,6.2),l:V3(0,1.15,-1),f:25,dr:.06};
// secuencia final medida del vídeo (276–300 s, t=0 al acabar el tiempo): frontal 0–2, muy general con bote 2–4, general arco 4–9, presentador 9–15
// (créditos desde 12.5), frontal 15–18, general 18–20, muy general 20–22, frontal 22–24, cierre «A la Z» 24
async function finAZ(rid,o){o=o||{};const sd=side;const st={t:0};const CL=credLabel(st);G.add(CL);let BL=null;const t0=performance.now();let stop=false;
 anim(()=>{if(stop||o.frz)return !stop;st.t=(performance.now()-t0)/1000+(o.t0||0);CL.set();return true;});
 const seq=[[0,'f'],[2,'vw'],[4,'w'],[9,'h'],[15,'f'],[18,'w'],[20,'vw'],[22,'f'],[24,'end']];
 window.__finAZ={st,CL,go:(n)=>shot(n)};
 const shot=n=>{if(BL){G.remove(BL);BL=null;}on=true;if(gg&&'visible' in gg)gg.visible=true;try{say();}catch(e){}document.querySelectorAll('#sub,.sub,#host,.hostbar').forEach(e=>e.style.visibility='hidden');if(window.__bk)__bk.visible=false;
  if(n=='f')cut(sd?'orange':'blue');else if(n=='w')cut('wide');else if(n=='h'){cut('host');if(gg&&'visible' in gg)gg.visible=false;const H=SHOTS.host;if(H&&H.p&&H.l){const hp=new THREE.Vector3();if(P.host)P.host.getWorldPosition(hp);const l=new THREE.Vector3(hp.x,hp.y+1.6,hp.z),d=H.p.clone().sub(l).setY(0).normalize().applyAxisAngle(new THREE.Vector3(0,1,0),window.__hrot!=null?__hrot:.75);SHOTS.alaz_h={p:l.clone().add(d.multiplyScalar(2.4)).setY(hp.y+1.72),l:l,f:26,dr:.01};_cut.call(null,'alaz_h');}}else if(n=='vw'){place(sd);seated(false);setOnly(false);ST.forEach((p,i)=>{p.position.set(i?.8:-.8,0,-.6);p.rotation.set(0,i?-.12:.12,0);p.visible=true;});if(cuP)cuP.visible=false;if(pod)pod.visible=false;if(pod&&!window.__pods){window.__pods=[pod.clone(),pod.clone()];__pods.forEach(q=>S.add(q));}if(window.__pods)__pods.forEach((q,i)=>{q.position.set(i?.85:-.85,pod.position.y,-.15);q.visible=true;});if(!window.__bk&&scr){const m=scr.material;window.__bk=new THREE.Mesh(new THREE.PlaneGeometry(30,10),m);__bk.position.set(0,3.4,-6);S.add(__bk);}if(window.__bk)__bk.visible=true;if(gg){mode='w';gg.upd({__f:1});}_cut.call(null,'alaz_vw');BL=boteLabel();G.add(BL);}};
 if(o.manual)return;
 for(let i=0;i<seq.length-1;i++){shot(seq[i][1]);await wait(seq[i+1][0]-seq[i][0],rid);}
 stop=true;G.remove(CL);if(BL)G.remove(BL);document.querySelectorAll('#sub,.sub,#host,.hostbar').forEach(e=>e.style.visibility='');}
window.finAZ35=finAZ;
// A la Z es etapa Antena 3: rótulos de Antena 3 mientras dura la prueba
setInterval(()=>{try{if(on&&!window.__az35a3){window.__az35a3=[OPT.a3];OPT.a3=1;}else if(!on&&window.__az35a3){OPT.a3=window.__az35a3[0];window.__az35a3=null;}}catch(e){}},400);
const _az=alaZ;alaZ=async function(rid){try{const L=logoCard(false,3.2);G.add(L);await wait(3.2,rid);G.remove(L);}catch(e){}
 const r=await _az.apply(this,arguments);
 try{await finAZ(rid);}catch(e){}
 try{const L=logoCard(true,4.25);G.add(L);await wait(4.25,rid);G.remove(L);}catch(e){}return r;};
})();
// v0.35: concursantes realistas (GLB MakeHuman) de pie, cara visible, brazos abajo
(function(){if(!THREE.GLTFLoader||/nogl/.test(location.search))return;const ld=new THREE.GLTFLoader();const M2={};
function aim(b,c,dw){b.updateWorldMatrix(true,true);const pa=new THREE.Vector3(),pc=new THREE.Vector3();b.getWorldPosition(pa);c.getWorldPosition(pc);const cur=pc.sub(pa).normalize();const q=new THREE.Quaternion().setFromUnitVectors(cur,dw.clone().normalize());const wq=new THREE.Quaternion();b.getWorldQuaternion(wq);const nq=q.multiply(wq);const pq=new THREE.Quaternion();b.parent.getWorldQuaternion(pq);b.quaternion.copy(pq.invert().multiply(nq));b.updateWorldMatrix(false,true);}
function rec(a,fn){try{const im=a.map.image,cv=document.createElement('canvas');const sc=Math.min(1,512/im.width);cv.width=im.width*sc|0;cv.height=im.height*sc|0;const x=cv.getContext('2d');x.drawImage(im,0,0,cv.width,cv.height);const d=x.getImageData(0,0,cv.width,cv.height),q=d.data;for(let i=0;i<q.length;i+=4){const j=i/4;fn(q,i,(j%cv.width)/cv.width,Math.floor(j/cv.width)/cv.height);}x.putImageData(d,0,0);const t=new THREE.CanvasTexture(cv);t.flipY=a.map.flipY;t.colorSpace=a.map.colorSpace;a.map=t;}catch(e){}}
function fit(i,url){ld.load(url,g=>{const m=g.scene;m.traverse(o=>{if(o.isMesh&&o.material&&/suit/i.test(o.material.name||'')&&o.material.map&&o.material.map.image){rec(o.material,i==0?(q,k,u,v)=>{const r=q[k],g=q[k+1],b=q[k+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx<14)return;if(b-r>45)return;const l=(r+g+b)/765,f=.7+l*.9;q[k]=143*f;q[k+1]=184*f;q[k+2]=234*f;}:(q,k,u,v)=>{if(v<.42||u>.57){const l=(q[k]+q[k+1]+q[k+2])/765,f=Math.min(1,.82+l*.5);q[k]=244*f;q[k+1]=242*f;q[k+2]=236*f;}});}if(o.isMesh&&/teeth|tongue|eyelash/i.test(o.name+(o.material&&o.material.name||''))){o.visible=false;}if(o.isMesh){o.frustumCulled=false;o.castShadow=false;const a=o.material;if(a){const n=new THREE.MeshLambertMaterial({map:a.map||null,color:a.color?a.color.clone():0xffffff,transparent:a.transparent,alphaTest:a.alphaTest||(a.transparent?.3:0),side:a.side});n.fog=false;if(a.map){n.emissiveMap=a.map;n.emissive=new THREE.Color(0x555555);}o.material=n;a.dispose&&a.dispose();}}});
 const b=new THREE.Box3().setFromObject(m),h=b.max.y-b.min.y;m.scale.setScalar(1.76/h);m.position.y=-b.min.y*1.76/h;M2[i]=m;tryAttach();});}
function PERS(p){const r=(OPT.pers|0)==1;if(!p||!p.__real)return;p.__real.visible=r;p.__old.visible=!r;p.arms=r?p.__armsD:p.__arms0;}let lastP=-1;
window.__az35aim=(...a)=>aim(...a);
function bone(m,n){let r=null;m.traverse(o=>{if(!r&&o.name==n)r=o;});return r;}
function tryAttach(){const ST=window.__az35ST&&window.__az35ST();if(!ST)return setTimeout(tryAttach,500);[0,1].forEach(i=>{const m=M2[i];const p=ST[i];if(!m||!p||p.__real)return;if(m.parent)m.parent.remove(m);const old=new THREE.Group();old.visible=false;[...p.children].forEach(c=>old.add(c));p.add(old);p.add(m);p.__old=old;p.__arms0=p.arms;m.__on=1;m.visible=true;
 const B={};['upperarm_l','lowerarm_l','hand_l','upperarm_r','lowerarm_r','hand_r','head','neck_01'].forEach(n=>B[n]=bone(m,n));m.userData.B=B;m.userData.rest={};for(const k in B)if(B[k])m.userData.rest[k]=B[k].quaternion.clone();
 pose(m,0);p.__armsD=[new THREE.Object3D(),new THREE.Object3D()];p.arms=p.__armsD;p.__real=m;PERS(p);});}
function pose(m,t){const B=m.userData.B,R=m.userData.rest;for(const k in R)B[k].quaternion.copy(R[k]);m.updateWorldMatrix(true,true);
 const fw=new THREE.Vector3(0,0,1).applyQuaternion(m.getWorldQuaternion(new THREE.Quaternion())),up=new THREE.Vector3(0,1,0);
 const sd=new THREE.Vector3().crossVectors(up,fw).normalize();
 [['l',1],['r',-1]].forEach(([s,k],j)=>{const g=.10*Math.max(0,Math.sin(t*2.1+j*1.3));const d=up.clone().multiplyScalar(-1).add(sd.clone().multiplyScalar(.13*k)).add(fw.clone().multiplyScalar(.05+g*.4));aim(B['upperarm_'+s],B['lowerarm_'+s],d);
  const d2=up.clone().multiplyScalar(-1).add(fw.clone().multiplyScalar(.35+g*2.2)).add(sd.clone().multiplyScalar(.04*k));aim(B['lowerarm_'+s],B['hand_'+s],d2);});
 if(B.head){B.head.rotateY(.06*Math.sin(t*.9));B.head.rotateX(.03*Math.sin(t*1.7));}}
let LOADED=false;function loadAll(){if(LOADED)return;LOADED=true;fit(0,'humanos/tarik.glb');fit(1,'humanos/ozan.glb');
ld.load('humanos/galip.glb',g=>{const m=g.scene;m.traverse(o=>{if(o.isMesh&&/teeth|tongue|eyelash/i.test(o.name+(o.material&&o.material.name||''))){o.visible=false;}if(o.isMesh){o.frustumCulled=false;const a=o.material;if(a){if(/suit/i.test(a.name||'')&&a.map&&a.map.image){try{const im=a.map.image,cv=document.createElement('canvas');const sc=Math.min(1,512/im.width);cv.width=im.width*sc|0;cv.height=im.height*sc|0;const x=cv.getContext('2d');x.drawImage(im,0,0,cv.width,cv.height);const d=x.getImageData(0,0,cv.width,cv.height),q=d.data;for(let i=0;i<q.length;i+=4){const l=(q[i]*.3+q[i+1]*.59+q[i+2]*.11)/255;const px=(i/4)%cv.width/cv.width,py=Math.floor(i/4/cv.width)/cv.height;if(px>.29&&px<.47&&py<.3&&l>.06){q[i]=q[i+1]=q[i+2]=238;continue;}if(l<.42){const f=.55+l*1.6;q[i]=88*f;q[i+1]=104*f;q[i+2]=70*f;}else if(Math.abs(q[i]-q[i+2])>40||l<.7){q[i]=q[i+1]=q[i+2]=235;}}x.putImageData(d,0,0);const t=new THREE.CanvasTexture(cv);t.flipY=a.map.flipY;t.colorSpace=a.map.colorSpace;a.map=t;}catch(e){}}const n=new THREE.MeshLambertMaterial({map:a.map||null,color:a.color?a.color.clone():0xffffff,transparent:a.transparent,alphaTest:a.alphaTest||(a.transparent?.3:0),side:a.side});if(a.map){n.emissiveMap=a.map;n.emissive=new THREE.Color(0x555555);}o.material=n;}}});
 const att=()=>{const H=(typeof P!="undefined")&&P.host;if(!H)return setTimeout(att,700);const b=new THREE.Box3().setFromObject(H),hh=(b.max.y-b.min.y)||1.8;const bm=new THREE.Box3().setFromObject(m),h=bm.max.y-bm.min.y;H.updateWorldMatrix(true,false);const ws=new THREE.Vector3();H.getWorldScale(ws);const sc=Math.min(hh,1.95)/h/ws.y;m.scale.setScalar(sc);m.position.y=-bm.min.y*sc;
  const old=new THREE.Group();old.visible=false;[...H.children].forEach(c=>old.add(c));H.add(old);H.add(m);H.__old=old;H.__arms0=H.arms;H.__armsD=[new THREE.Object3D(),new THREE.Object3D()];const B={};['upperarm_l','lowerarm_l','hand_l','upperarm_r','lowerarm_r','hand_r','head','neck_01'].forEach(n=>B[n]=bone(m,n));m.userData.B=B;m.userData.rest={};for(const k in B)if(B[k])m.userData.rest[k]=B[k].quaternion.clone();H.__real=m;window.__hostReal=H;PERS(H);};att();});}
const t0=performance.now();(function lp(){requestAnimationFrame(lp);window.__rafn=(window.__rafn||0)+1;if(__rafn%3)return;const pv=OPT.pers|0;if(pv==1&&__rafn%90==0){const s9=window.__az35ST&&__az35ST();if(s9&&s9.some((q,i)=>M2[i]&&!q.__real))tryAttach();}if(pv!==lastP){lastP=pv;if(pv==1)loadAll();const STx=window.__az35ST&&__az35ST();(STx||[]).forEach(PERS);if(window.__hostReal)PERS(__hostReal);}if(window.__hostReal&&__hostReal.visible&&(OPT.pers|0)==1)pose(__hostReal.__real,(performance.now()-t0)/1000+2);const ST=window.__az35ST&&window.__az35ST();if(!ST)return;const t=(performance.now()-t0)/1000;ST.forEach(p=>{if(p.__real&&p.visible&&(OPT.pers|0)==1)pose(p.__real,t);});})();})();
// v0.35: barra del presentador sincronizada con la definición que se está leyendo (ventana de ~6 palabras que avanza)
(function(){if(typeof hostSay!='function')return;const _h=hostSay;let tk=null;
 window.hostSay=hostSay=function(s){if(tk){clearInterval(tk);tk=null;}const st=window.__az35st&&__az35st();const m=String(s||'').match(/^(<b>(?:Empieza por|Contiene la) [^<]*<\/b>)\s*(.*)$/);
  if(!st||!st.on||!m)return _h.apply(this,arguments);const W=m[2].split(/\s+/).filter(Boolean);let i=0;const N=6;
  const show=()=>{const a=Math.max(0,Math.min(i,W.length-N));const part=W.slice(a,Math.min(W.length,i+1));_h.call(this,m[1]+' '+(a>0?'… ':'')+part.join(' ')+(i+1<W.length?' …':''));};
  show();tk=setInterval(()=>{i++;if(i>=W.length){clearInterval(tk);tk=null;_h.call(this,m[1]+' '+(W.length>N?'… '+W.slice(-N).join(' '):W.join(' ')));return;}show();},380);};
 window.__az35say=(L,def,starts)=>hostSay(`<b>${starts===false?'Contiene la':'Empieza por'} ${L}:</b> ${def.charAt(0)+def.slice(1).toLowerCase()}`);})();
