// v0.35 · La Silla Azul calcada del clip (Antena 3): pantalla partida estática, fondo azul claro, cajas de letra
(function(){
const css=document.createElement('style');css.textContent=`
#sa35{position:fixed;inset:0;pointer-events:none;z-index:40;display:none;font-family:N,Arial,sans-serif}
#sa35 .pn{position:absolute;top:2.5vh;bottom:2.5vh;width:calc(50% - 3vh);border:1.1vh solid #9fd8ff;border-radius:3vh;box-sizing:border-box;transition:border-color .2s}
#sa35 .pn.l{left:1.5vh}#sa35 .pn.r{right:1.5vh}
#sa35 .pn i{position:absolute;inset:.5vh;border-radius:2.3vh;border:.7vh solid #1b3fa8}
#sa35 .pn.l i{border-color:#e02a2a}
#sa35 .pn.bad{border-color:#e02a2a}
#sa35 .bx{position:absolute;left:4vh;bottom:5vh;background:#fff;border-radius:1.2vh;padding:.8vh 1.2vh;display:flex;gap:.8vh;align-items:center;box-shadow:0 .4vh 1vh #0004}
#sa35 .bx b{font:900 6vh/1 N,Arial;color:#1b4fd0;width:6vh;text-align:center}
#sa35 .bx s{display:block;width:5vh;height:5vh;border-radius:.8vh;background:#25c23c;text-decoration:none}
#sa35 .bx s.x{background:#e0262a}
#sa35t{position:fixed;left:50%;top:38%;transform:translate(-50%,-50%);display:none;gap:6vh;z-index:41}
#sa35t div{width:20vh;height:20vh;background:#fff;border:1.4vh solid #1d63e0;border-radius:2.6vh;font:900 15vh/20vh N,Arial;color:#1d63e0;text-align:center;box-shadow:0 1vh 3vh #0005;cursor:pointer;pointer-events:auto}
#sa35b{position:fixed;left:50%;bottom:9vh;transform:translateX(-50%);display:none;z-index:41;background:linear-gradient(#13307e,#0a1d52);border:.5vh solid #6fb8ff;border-radius:1.4vh;padding:1.4vh 4vh;color:#fff;font:900 5vh/1 N,Arial;text-align:center}
#sa35b small{display:block;font:800 2.4vh/1.4 N,Arial;color:#9fd2ff;letter-spacing:.2em}`;
document.head.appendChild(css);
const ov=document.createElement('div');ov.id='sa35';
ov.innerHTML=[0,1].map(i=>`<div class="pn ${i?'r':'l'}"><i></i><div class="bx"><b>?</b><s></s><s></s></div></div>`).join('');document.body.appendChild(ov);
const tl=document.createElement('div');tl.id='sa35t';document.body.appendChild(tl);
const pl=document.createElement('div');pl.id='sa35p';pl.style.cssText='position:fixed;left:4vh;bottom:8vh;display:none;flex-direction:column;gap:1vh;z-index:41';document.body.appendChild(pl);
const bn=document.createElement('div');bn.id='sa35b';bn.innerHTML='<small>BOTE ACUMULADO</small>1.216.000 €';document.body.appendChild(bn);
// fondo estilizado azul claro (letras difuminadas) detrás de cada concursante
function bgTex(){const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,512,512);g.addColorStop(0,'#3fb2f2');g.addColorStop(1,'#7fd4ff');x.fillStyle=g;x.fillRect(0,0,512,512);
 x.font='900 120px Arial';let k=7;const r=()=>(k=(k*9301+49297)%233280)/233280;for(let n=0;n<26;n++){x.save();x.translate(r()*512,r()*512);x.rotate(r()*6.28);x.fillStyle=`rgba(255,255,255,${.10+r()*.18})`;x.fillText('ABCDEFGHIJLMNOPRSTUVZ'[n%21],-40,40);x.restore();}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
let BG=null,HD=null,DR=null;
function who(){return [P.ply,P.cpu];}
function head(p){const b=new THREE.Box3().setFromObject(p);return new THREE.Vector3((b.min.x+b.max.x)/2,b.max.y-.2,(b.min.z+b.max.z)/2);}
function setup(){const ps=who();HD=ps.map(p=>{p.updateMatrixWorld(true);return head(p);});
 if(!BG){const m=new THREE.MeshBasicMaterial({map:bgTex(),depthWrite:true});BG=ps.map(()=>new THREE.Mesh(new THREE.PlaneGeometry(3.4,3.4),m));BG.forEach(b=>S.add(b));}
 DR=ps.map(p=>{const v=new THREE.Vector3();p.getWorldDirection(v);v.y=0;return v.normalize();});ps.forEach((p,i)=>{const h=HD[i];const d=DR[i];const b=BG[i];b.position.copy(h).addScaledVector(d,-.75).setY(h.y-.35);b.lookAt(h.x+d.x*5,b.position.y,h.z+d.z*5);b.visible=true;});}
function shots(){return HD.map((h,i)=>{const d=DR[i];const l=h.clone().setY(h.y-.38);return [i,{p:l.clone().addScaledVector(d,2.3).setY(h.y-.25),l,f:27,dr:.004}];});}
function split(on){if(on){setup();window.SPLIT_SH=shots;MODE.split=true;ov.style.display='block';}else{MODE.split=false;window.SPLIT_SH=null;ov.style.display='none';BG&&BG.forEach(b=>b.visible=false);}}
function setBox(i,L,f){const pn=ov.children[i];pn.querySelector('b').textContent=L||'?';[...pn.querySelectorAll('s')].forEach((s,k)=>s.classList.toggle('x',k<f));pn.classList.toggle('bad',f>0);}
function tiles(ls,cb){tl.innerHTML=ls.map(L=>`<div>${L}</div>`).join('');tl.style.display=ls.length?'flex':'none';[...tl.children].forEach((d,i)=>d.onpointerdown=e=>{e.preventDefault();tl.style.display='none';cb&&cb(ls[i]);});}
async function silla35(rid){const a3=OPT.a3;OPT.a3=1;try{return await silla35b(rid);}finally{OPT.a3=a3;}}
const NM=['Iván Robledo','Andrés Valcárcel'];// 🆕 INVENTADO
function pills(on){pl.innerHTML=on?['Dirección: Marta Olmedo 🆕 INVENTADO','Realización: Javier Prieto 🆕 INVENTADO','Producción: Showtime TV'].map(t=>`<span style="background:#1d4fd0;color:#fff;border-radius:3vh;padding:.8vh 2.2vh;font:800 2.6vh N,Arial;width:max-content">${t}</span>`).join(''):'';pl.style.display=on?'flex':'none';}
async function opening(rid){
 pills(true);try{if(typeof cab2020=='function'&&!window.__sa35auto)await cab2020(rid);}catch(e){}cut({p:V3(0,3.2,2.5),l:V3(0,1.2,-4.3),f:44,dr:.02});hostSay('¡Muy buenas tardes y bienvenidos a <b>Pasapalabra</b>!');await wait(3,rid);pills(false);
 cut('blue');say('(Los equipos aplauden)');sfx('ok');await wait(2.2,rid);
 const R=P.rosc;R.visible=true;P.host.visible=false;const rq=R.quaternion.clone();R.lookAt(1.3,0,-3.1);cut({p:V3(1.3,1.6,-3.1),l:V3(0,1.5,-4.9),f:30,dr:.02});say(`<b>Copresentadora:</b> Nuestro campeón, <b>${NM[1]}</b> 🆕 INVENTADO, defiende la Silla Azul… ¡y llega el aspirante!`);await wait(3.2,rid);R.visible=false;R.quaternion.copy(rq);P.host.visible=true;
 const disc=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.08,40),new THREE.MeshLambertMaterial({color:0xffffff,emissive:0x333333}));disc.position.set(2.4,.04,-3.6);const RT=P.host.parent;RT.add(disc);const bk=new THREE.Mesh(new THREE.PlaneGeometry(9,5),new THREE.MeshBasicMaterial({map:bgTex()}));bk.position.set(3,2.2,-6.4);RT.add(bk);
 const ch=person({shirt:0x8fb8ea,pants:0x2a3040,hair:0x2a1c12,badge:0xf07a1a});ch.position.set(7,0,-3.6);RT.add(ch);ch.lookAt(0,0,-3.6);
 cut({p:V3(3,1.5,-.6),l:V3(3,1.0,-3.6),f:40,dr:.02});say(`Entra el aspirante: <b>${NM[0]}</b> 🆕 INVENTADO`);
 for(let k=0;k<40;k++){ch.position.x=7-4.6*(k/39);await wait(.05,rid);}
 const hp=P.host.position.clone();say('(Se dan la mano)');sfx('ok');for(let k=0;k<20;k++){P.host.position.lerpVectors(hp,V3(1.75,0,-3.6),k/19);await wait(.04,rid);}const ra=P.host.arms&&P.host.arms[1];if(ra){const r0=ra.rotation.x;for(let k=0;k<16;k++){ra.rotation.x=r0-1.1+Math.sin(k*.9)*.15;await wait(.05,rid);}ra.rotation.x=r0;}P.host.position.copy(hp);
 ch.lookAt(2.4,0,-1.2);cut({p:V3(2.4,1.8,-.9),l:V3(2.4,1.55,-3.6),f:34,dr:.02});hostSay(`${NM[0].split(' ')[0]}, ¿de dónde vienes?`);await wait(2.2,rid);say('<b>Aspirante:</b> De Zamora, y vengo a por la silla.');await wait(2.4,rid);
 RT.remove(ch);RT.remove(disc);window.__sa35bk=[RT,bk];}
