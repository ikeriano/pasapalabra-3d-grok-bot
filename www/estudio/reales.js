/* Platós REALES de TV (réplica low-poly de las fotos de Iker, ref/platos_reales/<show>/) para el edificio y el Making of.
   Cada función recibe {b (merger por color), T, s, x, z, d (hacia la pared del fondo), g (grupo), plane}. Las piezas con textura
   (pantallas, suelos) son mallas sueltas en g; el resto se fusiona por color (pocas draw calls para el Redmi A2). */
(function(){
const R=window.ESTUDIO_REALES=window.ESTUDIO_REALES||{};
function cv(w,h,f){const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);return c;}
function tx(T,c){const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;}
function mesh(o,geo,map,x,y,z,rx,ry,extra){const T=o.T;const m=new T.Mesh(geo,new T.MeshBasicMaterial(Object.assign({map,side:T.DoubleSide},extra||{})));m.position.set(x,y,z);m.rotation.set(rx||0,ry||0,0);o.g.add(m);return m;}
function arc(o,r,h,y,map,a0,a1,extra){const T=o.T;map.wrapS=T.RepeatWrapping;map.repeat.x=-Math.abs(map.repeat.x||1);map.needsUpdate=true;const m=mesh(o,new T.CylinderGeometry(r,r,h,48,1,true,a0,a1-a0),map,o.x,y,o.z,0,0,extra);return m;}
// ángulo de la pared del fondo: three Cylinder theta=0 apunta a +z; fondo = d>0 ? +z : -z
const back=o=>o.d>0?0:Math.PI;
function foto(o,src,lado){/* foto real enmarcada en la pared lateral, como referencia en la sala */const T=o.T,t=new T.TextureLoader().load(src);t.colorSpace=T.SRGBColorSpace;const x=o.x+lado*12.7;o.b.box(0.1,3.5,5.6,0x111111,x,3,o.z);mesh(o,new T.PlaneGeometry(5.3,3.1),t,x-lado*0.07,3,o.z,0,-lado*Math.PI/2);}
function grada(o,cols,n){const {b,x,z,d}=o;for(const sd of[-1,1])for(let r=0;r<3;r++)for(let k=0;k<6;k++){const xx=x+sd*(8.6+r*1.1),zz=z-d*4+k*1.6*d;b.box(0.9,0.45+r*0.5,1.4,0x2a2a3a,xx,(0.45+r*0.5)/2,zz);b.box(0.32,0.5,0.4,cols[(r*3+k)%cols.length],xx,0.7+r*0.5,zz);b.add(new T0.SphereGeometry(0.18,6,4),0xe8b896,xx,1.1+r*0.5,zz);}}
let T0=null;
function base(o){T0=o.T;}
/* ¿Quién quiere ser millonario? (15 años): suelo circular dorado, sillas calientes, aro de luz, pantallas con logo */
R.millonario=o=>{base(o);const {b,T,x,z,d}=o;
 const fl=tx(T,cv(512,512,(g,w)=>{g.fillStyle='#050a3a';g.fillRect(0,0,w,w);const c=w/2;for(let i=0;i<48;i++){g.strokeStyle=i%2?'#d9a62a':'#fff0a0';g.lineWidth=3;g.beginPath();g.moveTo(c,c);const a=i/48*6.283;for(let r=0;r<c;r+=8){const aa=a+Math.sin(r/40)*.35;g.lineTo(c+Math.cos(aa)*r,c+Math.sin(aa)*r);}g.stroke();}
  g.fillStyle='#0a1460';g.beginPath();g.arc(c,c,c*.28,0,7);g.fill();g.strokeStyle='#ffd25a';g.lineWidth=10;g.beginPath();g.arc(c,c,c*.96,0,7);g.stroke();g.beginPath();g.arc(c,c,c*.28,0,7);g.stroke();}));
 b.cyl(6.6,6.8,0.3,0x0a1460,x,0.15,z,40);mesh(o,new T.CircleGeometry(6.4,48),fl,x,0.31,z,-Math.PI/2);
 b.add(new T.TorusGeometry(6.6,0.07,4,64),0x4aa8ff,x,0.33,z,0,1,Math.PI/2);
 for(const sx of[-1,1]){b.cyl(0.35,0.5,0.9,0x9aa4b8,x+sx*1.2,0.75,z,10);b.box(0.9,0.12,0.9,0x1a1a2a,x+sx*1.2,1.25,z);b.box(0.9,1.1,0.12,0x1a1a2a,x+sx*1.2,1.8,z+sx*0.0+0.45*d*0);b.box(1.2,0.9,0.6,0x2a3a8a,x+sx*0.55,0.75,z-d*0.9,0,0.3);b.box(0.7,0.45,0.05,0x5ad1ff,x+sx*0.55,1.3,z-d*0.9,0,1);}
 const rig=new T.TorusGeometry(7.5,0.25,6,64);b.add(rig,0x2a3550,x,8.5,z,0,0,Math.PI/2);b.add(new T.TorusGeometry(6.8,0.08,4,64),0x5ad1ff,x,8.3,z,0,1,Math.PI/2);
 const logo=tx(T,cv(512,512,(g,w)=>{const c=w/2,gr=g.createRadialGradient(c,c,10,c,c,c);gr.addColorStop(0,'#2a3ad0');gr.addColorStop(1,'#060a3a');g.fillStyle=gr;g.fillRect(0,0,w,w);g.strokeStyle='#e6b84a';g.lineWidth=4;for(let i=0;i<16;i++){g.beginPath();g.arc(c+Math.cos(i)*60,c+Math.sin(i)*60,150,0,7);g.stroke();}g.fillStyle='#fff';g.font='900 70px Georgia';g.textAlign='center';g.fillText('MILLONARIO',c,c+24);g.font='700 30px Georgia';g.fillText('¿QUIÉN QUIERE SER',c,c-70);}));
 mesh(o,new T.PlaneGeometry(6,6),logo,x,5,z+d*12.2,0,back(o)+Math.PI);
 const arcT=tx(T,cv(512,64,(g,w,h)=>{g.fillStyle='#071a6a';g.fillRect(0,0,w,h);for(let i=0;i<w;i+=32){g.fillStyle=i%64?'#3a7bff':'#9fd0ff';g.fillRect(i,h*.45,24,4);}g.fillStyle='#fff';g.font='800 22px Georgia';g.fillText('QUIÉN QUIERE SER  MILLONARIO',40,26);}));arcT.wrapS=T.RepeatWrapping;arcT.repeat.set(3,1);
 arc(o,11,1.4,6.8,arcT,back(o)-1.4,back(o)+1.4);
 for(let k=0;k<10;k++){const a=back(o)-1.5+k/9*3;b.box(0.12,5,0.12,0x5ad1ff,x+Math.sin(a)*10.6,2.5,z+Math.cos(a)*10.6,0,1);}
 grada(o,[0x2a3ad0,0x5ad1ff,0xffffff,0xd9a62a]);foto(o,'ref_platos/millonario.jpg',-1);};
/* La Ruleta de la Suerte (plató azul de los diamantes con la ruleta; era: s.era='madera'|'rosa') */
R.ruleta=o=>{base(o);const {b,T,x,z,d,s}=o;const era=s.era||'azul',E={azul:[0x0b2a9a,0x5ad1ff,0xffffff],rosa:[0x1a3ab0,0xff4aa8,0x8ad8ff],madera:[0x8a5a2a,0xff8a1a,0xffe0a0]}[era]||[0x0b2a9a,0x5ad1ff,0xffffff];
 const fl=tx(T,cv(512,512,(g,w)=>{g.fillStyle='#'+E[0].toString(16).padStart(6,'0');g.fillRect(0,0,w,w);g.strokeStyle='#9fd8ff';g.lineWidth=3;for(let i=-w;i<w*2;i+=64){g.beginPath();g.moveTo(i,0);g.lineTo(i+w,w);g.stroke();g.beginPath();g.moveTo(i+w,0);g.lineTo(i,w);g.stroke();}g.fillStyle='#ffffff';for(let k=0;k<5;k++){const a=k/5*6.283-1.57;g.beginPath();g.arc(w/2+Math.cos(a)*200,w/2+Math.sin(a)*200,10,0,7);g.fill();}}));
 mesh(o,new T.CircleGeometry(9,48),fl,x,0.14,z,-Math.PI/2);
 const n=24,cols=[0xff2a2a,0xffd400,0x2ecc71,0x1e90ff,0xff7a1a,0xb04ad6,0xffffff,0xff4aa8];
 for(let k=0;k<n;k++){b.add(new T.CylinderGeometry(3.4,3.4,0.25,2,1,false,k/n*6.283,6.283/n),cols[k%cols.length],x,1.05,z-d*0.5,0,0.25);}
 b.cyl(3.6,3.6,0.18,0xdfe6ee,x,0.95,z-d*0.5,40);b.cyl(3.2,3.4,0.8,0x222a4a,x,0.45,z-d*0.5,32);b.cyl(0.5,0.5,0.35,0xffd400,x,1.3,z-d*0.5,16,0.6);
 for(let k=0;k<n;k++){const a=k/n*6.283;b.cyl(0.06,0.06,0.25,0xffffff,x+Math.cos(a)*3.45,1.25,z-d*0.5+Math.sin(a)*3.45,4,1);}
 for(const a of[-1.1,0,1.1]){const px=x+Math.sin(a)*4.3,pz=z-d*0.5-d*Math.cos(a)*4.3*-1;b.box(0.8,1.05,0.6,E[1],px,0.52,pz,a,0.4);b.box(0.85,0.08,0.65,0xffffff,px,1.08,pz,a,0.8);}
 // panel de letras
 b.box(12,3.2,0.3,0x0a0a2a,x,4.4,z+d*11.8);for(let r=0;r<4;r++)for(let k=0;k<12;k++)b.box(0.8,0.62,0.05,(r+k)%5?0x2a7a3a:0xffffff,x-5.2+k*0.95,3.2+r*0.78,z+d*11.62,0,0.4);
 // coche sobre plataforma (premio)
 const cx=x+7.5,cz=z+d*6;b.cyl(2.4,2.4,0.3,0xdfe6ee,cx,0.15,cz,24);b.box(3.2,0.7,1.5,era==='rosa'?0xff4aa8:0x1e6aff,cx,0.75,cz);b.box(1.8,0.55,1.35,0x1a2a4a,cx-0.2,1.35,cz);for(const a of[-1,1])for(const c of[-1,1])b.cyl(0.32,0.32,0.25,0x111111,cx+a*1.05,0.35,cz+c*0.75,10);
 // pantallas laterales de diamantes y logo
 const dia=tx(T,cv(512,256,(g,w,h)=>{g.fillStyle='#061a5a';g.fillRect(0,0,w,h);for(let i=0;i<w;i+=48)for(let j=0;j<h;j+=48){g.fillStyle=(i+j)%96?'#2a7bff':'#9fe0ff';g.beginPath();g.moveTo(i+24,j);g.lineTo(i+48,j+24);g.lineTo(i+24,j+48);g.lineTo(i,j+24);g.fill();}g.fillStyle='#fff';g.font='900 46px Arial';g.textAlign='center';g.fillText('LA RULETA DE LA SUERTE',w/2,h/2+16);}));
 arc(o,11.6,4,4.2,dia,back(o)-1.7,back(o)+1.7);
 grada(o,[0xff4aa8,0x5ad1ff,0xffd400,0xffffff]);foto(o,'ref_platos/ruleta.jpg',-1);};
/* Boom: muro de rombos naranja/rosa, peana redonda con la bomba y cables de colores, atriles de equipos */
R.boom=o=>{base(o);const {b,T,x,z,d,s}=o;
 const rom=tx(T,cv(512,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,w,0);gr.addColorStop(0,'#ff5a8a');gr.addColorStop(.5,'#ff9a3a');gr.addColorStop(1,'#ff5a8a');g.fillStyle='#1a0a1a';g.fillRect(0,0,w,h);for(let i=0;i<w;i+=40)for(let j=0;j<h;j+=40){g.fillStyle=gr;g.globalAlpha=.55+((i*7+j*3)%5)/10;g.beginPath();g.moveTo(i+20,j+2);g.lineTo(i+38,j+20);g.lineTo(i+20,j+38);g.lineTo(i+2,j+20);g.fill();}g.globalAlpha=1;}));rom.wrapS=T.RepeatWrapping;rom.repeat.set(4,1);
 arc(o,11.5,6,4.2,rom,back(o)-1.9,back(o)+1.9);
 b.cyl(5.5,5.8,0.35,0xe8e8f0,x,0.18,z,40);b.cyl(5.9,5.9,0.06,0xff7a3a,x,0.37,z,48,1);
 b.cyl(1.6,1.9,1.1,0xdfe3ea,x,0.9,z,24);b.cyl(1.65,1.65,0.06,0x5ad1ff,x,1.47,z,24,1);
 b.add(new T.SphereGeometry(0.9,14,10),0x111111,x,2.3,z);b.cyl(0.25,0.25,0.4,0x333333,x,3.2,z,8);
 const wc=[0xff2020,0x1e90ff,0x2ecc71,0xffd400,0xff7a1a,0xb04ad6];for(let k=0;k<12;k++){const a=k/12*6.283;b.add(new T.SphereGeometry(0.28,8,6),wc[k%6],x+Math.cos(a)*1.25,1.65,z+Math.sin(a)*1.25,0,0.3);}
 for(const sx of[-1,1])for(let k=0;k<4;k++){const xx=x+sx*(3.2+k*1.3),zz=z-d*(3.2-k*0.6);b.box(1,1.1,0.7,0x2a2a3a,xx,0.55,zz);b.box(1.05,0.25,0.75,sx<0?0xff5a8a:0xff9a3a,xx,1.15,zz,0,0.7);}
 b.box(1,1.2,0.7,0x333333,x,0.6,z-d*5.2);b.box(1.05,0.1,0.75,0x5ad1ff,x,1.25,z-d*5.2,0,1);
 const lg=tx(T,cv(512,256,(g,w,h)=>{g.fillStyle='#1a1030';g.fillRect(0,0,w,h);g.fillStyle='#ff9a3a';g.beginPath();for(let i=0;i<6;i++){const a=i/6*6.283;g.lineTo(w/2+Math.cos(a)*170,h/2+Math.sin(a)*110);}g.fill();g.fillStyle='#fff';g.font='900 110px Arial';g.textAlign='center';g.fillText('BOOM!',w/2,h/2+38);}));
 mesh(o,new T.PlaneGeometry(5,2.5),lg,x,7.9,z+d*11.2,0,back(o)+Math.PI);
 for(let k=0;k<3;k++)b.add(new T.TorusGeometry(3.8+k*1.3,0.1,4,48),k%2?0xff7a3a:0x5ad1ff,x,8.6-k*0.3,z,0,1,Math.PI/2);
 grada(o,[0xff5a8a,0xff9a3a,0x5ad1ff,0xffffff]);foto(o,'ref_platos/boom.jpg',-1);
};
/* Alta Tensión (foto ref): panel de respuestas azul a la izquierda (3x6 casillas con palabras), pilares de luz verticales rosa/lila/blanco a la derecha, suelo brillante con rayos, atril blanco con rayo */
R.altatension=o=>{base(o);const {b,T,x,z,d}=o;
 const W=['MOQUETE','SHREK','GARFIELD','BOLT','YODA','CASPER','LA MÁSCARA','MERLÍN','BANDERA','EL ESCUDO','EL GRINCH','ZAFIRO','MAZINGER Z','BRUJA MALA','EL PÁJARO','PICOLO'];
 const pan=tx(T,cv(1024,640,(g,w,h)=>{g.fillStyle='#0a1a5a';g.fillRect(0,0,w,h);g.textAlign='center';let k=0;for(let r=0;r<5;r++)for(let c=0;c<4;c++){const px=14+c*252,py=14+r*124;g.fillStyle='#1e6ae8';g.fillRect(px,py,236,108);g.strokeStyle='#bfe8ff';g.lineWidth=4;g.strokeRect(px,py,236,108);g.fillStyle='#fff';g.font='900 28px Arial';g.fillText(W[(k++)%W.length],px+118,py+64);}}));
 mesh(o,new T.PlaneGeometry(8,5),pan,x-4.2,3.4,z+d*10.6,0,back(o)+Math.PI+0.25);b.box(8.4,0.3,0.4,0x9ad8ff,x-4.2,0.75,z+d*10.7,0,0.8);
 const cols=[0xff6ad0,0xb06aff,0xffffff,0xff9ae8,0x6a8aff];
 for(let k=0;k<14;k++){const h=4+((k*5)%4)*1.3,px=x+1+k*0.75,pz=z+d*(10.4-k*0.25);b.box(0.55,h,0.4,cols[k%5],px,h/2+0.1,pz,0,0.9);}
 const fl=tx(T,cv(512,512,(g,w)=>{const gr=g.createLinearGradient(0,0,0,w);gr.addColorStop(0,'#3a2a8a');gr.addColorStop(1,'#1a3ab0');g.fillStyle=gr;g.fillRect(0,0,w,w);g.fillStyle='rgba(255,220,120,.85)';for(let i=0;i<9;i++){const px=(i*137)%w,py=(i*89)%w;g.beginPath();g.moveTo(px,py);g.lineTo(px+30,py);g.lineTo(px+12,py+30);g.lineTo(px+34,py+30);g.lineTo(px-6,py+72);g.lineTo(px+6,py+38);g.lineTo(px-14,py+38);g.closePath();g.fill();}}));
 mesh(o,new T.PlaneGeometry(24,22),fl,x,0.16,z,-Math.PI/2);
 b.box(1.1,1.6,0.7,0xf4f6fa,x+1.2,0.9,z+d*2);b.box(1.2,0.08,0.8,0xffffff,x+1.2,1.72,z+d*2);
 const ray=tx(T,cv(128,128,(g,w)=>{g.fillStyle='#fff';g.fillRect(0,0,w,w);g.fillStyle='#ffc81a';g.beginPath();g.moveTo(70,10);g.lineTo(30,70);g.lineTo(60,70);g.lineTo(45,118);g.lineTo(98,50);g.lineTo(66,50);g.closePath();g.fill();}));
 mesh(o,new T.PlaneGeometry(0.9,0.9),ray,x+1.2,1.1,z+d*2-d*0.36,0,back(o)+Math.PI);
 const bg=tx(T,cv(512,128,(g,w,h)=>{const gr=g.createLinearGradient(0,0,w,0);gr.addColorStop(0,'#2a1a7a');gr.addColorStop(1,'#a03ad0');g.fillStyle=gr;g.fillRect(0,0,w,h);}));
 arc(o,11.8,7,3.6,bg,back(o)-1.9,back(o)+1.9);
 grada(o,[0xff6ad0,0x1e6ae8,0xffffff,0xb06aff]);foto(o,'ref_platos/altatension.jpg',-1);};
