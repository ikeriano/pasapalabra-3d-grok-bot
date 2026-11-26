'use strict';
/* v0.30 · «Plató real» de Pasapalabra (Antena 3) replicado de las fotos de Iker (ref/platos_reales/pasapalabra): suelo azul brillante con letras
   blancas, tarima redonda blanca con aro LED, barandilla de cristal con letras, pared LED curva azul con el logo y dos roscos, cinta del bote
   «994.000 €» y cinta «pasapalabra», paneles naranjas de madera, gradas de público, escaleras con LED y aro de luz blanco. Pocas mallas (Redmi A2). */
window.PLATOREAL30=function(T){const g=new T.Group();g.name='platoReal30';const PI=Math.PI;
 const cvt=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;};
 const MB=(o)=>new T.MeshBasicMaterial(o),ML=c=>new T.MeshLambertMaterial({color:c});
 const add=(geo,mat,x,y,z,rx,ry,rz)=>{const m=new T.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);m.rotation.set(rx||0,ry||0,rz||0);g.add(m);return m;};
 const LT='ABCDEFGHIJLMNÑOPQRSTUVXYZ';
 // suelo
 const fl=cvt(1024,1024,(c,w)=>{const gr=c.createRadialGradient(w/2,w/2,30,w/2,w/2,w/2);gr.addColorStop(0,'#2a7ff0');gr.addColorStop(.55,'#0b45c8');gr.addColorStop(1,'#061e6a');c.fillStyle=gr;c.fillRect(0,0,w,w);
  c.strokeStyle='rgba(170,220,255,.55)';c.lineWidth=4;for(let r=170;r<512;r+=85){c.beginPath();c.arc(w/2,w/2,r,0,7);c.stroke();}
  c.textAlign='center';for(let i=0;i<46;i++){const a=i*2.39,r=200+(i*61)%300;c.save();c.translate(w/2+Math.cos(a)*r,w/2+Math.sin(a)*r);c.rotate(a*1.3);c.fillStyle=i%5?'rgba(255,255,255,.92)':'rgba(140,210,255,.9)';c.font='900 '+(60+(i*23)%60)+'px Arial';c.fillText(LT[(i*7)%25],0,22);c.restore();}});
 add(new T.CircleGeometry(15,64),MB({map:fl}),0,.015,-1,-PI/2);
 // tarima redonda blanca con aro LED
 const tar=new T.Mesh(new T.CylinderGeometry(5.4,5.6,.22,48),ML(0xe9f0f8));tar.position.set(0,.11,-.6);g.add(tar);
 add(new T.TorusGeometry(5.5,.06,6,72),MB({color:0x8ae0ff}),0,.23,-.6,PI/2);
 add(new T.TorusGeometry(2.4,.05,6,48),MB({color:0x3aa0ff}),0,.24,-.6,PI/2);
 // barandilla de cristal (arco delantero) con letras
 const gl=cvt(1024,128,(c,w,h)=>{c.fillStyle='rgba(170,220,255,.22)';c.fillRect(0,0,w,h);c.strokeStyle='#e8f6ff';c.lineWidth=5;c.strokeRect(2,2,w-4,h-4);c.fillStyle='rgba(255,255,255,.85)';c.font='italic 900 92px Arial';for(let i=0;i<10;i++)c.fillText(LT[(i*3+4)%25],12+i*102,104);});
 gl.wrapS=T.RepeatWrapping;gl.repeat.x=3;
 add(new T.CylinderGeometry(9.2,9.2,1.05,64,1,true,-1.15,2.3),MB({map:gl,transparent:true,side:T.DoubleSide,depthWrite:false}),0,.55,-1);
 // pared LED curva con logo y roscos
 const led=cvt(2048,512,(c,w,h)=>{const gr=c.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#3a9cff');gr.addColorStop(1,'#0c3fc0');c.fillStyle=gr;c.fillRect(0,0,w,h);
  c.fillStyle='rgba(255,255,255,.14)';for(let x=0;x<w;x+=18)c.fillRect(x,0,2,h);for(let i=0;i<70;i++){c.fillStyle='rgba(255,255,255,.45)';c.beginPath();c.arc((i*157)%w,(i*83)%h,2+i%4,0,7);c.fill();}
  // logo central
  c.fillStyle='#1660e0';c.fillRect(w/2-330,h/2-110,660,220);c.strokeStyle='#bfe8ff';c.lineWidth=6;c.strokeRect(w/2-330,h/2-110,660,220);c.fillStyle='#fff';c.font='italic 900 120px Arial';c.textAlign='center';c.fillText('pasapalabra',w/2,h/2+42);
  // dos roscos naranjas
  for(const cx of[w*.2,w*.8]){for(let i=0;i<25;i++){const a=i/25*6.283-1.57;c.fillStyle='#1e6aff';c.beginPath();c.arc(cx+Math.cos(a)*160,h/2+Math.sin(a)*160,22,0,7);c.fill();c.strokeStyle='#fff';c.lineWidth=3;c.stroke();c.fillStyle='#fff';c.font='900 24px Arial';c.fillText(LT[i],cx+Math.cos(a)*160,h/2+Math.sin(a)*160+9);}
   const rg=c.createRadialGradient(cx,h/2,10,cx,h/2,110);rg.addColorStop(0,'#ffd06a');rg.addColorStop(.6,'#ff7a1a');rg.addColorStop(1,'#e8401a');c.fillStyle=rg;c.beginPath();c.arc(cx,h/2,110,0,7);c.fill();}});
 led.wrapS=T.RepeatWrapping;led.repeat.x=-1;
 add(new T.CylinderGeometry(13,13,6.2,64,1,true,PI-1.25,2.5),MB({map:led,side:T.DoubleSide}),0,3.1,-1);
 // cintas superiores: bote y «pasapalabra»
 const cin=(txt,bg)=>{const t=cvt(2048,96,(c,w,h)=>{c.fillStyle=bg;c.fillRect(0,0,w,h);c.fillStyle='#bfe8ff';c.fillRect(0,0,w,4);c.fillRect(0,h-4,w,4);c.fillStyle='#fff';c.font='900 64px Arial';c.textAlign='center';for(let i=0;i<5;i++)c.fillText(txt,w*(i+.5)/5,72);});t.wrapS=T.RepeatWrapping;t.repeat.x=-1;return t;};
 add(new T.CylinderGeometry(12.6,12.6,.9,64,1,true,PI-1.6,3.2),MB({map:cin('994.000 €','#0a3ad0'),side:T.DoubleSide}),0,7.0,-1);
 add(new T.CylinderGeometry(12.2,12.2,.8,64,1,true,PI-1.6,3.2),MB({map:cin('pasapalabra','#1a7af0'),side:T.DoubleSide}),0,6.15,-1);
 // aro de luz blanco detrás del presentador (foto 8)
 add(new T.TorusGeometry(3.3,.12,8,64,PI),MB({color:0xf4fbff}),0,0,-9.6);
 add(new T.TorusGeometry(3.7,.05,6,64,PI),MB({color:0x5ad1ff}),0,0,-9.65);
 // paneles naranjas de madera (fotos 4 y 6)
 const wood=cvt(128,512,(c,w,h)=>{const gr=c.createLinearGradient(0,0,w,0);gr.addColorStop(0,'#e8641a');gr.addColorStop(.5,'#ffb04a');gr.addColorStop(1,'#e8641a');c.fillStyle=gr;c.fillRect(0,0,w,h);c.strokeStyle='rgba(120,50,0,.25)';for(let y=0;y<h;y+=9){c.beginPath();c.moveTo(0,y);c.bezierCurveTo(40,y+6,80,y-6,w,y+3);c.stroke();}});
 const wm=MB({map:wood});for(let i=0;i<3;i++)add(new T.BoxGeometry(1.1,4.6,.25),wm,-6.6+i*1.35,2.3,-9.2+i*.25,0,.45);
 // gradas de público con escaleras LED
 const seatC=[0x1e6aff,0xffffff,0xff8a1a,0x5ad1ff,0x2a2a3a];
 for(const sx of[-1,1]){for(let r=0;r<4;r++){const st=new T.Mesh(new T.BoxGeometry(2.2,.5,9),ML(0x1a2440));st.position.set(sx*(10.2+r*1.3),.25+r*.5,0);st.scale.y=1+r;st.position.y=(.5*(1+r))/2;g.add(st);
   const pp=new T.InstancedMesh(new T.SphereGeometry(.26,8,6),ML(0xffffff),10);const m4=new T.Matrix4(),col=new T.Color();for(let k=0;k<10;k++){m4.setPosition(sx*(10.2+r*1.3),.5*(1+r)+.35,-4+k*.9);pp.setMatrixAt(k,m4);pp.setColorAt(k,col.setHex(seatC[(k+r)%seatC.length]));}g.add(pp);}
  add(new T.BoxGeometry(.06,.06,9.2),MB({color:0x8ae0ff}),sx*9.1,.52,0);}
 return g;};
