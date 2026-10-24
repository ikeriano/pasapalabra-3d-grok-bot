// ======================================================================
//  v0.5 (2) — Programas especiales (Wikipedia), temáticas, promos, monólogos,
//  tomas falsas, museo, más opciones y botones arriba a la derecha.
//  Funciones adaptadas de Ahora Caigo 1.58 (ikeriano/ahoracaigo-grok-bot).
// ======================================================================
(()=>{const st=document.createElement('style');st.textContent=`
#fx5{position:fixed;inset:0;pointer-events:none;z-index:5;transition:background .8s}
#ban5{position:fixed;left:50%;top:1.5vh;transform:translateX(-50%);z-index:24;padding:4px 22px;border-radius:30px;font:900 15px/1.3 system-ui;color:#fff;letter-spacing:2px;background:linear-gradient(90deg,#c8102e,#ff8a00,#ffd23a,#ff8a00,#c8102e);background-size:300% 100%;animation:ban5 4s linear infinite;box-shadow:0 0 18px rgba(255,200,60,.7);pointer-events:none;white-space:nowrap}
@keyframes ban5{to{background-position:300% 0}}
#cf5{position:fixed;inset:0;pointer-events:none;z-index:23}
#tr5{position:fixed;right:2vw;top:2vh;z-index:27;display:flex;gap:6px}
#tr5 button{font-size:18px;width:40px;height:40px;border-radius:50%;border:2px solid #fff6;background:#0a2a6acc;color:#fff}
body.ingame #tr5{top:auto;bottom:2vh;right:auto;left:2vw}
#br5{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:22;background:#06164ae8;border:2px solid #ffd23a;border-radius:14px;padding:10px 14px;color:#fff;font:600 13px system-ui;display:flex;gap:16px;pointer-events:none}
#br5 .rd{display:flex;flex-direction:column;justify-content:space-around;gap:6px}#br5 h4{margin:0 0 4px;color:#ffd23a;font-size:12px;text-align:center}
#br5 .m{background:#123a9a;border-radius:6px;padding:3px 8px;min-width:120px}#br5 .m div{display:flex;justify-content:space-between;gap:8px}#br5 .w{color:#ffd23a;font-weight:900}#br5 .me{color:#7fe0ff}
.mbox .col{max-height:92vh;overflow-y:auto}
.mus5{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}.mus5 div{background:#0d2f7a;border-radius:10px;padding:6px;font-size:12px;color:#fff}.mus5 img{width:100%;border-radius:6px;background:#000}
.chip5{display:inline-block;margin:2px 4px;padding:4px 12px;border-radius:20px;background:#ffd23a;color:#06164a;font-weight:800;font-size:13px}`;document.head.appendChild(st);
 document.body.insertAdjacentHTML('beforeend','<div id="fx5"></div><canvas id="cf5"></canvas><div id="tr5"><button id="mu5" title="Silenciar">🔊</button><button id="fs5" title="Pantalla completa">⛶</button></div>');})();
const FX5={ban:null,
 banner(t){if(this.ban){this.ban.remove();this.ban=null;}if(t){this.ban=document.createElement('div');this.ban.id='ban5';this.ban.textContent=t;document.body.appendChild(this.ban);}},
 tint(c){$('#fx5').style.background=c?`radial-gradient(ellipse at 50% 30%,transparent 30%,${c} 100%)`:'';},
 conf(cols,sec=4){if(OPT.efx===0)return;const cv=$('#cf5'),g=cv.getContext('2d');cv.width=innerWidth/2|0;cv.height=innerHeight/2|0;cv.style.width='100%';cv.style.height='100%';
  const n=Math.round(90*(OPT.efx??1)),ps=[];for(let i=0;i<n;i++)ps.push({x:Math.random()*cv.width,y:-Math.random()*cv.height*.6,vx:(Math.random()-.5)*40,vy:40+Math.random()*60,r:Math.random()*6,c:cols[i%cols.length],s:2+Math.random()*3});
  let t=0,last=performance.now();const tok=this.ct=(this.ct||0)+1;
  const f=now=>{if(tok!==this.ct)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;g.clearRect(0,0,cv.width,cv.height);
   for(const p of ps){p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*5;g.fillStyle=p.c;g.save();g.translate(p.x,p.y);g.rotate(p.r);g.fillRect(-p.s,-p.s/2,p.s*2,p.s);g.restore();}
   if(t<sec)requestAnimationFrame(f);else g.clearRect(0,0,cv.width,cv.height);};requestAnimationFrame(f);},
 off(){this.banner();this.tint();this.ct=(this.ct||0)+1;const cv=$('#cf5');cv.getContext('2d').clearRect(0,0,cv.width,cv.height);}};
