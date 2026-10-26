// ======================================================================
//  v0.5 — el presentador habla: clips reales de Christian Gálvez donde los hay
//  y voz Piper (es_ES-davefx-medium, la misma de «Ahora Caigo») para todo lo demás.
//  Preguntas fáciles, Silla azul (2019), Escalera de 7 a 3 letras y La historia contada.
// ======================================================================
const V5={a:null,tok:0,until:0,armed:false,react:0,inVoz:false,mute:false};
V5.key=h=>String(h||'').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/^Presentador:\s*/,'').replace(/\s+/g,' ').trim();
V5.clip=h=>(typeof VOZ5!=='undefined')&&VOZ5[V5.key(h)];
V5.stop=()=>{if(V5.a){try{V5.a.pause();}catch(e){}V5.a=null;}V5.until=0;};
V5.left=()=>Math.max(0,(V5.until-performance.now())/1000);
V5.play=(c)=>{V5.stop();V5.until=performance.now()+c[1]*1000;if(OPT.mus<=0&&OPT.sfx<=0)return;try{const a=new Audio('snd/p5/'+c[0]+'.ogg');a.volume=Math.max(OPT.sfx,.7);a.play().catch(()=>{});V5.a=a;}catch(e){}};
const _say5=say;
say=function(html){const tk=++V5.tok;
 if(!html){V5.stop();return _say5(html);}
 const c=!V5.inVoz&&V5.clip(html);
 const go=()=>{if(tk!==V5.tok)return;_say5(html);if(c){V5.play(c);V5.armed=true;}};
 const d=V5.react-performance.now();if(c&&d>0){setTimeout(go,d);V5.until=performance.now()+d+c[1]*1000;V5.armed=true;}else go();};
// las esperas fijas se alargan lo justo para que la frase termine
const _wait5=wait;
wait=function(s,id){if(V5.armed){V5.armed=false;s=Math.max(s,Math.min(s+9,V5.left()+.25));}return _wait5(s,id);};
// los clips reales de Christian no se doblan
const _voz5=voz;
voz=async function(k,rid){V5.inVoz=true;V5.stop();try{return await _voz5(k,rid);}finally{V5.inVoz=false;}};
V5.OK=['¡Muy bien!','¡Correcto!','¡Eso es!','¡Perfecto!','¡Bravo!'];
V5.doReact=ok=>{const t=ok?pick(V5.OK):'¡Oh, no!';const c=V5.clip(t);if(!c)return;V5.tok++;_say5('<b>Presentador:</b> '+t);V5.play(c);V5.react=performance.now()+c[1]*1000+80;};
// ---------- parches sobre las pruebas (sin tocar los clips reales) ----------
(()=>{
 const fix=(name,reps)=>{const f=eval(name);let src=f.toString();for(const [a,b] of reps){if(!src.includes(a))console.warn('v05 parche',name,a.slice(0,40));src=src.split(a).join(b);}
  const nf=(0,eval)('('+src+')');window.__v5f=nf;(0,eval)(name+'=window.__v5f');
  Object.values(ETAPAS).forEach(E=>E.pr&&E.pr.forEach(p=>{if(p[1]===f)p[1]=nf;else if(p[0]==name&&p[1].v3)p[1]=Object.assign(async function(rid){cut('orbitR');return nf(rid);},{v3:1});}));
  if(window.DBG&&DBG[name])DBG[name]=nf;};
 // EL ROSCO: 6 roscos completos que van rotando + reacciones del presentador
 fix('rosco',[['const items=ORIG.ROS.map(a=>pick(a));','const rk=(+localStorage.getItem("pp3d_rk")||0);localStorage.setItem("pp3d_rk",rk+1);const items=ORIG.ROS.map(a=>a[rk%a.length]);'],
  ['const d=rnd(1.4,2.6);','const d=Math.max(rnd(1.4,2.6),V5.left()+.4);'],
  ["if(res=='ok'){st[turn][i]=1;","if(res=='ok'){if(turn==0)V5.doReact(1);st[turn][i]=1;"]]);
 // LA ESCALERA: como en Telecinco, de 7 letras a 3 (anagrama con una letra menos)
 fix('escalera',[['sets[si++].slice().reverse()','sets[si++].slice()'],['cada palabra tiene una letra más que la anterior. ¡Sube todo lo que puedas!','empezamos con 7 letras y cada palabra tiene una letra menos. ¡Baja la escalera!'],['-160+wi*62','170-wi*62']]);
 // el presentador lee las definiciones en voz alta
 fix('pulsador',[['qb.q=q.toUpperCase();qb.L.set();','qb.q=q.toUpperCase();qb.L.set();hostSay(q);']]);
 fix('imposible',[['db.q=d;db.L.set();','db.q=d;db.L.set();hostSay(d);']]);
 fix('depar',[['clue.setT(c.toUpperCase());','clue.setT(c.toUpperCase());hostSay(c.charAt(0)+c.slice(1).toLowerCase());']]);
 fix('laPista',[['qb.q=clues[0].toUpperCase();qb.L.set();','qb.q=clues[0].toUpperCase();qb.L.set();hostSay(clues[0]);'],['qb.q=clues[k].toUpperCase();qb.L.set();','qb.q=clues[k].toUpperCase();qb.L.set();hostSay(clues[k]);']]);
})();
// ---------- 2019: SILLA AZUL (según Wikipedia, desde sept. 2018; no suma segundos) ----------
async function sillaAzul(rid){prep();cut('host');
 hostSay('<b>La Silla Azul</b>: elige una de las dos letras y responde. ¡Quien falle dos preguntas, deja la silla!');await wait(3.4,rid);say();
 const LET='ABCDEFGHIJLMNOPRSTUVZ';const pool=[];ORIG.ROS.forEach((a,i)=>{const L=LETRAS[i];if(!LET.includes(L))return;a.forEach(([ans,def])=>{if(norm(ans[0]).startsWith(L))pool.push([L,ans,def]);});});
 const f=[0,0];let turn=0,used=new Set(),n=0;if(window.S9)S9.show(['TÚ','RIVAL'],['?','?']);
 while(f[0]<2&&f[1]<2&&n<8){chk(rid);n++;const ls=shuffle([...new Set(pool.filter(q=>!used.has(q[2])).map(q=>q[0]))]).slice(0,2);
  cut(turn?'orange':'blue');if(window.S9)S9.turn(turn);let L;
  if(turn==0){hostSay('¿Qué letra eliges?');L=await new Promise(r=>setActs(ls.map(x=>({t:'Letra '+x,ic:x,cls:'y',cb:()=>r(x)}))));setActs();}
  else{await wait(1,rid);L=pick(ls);say(`El rival elige la <b>${L}</b>`);await wait(1.2,rid);}
  if(window.S9)S9.letter(turn,L);const q=pick(pool.filter(x=>x[0]==L&&!used.has(x[2])));used.add(q[2]);
  hostSay(`<b>Empieza por ${L}:</b> ${q[2].charAt(0)+q[2].slice(1).toLowerCase()}`);let ok;
  if(turn==0){let tl=15;const v=await ask(()=>(tl-=.016)<=0||rid!==RUN);chk(rid);ok=v!==null&&q[1].some(a=>norm(a)===norm(v));}
  else{await wait(Math.max(2,V5.left()+.5),rid);ok=Math.random()<.7;say(`Naranja responde: <b>${ok?q[1][0]:'…'}</b>`);await wait(1.2,rid);}
  sfx(ok?'ok':'error');if(ok){if(turn==0)V5.doReact(1);await wait(1.2,rid);}else{f[turn]++;if(window.S9)S9.fail(turn);say(`La respuesta correcta: <b>${q[1][0]}</b>`);await wait(1.6,rid);}
  turn=1-turn;}
 if(window.S9)S9.hide();say();const w=f[0]<f[1]?0:f[1]<f[0]?1:-1;
 hostSay(w==0?'¡Te quedas en la <b>Silla Azul</b>! ¡Bien hecho!':w==1?'¡El rival se queda en la silla! Pero tú sigues jugando, ¡ánimo!':'¡Empate! ¡Seguimos los dos!');sfx(w==1?'loser':'winner');await wait(2.4,rid);say();clearG();}