R.ruedalaletra=o=>{base(o);const {b,T,x,z,d}=o;
 const pan=tx(T,cv(512,512,(g,w)=>{const gr=g.createLinearGradient(0,0,w,0);gr.addColorStop(0,'#c03ad0');gr.addColorStop(1,'#2ad0e0');g.fillStyle=gr;g.fillRect(0,0,w,w);g.strokeStyle='rgba(255,255,255,.55)';for(let r=30;r<240;r+=22){g.lineWidth=r%44?3:7;g.beginPath();g.arc(w/2,w/2,r,0,7);g.stroke();}}));
 [-1,0,1].forEach(k=>mesh(o,new T.PlaneGeometry(k?4:6,6.5),pan,x+k*5.4,4.2,z+d*11.5,0,back(o)+Math.PI));
 const led=tx(T,cv(1024,64,(g,w,h)=>{g.fillStyle='#ff5ab0';g.fillRect(0,0,w,h);const gr=g.createLinearGradient(0,0,w,0);gr.addColorStop(0,'#ff7a3a');gr.addColorStop(1,'#ff5ab0');g.fillStyle=gr;g.fillRect(0,0,w,h);g.fillStyle='#fff';g.font='900 40px Arial';for(let i=0;i<3;i++)g.fillText('RUEDA LA LETRA',20+i*340,46);}));
 for(const sd of[-1,1]){mesh(o,new T.PlaneGeometry(12,0.55),led,x+sd*9.2,2.7,z,0,-sd*Math.PI/2);mesh(o,new T.PlaneGeometry(12,0.55),led,x+sd*9.2,1.2,z,0,-sd*Math.PI/2);}
 b.box(10,0.25,3.2,0xe8eef6,x,0.12,z+d*1);b.box(10.2,0.05,0.1,0x2ad0e0,x,0.26,z-d*0.6,0,1);
 for(const sx of[-1,1]){b.box(1.2,1.2,0.8,0x1a1a2a,x+sx*1.6,0.85,z+d*1);b.add(new T.TorusGeometry(0.4,0.06,6,24),sx<0?0x2ad0e0:0xc03ad0,x+sx*1.6,1.1,z+d*1-d*0.42,0,1);}
 b.box(0.9,1.3,0.7,0x222244,x-6,0.65,z-d*2);b.box(0.95,0.08,0.75,0xff5ab0,x-6,1.32,z-d*2,0,1);
 for(let k=0;k<5;k++)b.add(new T.TorusGeometry(2+k*1.6,0.07,4,40),k%2?0xc03ad0:0x2ad0e0,x,8.8,z,0,1,Math.PI/2);
 grada(o,[0xc03ad0,0x2ad0e0,0xff5ab0,0xffffff]);foto(o,'ref_platos/ruedalaletra.jpg',-1);};