// ---------- Más opciones (como Ahora Caigo): público, voz Piper, efectos visuales ----------
OPT.pub=OPT.pub??.8;OPT.vozp=OPT.vozp??1;OPT.efx=OPT.efx??1;OPT.tema=OPT.tema||'normal';
const _sfx5=sfx;sfx=function(n){if(n=='aplauso'){if(OPT.pub<=0||OPT.sfx<=0)return;try{const a=snd(n).cloneNode();a.volume=Math.min(1,OPT.pub);a.play().catch(()=>{});}catch(e){}return;}return _sfx5(n);};
const _play5=V5.play;V5.play=function(c){if(OPT.vozp<=0)return;_play5.call(V5,c);if(V5.a)V5.a.volume=Math.min(1,OPT.vozp);};
// botones arriba a la derecha: silenciar y pantalla completa
(()=>{const mu=$('#mu5');const upd=()=>mu.textContent=OPT.mute5?'🔇':'🔊';upd();
 mu.onpointerdown=e=>{e.preventDefault();e.stopPropagation();if(!OPT.mute5){OPT.m5=[OPT.mus,OPT.sfx,OPT.vozp,OPT.pub];OPT.mus=OPT.sfx=OPT.vozp=OPT.pub=0;OPT.mute5=1;V5.stop();}else{[OPT.mus,OPT.sfx,OPT.vozp,OPT.pub]=OPT.m5||[.7,1,1,.8];OPT.mute5=0;}if(window.musA)musA.volume=OPT.mus;saveOpt();upd();};
 $('#fs5').onpointerdown=e=>{e.preventDefault();e.stopPropagation();const d=document;if(d.fullscreenElement)d.exitFullscreen().catch(()=>{});else d.documentElement.requestFullscreen().catch(()=>{});};})();
// ---------- ganchos extra en el rosco (estadísticas para desempates) ----------
V5.R={best:[0,0],run:[0,0],first:[0,0],turns:[0,0],fails:[0,0]};V5.cpuP=.7;
(()=>{const name='rosco',f=rosco;let src=f.toString();const reps=[
 ['const show=async()=>{','const show=async()=>{V5.R.turns[turn]++;if(V5.onTurn)await V5.onTurn(turn,rid);'],
 ['let turn=0;const g=roscoGraf();','let turn=0;V5.R={best:[0,0],run:[0,0],first:[0,0],turns:[0,0],fails:[0,0]};const g=roscoGraf();'],
 ["r<.7?'ok':r<.85?'pasa':'ko'","r<V5.cpuP?'ok':r<V5.cpuP+(1-V5.cpuP)/2?'pasa':'ko'"],
 ['Naranja responde:','${V5.rivalN||"Naranja"} responde:'],
 ["if(res=='ok'){","if(res=='ok'){V5.R.run[turn]++;V5.R.best[turn]=Math.max(V5.R.best[turn],V5.R.run[turn]);if(V5.R.turns[turn]==1)V5.R.first[turn]++;}else{V5.R.run[turn]=0;if(res=='ko')V5.R.fails[turn]++;}if(res=='ok'){"],
 ['if(a[0]==25){music','if(a[0]==25&&!V5.noBote){music']];
 for(const [a,b] of reps){if(!src.includes(a))console.warn('v05b parche rosco',a.slice(0,30));src=src.split(a).join(b);}
 const nf=(0,eval)('('+src+')');window.__v5f=nf;(0,eval)('rosco=window.__v5f');
 Object.values(ETAPAS).forEach(E=>E.pr&&E.pr.forEach(p=>{if(p[1]===f)p[1]=nf;else if(p[0]=='rosco'&&p[1].v3)p[1]=Object.assign(async function(rid){cut('orbitR');return nf(rid);},{v3:1});}));if(DBG.rosco)DBG.rosco=nf;})();
