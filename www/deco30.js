// v0.30 · Decoración de ediciones especiales (cabecera 3D y plató). 🆕 INVENTADO. Halloween: calabazas, telarañas y luces morado/naranja; otras: emojis del tema flotando y luces del color del tema.
window.DECO30=(function(){
const XM=/navidad|findeano|reyes|nochebuena|mayores/;
function cv(w,h,f){const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);if('colorSpace' in t)t.colorSpace=T.SRGBColorSpace;return t;}
let GLOW=null;function glowT(){return GLOW||(GLOW=cv(128,128,(c,w)=>{const g=c.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.4,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,0,128,128);}));}
function glow(col,s){const m=new T.Sprite(new T.SpriteMaterial({map:glowT(),color:col,blending:T.AdditiveBlending,depthWrite:false,transparent:true,opacity:.75}));m.scale.setScalar(s);m.userData.glow=1;return m;}
function face(){return cv(256,256,(c)=>{c.fillStyle='#ffd23a';c.shadowColor='#ffae00';c.shadowBlur=18;
 c.beginPath();c.moveTo(70,95);c.lineTo(110,95);c.lineTo(90,60);c.fill();c.beginPath();c.moveTo(146,95);c.lineTo(186,95);c.lineTo(166,60);c.fill();
 c.beginPath();c.moveTo(60,140);c.quadraticCurveTo(128,215,196,140);c.lineTo(170,150);c.lineTo(155,135);c.lineTo(140,155);c.lineTo(116,155);c.lineTo(101,135);c.lineTo(86,150);c.closePath();c.fill();});}
let FACE=null;
function pumpkin(r){const g=new T.Group();const mat=new T.MeshLambertMaterial({color:0xff7a12,emissive:0x5a1e00});
 for(let i=0;i<8;i++){const s=new T.Mesh(new T.SphereGeometry(r*.55,14,10),mat);const a=i/8*Math.PI*2;s.position.set(Math.cos(a)*r*.42,0,Math.sin(a)*r*.42);s.scale.set(.8,1.05,.8);g.add(s);}
 const core=new T.Mesh(new T.SphereGeometry(r*.8,16,12),mat);core.scale.y=.85;g.add(core);
 const st=new T.Mesh(new T.CylinderGeometry(r*.08,r*.12,r*.4,8),new T.MeshLambertMaterial({color:0x3f6a1a}));st.position.y=r*.75;st.rotation.z=.25;g.add(st);
 const f=new T.Mesh(new T.PlaneGeometry(r*1.3,r*1.3),new T.MeshBasicMaterial({map:FACE||(FACE=face()),transparent:true,depthWrite:false}));f.position.set(0,0,r*.92);g.add(f);
 const gl=glow(0xffa020,r*3.2);gl.position.z=r*.6;g.add(gl);g.position.y=r*.8;return g;}
function web(R){const pts=[];const N=8;for(let i=0;i<N;i++){const a=i/N*Math.PI*2;pts.push(0,0,0,Math.cos(a)*R,Math.sin(a)*R,0);}
 for(let k=1;k<=5;k++){const rr=R*k/5.4;for(let i=0;i<N;i++){const a=i/N*Math.PI*2,b=(i+1)/N*Math.PI*2,s=.9;pts.push(Math.cos(a)*rr,Math.sin(a)*rr,0,Math.cos((a+b)/2)*rr*s,Math.sin((a+b)/2)*rr*s,0,Math.cos((a+b)/2)*rr*s,Math.sin((a+b)/2)*rr*s,0,Math.cos(b)*rr,Math.sin(b)*rr,0);}}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pts,3));
 const l=new T.LineSegments(g,new T.LineBasicMaterial({color:0xf2f2ff,transparent:true,opacity:.85}));
 const sp=new T.Mesh(new T.SphereGeometry(R*.07,8,6),new T.MeshBasicMaterial({color:0x111111}));sp.position.set(R*.2,-R*.35,.01);l.add(sp);return l;}
