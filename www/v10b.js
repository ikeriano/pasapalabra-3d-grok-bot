// ===== v0.10 · «⭐ Lo mejor de Pasapalabra» (igual que «Lo mejor de ¡Ahora Caigo!») =====
// Modal azul con borde dorado: especial completo, mejores botes/roscos/momentos recreados en 3D (repetición a cámara lenta al 30 %),
// jugar un rosco famoso, Salón de la fama local y galería «Vídeos de Ikeriano» (vídeo real, vacía hasta que se carguen).
// Sin narración del presentador: solo rótulos, sonidos y público. Acceso en cada sección del menú.
{
const LM={ctx:'main',cur:'main',view:'home',vi:0};
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const FK='ps_fama11';
const fama=()=>{try{return JSON.parse(localStorage.getItem(FK)||'[]')}catch(e){return []}};
const famaAdd=r=>{try{const a=fama();a.push(Object.assign({d:new Date().toISOString().slice(0,10)},r));localStorage.setItem(FK,JSON.stringify(a.slice(-60)));}catch(e){}};
const eurx=n=>(window.F10&&F10.eur)?F10.eur(n):String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
// ---------- estilo ----------
const st=document.createElement('style');st.textContent=`
#lm11{position:fixed;inset:0;z-index:95;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;font-family:N,Montserrat,Arial,sans-serif}
#lm11 .bx{width:min(92vw,720px);max-height:92vh;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;touch-action:pan-y;box-sizing:border-box;padding:14px 16px;border:3px solid #ffd23a;border-radius:18px;background:linear-gradient(160deg,#0b2fa8,#06145a);box-shadow:0 10px 40px #000a;color:#fff}
#lm11 h2{margin:2px 0 8px;text-align:center;color:#ffd23a;font-weight:900;font-size:clamp(18px,4.6vh,30px)}
#lm11 .nt{font-size:clamp(11px,2.6vh,15px);text-align:center;opacity:.9;margin:0 0 8px}
#lm11 .tb{display:block;width:100%;text-align:left;margin:6px 0;padding:9px 12px;border:2px solid #ffffff55;border-radius:12px;background:#ffffff14;color:#fff;font:inherit;font-weight:800;font-size:clamp(13px,3.2vh,19px);cursor:pointer}
#lm11 .tb small{display:block;font-weight:600;font-size:.74em;opacity:.88;margin-top:2px;line-height:1.25}
#lm11 .tb b.dd{color:#ffd23a}
#lm11 .tb:active{background:#ffffff30}
#lm11 .ce{display:block;margin:10px auto 2px;padding:9px 30px;border:3px solid #fff;border-radius:12px;background:#ffd23a;color:#06145a;font:inherit;font-weight:900;font-size:clamp(14px,3.4vh,20px);cursor:pointer}
#lm11 .gr{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
#lm11 .cd{border:2px solid #ffffff55;border-radius:12px;overflow:hidden;background:#0007;cursor:pointer;text-align:left;color:#fff;font:inherit}
#lm11 .cd .pw{aspect-ratio:16/9;background:#000 center/cover;display:flex;align-items:center;justify-content:center;font-size:30px}
#lm11 .cd span{display:block;padding:6px 8px;font-weight:800;font-size:13px}
#lm11 video{width:100%;max-height:58vh;border-radius:12px;background:#000}
#lm11 .nv{display:flex;gap:8px;margin-top:8px}#lm11 .nv .tb{margin:0;text-align:center}
#lm11 .md{font-size:1.5em;margin-right:6px}
.t11{position:fixed;top:12%;left:50%;transform:translateX(-50%);z-index:60;max-width:90vw;padding:8px 18px;border:3px solid #ffd23a;border-radius:999px;background:#0b2fa8;color:#fff;font:900 clamp(14px,3.6vh,24px) N,Arial,sans-serif;text-align:center;pointer-events:none;box-shadow:0 4px 18px #000a}
.t11.rep{background:#a00;border-color:#fff}
`;document.head.appendChild(st);
const toast11=(t,ms=2200,cls)=>{const e=document.createElement('div');e.className='t11 '+(cls||'');e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),ms/Math.max(1,(window.SPEED||1)>2?window.SPEED/2:1));return e;};
// ---------- escenas ----------
const BAN='⭐ LO MEJOR DE PASAPALABRA';
const sc=(fn,view)=>{close();return scene9(fn,{back:'lm11:'+(view||'home'),banner:BAN});};
async function slow(fn){const prev=window.SPEED||1;let on=true;window.SPEED=prev*.3;const off=()=>{if(on){on=false;window.SPEED=prev;}};document.addEventListener('pointerdown',off,true);const e=toast11('● REPETICIÓN · Toca para saltar',3600,'rep');
 try{await fn();}finally{document.removeEventListener('pointerdown',off,true);off();e.remove();}}