// ---------- temáticas (como los «Programa especial» de Ahora Caigo) ----------
V5.tema=()=>L5.TEMAS.find(t=>t.id==OPT.tema)||L5.TEMAS[0];
(()=>{let src=programa.toString();const a="hostSay('¡Hola, hola! Bienvenidos a <b>Pasapalabra</b>. ¡Hoy jugamos el equipo <b>azul</b> contra el equipo <b>naranja</b>!')";
 if(!src.includes(a))console.warn('v05b programa');src=src.replace(a,"{const T=V5.tema();hostSay(T.saludo||'¡Hola, hola! Bienvenidos a <b>Pasapalabra</b>. ¡Hoy jugamos el equipo <b>azul</b> contra el equipo <b>naranja</b>!');if(T.conf){FX5.conf(T.conf,5);sfx('aplauso');}}");
 src=src.replace('try{await cabecera(rid);',"try{{const T=V5.tema();FX5.tint(T.tint);FX5.banner(T.banner?T.emoji+' '+T.banner+' '+T.emoji:'');}await cabecera(rid);");
 src=src.replace('await despedida(rid);}','await despedida(rid);FX5.off();}');(0,eval)('programa='+src);})();
const _desp5=despedida;despedida=async function(rid){const T=V5.tema(),a=GAME.res||[0,0];if(T.conf||a[0]>=a[1])FX5.conf(T.conf||['#ffd23a','#2a6af0','#fff'],5);return _desp5(rid);};
// ---------- escena del presentador (promos, monólogos, tomas falsas) ----------
async function hostScene(lines,o={}){const rid=++RUN;MODE.menu=false;menu.classList.add('hidden');$('#ver').classList.add('hidden');document.body.classList.add('ingame');setPeople(false);P.host.visible=true;MOSCA.visible=!!o.mosca;
 const sk=$('#skip');sk.textContent='Volver ⟵';sk.classList.remove('hidden');sk.onpointerdown=e=>{e.preventDefault();V5.stop();FX5.off();sk.textContent='Menú ☰';showMenu(o.back||'main');};
 if(o.banner)FX5.banner(o.banner);if(o.tint)FX5.tint(o.tint);if(o.music)music(o.music);
 try{const shots=o.shots||['host','front','wide','host'];
  for(let i=0;i<lines.length;i++){chk(rid);const L=[].concat(lines[i]);cut(shots[i%shots.length]);if(o.title&&o.title[i])say(o.title[i]);
   if(o.conf&&i==0)FX5.conf(o.conf,4);hostSay(L[0]);await wait(o.w||2.2,rid);
   if(L[1]=='cut'||o.cutEach){sfx('error');say('<b>🎬 ¡CORTEN!</b>');await wait(1.2,rid);sfx('aplauso');}
   else if(o.clap&&i%2==1)sfx('aplauso');}
  await wait(.6,rid);FX5.off();sk.textContent='Menú ☰';showMenu(o.back||'main');}catch(e){if(!(e instanceof Stop))console.error(e);}}
