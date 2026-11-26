/* Pasapalabra 3D v0.39 · Chat del plató, local, cálido y con memoria del nombre.
 * Inspirado en el NLU de ¡Ahora Caigo! 1.76, mejorado: recuerda «me llamo X»,
 * no repite, entiende erratas y nunca dice «No tengo una respuesta preparada».
 * Todas las intervenciones van marcadas 🆕 INVENTADO. Voces Piper es_ES. */
(()=>{
'use strict';
const LS_NAME='pp039_nombre';
const LS_USED='pp039_used';
const ORDER=['nombre','animo','chiste','favoritos','presentadores','programa','rosco','prueba','musica','video','juego','quien','elogio','gracias','comoestas','despedida','ayuda','saludo','corto','fallback'];
const KW={
  animo:['triste','tristeza','cansado','cansada','miedo','agobiado','agobiada','deprimido','deprimida','me siento mal','estoy mal','llorar','lloro','me aburro','solo en casa','nervioso','nerviosa','fatal','horrible','regular','desanimado','desanimada','bajo de animo','no puedo','dificil','animo','angustia','preocupado','preocupada'],
  chiste:['chiste','chistes','broma','bromas','hazme reir','cuentame un chiste','cuentame algo','divierteme','humor','algo gracioso','una risa','se gracioso','se graciosa'],
  favoritos:['favorito','favorita','favoritos','favoritas','te gusta','me gusta','prefieres','preferido','preferida','color favorito','comida favorita','tu favorito','cual te gusta'],
  presentadores:['presentador','presentadora','presentadores','christian','galvez','silvia','jazmin','lola','javi','pablo','avatar'],
  programa:['pasapalabra','programa','programas','concurso','telecinco','antena','el bote','audiencia','plato','directo'],
  rosco:['rosco','letras','acierto','aciertos','pasapalabra','bote','definicion','definiciones','la a','la zeta','25 letras'],
  prueba:['escalera','pulsador','prueba','pruebas','cruzadas','pista','coco','donde estan','el coco'],
  musica:['musica','cancion','canciones','sintonía','sintonia','cabecera','sonido','cantar','tararear','himno'],
  video:['video','videos','biblioteca','reyes','nochevieja','clip','programa completo','ver un programa'],
  juego:['jugar','juego','juega','jugamos','multijugador','turnos','amigos','partida','reglas','como se juega'],
  quien:['quien eres','quienes sois','como te llamas','eres real','eres de verdad','tu voz','robot','inteligencia','ia','chatgpt','gemini','grok','persona real','eres un bot','inteligencia artificial'],
  elogio:['te quiero','me encantas','me encantas','eres el mejor','eres la mejor','guapo','guapa','crack','increible','genial eres','que bueno eres','me caes bien','me cae bien','monisimo','monisima','un sol'],
  gracias:['gracias','muchas gracias','mil gracias','genial','estupendo','me encanta','bravo','buenisimo','mola','que bueno','divertido'],
  comoestas:['que tal','como estas','como esta','como te va','como andas','que haces','estas bien','que tal estas','como te encuentras','como va todo','como te sientes'],
  despedida:['adios','adiós','hasta luego','me voy','chao','agur','nos vemos','buenas noches','hasta manana','hasta mañana','bye','hasta pronto','me piro','hasta ahora'],
  ayuda:['ayuda','ayudame','que puedes','que sabes','que puedo','como funciona','no se usarlo','no se usar','que hago'],
  saludo:['hola','buenas','buenos dias','buenas tardes','buenas noches','hey','holi','saludos','ey','qué hay','que hay','muy buenas','buenas tardes'],
  corto:[]
};
const COMMON=new Set('tengo tiene tienes para pero como esto esta estas este eres sabes quiero puedes hora sola solo bola cola hoja hija hijo mucho mucha poco todo toda todos nada algo cosa casa cara caro cada ahora antes luego bien otra otro vale porque donde cuando mira mismo decir dime hace hacer hago creo estoy vamos vaya verdad mejor peor tambien tampoco siempre nunca gente parece quien cual sobre desde hasta entre tanto menos claro gusta gustan sale salir pasa paso muy alla aqui ellos ellas nosotros vosotros usted tenia tenias seria sera haber hemos habeis estan estamos jugar comer cantar pala pelo pena dias dios cosas veces vida mundo mama papa hola soy eres un una unos unas del los las por con sin que quee si no ya eh um pues oye mira a al el la lo le te tu mi me se de en es ha he'.split(' '));
const NOT_NAME=new Set('feliz triste cansado cansada yo tu el la lo un una de del fan concursante concursanta persona gente hombre mujer chico chica amigo amiga bien mal aqui alli asi tambien nuevo nueva real robot avatar presentador presentadora cristiano cristiano programador creador jefe amo campeon campeona dueño dueña ikeriano'.split(' '));
// ikeriano IS a name - wait I put it in NOT_NAME by mistake. Remove it.
NOT_NAME.delete('ikeriano');

function norm(s){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function clean(s){return norm(s).replace(/[^a-z0-9ñ ]/g,' ').replace(/\s+/g,' ').trim();}
function osa(a,b){const m=a.length,n=b.length;if(Math.abs(m-n)>2)return 9;const d=Array.from({length:m+1},()=>[]);for(let i=0;i<=m;i++)d[i][0]=i;for(let j=0;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){const c=a[i-1]===b[j-1]?0:1;d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+c);if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);}return d[m][n];}
function niceName(raw){const s=String(raw||'').trim().replace(/\s+/g,' ');if(!s)return '';return s.split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(' ');}
function isIker(n){const t=norm(n).replace(/[^a-z]/g,'');if(!t)return false;return t==='iker'||t==='ikeriano'||(t.length>=3&&t[0]==='i'&&(osa(t,'iker')<=2||osa(t,'ikeriano')<=2||t.startsWith('iker')));}
function loadName(){try{return localStorage.getItem(LS_NAME)||'';}catch(e){return '';}}
function saveName(n){try{if(n)localStorage.setItem(LS_NAME,n);else localStorage.removeItem(LS_NAME);}catch(e){}}
function loadUsed(){try{return JSON.parse(localStorage.getItem(LS_USED)||'{}');}catch(e){return {};}}
function saveUsed(u){try{localStorage.setItem(LS_USED,JSON.stringify(u));}catch(e){}}

function extractName(raw){
  const s=' '+clean(raw)+' ';
  // me llamo / me yamo / mellamo / mi nombre es
  let m=s.match(/ (?:me ?(?:l+amo|yamo|jamo|llamao)|mellamo|meyamo|mi nombre es|me llamo de) ([a-zñ]{2,20})(?: ([a-zñ]{2,20}))? /);
  if(m){
    const a=m[1], b=m[2];
    if(NOT_NAME.has(a)||COMMON.has(a)){
      if(b&&!NOT_NAME.has(b)&&!COMMON.has(b)) return niceName(b);
    }else{
      const full=b&&!NOT_NAME.has(b)&&!COMMON.has(b)&&b.length<=12? a+' '+b:a;
      return niceName(full);
    }
  }
  m=s.match(/ (?:yo soy|soy) ([a-zñ]{2,20}) /);
  if(m){
    const a=m[1];
    if(!NOT_NAME.has(a)&&!COMMON.has(a)&&a.length>=3&&!/^(muy|super|bastante|poco)$/.test(a)) return niceName(a);
  }
  return '';
}

function analyze(raw){
  const words=String(raw).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const toks=words.map(w=>norm(w).replace(/(.)\1{2,}/g,'$1$1'));
  const s=' '+toks.join(' ')+' ';
  const name=extractName(raw);
  const hit={};
  if(name) hit.nombre=1;
  for(const k of ORDER){
    const list=KW[k]; if(!list||!list.length) continue;
    for(const kw of list){
      if(kw.includes(' ')){ if(s.includes(' '+kw+' ')||s.includes(' '+kw)){hit[k]=1;break;} }
      else if(toks.some(t=>t===kw||(kw.length>=4&&t.startsWith(kw)&&t.length<=kw.length+3))){hit[k]=1;break;}
    }
  }
  // fuzzy typos against keywords (len>=5, distance 1, or 2 if long)
  toks.forEach(t=>{
    if(t.length<4||COMMON.has(t)) return;
    if(ORDER.some(k=>(KW[k]||[]).includes(t))) return;
    for(const k of ORDER){
      if(hit[k]||!KW[k]) continue;
      for(const kw of KW[k]){
        if(kw.includes(' ')||kw.length<5) continue;
        const thr=kw.length>=8?2:1;
        if(osa(t,kw)<=thr){hit[k]=1;return;}
      }
    }
  });
  // "hola" typo: ola, hla, holaa already reduced
  if(!hit.saludo&&toks.some(t=>t.length>=3&&osa(t,'hola')<=1)) hit.saludo=1;
  let k=ORDER.find(x=>hit[x]);
  if(k==='saludo'&&ORDER.some(x=>x!=='saludo'&&x!=='nombre'&&hit[x])) k=ORDER.find(x=>x!=='saludo'&&hit[x]);
  // if they just introduced themselves, prefer nombre even with a greeting
  if(hit.nombre) k='nombre';
  const plain=s.trim();
  if(!k&&/^(si|no|vale|ok|okay|claro|bueno|nada|venga|ya|aja|vale vale|si si|no no|puede)$/.test(plain)) k='corto';
  if(!k) k='fallback';
  return {k,name,iker:name?isIker(name):isIker(loadName())};
}

function fill(tpl, raw, name){
  const q=String(raw||'').trim().replace(/\s+/g,' ').slice(0,48);
  return String(tpl).replace(/\{n\}/g, name||'').replace(/\{q\}/g, q);
}

function pick(who, intent, prefersIker){
  const db=(window.CHAT039&&window.CHAT039.characters)||{};
  const ch=db[who]||db.Christian; if(!ch) return null;
  let pool=ch[intent];
  if(prefersIker&&ch[intent+'Iker']&&ch[intent+'Iker'].length) pool=ch[intent+'Iker'];
  if((!pool||!pool.length)&&intent==='nombre'&&prefersIker&&ch.nombreIker) pool=ch.nombreIker;
  if(!pool||!pool.length) pool=ch.fallback;
  if(!pool||!pool.length) return null;
  const used=loadUsed();
  const uk=who+':'+intent+(prefersIker&&(intent==='nombre'||intent==='saludo')?'Iker':'');
  const seen=used[uk]||[];
  let fresh=pool.map((_,i)=>i).filter(i=>!seen.includes(i));
  if(!fresh.length){used[uk]=[]; fresh=pool.map((_,i)=>i);}
  const i=fresh[Math.random()*fresh.length|0];
  used[uk]=(used[uk]||[]).concat([i]);
  if(used[uk].length>80) used[uk]=used[uk].slice(-40);
  saveUsed(used);
  return pool[i];
}

let chatAudio=null, bubbleTimer=0, voiceToken=0;
function cancelChatVoice(){
  voiceToken++;
  if(chatAudio){try{chatAudio.pause();chatAudio.removeAttribute('src');chatAudio.load();}catch(e){}}
  chatAudio=null;
}
function voicesOn(){
  try{return !!(window.PP037&&PP037.settings&&PP037.settings.voices);}catch(e){return true;}
}
function speakChat(src, text){
  cancelChatVoice();
  try{document.querySelectorAll('audio').forEach(a=>{if(a.tagName==='AUDIO'&&!a.closest('video')){try{a.pause();}catch(e){}}});}catch(e){}
  const bub=document.getElementById('bubble37');
  if(bub){bub.textContent=text;bub.style.cssText+=';display:block;left:40vw;top:23vh';clearTimeout(bubbleTimer);bubbleTimer=setTimeout(()=>{bub.style.display='none';},Math.max(5000,text.length*60));}
  if(!voicesOn()||!src) return;
  const token=voiceToken;
  const a=chatAudio=new Audio(src);
  a.preload='auto'; a.volume=1;
  const done=()=>{if(token!==voiceToken)return;try{a.pause();}catch(e){} if(chatAudio===a)chatAudio=null;};
  a.onended=done; a.onerror=done;
  a.play().catch(done);
}

function replyFor(text, who){
  const raw=String(text||'').trim().slice(0,300);
  const info=analyze(raw);
  if(info.name){
    const stored=isIker(info.name)?'Iker':info.name;
    saveName(stored);
    info.iker=isIker(stored);
  }
  const name=loadName();
  const iker=isIker(name);
  let intent=info.k;
  const line=pick(who, intent, iker&&(intent==='nombre'||intent==='saludo'));
  if(!line){
    const fallback={text:'Qué interesante lo que dices. Cuéntame un poco más, que me has dejado con ganas de saber.',voz:'Qué interesante lo que dices. Cuéntame un poco más, que me has dejado con ganas de saber.',src:''};
    return {intent:'fallback', name, text:fill(fallback.text, raw, name), src:fallback.src, id:''};
  }
  const shown=fill(line.text, raw, name);
  return {intent, name, text:shown, src:line.src, id:line.id, voz:line.voz};
}

function sendChat(text, who){
  text=String(text||'').trim().slice(0,300); if(!text) return null;
  who=who||((document.getElementById('who37')||{}).value)||'Christian';
  const p=(window.PP037&&PP037.multi&&PP037.multi.players)?PP037.multi.players[PP037.multi.turn].name:'Tú';
  if(window.PP037&&typeof PP037==='object'){
    // use existing logger if the DOM is up
  }
  logLine(p, text);
  const r=replyFor(text, who);
  // hard safety: never the old robot phrase
  if(/no tengo una respuesta preparada/i.test(r.text)){
    r.text='Me has dejado con curiosidad. ¿Me lo cuentas un poco mejor?';
  }
  const chName=who;
  logLine(chName+' · 🆕 INVENTADO', r.text);
  speakChat(r.src, r.text);
  try{if(window.PP037&&PP037.stats&&PP037.stats.chat) PP037.stats.chat.push({who:chName,intent:r.intent,line:r.id,text:r.text});}catch(e){}
  return {who:chName, intent:r.intent, line:r.id, text:r.text, name:r.name};
}

function logLine(who, text){
  const box=document.getElementById('chatLog37');
  if(!box) return;
  const row=document.createElement('div'); row.className='line';
  const s=document.createElement('span'); s.className='sender'; s.textContent=who+': ';
  row.appendChild(s); row.appendChild(document.createTextNode(text));
  box.appendChild(row);
  while(box.children.length>80) box.firstChild.remove();
  box.scrollTop=99999;
}

function hook(){
  const inv=document.querySelector('#chat37 .invent');
  if(inv) inv.textContent='🆕 INVENTADO · charla cálida y local, con voz Piper · sin internet';
  const input=document.getElementById('chatInput37');
  if(input) input.placeholder='Cuéntame lo que quieras…';
  const form=document.getElementById('chatForm37');
  if(form) form.onsubmit=e=>{e.preventDefault();sendChat((document.getElementById('chatInput37')||{}).value);const i=document.getElementById('chatInput37');if(i){i.value='';i.focus();}};
  const btn=form&&form.querySelector('button[type=submit]');
  if(btn) btn.onclick=e=>{e.preventDefault();if(form) form.onsubmit(e);};
  if(window.PP037){
    PP037.sendChat=sendChat;
    PP037.intent=s=>analyze(s).k;
    PP037.chat039={analyze,extractName,loadName,saveName,replyFor,isIker,sendChat};
  }
  window.PP039={analyze,extractName,loadName,saveName,replyFor,isIker,sendChat,fill};
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', hook);
else hook();
})();