async function bote11(rid,b,n){if(n)toast11('🏆 Nº '+n,1800);cut('host');hostSay(`${esc(b.n)}: <b>${fmt9(b.imp)} €</b>${b.dud?' (⚠ dato dudoso)':''}`);
 const sv=OPT.etapa;if(b.n=='Fran González')OPT.etapa=2019;try{await premio8(rid,{amount:fmt9(b.imp)+' €',title:b.n.toUpperCase(),sub:b.f+' · '+b.c,keep:true,noBoteVoz:true,noClip:true});}finally{OPT.etapa=sv;}}
// rosco recreado: [aciertos, fallos, nombre]; los fallos van en posiciones inventadas (⚠ recreación, no consta cuáles fueron)
const RREC={0:[25,0,'Julio Escartín'],1:[25,0,'Sofía Álvarez'],2:[25,0,'Rafa Castaño'],3:[21,0,'Fran González']};
async function roscoRec11(rid,x,sp){const [h,m,who]=sp;clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;setPeople(true);roscoPerson(0);cut('rosco');
 const g=roscoGraf();g.team(COL.bl);g.tm.visible=false;g.ac.setT('0');let tl=0;anim(dt=>{if(rid!==RUN||!g.parent)return false;tl+=dt;g.tick(tl);return true;});
 say(`<b>${esc(who)}</b> — ${esc(x.t)}`);await g.fly(1.2);chk(rid);
 const ms=[];for(let k=0;ms.length<m&&k<99;k++){const q=(k*7+who.length*3)%25;if(!ms.includes(q))ms.push(q);}
 let hits=0;const run=async(from,to,w)=>{for(let i=from;i<to;i++){g.setAct(i);await wait(w,rid);const bad=ms.includes(i);if(i<h+m){g.state(i,bad?2:1);if(!bad){hits++;sfx('ok');}else sfx('error');g.ac.setT(String(hits));}}};
 await run(0,25,.17);g.setAct(-1);
 if(h>=25){FX5.conf(['#ffd23a','#2a6af0','#fff'],4);sfx('aplauso');}else sfx('winner');
 say(`<b>${esc(who)}: ${h} aciertos</b>${h>=25?' — ¡rosco completo!':''}`);await wait(1.6,rid);
 // repetición a cámara lenta de las últimas letras
 const f0=Math.max(0,Math.min(24,(h>=25?25:h)-5)),f1=h>=25?25:h;
 await slow(async()=>{for(let i=f0;i<f1;i++){g.state(i,0);}hits=Math.max(0,h-(f1-f0));g.ac.setT(String(hits));
  for(let i=f0;i<f1;i++){g.setAct(i);await wait(.5,rid);g.state(i,1);hits++;g.ac.setT(String(hits));sfx('ok');}g.setAct(-1);await wait(1,rid);});
 await wait(.8,rid);G.remove(g);clearG();setPeople(false);}