// ---------- PROGRAMAS ESPECIALES (fieles al artículo de Wikipedia) ----------
function bracketHTML(E,res){const R=E.rounds;let h='';for(let r=0;r<R.length;r++){h+=`<div class="rd"><h4>${R[r]}</h4>`;(res[r]||[]).forEach(m=>{h+=`<div class="m">${m.map(p=>`<div class="${p.w?'w':''} ${p.me?'me':''}"><span>${p.n}</span><span>${p.s||''}</span></div>`).join('')}</div>`;});h+='</div>';}return h;}
function showBr(E,res){let b=$('#br5');if(!b){b=document.createElement('div');b.id='br5';document.body.appendChild(b);}b.innerHTML=bracketHTML(E,res);b.style.display='flex';}
function hideBr(){const b=$('#br5');if(b)b.style.display='none';}
const sc=(a,f)=>`${a}A ${f}F`;
function simMatch(x,y,tie){const g=()=>{const a=18+Math.floor(Math.random()*7),f=Math.floor(Math.random()*3);return [a,f];};const A=g(),B=g();let w=A[0]>B[0]||A[0]==B[0]&&A[1]<B[1]?0:A[0]==B[0]&&A[1]==B[1]?(Math.random()<.5?0:1):1;
 return [{n:x,s:sc(...A),w:w==0},{n:y,s:sc(...B),w:w==1}];}
async function muerteSubita(rid,rival){hostSay(L5.ESPL[6]);await wait(2.4,rid);const pool=[].concat(...ORIG.ROS.map((a,i)=>a.map(x=>[x,i])));let s=[0,0];
 for(let k=0;k<12;k++){for(const t of [0,1]){chk(rid);const [[ans,def],i]=pick(pool),L=LETRAS[i],starts=norm(ans[0]).startsWith(L);cut(t?'team_o':'team_b');
   hostSay(`<b>${starts?'Empieza por':'Contiene la'} ${L}:</b> ${def.charAt(0)+def.slice(1).toLowerCase()}`);let ok;
   if(t==0){const v=await ask(()=>rid!==RUN);chk(rid);ok=v&&ans.some(a=>norm(a)===norm(v));}else{await wait(2,rid);ok=Math.random()<.75;say(`${rival} responde: <b>${ok?ans[0]:'…'}</b>`);await wait(1,rid);}
   sfx(ok?'ok':'error');if(ok)s[t]++;else say(`La respuesta correcta: <b>${ans[0]}</b>`);await wait(1.2,rid);}
  say(`<b>Muerte súbita:</b> Tú ${s[0]} – ${s[1]} ${rival}`);await wait(1.6,rid);if(s[0]!=s[1]&&k>=4)break;if(s[0]!=s[1]&&k<4&&Math.abs(s[0]-s[1])>4-k)break;}
 return s[0]>s[1]?0:1;}
async function playDuel(E,rid,rival){V5.rivalN=rival;V5.noBote=true;GAME.sec=[0,0];V5.cpuP=.62+Math.random()*.12;
 cut('host');hostSay(L5.ESPL[0]+' <b>'+rival+'</b>');await wait(2.2,rid);await rosco(rid);
 const a=GAME.res,R=V5.R;let w=a[0]>a[1]?0:a[0]<a[1]?1:R.fails[0]<R.fails[1]?0:R.fails[0]>R.fails[1]?1:-1;
 if(w<0){cut('host');hostSay(L5.ESPL[3]);await wait(2,rid);
  if(E.tie=='tiron'){hostSay(L5.ESPL[4]);await wait(2.4,rid);w=R.best[0]>=R.best[1]?0:1;say(`Tirón más largo: tú <b>${R.best[0]}</b> · ${rival} <b>${R.best[1]}</b>`);await wait(2.2,rid);}
  else if(E.tie=='vuelta'){hostSay(L5.ESPL[5]);await wait(2.4,rid);w=R.first[0]>=R.first[1]?0:1;say(`Primera vuelta: tú <b>${R.first[0]}</b> · ${rival} <b>${R.first[1]}</b>`);await wait(2.2,rid);}
  else w=await muerteSubita(rid,rival);}
 return {w,s:[sc(a[0],R.fails[0]),sc(a[1],R.fails[1])]};}