/* Pasapalabra (Antena 3): mesa redonda blanca con aro azul, dos roscos, suelo azul con letras, paneles naranjas, marcadores de bote.
   s.montaje=true → plató a medio montar (sillas envueltas en plástico, cajas): se usa en el Making of. */
R.pasapalabra=o=>{base(o);const {b,T,x,z,d,s}=o;
 /* 1.68: más fiel a la foto: todo azul brillante, letras blancas grandes por el suelo, tarima redonda con la mesa, cinta curva del bote arriba y pared LED azul */
 const fl=tx(T,cv(1024,1024,(g,w)=>{const gr=g.createRadialGradient(w/2,w/2,40,w/2,w/2,w/2);gr.addColorStop(0,'#3a8af0');gr.addColorStop(1,'#0a3ab0');g.fillStyle=gr;g.fillRect(0,0,w,w);g.strokeStyle='rgba(190,230,255,.6)';g.lineWidth=3;for(let r=150;r<512;r+=90){g.beginPath();g.arc(w/2,w/2,r,0,7);g.stroke();}const L='ABCDEFGHIJLMNÑOPQRSTUVXYZ';g.textAlign='center';for(let i=0;i<40;i++){const a=i*2.4,r=140+(i*53)%300;g.save();g.translate(w/2+Math.cos(a)*r,w/2+Math.sin(a)*r);g.rotate(a*1.7);g.fillStyle='#ffffff';g.font='bold '+(70+(i*17)%50)+'px sans-serif';g.fillText(L[(i*7)%25],0,20);g.restore();}}));
 mesh(o,new T.CircleGeometry(12,56),fl,x,0.2,z,-Math.PI/2);
 b.cyl(4.2,4.4,0.35,0xc8dcf0,x,0.17,z+d*1,40);b.add(new T.TorusGeometry(4.3,0.07,4,64),0x8ad8ff,x,0.36,z+d*1,0,1,Math.PI/2);
 b.cyl(2.6,2.6,0.12,0xf4f6fa,x,1.4,z+d*1,40);b.cyl(2.65,2.65,0.08,0x3a8aff,x,1.31,z+d*1,40,1);b.cyl(2.1,2.3,0.9,0xd0dcea,x,0.85,z+d*1,32);
 for(const sx of[-1,1]){b.cyl(0.04,0.04,0.9,0xcccccc,x+sx*1.6,0.8,z+d*1-d*2.2,6);b.cyl(0.3,0.3,0.1,s.montaje?0xd8e4ee:0x111111,x+sx*1.6,1.25,z+d*1-d*2.2,12);}
 const led=tx(T,cv(1024,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#5ab8ff');gr.addColorStop(1,'#1a5ad8');g.fillStyle=gr;g.fillRect(0,0,w,h);g.fillStyle='rgba(255,255,255,.25)';for(let i=0;i<w;i+=16)g.fillRect(i,0,2,h);for(let i=0;i<50;i++){g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.arc((i*131)%w,(i*71)%h,3+i%5,0,7);g.fill();}}));
 arc(o,11.6,5.6,3.2,led,back(o)-1.9,back(o)+1.9);
 const cin=tx(T,cv(1024,64,(g,w,h)=>{g.fillStyle='#0a4ad0';g.fillRect(0,0,w,h);g.fillStyle='#bfe8ff';g.fillRect(0,0,w,3);g.fillRect(0,h-3,w,3);g.fillStyle='#fff';g.font='900 40px Arial';for(let i=0;i<4;i++)g.fillText('994.000 €',30+i*256,47);}));
 arc(o,11.4,1.0,6.6,cin,back(o)-1.9,back(o)+1.9);
 const rosco=tx(T,cv(512,512,(g,w)=>{g.fillStyle='#04124a';g.beginPath();g.arc(w/2,w/2,w/2,0,7);g.fill();const L='ABCDEFGHIJLMNÑOPQRSTUVXYZ';for(let i=0;i<25;i++){const a=i/25*6.283-1.57,px=w/2+Math.cos(a)*200,py=w/2+Math.sin(a)*200;g.fillStyle='#1e6aff';g.beginPath();g.arc(px,py,26,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=3;g.stroke();g.fillStyle='#fff';g.font='900 30px Arial';g.textAlign='center';g.fillText(L[i],px,py+11);}g.fillStyle='#ff8a1a';g.beginPath();g.arc(w/2,w/2,70,0,7);g.fill();}));
 for(const sx of[-1,1])mesh(o,new T.CircleGeometry(2.2,40),rosco,x+sx*6.2,3.6,z+d*10.9,0,back(o)+Math.PI,{transparent:true});
 const logo=tx(T,cv(1024,512,(g,w,h)=>{g.fillStyle='#1a6ae8';g.fillRect(0,0,w,h);g.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<w;i+=24)g.fillRect(i,0,2,h);g.fillStyle='#fff';g.font='italic 900 120px Arial';g.textAlign='center';g.fillText('pasapalabra',w/2,h/2+40);}));
 mesh(o,new T.PlaneGeometry(7,3.5),logo,x,3.4,z+d*11.2,0,back(o)+Math.PI);
 const vid=tx(T,cv(512,128,(g,w,h)=>{g.fillStyle='rgba(180,225,255,.25)';g.fillRect(0,0,w,h);g.strokeStyle='#e8f6ff';g.lineWidth=4;g.strokeRect(2,2,w-4,h-4);g.fillStyle='rgba(255,255,255,.85)';g.font='italic 900 80px Arial';const L='SVAÑFGRHOT';for(let i=0;i<6;i++)g.fillText(L[i],10+i*84,100);}));
 for(let k=0;k<7;k++){const a=Math.PI-back(o)-0.9+k*0.3;mesh(o,new T.PlaneGeometry(2.2,0.9),vid,x+Math.sin(a)*8.2,0.6,z+Math.cos(a)*8.2,0,a,{transparent:true});}
 if(s.montaje){for(let k=0;k<10;k++){const xx=x-7+(k%5)*3.4,zz=z-d*(5+Math.floor(k/5)*1.6);b.box(0.6,0.5,0.6,0xd8e8f0,xx,0.25,zz,0,0.15);b.box(0.6,0.7,0.12,0xc8dce8,xx,0.75,zz+d*0.25,0,0.15);}
  for(let k=0;k<6;k++)b.box(1,0.8,1,0xa8784a,x+5+(k%3)*1.1,0.4+Math.floor(k/3)*0.8,z+d*5);b.cyl(0.05,0.05,4,0x666666,x-4,2,z+d*5,6);b.box(3,0.1,0.1,0x666666,x-4,4,z+d*5);}
 else grada(o,[0x1e6aff,0x5ad1ff,0xffffff,0xe8841a]);
 foto(o,s.montaje?'ref_platos/pasapalabra_montaje.jpg':'ref_platos/pasapalabra.jpg',-1);};
/* El Cazador (RTVE, foto ref): pared de hexágonos azules/lila, tarima blanca de paneles de luz con canto azul LED, mesa del equipo blanca con pantalla de bote,
   atril elevado del cazador a la derecha con fondo de hexágonos rojos/rosas */
R.cazador=o=>{base(o);const {b,T,x,z,d}=o;
 const hex=tx(T,cv(512,256,(g,w,h)=>{g.fillStyle='#050a40';g.fillRect(0,0,w,h);for(let j=0;j<h+40;j+=34)for(let i=0;i<w+40;i+=40){const cx=i+((j/34)%2?20:0),cy=j;g.fillStyle=(i*3+j)%7<2?'rgba(190,120,255,.35)':'rgba(40,110,255,.35)';g.strokeStyle='#5ab8ff';g.lineWidth=3;g.beginPath();for(let k=0;k<6;k++){const a=k/6*6.283+0.52;g.lineTo(cx+Math.cos(a)*17,cy+Math.sin(a)*17);}g.closePath();g.fill();g.stroke();}}));hex.wrapS=T.RepeatWrapping;hex.repeat.set(4,1);
 arc(o,11.5,6,4,hex,back(o)-1.9,back(o)+1.9);
 b.box(26,0.06,26,0x02040c,x,0.05,z);
 const pan=tx(T,cv(256,128,(g,w,h)=>{g.fillStyle='#eef3fa';g.fillRect(0,0,w,h);g.strokeStyle='#c8d2e0';g.lineWidth=3;for(let i=0;i<w;i+=32){g.beginPath();g.moveTo(i,0);g.lineTo(i,h);g.stroke();}for(let j=0;j<h;j+=32){g.beginPath();g.moveTo(0,j);g.lineTo(w,j);g.stroke();}}));
 /* 1.68: tarima redondeada con canto LED azul y suelo negro brillante como en la foto */mesh(o,new T.CircleGeometry(6.2,48),pan,x+0.5,0.61,z+d*1,-Math.PI/2);b.cyl(6.3,6.3,0.32,0xeef3fa,x+0.5,0.44,z+d*1,48);b.cyl(6.45,6.45,0.28,0x2a8aff,x+0.5,0.14,z+d*1,48,1);b.add(new T.TorusGeometry(6.4,0.08,4,64),0x8ad8ff,x+0.5,0.3,z+d*1,0,1,Math.PI/2);
 // mesa del equipo (izquierda): blanca con pantalla azul de bote
 const bote=tx(T,cv(512,128,(g,w,h)=>{g.fillStyle='#0a1a6a';g.fillRect(0,0,w,h);g.fillStyle='#ffd25a';g.font='900 70px Arial';g.textAlign='center';g.fillText('65.000 €',w/2+60,95);}));
 b.box(3.6,1.1,1,0xf2f4f8,x+3.6,1.0,z+d*2.4);b.box(3.7,0.08,1.1,0xffffff,x+3.6,1.58,z+d*2.4);mesh(o,new T.PlaneGeometry(3.4,0.9),bote,x+3.6,1.0,z+d*2.4-d*0.52,0,back(o)+Math.PI);
 // atril elevado del cazador (derecha) y fondo rojo/rosa
 const cx=x-5.6,cz=z+d*4.5;b.box(3.2,2.2,1.6,0x0a1440,cx,1.1,cz);b.box(3.6,0.15,1.9,0x2a8aff,cx,2.28,cz,0,1);b.box(3.4,0.9,0.15,0x1a2a6a,cx,2.8,cz-d*0.8);
 const roj=tx(T,cv(256,256,(g,w,h)=>{g.fillStyle='#d01a4a';g.fillRect(0,0,w,h);g.strokeStyle='#ff7aa0';g.lineWidth=5;for(let j=0;j<h+40;j+=40)for(let i=0;i<w+40;i+=46){const px=i+((j/40)%2?23:0);g.beginPath();for(let k=0;k<6;k++){const a=k/6*6.283+0.52;g.lineTo(px+Math.cos(a)*20,j+Math.sin(a)*20);}g.closePath();g.stroke();}}));
 mesh(o,new T.PlaneGeometry(4.2,4.5),roj,cx-0.4,3.6,cz+d*1.2,0,back(o)+Math.PI);
 const lg=tx(T,cv(512,128,(g,w,h)=>{g.fillStyle='#061040';g.fillRect(0,0,w,h);g.fillStyle='#fff';g.font='900 72px Arial';g.textAlign='center';g.fillText('EL CAZADOR',w/2,90);}));
 mesh(o,new T.PlaneGeometry(6,1.5),lg,x-2,7.6,z+d*11.2,0,back(o)+Math.PI);
 for(let k=0;k<7;k++)b.box(0.12,5,0.12,0x2a8aff,x-9+k*3,6.5,z+d*11.0,0,1);
 grada(o,[0x1e6aff,0x2ad8ff,0xffffff,0xd01a4a]);foto(o,'ref_platos/cazador.jpg',-1);};
/* Reacción en cadena («Retando a los mozos», fotos ref 67RM/6AQT/6CQH/6F6R): pared LED de grietas blanco-celeste, cinta azul «RETANDO A LOS MOZOS», suelo redondo celeste brillante con logo, dos atriles azules de tapa blanca y sofás blancos del público */
R.reaccionencadena=o=>{base(o);const {b,T,x,z,d}=o;
 const wall=tx(T,cv(1024,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#1a5ad0');gr.addColorStop(1,'#0a2a8a');g.fillStyle=gr;g.fillRect(0,0,w,h);for(let i=0;i<260;i++){g.strokeStyle=i%4?'rgba(200,235,255,.85)':'#ffffff';g.lineWidth=1+i%3;g.beginPath();let px=(i*97)%w,py=(i*61)%h;g.moveTo(px,py);for(let k=0;k<3;k++){px+=((i*(k+3)*29)%90)-45;py+=((i*(k+5)*17)%70)-35;g.lineTo(px,py);}g.stroke();}}));
 arc(o,11.5,5.2,3.6,wall,back(o)-1.9,back(o)+1.9);
 const cin=tx(T,cv(1024,64,(g,w,h)=>{g.fillStyle='#0a3ab0';g.fillRect(0,0,w,h);g.fillStyle='#bfe8ff';g.fillRect(0,0,w,4);g.fillRect(0,h-4,w,4);g.fillStyle='#fff';g.font='900 30px Arial';for(let i=0;i<3;i++)g.fillText('RETANDO A LOS MOZOS',8+i*341,44);}));
 arc(o,11.4,1.1,6.8,cin,back(o)-1.9,back(o)+1.9);
 b.box(26,0.06,26,0x2a6ad0,x,0.05,z,0,0.2);
 const fl=tx(T,cv(512,512,(g,w)=>{const gr=g.createRadialGradient(w/2,w/2,20,w/2,w/2,w/2);gr.addColorStop(0,'#e8f6ff');gr.addColorStop(.7,'#9fd0f5');gr.addColorStop(1,'#5aa0e0');g.fillStyle=gr;g.fillRect(0,0,w,w);g.strokeStyle='#ffffff';g.lineWidth=5;for(const r of[120,200,250]){g.beginPath();g.arc(w/2,w/2,r,0,7);g.stroke();}g.fillStyle='#e0287a';g.fillRect(w/2-70,w/2-34,140,68);g.fillStyle='#fff';g.font='italic 900 30px Arial';g.textAlign='center';g.fillText('retando',w/2,w/2-4);g.fillText('a los mozos',w/2,w/2+26);}));
 b.cyl(6.2,6.4,0.3,0x8ac8f0,x,0.15,z,40);mesh(o,new T.CircleGeometry(6.1,48),fl,x,0.31,z,-Math.PI/2);b.add(new T.TorusGeometry(6.3,0.06,4,64),0xffffff,x,0.33,z,0,1,Math.PI/2);
 b.box(0.5,1.1,0.4,0xd8e4f0,x+0.6,0.85,z-d*0.8);
 const pt=tx(T,cv(256,128,(g,w,h)=>{g.fillStyle='#0a2a9a';g.fillRect(0,0,w,h);g.strokeStyle='#5ab8ff';g.lineWidth=2;for(let i=0;i<w;i+=10){g.beginPath();g.moveTo(i,0);g.lineTo(i,h);g.stroke();}}));
 for(const sx of[-1,1]){const px=x+sx*3.8,pz=z+d*4.2;b.box(3.2,1.3,1,0x0a2a9a,px,0.95,pz);b.box(3.4,0.12,1.2,0xffffff,px,1.66,pz,0,0.7);mesh(o,new T.PlaneGeometry(3.1,1.2),pt,px,0.95,pz-d*0.51,0,back(o)+Math.PI);}
 for(let r=0;r<2;r++)b.box(1.2,0.5,8,0xf2f4f8,x+9.5+r*1.3,0.3+r*0.3,z-d*3);
 grada(o,[0xffffff,0x5ad8ff,0x1a4ae0,0xe0287a]);foto(o,'ref_platos/reaccionencadena.jpg',-1);};
/* 25 Palabras (foto ref): pared LED azul con franjas verticales cian y ámbar, cinta «La apuesta» rosa arriba, doble aro de luz colgado, sofá amarillo, atril blanco y logo 25 en el suelo */
R.veinticinco=o=>{base(o);const {b,T,x,z,d}=o;
 const wall=tx(T,cv(1024,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#0a2aa0');gr.addColorStop(1,'#0a5ad8');g.fillStyle=gr;g.fillRect(0,0,w,h);for(let i=6;i<w;i+=22){g.fillStyle=(i/22|0)%9==4?'#ffb43a':((i/22|0)%3?'#2ad8ff':'#bff4ff');g.fillRect(i,h*.08,5,h*.84);}g.fillStyle='#0a1a6a';g.fillRect(0,h*.47,w,h*.06);g.fillStyle='#ff3aa0';g.fillRect(0,h*.46,w,3);}));
 arc(o,11.5,6,3.4,wall,back(o)-1.9,back(o)+1.9);
 const cin=tx(T,cv(1024,64,(g,w,h)=>{g.fillStyle='#14143a';g.fillRect(0,0,w,h);g.fillStyle='#ff3aa0';g.fillRect(0,0,w,6);g.fillRect(0,h-6,w,6);g.fillStyle='#fff';g.font='italic 900 34px Arial';for(let i=0;i<4;i++)g.fillText('La apuesta',30+i*256,46);}));
 arc(o,11.4,0.9,6.9,cin,back(o)-1.9,back(o)+1.9);
 b.add(new T.TorusGeometry(3.2,0.18,6,48),0xbfe8ff,x,8.6,z+d*3,1.25,1,0);b.add(new T.TorusGeometry(2.1,0.14,6,40),0x5ad8ff,x+0.4,8.0,z+d*3,1.4,1,0.3);
 const fl=tx(T,cv(512,512,(g,w)=>{g.fillStyle='#8aa8c8';g.fillRect(0,0,w,w);g.strokeStyle='#e8f4ff';g.lineWidth=14;g.beginPath();g.arc(w/2,w/2,w*.4,0,7);g.stroke();g.fillStyle='#e8f4ff';g.font='900 220px Arial';g.textAlign='center';g.fillText('25',w/2,w/2+78);}));
 b.box(24,0.06,24,0x6a88b0,x,0.06,z,0,0.15);mesh(o,new T.CircleGeometry(3,40),fl,x,0.1,z-d*2.5,-Math.PI/2,0);
 const so=x+2.2,sz=z+d*5.5;b.box(4.6,0.55,1.3,0xffc81a,so,0.4,sz);b.box(4.6,1.1,0.4,0xffc81a,so,0.95,sz+d*0.55);for(const k of[-1,1])b.box(0.4,0.9,1.3,0xffc81a,so+k*2.3,0.6,sz);for(let k=0;k<4;k++)b.box(1,0.5,0.25,0xffd84a,so-1.6+k*1.07,1.25,sz+d*0.4);
 b.box(1.8,1.3,0.9,0xf2f4f8,x-3.6,0.75,z+d*3.2,0,0.4);b.box(1.9,0.08,1,0xffffff,x-3.6,1.42,z+d*3.2);
 const lg=tx(T,cv(256,256,(g,w)=>{g.fillStyle='#1a3ab0';g.beginPath();g.arc(w/2,w/2,w/2,0,7);g.fill();g.fillStyle='#ff4ab0';g.beginPath();g.arc(w/2,w/2,w*.42,0,7);g.fill();g.fillStyle='#fff';g.font='900 130px Arial';g.textAlign='center';g.fillText('25',w/2,w/2+30);g.font='italic 800 40px Arial';g.fillText('palabras',w/2,w/2+80);}));
 mesh(o,new T.CircleGeometry(1.8,32),lg,x-7.2,3.6,z+d*8.6,0,back(o)+Math.PI-0.55,{transparent:true});
 for(let k=0;k<9;k++)b.box(0.08,4,0.08,k%2?0x2ad8ff:0xffffff,x-8+k*2,6+((k*3)%4),z+d*6,0.3,1);
 grada(o,[0xffc81a,0x2ad8ff,0x1a4ae0,0xff3aa0]);foto(o,'ref_platos/veinticinco.jpg',-1);};
})();