// cuenta atrás 3D (v0.11): una cifra dorada que sube hasta el valor del dato {n|txt,u,sub,ic}
async function m3d11(rid,x){const m=x.m3;clearG();MODE.split=false;cut('front');say(`<b>${esc(x.t)}</b><br>${esc(x.d)}${x.dud?'<br>⚠ '+esc(x.dud):''}`);toast11(x.t,3200);
 const w=Math.min(GW-100,780);const tb=bar(w,64,COL.bl,(m.ic||'⭐')+' '+x.t,{fs:24});tb.position.set(0,215,0);G.add(tb);
 const num=bar(Math.min(GW-160,620),150,0xb88500,m.txt||'0',{fs:m.txt?44:78});num.position.set(0,60,40);G.add(num);const sb=bar(w,52,COL.bl,m.sub||'',{fs:20});sb.position.set(0,-70,0);G.add(sb);
 const rc=bar(300,30,COL.rd,'RECREACIÓN DE DATOS REALES',{fs:14});rc.position.set(0,-262,0);G.add(rc);
 const fm=v=>m.u=='€'?fmt9(v)+' €':v+' '+(m.u||'');
 if(m.txt){num.scale.setScalar(.01);await tween(.5,e=>num.scale.setScalar(.01+.99*e));}
 else{let last=-1;await tween(2.6,(e,k)=>{const v=Math.round(m.n*e);if(v!==last&&(v-last>=Math.max(1,Math.floor(m.n/40))||v==m.n)){last=v;num.setT(fm(v));}num.rotation.z=Math.sin(k*9)*.02*(1-e);num.scale.setScalar(1+.06*Math.sin(Math.min(1,e)*PI));},x=>1-Math.pow(1-x,3));num.setT(fm(m.n));num.rotation.z=0;}
 FX5.conf(['#ffd23a','#2a6af0','#fff'],3);sfx('aplauso');await wait(Math.max(3.2,Math.min(6,String(x.d).length*.03)),rid);clearG();}
async function momento11(rid,x){if(x.m3)return m3d11(rid,x);cut('wide');say(`<b>${esc(x.t)}</b><br>${esc(x.d)}${x.dud?'<br>⚠ '+esc(x.dud):''}`);toast11(x.t,3200);FX5.conf(['#ffd23a','#2a6af0','#fff'],3);sfx('aplauso');await wait(Math.max(4.5,Math.min(9,String(x.d).length*.045)),rid);}
async function rosco11(rid,x,i){const sp=RREC[i];if(sp)return roscoRec11(rid,x,sp);if(x.m3)return m3d11(rid,x);
 cut('wide');say(`<b>${esc(x.t)}</b><br>${esc(x.d)}${x.dud?'<br>⚠ '+esc(x.dud):''}`);toast11(x.t,3200);FX5.conf(['#ffd23a','#2a6af0','#fff'],3);sfx('aplauso');await wait(Math.max(4.5,Math.min(10,String(x.d).length*.04)),rid);}
async function famaScene(rid){const a=fama().filter(r=>r.t=='bote').sort((x,y)=>y.b-x.b).slice(0,3);
 for(let i=a.length-1;i>=0;i--){toast11(['🥇','🥈','🥉'][i]+' '+a[i].n+' · '+eurx(a[i].b)+' €',2400);cut('host');
  await premio8(rid,{amount:eurx(a[i].b)+' €',title:String(a[i].n).toUpperCase(),sub:'Salón de la fama · '+a[i].d,keep:true,noBoteVoz:true,noClip:true});}}
async function todo11(rid){cut('wide');FX5.conf(['#ffd23a','#2a6af0','#fff'],4);sfx('aplauso');say('<b>⭐ LO MEJOR DE PASAPALABRA</b><br>Cabecera · botes · roscos · momentos');toast11('⭐ LO MEJOR DE PASAPALABRA',3200);await wait(4,rid);
 const bs=D9.botes.slice(0,3);for(let i=bs.length-1;i>=0;i--){await bote11(rid,bs[i],i+1);chk(rid);}
 for(const i of [0,1,2,3,6,8]){if(!D9.roscos[i])continue;toast11('🎯 Rosco '+(i+1),1500);await rosco11(rid,D9.roscos[i],i);chk(rid);}
 for(const k of [2,3,6,7,10]){if(D9.momentos[k]){await momento11(rid,D9.momentos[k]);chk(rid);}}
 if(fama().some(r=>r.t=='bote'))await famaScene(rid);}