async function torneo(E,rid){const pl=E.players.slice();pl[0]='Tú';const res=[];let alive=true;
 let cur=[];for(let i=0;i<pl.length;i+=2)cur.push([pl[i],pl[i+1]]);
 for(let r=0;r<E.rounds.length;r++){res[r]=cur.map(m=>[{n:m[0],me:m[0]=='Tú'},{n:m[1],me:m[1]=='Tú'}]);showBr(E,res);say('<b>'+E.rounds[r]+'</b>');await wait(2.6,rid);hideBr();
  const nxt=[];for(let k=0;k<cur.length;k++){const m=cur[k];
   if(m[0]=='Tú'){const d=await playDuel(E,rid,m[1]);res[r][k]=[{n:'Tú',me:1,s:d.s[0],w:d.w==0},{n:m[1],s:d.s[1],w:d.w==1}];cut('front');
    if(d.w==0){FX5.conf(E.conf,3);sfx('aplauso');hostSay(L5.ESPL[1]);}else{hostSay(L5.ESPL[2]);alive=false;}await wait(2.4,rid);nxt.push(d.w==0?'Tú':m[1]);}
   else{const s=simMatch(m[0],m[1],E.tie);res[r][k]=s;nxt.push(s[0].w?m[0]:m[1]);}}
  showBr(E,res);await wait(3.2,rid);hideBr();if(!alive)break;
  cur=[];for(let i=0;i<nxt.length;i+=2)cur.push([nxt[i],nxt[i+1]]);}
 return alive;}
async function especial(id){const E=L5.ESP[id];const rid=++RUN;MODE.menu=false;menu.classList.add('hidden');$('#ver').classList.add('hidden');document.body.classList.add('ingame');
 const sk=$('#skip');sk.textContent='Menú ☰';sk.classList.remove('hidden');sk.onpointerdown=e=>{e.preventDefault();V5.stop();FX5.off();hideBr();V5.onTurn=null;V5.rivalN=null;V5.noBote=false;showMenu('esp');};
 GAME.sec=[0,0];GAME.ac=[0,0];GAME.res=null;MOSCA.visible=true;setPeople(false);P.host.visible=true;V5.onTurn=null;V5.rivalN=null;V5.noBote=false;V5.cpuP=.7;
 try{FX5.tint(E.tint);FX5.banner(E.emoji+' '+E.banner+' '+E.emoji);await cabecera(rid);FX5.conf(E.conf,5);sfx('aplauso');
  const shots=['host','wide','team_b','team_o','front'];for(let i=0;i<E.intro.length;i++){cut(shots[i%shots.length]);hostSay(E.intro[i]);await wait(2.2,rid);}say();
  let win=false;
  if(id=='primetime'){V5.noBote=true;for(const [k,fn,l] of [['pista',pistaMusical,'Primera prueba: <b>La pista</b>'],['letra',letraALetra,'Ahora, <b>Letra a letra</b>']]){cut('host');stopMusic();hostSay(l);await wait(2,rid);await fn(rid);}
   cut('front');hostSay('Llevas <b>'+GAME.sec[0]+' segundos</b>: ¡son '+(GAME.sec[0]*1000).toLocaleString('es-ES').replace(/,/g,'.')+' euros!');await wait(3,rid);
   await rosco(rid);win=GAME.res[0]==25;cut('front');if(win){FX5.conf(E.conf,6);hostSay(L5.ESPL[8]);await wait(3,rid);}}
  else if(id=='familia'){for(const [fn,l] of [[palabrasCruzadas,'Primera prueba: <b>Palabras cruzadas</b>'],[dondeEstan,'Seguimos con <b>¿Dónde están?</b>']]){cut('host');stopMusic();hostSay(l);await wait(2,rid);await fn(rid);}
   let m=0;V5.onTurn=async(t,r)=>{if(t!==0)return;hostSay(L5.ESPL[9+(m++%2)]);await wait(1.8,r);};V5.rivalN='Familia naranja';
   cut('host');hostSay('Y ahora, ¡<b>El Rosco</b>!');await wait(1.6,rid);await rosco(rid);V5.onTurn=null;win=GAME.res[0]>=GAME.res[1];cut('front');
   if(win)FX5.conf(E.conf,5);hostSay(L5.ESPL[win?11:12]);await wait(3,rid);}
  else{win=await torneo(E,rid);cut('front');if(win){FX5.conf(E.conf,7);sfx('aplauso');music('winner');hostSay(L5.ESPL[7]+(E.prize?' <b>'+E.prize+'</b>':''));await wait(3.4,rid);}}
  V5.rivalN=null;V5.noBote=false;cut('wide');hostSay(L5.ESPL[13]);await wait(2.6,rid);FX5.off();MOSCA.visible=false;showMenu('esp');}
 catch(e){V5.onTurn=null;V5.rivalN=null;V5.noBote=false;hideBr();if(!(e instanceof Stop))console.error(e);}}
