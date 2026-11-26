'use strict';
// v0.27 · «🎬 VÍDEOS Y PROMOS DE PASAPALABRA»
//  (a) los vídeos ORIGINALES que manda Iker, copiados tal cual (mismo archivo, sin recomprimir) en videos/;
//  (b) RECREACIONES 3D de esos mismos vídeos hechas con el motor three.js del juego, con el audio original del vídeo.
//  Presentador: el avatar del presentador del juego (no es la persona real). Logo de cadena → Showtime TV (regla de Iker).
(()=>{
const VIDS=[
 {id:'v27_estreno2018',t:'Arranque del primer programa · nueva etapa (Telecinco, sept. 2018)',d:'0:58',rec:'estreno'},
 {id:'v27_promo2018',t:'Promo «Nueva temporada» (Telecinco, 2018)',d:'0:25',rec:'promo'},
 {id:'alaz_iker',t:'«A la Z» · vídeo REAL (Antena 3, 2026) · enviado por Iker',d:'5:05',rec:'alaz'}];
(window.V28META||[]).forEach(m=>{const n=String(m.n).padStart(2,'0');VIDS.push({id:'v28_p'+n,t:`${m.t} · ${m.e}`,d:Math.floor(m.D/60)+':'+String(Math.round(m.D%60)).padStart(2,'0'),url:'https://github.com/ikeriano/pasapalabra-3d-grok-bot/releases/download/v0.28/prueba'+n+'.mp4',m});});
window.VID27=VIDS;
const css=`#vp27{position:fixed;inset:0;z-index:60;background:rgba(3,14,48,.92);overflow:auto;font-family:N,Arial;color:#fff}
#vp27 .bx{max-width:900px;margin:0 auto;padding:14px}#vp27 h2{margin:6px 0 10px;font-size:22px}
#vp27 .it{display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.08);border-radius:14px;padding:8px;margin:8px 0}
#vp27 .it img{width:160px;border-radius:8px}#vp27 .it b{display:block;font-size:15px}#vp27 .nt{opacity:.8;font-size:13px}
#vp27 button{font:inherit;font-weight:800;border:0;border-radius:22px;padding:9px 14px;margin:4px 6px 0 0;background:#1a78f0;color:#fff}
#vp27 button.o{background:#f07a1a}#vp27 button.ce{background:#444;margin-top:12px}#vp27 video{width:100%;max-height:72vh;background:#000;border-radius:8px}
#rc27{position:fixed;inset:0;pointer-events:none;z-index:8;overflow:hidden;font-family:N,Arial}
#rc27 .tag{position:absolute;left:8px;top:8px;background:rgba(0,0,0,.45);color:#fff;font:700 12px N,Arial;padding:3px 8px;border-radius:10px}
#rc27 .lt{position:absolute;left:50%;bottom:9%;transform:translateX(-50%);width:34%;padding:.4em 0;border-radius:2em;text-align:center;color:#fff;
 background:linear-gradient(#2a8cff,#0a4fd8);border:3px solid #e8f2ff;box-shadow:0 0 0 3px #0a3aa0,0 6px 18px rgba(0,0,0,.4);font-size:2.6vw;line-height:1.15}
#rc27 .lt small{display:block;font-size:.62em;font-weight:600}#rc27 .lt b{font-weight:900}
#rc27 .fl{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,transparent 0,transparent var(--r),#fff calc(var(--r) + 4%),#fff 100%)}
#rc27 .gl{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.85) 0 6px,rgba(60,140,255,.6) 6px 16px,transparent 16px 34px);mix-blend-mode:screen}
#rc27 .big{position:absolute;left:0;right:0;text-align:center;color:#fff;font-weight:900;text-shadow:0 4px 0 rgba(0,40,140,.35)}
#rc27 .pill{position:absolute;left:50%;bottom:11%;transform:translateX(-50%);display:flex;align-items:center;gap:.4em;background:#fff;color:#0a2a7a;border-radius:.3em;padding:.12em .5em;font-size:3.4vw;font-weight:600}
#rc27 .pill img{height:1.25em}#rc27 canvas{position:absolute;inset:0;width:100%;height:100%}
#rc27 .grid{position:absolute;inset:0;border:0}#rc27 .grid i{position:absolute;background:#f07a1a;box-shadow:0 0 6px #ffb060}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const $e=(h)=>{const d=document.createElement('div');d.innerHTML=h;return d.firstElementChild;};
function close27(){const e=document.getElementById('vp27');if(e){const v=e.querySelector('video');if(v){try{v.pause();v.removeAttribute('src');v.load();}catch(_){}}e.remove();}}
function view(h){close27();const e=$e(`<div id="vp27"><div class="bx">${h}</div></div>`);document.body.appendChild(e);
 e.querySelectorAll('[data-a]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();try{sfx('ok');}catch(_){}act(b.dataset.a);});return e;}
function list(){view(`<h2>🎬 VÍDEOS Y PROMOS DE PASAPALABRA</h2><div class="nt">Vídeo original a su calidad original (el mismo archivo que mandó Iker) y su <b>recreación en 3D</b> hecha con el motor del juego (con el audio original). En las recreaciones el presentador es el avatar del juego, no la persona real.</div>`+
 VIDS.map((x,i)=>`<div class="it"><img src="videos/${x.id}.jpg"><div><b>${x.t}</b><span class="nt">${x.d}</span><br><button data-a="o:${i}">▶ ${x.rec=='alaz'?'Vídeo real':'Vídeo original'}</button><button class="o" data-a="r:${i}">🧊 Recreación 3D</button></div></div>`).join('')+
 `<button class="ce" data-a="x">⟵ Volver</button>`);}
function play(i){const x=VIDS[i];const e=view(`<h2>▶ ${x.t}</h2><video controls autoplay playsinline src="${x.url||('videos/'+x.id+'.mp4')}" poster="videos/${x.id}.jpg"></video><div class="nt">${x.url?'Vídeo original sin recomprimir (se reproduce desde GitHub, necesita internet).':'Vídeo original sin recomprimir.'}</div><button class="o" data-a="r:${i}">🧊 Ver la recreación 3D</button><button class="ce" data-a="l">⟵ Volver a la lista</button>`);}
function act(a){if(a=='x'){close27();return;}if(a=='l')return list();const [k,n]=a.split(':');if(k=='o')return play(+n);if(k=='r'){close27();return rec(+n);}}
// ---------- acceso desde el menú principal ----------
{const _sm=showMenu;showMenu=function(s='main'){if(s==='vp27'){_sm.call(this,'main');list();return;}const r=_sm.apply(this,arguments);
 try{const col=menu.querySelector('.col');if(col&&s=='main'&&!col.querySelector('[data-go=vp27]')){const ref=col.querySelector('[data-go=lm11]')||col.querySelector('.mbtn');
  const b=$e(`<div class="mbtn" data-go="vp27"><span class="ic">🎬</span><div>VÍDEOS Y PROMOS DE PASAPALABRA<small>Vídeos originales y sus recreaciones en 3D</small></div></div>`);
  if(ref&&ref.parentNode===col)ref.after(b);else col.appendChild(b);b.onpointerdown=ev=>{ev.preventDefault();try{sfx('ok');}catch(_){}list();};try{NAV.attach(s);}catch(_){}}}catch(e){console.error(e);}return r;};}

// ================= motor de las recreaciones =================
const TEXC={};function ctex(k,w,h,draw){if(TEXC[k])return TEXC[k];const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;return TEXC[k]=t;}
const ABC='ABCDEFGHIJLMNÑOPQRSTUVXYZ'.split('');const RING=['A','B','C','D','E','F','G','H','I','J','L','M','N','Ñ','O','P','Q','R','S','T','U','V','X','Y','Z'];
const rnd=(a,b)=>a+Math.random()*(b-a);const cl=(x)=>Math.max(0,Math.min(1,x));const sm=x=>{x=cl(x);return x*x*(3-2*x);};
function lettersBg(g,w,h,base,n){const gr=g.createRadialGradient(w*.5,h*.45,h*.1,w*.5,h*.5,w*.7);gr.addColorStop(0,'#6ab4ff');gr.addColorStop(.5,base);gr.addColorStop(1,'#0a3cb0');g.fillStyle=gr;g.fillRect(0,0,w,h);
 for(let i=0;i<n;i++){g.globalAlpha=rnd(.12,.45);g.fillStyle=i%5?'#bfe0ff':'#ffffff';g.font=`900 ${rnd(20,120)}px N,Arial`;g.save();g.translate(rnd(0,w),rnd(0,h));g.rotate(rnd(-.5,.5));g.fillText(ABC[i%ABC.length],0,0);g.restore();}g.globalAlpha=1;}
// presentador = clon del avatar del juego (con brazos y cabeza localizables)
function hostClone(){const src=P.host;const c=src.clone(true);const a=[],b=[];src.traverse(o=>a.push(o));c.traverse(o=>b.push(o));const map=o=>b[a.indexOf(o)];
 c.head=src.head?map(src.head):null;c.arms=src.arms?src.arms.map(map):[];c.visible=true;c.position.set(0,0,0);c.rotation.set(0,0,0);return c;}
function animHost(h,t,talk,gest){if(h.head){h.head.rotation.x=talk?Math.sin(t*7)*.04:0;h.head.rotation.y=Math.sin(t*.7)*.12;}
 if(h.arms&&h.arms[0]){const g=gest||0;h.arms[0].rotation.z=.12+g*(.5+Math.sin(t*2.3)*.35);h.arms[1].rotation.z=-.12-g*(.5+Math.sin(t*2.1+1)*.35);h.arms[0].rotation.x=-g*.6;h.arms[1].rotation.x=-g*.6;}
 h.rotation.y=Math.sin(t*.5)*.08;}
// esfera de letras 3D (blancas/naranjas) con el logo
function letterSphere(C,n){const g=new T.Group();const cols=[[0xffffff,0xb8c8dc],[0xff7a1a,0xb04a08],[0xffffff,0xb8c8dc],[0x7cc0ff,0x2a6ad0]];
 for(let i=0;i<n;i++){const y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),th=i*2.39996;const k=cols[i%4];const l=C.glyph(ABC[(i*7)%ABC.length],k[0],k[1],rnd(.32,.55),1);if(!l)continue;
  l.position.set(Math.cos(th)*r*1.55,y*1.55,Math.sin(th)*r*1.55);l.lookAt(l.position.clone().multiplyScalar(2));l.rotateZ(rnd(-1,1));g.add(l);}return g;}
function floaters(C,n,R,col){const a=[];for(let i=0;i<n;i++){const l=C.glyph(ABC[i%ABC.length],col||0xcfe6ff,0x6a9ae0,rnd(.3,.9),0);if(!l)continue;l.position.set(rnd(-R,R),rnd(-R*.6,R*.6),rnd(-R,-2));l.userData.v=V3(rnd(-.2,.2),rnd(-.1,.15),0);l.userData.w=rnd(-.5,.5);a.push(l);}return a;}
// plató 2018 (Telecinco): suelo negro brillante con discos blancos de letras, tarima redonda con mesa-anillo, pantallas LED curvas, pilares con neones, grada a la derecha
function studio2018(){const s=new T.Group();
 const floor=new T.Mesh(new T.CircleGeometry(34,48),new T.MeshPhongMaterial({color:0x04060f,specular:0x4a5a80,shininess:110}));floor.rotation.x=-Math.PI/2;s.add(floor);
 const disc=ch=>ctex('d'+ch,128,128,(g,w,h)=>{const gr=g.createRadialGradient(64,64,10,64,64,64);gr.addColorStop(0,'#ffffff');gr.addColorStop(.75,'#e8f0ff');gr.addColorStop(1,'rgba(160,200,255,0)');g.fillStyle=gr;g.fillRect(0,0,w,h);g.fillStyle='#1a2a50';g.font='900 64px N,Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(ch,64,68);});
 const dg=new T.CircleGeometry(1.2,28);'MGYDQAPSRÑKVLOT'.split('').forEach((ch,i)=>{const a=-Math.PI*.95+i/14*Math.PI*1.25;const m=new T.Mesh(dg,new T.MeshBasicMaterial({map:disc(ch),transparent:true}));m.rotation.x=-Math.PI/2;m.rotation.z=rnd(-.6,.6);m.position.set(Math.cos(a)*9.5,.02,Math.sin(a)*-9.5+3);s.add(m);});
 const plat=new T.Mesh(new T.CylinderGeometry(3.6,3.8,.35,48),new T.MeshPhongMaterial({color:0x9aa8c0,specular:0xffffff,shininess:60}));plat.position.y=.17;s.add(plat);
 const rim=new T.Mesh(new T.TorusGeometry(3.7,.05,6,64),new T.MeshBasicMaterial({color:0x8ad0ff}));rim.rotation.x=Math.PI/2;rim.position.y=.36;s.add(rim);
 const desk=new T.Mesh(new T.TorusGeometry(1.7,.28,10,48),new T.MeshPhongMaterial({color:0xc8d0dc,specular:0xffffff,shininess:90}));desk.rotation.x=Math.PI/2;desk.position.y=1.15;desk.scale.z=1.6;s.add(desk);
 [[0xff2a2a,0],[0x2aff5a,2.1],[0x2a7aff,4.2]].forEach(([c,a0])=>{const seg=new T.Mesh(new T.TorusGeometry(1.98,.06,4,24,1.4),new T.MeshBasicMaterial({color:c}));seg.rotation.x=Math.PI/2;seg.rotation.z=a0;seg.position.y=1.0;s.add(seg);});
 const chairM=new T.MeshLambertMaterial({color:0x101014});[-1,1].forEach(k=>{const c=new T.Group();const seat=new T.Mesh(new T.BoxGeometry(.55,.12,.55),chairM);seat.position.y=.85;const back=new T.Mesh(new T.BoxGeometry(.55,.7,.1),chairM);back.position.set(0,1.2,-.27);c.add(seat,back);c.position.set(k*.75,.35,-.4);s.add(c);});
 const flip=t=>t;const mir=d=>(g,w,h)=>{g.translate(w,0);g.scale(-1,1);d(g,w,h);};const led=(k,draw)=>new T.MeshBasicMaterial({map:ctex(k,1024,256,mir(draw)),side:T.BackSide});
 const ledA=led('ledA',(g,w,h)=>{lettersBg(g,w,h,'#2a7af0',90);g.fillStyle='#fff';g.font='400 90px K,N,Arial';g.textAlign='center';g.textBaseline='middle';for(let i=0;i<3;i++)g.fillText('Pasapalabra',w*(i+.5)/3,h*.5);});
 const ledB=led('ledB',(g,w,h)=>{lettersBg(g,w,h,'#2a7af0',60);for(let i=0;i<6;i++){const x=40+i*165,y=60+(i%2)*90;const gr=g.createLinearGradient(0,y,0,y+64);gr.addColorStop(0,'#ffe27a');gr.addColorStop(1,'#c88a10');g.fillStyle=gr;g.fillRect(x,y,150,64);g.fillStyle='#3a2200';g.font='900 32px N,Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('990.000 €',x+75,y+34);}});
 const wall=new T.Mesh(new T.CylinderGeometry(18,18,8,64,1,true,Math.PI*.55,Math.PI*1.3),ledA);wall.position.y=4;s.add(wall);s.wall=wall;s.ledA=ledA;s.ledB=ledB;
 const top=new T.Mesh(new T.CylinderGeometry(17.6,17.6,1.1,64,1,true,Math.PI*.55,Math.PI*1.3),new T.MeshBasicMaterial({map:flip(ctex('top',1024,64,mir((g,w,h)=>{g.fillStyle='#0a1430';g.fillRect(0,0,w,h);g.fillStyle='#ffd23a';g.fillRect(0,h-6,w,6);g.fillStyle='#fff';g.font='400 40px K,N,Arial';g.textBaseline='middle';for(let i=0;i<5;i++)g.fillText('Pasapalabra',20+i*205,h/2);}))),side:T.BackSide}));top.position.y=8.6;s.add(top);
 const neon=new T.MeshBasicMaterial({color:0xfff27a}),neonW=new T.MeshBasicMaterial({color:0xffffff}),pil=new T.MeshPhongMaterial({color:0x202838});
 for(let i=0;i<8;i++){const a=Math.PI*.6+i/7*Math.PI*1.2;const p=new T.Group();const b=new T.Mesh(new T.BoxGeometry(.7,9,.7),pil);b.position.y=4.5;p.add(b);for(let j=0;j<3;j++){const n=new T.Mesh(new T.BoxGeometry(.08,2.6,.75),j%2?neonW:neon);n.position.set(.36,2+j*2.4,0);n.rotation.z=.45;p.add(n);}
  p.position.set(Math.cos(a)*16.5,0,Math.sin(a)*16.5);p.lookAt(0,0,0);s.add(p);}
 // grada (derecha), iluminación morada (o verde en la promo)
 const aud=new T.Group();const stepM=new T.MeshLambertMaterial({color:0x7a2aa8,emissive:0x5a0a8a,emissiveIntensity:.6});s.stepM=stepM;
 for(let r=0;r<4;r++){const st=new T.Mesh(new T.BoxGeometry(3.2,.5+r*.5,9),stepM);st.position.set(11+r*1.6,(.5+r*.5)/2,2);aud.add(st);}
 const hg=new T.SphereGeometry(.17,8,6),cols=[0xf0c8a0,0xc89a70,0xe0b090],shirts=[0xd02a2a,0x2a6af0,0xf0f0f0,0x2ad04a,0xf0c02a,0x1a1a20];
 const hm=new T.InstancedMesh(hg,new T.MeshLambertMaterial({color:0xffffff}),72),bm=new T.InstancedMesh(new T.BoxGeometry(.36,.45,.25),new T.MeshLambertMaterial({color:0xffffff}),72);const M=new T.Matrix4();let k=0;
 for(let r=0;r<4;r++)for(let i=0;i<18;i++){const x=11+r*1.6,y=.5+r*.5,z=-2.2+i*.5;M.makeTranslation(x,y+.85,z);hm.setMatrixAt(k,M);hm.setColorAt(k,new T.Color(cols[k%3]));M.makeTranslation(x,y+.45,z);bm.setMatrixAt(k,M);bm.setColorAt(k,new T.Color(shirts[(k*7)%6]));k++;}
 aud.add(hm,bm);aud.hm=hm;aud.bm=bm;s.add(aud);s.aud=aud;
 const pl=new T.PointLight(0xc060ff,1.4,22);pl.position.set(12,6,2);s.add(pl);s.audL=pl;const pl2=new T.PointLight(0x8ac0ff,1.2,30);pl2.position.set(0,9,4);s.add(pl2);
 return s;}
// fondo LED del presentador: «Pasapalabra» blanco enorme sobre azul con letras
function presBg(k,big){return new T.MeshBasicMaterial({map:ctex(k,1024,576,(g,w,h)=>{lettersBg(g,w,h,'#2f86f5',140);g.globalAlpha=.35;g.strokeStyle='#cfe6ff';g.lineWidth=3;for(let i=0;i<40;i++){const a=i/40*Math.PI*2;g.save();g.translate(w*.5+Math.cos(a)*260,h*.62+Math.sin(a)*260);g.rotate(a+Math.PI/2);g.font='900 34px N,Arial';g.fillStyle='#e8f4ff';g.fillText(ABC[i%25],0,0);g.restore();}g.globalAlpha=1;
 if(big){g.fillStyle='#fff';g.shadowColor='rgba(0,30,120,.5)';g.shadowBlur=18;g.font='400 230px K,N,Arial';g.textAlign='center';g.textBaseline='middle';g.fillText('Pasapalabra',w*.5,h*.16);g.shadowBlur=0;}})});}
function circTile(ch,c){return ctex('ct'+ch+c,128,128,(g,w,h)=>{const gr=g.createRadialGradient(54,48,6,64,64,64);gr.addColorStop(0,c=='g'?'#7af07a':c=='c'?'#7af0ff':'#4a90ff');gr.addColorStop(1,c=='g'?'#1a9a1a':c=='c'?'#10a8c8':'#0b3bb8');
 g.fillStyle='#e8f2ff';g.beginPath();g.arc(64,64,63,0,7);g.fill();g.fillStyle=gr;g.beginPath();g.arc(64,64,56,0,7);g.fill();g.fillStyle='#fff';g.font='900 66px N,Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(ch,64,68);});}
// ---------- capa 2D (rótulos, cortinillas) ----------
function layer(){let L=document.getElementById('rc27');if(L)L.remove();L=document.createElement('div');L.id='rc27';L.innerHTML='<div class="tag">RECREACIÓN 3D · audio original</div>';document.body.appendChild(L);return L;}
function el(L,cls,html){const d=document.createElement('div');d.className=cls;d.innerHTML=html||'';d.style.display='none';L.appendChild(d);return d;}
const show=(d,on)=>{const v=on?'':'none';if(d.style.display!==v)d.style.display=v;};
// grafismos de las pruebas 2018 (como en la promo): sopa verde/naranja, ¿Dónde Están? 3×3 naranja, Una de Cuatro con óvalos naranjas
function drawGraf(g,w,h){lettersBg(g,w,h,'#3a9af5',120);const O='#f07a2a';
 const rr=(x,y,ww,hh,r,f,s,lw)=>{g.beginPath();g.roundRect(x,y,ww,hh,r);if(f){g.fillStyle=f;g.fill();}if(s){g.strokeStyle=s;g.lineWidth=lw||3;g.stroke();}};
 const txt=(s,x,y,sz,c,wt)=>{g.fillStyle=c;g.font=`${wt||900} ${sz}px N,Arial`;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y);};
 const circ=(x,y,r,n)=>{g.fillStyle='#fff';g.beginPath();g.arc(x,y,r+4,0,7);g.fill();const gr=g.createRadialGradient(x,y-r*.3,2,x,y,r);gr.addColorStop(0,'#ffb07a');gr.addColorStop(1,'#f05a28');g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,7);g.fill();txt(n,x,y+2,r*.95,'#fff');};
 // sopa
 const S=['PTTIA','ARHYP','DLIDV','RWAME','EVNRO'];rr(w*.16,h*.02,w*.2,h*.36,10,O);for(let r=0;r<5;r++)for(let c=0;c<5;c++){const x=w*.168+c*w*.038,y=h*.03+r*h*.068,on=c==0||(r==0&&c==4);rr(x,y,w*.035,h*.062,4,on?'#2aa83a':'#fff');txt(S[r][c],x+w*.0175,y+h*.033,h*.045,on?'#fff':O);}
 rr(w*.06,h*.4,w*.38,h*.06,h*.03,O);txt('MIEMBROS DE LA FAMILIA',w*.25,h*.43,h*.024,'#fff',800);rr(w*.405,h*.395,w*.04,h*.07,6,'#fff');txt('4',w*.425,h*.43,h*.045,O);circ(w*.085,h*.43,h*.04,'70');
 // ¿Dónde Están?
 for(let i=0;i<9;i++){const x=w*.62+(i%3)*w*.103,y=h*.07+Math.floor(i/3)*h*.09;rr(x,y,w*.085,h*.065,h*.032,O,'#ffd0a0',2);txt(i==1?'CHABELI':String(i+1),x+w*.0425,y+h*.034,i==1?h*.025:h*.05,'#fff');}circ(w*.76,h*.41,h*.045,'52');
 // Una de Cuatro
 [['CEREZA',.35,.63],['UVA',.53,.63],['MELOCOTÓN',.35,.79],['KIWI',.53,.79]].forEach(([s,x,y])=>{rr(w*x-w*.0,h*y-h*.06,w*.15,h*.11,h*.055,null,'#bfe8ff',4);rr(w*x+w*.007,h*y-h*.047,w*.136,h*.084,h*.042,O);txt(s,w*x+w*.075,h*y,h*.03,'#fff');});
 rr(w*.3,h*.91,w*.39,h*.055,h*.027,O);txt('SI PIDES ESTA FRUTA EN NUEVA ZELANDA, TE',w*.5,h*.927,h*.017,'#fff',800);txt('PODRÍAN TRAER UN AVE MARRÓN',w*.5,h*.951,h*.017,'#fff',800);circ(w*.32,h*.935,h*.035,'46');
 g.fillStyle='#f07a1a';g.fillRect(0,h*.515,w,5);g.fillRect(w*.505,0,5,h*.515);g.fillRect(w*.23,h*.515,5,h);g.fillRect(w*.77,h*.515,5,h);}
// ---------- reloj de la recreación: audio del vídeo original ----------
function clockFor(src,t0){const v=document.createElement('video');v.src=src;v.preload='auto';v.playsInline=true;v.style.display='none';document.body.appendChild(v);
 let t=t0||0,ok=false,last=performance.now();const c={v,get t(){if(ok&&!v.paused)return v.currentTime;const n=performance.now();t+=(n-last)/1000;last=n;return t;},
  start(){try{v.volume=Math.min(1,(OPT.mus??.8)+.2);}catch(_){}if(t0)v.currentTime=t0;const p=v.play();if(p)p.then(()=>{ok=true;}).catch(()=>{ok=false;last=performance.now();});},
  seek(x){t=x;last=performance.now();ok=false;try{v.currentTime=x;}catch(_){}},stop(){try{v.pause();v.removeAttribute('src');v.load();}catch(_){}v.remove();}};return c;}
async function runRec(rid,src,D,build,t0){const C=CAB22,R=C.room(),g=R.g;const L=layer();const st=build(C,g,L);const ck=clockFor(src,t0);ck.start();
 const sh={p:V3(0,60,10),l:V3(0,60,0),f:40,dr:0};cut(sh);const sv=P.sphere&&P.sphere.visible;if(P.sphere)P.sphere.visible=false;window.REC27={seek:x=>ck.seek(x),ck};
 try{await new Promise(res=>anim(dt=>{if(rid!==RUN){res();return false;}const t=ck.t;if(t>=D||ck.v.ended){res();return false;}st.frame(t,dt,sh,R.g.position.y);return true;}));}
 finally{ck.stop();L.remove();if(P.sphere)P.sphere.visible=sv;R.free();try{cam.up.set(0,1,0);}catch(_){}window.REC27=null;}chk(rid);}

// ====== Recreación 1: arranque del primer programa (sept. 2018), 58,7 s ======
function buildEstreno(C,g,L){S.background=C.bgGrad('#2f7cf0','#0838a8');
 const A=new T.Group();A.position.set(300,0,0);g.add(A);const sph=letterSphere(C,130);A.add(sph);const logo=C.word('Pasapalabra',0xffffff,0xbcd0ea,.62,2);logo.position.z=2.3;A.add(logo);const fA=floaters(C,26,9);fA.forEach(l=>A.add(l));
 const B=studio2018();g.add(B);const host=hostClone();B.add(host);
 const Cg=new T.Group();Cg.position.set(-300,0,0);g.add(Cg);const bg=new T.Mesh(new T.PlaneGeometry(10,5.6),presBg('pb1',true));bg.position.set(0,1.7,-3);Cg.add(bg);
 const host2=hostClone();Cg.add(host2);
 const lt=el(L,'lt','<small>Bote acumulado</small><b>990.000 €</b>'),fl=el(L,'fl'),gl=el(L,'gl'),glLogo=el(L,'big','Pasapalabra');glLogo.style.cssText+='top:38%;font:400 9vw K,N,Arial';
 let cur='';const set=(w)=>{if(w==cur)return;cur=w;A.visible=w=='A';B.visible=w=='B';Cg.visible=w=='C';};
 return {frame(t,dt,sh,Y){const H=(x,y,z)=>V3(x,Y+y,z);
  sph.rotation.y+=dt*.6;sph.rotation.x=.25;fA.forEach(l=>{l.position.addScaledVector(l.userData.v,dt);l.rotation.z+=l.userData.w*dt;});
  if(t<1.6){set('A');const u=t/1.6;sh.p.copy(H(300,0,9-u*1.5));sh.l.copy(H(300,0,0));sh.f=40;}
  else if(t<4){set('B');const u=sm((t-1.6)/2.4);sh.p.copy(H(10-u*7,11-u*4,16-u*2));sh.l.copy(H(-2-u*3,0,0));sh.f=50;host.position.set(-9+u*5,.0,2);host.rotation.y=Math.PI/2;animHost(host,t,0,0);}
  else if(t<25.1||(t>=30.6&&t<55.2)){set('C');const t0=t<25.1?4:30.6,t1=t<25.1?25.1:55.2,u=(t-t0)/(t1-t0);sh.p.copy(H(-300,1.5,3.3-u*.7));sh.l.copy(H(-300,1.4,0));sh.f=34;
   animHost(host2,t,1,t<6||(t>40&&t<42)||(t>47&&t<49.5)?1:.15+.15*Math.sin(t*.9));}
  else if(t<30.6){set('B');const u=sm((t-25.1)/5.5);B.wall.material=t>25.5?B.ledB:B.ledA;sh.p.copy(H(-8+u*9,10-u*4,14-u*2));sh.l.copy(H(1+u*2,0,-1));sh.f=48;host.position.set(-.3,.35,.9);host.rotation.y=0;animHost(host,t,0,1);}
  else{set('B');B.wall.material=B.ledA;const u=sm((t-55.2)/3.5);sh.p.copy(H(-6+u*5,.6,9));sh.l.copy(H(-3+u*5,1.2,2));sh.f=46;host.position.set(-5+u*4.4,0,3.2-u*2);host.rotation.y=Math.PI/2*(1-u);animHost(host,t*3,0,1);}
  show(lt,t>=23&&t<30.3);
  const fr=t>=1.35&&t<1.95;show(fl,fr);if(fr){const u=(t-1.35)/.6;fl.style.setProperty('--r',(u<.5?(1-u*2)*60:(u-.5)*2*80)+'%');}
  const gg=t>=30.1&&t<30.7;show(gl,gg);show(glLogo,gg);if(gg){gl.style.transform=`translateY(${(Math.random()-.5)*40}px)`;glLogo.style.transform=`translateX(${(Math.random()-.5)*30}px)`;}}};}

// ====== Recreación 2: promo «Nueva temporada» (2018), 25,2 s ======
function buildPromo(C,g,L){S.background=C.bgGrad('#2f7cf0','#0838a8');
 // 0–2,1 s · 6 invitados en pantalla partida 3×2 (chapas naranjas/azules)
 const Gs=new T.Group();Gs.position.set(0,0,-300);g.add(Gs);const back=ctex('gb',256,256,(g2,w,h)=>{lettersBg(g2,w,h,'#2a6ad0',20);});
 const guests=[];[[0xf0f0f0,0x6a6a6a,0xf07000],[0xa06a50,0x2a1c12,0x2a6af0],[0x30303a,0x2a1c12,0xf07000],[0x9aa0aa,0x2a1c12,0x2a6af0],[0xf0f0f0,0x2a1c12,0x2a6af0],[0x15151a,0x2a1c12,0xf07000]].forEach(([sh2,hr,bd],i)=>{
  const p=person({shirt:sh2,hair:hr,badge:bd,long:i==1||i==4});const cx=(i%3-1)*1.25,row=Math.floor(i/3);p.position.set(cx,row?-1.05:0,row?.6:0);p.rotation.y=(i%3-1)*-.15;Gs.add(p);guests.push(p);
  const bp=new T.Mesh(new T.PlaneGeometry(1.25,1.05),new T.MeshBasicMaterial({map:back}));bp.position.set(cx,(row?-1.05:0)+1.5,row?.3:-.3);Gs.add(bp);});
 const grid=el(L,'grid','<i style="left:33.2%;top:0;bottom:0;width:4px"></i><i style="left:66.5%;top:0;bottom:0;width:4px"></i><i style="top:49.6%;left:0;right:0;height:4px"></i>');
 // presentador con el aro de 26 letras
 const Pr=new T.Group();Pr.position.set(-300,0,0);g.add(Pr);const pbg=new T.Mesh(new T.PlaneGeometry(14,8),presBg('pb2',false));pbg.position.set(0,1.6,-3);Pr.add(pbg);const host=hostClone();Pr.add(host);
 const ring=[];const cg=new T.CircleGeometry(.11,24);RING.forEach((ch,i)=>{const m=new T.Mesh(cg,new T.MeshBasicMaterial({map:circTile(ch,'b'),transparent:true}));const a=Math.PI/2-i/25*Math.PI*2;m.position.set(Math.cos(a)*.78,1.22+Math.sin(a)*.78,.4);m.ch=ch;Pr.add(m);ring.push(m);});
 const pT=ring[RING.indexOf('P')],pMat=[circTile('P','c'),circTile('P','g')];const fP=floaters(C,22,6);fP.forEach(l=>Pr.add(l));
 // plató (grada verde)
 const B=studio2018();g.add(B);B.stepM.color.setHex(0x2aa83a);B.stepM.emissive.setHex(0x0a6a1a);B.audL.color.setHex(0x60ff80);const host2=hostClone();host2.position.set(-6,0,4);B.add(host2);
 // grafismos de las pruebas (pantalla partida)
 const gc=document.createElement('canvas');gc.width=1280;gc.height=720;drawGraf(gc.getContext('2d'),1280,720);gc.style.display='none';L.appendChild(gc);
 // «MÁS DE 20 mill. €» y cierre con la esfera
 const mas=new T.Group();mas.position.set(300,0,0);g.add(mas);const fM=floaters(C,40,8);fM.forEach(l=>mas.add(l));
 const w1=el(L,'big','MÁS DE');w1.style.cssText+='top:26%;font-size:7vw';const w2=el(L,'big','20 mill. €');w2.style.cssText+='top:44%;font-size:10vw';
 const E=new T.Group();E.position.set(600,0,0);g.add(E);const sph=letterSphere(C,130);E.add(sph);const logo=C.word('Pasapalabra',0xffffff,0xbcd0ea,.62,2);logo.position.z=2.3;E.add(logo);const fE=floaters(C,20,9);fE.forEach(l=>E.add(l));
 const nt=el(L,'big','NUEVA TEMPORADA');nt.style.cssText+='top:6%;font-size:3.6vw';const pill=el(L,'pill','lunes 20:05 <img src="videos/v27_showtime.png">');
 let cur='';const set=w=>{if(w==cur)return;cur=w;Gs.visible=w=='G';Pr.visible=w=='P';B.visible=w=='B';mas.visible=w=='M';E.visible=w=='E';show(grid,w=='G');gc.style.display=w=='F'?'':'none';};
 return {frame(t,dt,sh,Y){const H=(x,y,z)=>V3(x,Y+y,z);[fP,fM,fE].forEach(a=>a.forEach(l=>{l.position.addScaledVector(l.userData.v,dt);l.rotation.z+=l.userData.w*dt;}));sph.rotation.y+=dt*.6;sph.rotation.x=.25;
  if(t<2.12){set('G');sh.p.copy(H(0,.975,-300+32));sh.l.copy(H(0,.975,-300));sh.f=3.76;guests.forEach((p,i)=>{if(p.head)p.head.rotation.x=Math.sin(t*9+i)*.08;p.rotation.z=Math.sin(t*6+i)*.03;});}
  else if(t<3.49||(t>=5.49&&t<7.41)||(t>=9.74&&t<12.26)||(t>=14.78&&t<22.4)){set('P');sh.p.copy(H(-300,1.2,3.3));sh.l.copy(H(-300,1.2,0));sh.f=36;
   const gr=(t>11&&t<12.26)||(t>19.3&&t<22.4)||(t>5.6&&t<6.2);pT.material.map=pMat[gr?1:0];animHost(host,t,1,(t>15&&t<17.5)?1:(t>10&&t<11)?.8:0);}
  else if(t<5.49){set('B');const u=sm((t-3.49)/2);sh.p.copy(H(6-u*6,11-u*3,15));sh.l.copy(H(-1-u*2,0,0));sh.f=50;animHost(host2,t,0,0);}
  else if(t<9.74){set('F');}
  else if(t<14.78){set('M');sh.p.copy(H(300,0,8));sh.l.copy(H(300,0,0));sh.f=40;const tt=t-12.26;show(w1,true);w1.textContent=tt<.5?'MÁS':'MÁS DE';show(w2,tt>=1);w2.textContent=tt<1.4?'20':tt<1.8?'20 mill':'20 mill. €';const b=1+.12*Math.exp(-((tt-1)%.4)*8);w2.style.transform=`scale(${b})`;}
  else{set('E');sh.p.copy(H(600,0,9-(t-22.4)*.4));sh.l.copy(H(600,0,0));sh.f=40;}
  if(cur!='M'){show(w1,false);show(w2,false);}show(nt,cur=='E');show(pill,cur=='E');}};}

// ====== v0.28 · Recreaciones 3D automáticas de los 17 vídeos de pruebas (planos según los cortes del original) ======
const REL28='https://github.com/ikeriano/pasapalabra-3d-grok-bot/releases/download/v0.28/';
function graf28(g,W,H,k,team,v,t){const tc=team=='or'?['#ffa31a','#e05a00','#ffd23a']:['#3b8cff','#0b3fbf','#9fd4ff'];const gr=(x,y,w,h,r)=>{const q=g.createLinearGradient(0,y,0,y+h);q.addColorStop(0,tc[0]);q.addColorStop(1,tc[1]);g.fillStyle='#fff';g.beginPath();g.roundRect(x-3,y-3,w+6,h+6,r+3);g.fill();g.fillStyle=q;g.beginPath();g.roundRect(x,y,w,h,r);g.fill();};
 const tx=(s,x,y,f,c)=>{g.fillStyle=c||'#fff';g.font=`900 ${f}px N,Arial`;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y);};
 const circ=(x,y,r)=>{g.fillStyle='#fff';g.beginPath();g.arc(x,y,r+5,0,7);g.fill();g.fillStyle=tc[0];g.beginPath();g.arc(x,y,r,0,7);g.fill();tx(String(v),x,y+2,r*.95);};
 const sw=Math.floor(t*1.3);
 if(k=='escalera'){for(let i=0;i<5;i++){const n=7-i;if(i>sw%6)break;for(let j=0;j<n;j++)gr(120+(j-(n-1)/2)*34,560-i*38,30,30,3);}circ(120,640,34);}
 else if(k=='pista'){gr(380,610,520,48,8);tx('♪ ♫ ♪ ♫',640,634,28);g.fillStyle='#ff8a12';g.fillRect(330,610,44,48);g.fillStyle='#1a78f0';g.fillRect(906,610,44,48);tx(String(v%6),352,634,30);tx('5',928,634,30);}
 else if(k=='cruz'){for(let i=0;i<9;i++){gr(60,60+i*44,120,32,4);gr(1100,60+i*44,120,32,4);}gr(240,610,860,64,32);circ(170,642,36);}
 else if(k=='u4'){for(let i=0;i<4;i++){g.fillStyle=team=='or'?'#ff7a00':'#9fd4ff';g.beginPath();g.roundRect(60+(i%2)*250,120+Math.floor(i/2)*70,230,52,26);g.fill();g.fillStyle=team=='or'?'#ffc21a':'#0b2f86';g.beginPath();g.roundRect(64+(i%2)*250,124+Math.floor(i/2)*70,222,44,22);g.fill();}g.fillStyle='#fff';g.beginPath();g.roundRect(200,610,880,56,28);g.fill();circ(170,638,36);}
 else if(k=='sopa'){const x0=team=='or'?120:820;g.fillStyle=tc[0];g.beginPath();g.roundRect(x0-8,90,340,340,14);g.fill();for(let i=0;i<25;i++){g.fillStyle=(i+sw)%11==0?'#2fbf2f':'#fff';g.beginPath();g.roundRect(x0+(i%5)*66,98+Math.floor(i/5)*66,58,58,6);g.fill();}gr(260,612,700,50,8);g.fillStyle='#fff';g.fillRect(980,606,62,62);tx('5',1011,637,40,tc[1]);circ(220,637,40);}
 else if(k=='donde'){for(let i=0;i<9;i++){g.fillStyle=tc[2];g.fillRect(410+(i%3)*160,150+Math.floor(i/3)*80,150,70);g.fillStyle='#0b1f6a';g.fillRect(416+(i%3)*160,156+Math.floor(i/3)*80,138,58);tx(String(i+1),485+(i%3)*160,186+Math.floor(i/3)*80,34,'#ffe23a');}circ(640,470,40);}
 else if(k=='imposible'){const x0=team=='or'?100:950;g.fillStyle='#fff';g.fillRect(x0,90,230,372);g.fillStyle=tc[0];g.fillRect(x0+8,98,214,356);for(let i=0;i<8-(sw%9);i++){g.fillStyle='rgba(255,255,255,.85)';g.fillRect(x0+40,120+i*42,150,14);}g.fillStyle=tc[0];g.fillRect(x0+60,480,110,110);circ(x0+115,535,38);}
 else if(k=='quees'){g.fillStyle=tc[0];g.fillRect(960,60,200,230);for(let i=0;i<3;i++){g.fillStyle='#fff';g.fillRect(990,100+i*50,140,14);}for(let i=0;i<3;i++)gr(380+i*180,640,160,34,17);tx(String(v),300,600,70,tc[0]);}
 else if(k=='pintas'){g.fillStyle='#bfefff';g.fillRect(180,90,520,400);g.fillStyle='#fff';g.fillRect(200,110,480,300);g.strokeStyle='#333';g.lineWidth=4;g.beginPath();for(let i=0;i<=sw%40;i++){const a=i*.6;g.lineTo(440+Math.cos(a)*(40+i*3),260+Math.sin(a*1.3)*60);}g.stroke();gr(220,420,440,40,6);circ(260,470,30);}
 else if(k=='antes'){for(let i=0;i<10;i++){g.fillStyle=i<(sw%11)?'#37c23a':'#123a9e';g.fillRect(1180,140+i*34,60,26);}gr(300,620,680,46,6);circ(250,642,36);}
 else if(k=='letra'){for(let i=0;i<Math.min(6,1+sw%7);i++)gr(80,520-i*40,150,30,6);circ(120,620,36);}
 else{for(let i=0;i<Math.min(8,1+sw%9);i++)gr(team=='or'?60:1060,80+i*42,160,32,6);gr(260,620,760,48,24);circ(200,644,36);}}
function buildAuto(M){return function(C,g,L){S.background=C.bgGrad('#2f7cf0','#0838a8');
 const A=new T.Group();A.position.set(300,0,0);g.add(A);const sph=letterSphere(C,130);A.add(sph);const logo=C.word('Pasapalabra',0xffffff,0xbcd0ea,.62,2);logo.position.set(0,1.1,2.3);A.add(logo);const hA=hostClone();hA.position.set(0,-1.9,3.2);A.add(hA);const fA=floaters(C,18,9);fA.forEach(l=>A.add(l));
 const B=studio2018();g.add(B);const hB=hostClone();B.add(hB);
 const K=new T.Group();K.position.set(-300,0,0);g.add(K);const kb=new T.Mesh(new T.PlaneGeometry(12,7),presBg('pk28',false));kb.position.set(0,1.4,-3);K.add(kb);
 const ppl={or:[],bl:[]};[['or',0xf07000],['bl',0x2a6af0]].forEach(([tm,bd],j)=>{for(let i=0;i<3;i++){const p=person({shirt:[0xd8d8d8,0xf0c020,0xe05050,0x3a3a3a,0xa0c0f0,0x50a050][(i+j*3)%6],hair:[0x2a1c12,0x6a4a2a,0x101010][i],badge:bd,long:(i+j)%2==1});p.visible=false;K.add(p);ppl[tm].push(p);}});
 const tl=el(L,'big',M.t);tl.style.cssText+='top:40%;font-size:6vw;text-shadow:0 0 18px #ff3030';const red=el(L,'red28','');red.style.cssText='position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,#c01818,#4a0606)';L.insertBefore(red,tl);
 const gc=document.createElement('canvas');gc.width=1280;gc.height=720;gc.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:none';L.appendChild(gc);const gx=gc.getContext('2d');
 const sp=M.s;let cur='',runT=null,runTeam=null,lastV=-1,pi=0,segI=-1;
 const set=w=>{if(w==cur)return;cur=w;A.visible=w=='logo';B.visible=w=='wide'||w=='black';K.visible=w=='or'||w=='bl';show(tl,w=='title');show(red,w=='title');gc.style.display=(w=='or'||w=='bl')?'':'none';};
 return {frame(t,dt,sh,Y){const H=(x,y,z)=>V3(x,Y+y,z);let j=0;while(j+1<sp.length&&sp[j+1][0]<=t)j++;const kind=sp[j][1];set(kind);
  fA.forEach(l=>{l.position.addScaledVector(l.userData.v,dt);l.rotation.z+=l.userData.w*dt;});sph.rotation.y+=dt*.6;sph.rotation.x=.25;
  if(j!==segI){segI=j;pi=(pi+1)%3;if(kind=='or'||kind=='bl'){if(runTeam!==kind){runTeam=kind;runT=t;}['or','bl'].forEach(tm=>ppl[tm].forEach((p,i)=>p.visible=tm==kind&&i==pi));}}
  if(kind=='logo'){sh.p.copy(H(300,0,9));sh.l.copy(H(300,0,0));sh.f=40;animHost(hA,t,1,0);}
  else if(kind=='wide'||kind=='black'){const u=(t*.05)%1;sh.p.copy(H(6-u*4,8,14));sh.l.copy(H(-1,0,0));sh.f=50;animHost(hB,t,1,0);}
  else if(kind=='or'||kind=='bl'){sh.p.copy(H(-300+(kind=='or'?-.4:.4),1.55,3.2));sh.l.copy(H(-300,1.35,0));sh.f=34;const p=ppl[kind][pi];if(p.head)p.head.rotation.y=Math.sin(t*.8)*.15;
   const v=Math.max(0,Math.ceil(90-(t-runT)));if(v!==lastV||((t*1.3)|0)!==gc._s){lastV=v;gc._s=(t*1.3)|0;gx.clearRect(0,0,1280,720);graf28(gx,1280,720,M.k,kind,v,t-runT);}}
 }};};}
const RECS={estreno:['videos/v27_estreno2018.mp4',58.7,buildEstreno],promo:['videos/v27_promo2018.mp4',25.17,buildPromo]};
function rec(i,t0){if(VIDS[i].rec=='alaz')return scene9(async rid=>{try{if(typeof sw12=='function')sw12(2026);}catch(_){}GAME.sec=[Math.round(rnd(20,50)),Math.round(rnd(10,40))];GAME.ac=[0,0];try{await alaZ(rid);}finally{try{if(typeof unsw12=='function')unsw12();}catch(_){}}},{back:'vp27',banner:'🔤 A LA Z · RECREACIÓN 3D'});const x=VIDS[i],r=x.m?[x.url,x.m.D,buildAuto(x.m)]:RECS[x.rec];return scene9(rid=>runRec(rid,r[0],r[1],r[2],t0),{back:'vp27'});}
window.VP27={list,play,rec,drawGraf};
})();
