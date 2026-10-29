'use strict';
// v0.21 · Antena 3 · Roberto Leal (junio 2026): plató con más vida, orden de pruebas del 19/6/2026 y A la Z con grafismo medido.
// Sin cabeceras ni cortinillas del programa: cada prueba empieza en el plató 3D con un plano de grúa.
(()=>{
const A26=()=>OPT.a3==2026;
// ---------- 1. orden de pruebas: Una de cuatro, La pista, Palabras cruzadas, ¿Dónde están?, A la Z ----------
const crane=fn=>async rid=>{await grua(rid);return fn(rid);};
{const _mk=mkE12;mkE12=function(y){const e=_mk.apply(this,arguments);if(y!=2026)return e;const m=Object.fromEntries(e.pr.map(x=>[x[0],x[1]]));
  e.pr=[['u4',crane(m.u4)],['pista',crane(m.pista)],['cruz12',crane(m.cruz12)],['donde',crane(m.donde)],['rosco',crane(m.rosco)]];
  e.names='Una de cuatro, La pista, Palabras cruzadas, ¿Dónde están? y A la Z (orden del 19/6/2026)';return e;};
 ETAPAS[2026]=mkE12(2026);}
ST12[2026].tag='plató recreado del 19/6/2026 (aproximado)';
// ---------- 2. cámara: grúa, travellings, planos de público ----------
async function grua(rid){if(!A26())return;const p0=V3(-7,7.5,7),p1=V3(5.5,4.2,5.2),sh={p:p0.clone(),l:V3(0,.9,-1.5),f:52,dr:0};cut(sh);
 await tween(3.2,k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;sh.p.lerpVectors(p0,p1,e);sh.l.set(0,.9+e*.4,-1.5+e*.8);sh.f=52-e*10;});chk(rid);}
window.A3CAM={grua,
 publico:async rid=>{const s={p:V3(0,2.2,-1),l:V3(9,2.6,4),f:40,dr:.04};cut(s);await tween(2.5,k=>{s.l.set(9-k*4,2.6,4+k*3);});},
 cenital:async rid=>{const s={p:V3(0,11,3),l:V3(0,0,-1),f:55,dr:0};cut(s);await tween(4,k=>{s.p.set(Math.sin(k*1.2)*6,11-k,Math.cos(k*1.2)*6);});}};
// ---------- 3. plató A3 2026 ----------
let SET=null,LEDC=null,LEDT=null,BEAMS=[],tAcc=0;
function ledDraw(t){const c=LEDC,g=c.getContext('2d'),w=c.width,h=c.height;const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#17aafa');gr.addColorStop(1,'#0b6fe0');g.fillStyle=gr;g.fillRect(0,0,w,h);
 for(let i=0;i<14;i++){const x=(i*97+t*18*(i%3+1))%(w+80)-40,y=h*(.2+.6*((i*37%100)/100))+Math.sin(t+i)*8,r=14+i%5*9;const b=g.createRadialGradient(x,y,0,x,y,r);b.addColorStop(0,'rgba(140,220,255,.75)');b.addColorStop(1,'rgba(140,220,255,0)');g.fillStyle=b;g.fillRect(x-r,y-r,2*r,2*r);}
 g.fillStyle='rgba(255,255,255,.12)';for(let x=(t*40)%32;x<w;x+=32)g.fillRect(x,0,1,h);LEDT.needsUpdate=true;}
function build(){if(SET||!P.root)return;SET=new T.Group();
 // suelo azul oscuro "reflectante"
 const ft=cv(512,512,(g,w,h)=>{const r=g.createRadialGradient(w/2,h/2,10,w/2,h/2,w/2);r.addColorStop(0,'#1d3f9a');r.addColorStop(.55,'#0b1f5c');r.addColorStop(1,'#040b26');g.fillStyle=r;g.fillRect(0,0,w,h);
  g.strokeStyle='rgba(80,200,255,.35)';g.lineWidth=3;for(const rr of[.2,.3,.42])g.beginPath(),g.arc(w/2,h/2,w*rr,0,7),g.stroke();});
 const fl=new T.Mesh(new T.CircleGeometry(15,48),new T.MeshBasicMaterial({map:ft}));fl.rotation.x=-Math.PI/2;fl.position.y=.012;SET.add(fl);
 // mesa circular blanca brillante con aro LED cian
 const desk=new T.Mesh(new T.CylinderGeometry(2.55,2.6,.95,40,1,true),new T.MeshBasicMaterial({color:0xf4f7fb,side:T.DoubleSide}));desk.position.set(0,.48,-1.4);SET.add(desk);
 const top=new T.Mesh(new T.RingGeometry(1.95,2.6,40),new T.MeshBasicMaterial({color:0xffffff}));top.rotation.x=-Math.PI/2;top.position.set(0,.96,-1.4);SET.add(top);
 const ring=new T.Mesh(new T.TorusGeometry(2.62,.045,6,64),new T.MeshBasicMaterial({color:0x2fe6ff}));ring.rotation.x=Math.PI/2;ring.position.set(0,.2,-1.4);SET.add(ring);SET.ring=ring;
 const ring2=ring.clone();ring2.material=ring.material;ring2.position.y=.9;SET.add(ring2);
 // pared LED curva animada
 LEDC=document.createElement('canvas');LEDC.width=256;LEDC.height=96;LEDT=new T.CanvasTexture(LEDC);LEDT.colorSpace=T.SRGBColorSpace;LEDT.wrapS=T.RepeatWrapping;LEDT.repeat.set(3,1);ledDraw(0);
 const wall=new T.Mesh(new T.CylinderGeometry(12.5,12.5,4.2,40,1,true,Math.PI*.7,Math.PI*.6),new T.MeshBasicMaterial({map:LEDT,side:T.BackSide}));wall.position.set(0,3.1,-1);wall.rotation.y=Math.PI;SET.add(wall);
 // mesas laterales naranja / azul
 for(const [x,c] of [[-3.95,0xff6a00],[3.95,0x1565ff]]){const d=new T.Mesh(new T.BoxGeometry(1.5,.9,.7),new T.MeshBasicMaterial({color:c}));d.position.set(x,.45,.3);d.rotation.y=-x*.09;SET.add(d);
  const l=new T.Mesh(new T.BoxGeometry(1.52,.05,.72),new T.MeshBasicMaterial({color:0xffffff}));l.position.set(x,.92,.3);l.rotation.y=d.rotation.y;SET.add(l);}
 // focos móviles (conos aditivos)
 const bm=new T.MeshBasicMaterial({color:0x9fe6ff,transparent:true,opacity:.09,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide});
 for(let i=0;i<6;i++){const b=new T.Mesh(new T.ConeGeometry(1.1,9,14,1,true),bm);b.geometry.translate(0,-4.5,0);const pv=new T.Group();pv.position.set(-7.5+i*3,9,-4+((i%2)*3));pv.add(b);pv.ph=i*1.1;SET.add(pv);BEAMS.push(pv);}
 P.root.add(SET);SET.visible=false;}
let SV=null,LEDS=null;
function hideBall(on){if(!P.root)return;const L=[P.ballG,P.ball,P.sphere,P.flo&&P.flo.parent];const w=new T.Vector3();
 if(!LEDS){LEDS=[];P.root.traverse(m=>{if(!m.isMesh||m===P.ttl||m===P.scr||!m.geometry||m.geometry.type!=='PlaneGeometry')return;const c=m.material&&m.material.map&&m.material.map._c;m.getWorldPosition(w);if(c&&((c.width==96&&c.height==96)||(c.width==256&&c.height==256))&&w.z<-6)LEDS.push(m.parent&&m.parent!==P.root?m.parent:m);});}
 const all=[...L,...LEDS];if(on){if(!SV)SV={v:all.map(o=>o&&o.visible),m:P.scr&&P.scr.material.map};all.forEach(o=>{if(o)o.visible=false;});if(P.scr){P.scr.material.map=LEDT;P.scr.material.needsUpdate=true;}}
 else if(SV){all.forEach((o,i)=>{if(o)o.visible=SV.v[i];});if(P.scr){P.scr.material.map=SV.m;P.scr.material.needsUpdate=true;}SV=null;}}
function show(on){if(on)build();if(SET)SET.visible=!!on;try{if(!(window.F16&&F16._want))hideBall(!!on);}catch(e){console.error(e);}}
{const _ap=applyPlato;applyPlato=function(){const r=_ap.apply(this,arguments);try{show(A26());}catch(e){console.error(e);}return r;};}
let last=performance.now();
setInterval(()=>{if(!SET||!SET.visible||document.hidden)return;const n=performance.now(),dt=Math.min(.2,(n-last)/1e3);last=n;tAcc+=dt;
 ledDraw(tAcc);if(SV)[P.ballG,P.ball,P.sphere,P.flo&&P.flo.parent,...(LEDS||[])].forEach(o=>{if(o&&o.visible)o.visible=false;});BEAMS.forEach(b=>{b.rotation.z=Math.sin(tAcc*.6+b.ph)*.45;b.rotation.x=Math.cos(tAcc*.45+b.ph)*.3;});
 SET.ring.material.color.setHSL(.53,1,.55+.12*Math.sin(tAcc*3));
 if(P.audM)P.audM.forEach((m,i)=>{if(m)m.position.y=Math.abs(Math.sin(tAcc*4+i*.3))*.03;});},66);
// ---------- 4. A la Z: tira, definición y palabra medidas del 19/6/2026 ----------
{const _b=alazBar6;alazBar6=function(){if(!A26())return _b.apply(this,arguments);const g=new T.Group();const w=Math.round(GW*.88);
 const rr=(c,x,y,W,H,R)=>{c.beginPath();c.moveTo(x+R,y);c.arcTo(x+W,y,x+W,y+H,R);c.arcTo(x+W,y+H,x,y+H,R);c.arcTo(x,y+H,x,y,R);c.arcTo(x,y,x+W,y,R);c.closePath();};
 const L=label(w,120,(c,cw,ch,k)=>{const ph=40*k,org=(g.txt||'').startsWith('NARANJA'),dark=org?'#e05400':'#0967bf',lite=org?'#ff8a1a':'#4894e2';
  // píldora de definición (0–64 %) y de palabra (65,5–100 %)
  const pill=(x,W,top,bot,txt,al)=>{const gr=c.createLinearGradient(0,0,0,ph);gr.addColorStop(0,top);gr.addColorStop(1,bot);rr(c,x,0,W,ph,ph/2);c.fillStyle=gr;c.fill();c.lineWidth=2.5*k;c.strokeStyle='#ffffff';c.stroke();
   ftxt(c,txt,al=='l'?x+18*k:x+W/2,ph/2+2*k,22*k,'#fff',al=='l'?'left':'center',W-30*k,0);};
  pill(1.5*k,cw*.64,lite,dark,(g.def||'').toUpperCase(),'l');pill(cw*.655,cw*.345-1.5*k,org?'#ff7a00':'#1071f4',org?'#ff4d00':'#0b56d8',g.word||'','c');
  const n=25,tw=cw/n,ts=tw*.88,y0=ph+14*k;
  for(let i=0;i<n;i++){const s=(g.st||[])[i]||0,cur=i==g.cur,x=i*tw+(tw-ts)/2,sz=cur?ts*1.12:ts,xx=x-(sz-ts)/2,yy=y0-(sz-ts)/2;
   rr(c,xx,yy,sz,sz,sz*.22);c.fillStyle=s==1?'#2ecc40':s==2?'#e0261c':'#ffffff';c.fill();c.lineWidth=(cur?4:2)*k;c.strokeStyle=cur?(org?'#ff6a00':'#1565ff'):'#b6d5ff';c.stroke();
   ftxt(c,LETRAS[i],xx+sz/2,yy+sz/2+1*k,sz*.7,s?'#fff':(org?'#ff6a00':'#1e26d3'));}});
 g.add(L);const place=()=>{const org=(g.txt||'').startsWith('NARANJA'),sx=org?1:-1;G.children.forEach(o=>{if(o===g)return;if(o.max!==undefined&&o.set){o.position.set(sx*(GW/2-GW*.106),360-.595*720,20);}else if(o.setT&&Math.abs(o.position.y+120)<1){o.userData.a3h=1;}if(o.userData.a3h)o.position.set(sx*(GW/2-GW*.106)-sx*GW*.068,360-.595*720,20);});};
 g.upd=o=>{Object.assign(g,o);if(o.word!==undefined)g.word=o.word.replace(/ /g,'');L.set();place();};
 // la tira se coloca a 81 % de alto y la definición a 72 % (medido)
 setTimeout(()=>{g.position.set(0,360-.765*720,0);},0);return g;};}
// la definición se toma de hostSay mientras dura A la Z
{const _hs=hostSay;hostSay=function(h){if(A26()&&typeof h=='string'){const m=h.match(/^<b>(?:Empieza por|Contiene la) .:<\/b> (.*)$/);if(m){const bar=G.children.find(o=>o.upd&&o.children[0]&&o.children[0].set);if(bar)bar.upd({def:m[1]});}}return _hs.apply(this,arguments);};}
{const _sm=showMenu;showMenu=function(){const r=_sm.apply(this,arguments);try{$('#ver').textContent='v0.21';show(A26());}catch(e){}return r;};}
})();
