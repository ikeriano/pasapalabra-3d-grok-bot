// Estudio de TV 3D + Making of / Entresijos / Entrenamientos / Fuera de cámaras / Tomas falsas · 🆕 INVENTADO
// Módulo reutilizable: config.js (juego), shows.js (platós), escenas.js (guiones). Low-poly para Redmi A2.
import * as T from './three.module.min.js';
const C=window.ESTUDIO_CFG,EQ=window.ESTUDIO_EQUIPO,CATS=window.ESTUDIO_CATS,K=C.colores;
const MAIN=C.principal||window.ESTUDIO_SHOWS[0].id;const SH=window.ESTUDIO_SHOWS.slice().sort((a,b)=>(b.id===MAIN)-(a.id===MAIN));SH.forEach(s=>s.detalle=s.id===MAIN);
if(C.presentador)EQ.adrian=[C.presentador,'presentador'];const ESC=window.ESTUDIO_ESCENAS(SH);
const Q=new URLSearchParams(location.search),$=id=>document.getElementById(id);
const OPC={voz:localStorage.getItem('estudio_voz')==='1',grab:localStorage.getItem('estudio_vozgrab')!=='0'}; // 🆕 opción nueva: APAGADA por defecto
const cv=$('c'),R=new T.WebGLRenderer({canvas:cv,antialias:false,powerPreference:'default'});
R.setPixelRatio(Math.min(devicePixelRatio||1,1));R.outputColorSpace=T.SRGBColorSpace;
const S=new T.Scene();S.background=new T.Color(0x8fb8e8);S.fog=new T.Fog(0x8fb8e8,60,260);
const cam=new T.PerspectiveCamera(70,1,0.1,400);
S.add(new T.HemisphereLight(0xffffff,0x444466,1.6));const dl=new T.DirectionalLight(0xffffff,1.4);dl.position.set(40,80,-60);S.add(dl);
function size(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();}addEventListener('resize',size);size();
// ---------- materiales y fusión de geometría (pocas llamadas de dibujo) ----------
const MC={};function mat(c,e){const k=c+'_'+(e||0);return MC[k]||(MC[k]=new T.MeshLambertMaterial({color:c,emissive:e?c:0,emissiveIntensity:e||0}));}
class B{constructor(){this.g={};}add(geo,c,x,y,z,ry,e,rx){const m=new T.Matrix4().compose(new T.Vector3(x,y,z),new T.Quaternion().setFromEuler(new T.Euler(rx||0,ry||0,0)),new T.Vector3(1,1,1));const g=(geo.index?geo.toNonIndexed():geo.clone());g.applyMatrix4(m);const k=c+'_'+(e||0);(this.g[k]=this.g[k]||{c,e,l:[]}).l.push(g);}
 box(w,h,d,c,x,y,z,ry,e){this.add(new T.BoxGeometry(w,h,d),c,x,y,z,ry,e);}
 cyl(r1,r2,h,c,x,y,z,seg,e){this.add(new T.CylinderGeometry(r1,r2,h,seg||10),c,x,y,z,0,e);}
 build(par){for(const k in this.g){const o=this.g[k];let n=0;o.l.forEach(g=>n+=g.attributes.position.count);const P=new Float32Array(n*3),N=new Float32Array(n*3);let i=0;o.l.forEach(g=>{P.set(g.attributes.position.array,i*3);N.set(g.attributes.normal.array,i*3);i+=g.attributes.position.count;g.dispose();});const G=new T.BufferGeometry();G.setAttribute('position',new T.BufferAttribute(P,3));G.setAttribute('normal',new T.BufferAttribute(N,3));par.add(new T.Mesh(G,mat(o.c,o.e)));}this.g={};}}
const COL=[];function solid(x0,z0,x1,z1){COL.push({x0:Math.min(x0,x1),x1:Math.max(x0,x1),z0:Math.min(z0,z1),z1:Math.max(z0,z1)});}
function wall(b,x0,z0,x1,z1,h,c,gaps){h=h||5;c=c||0xd8dbe6;const hor=z0===z1,a0=hor?x0:z0,a1=hor?x1:z1;let segs=[[a0,a1]];(gaps||[]).forEach(([g0,g1])=>{segs=segs.flatMap(([s0,s1])=>g1<=s0||g0>=s1?[[s0,s1]]:[[s0,g0],[g1,s1]].filter(q=>q[1]-q[0]>0.05));});
 segs.forEach(([s0,s1])=>{const m=(s0+s1)/2,L=s1-s0;if(hor){b.box(L,h,0.3,c,m,h/2,z0);solid(s0,z0-0.2,s1,z0+0.2);}else{b.box(0.3,h,L,c,x0,h/2,m);solid(x0-0.2,s0,x0+0.2,s1);}});
 (gaps||[]).forEach(([g0,g1])=>{const m=(g0+g1)/2;if(hor)b.box(g1-g0,h-3,0.3,c,m,3+(h-3)/2,z0);else b.box(0.3,h-3,g1-g0,c,x0,3+(h-3)/2,m);});}
