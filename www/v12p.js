// v0.12 · PC12: motor 2D con los GRÁFICOS, la FUENTE (UGF «FontBig»), las PANTALLAS y los SONIDOS del juego de PC «Pasapalabra» de Antena 3
// (ISO de Iker, Bialplen S.L., ~2001) + las reglas de los 6 juegos, recompuestas a mano (PASAP.EXE no se pudo ejecutar). Reglas = «aproximado».
const PC12=(()=>{
const FBJ={"a": [1, 1, 15, 19], "b": [19, 1, 16, 19], "c": [38, 1, 15, 19], "d": [56, 1, 16, 19], "e": [75, 1, 15, 19], "f": [93, 1, 10, 19], "g": [106, 1, 15, 19], "h": [124, 1, 15, 19], "i": [142, 1, 10, 19], "j": [155, 1, 11, 19], "k": [169, 1, 17, 19], "l": [189, 1, 9, 19], "m": [201, 1, 24, 19], "n": [228, 1, 16, 19], "ñ": [247, 1, 16, 19], "o": [266, 1, 15, 19], "p": [284, 1, 17, 19], "q": [304, 1, 15, 19], "r": [322, 1, 13, 19], "s": [338, 1, 15, 19], "t": [356, 1, 10, 19], "u": [369, 1, 16, 19], "v": [388, 1, 16, 19], "w": [407, 1, 20, 19], "x": [430, 1, 16, 19], "y": [449, 1, 17, 19], "z": [469, 1, 15, 19], "A": [2, 29, 31, 32], "B": [36, 29, 28, 32], "C": [67, 29, 30, 32], "D": [101, 29, 30, 32], "E": [134, 29, 26, 32], "F": [168, 29, 24, 32], "G": [195, 29, 30, 32], "H": [231, 29, 29, 32], "I": [265, 29, 17, 32], "J": [286, 29, 24, 32], "K": [314, 29, 31, 32], "L": [348, 29, 24, 32], "M": [376, 29, 34, 32], "N": [414, 29, 29, 32], "Ñ": [450, 29, 28, 32], "O": [481, 29, 31, 32], "P": [516, 29, 28, 32], "Q": [548, 29, 31, 32], "R": [582, 29, 29, 32], "S": [1, 66, 27, 32], "T": [33, 66, 28, 32], "U": [65, 66, 29, 32], "V": [98, 66, 30, 32], "W": [134, 66, 39, 32], "X": [177, 66, 31, 32], "Y": [212, 66, 31, 32], "Z": [247, 66, 27, 32], "0": [277, 66, 26, 32], "1": [306, 66, 17, 32], "2": [327, 66, 25, 32], "3": [356, 66, 25, 32], "4": [384, 66, 26, 32], "5": [413, 66, 26, 32], "6": [442, 66, 27, 32], "7": [472, 66, 25, 32], "8": [500, 66, 26, 32], "9": [529, 66, 26, 32], ".": [558, 66, 15, 32]};const FBI=new Image();FBI.src='jato/FontBig.webp';
const W=640,H=480,LET28=['A','B','C','D','E','F','G','H','I','J','K','L','LL','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const CARI=['Figol','Matona','Noris','Papela','Seguro','Zamara'];
const st=document.createElement('style');st.textContent=`#pc12{position:fixed;inset:0;z-index:20;background:#000;display:flex;align-items:center;justify-content:center;overflow:hidden;font-family:N,Arial,sans-serif}
#pc12 .bx{position:relative;width:640px;height:480px;flex:none;transform-origin:center center;background-size:100% 100%;background-color:#06123a;overflow:hidden;color:#fff}
#pc12 .a{position:absolute}#pc12 .hudb{position:absolute;top:6px;width:128px;height:46px;border-radius:8px;border:2px solid #fff8;font:900 13px/1.15 N,Arial;padding:3px 6px;box-sizing:border-box;text-shadow:0 1px 2px #000}
#pc12 .hudb b{font-size:20px;float:right}#pc12 .hudb.az{left:8px;background:linear-gradient(#2f6cffcc,#0b2f9acc)}#pc12 .hudb.ro{right:8px;background:linear-gradient(#e0283ccc,#8a0f1fcc)}
#pc12 .txt{left:40px;width:560px;text-align:center;font:800 21px/1.25 N,Arial;text-shadow:0 2px 3px #000,0 0 8px #000;background:#0a164a99;border-radius:12px;padding:10px 14px;box-sizing:border-box}
#pc12 .shape{font:900 30px N,monospace;letter-spacing:6px;text-align:center;left:20px;width:600px;text-shadow:0 2px 3px #000,0 0 8px #000}
#pc12 .pcb{left:50%;transform:translateX(-50%);min-width:300px;text-align:center;font:900 20px N,Arial;padding:9px 18px;margin:0;border-radius:14px;border:3px solid #ffd23a;background:linear-gradient(#2f6cff,#0b2f9a);color:#fff;cursor:pointer;text-shadow:0 2px 2px #000;box-sizing:border-box}
#pc12 .opt{width:268px;text-align:center;font:800 17px/1.2 N,Arial;padding:9px 8px;border-radius:12px;border:3px solid #fff8;background:linear-gradient(#2f6cff,#0b2f9a);cursor:pointer;box-sizing:border-box;min-height:52px;display:flex;align-items:center;justify-content:center}
#pc12 .opt.ok{background:linear-gradient(#27b24a,#0d6a26)}#pc12 .opt.no{background:linear-gradient(#e0283c,#8a0f1fb3)}
#pc12 .tm{font:900 24px N,Arial;text-shadow:0 2px 3px #000;text-align:center;width:90px}#pc12 .tm.lo{color:#ff6a6a}
#pc12 .L{width:30px;height:30px;border-radius:50%;border:2px solid #fff;background:#2f6cff;text-align:center;font:900 14px/26px N,Arial;margin:-15px 0 0 -15px}
#pc12 .L.ok{background:#27b24a}#pc12 .L.no{background:#e0283c}#pc12 .L.cur{background:#ffd23a;color:#000;transform:scale(1.25)}#pc12 .L.ps{background:#8a93a8}
#pc12 .tag{right:6px;bottom:4px;font:700 11px N,Arial;color:#fffb;text-shadow:0 1px 2px #000;text-align:right}`;st.textContent+=`#pc12 .pan{display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;border:3px solid #c9a227;padding:8px 26px;background:rgba(170,178,232,.45);font:700 18px/1.32 Verdana,"DejaVu Sans",N,Arial;color:#fff;text-shadow:1px 1px 2px #000,0 0 6px #0008;letter-spacing:.3px}
#pc12 .pan.red{background:rgba(226,96,96,.5)}#pc12 .pan b.g{color:#9dff9d}#pc12 .pan b.r{color:#ff9a9a}
#pc12 .ctr{display:flex;gap:4px}
#pc12 .cc{box-sizing:border-box;height:52px;min-width:70px;padding:0 10px;text-align:center;font:900 33px/46px Arial,N,sans-serif;color:#fff;text-shadow:0 2px 2px #000;border:3px solid;border-color:#9cb8ff #05146e #05146e #9cb8ff;background:linear-gradient(160deg,#3f70ff,#0a2aa8 60%,#0b2188)}
#pc12 .cc.red{border-color:#ff9c9c #6e0505 #6e0505 #ff9c9c;background:linear-gradient(160deg,#ff4a4a,#b00c0c 60%,#8a0c0c)}
#pc12 .cc.hg{width:116px;background:url(jato/s_hgB.webp) 0 0/100% 100% no-repeat;border:0;text-align:right;padding:0 10px 0 0}
#pc12 .cc.hg.red{background-image:url(jato/s_hgR.webp)}#pc12 .cc.lo{color:#ffb0b0}
#pc12 .cc.tx{font-size:27px;letter-spacing:1px;min-width:92px}
#pc12 .chip{box-sizing:border-box;min-width:96px;height:26px;padding:0 10px;text-align:center;font:800 17px/22px Verdana,"DejaVu Sans",N,Arial;color:#fff;text-shadow:0 1px 2px #000;border:2px solid;border-color:#9cb8ff #05146e #05146e #9cb8ff;background:linear-gradient(#3f70ff,#0a2aa8)}
#pc12 .chip.red{border-color:#ff9c9c #6e0505 #6e0505 #ff9c9c;background:linear-gradient(#ff4a4a,#a00c0c)}
#pc12 .chip.ok{background:linear-gradient(#35d05a,#0d7a2a)}#pc12 .chip.no{background:linear-gradient(#ff5a5a,#9a1010)}#pc12 .chip.cur{border-color:#ffe27a}
#pc12 .nm{left:0;width:640px;text-align:center;font:800 20px Verdana,"DejaVu Sans",N,Arial;color:#fff;text-shadow:1px 2px 3px #000,0 0 8px #000;letter-spacing:1px}
#pc12 .hint{left:120px;width:400px;text-align:center;font:700 12px N,Arial;color:#fff;text-shadow:0 1px 2px #000,0 0 5px #000}
#pc12 .list{box-sizing:border-box;width:222px;padding:12px 10px 10px 18px;border:3px solid;border-color:#9cb8ff #05146e #05146e #9cb8ff;background:linear-gradient(90deg,#1a3cd8,#0a28b0);box-shadow:6px 6px 0 #0006}
#pc12 .list.red{border-color:#ff9c9c #6e0505 #6e0505 #ff9c9c;background:linear-gradient(90deg,#e41c1c,#bb0a0a)}
#pc12 .list div{font:900 19px/33px Verdana,"DejaVu Sans",N,Arial;color:#fff;text-shadow:1px 2px 2px #000;cursor:pointer;white-space:nowrap}
#pc12 .list div.x{opacity:.3}#pc12 .list div.no{color:#ffb0b0;text-decoration:line-through}
#pc12 .pasb{box-sizing:border-box;text-align:center;font:900 17px/38px Verdana,"DejaVu Sans",N,Arial;letter-spacing:1px;color:#f5d36a;border:3px solid #c9a227;background:linear-gradient(#2a2a50,#0c0c28);text-shadow:0 1px 2px #000;cursor:pointer;border-radius:4px}
#pc12 .hd{left:0;width:640px;text-align:center;color:#fff;font:italic 700 31px/36px Georgia,"Times New Roman",serif;text-shadow:2px 2px 3px #000,0 0 8px #000}
#pc12 .hd img{display:inline-block;vertical-align:middle;margin-right:8px}
#pc12 .L{width:31px;height:31px;border-radius:50%;border:2px solid #cfe0ff;background:radial-gradient(circle at 35% 30%,#8fb4ff,#1c43c8 62%,#0a1d73);text-align:center;font:900 14px/27px Arial,N;margin:-15px 0 0 -15px;color:#fff;text-shadow:0 1px 2px #000}
`;document.head.appendChild(st);
let root=null,bx=null,TMS=null,PRG=0;
const el=(c,h,s)=>{const d=document.createElement('div');d.className=c;if(h!=null)d.innerHTML=h;if(s)Object.assign(d.style,s);return d;};
const sz=()=>{if(bx)bx.style.transform='scale('+Math.min(innerWidth/W,innerHeight/H)+')';};addEventListener('resize',sz);
function banner(text,sc=1.4){const t=String(text).toLowerCase();let w=0;const gl=[];for(const ch of t){const g=FBJ[ch];if(g){gl.push(g);w+=g[2]+1;}else{gl.push(null);w+=9;}}
 const c=document.createElement('canvas');c.width=Math.max(8,w);c.height=19;const g2=c.getContext('2d');let x=0;
 for(const g of gl){if(g){try{g2.drawImage(FBI,g[0],g[1],g[2],g[3],x,0,g[2],g[3]);}catch(e){}x+=g[2]+1;}else x+=9;}
 c.style.cssText=`width:${c.width*sc}px;height:${19*sc}px;image-rendering:pixelated`;return c;}
function open(bg){if(!root){root=el('', '');root.id='pc12';bx=el('bx');root.appendChild(bx);document.body.appendChild(root);}sz();bx.innerHTML='';bx.style.backgroundImage=bg?`url(jato/${bg}.jpg)`:'radial-gradient(circle at 50% 40%,#2a5fd8,#06123a 75%)';return bx;}
function close(){if(root){root.remove();root=bx=null;}try{askEnd(null);}catch(e){}}
const add=(c,h,s)=>{const d=el(c,h,s);bx.appendChild(d);return d;};
const sec=i=>(window.GAME&&GAME.sec)?GAME.sec[i]:0;
let S=null,CLK=null;
function hud(){if(S&&S.pts&&S.pts.isConnected)S.pts.textContent=String(S.tm.pts*20);}
function head(t,sub){const b=banner(t,1.3);const w=add('a',null,{left:'50%',top:'8px',transform:'translateX(-50%)'});w.appendChild(b);if(sub)add('a',sub,{top:'40px',left:0,width:'100%',textAlign:'center',font:'800 14px N,Arial',textShadow:'0 1px 3px #000'});}
let TAGT='PC Bialplen S.L. · Antena 3 · reglas aproximadas';const tag=()=>add('tag',TAGT);
function mkTeams(){const c=shuffle(CARI.slice());return{az:{n:'Equipo azul',pts:0,cpu:false,face:c[0],p:.8},ro:{n:'Equipo rojo',pts:0,cpu:true,face:c[1],p:.62}};}
async function respond(rid,team,exp,{t=25,p=.62,pasa=false,pista=null,K=null}={}){
 K=K||{t};const own=!(CLK&&CLK.isConnected);const tm=own?add('a tm','',{left:'275px',top:'56px'}):CLK;
 const show=()=>{tm.textContent=Math.max(0,Math.ceil(K.t));tm.classList.toggle('lo',K.t<6);};show();
 let go=true,hint=null;const stop=()=>{go=false;};anim(dt=>{if(!go||!tm.isConnected)return false;K.t-=dt;show();return true;});
 let res={ok:false,text:'',pasa:false,pista:false};
 try{
  if(team.cpu){const d=Math.min(rnd(1.4,3.4),Math.max(.3,K.t));await wait(d,rid);res.ok=K.t>0&&Math.random()<p;res.text=res.ok?exp[0]:'';
   if(!res.ok&&pasa&&Math.random()<.4)res.pasa=true;}
  else{hint=add('a hint','✏ Escribe tu respuesta y pulsa Intro'+(pasa?' · o pulsa PASAPALABRA':'')+(pista?' · «'+(pista===true?'pista':String(pista).toLowerCase())+'» para pedirla':''),{top:'462px'});
   const v=await ask(()=>rid!==RUN||K.t<=0);chk(rid);
   if(v===null||v===undefined){res.text='';}else{const z=norm(v);res.text=v;if(pasa&&(z=='PASAPALABRA'||z=='PASO'||z=='PASA'))res.pasa=true;else if(pista&&z==(pista===true?'PISTA':norm(String(pista))))res.pista=true;else res.ok=exp.some(e=>norm(e)==z);}}
 }finally{stop();try{if(own)tm.remove();if(hint)hint.remove();}catch(e){}}
 return res;}
async function fb(rid,ok,ans,extra=''){sfx(ok?'j12_applause':'j12_no');const html=ok?`<b class="g">¡Correcto!</b> ${extra}`:`<b class="r">Fallo.</b> Era <b>${esc9(ans)}</b> ${extra}`;
 if(S&&S.pan&&S.pan.isConnected){const o=S.pan.innerHTML;S.pan.innerHTML=html;await wait(ok?.8:1.5,rid);if(S.pan.isConnected)S.pan.innerHTML=o;}
 else{const d=add('a txt',html,{top:'350px'});await wait(ok?.9:1.7,rid);d.remove();}}
function gain(team,pts,s){team.pts+=pts;const i=team===TMS.az?0:1;GAME.sec[i]+=s;hud();}
// ---------- bloques (v0.12 · maquetación según el vídeo de Iker jugando a PASAP.EXE) ----------
const IMG=(f,w,h)=>`<img src="jato/${f}.webp" style="width:${w}px;height:${h}px;display:block" draggable="false">`;
const FULL={left:0,top:0,width:'640px',height:'480px'};
function stage(j,tm,{head=false}={}){const red=tm===TMS.ro;open(null);bx.style.backgroundImage='none';bx.style.backgroundColor='#000';CLK=null;
 add('a',null,{...FULL,backgroundImage:`url(jato/${j==1||j==6?'Left':'Center2'}.jpg)`,backgroundSize:j==1||j==6?'128% 100%':'100% 100%',backgroundPosition:'right top'});
 if(j>1&&j<6)add('a',null,{...FULL,background:red?'rgba(240,160,60,.30)':'rgba(96,48,178,.46)'});
 add('a',IMG('k_'+tm.face,322,360),{left:'159px',top:'122px'});
 add('a',null,{left:'293px',top:'412px',width:'4px',height:'50px',background:'#14141c'});add('a',IMG('s_mics',44,169),{left:'274px',top:'262px'});
 add('a',IMG(red?'s_barR':'s_barB',640,22),{left:0,top:'458px'});add('a',IMG('s_a3',28,27),{left:'604px',top:'450px'});
 add('a',IMG(red?'s_jug2':'s_jug1',128,25),{left:'6px',top:'5px'});add('a',IMG('s_pun',78,19),{left:'146px',top:'8px'});add('a',IMG('s_lic',58,29),{left:'10px',top:'34px'});add('a',IMG('s_globe',68,57),{left:'566px',top:'2px'});
 const pts=add('a',String(tm.pts*20),{left:'228px',top:'2px',font:'italic 800 25px Georgia,serif',color:'#f6c93a',textShadow:'0 2px 2px #000'});
 S={tm,red,pts,pan:null,chip:null,hd:null};
 if(j==1){add('a',IMG('s_com',93,17),{left:'400px',top:'10px'});S.hearts=[add('a',IMG('s_heart',20,20),{left:'498px',top:'9px'}),add('a',IMG('s_heart',20,20),{left:'520px',top:'9px'})];}
 add('tag',TAGT,{right:'40px',bottom:'3px',fontSize:'9px'});
 return S;}
function pan(html,{x=23,y=107,w=597,h=184}={}){const d=add('a pan'+(S&&S.red?' red':''),html,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});const inn=document.createElement('div');d.appendChild(inn);Object.defineProperty(d,'innerHTML',{get:()=>inn.innerHTML,set:v=>{inn.innerHTML=v;}});d.innerHTML=html;if(S)S.pan=d;return d;}
function ctr(x,y,cells){const d=add('a ctr',null,{left:x+'px',top:y+'px'});return cells.map(([h,k])=>{const c=document.createElement('div');c.className='cc'+(S&&S.red?' red':'')+(k?' '+k:'');c.innerHTML=h;d.appendChild(c);return c;});}
function typed(x,y,w=150){const c=add('a chip'+(S&&S.red?' red':''),'',{left:x+'px',top:y+'px',minWidth:w+'px'});S.chip=c;
 anim(()=>{if(!c.isConnected)return false;let v='';try{v=ASKING()?KB.value.toUpperCase():'';}catch(e){}c.innerHTML=v?esc9(v):'&nbsp;';return true;});return c;}
const ASKING=()=>document.body.classList.contains('askon');
function headline(kind,letter){if(!S.hd)S.hd=add('a hd','',{top:'54px'});S.hd.innerHTML=(kind?IMG(kind=='c'?'s_cont':'s_comi',kind=='c'?124:158,kind=='c'?23:31).replace('display:block','display:inline-block'):'')+(letter?`<span style="font-size:36px">${esc9(letter)}</span>`:'');}
async function timeUp(rid){if(S&&S.pan&&S.pan.isConnected){S.pan.innerHTML='<b style="font-size:26px">Se acabó tu tiempo</b>';}sfx('j12_timeover');await wait(1.8,rid);}
const diffLetter=(a,b)=>{const c=a.split('');for(const ch of b){const i=c.indexOf(ch);if(i>=0)c.splice(i,1);}return c[0]||'?';};
let FIXED=false;const prog=()=>{if(!FIXED){FIXED=true;for(const P of JQ12)for(let g=1;g<=6;g++)for(const e of P[g]){if(e[0]&&e[0].includes('·')){const [a,...b]=e[0].split('·');e[0]=a;if(!e[1])e[1]=b.join('·');}}}return JQ12[PRG];};
const ord=()=>{const a=sec(0),b=sec(1);return a<b?[TMS.az,TMS.ro]:[TMS.ro,TMS.az];}; // empieza el que MENOS segundos tiene (empate: el veterano, el rojo)
async function intro(rid,n,titulo,sub,dur=1.9){open('TableBkg');tag();head('JUEGO '+n,titulo);add('a txt',sub,{top:'400px',font:'800 17px N,Arial'});sfx('j12_banner');await wait(dur,rid);}
// «Pulsa INTRO para continuar»
async function pulsaIntro(rid,html,top=130){const d=add('a pan',html+'<br><br><small>Pulsa INTRO para continuar…</small>',{left:'60px',top:top+'px',width:'520px',height:'190px'});
 await new Promise(res=>{const f=e=>{if(e.key==='Enter')res();};addEventListener('keydown',f);d.onpointerdown=e=>{e.preventDefault();res();};const t0=Date.now();anim(()=>{if(rid!==RUN||Date.now()-t0>7000){res();return false;}return d.isConnected;});setTimeout(()=>removeEventListener('keydown',f),7500);res.f=f;}).finally(()=>{});d.remove();}
function endTurn(K){return K.t<=0;}
async function J1(rid){await intro(rid,1,'DE LA A A LA Z','Primer equipo: de la A a la L · segundo equipo: de la M a la Z (sin LL ni Ñ) · cada acierto da tiempo para el rosco');
 const L=prog()[1];const o=ord();
 for(const [k,tm] of o.entries()){const blk=L.slice(k*12,k*12+12);stage(1,tm);const K={t:60};let hits=0,com=2;
  pan('');const [c1,c2,c3]=ctr(40,346,[['0'],['','hg'],['','tx']]);CLK=c2;const pr=document.createElement('span');c3.style.minWidth='54px';
  const upd=(l)=>{c1.textContent=hits;c3.textContent=l;};
  for(const [w,d] of blk){chk(rid);if(K.t<=0)break;headline('x',w[0]);S.pan.innerHTML=esc9(d);upd(w[0]);
   let r=await respond(rid,tm,[w],{K,p:tm.p,pista:tm.cpu?null:'COMODIN'});
   if(r.pista&&com>0){com--;S.hearts[com].style.opacity=.25;S.pan.innerHTML=esc9(d)+`<br><small style="color:#ffd23a">Comodín: empieza por ${esc9(w.slice(0,2))}…</small>`;r=await respond(rid,tm,[w],{K,p:tm.p});}
   if(r.ok){hits++;K.t+=2;gain(tm,1,2);upd(w[0]);if(K.t>0)await fb(rid,true,w);}else if(K.t>0)await fb(rid,false,w);}
  if(K.t<=0)await timeUp(rid);}}
async function J2(rid){await intro(rid,2,'LA PALABRA INCOMPLETA','Primer equipo: palabras que EMPIEZAN por las tres letras · segundo equipo: que ACABAN en ellas');
 const L=prog()[2];const o=ord();
 for(const [k,tm] of o.entries()){const blk=L.slice(k*12,k*12+12);stage(2,tm);const K={t:60};let hits=0;
  pan('');const [c1,c2,c3]=ctr(40,346,[['','hg'],['0'],['','tx']]);CLK=c1;
  for(const [w,d] of blk){chk(rid);if(K.t<=0)break;const ab=k==0?w.slice(0,3)+'…':'…'+w.slice(-3);c3.textContent=ab;c2.textContent=hits;S.pan.innerHTML=esc9(String(d).split('·')[0]);
   const r=await respond(rid,tm,[w],{K,p:tm.p});
   if(r.ok){hits++;K.t+=2;gain(tm,1,2);c2.textContent=hits;await fb(rid,true,w);}else if(K.t>0)await fb(rid,false,w);}
  if(K.t<=0)await timeUp(rid);}}
async function J3(rid){await intro(rid,3,'FAMOSOS','Seis preguntas sobre seis famosos · pista inicial: primera letra y puntos suspensivos · si fallas dos veces, otra pista');
 const L=prog()[3],pairs=[];for(let i=0;i+1<L.length;i+=2)pairs.push([L[i],L[i+1]]);const o=ord();
 for(const [k,tm] of o.entries()){const mine=pairs.slice(k*6,k*6+6);stage(3,tm);const K={t:90};let hits=0;
  const nm=add('a nm','',{top:'62px'});pan('');const [c1,c2]=ctr(40,346,[['0'],['','hg']]);CLK=c2;typed(250,392);
  for(const [[f,t],[,cl]] of mine){chk(rid);if(K.t<=0)break;const m=t.match(/#([^#]+)#/);if(!m)continue;const w=m[1];nm.textContent=f.toUpperCase();
   const parts=t.split(/#[^#]+#/);S.pan.innerHTML=esc9(parts[0])+'<b style="color:#ffd23a">'+esc9(w[0])+'…</b>'+esc9(parts.slice(1).join(''));
   let pts=2,tries=0,ok=false,clued=false;
   while(K.t>0&&tries<4){const r=await respond(rid,tm,[w],{K,p:tm.p*.85});if(r.ok){ok=true;break;}tries++;if(K.t<=0)break;sfx('j12_no');
    if(tries==2&&!clued){clued=true;pts=1;S.pan.innerHTML+=`<br><small style="color:#ffd23a">💡 ${esc9(cl)}</small>`;}}
   if(ok){hits++;gain(tm,pts,pts*2+1);K.t+=pts*2;c1.textContent=hits;await fb(rid,true,w,`(${pts} pt)`);}else if(K.t>0)await fb(rid,false,w);}
  if(K.t<=0)await timeUp(rid);}}
async function J4(rid){await intro(rid,4,'LA PIRÁMIDE','Cinco palabras de 7, 6, 5, 4 y 3 letras (de abajo arriba) · cada una tiene las letras de la anterior menos una · empieza quien menos segundos tiene');
 const L=prog()[4],ps=shuffle([...Array(Math.floor(L.length/5)).keys()]).slice(0,2);const o=ord();
 for(const [k,tm] of o.entries()){const pi=ps[k];stage(4,tm);const K={t:90};let hits=0;pan('',{y:287,h:104,x:213,w:407});const [c1,c2]=ctr(40,396,[['0'],['','hg']]);CLK=c2;typed(232,430,176);
  const W=[...Array(5).keys()].map(j=>L[pi*5+j]);const rows=W.map(([w],j)=>add('a chip'+(S.red?' red':''),'',{left:'18px',top:(236-j*29)+'px',width:(w.length*17+22)+'px',textAlign:'left',paddingLeft:'8px',letterSpacing:'2px'}));
  const hi=add('a chip'+(S.red?' red':''),'',{left:'250px',top:'392px',minWidth:'0',width:'148px'});hi.style.display='none';
  const draw=(cur,done)=>rows.forEach((r,j)=>{const w=W[j][0];r.className='a chip'+(S.red?' red':'')+(j<done?' ok':'')+(j==cur?' cur':'');r.textContent=j<done?w:j==cur?w[0]+'_'.repeat(w.length-1):'_'.repeat(w.length);});
  let all=0;
  for(let j=0;j<5;j++){chk(rid);if(K.t<=0)break;const [w,d]=W[j];draw(j,all);S.pan.innerHTML=esc9(d);const pre=j?diffLetter(W[j-1][0],w):'';hi.style.display=j?'':'none';hi.textContent=j?'Letra que sobra: '+pre:'';
   const r=await respond(rid,tm,[w],{K,p:tm.p});
   if(r.ok){hits++;all++;K.t+=1;gain(tm,1,1);c1.textContent=hits;draw(j+1,all);await fb(rid,true,w);}else{if(K.t>0)await fb(rid,false,w);rows[j].classList.add('no');rows[j].textContent=w;}}
  if(K.t<=0)await timeUp(rid);else if(all==5){GAME.sec[tm===TMS.az?0:1]+=5;hud();S.pan.innerHTML='<b class="g">¡Pirámide completa!</b> +5 s';await wait(1.4,rid);}}}
async function J5(rid){await intro(rid,5,'LA PALABRA IMPOSIBLE','Ocho palabras de difícil significado · se te da la definición y la marcas con el ratón entre todas');
 const L=prog()[5];const o=ord();
 for(const [k,tm] of o.entries()){const mine=L.slice(k*8,k*8+8);stage(5,tm);const K={t:60};let fails=0,hits=0;const red=S.red;
  const lst=add('a list'+(red?' red':''),null,{left:(red?392:18)+'px',top:'58px'});lst.style.height='292px';
  const its=mine.map(([w])=>{const d=document.createElement('div');d.textContent=w.toUpperCase();lst.appendChild(d);return d;});
  pan('',{x:red?23:213,y:133,w:404,h:134});
  const [c1,c2]=ctr(red?40:430,370,[['0'],['','hg']]);CLK=c2;const order=shuffle(mine.map((x,i)=>i));
  for(const i of order){chk(rid);if(K.t<=0)break;const [w,d]=mine[i];S.pan.innerHTML=esc9(d);sfx('j12_click');
   let pick=-1;
   if(tm.cpu){const dw=Math.min(rnd(1.5,3.2),Math.max(.3,K.t));await wait(dw,rid);K.t-=dw;pick=Math.random()<tm.p?i:(()=>{let q;do{q=Math.floor(Math.random()*8);}while(q==i||its[q].classList.contains('x'));return q;})();}
   else{let go=true;pick=await new Promise(res=>{go=true;its.forEach((b,j)=>{b.onpointerdown=e=>{e.preventDefault();if(!b.classList.contains('x'))res(j);};});anim(dt=>{if(rid!==RUN||K.t<=0||!go){res(-1);return false;}K.t-=dt;c2.textContent=Math.max(0,Math.ceil(K.t));c2.classList.toggle('lo',K.t<6);return true;});});go=false;chk(rid);}
   if(tm.cpu){K.t-=0;c2.textContent=Math.max(0,Math.ceil(K.t));}
   if(pick<0)break;const ok=pick==i;sfx(ok?'j12_applause':'j12_no');
   if(ok){hits++;its[i].classList.add('x');gain(tm,2,2);K.t+=2;}else{fails++;its[pick].classList.add('no');its[i].classList.add('x');K.t-=3;its[i].style.textDecoration='underline';}
   c1.textContent=fails;c2.textContent=Math.max(0,Math.ceil(K.t));await wait(.9,rid);}
  if(K.t<=0)await timeUp(rid);}}
function ring(n,labels){const cx=320,cy=236,rx=214,ry=201,els=[];labels.forEach((l,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;els.push(add('a L',l,{left:(cx+Math.cos(a)*rx)+'px',top:(cy+Math.sin(a)*ry)+'px'}));});return els;}
async function rosco28(rid,{n=28,base=100}={}){
 await intro(rid,6,n==28?'EL ROSCO · 28 LETRAS':'EL ROSCO · 25 LETRAS',`${base} s + los segundos ganados · cada equipo juega su rosco · «PASAPALABRA» salta a la siguiente · si fallas no ganas el bote`,2.2);
 open('TableBkg');tag();await pulsaIntro(rid,`<b style="font-size:21px">PASAPALABRA</b><br>EQUIPO AZUL: ${base+sec(0)} segundos<br>EQUIPO ROJO: ${base+sec(1)} segundos`,150);
 const idx=n==28?[...LET28.keys()]:LET28.map((l,i)=>i).filter(i=>!['K','LL','W'].includes(LET28[i]));const labels=idx.map(i=>LET28[i]);
 const base0=Math.random()<.5?0:28;const R=prog()[6];const o=ord();const res={};
 for(const [k,tm] of o.entries()){const roster=idx.map(i=>R[(base0+(k?28:0)+i)%R.length]);const ti=tm===TMS.az?0:1;
  stage(6,tm);const Lb=ring(n,labels);const stt=idx.map(()=>0);const K={t:base+sec(ti)};
  pan('',{x:132,y:122,w:352,h:162});const [cA]=ctr(29,327,[['0']]);const [cT]=ctr(29,381,[['','hg']]);CLK=cT;typed(250,392);
  const pb=add('a pasb','PASAPALABRA',{left:'256px',top:'337px',width:'151px',height:'42px'});pb.onpointerdown=e=>{e.preventDefault();try{askEnd('pasapalabra');}catch(x){}};
  let i=0,hits=0,fails=0,pend=n;
  while(pend>0&&K.t>0){chk(rid);if(stt[i]==1||stt[i]==2){i=(i+1)%n;continue;}
   const [w,d]=roster[i];const lab=labels[i];const emp=norm(w).startsWith(norm(lab));Lb.forEach(e=>e.style.transform='');Lb[i].style.transform='scale(1.3)';Lb[i].style.borderColor='#ffe27a';Lb[i].classList.remove('ps');
   headline(emp?'x':'c',lab);S.pan.innerHTML=esc9(d)+`<br><small style="opacity:.8">${w.length} letras</small>`;
   const r=await respond(rid,tm,[w],{K,p:tm.p,pasa:true});Lb[i].style.transform='';Lb[i].style.borderColor='';
   if(K.t<=0&&!r.ok)break;
   if(r.pasa){stt[i]=3;Lb[i].classList.add('ps');sfx('j12_pasap');}
   else if(r.ok){stt[i]=1;hits++;pend--;Lb[i].classList.add('ok');Lb[i].style.background='radial-gradient(circle at 35% 30%,#9dffa8,#18b83a 62%,#0a6a1e)';sfx('j12_applause');}
   else{stt[i]=2;fails++;pend--;Lb[i].style.background='radial-gradient(circle at 35% 30%,#ff9d9d,#d41818 62%,#7a0a0a)';sfx('j12_no');}
   cA.textContent=hits;let g=0;do{i=(i+1)%n;g++;}while((stt[i]==1||stt[i]==2)&&g<=n);}
  sfx('j12_timeover');S.pan.innerHTML=K.t<=0?'<b style="font-size:26px">Se acabó tu tiempo</b>':`<b>${hits}</b> aciertos · ${fails} fallos`;S.pan.innerHTML+=`<br><small>${hits} aciertos · ${fails} fallos · ${pend} sin contestar</small>`;await wait(2.2,rid);res[ti]={hits,fails,t:Math.max(0,K.t)};}
 return res;}
async function menuPC(rid){ // pantalla de título del juego de PC
 return new Promise(res=>{open('title');add('a',null,{left:'50%',top:'14px',transform:'translateX(-50%)'}).appendChild(banner('PASAPALABRA',2));
  const B=[['▶ JUGAR (los 6 juegos)','all'],['Juegos sueltos 1-6','one'],['Ayuda · reglas','help'],['Museo de pantallas','muse'],['Salir','x']];
  B.forEach(([t,v],i)=>{const b=add('a pcb',t,{top:(200+i*52)+'px'});b.onpointerdown=e=>{e.preventDefault();sfx('j12_click');res(v);};});tag();
  anim(()=>{if(rid!==RUN){res('x');return false;}return !!(bx&&bx.querySelector('.pcb'));});});}
const AYUDA=[['1 · A la Z','Cada respuesta empieza por la letra indicada. 1 punto y 2 s.'],['2 · Palabra incompleta','Todas comparten el principio (p. ej. MED…). 1 punto y 2 s.'],['3 · Famosos con pista','Adivina la palabra de la noticia: 2 puntos; con pista, 1.'],['4 · La pirámide','Cinco palabras de 7, 6, 5, 4 y 3 letras. Empieza quien menos segundos tiene.'],['5 · La palabra imposible','Palabras rarísimas: elige entre cuatro. 2 puntos.'],['6 · El rosco','28 letras (con K, LL y W), 100 s + los ganados. Gana quien más acierta.']];
async function ayuda(rid){open('HelpBkg');head('AYUDA');tag();add('a txt',AYUDA.map(([a,b])=>`<b style="color:#ffd23a">${a}</b>: ${b}`).join('<br>')+'<br><small>Reglas recompuestas a mano (aproximado).</small>',{top:'70px',height:'340px',textAlign:'left',font:'700 15px/1.45 N,Arial'});
 const b=add('a pcb','⟵ Volver',{top:'424px'});await new Promise(r=>{b.onpointerdown=e=>{e.preventDefault();sfx('j12_click');r();};anim(()=>{if(rid!==RUN){r();return false;}return b.isConnected;});});}
const MUSE=[['title','Pantalla de título'],['Game1Bkg','Plató (juegos 1-6)'],['TableBkg','Presentadora'],['premiumBkg','Presentadora y público'],['Select2PBkg','Selección de equipos'],['Presen1Bkg','Presentación'],['Optbkg','Opciones'],['HelpBkg','Ayuda'],['HiScoreBkg','Récords'],['Cup1','Copa · 1.er puesto'],['Cup2','Copa · 2.º puesto'],['Cup3','Copa · 3.er puesto'],['Last00','Final'],['Tgames1','Juegos 1'],['Tgames2','Juegos 2'],['Ap00','Público 1'],['Ap01','Público 2'],['Center','Centro 1'],['Center2','Centro 2']];
async function museo(rid){let k=0;return new Promise(res=>{const draw=()=>{open(MUSE[k][0]);tag();add('a txt',`${k+1}/${MUSE.length} · ${MUSE[k][1]}`,{top:'8px',left:'160px',width:'320px',padding:'4px',font:'800 14px N,Arial'});
  CARI.forEach((c,i)=>{if(MUSE[k][0]=='Select2PBkg'||k==2&&0){}});
  if(MUSE[k][0]=='Select2PBkg'){add('a',null,{left:'30px',top:'80px'}).innerHTML=`<img src="jato/${CARI[0]}.webp" style="height:210px">`;add('a',null,{left:'440px',top:'80px'}).innerHTML=`<img src="jato/${CARI[1]}.webp" style="height:210px">`;}
  const a=add('a pcb','◀',{left:'80px',top:'424px',minWidth:'90px',transform:'none'}),b=add('a pcb','▶',{left:'470px',top:'424px',minWidth:'90px',transform:'none'}),c=add('a pcb','Salir',{left:'275px',top:'424px',minWidth:'90px',transform:'none'});
  a.onpointerdown=e=>{e.preventDefault();k=(k+MUSE.length-1)%MUSE.length;draw();};b.onpointerdown=e=>{e.preventDefault();k=(k+1)%MUSE.length;draw();};c.onpointerdown=e=>{e.preventDefault();res();};};
  draw();anim(()=>{if(rid!==RUN){res();return false;}return !!root;});});}
const GAMES={1:J1,2:J2,3:J3,4:J4,5:J5};
function newTeams(){TMS=mkTeams();return TMS;}
function setProg(n){PRG=((n%JQ12.length)+JQ12.length)%JQ12.length;}
async function selectScreen(rid){open('Select2PBkg');tag();add('a',null,{left:'40px',top:'120px'}).innerHTML=`<img src="jato/${TMS.az.face}.webp" style="height:200px">`;add('a',null,{left:'450px',top:'120px'}).innerHTML=`<img src="jato/${TMS.ro.face}.webp" style="height:200px">`;
 add('a txt',`Programa nº ${JQ12[PRG][0]} del juego de PC<br><small>${esc9(TMS.az.face)} (azul) contra ${esc9(TMS.ro.face)} (rojo)</small>`,{top:'20px'});sfx('j12_selectp');await wait(2.2,rid);}
// resultado: GAME.res para la despedida del juego 3D (25 = rosco completo ⇒ bote)
function setRes(r,n){const a=r[0]||{hits:0,fails:0,t:0},b=r[1]||{hits:0,fails:0,t:0};GAME.res=[a.hits>=n?25:Math.min(24,a.hits),b.hits>=n?25:Math.min(24,b.hits)];GAME.ac=[a.hits,b.hits];}
async function final(rid,r,n){open('Last00');tag();const a=r[0],b=r[1];const win=a.hits>b.hits||(a.hits==b.hits&&(a.fails<b.fails||a.fails==b.fails&&a.t>=b.t));
 add('a txt',`<b>AZUL</b>: ${a.hits} aciertos, ${a.fails} fallos · <b>ROJO</b>: ${b.hits} aciertos, ${b.fails} fallos<br><b style="font-size:26px;color:#ffd23a">${a.hits>=n?'¡ROSCO COMPLETO!':win?'GANA EL EQUIPO AZUL':'GANA EL EQUIPO ROJO'}</b>`,{top:'160px'});sfx(win?'j12_applause':'j12_laugh');await wait(3,rid);}
// partida 100 % PC (modo «puro»)
async function puro(rid,juegos=[1,2,3,4,5,6]){newTeams();GAME.sec=[0,0];GAME.ac=[0,0];setProg(Math.floor(Math.random()*JQ12.length));
 try{music('j12_music'+(Math.floor(Math.random()*5)));await selectScreen(rid);
  for(const j of juegos){chk(rid);if(j==6){const r=await rosco28(rid,{n:28,base:100});await final(rid,r,28);setRes(r,28);}else{await GAMES[j](rid);}}
 }finally{close();stopMusic();}}
async function juego(rid,j){ // un solo juego dentro del programa 3D
 if(!TMS)newTeams();let full=false;try{if(j==6){const r=window.__t13r28?await window.__t13r28(rid,28):await rosco28(rid,{n:28,base:100});await final(rid,r,28);setRes(r,28);full=(r[0]&&r[0].hits||0)>=28;}else await GAMES[j](rid);}finally{close();}
 // v0.14: rosco de 28 completo dentro del programa 3D = se gana el bote y termina el programa (antes solo ponía GAME.res=25 y no llamaba al bote)
 if(full&&!V5?.noBote){music('winner');await bote(rid,true);}}
async function pcMenu(rid){newTeams();setProg(Math.floor(Math.random()*JQ12.length));GAME.sec=[0,0];
 try{music('j12_intro');for(;;){chk(rid);const v=await menuPC(rid);if(v=='x')break;
  if(v=='all'){await puro(rid);newTeams();}
  else if(v=='one'){const j=await new Promise(r=>{open('Tgames1');tag();add('a txt','Elige el juego',{top:'10px',left:'200px',width:'240px',padding:'4px'});for(let g=1;g<=6;g++){const b=add('a pcb',AYUDA[g-1][0],{top:(60+(g-1)*50)+'px'});b.onpointerdown=e=>{e.preventDefault();sfx('j12_click');r(g);};}const b=add('a pcb','⟵ Volver',{top:'366px'});b.onpointerdown=e=>{e.preventDefault();r(0);};anim(()=>{if(rid!==RUN){r(0);return false;}return !!bx;});});
   if(j){newTeams();GAME.sec=[0,0];setProg(Math.floor(Math.random()*JQ12.length));await juego(rid,j);}}
  else if(v=='help')await ayuda(rid);else if(v=='muse')await museo(rid);}
 }finally{close();stopMusic();}}
return {setTag:t=>{TAGT=t||'PC Bialplen S.L. · Antena 3 · reglas aproximadas';},open,close,banner,respond,mkTeams,newTeams,setProg,puro,juego,pcMenu,J1,J2,J3,J4,J5,rosco28,final,setRes,add,hud,head,tag,intro,gain,fb,ord,MUSE,AYUDA,get TMS(){return TMS;},get PRG(){return PRG;},get bx(){return bx;},selectScreen,LET28,museo,ayuda};
})();