// ---------- jugar un rosco famoso (niveles aproximados ⚠) ----------
const LV=[['Rosco casi perfecto','Pablo Díaz',.95,25,'Aguanta 25 aciertos frente a un rival que acierta casi todo (24 en el original).'],
 ['Veinticinco contra veinticuatro','Marco Antonio',.93,25,'Rival que llegó a 24 aciertos.'],
 ['El rosco de una tacada','Orestes',.18,25,'Haz las 25 de una tacada, sin rival que te moleste.'],
 ['Fran contra Javier','Javier',.35,21,'Llega al menos a 21 aciertos, como Fran González.']];
async function jugar11(i){const [t,rv,p,meta,,sec]=LV[i];close();
 return scene9(async rid=>{V5.rivalN=rv;V5.noBote=true;GAME.sec=[sec||0,0];V5.cpuP=p;cut('host');say(`<b>${esc(t)}</b><br>Meta: ${meta} aciertos. Rival: ${esc(rv)}`);await wait(2.6,rid);
  try{await rosco(rid);}finally{V5.rivalN=null;V5.noBote=false;V5.cpuP=.7;}
  const a=GAME.res||[0,0],ok=a[0]>=meta;cut('front');say(ok?`<b>¡Rosco famoso superado!</b> ${a[0]} aciertos (meta ${meta})`:`<b>Casi...</b> ${a[0]} aciertos (meta ${meta})`);
  if(ok){FX5.conf(['#ffd23a','#2a6af0','#fff'],4);sfx('aplauso');famaAdd({n:'Tú',b:a[0],t:'rosco',r:t});}else sfx('loser');await wait(3,rid);},
  {back:'lm11:jugar',banner:BAN});}