function tex(lines,bg,fg,w,h,img){const c=document.createElement('canvas');c.width=w||512;c.height=h||256;const x=c.getContext('2d');x.fillStyle=bg||'#1a1446';x.fillRect(0,0,c.width,c.height);x.strokeStyle='#ff8a00';x.lineWidth=10;x.strokeRect(5,5,c.width-10,c.height-10);x.fillStyle=fg||'#fff';x.textAlign='center';x.textBaseline='middle';const L=[].concat(lines);L.forEach((t,i)=>{const fs=i?c.height/8:c.height/(L.length>1?4.2:3.2);x.font='900 '+fs+'px system-ui';x.fillStyle=i?'#ffd400':(fg||'#fff');x.fillText(t,c.width/2,c.height*(L.length>1?(i?0.38+i*0.16:0.3):0.5),c.width-30);});const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;}
function plane(par,w,h,map,x,y,z,ry,e){const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map,transparent:true}));m.position.set(x,y,z);m.rotation.y=ry||0;par.add(m);return m;}
const TL=new T.TextureLoader();function img(u){const t=TL.load(u);t.colorSpace=T.SRGBColorSpace;return t;}
function logoTxt(){const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');const g=x.createRadialGradient(256,256,40,256,256,250);g.addColorStop(0,'#2a6cff');g.addColorStop(1,'#061a5a');x.fillStyle=g;x.beginPath();x.arc(256,256,250,0,7);x.fill();x.lineWidth=18;x.strokeStyle='#ffd23a';x.stroke();x.fillStyle='#fff';x.textAlign='center';x.font='900 92px Arial Black,system-ui';const w=C.juego.toUpperCase().split(' ');const L=w.length>2?[w.slice(0,Math.ceil(w.length/2)).join(' '),w.slice(Math.ceil(w.length/2)).join(' ')]:w;L.forEach((t,i)=>{x.fillStyle=i%2?'#ffd23a':'#fff';x.fillText(t,256,256+(i-(L.length-1)/2)*100+30,470);});const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;}
const logoCanal=img(C.logoCanal),logoJuego=C.logoJuego?img(C.logoJuego):logoTxt();
// ---------- salas ----------
const SALAS=[
 {id:'exterior',n:'Exterior del estudio',cx:0,cz:-14},
 {id:'recepcion',n:'Recepción',cx:0,cz:7,x0:-12,x1:12,z0:0,z1:14},
 {id:'cafeteria',n:'Cafetería',cx:-26,cz:7,x0:-40,x1:-12,z0:0,z1:14},
 {id:'espera',n:'Sala de espera de concursantes',cx:26,cz:7,x0:12,x1:40,z0:0,z1:14},
 {id:'maquillaje',n:'Maquillaje',cx:-8,cz:18,x0:-14,x1:-2,z0:14,z1:22,d:-1},
 {id:'peluqueria',n:'Peluquería',cx:-8,cz:26,x0:-14,x1:-2,z0:22,z1:30,d:-1},
 {id:'vestuario',n:'Vestuario',cx:-8,cz:34,x0:-14,x1:-2,z0:30,z1:38,d:-1},
 {id:'camerinos',n:'Camerinos',cx:-8,cz:42,x0:-14,x1:-2,z0:38,z1:46,d:-1},
 {id:'control',n:'Sala de control / realización',cx:8,cz:18,x0:2,x1:14,z0:14,z1:22,d:1},
 {id:'redaccion',n:'Sala de redacción de preguntas',cx:8,cz:26,x0:2,x1:14,z0:22,z1:30,d:1},
 {id:'sonido',n:'Sala de sonido',cx:8,cz:34,x0:2,x1:14,z0:30,z1:38,d:1},
 {id:'almacen',n:'Almacén de decorados',cx:8,cz:42,x0:2,x1:14,z0:38,z1:46,d:1},
 {id:'pasillo',n:'Pasillo de los carteles',cx:0,cz:32,x0:-2,x1:2,z0:14,z1:50},
 {id:'pasillo2',n:'Pasillo de los platós',cx:0,cz:53,x0:-126,x1:126,z0:50,z1:56}];
const NX=[-112,-84,-56,-28,0,28,56,84,112],SX=[-112,-84,-56,-28,28,56,84,112];
SH.forEach((s,i)=>{const nor=i<9,cx=nor?NX[i]:SX[i-9];s.cx=cx;s.cz=nor?70:36;s.nor=nor;SALAS.push({id:'plato_'+s.id,n:'Plató · '+s.n+(s.inv?' 🆕 INVENTADO':''),cx,cz:s.cz,x0:cx-13,x1:cx+13,z0:nor?56:22,z1:nor?84:50,show:s});});
const sala=id=>SALAS.find(s=>s.id===id);
// ---------- edificio estático ----------
const W=new T.Group();S.add(W);const b=new B();
b.box(600,0.1,600,0x5a8a4a,0,-0.05,40);b.box(600,0.12,24,0x2a2c33,0,0,-32);for(let x=-280;x<280;x+=8)b.box(4,0.13,0.4,0xffffff,x,0.01,-32);
b.box(220,0.12,14,0x9aa0aa,0,0.01,-14);
for(let i=0;i<5;i++)b.box(18-i*0.6,0.3*(i+1),1.2,0x8a90a0,0,0.15*(i+1),-6+i*1.2);
// rascacielos detrás
for(let i=0;i<34;i++){const x=-170+i*10+(i*37%7),h=30+(i*53%60),z=130+(i*29%40);b.box(9,h,9,[0x6a7fa8,0x8a9ac0,0x4a5a80,0xb0bccc][i%4],x,h/2,z);b.box(9.2,0.6,9.2,K.led,x,h,z,0,1);}
for(let i=0;i<10;i++){const s=i<5?-1:1,z=10+i%5*16,h=26+(i*41%40);b.box(10,h,10,0x7a8ab0,s*150,h/2,z);}
// carcasa: dos plantas, marino/morado con franjas naranja/amarillo y LED
const H=10;wall(b,-128,0,128,0,H,K.fachada,[[-3,3]]);wall(b,-128,86,128,86,H,K.fachada);wall(b,-128,0,-128,86,H,K.fachada);wall(b,128,0,128,86,H,K.fachada);
b.box(256,0.3,86,K.fachada2,0,H,43);
[[3.2,K.franja],[3.7,0x000000],[6.6,K.franja2],[7.1,0x000000]].forEach(([y,c])=>b.box(256,0.35,0.2,c,0,y,-0.2));b.box(256,0.15,0.2,K.led,0,9.6,-0.2,0,1);b.box(256,0.15,0.2,K.led,0,0.3,-0.2,0,1);
for(let x=-92;x<=92;x+=8)if(Math.abs(x)>10){b.box(5.5,2,0.1,0x0a0a1a,x,8.3,-0.2);b.box(5.5,1.6,0.1,0x0a0a1a,x,5.1,-0.2);}
// torre de entrada central
b.box(5,17,3,0x0d0a26,-5.5,8.5,-1.5);b.box(5,17,3,0x0d0a26,5.5,8.5,-1.5);b.box(6,12.6,3,0x0d0a26,0,10.7,-1.5);solid(-8,-3,-3,0);solid(3,-3,8,0);[-7,-5.6,5.6,7].forEach((x,i)=>b.box(0.6,17,0.2,i%3?K.franja2:K.franja,x,8.5,-3.05,0,0.3));b.box(16.6,0.6,3.6,K.led,0,17.2,-1.5,0,1);
b.box(10,0.4,3,0x1a1446,0,4.2,-4);b.box(10,0.12,0.1,K.franja,0,4.0,-5.5,0,0.5);
for(const x of[-2.7,2.7])b.box(0.6,3.8,0.08,0x88ccff,x,1.9,-2.9);b.box(6,0.3,0.1,K.franja2,0,4.2,-3.0,0,0.6);
plane(W,7,7,logoCanal,0,11.5,-3.12,Math.PI);
const ring=new T.Mesh(new T.RingGeometry(3.6,4.1,32),mat(K.franja,0.6));ring.position.set(0,11.5,-3.11);ring.rotation.y=Math.PI;W.add(ring);
plane(W,9,1.6,tex([C.canal+' · ESTUDIOS'],'#0d0a26','#fff',512,96),0,6.4,-3.12,Math.PI);
// palmeras delante
for(let x=-90;x<=90;x+=7)if(Math.abs(x)>11){b.cyl(0.18,0.25,4.5,0x8a6a3a,x,2.25,-3.2,6);for(let k=0;k<5;k++){const a=k*1.256;b.add(new T.BoxGeometry(2.4,0.08,0.5),0x2f8a3a,x+Math.cos(a)*1.1,4.5,-3.2+Math.sin(a)*1.1,-a,0,0.35);}b.box(1.2,0.6,1.2,0x3a3a40,x,0.3,-3.2);}
// ---------- interior: techos, suelos, pasillos ----------
b.box(80,0.05,14,K.suelo,0,0.02,7);b.box(28,0.05,36,K.suelo,0,0.02,32);b.box(252,0.05,6,0x6a6f80,0,0.02,53);
b.box(80,0.2,14,0xe8e8f0,0,5,7);b.box(28,0.2,42,0xe8e8f0,0,5,35);b.box(252,0.2,6,0xe8e8f0,0,5,53);
for(let x=-34;x<=34;x+=6)for(let z=3;z<=11;z+=4)b.box(3,0.06,0.3,0xffffff,x,4.88,z,0,1);
for(let z=16;z<50;z+=4)b.box(0.3,0.06,2.4,0xffffff,0,4.88,z,0,1);for(let x=-124;x<=124;x+=6)b.box(3,0.06,0.3,0xffffff,x,4.88,53,0,1);
b.box(0.1,0.12,36,K.led,-1.85,0.15,32,0,1);b.box(0.1,0.12,36,K.led,1.85,0.15,32,0,1);b.box(252,0.12,0.1,K.franja,0,0.15,50.2,0,1);b.box(252,0.12,0.1,K.franja,0,0.15,55.8,0,1);
// recepción / lobby
wall(b,-12,0.01,-12,14,5,0xc8ccd8,[[4,9]]);wall(b,12,0.01,12,14,5,0xc8ccd8,[[4,9]]);wall(b,-40,14,40,14,5,0x15122e,[[-2,2],[-26,-24],[24,26]]);
wall(b,-40,0.01,-40,14,5,0xc8ccd8);wall(b,40,0.01,40,14,5,0xc8ccd8);
b.box(10,1.1,1.2,0x1a1446,0,0.55,10);b.box(10.2,0.1,1.4,0xe8e8f0,0,1.15,10);b.box(10,0.08,0.05,K.franja,0,0.9,9.38,0,1);solid(-5,9.4,5,10.6);
for(let x=-3.5;x<=3.5;x+=1.75){b.box(0.7,0.45,0.05,0x111111,x,1.5,10.3);b.box(0.64,0.38,0.02,0x2060c0,x,1.5,10.27,0,0.6);}
plane(W,6,3,logoCanal,0,3,13.8,Math.PI);b.box(7,0.12,0.1,K.led,0,1.35,13.8,0,1);
if(C.logos&&C.logos.length){const LW=new T.Group();W.add(LW);plane(LW,0.02,0.02,null,0,0,0);const bgm=new T.Mesh(new T.PlaneGeometry(9.4,5.0),new T.MeshBasicMaterial({color:0x0c1030}));bgm.position.set(-11.88,2.7,7);bgm.rotation.y=Math.PI/2;LW.add(bgm);
 const tt=tex(['Logos de Iker'],'#0c1030','#ffd23a',512,64);plane(LW,3.2,0.4,tt,-11.86,5.0,7,Math.PI/2);
 C.logos.forEach((u,i)=>{const c=i%8,r=(i/8)|0;const y=4.3-r*0.92,z=7-3.85+c*1.1;const p=new T.Mesh(new T.PlaneGeometry(1.0,0.8),new T.MeshBasicMaterial({color:0x1d2450}));p.position.set(-11.86,y,z);p.rotation.y=Math.PI/2;LW.add(p);const t=img(u);const q=plane(LW,0.9,0.7,t,-11.84,y,z,Math.PI/2);const fit=()=>{const im=t.image;if(!im||!im.width)return setTimeout(fit,300);const a=im.width/im.height;q.scale.set(a>0.9/0.7?1:a*0.7/0.9,a>0.9/0.7?(0.9/a)/0.7:1,1);};fit();});}
C.carteles.slice(0,4).forEach((t,i)=>{const x=[-9,-6.5,6.5,9][i];const m=plane(W,2,2.8,i===0?logoJuego:tex([t,'Showtime TV'],'#2b1f6e','#fff',256,360),x,2.6,13.8,Math.PI);});
// sofás marino, sillón, mesita
[[-8,3,0],[-8,6.5,Math.PI]].forEach(([x,z,r])=>{b.box(3,0.5,1,0x1a2a5a,x,0.25,z,r);b.box(3,0.8,0.3,0x1a2a5a,x,0.6,z+(r?0.4:-0.4),r);});b.box(1.1,0.5,1,0x1a2a5a,-10.5,0.25,4.75);b.box(1.6,0.4,1,0xffffff,-8,0.2,4.75);
// bancos azules y postes de cola
for(let r=0;r<2;r++)for(let k=0;k<4;k++){const x=4+k*1.4,z=3+r*2.5;b.box(1.2,0.08,0.6,0x1e3aff,x,0.55,z);b.box(1.2,0.6,0.08,0x1e3aff,x,0.85,z-0.3);b.box(0.08,0.55,0.08,0x999999,x,0.27,z);}
for(let k=0;k<5;k++){b.cyl(0.05,0.05,1,0x888888,-4+k*2,0.5,8);b.cyl(0.18,0.18,0.05,0x333333,-4+k*2,0.02,8);if(k<4)b.box(2,0.06,0.02,0x1e3aff,-3+k*2,0.9,8);}
plane(W,1.8,2.5,tex([C.juego,'Hoy grabamos'],'#ff8a00','#1a1446',256,360),11.8,2.4,7,-Math.PI/2);plane(W,1.8,2.5,tex(['Making of','🆕 INVENTADO'],'#2b1f6e','#fff',256,360),-11.8,2.4,7,Math.PI/2);
// cafetería
b.box(8,1.1,1,0x6a3a1a,-26,0.55,12);solid(-30,11.5,-22,12.5);b.box(8,0.1,1.1,0xffd400,-26,1.15,12);b.box(0.6,0.8,0.6,0x333333,-24,1.5,12);
for(let k=0;k<6;k++){const x=-36+(k%3)*5,z=3+Math.floor(k/3)*4;b.cyl(0.8,0.8,0.06,0xffffff,x,0.75,z,12);b.cyl(0.06,0.06,0.75,0x555555,x,0.37,z,6);for(const d of[-1.1,1.1])b.box(0.5,0.45,0.5,K.franja,x+d,0.22,z);}
plane(W,4,1.2,tex(['CAFETERÍA'],'#6a3a1a','#ffd400',512,150),-26,3.8,13.8,Math.PI);
// sala de espera
for(let r=0;r<3;r++)for(let k=0;k<5;k++){const x=18+k*1.4+(r%2)*8,z=3+r*3;b.box(1.2,0.08,0.6,0x1e3aff,x,0.55,z);b.box(1.2,0.6,0.08,0x1e3aff,x,0.85,z-0.3);}
b.box(2,1,0.6,0x1a1446,36,0.5,12);b.box(1.4,0.9,0.05,0x111111,30,2.6,13.8);b.box(1.3,0.8,0.02,0x30a0ff,30,2.6,13.77,0,0.7);
plane(W,5,1.2,tex(['SALA DE ESPERA'],'#1e3aff','#fff',512,150),26,3.8,13.8,Math.PI);
// pasillo de carteles + salas de servicio
wall(b,-2,14,-2,50,5,0xd8dbe6,[[16.8,19.2],[24.8,27.2],[32.8,35.2],[40.8,43.2]]);wall(b,2,14,2,50,5,0xd8dbe6,[[16.8,19.2],[24.8,27.2],[32.8,35.2],[40.8,43.2]]);
wall(b,-14,14,-14,50,5);wall(b,14,14,14,50,5);[22,30,38,46].forEach(z=>{wall(b,-14,z,-2,z,5);wall(b,2,z,14,z,5);});
const posters=C.carteles;for(let i=0;i<8;i++){const z=[21,23,29,31,37,39,45,48][i];plane(W,1.5,2.1,i===0?logoJuego:tex([posters[i%posters.length],'🆕 INVENTADO'],['#2b1f6e','#ff8a00','#0b3a8a','#4a0a2a'][i%4],'#fff',256,360),-1.83,2.2,z,Math.PI/2);plane(W,1.5,2.1,tex([posters[(i+3)%posters.length],'Showtime TV'],['#0b3a8a','#2b1f6e','#4a0a2a','#ff8a00'][i%4],'#fff',256,360),1.83,2.2,z,-Math.PI/2);}
SALAS.filter(s=>s.d).forEach(s=>{plane(W,2.3,0.55,tex([s.n.split(' / ')[0]],'#1a1446','#ffd400',512,120),s.d*1.84,3.6,s.cz,s.d>0?-Math.PI/2:Math.PI/2);b.box(11.6,0.05,7.6,[0x8a7a90,0x7a8aa0,0x9a8a70,0x6a7a9a][Math.round(s.cz/8)%4],s.cx,0.04,s.cz);});
// mobiliario de cada sala
const P1=(x,z)=>x; // marcador
// maquillaje: espejos con bombillas, sillas
for(let k=0;k<3;k++){const z=15.5+k*2.4;b.box(0.1,1.2,1.6,0xbfe0ff,-13.8,1.8,z);for(let j=0;j<5;j++)b.box(0.1,0.12,0.12,0xfff2a0,-13.7,2.5,z-0.7+j*0.35,0,1);b.box(0.6,0.8,1.8,0xffffff,-13.4,0.4,z);b.box(0.7,0.5,0.7,0x222222,-11.8,0.6,z);b.cyl(0.05,0.05,0.4,0x888888,-11.8,0.2,z,6);}
// peluquería: lavacabezas, secadores
for(let k=0;k<3;k++){const z=23.5+k*2.4;b.box(0.9,0.9,0.9,0x111111,-13.2,0.45,z);b.cyl(0.35,0.35,0.15,0xffffff,-13.4,1,z,10);b.box(0.7,0.5,0.7,0xd03070,-11.6,0.6,z);b.add(new T.SphereGeometry(0.35,8,6),0xdddddd,-11.6,1.7,z);}
// vestuario: percheros con ropa de colores
for(let k=0;k<3;k++){const z=31.5+k*2.3;b.box(0.05,0.05,1.8,0x888888,-11,1.8,z);b.box(0.05,1.8,0.05,0x888888,-11,0.9,z-0.9);b.box(0.05,1.8,0.05,0x888888,-11,0.9,z+0.9);for(let j=0;j<6;j++)b.box(0.5,1,0.1,[0xff8a00,0xffd400,0x1e3aff,0xd03070,0x2ecc71,0xffffff][(j+k)%6],-11,1.25,z-0.75+j*0.3);}b.box(0.1,2,1.2,0xbfe0ff,-13.8,1.2,36);
// camerinos: tres puertas con estrella, sofá, espejo
for(let k=0;k<3;k++){const z=39.3+k*2.4;b.box(0.15,2.2,1,[0xff8a00,0x1e3aff,0xd03070][k],-13.75,1.1,z);b.box(0.05,0.3,0.3,0xffd400,-13.65,1.9,z,0,1);}b.box(1,0.5,2.4,0x1a2a5a,-4,0.25,44);plane(W,2,0.5,tex(['★ '+C.presentador],'#1a1446','#ffd400',512,120),-13.7,2.8,42,Math.PI/2);
// control: pared de monitores, mesa de mezclas
b.box(0.3,0.9,9,0x222222,12,0.45,18);solid(11.7,14,12.3,22);for(let r=0;r<3;r++)for(let k=0;k<6;k++){b.box(0.05,0.7,1.1,0x111111,13.8,1.4+r*0.85,15.2+k*1.2);b.box(0.02,0.6,1,[0x30a0ff,0xff8a00,0x2ecc71,0xd03070][(r+k)%4],13.76,1.4+r*0.85,15.2+k*1.2,0,0.7);}for(let k=0;k<12;k++)b.box(0.3,0.06,0.3,k%3?0x3aff6a:0xff3030,11.9,0.95,14.3+k*0.65,0,1);for(let k=0;k<3;k++)b.box(0.6,0.5,0.6,0x222222,10.8,0.6,16+k*2);
// redacción: mesas con ordenadores, pizarra
for(let k=0;k<4;k++){const x=5+(k%2)*5,z=24+Math.floor(k/2)*3.5;b.box(2.2,0.08,1,0xf0f0f0,x,0.78,z);b.box(0.05,0.78,0.9,0x777777,x-1,0.39,z);b.box(0.05,0.78,0.9,0x777777,x+1,0.39,z);b.box(0.6,0.4,0.04,0x111111,x,1.1,z+0.3);b.box(0.56,0.34,0.02,0x2060c0,x,1.1,z+0.28,0,0.6);b.box(0.5,0.45,0.5,K.franja,x,0.5,z-0.9);}
plane(W,4,1.8,tex(['¿PREGUNTAS?','Comprobar 2 veces · reservas listas'],'#f5f5f5','#1a1446',512,240),8,2.2,29.8,Math.PI);
// sonido: cabina, mesa con faders, altavoces
b.box(0.3,0.9,6,0x222222,11,0.45,34);solid(10.7,31,11.3,37);for(let k=0;k<16;k++)b.box(0.08,0.1,0.25,0xdddddd,10.9,0.95,31.4+k*0.35);b.box(0.6,1.2,0.6,0x111111,13.5,0.6,30.8);b.box(0.6,1.2,0.6,0x111111,13.5,0.6,37.2);b.box(3,2.4,0.1,0x88ccff,6,1.2,37.7);b.cyl(0.03,0.03,1.6,0x888888,5,0.8,35,6);b.add(new T.SphereGeometry(0.12,8,6),0x222222,5,1.7,35);
// almacén: paneles de decorado, cajas, trampilla de repuesto
for(let k=0;k<5;k++)b.box(0.15,3,2.4,[K.fachada2,K.franja,0x1e3aff,0xd03070,0x2ecc71][k],12.5-k*0.4,1.5,40.5+k*0.3,0.2);for(let k=0;k<6;k++)b.box(1,0.8,1,0x8a6a3a,4+(k%3)*1.2,0.4+Math.floor(k/3)*0.8,44.5);b.cyl(1.2,1.2,0.2,K.franja,6,0.1,40,16,0.3);
// pasillo de platós: muros con puertas
const gN=SH.filter(s=>s.nor).map(s=>[s.cx-2,s.cx+2]),gS=SH.filter(s=>!s.nor).map(s=>[s.cx-2,s.cx+2]);
wall(b,-126,56,126,56,5,0xd8dbe6,gN);wall(b,-126,50,-14,50,5,0xd8dbe6,gS);wall(b,14,50,126,50,5,0xd8dbe6,gS);wall(b,-126,50,-126,56,5);wall(b,126,50,126,56,5);
// carcasas de cada plató (siempre) + cartel en la puerta; el interior se carga al acercarse
SH.forEach(s=>{const z0=s.nor?56:22,z1=s.nor?84:50;wall(b,s.cx-13,z0,s.cx-13,z1,H,0x15122e);wall(b,s.cx+13,z0,s.cx+13,z1,H,0x15122e);if(s.nor)wall(b,s.cx-13,84,s.cx+13,84,H,0x15122e);else wall(b,s.cx-13,22,s.cx+13,22,H,0x15122e);
 const zf=s.nor?55.8:50.2,ry=s.nor?Math.PI:0;plane(W,4.6,1,tex([s.n,s.inv?'🆕 INVENTADO':'PLATÓ'],'#'+s.c[0].toString(16).padStart(6,'0'),'#fff',512,128),s.cx,3.7,zf,ry);
 b.box(0.6,0.25,0.1,0xff1010,s.cx+2.8,3.7,zf,0,0.8);b.box(4.4,0.1,0.1,s.c[1],s.cx,3.05,zf,0,1);
 plane(W,1.6,2.2,tex([s.n.length>14?s.n.split(' ').slice(-2).join(' '):s.n,'Showtime TV'],'#'+s.c[0].toString(16).padStart(6,'0'),'#fff',256,360),s.cx-4.5,2.2,zf,ry);});
b.build(W);
// ---------- platós (carga perezosa) ----------
const PL={};
function grada(b,s,cx,cz,dir){for(const sd of[-1,1])for(let r=0;r<3;r++){const xx=cx+sd*(9.6+r*1.1);b.box(1.1,0.5*(r+1),14,0x2a2a3a,xx,0.25*(r+1),cz+dir*-1);for(let k=0;k<7;k++)b.box(0.6,0.5,0.8,[0x1e3aff,0xff8a00][(r+k)%2],xx,0.5*(r+1)+0.25,cz-dir-6+k*2);}}
function camara(b,x,z,ry){b.cyl(0.05,0.3,1.4,0x333333,x,0.7,z,4);b.box(0.5,0.45,0.9,0x222222,x,1.6,z,ry);b.box(0.3,0.3,0.05,0x111111,x+Math.sin(ry)*0.47,1.6,z+Math.cos(ry)*0.47,ry);}
function buildPlato(s){if(PL[s.id])return;const g=new T.Group(),b=new B(),[c0,c1,c2]=s.c,x=s.cx,z=s.cz,d=s.nor?1:-1;
 b.box(26,0.06,28,0x15122e,x,0.03,z);b.cyl(9,9,0.12,c0,x,0.07,z,28);b.cyl(9.3,9.3,0.08,c1,x,0.05,z,28,0.8);
 b.box(14,6,0.3,0x0a0a0a,x,4.5,z+d*12.5);b.box(14.4,0.2,0.3,c1,x,7.6,z+d*12.5,0,1);
 for(let k=-2;k<=2;k++){b.box(0.2,0.2,24,0x555555,x+k*5,9.5,z);b.cyl(0.25,0.35,0.6,0x222222,x+k*5,9.1,z-6,8);b.cyl(0.25,0.35,0.6,0x222222,x+k*5,9.1,z+6,8);}
 if(!(window.ESTUDIO_REALES&&ESTUDIO_REALES[s.id]))for(let k=0;k<8;k++){const a=k/8*6.283;b.box(0.15,6,0.15,c2,x+Math.cos(a)*11.5,3,z+Math.sin(a)*11.5,0,0.8);}
 grada(b,s,x,z,-d);camara(b,x-5,z-d*4,s.nor?0:Math.PI);camara(b,x+5,z-d*4,s.nor?0:Math.PI);
 const t=s.tipo;if(window.ESTUDIO_REALES&&ESTUDIO_REALES[s.id]&&(s.real!==false)){ESTUDIO_REALES[s.id]({b,T,s,x,z,d,c0,c1,c2,g,plane,tex,mat:typeof mat!=='undefined'?mat:null});}else
 if(t==='trampillas'){const n=s.detalle?5:4;for(let k=0;k<n;k++){const xx=x-6+k*12/(n-1);b.cyl(1.1,1.1,0.1,c1,xx,0.15,z+d*3,20,0.4);b.cyl(1.25,1.25,0.06,c2,xx,0.12,z+d*3,20,0.9);b.box(0.9,1.1,0.6,c0,xx,0.75,z+d*3.8);b.box(0.95,0.08,0.65,c2,xx,1.32,z+d*3.8,0,0.6);}
  b.box(1.2,1.2,0.8,c1,x,0.6,z-d*1,0,0.3);
  if(s.detalle){for(let k=0;k<5;k++)b.box(0.15,0.15,10,c2,x-6+k*3,8.6,z,0,1);b.cyl(0.1,0.1,5,0x333333,x+9,2.5,z-d*2,6);b.box(5,0.25,0.25,0x333333,x+7,5,z-d*2);b.box(0.6,0.5,0.9,0x222222,x+4.5,4.8,z-d*2);
}}
 else if(t==='mesareloj'){b.cyl(4.5,4.8,0.4,c0,x,0.2,z,24);b.cyl(4.9,4.9,0.1,c1,x,0.36,z,24,0.9);b.box(3.2,0.9,1.4,0xf2f2f2,x,0.85,z+d*0.5);b.box(3.3,0.08,1.5,c1,x,1.33,z+d*0.5,0,0.6);
  for(let k=0;k<5;k++){b.cyl(0.12,0.09,0.32,[0xff3030,0xffd23a,0x2ecc71,0x30a0ff,0xff7a1a][k],x-1.2+k*0.6,1.53,z+d*0.5,8);}
  b.add(new T.SphereGeometry(0.35,8,6),0xff3060,x+1.9,2.2,z+d*0.4);b.add(new T.SphereGeometry(0.35,8,6),0x30a0ff,x+2.3,2.5,z+d*0.6);b.box(0.02,1.2,0.02,0xffffff,x+2.1,1.4,z+d*0.5);
  b.cyl(2.2,2.2,0.3,0x061a5a,x,6.2,z+d*11.9,24);b.cyl(2.45,2.45,0.25,0xe8262d,x,6.2,z+d*11.95,24,0.8);
  for(let k=0;k<10;k++){b.box(2.6,0.42,0.12,k===9?0xffd23a:k%5===4?0xff7a1a:0x1d58d8,x+(s.detalle?9.3:7.5)*(1),0.9+k*0.55,z+d*10.8,0,0.5);}
  b.box(1,1.2,0.7,c1,x-3.4,0.6,z-d*1.6,0,0.3);b.box(1.05,0.08,0.75,c2,x-3.4,1.24,z-d*1.6,0,0.8);
  if(s.detalle){for(let k=0;k<12;k++){const a=k/12*6.283;b.box(0.12,0.12,1.4,c1,x+Math.cos(a)*5.6,0.45,z+Math.sin(a)*5.6,-a,1);}for(let k=0;k<6;k++)b.box(0.15,4.5,0.15,c2,x-11+k*4.4,2.25,z+d*11.6,0,0.9);b.cyl(0.1,0.1,5,0x333333,x+9,2.5,z-d*2,6);b.box(5,0.25,0.25,0x333333,x+7,5,z-d*2);b.box(0.6,0.5,0.9,0x222222,x+4.5,4.8,z-d*2);}}
 else if(t==='atriles'){for(let k=0;k<4;k++){b.box(1.2,1.2,0.8,c1,x-5+k*3.3,0.6,z+d*3,0,0.3);b.box(1.25,0.1,0.85,c2,x-5+k*3.3,1.25,z+d*3,0,0.8);}}
 else if(t==='rosco'){for(let k=0;k<25;k++){const a=k/25*6.283;const m=new T.CylinderGeometry(0.35,0.35,0.08,12);b.add(m,k%2?c1:c2,x+Math.cos(a)*3,4.5+Math.sin(a)*3,z+d*12.2,0,0.7,Math.PI/2);}b.box(1,1.1,0.7,c1,x-3,0.55,z);b.box(1,1.1,0.7,c1,x+3,0.55,z);}
 else if(t==='pizarra'){b.box(10,4,0.2,0x0a2a1a,x,3.5,z+d*11.8);for(let k=0;k<9;k++)b.box(0.9,0.9,0.05,c2,x-4+k,3.6,z+d*11.65,0,0.5);b.box(3,1,1,c1,x-3,0.5,z);b.box(3,1,1,c1,x+3,0.5,z);}
 else if(t==='escalera'){for(let k=0;k<7;k++)b.box(8,0.6,0.1,k<2?c1:0x222222,x,1.2+k*0.75,z+d*11.8,0,0.7);b.box(3,1.1,1,c1,x,0.55,z);}
 else if(t==='ruleta'){const n=16;for(let k=0;k<n;k++){const g2=new T.CylinderGeometry(4,4,0.3,2,1,false,k/n*6.283,6.283/n);b.add(g2,[c1,c2,0x1e90ff,0x2ecc71][k%4],x,0.9,z);}b.cyl(0.6,0.6,0.4,0xffffff,x,1.1,z,12);b.box(10,3,0.2,0x0a0a3a,x,5,z+d*11.8);for(let k=0;k<12;k++)b.box(0.7,0.9,0.05,0xffffff,x-4.6+k*0.84,5,z+d*11.65,0,0.4);}
 else if(t==='obstaculos'){b.box(18,0.1,10,0x1e90ff,x,0.12,z,0,0.3);for(let k=0;k<4;k++){b.cyl(0.15,0.15,2,0xffffff,x-6+k*4,1,z,6);b.add(new T.SphereGeometry(0.8,8,6),0xff2020,x-6+k*4,2.6,z);}b.box(18,0.4,1,c1,x,1.2,z+d*4);}
 else if(t==='circulo'){b.cyl(4,4.2,0.5,0x101040,x,0.3,z,20);for(let k=0;k<12;k++){const a=k/12*6.283;b.box(0.15,0.15,6,c1,x+Math.cos(a)*5,0.5,z+Math.sin(a)*5,-a,0.9);}b.box(0.8,1,0.8,c2,x-1.4,0.9,z);b.box(0.8,1,0.8,c2,x+1.4,0.9,z);}
 else if(t==='torre'){for(let k=0;k<10;k++)b.box(3,0.6,0.6,k%2?c1:c2,x,0.8+k*0.7,z+d*11.5,0,0.6);b.box(1.2,1.1,0.8,c1,x-3,0.55,z);}
 else if(t==='bomba'){b.add(new T.SphereGeometry(2,10,8),0x111111,x,2.2,z+d*8);b.cyl(0.1,0.1,1.2,c2,x,4.6,z+d*8,6,1);for(let k=0;k<4;k++)b.box(0.12,0.12,5,[0xff2020,0x1e90ff,0x2ecc71,0xffd400][k],x-1.5+k,0.1,z+d*5);b.box(1.2,1.1,0.8,c1,x,0.55,z);}
 if(s.detalle){for(const sd of[-1,1])for(let r=0;r<3;r++)for(let k=0;k<7;k++){const yy=0.5*(r+1)+0.75,xx=x+sd*(9.6+r*1.1),zz=z+d-6+k*2;b.box(0.3,0.5,0.45,[0xffd400,0x30a0ff,0xd03070,0x2ecc71,0xffffff][(r*3+k)%5],xx,yy,zz);b.add(new T.SphereGeometry(0.2,6,4),0xe8b896,xx,yy+0.45,zz);}}
 if(s.navidadActiva&&window.EstudioNavidad)EstudioNavidad.add(T,g,{x:x+(s.nor?-8:8),z:z+d*7,escala:1.1});
 b.build(g);if(!(window.ESTUDIO_REALES&&ESTUDIO_REALES[s.id])){const sc=plane(g,13,5.4,s.id===SH[0].id?logoJuego:tex([s.n,s.inv?'🆕 INVENTADO':C.canal],'#'+c0.toString(16).padStart(6,'0'),'#fff',512,220),x,4.5,z+d*12.3,s.nor?Math.PI:0);
 }S.add(g);PL[s.id]=g;}
function freePlato(id){const g=PL[id];if(!g)return;g.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material&&o.material.map&&o.material.map!==logoJuego)o.material.map.dispose();});S.remove(g);delete PL[id];}
// ---------- personajes ----------
const SKIN=0xe8b896,PERS={};const HOME={nuria:['maquillaje',-11,17],marta:['peluqueria',-10,26],julia:['vestuario',-9,33],adrian:['camerinos',-6,42],sergio:['control',10.5,18],lola:['control',10,20.5],ines:['redaccion',7,26],rober:['sonido',9.5,34],toni:['almacen',8,41],carmen:['recepcion',0,11.3],luis:['cafeteria',-26,13],ana:['espera',20,9],dani:['espera',24,9],paco:['plato_'+MAIN,3,66]};
const SAL={nuria:'¡Hola! Aquí maquillamos a todo el mundo antes de salir.',marta:'¡Pasa! Hoy toca peinado de plató.',julia:'Esta es la ropa del programa, ¡toda planchadita!',adrian:'¡Hola, campeón! Bienvenido a mi camerino.',sergio:'Desde aquí se eligen las cámaras.',lola:'¡Hoy va a salir un programa genial!',ines:'Estamos escribiendo preguntas nuevas.',rober:'¡Probando, probando! Se oye perfecto.',toni:'Aquí guardamos los decorados de todos los programas.',carmen:'¡Bienvenido al estudio! ¿Vienes al programa?',luis:'¿Un zumo? ¡Invita la casa!',ana:'¡Estoy un poco nerviosa, pero contenta!',dani:'¡Qué ganas de jugar!',paco:'Soy el regidor. ¡Un aplauso!'};
const ROPA={adrian:0x1a1446,paco:0x222222,lola:0xd03070,nuria:0xffffff,marta:0xff8a00,julia:0x2ecc71,sergio:0x30a0ff,ines:0xffd400,rober:0x555555,toni:0x8a6a3a,carmen:0x1e3aff,luis:0xffffff,ana:0xff6a9a,dani:0x3aff6a};
function persona(k){const g=new T.Group(),c=ROPA[k]||0x888888;const m=(geo,col,y)=>{const o=new T.Mesh(geo,mat(col));o.position.y=y;g.add(o);return o;};
 m(new T.BoxGeometry(0.45,0.8,0.25),0x223,0.4);m(new T.BoxGeometry(0.55,0.7,0.3),c,1.15);m(new T.SphereGeometry(0.22,8,6),SKIN,1.72);if(k==='adrian')m(new T.BoxGeometry(0.12,0.3,0.02),K.franja,1.25).position.z=0.16;
 const sp=new T.Sprite(new T.SpriteMaterial({map:tex([EQ[k][0],EQ[k][1]],'#1a1446','#fff',256,96),depthTest:true}));sp.scale.set(1.3,0.5,1);sp.position.y=2.25;g.add(sp);S.add(g);return g;}