// ---------- menús nuevos ----------
const MUSEO5=[['2000','Antena 3','Primer Pasapalabra, con Silvia Jato. Basado en «The Alphabet Game».'],['2006','Antena 3','Jaime Cantizano presenta. Eduardo Benito gana 2.190.000 €.'],['2007','Telecinco','Llega Christian Gálvez y el plató de la mesa blanca y el aro azul.'],['2010','Premio Ondas','Pasapalabra gana el Premio Ondas.'],['2011','Prime Time','Edición de verano en la noche de los jueves.'],['2016','Telecinco','David Leo García gana 1.866.000 €.'],['2018','En familia','Llega Pasapalabra en familia.'],['2020','Antena 3','Vuelve con Roberto Leal.'],['2022','Copa de maestros','Gana Antonio Ruiz por su tirón más largo.'],['2023','Duelo de campeones','Gana Pablo Díaz. Rafa Castaño: 2.272.000 €.'],['2024','Noche de campeones','Orestes Barbero gana en muerte súbita (5-4).'],['2026','Récord','Rosa Rodríguez gana 2.716.000 €.']];
const _sm5b=showMenu;showMenu=function(s='main'){V5.stop();FX5.off();hideBr();document.body.classList.remove('ingame');
 const NEW=['esp','tema','promos','mono','tomas','museo'];if(!NEW.includes(s)){const r=_sm5b(s);
  if(s=='main'){const col=menu.querySelector('.col'),op=col&&col.querySelector('[data-go=opt]');if(op){op.insertAdjacentHTML('beforebegin',
   btn('','🏆','Programas especiales','Prime Time 2011, En familia, Copa de maestros, Duelo y Noche de campeones','esp')+
   btn('','🎃','Programa temático','Ahora: '+V5.tema().emoji+' '+V5.tema().name+' · Halloween, Navidad, Fin de Año…','tema')+
   btn('','📺','Promos','El presentador anuncia los próximos programas','promos')+
   btn('','🎤','Monólogos del presentador','Las 10 normas y charla con el público','mono')+
   btn('','🎬','Tomas falsas','¡Corten!','tomas')+
   btn('','🏛','Museo de Pasapalabra','Momentos y récords de la historia','museo'));
   col.insertAdjacentHTML('afterbegin','<div style="text-align:center"><span class="chip5" data-go="normas10" style="cursor:pointer">📜 Las 10 normas</span></div>');bind5();}}
  if(s=='opt'){const col=menu.querySelector('.col h2');col.insertAdjacentHTML('afterend',`<div class="orow"><label>👏 Público</label><input type="range" min="0" max="1" step=".1" value="${OPT.pub}" data-o5="pub"></div><div class="orow"><label>🗣 Voz presentador</label><input type="range" min="0" max="1" step=".1" value="${OPT.vozp}" data-o5="vozp"></div><div class="orow"><label>✨ Confeti y efectos</label><input type="range" min="0" max="1" step=".25" value="${OPT.efx}" data-o5="efx"></div>`);
   menu.querySelectorAll('[data-o5]').forEach(i=>i.oninput=()=>{OPT[i.dataset.o5]=+i.value;saveOpt();if(i.dataset.o5=='efx'&&OPT.efx>0)FX5.conf(['#ffd23a','#2a6af0'],1.5);});}
  return r;}
 _sm5b('cred');const col=menu.querySelector('.col');let h='';
 if(s=='esp'){h='<h2>🏆 Programas especiales</h2><div class="mtext">Ediciones especiales de Pasapalabra contadas en Wikipedia, con sus normas.</div>'+Object.entries(L5.ESP).map(([k,E])=>`<div class="mbtn" data-e5="${k}"><span class="ic">${E.emoji}</span><div>${E.name}<small>${E.sub}</small></div></div>`).join('');}
 if(s=='tema'){h='<h2>🎃 Programa temático</h2><div class="mtext">Elige la decoración del próximo programa completo. ¡El presentador saluda a su manera!</div>'+L5.TEMAS.map(T=>`<div class="mbtn ${OPT.tema==T.id?'y':''}" data-t5="${T.id}"><span class="ic">${T.emoji}</span><div>${T.name}</div></div>`).join('');}
 if(s=='promos'){h='<h2>📺 Promos</h2><div class="mtext">Elige una promo o míralas todas seguidas.</div>'+btn('y','▶','Todas las promos','','promo:all')+L5.PROMOS.map((p,i)=>btn('','📺',p[0],'','promo:'+i)).join('');}
 if(s=='mono'){h='<h2>🎤 Monólogos del presentador</h2>'+btn('','📜','Las 10 normas de Pasapalabra','','normas10')+btn('','👏','Charla con el público','','publico');}
 if(s=='tomas'){h='<h2>🎬 Tomas falsas</h2><div class="mtext">Lo que no sale en la tele…</div>'+btn('y','▶','Ver todas','','tomas:all');}
 if(s=='museo'){h='<h2>🏛 Museo de Pasapalabra</h2><div class="mus5">'+[2007,2011,2014,2017,2019].map(y=>`<div><img src="${logoURL(300,186,y)}"><b>Plató ${y}</b><br>${(ETAPAS[y]||{}).names||''}</div>`).join('')+MUSEO5.map(m=>`<div><b style="color:#ffd23a">${m[0]} · ${m[1]}</b><br>${m[2]}</div>`).join('')+'</div>';}
 col.innerHTML=h+btn('y','⟵','Volver','','main');bind5();};