// ---------- vistas del modal ----------
function el(){let e=document.getElementById('lm11');if(!e){e=document.createElement('div');e.id='lm11';document.body.appendChild(e);}return e;}
function close(){const e=document.getElementById('lm11');if(e){const v=e.querySelector('video');if(v){try{v.pause();v.removeAttribute('src');v.load();}catch(_){}}e.remove();}}
const item=(go,ic,t,s)=>`<button class="tb" data-l="${go}"><span class="md">${ic}</span>${t}${s?`<small>${s}</small>`:''}</button>`;
const dudx=x=>x.dud?`<br><b class="dd">⚠ Dudoso: ${esc(x.dud)}</b>`:'';
const VIEWS={
 home:()=>`<h2>⭐ Lo mejor de Pasapalabra</h2><div class="nt">Botes, roscos y momentos recreados en 3D · sin presentador</div>
  ${item('todo','▶','Ver el especial completo','Cabecera, los mejores botes, roscos y momentos')}
  ${item('v:botes','🏆','Los mejores botes','Recreados en 3D · datos con fuente')}
  ${item('v:roscos','🎯','Los mejores roscos','Con repetición a cámara lenta')}
  ${item('v:momentos','📺','Los mejores momentos','Recordatorio de la historia del programa')}
  ${item('v:jugar','🎮','Jugar un rosco famoso','Reto con las condiciones de un rosco histórico')}
  ${item('v:fama','🏅','Salón de la fama','Tus botes y roscos famosos, guardados en este móvil')}
  ${item('v:videos','🎞️','Vídeos de Ikeriano','Galería de vídeo real')}
  <button class="ce" data-l="cerrar">Cerrar</button>`,
 botes:()=>`<h2>🏆 Los mejores botes</h2><div class="nt">Datos de prensa y Wikipedia · ⚠ = dudoso</div>${item('top3','▶','Ver los 3 mejores botes','Nº 3, Nº 2 y Nº 1')}${D9.botes.map((x,i)=>item('b:'+i,'🏆',`${esc(x.n)} · ${fmt9(x.imp)} €`,`${esc(x.f)} · ${esc(x.c)}${x.nota?'<br>'+esc(x.nota):''}<br><i>Fuente: ${esc(x.src)}</i>${dudx(x)}`)).join('')}<button class="ce" data-l="v:home">⟵ Volver</button>`,
 roscos:()=>`<h2>🎯 Los mejores roscos</h2><div class="nt">Recreación en 3D con repetición a cámara lenta · los fallos recreados son inventados</div>${D9.roscos.map((x,i)=>item('r:'+i,RREC[i]?'🎯':'📋',esc(x.t),`${esc(x.d)}<br><i>Fuente: ${esc(x.src)}</i>${dudx(x)}`)).join('')}<button class="ce" data-l="v:home">⟵ Volver</button>`,
 momentos:()=>`<h2>📺 Los mejores momentos</h2>${D9.momentos.map((x,i)=>item('m:'+i,'📺',esc(x.t),`${esc(x.d)}<br><i>Fuente: ${esc(x.src)}</i>${dudx(x)}`)).join('')}<button class="ce" data-l="v:home">⟵ Volver</button>`,
 jugar:()=>`<h2>🎮 Jugar un rosco famoso</h2><div class="nt">⚠ Niveles aproximados: el rival imita el resultado histórico, no su rosco real</div>${LV.map((x,i)=>item('j:'+i,'🎮',esc(x[0]),`Rival: ${esc(x[1])} · meta: ${x[3]} aciertos<br>${esc(x[4])}`)).join('')}<button class="ce" data-l="v:home">⟵ Volver</button>`,
 fama:()=>{const a=fama(),bo=a.filter(r=>r.t=='bote').sort((x,y)=>y.b-x.b).slice(0,3),ro=a.filter(r=>r.t=='rosco').slice(-5).reverse();
  return `<h2>🏅 Salón de la fama</h2>`+(a.length?`${bo.length?item('fs','▶','Ver los botes en el plató',''):''}${bo.map((r,i)=>item('x','🥇🥈🥉'.match(/./gu)[i],`${esc(r.n)} · ${eurx(r.b)} €`,`Bote · ${esc(r.d)}`)).join('')}${ro.map(r=>item('x','🎯',esc(r.r),`${r.b} aciertos · ${esc(r.d)}`)).join('')}`:`<div class="nt">Todavía no hay nadie en el Salón de la fama.<br>Gana un bote o supera un rosco famoso y aparecerás aquí (se guarda solo en este móvil).</div>`)+`<button class="ce" data-l="v:home">⟵ Volver</button>`;},
 videos:()=>{const V=window.VID11||[];return `<h2>🎞️ Vídeos de Ikeriano</h2>`+(V.length?`<div class="gr">${V.map((x,i)=>`<button class="cd" data-l="p:${i}"><div class="pw" style="background-image:url('videos/${esc(x.id)}.jpg')">▶</div><span>${esc(x.t)}${x.d?' · '+esc(x.d):''}</span></button>`).join('')}</div>`:`<div class="nt">Todavía no hay vídeos cargados.<br>Aquí irán los vídeos de Pasapalabra de Ikeriano (rejilla con póster, reproductor y anterior/siguiente).</div>`)+`<button class="ce" data-l="v:home">⟵ Volver</button>`;},
 play:()=>{const V=window.VID11||[],x=V[LM.vi];if(!x)return VIEWS.videos();return `<h2>🎞️ ${esc(x.t)}</h2><video controls autoplay playsinline poster="videos/${esc(x.id)}.jpg" src="videos/${esc(x.id)}.mp4"></video><div class="nt" style="margin-top:6px">${LM.vi+1}/${V.length}${x.d?' · '+esc(x.d):''}</div><div class="nv"><button class="tb" data-l="pv">⏮ Anterior</button><button class="tb" data-l="nx">Siguiente ⏭</button></div><button class="ce" data-l="v:videos">⟵ Volver a la galería</button>`;}};