if(ETAPAS[2019]){ETAPAS[2019].pr.unshift(['silla',sillaAzul]);ETAPAS[2019].lines=ETAPAS[2019].lines||{};ETAPAS[2019].lines.silla='Empezamos con la <b>Silla Azul</b>';ETAPAS[2019].names='Silla Azul, '+ETAPAS[2019].names;}
const _pc5=playCort;playCort=async function(id,rid){if(!CORT[id]&&!CORT[id+'B'])return;return _pc5(id,rid);};
// ---------- LA HISTORIA, contada por el presentador ----------
const HIST5=[
['¡Hola, hola! Hoy no hay rosco… ¡hoy hay <b>historia</b>! Os cuento la vida de Pasapalabra.'],
['Todo empezó con un concurso británico: <b>The Alphabet Game</b>. O sea, «el juego del alfabeto». ¡Qué originales los ingleses!'],
['El <b>24 de julio de 2000</b>, Pasapalabra llegó a <b>Antena 3</b>.','El veinticuatro de julio del año dos mil, Pasapalabra llegó a Antena tres.'],
['La primera presentadora fue <b>Silvia Jato</b>. ¡Hizo 1.193 programas! Yo me canso solo de contarlos.','La primera presentadora fue Silvia Jato. ¡Hizo mil ciento noventa y tres programas! Yo me canso solo de contarlos.'],
['Cuando Silvia se fue de baja por maternidad, la sustituyó <b>Constantino Romero</b>. ¡Qué vozarrón!'],
['En 2006 llegó <b>Jaime Cantizano</b>… ¡y con él, un bote gigante!','En dos mil seis llegó Jaime Cantizano… ¡y con él, un bote gigante!'],
['<b>Eduardo Benito</b> se llevó <b>2.190.000 €</b>. ¡El mayor premio de la tele en España en aquel momento!','Eduardo Benito se llevó dos millones ciento noventa mil euros. ¡El mayor premio de la tele en España en aquel momento!'],
['Luego el concurso <b>¡Boom!</b> nos quitó el récord, y en 2019 lo subió a <b>6.689.700 €</b>. ¡Eso ya son palabras mayores!','Luego el concurso Bum nos quitó el récord, y en dos mil diecinueve lo subió a seis millones seiscientos ochenta y nueve mil setecientos euros. ¡Eso ya son palabras mayores!'],
['En 2007 Pasapalabra se mudó a <b>Telecinco</b>. ¿Y adivináis quién llegó a presentarlo? ¡Exacto: yo!','En dos mil siete Pasapalabra se mudó a Telecinco. ¿Y adivináis quién llegó a presentarlo? ¡Exacto: yo!'],
['De 2007 a 2019: <b>3.292 programas</b>. ¡Más roscos que en una pastelería!','De dos mil siete a dos mil diecinueve: tres mil doscientos noventa y dos programas. ¡Más roscos que en una pastelería!'],
['En 2010 nos dieron el <b>Premio Ondas</b> por diez años de éxito. ¡Y sin pasar palabra!','En dos mil diez nos dieron el Premio Ondas por diez años de éxito. ¡Y sin pasar palabra!'],
['<b>David Leo García</b> ganó un bote de <b>1.866.000 €</b> en 2016. ¡Aplausos!','David Leo García ganó un bote de un millón ochocientos sesenta y seis mil euros en dos mil dieciséis. ¡Aplausos!'],
['Y <b>Rafa Castaño</b> llegó a sumar 90 segundos extra para su rosco. ¡Le sobraba tiempo hasta para merendar!','Y Rafa Castaño llegó a sumar noventa segundos extra para su rosco. ¡Le sobraba tiempo hasta para merendar!'],
['Pero el <b>1 de octubre de 2019</b>, el Tribunal Supremo ordenó dejar de emitirlo en Telecinco. ¡Ese mismo día fue el último programa!','Pero el uno de octubre de dos mil diecinueve, el Tribunal Supremo ordenó dejar de emitirlo en Telecinco. ¡Ese mismo día fue el último programa!'],
['En 2020, Pasapalabra volvió a casa: a <b>Antena 3</b>, veinte años después de su estreno, con <b>Roberto Leal</b>.','En dos mil veinte, Pasapalabra volvió a casa: a Antena tres, veinte años después de su estreno, con Roberto Leal.'],
['Allí Rafa Castaño ganó <b>2.272.000 €</b>, ¡acertando las 25 palabras en un solo turno!','Allí Rafa Castaño ganó dos millones doscientos setenta y dos mil euros, ¡acertando las veinticinco palabras en un solo turno!'],
['Y en 2026, <b>Rosa Rodríguez</b> se llevó el bote más alto: <b>2.716.000 €</b>. ¡Récord!','Y en dos mil veintiséis, Rosa Rodríguez se llevó el bote más alto: dos millones setecientos dieciséis mil euros. ¡Récord!'],
['Ah, y en junio de 2026 la tele cambió el rosco por una prueba nueva, <b>AlaZ</b>. ¡Pero aquí el Rosco sigue girando!','Ah, y en junio de dos mil veintiséis la tele cambió el rosco por una prueba nueva, A la Z. ¡Pero aquí el Rosco sigue girando!'],
['¿Y tú? ¿Te atreves con el rosco? ¡Pues venga!']];
async function historia(){const rid=++RUN;MODE.menu=false;menu.classList.add('hidden');$('#ver').classList.add('hidden');setPeople(false);P.host.visible=true;
 const sk=$('#skip');sk.textContent='Volver ⟵';sk.classList.remove('hidden');sk.onpointerdown=e=>{e.preventDefault();V5.stop();sk.textContent='Menú ☰';showMenu('main');};
 try{const shots=['host','front','wide','host'];
  for(let i=0;i<HIST5.length;i++){chk(rid);cut(shots[i%shots.length]==='front'&&!SHOTS.front?'host':shots[i%shots.length]);hostSay(HIST5[i][0]);await wait(2,rid);}
  // remate con un clip real de Christian Gálvez
  cut('host');V5.inVoz=true;_say5('<b>Presentador:</b> Pues vamos a jugar: primera prueba, <b>La Escalera</b>.');V5.stop();
  if(OPT.mus>0||OPT.sfx>0){V5.a=new Audio('snd/voz/2007_escalera_pre.ogg');V5.a.volume=Math.max(OPT.sfx,.7);V5.a.play().catch(()=>{});}
  await _wait5(3.7,rid);V5.inVoz=false;V5.stop();_say5();sk.textContent='Menú ☰';showMenu('main');}catch(e){V5.inVoz=false;if(!(e instanceof Stop))console.error(e);}}
const _sm5=showMenu;showMenu=function(s){if(s=='hist'){V5.stop();_sm5('main');return historia();}V5.stop();return _sm5(s);};
TEXTS.hist='<p>'+HIST5.map(h=>h[0]).join('</p><p>')+'</p>';
$('#ver').textContent='v0.5';
Object.assign(DBG,{V5,historia,sillaAzul,HIST5});