function bind5(){menu.querySelectorAll('[data-go],[data-e5],[data-t5]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();sfx('ok');const g=b.dataset.go,e5=b.dataset.e5,t5=b.dataset.t5;
 if(e5)return especial(e5);if(t5){OPT.tema=t5;saveOpt();const T=V5.tema();if(T.conf)FX5.conf(T.conf,2);return showMenu('tema');}
 if(g=='play')return startGame();if(g=='normas10')return hostScene(L5.NORMAS,{banner:'📜 LAS 10 NORMAS',back:'main',clap:1});
 if(g=='publico')return hostScene(L5.PUBLICO,{shots:['host','wide','front'],clap:1,back:'mono'});
 if(g&&g.startsWith('promo:')){const k=g.slice(6),ps=k=='all'?L5.PROMOS:[L5.PROMOS[+k]];return hostScene(ps.map(p=>p[1]),{banner:'📺 PRÓXIMAMENTE',tint:'rgba(255,200,40,.12)',conf:['#ffd23a','#2a6af0','#fff'],music:'splash',mosca:1,w:2.6,back:'promos'});}
 if(g=='tomas:all')return hostScene(L5.TOMAS.map(t=>[t[0],'cut']),{banner:'🎬 TOMAS FALSAS',back:'tomas'});
 showMenu(g);});}