Object.keys(HOME).forEach(k=>{const p=persona(k);p.position.set(HOME[k][1],0,HOME[k][2]);PERS[k]=p;});
// ---------- jugador / controles ----------
const pl={x:0,z:-30,yaw:0,pitch:0};const keys={};addEventListener('keydown',e=>keys[e.key.toLowerCase()]=1);addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
let jx=0,jy=0,jid=null,lid=null,lx=0,ly=0;const joy=$('joy'),kn=$('knob');
cv.addEventListener('pointerdown',e=>{if(e.clientX<innerWidth*0.4&&e.pointerType==='touch'&&jid===null){jid=e.pointerId;}else{lid=e.pointerId;lx=e.clientX;ly=e.clientY;}});
addEventListener('pointermove',e=>{if(e.pointerId===jid){const r=joy.getBoundingClientRect();jx=Math.max(-1,Math.min(1,(e.clientX-r.left-60)/50));jy=Math.max(-1,Math.min(1,(e.clientY-r.top-60)/50));kn.style.left=35+jx*35+'px';kn.style.top=35+jy*35+'px';}else if(e.pointerId===lid){pl.yaw-=(e.clientX-lx)*0.006;pl.pitch=Math.max(-1,Math.min(1,pl.pitch-(e.clientY-ly)*0.004));lx=e.clientX;ly=e.clientY;}});
addEventListener('pointerup',e=>{if(e.pointerId===jid){jid=null;jx=jy=0;kn.style.left=kn.style.top='35px';}if(e.pointerId===lid)lid=null;});
joy.addEventListener('pointerdown',e=>{jid=e.pointerId;e.stopPropagation();});
function hit(x,z){if(z<-40||z>86||x<-128||x>128)return true;return COL.some(c=>x>c.x0-0.35&&x<c.x1+0.35&&z>c.z0-0.35&&z<c.z1+0.35);}
function salaEn(x,z){if(z<0)return SALAS[0];for(const s of SALAS)if(s.x0!==undefined&&x>=s.x0&&x<=s.x1&&z>=s.z0&&z<=s.z1&&s.id!=='pasillo'&&s.id!=='pasillo2')return s;return SALAS.find(s=>s.id!=='exterior'&&s.x0!==undefined&&x>=s.x0&&x<=s.x1&&z>=s.z0&&z<=s.z1)||SALAS[0];}
// ---------- escenas ----------
let modo=null,salaAct='',habla=0;
function sub(q,t){const e=$('sub');if(!t){e.classList.add('h');return;}e.querySelector('b').textContent=q;e.querySelector('span').textContent=t;e.classList.remove('h');}
function voz(t){if(!OPC.voz||!window.speechSynthesis)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='es-ES';speechSynthesis.speak(u);}catch(e){}}
// voces grabadas (Piper es_ES, voces.js): voz/<fnv(personaje|frase)>.ogg · Web Audio, caché pequeña para el Redmi A2
const VOZ={idx:null,ctx:null,src:null,buf:new Map()};VOZ.ok=fetch('voz/index.json').then(r=>r.json()).then(j=>VOZ.idx=j).catch(()=>VOZ.idx={});
function fnv(a){let e=2166136261,t=a.normalize('NFC').trim();for(let o=0;o<t.length;o++)e^=t.charCodeAt(o),e=Math.imul(e,16777619)>>>0;return e.toString(16).padStart(8,'0');}
function actx(){if(!VOZ.ctx){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;VOZ.ctx=new A();}if(VOZ.ctx.state==='suspended')VOZ.ctx.resume().catch(()=>{});return VOZ.ctx;}
addEventListener('pointerdown',actx,true);addEventListener('keydown',actx,true);
function vozBuf(q,t){const h=fnv(q+'|'+t);if(!OPC.grab||!VOZ.idx||VOZ.idx[h]==null||!actx())return Promise.resolve(null);if(!VOZ.buf.has(h)){VOZ.buf.set(h,fetch('voz/'+h+'.ogg').then(r=>r.arrayBuffer()).then(b=>new Promise((ok,ko)=>VOZ.ctx.decodeAudioData(b,ok,ko))).catch(()=>null));if(VOZ.buf.size>10)VOZ.buf.delete(VOZ.buf.keys().next().value);}return VOZ.buf.get(h);}
function callar(){try{VOZ.src&&VOZ.src.stop();}catch(e){}VOZ.src=null;try{window.speechSynthesis&&speechSynthesis.cancel();}catch(e){}}
// muestra el subtítulo justo cuando empieza el audio; devuelve una promesa que termina con la frase (true) o false si no hay grabación
async function decir(q,t,quien){const r0=RUN;await VOZ.ok;const b=await vozBuf(q,t);if(r0!==RUN)return false;callar();sub(quien,t);try{window.REPORTAJE&&REPORTAJE.linea(t,q)}catch(e){}if(!b){voz(t);return false;}const s=VOZ.ctx.createBufferSource();s.buffer=b;s.connect(VOZ.ctx.destination);VOZ.src=s;return new Promise(r=>{s.onended=()=>r(true);s.start();setTimeout(()=>r(true),b.duration*1000+900);});}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const fx=$('fx');
function flash(html,ms){const d=document.createElement('div');d.innerHTML=html;fx.appendChild(d);setTimeout(()=>d.remove(),ms||1400);}
let camT=null;function mira(px,pz,tx,tz){camT={px,pz,tx,tz};}
async function efecto(e){if(!e)return;if(e==='claqueta')flash('<div class="big" style="font-size:min(9vw,60px)">🎬 ESCENA · TOMA '+(1+Math.floor(Math.random()*4))+'</div>',1300);
 if(e==='tomafalsa')flash('<div class="big" style="color:#ff3030;font-size:min(12vw,90px);transform:rotate(-8deg)">TOMA FALSA</div>',1800);
 if(e==='risas')flash('<div class="big" style="font-size:min(10vw,70px)">😂 ¡Risas!</div>',1500);if(e==='aplauso')flash('<div class="big" style="font-size:min(10vw,70px)">👏👏👏</div>',1500);
 if(e==='confeti')flash('<div class="big" style="font-size:min(10vw,70px)">🎉✨🎊</div>',1500);
 if(e==='cuenta'){for(const n of[5,4,3,2,1]){flash('<div class="big">'+n+'</div>',900);await sleep(950);}flash('<div class="big">¡DENTRO!</div>',1200);}
 if(e==='onair')flash('<div class="onair">● GRABANDO</div>',3500);}