function open(v){v=v||'home';LM.view=v;const e=el();e.innerHTML=`<div class="bx">${(VIEWS[v]||VIEWS.home)()}</div>`;
 LM.t=performance.now();e.onclick=ev=>{if(performance.now()-LM.t<450)return;if(ev.target===e)close();};
 const vd=e.querySelector('video');if(vd){vd.onended=()=>go('nx');vd.onerror=()=>toast11('No se puede reproducir este vídeo',2500);}
 e.querySelectorAll('[data-l]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();if(performance.now()-LM.t<450)return;sfx('ok');go(b.dataset.l);});}
function go(a){
 if(a=='cerrar')return close();
 if(a.startsWith('v:'))return open(a.slice(2));
 if(a=='todo')return sc(todo11,'home');
 if(a=='top3')return sc(async rid=>{const bs=D9.botes.slice(0,3);for(let i=bs.length-1;i>=0;i--){await bote11(rid,bs[i],i+1);chk(rid);}},'botes');
 if(a=='fs')return sc(famaScene,'fama');
 if(a=='pv'||a=='nx'){const n=(window.VID11||[]).length;if(!n)return;LM.vi=(LM.vi+(a=='nx'?1:n-1))%n;return open('play');}
 const [k,n]=a.split(':'),i=+n;
 if(k=='p'){LM.vi=i;return open('play');}
 if(k=='b')return sc(rid=>bote11(rid,D9.botes[i]),'botes');
 if(k=='r')return sc(rid=>rosco11(rid,D9.roscos[i],i),'roscos');
 if(k=='m')return sc(rid=>momento11(rid,D9.momentos[i]),'momentos');
 if(k=='j')return jugar11(i);}
// ---------- accesos ----------
const SECS=['esp','tema','museo','extras9','fam10','hist','how','promos','mono','tomas9','opt'];
function btn11(){return `<div class="mbtn y" data-go="lm11"><span class="ic">⭐</span><div>Lo mejor de Pasapalabra<small>Botes, roscos y momentos en 3D · rosco famoso · Salón de la fama · vídeos</small></div></div>`;}
{const _sm=showMenu;showMenu=function(s='main'){
  if(typeof s==='string'&&s.startsWith('lm11')){const v=s.split(':')[1];if(v){showMenu(LM.cur);open(v);}else{LM.ctx=LM.cur;open('home');}return;}
  close();LM.cur=s;
  const r=_sm.apply(this,arguments);
  try{const col=menu.querySelector('.col');
   if(col&&s=='main'){const b=col.querySelector('[data-go=mejor]');if(b){b.classList.add('y');b.dataset.go='lm11';b.querySelector('small').textContent='Botes, roscos y momentos en 3D · rosco famoso · Salón de la fama · vídeos';bind9(col,['lm11']);NAV.attach(s);}}
   else if(col&&SECS.includes(s)&&!col.querySelector('[data-go=lm11]')){const bk=[...col.querySelectorAll('.mbtn')].find(b=>/⟵/.test(b.textContent));
    if(bk)bk.insertAdjacentHTML('beforebegin',btn11());else col.insertAdjacentHTML('beforeend',btn11());bind9(col,['lm11']);NAV.attach(s);}}catch(e){console.error(e);}
  return r;};}
LM.ctx='main';
// ---------- Salón de la fama automático ----------
{const _b=bote;bote=async function(rid,won){if(won&&!V5.noBote)famaAdd({n:'Tú',b:OPT.bote||60000,t:'bote'});return _b.apply(this,arguments);};}
window.LM11={open,close,go,fama:famaAdd,getFama:fama,jugar:jugar11,LV,RREC,SECS,state:LM};
}