$('#ver').textContent='v0.6';
Object.assign(DBG,{FX5,especial,hostScene,L5,torneo});
// ---------- LA PISTA MUSICAL (Wikipedia): 3 turnos, 5 pistas de 5-4-3-2-1 s; 5, 3 y 1 = trozos de la sintonía ----------
V5.pmAudio=null;
function pmPlay(id,k){return new Promise(r=>{try{if(V5.pmAudio)V5.pmAudio.pause();stopMusic();const a=new Audio(`snd/pm/${id}${k}.ogg`);a.volume=Math.max(OPT.mus,.6);V5.pmAudio=a;a.onended=()=>r();a.onerror=()=>r();a.play().catch(()=>r());setTimeout(r,4600);}catch(e){r();}});}
async function pistaMusical(rid){prep();cut('host');hostSay(PML5.intro);await wait(3.2,rid);
 let rk=+localStorage.getItem('pp3d_pm')||0;const songs=[0,1,2].map(i=>PM5[(rk*3+i)%PM5.length]);localStorage.setItem('pp3d_pm',rk+1);
 for(let t=0;t<3;t++){chk(rid);const [id,ans,desc,otras]=songs[t];cut('wide');hostSay(PML5.turnos[t]);await wait(2,rid);
  const opts=[ans,...PM5.filter(s=>s[1]!=ans).map(s=>s[1]).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);let done=false;
  for(let k=0;k<5&&!done;k++){chk(rid);const val=5-k;cut('host');hostSay(PML5.pistas[k]);await wait(1.4,rid);
   if(k==0||k==2||k==4){say('🎵 🎵 🎵');await pmPlay(id,k/2);}else{hostSay(k==1?desc:'«'+otras+'»');await wait(2.4,rid);}
   chk(rid);
   // pulsador: el jugador tiene ~3 s; el rival puede pulsar antes
   const cpuT=1+Math.random()*3,cpuWants=Math.random()<.25+k*.15;let who=await new Promise(res=>{let ok=true;setActs([{t:'¡PULSAR!',ic:'🔴',cls:'y',cb:()=>{if(ok){ok=false;res(0);}}}]);
    setTimeout(()=>{if(ok){ok=false;res(cpuWants?1:-1);}},(cpuWants?cpuT:3.2)*1000);});setActs();chk(rid);if(who<0)continue;
   for(let tries=0;tries<2&&!done;tries++){let right;
    if(who==0){cut('team_b');sfx('ok');const v=await new Promise(res=>setActs(opts.map(o=>({t:o,cb:()=>res(o)}))));setActs();right=v==ans;}
    else{cut('team_o');await wait(1,rid);right=Math.random()<.45+k*.12;say(`Naranja responde: <b>${right?ans:pick(opts.filter(o=>o!=ans))}</b>`);await wait(1.2,rid);}
    chk(rid);if(right){done=true;sfx('winner');GAME.sec[who]+=val;cut('host');hostSay(`¡Correcto! Era <b>${ans}</b>.`);await wait(2,rid);await rotulo(`${who?'NARANJA':'AZUL'}: +${val} s`,who?COL.or:COL.bl,rid);}
    else{sfx('error');hostSay(PML5.rebote);await wait(1.4,rid);who=1-who;}}}
  if(!done){hostSay(PML5.nadie+` Era <b>${ans}</b>.`);await wait(2.2,rid);}if(V5.pmAudio)V5.pmAudio.pause();}
 say();clearG();}
[2011,2014,2017,2019].forEach(y=>ETAPAS[y].pr.forEach(p=>{if(p[0]=='pista')p[1]=pistaMusical;}));
if(ETAPAS[2011].names)['2011','2014','2017'].forEach(y=>ETAPAS[y].names=ETAPAS[y].names.replace('La Pista','La Pista musical'));
DBG.pistaMusical=pistaMusical;