function lugar(sitio,show){if(sitio==='plato'){const s=SH.find(q=>q.id===show)||SH[0];const mj=modo==='making'&&s.id==='pasapalabra';if(!!s.montaje!==mj){freePlato(s.id);s.montaje=mj;}buildPlato(s);const d=s.nor?1:-1;return{cx:s.cx,cz:s.cz,px:s.cx+4,pz:s.cz-d*7};}const s=sala(sitio)||sala('recepcion');const dd=s.d||0;return{cx:s.cx,cz:s.cz,px:dd?dd*2.6:s.cx+(s.cx?-Math.sign(s.cx)*7:3),pz:s.cz-(dd?0:4)};}
let RUN=0;async function corre(e,seguidas){modo=e.cat;const my=++RUN;fx.innerHTML='';const cr=$('cred');cr&&cr.remove();$('panel').classList.add('h');$('joy').classList.add('h');const s=SH.find(q=>q.id===e.show);
 $('cap').textContent=CATS[e.cat]+' · '+e.t+' · 🆕 INVENTADO';$('cap').classList.remove('h');fx.className=e.cat==='fuera'||e.cat==='making'?'mk':'';
 let i=0;for(const [q,t,sitio,ef] of e.p){const L=lugar(sitio,e.show);mira(L.px,L.pz,L.cx,L.cz+(sitio==='plato'?0:0));const p=PERS[q];if(p){p.position.set(L.cx+(i%3-1)*1.3,0,L.cz+(sitio==='plato'?(s.nor?-1:1)*2:0.6));p.lookAt(L.px,0,L.pz);}
  $('sala').textContent=sitio==='plato'?'Plató · '+s.n:(sala(sitio)||{}).n||'';
  if(ef==='claqueta'||ef==='cuenta')await efecto(ef);const nx=e.p[i+1];if(nx)vozBuf(nx[0],nx[1]);const pd=decir(q,t,(EQ[q]||[q,''])[0]+' · '+(EQ[q]||['',''])[1]).catch(()=>{sub((EQ[q]||[q])[0],t);return false;});if(ef&&ef!=='claqueta'&&ef!=='cuenta')efecto(ef);const t0=Date.now(),grab=await pd;if(my!==RUN)return;await sleep(grab?450:Math.max(0,Math.max(2800,t.length*70)-(Date.now()-t0)));i++;if(my!==RUN)return;}
 sub();Object.keys(HOME).forEach(k=>{PERS[k].position.set(HOME[k][1],0,HOME[k][2]);});
 if(seguidas){const L=ESC.filter(x=>x.show===e.show&&x.cat===e.cat),j=L.indexOf(e);if(j<L.length-1)return corre(L[j+1],true);if(e.cat==='making')return creditos();}
 panel('<h2>'+e.t+'</h2>',[['Siguiente ▶','',()=>{const L=ESC.filter(x=>x.show===e.show&&x.cat===e.cat);corre(L[(L.indexOf(e)+1)%L.length]);}],['Repetir','',()=>corre(e)],['Lista','',()=>lista(e.cat,e.show)],['🚶 Seguir paseando','',paseo]]);}