async function silla35b(rid){prep();await opening(rid);cut('host');
 hostSay('<b>La Silla Azul</b>: el aspirante elige letra, turnos alternos, cinco segundos por respuesta. ¡El segundo fallo elimina!');await wait(3.6,rid);say();
 const LET='ABCDEFGHIJLMNOPRSTUVZ';const pool=[];ORIG.ROS.forEach((a,i)=>{const L=LETRAS[i];if(!LET.includes(L))return;a.forEach(([ans,def])=>{if(norm(ans[0]).startsWith(L))pool.push([L,ans,def]);});});
 const ls=shuffle([...new Set(pool.map(q=>q[0]))]).slice(0,2);
 const two=[[2.2,{shirt:0x8fb8ea,pants:0x2a3040,hair:0x9a9a9a}],[3.8,{shirt:0x8fb8ea,pants:0x111111,hair:0x2a1c12}]].map(([x,o])=>{const q=person(o);q.position.set(x,0,-4.4);q.lookAt(x,0,0);P.host.parent.add(q);return q;});cut({p:V3(3,1.6,-.4),l:V3(3,1.5,-6.4),f:46,dr:.01});hostSay('Tenemos estas dos letras. ¿Con cuál juegas?');if(window.__sa35auto){tiles(ls,null);await wait(2.5,rid);}let mine=window.__sa35auto?ls[0]:await new Promise(r=>tiles(ls,r));tiles([]);say();
 two.forEach(q=>q.parent.remove(q));const lt=[mine,ls.find(x=>x!=mine)];const f=[0,0];let turn=0,used=new Set(),n=0,hc=0;
 if(window.__sa35bk){__sa35bk[0].remove(__sa35bk[1]);window.__sa35bk=null;}split(true);setBox(0,lt[0],0);setBox(1,lt[1],0);await wait(1,rid);
 try{while(f[0]<2&&f[1]<2&&n<12){chk(rid);n++;const L=lt[turn];const cand=pool.filter(x=>x[0]==L&&!used.has(x[2]));if(!cand.length)break;const q=pick(cand);used.add(q[2]);
  hostSay(`<b>${turn?'Campeón':'Aspirante'} · Con la ${L}:</b> ${q[2].charAt(0)+q[2].slice(1).toLowerCase()}`);let ok;
  if(turn==0&&!window.__sa35auto){let t=5;const v=await ask(()=>(t-=.016)<=0||rid!==RUN);chk(rid);ok=v!==null&&q[1].some(a=>norm(a)===norm(v));}
  else{await wait(2.6,rid);ok=Math.random()<.72;say(`${turn?'Campeón':'Aspirante'}: <b>${ok?q[1][0]:'…'}</b>`);await wait(1,rid);}
  sfx(ok?'ok':'error');if(!ok){f[turn]++;setBox(turn,L,f[turn]);say(`La respuesta correcta: <b>${q[1][0]}</b>`);await wait(1.4,rid);
   if(f[turn]<2&&hc<2){hc++;split(false);cut('host');hostSay(turn?'¡Fallo del campeón! Uno más y deja la silla.':'¡Primer fallo del aspirante!');await wait(1.8,rid);split(true);setBox(0,lt[0],f[0]);setBox(1,lt[1],f[1]);}}
  else await wait(.8,rid);
  turn=1-turn;}}
 finally{split(false);say();}
 const w=f[0]<f[1]?0:1;cut('host');
 hostSay(w==0?'¡El aspirante se sienta en la <b>Silla Azul</b>!':'¡El campeón sigue en la <b>Silla Azul</b>!');sfx(w==0?'winner':'loser');await wait(2.4,rid);cut('wide');say(`${NM[1-w].split(' ')[0]} se despide · ${NM[w].split(' ')[0]} corre a su mesa`);await wait(2.2,rid);
 cut('wide');say();bn.style.display='block';try{boteLED&&boteLED(1216000);}catch(e){}await wait(3,rid);bn.style.display='none';clearG();}