function emo(ch,s){const t=cv(128,128,(c)=>{c.font='100px "Noto Color Emoji",sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(ch,64,70);});const m=new T.Sprite(new T.SpriteMaterial({map:t,transparent:true,depthWrite:false}));m.scale.setScalar(s);return m;}
function temaInfo(id){try{return (typeof TEMA6!='undefined'?TEMA6:[]).find(x=>x.id==id)||{};}catch(e){return {};}}
function temaCol(id){try{const ti=temaInfo(id);return (typeof DR6!='undefined'&&(DR6[ti.dr]||DR6[id]))||null;}catch(e){return null;}}
// cluster(lado): un grupo decorativo de ~3 unidades de alto (u = tamaño de una unidad)
function cluster(tema,u,side){const g=new T.Group();g.userData.deco30=1;
 if(tema=='halloween'){[[0,0,0,.55],[side*.9,0,.5,.42],[-side*.7,0,.6,.32]].forEach(([x,y,z,r])=>{const p=pumpkin(r*u);p.position.x=x*u;p.position.z=z*u;g.add(p);});
  const w=web(1.3*u);w.position.set(side*.4*u,2.9*u,-.4*u);g.add(w);const w2=web(.8*u);w2.position.set(-side*.9*u,2.2*u,-.5*u);w2.rotation.z=.5;g.add(w2);
  [[0x9b3cff,0,1.6],[0xff7a18,side*1,1.0],[0x9b3cff,-side,2.4]].forEach(([c,x,y])=>{const s=glow(c,2.6*u);s.position.set(x*u,y*u,-.6*u);g.add(s);});
  [['🦇',side*.6,3.6],['👻',-side*.4,3.1],['🕷️',side*1.1,2.0]].forEach(([e,x,y],i)=>{const s=emo(e,.6*u);s.position.set(x*u,y*u,0);s.userData.fl=[x*u,y*u,i];g.add(s);});}
 else{const ti=temaInfo(tema);const em=[...(ti.emoji?ti.emoji:'')+((temaCol(tema)||{}).em||'🎉✨')].filter(c=>c.trim()&&!/\uFE0F|\u200D/.test(c)).slice(0,6);
  const tc=temaCol(tema)||{};const c1=new T.Color(tc.glow||'#ffd23a'),c2=new T.Color(tc.acc||'#38a0ff');
  em.forEach((e,i)=>{const s=emo(e,.9*u);const x=(side*.3+((i%3)-1)*.8)*u,y=(.6+Math.floor(i/3)*1.3+(i%2)*.3)*u;s.position.set(x,y,0);s.userData.fl=[x,y,i];g.add(s);});
  [[c1,0,1.2],[c2,side,2.4]].forEach(([c,x,y])=>{const s=glow(c,2.8*u);s.position.set(x*u,y*u,-.6*u);g.add(s);});}
 return g;}
function tick(g,t){g.traverse(o=>{const f=o.userData.fl;if(f){o.position.y=f[1]+Math.sin(t*1.6+f[2])*0.08*Math.abs(f[1]||1);}if(o.userData.glow)o.material.opacity=.55+.25*Math.sin(t*3+o.id);});}
function free(g){g.parent&&g.parent.remove(g);g.traverse(m=>{m.geometry&&m.geometry.dispose();if(m.material){m.material.map&&m.material.map!==GLOW&&m.material.map!==FACE&&m.material.map.dispose();m.material.dispose();}});}
function special(tema){return !!tema&&tema!='normal'&&!XM.test(tema);}
return {cluster,tick,free,special,XM};})();
// plató: decoración del tema (Halloween y demás especiales que no son de Navidad)
(function(){let D=null,cur='',tt=0,acc=0;anim(dt=>{acc+=dt;tt+=dt;if(acc>=.5){acc=0;const want=DECO30.special(OPT.tema)?OPT.tema:'';
 if(want!==cur){if(D){D.forEach(DECO30.free);D=null;}cur=want;if(want&&P.root){D=[-1,1].map(s=>{const g=DECO30.cluster(want,1,s);g.position.set(s*6.2,0,-3.6);P.root.add(g);return g;});}}}
 if(D)D.forEach(g=>DECO30.tick(g,tt));return true;});})();