function paseo(){modo=null;RUN++;camT=null;callar();$('panel').classList.add('h');$('cap').classList.add('h');$('joy').classList.remove('h');sub();fx.className='';}
function panel(h,bs){const cr=$('cred');cr&&cr.remove();const p=$('panel');p.innerHTML=h;bs.forEach(([t,s,f])=>{const x=document.createElement('button');x.className='pb';x.innerHTML=t+(s?'<small>'+s+'</small>':'');x.onclick=ev=>{ev.stopPropagation();f();};p.appendChild(x);});const c=document.createElement('button');c.className='pb';c.textContent='Cerrar';c.onclick=paseo;p.appendChild(c);p.classList.remove('h');}
function lista(cat,show){const L=ESC.filter(x=>x.show===show&&x.cat===cat),s=SH.find(q=>q.id===show);panel('<h2>'+CATS[cat]+' · '+s.n+'</h2><p>🆕 INVENTADO</p>',[['▶ Ver todas seguidas','',()=>corre(L[0],true)]].concat(L.map(e=>[e.t,'',()=>corre(e)])));}
function shows(cat){panel('<h2>'+CATS[cat]+'</h2><p>Elige programa · 🆕 INVENTADO</p>',SH.map(s=>[s.n+(s.inv?' 🆕':''),'',()=>lista(cat,s.id)]));}
function menuMaking(){panel('<h2>🎬 Detrás de las cámaras</h2>',Object.keys(CATS).map(c=>[CATS[c],{making:'Cómo se hace el programa',entresijos:'Los secretos de cómo funciona por dentro',entrenamiento:'Practicar sin perder',fuera:'Lo que pasa cuando no graban',tomasfalsas:'Lapsus y risas'}[c],()=>shows(c)]).concat([['🎞️ Créditos','',creditos]]));}
function ir(id){const s=sala(id);paseo();if(s.show)buildPlato(s.show);pl.pitch=0;if(id==='exterior'){pl.x=0;pl.z=-30;pl.yaw=0;pl.pitch=0.12;}else if(s.d){pl.x=0;pl.z=s.cz;pl.yaw=s.d>0?Math.PI/2:-Math.PI/2;}else if(s.show){pl.x=s.cx;pl.z=s.show.nor?62:44;pl.yaw=s.show.nor?0:Math.PI;}else if(s.id==='pasillo2'){pl.x=0;pl.z=53;pl.yaw=Math.PI/2;}else{pl.x=s.cx;pl.z=s.cz-3;pl.yaw=0;}}
function salas(){panel('<h2>🗺️ Salas del estudio</h2>',SALAS.map(s=>[s.n,'',()=>ir(s.id)]));}
function creditos(){paseo();const d=document.createElement('div');d.id='cred';const ks=Object.keys(EQ).filter(k=>EQ[k][1]!=='concursante');d.innerHTML='<div class="roll"><img src="'+C.logoCanal+'"><h2>'+C.juego+' · Making of</h2><p><b>🆕 INVENTADO</b><br>Nombres y personajes inventados</p>'+ks.map(k=>'<p><b>'+EQ[k][1]+'</b><br>'+EQ[k][0]+'</p>').join('')+'<p><b>Producción</b><br>'+C.canal+'</p><p><b>Dedicado a</b><br>Ikeriano el campeón 2</p><p>Juego de fans sin ánimo de lucro.<br>El presentador es un personaje virtual inventado.</p><img src="'+C.logoCanal+'"></div>';d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>d.remove(),39000);}
$('bVolver').onclick=()=>{location.href=Q.get('volver')||C.volver;};$('bSalas').onclick=e=>{e.stopPropagation();salas();};$('bMaking').onclick=e=>{e.stopPropagation();menuMaking();};
$('bOpc').onclick=e=>{e.stopPropagation();panel('<h2>⚙️ Opciones del estudio</h2>',[['🎙️ Voces grabadas: '+(OPC.grab?'Sí':'No'),'Cada personaje con su voz · encendidas por defecto',()=>{OPC.grab=!OPC.grab;localStorage.setItem('estudio_vozgrab',OPC.grab?'1':'0');if(!OPC.grab)callar();$('bOpc').click();}],['🎤 Voz del sistema si falta grabación: '+(OPC.voz?'Sí':'No'),'🆕 INVENTADO · apagada por defecto',()=>{OPC.voz=!OPC.voz;localStorage.setItem('estudio_voz',OPC.voz?'1':'0');$('bOpc').click();}]]);};
// ---------- bucle ----------
const clock=new T.Clock(),tgt=new T.Vector3();let lastLazy=0,cx=0,cz=-16,ctx=0,ctz=0;
function loop(){requestAnimationFrame(loop);const dt=Math.min(clock.getDelta(),0.05),t=clock.elapsedTime;
 if(!camT){const f=(keys.w||keys.arrowup?1:0)-(keys.s||keys.arrowdown?1:0)-jy,st=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0)+jx;if(keys.q)pl.yaw+=dt*2;if(keys.e)pl.yaw-=dt*2;
  const sp=5*dt,sn=Math.sin(pl.yaw),cs=Math.cos(pl.yaw);
  const mx=(sn*f+ cs*-st)*sp, mz=(cs*f - sn*-st)*sp; // adelante = (sin yaw, cos yaw)
  if(!hit(pl.x+mx,pl.z))pl.x+=mx;if(!hit(pl.x,pl.z+mz))pl.z+=mz;
  cam.position.set(pl.x,1.6,pl.z);tgt.set(pl.x+Math.sin(pl.yaw)*Math.cos(pl.pitch),1.6+Math.sin(pl.pitch),pl.z+Math.cos(pl.yaw)*Math.cos(pl.pitch));cam.lookAt(tgt);cx=pl.x;cz=pl.z;
  const s=salaEn(pl.x,pl.z);if(s.id!==salaAct){salaAct=s.id;$('sala').textContent=s.n;}
  if(t-habla>4){for(const k in PERS){const p=PERS[k].position;if(Math.hypot(p.x-pl.x,p.z-pl.z)<2.6){decir(k,SAL[k],EQ[k][0]+' · '+EQ[k][1]).catch(()=>{});habla=t;PERS[k].lookAt(pl.x,0,pl.z);break;}}if(t-habla>4)sub();}}
 else{cx+=(camT.px-cx)*Math.min(1,dt*2);cz+=(camT.pz-cz)*Math.min(1,dt*2);ctx+=(camT.tx-ctx)*Math.min(1,dt*2.5);ctz+=(camT.tz-ctz)*Math.min(1,dt*2.5);cam.position.set(cx+Math.sin(t*0.3)*0.4,2.2+Math.sin(t*0.5)*0.1,cz);cam.lookAt(ctx,1.4,ctz);}
 if(t-lastLazy>1){lastLazy=t;SH.forEach(s=>{const dd=Math.hypot(s.cx-cam.position.x,s.cz-cam.position.z);if(dd<34)buildPlato(s);else if(dd>48&&!(camT&&Math.hypot(s.cx-camT.tx,s.cz-camT.tz)<20))freePlato(s.id);});}
 R.render(S,cam);}
pl.yaw=0;
const m0=Q.get('modo'),sh0=Q.get('show')||SH[0].id;
if(Q.get('sala'))ir(Q.get('sala'));else if(m0==='fuera')ir('recepcion');
if(m0&&CATS[m0])setTimeout(()=>lista(m0,sh0),400);else if(m0==='menu')setTimeout(menuMaking,400);
$('load').remove();loop();
window.Estudio={ir,salas:SALAS,shows:SH,escenas:ESC,corre,lista,menuMaking,creditos,buildPlato};