window.silla35=silla35;window.__sa35=()=>({split:MODE.split,box:[...ov.querySelectorAll('.pn')].map(p=>p.className)});
window.sillaAzul=silla35;try{sillaAzul=silla35;}catch(e){}
for(const y in ETAPAS)ETAPAS[y].pr.forEach(p=>{if(p[0]=='silla')p[1]=silla35;});
window.DBG&&(DBG.sillaAzul=silla35);
})();
// LED ring jackpot (v8): animated text band around the desk
window.boteLED=function(v){try{const T=window.THREE;const R=(P.host&&P.host.parent)||P.root;if(!T||!R)return;
 if(!window.__saLED){const c=document.createElement('canvas');c.width=2048;c.height=128;const tx=new T.CanvasTexture(c);tx.wrapS=T.RepeatWrapping;
  const m=new T.Mesh(new T.CylinderGeometry(2.68,2.68,.62,48,1,true),new T.MeshBasicMaterial({map:tx,transparent:true,side:T.BackSide}));m.position.set(0,.5,-1.4);
  window.__saLED={c,tx,m,t:0,id:0};}
 const L=__saLED,g=L.c.getContext('2d'),s=' BOTE '+v.toLocaleString('es-ES')+' € ★';
 g.fillStyle='#020a1e';g.fillRect(0,0,2048,128);g.fillStyle='#ffe14a';g.fillRect(0,4,2048,6);g.fillRect(0,118,2048,6);g.font='900 92px Arial';g.textBaseline='middle';g.shadowColor='#ffb000';g.shadowBlur=14;g.fillStyle='#fff3a0';let x=0;while(x<2048){g.fillText(s,x,68);x+=g.measureText(s).width;}L.tx.needsUpdate=true;
 if(!L.fit){let best=null;const sc=R.parent||R;sc.traverse(o=>{const g=o.geometry;if(o.isMesh&&o.visible!==false&&g&&g.type=='CylinderGeometry'&&g.parameters.openEnded&&g.parameters.radiusTop>1.5&&g.parameters.radiusTop<9&&o!==L.m){if(!best||g.parameters.radiusTop>best.geometry.parameters.radiusTop)best=o;}});
 if(best){const gp=best.geometry.parameters,wp=new T.Vector3();best.getWorldPosition(wp);R.worldToLocal(wp);const sc2=new T.Vector3();best.getWorldScale(sc2);const rr=gp.radiusTop*sc2.x+.04,hh=Math.min(gp.height*sc2.y*.8,.9);L.m.geometry.dispose();L.m.geometry=new T.CylinderGeometry(rr,rr,hh,64,1,true);L.m.position.copy(wp);L.tx.repeat.set(-3,1);L.fit=[rr,hh,best.name||'desk'];}}
 R.add(L.m);L.m.visible=true;clearInterval(L.id);L.id=setInterval(()=>{L.tx.offset.x=(L.tx.offset.x+.0015)%1;if(!document.getElementById('sa35b')||document.getElementById('sa35b').style.display=='none'){L.m.visible=false;clearInterval(L.id);}},40);}catch(e){console.warn('boteLED',e);}};
