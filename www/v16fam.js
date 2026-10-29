'use strict';
// ===== v0.17 · «Pasapalabra en familia» con los grafismos del programa real (solo esta sección) =====
// Capa HTML (pointer-events:none) + texturas 3D del logo + vídeos reales (cabecera, cortinillas, despedida).
window.F16=(()=>{
const css=`#f16{position:fixed;inset:0;pointer-events:none;z-index:30;font-family:N,sans-serif;display:none}
body.f16 #f16{display:block}
#f16 *{pointer-events:none;box-sizing:border-box}
#f16 video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000;display:none;z-index:9}
.f16card{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,#4fc3ff 0,#1478e0 60%,#0a3f9e);opacity:0;transition:opacity .25s;z-index:8}
.f16card.on{opacity:1}
.f16card b{font-weight:900;font-size:min(13vw,22vh);color:#ffe14a;-webkit-text-stroke:.06em #0b3a8c;paint-order:stroke fill;text-shadow:0 .08em 0 #0b3a8c,0 .14em .2em rgba(0,0,0,.4);transform:rotate(-4deg) scale(.6);transition:transform .45s cubic-bezier(.3,1.6,.5,1);text-align:center;line-height:.9}
.f16card.on b{transform:rotate(-4deg) scale(1)}
.f16card::before{content:'';position:absolute;inset:-50%;background:repeating-conic-gradient(rgba(255,255,255,.13) 0 10deg,transparent 10deg 20deg);opacity:0}
.f16card.on::before{opacity:1;animation:f16spin 4s linear infinite}
.f16card::after{content:'';position:absolute;top:0;bottom:0;width:60vw;left:-70vw;background:linear-gradient(100deg,transparent,#fe8a05 30%,#ffd04b 50%,#fe8a05 70%,transparent);transform:skewX(-20deg)}
.f16card.on::after{animation:f16sweep .7s cubic-bezier(.2,.8,.3,1) forwards}
.f16card.on b{animation:f16pop .6s cubic-bezier(.3,1.7,.5,1) .15s both,f16bob 1.2s ease-in-out .8s infinite alternate}
.f16card b{position:relative;z-index:1}
@keyframes f16spin{to{transform:rotate(360deg)}}
@keyframes f16sweep{to{left:120vw}}
@keyframes f16pop{0%{transform:rotate(-14deg) scale(.2)}100%{transform:rotate(-4deg) scale(1)}}
@keyframes f16bob{to{transform:rotate(-2deg) scale(1.05)}}
/* tiempo de prueba: número con volumen (naranja a la izquierda, azul a la derecha) */
.f16tm{position:absolute;bottom:3vh;font-weight:900;font-style:italic;font-size:12vh;line-height:1;display:none;letter-spacing:-.02em}
.f16tm.na{left:10.5vw;color:#ffed94;text-shadow:.02em .02em 0 #e07800,.04em .04em 0 #c86400,.06em .06em 0 #a85200,.08em .08em 0 #8a4200,.1em .12em .1em rgba(0,0,0,.5);-webkit-text-stroke:.02em #fff3c0}
.f16tm.az{right:10.5vw;color:#2f7cf6;text-shadow:.02em .02em 0 #1b5fd0,.04em .04em 0 #1250b8,.06em .06em 0 #0b3f9c,.08em .08em 0 #072f80,.1em .12em .1em rgba(0,0,0,.5);-webkit-text-stroke:.02em #d8ecff}
.f16col{position:absolute;top:24vh;display:none;flex-direction:column;gap:2vh}
.f16col.na{left:calc(6.9vw - 3.75vh)}.f16col.az{right:calc(6.9vw - 3.75vh)}
.f16col i,.f16ball{display:block;width:7.5vh;height:7.5vh;border-radius:50%;transition:transform .3s,opacity .3s}
.f16col.na i{background:radial-gradient(circle at 38% 30%,#fff2b8 0,#ffd04b 22%,#fdb63a 55%,#e07a00 90%)}
.f16col.az i{background:radial-gradient(circle at 38% 30%,#e0f6ff 0,#4cc0ff 25%,#1a8ae8 70%,#0b4fa8)}
.f16col i.off{transform:scale(0);opacity:0}
/* marcador de segundos: cuadrados naranja y azul */
.f16sc{position:absolute;top:2vh;left:50%;transform:translateX(-50%);display:none;gap:1vw}
.f16sc span{display:inline-flex;align-items:center;justify-content:center;width:min(9vw,14vh);height:min(9vw,14vh);margin:0 .4vw;border-radius:18%;color:#fff;font-weight:900;font-size:min(5vw,8vh);-webkit-text-stroke:.05em #333;paint-order:stroke fill;box-shadow:0 .3vh .8vh rgba(0,0,0,.45),inset 0 -.5vh 0 rgba(0,0,0,.18)}
.f16sc .na{background:linear-gradient(#ffad3a,#f57f00);transform:rotate(-6deg)}.f16sc .az{background:linear-gradient(#5aa8ff,#1d64e0);transform:rotate(6deg)}
/* rótulo inferior (pregunta) como en la tele */
body.f16 #sub{top:auto!important;bottom:6vh;left:50.8vw!important;width:56.5vw!important;max-width:56.5vw!important;min-height:12vh;display:flex;align-items:center;justify-content:center;border-radius:6vh;padding:.3em 1.4em;font-weight:800;text-shadow:0 1px 2px rgba(0,0,0,.6);
 background:linear-gradient(#ffa22a,#ff9611 30%,#f08600 70%,#d87400);border:.5vh solid #fff;box-shadow:0 0 0 .35vh #7b4a10,0 .3em .5em rgba(0,0,0,.45)}
body.f16.f16az #sub{background:linear-gradient(#5fb0ff,#1e7cf2 45%,#0b55cf);border-color:#cfe8ff;box-shadow:0 0 0 .12em #062a6e,0 .3em .5em rgba(0,0,0,.45)}
body.f16 #sub b{color:#fff}
/* rosco */
.f16ro{position:absolute;left:50%;top:50%;width:77vh;height:77vh;transform:translate(-50%,-50%);display:none}
.f16b{position:absolute;width:10.6%;height:10.6%;margin:-5.3% 0 0 -5.3%;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:5vh;
 -webkit-text-stroke:.1em #08245e;paint-order:stroke fill;border:.12em solid #0a2a66;background:radial-gradient(circle at 36% 28%,#d6ecff 0,#4d97ff 22%,#1258d8 62%,#08338c);box-shadow:0 .15vh .4vh rgba(0,0,0,.5)}
.f16b.s1{background:radial-gradient(circle at 36% 28%,#d6ffcc 0,#4fd040 24%,#139a1e 62%,#05600e);-webkit-text-stroke-color:#044a0a;border-color:#06460c}
.f16b.s2{background:radial-gradient(circle at 36% 28%,#ffd0c8 0,#ff4a3a 24%,#c8120a 62%,#7a0604);-webkit-text-stroke-color:#5a0603;border-color:#5a0603}
.f16b.act{background:radial-gradient(circle at 36% 28%,#fff 0,#e6f3ff 40%,#a9cff5 80%,#6d9fd6);color:#1048b0;-webkit-text-stroke:0;border-color:#5f8fd0}
.f16b.lim{border-color:#f5d800;box-shadow:0 0 0 .5vh #f5d800,0 0 0 .8vh #6a5a00}
.f16rt{position:absolute;left:16%;top:78%;transform:translate(-50%,-50%);display:none;flex-direction:column;align-items:center;gap:1.4vh}
.f16rt i{font-style:normal;display:flex;align-items:center;justify-content:center;width:17.6vh;height:17.6vh;border-radius:50%;font-weight:900;color:#fff;font-size:7vh;-webkit-text-stroke:.05em #5a2a00;paint-order:stroke fill;text-shadow:.04em .06em 0 rgba(0,0,0,.35);border:.6vh solid #fff;box-shadow:0 0 0 .4vh #a85000,0 .5vh 1vh rgba(0,0,0,.5)}
.f16rt u{text-decoration:none;display:flex;align-items:center;justify-content:center;width:19.5vh;height:9.3vh;border-radius:1.6vh;font-weight:900;color:#fff;font-size:6.4vh;-webkit-text-stroke:.05em #5a2a00;paint-order:stroke fill;border:.5vh solid #fff;box-shadow:0 0 0 .35vh #a85000,0 .5vh 1vh rgba(0,0,0,.5)}
.f16rt.na i{background:radial-gradient(circle at 40% 30%,#ffb64a,#fe8a05 50%,#d86e00)}.f16rt.na u{background:linear-gradient(#ffc061,#f08300)}
.f16rt.az i{background:radial-gradient(circle at 40% 30%,#a8d2ff,#2f86f0 45%,#0d4fc0);-webkit-text-stroke-color:#06286a;box-shadow:0 0 0 .4vh #0b3f9c,0 .5vh 1vh rgba(0,0,0,.5)}.f16rt.az u{background:linear-gradient(#6cb2ff,#1a62d8);-webkit-text-stroke-color:#06286a;box-shadow:0 0 0 .35vh #0b3f9c,0 .5vh 1vh rgba(0,0,0,.5)}
/* pantalla partida final: dos roscos */
.f16split{position:absolute;inset:0;display:none;background:linear-gradient(#57b2ff,#1f73e6)}
.f16split>div{position:absolute;top:0;bottom:0;width:50%;border:1vh solid;overflow:hidden}
.f16split .L{left:0;border-color:#1d64e0}.f16split .R{right:0;border-color:#f57f00}
.f16split .f16ro{display:block;width:62vh;height:62vh;top:46%}
.f16split .f16rt{display:flex;left:18%;top:78%;transform:translate(-50%,-50%) scale(.62)}
.f16split .nm{position:absolute;left:0;right:0;bottom:2vh;text-align:center;color:#fff;font-weight:900;font-size:4vh;-webkit-text-stroke:.05em #062a6e;paint-order:stroke fill}`;
const LET='ABCDEFGHIJLMNÑOPQRSTUVXYZ'.split('');
let root,card,tmEl,col,sc,ro,rt,vid,split,balls=[],on=false,TM=null,loop=0,lastTm='',lastSc='',inRosco=false,tics=-1,hitsP=0;
const mkRosco=()=>{const r=document.createElement('div');r.className='f16ro';const bs=LET.map((l,i)=>{const b=document.createElement('div');b.className='f16b';b.textContent=l;const a=-Math.PI/2+i*2*Math.PI/25;b.style.left=(50+44.5*Math.cos(a))+'%';b.style.top=(50+44.5*Math.sin(a))+'%';r.appendChild(b);return b;});return [r,bs];};
const mkRt=()=>{const d=document.createElement('div');d.className='f16rt na';d.innerHTML='<i>0</i><u>0</u>';return d;};
function build(){if(root)return;const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 root=document.createElement('div');root.id='f16';root.innerHTML=`<div class="f16sc"></div><div class="f16col na"></div><div class="f16tm"></div><div class="f16card"><b></b></div><div class="f16split"></div><video playsinline preload="none"></video>`;
 document.body.appendChild(root);[sc,col,tmEl,card,split,vid]=['.f16sc','.f16col','.f16tm','.f16card','.f16split','video'].map(q=>root.querySelector(q));
 [ro,balls]=mkRosco();root.insertBefore(ro,card);rt=mkRt();root.insertBefore(rt,card);
 col.innerHTML='<i></i>'.repeat(6);}
// ---------- logo real en el plató (sustituye a la bola y al título clásico) ----------
const LIMG=new Image();LIMG.src='f16v/logo.png';let LTEX=null,SAV=null;
function logoTex(){if(LTEX)return LTEX;if(!LIMG.complete||!LIMG.naturalWidth)return null;
 LTEX=cv(1024,256,(g,w,h)=>{const s=Math.min(w*.92/LIMG.naturalWidth,h*.96/LIMG.naturalHeight),lw=LIMG.naturalWidth*s,lh=LIMG.naturalHeight*s;g.drawImage(LIMG,(w-lw)/2,(h-lh)/2,lw,lh);});return LTEX;}
let BLUE=null,ENF=0,XB=null;
const extraBall=()=>{if(XB)return XB;const set=new Set(),w=new T.Vector3();P.root.traverse(m=>{if(!m.isMesh||m===P.ttl||m===P.scr||!m.geometry||m.geometry.type!=='PlaneGeometry')return;m.getWorldPosition(w);
 const c=m.material&&m.material.map&&m.material.map._c,tile=c&&((c.width==96&&c.height==96)||(c.width==256&&c.height==256));if((w.z>-11.1&&w.z<-10.8&&Math.abs(w.x)<3.6&&w.y>0.3&&w.y<7)||(tile&&w.y>2&&w.z<-6)){const pa=m.parent&&m.parent!==P.root&&m.parent!==P.ttl?m.parent:m;set.add(pa);}});XB=[...set];return XB;};
const blueTex=()=>BLUE||(BLUE=cv(512,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#4aa6ff');gr.addColorStop(.55,'#1f7cf2');gr.addColorStop(1,'#0d4fc4');g.fillStyle=gr;g.fillRect(0,0,w,h);
 const r=g.createRadialGradient(w/2,h*.45,10,w/2,h*.45,w*.5);r.addColorStop(0,'rgba(255,255,255,.35)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,w,h);}));
// oculta en modo familia TODO lo que forma la bola de letras clásica (bola, letras flotantes, esfera, pantallas con bola, mosca)
function enforce(){if(!api._want){ENF=0;return;}ENF=requestAnimationFrame(enforce);if(!P.ttl)return;const t=logoTex();
 if(t&&P.ttl.material.map!==t){P.ttl.material.map=t;P.ttl.material.needsUpdate=true;}
 [P.ballG,P.ball,P.sphere,P.flo&&P.flo.parent,MOSCA,...extraBall()].forEach(o=>{if(o&&o.visible)o.visible=false;});
 const bt=blueTex();[P.scr,...(P.sideS||[])].forEach(m=>{if(m&&m.material.map!==bt){m.material.map=bt;m.material.needsUpdate=true;}});}
function setLogo(f){try{if(!P.ttl&&typeof montar=='function')montar();}catch(e){}
 if(f){if(SAV)return;if(!P.ttl)return;
  SAV={map:P.ttl.material.map,scr:[P.scr,...(P.sideS||[])].map(m=>m&&m.material.map),vis:[P.ballG,P.ball,P.sphere,P.flo&&P.flo.parent,MOSCA,...extraBall()].map(o=>o?o.visible:false),logo:LOGO};
  LOGO='f16v/logo.png';if(!ENF)ENF=requestAnimationFrame(enforce);}
 else if(SAV){cancelAnimationFrame(ENF);ENF=0;P.ttl.material.map=SAV.map;P.ttl.material.needsUpdate=true;[P.scr,...(P.sideS||[])].forEach((m,i)=>{if(m){m.material.map=SAV.scr[i];m.material.needsUpdate=true;}});
  [P.ballG,P.ball,P.sphere,P.flo&&P.flo.parent,MOSCA,...extraBall()].forEach((o,i)=>{if(o)o.visible=SAV.vis[i];});LOGO=SAV.logo;SAV=null;}}
// ---------- barras con el estilo del programa (sustituyen a las barras 3D de la app) ----------
const PAL=c=>{if(c===TEAM9.na.c||c===TEAM9.na.d||c===0xfa8804)return['#ffc066','#f7941d','#d96a00','#ffe2b0','#8a3c00'];
 if(c===TEAM9.az.c||c===TEAM9.az.d)return['#73b9ff','#1e7cf2','#0b4fc4','#cfe8ff','#062a6e'];
 if(c===COL.gr)return['#8ef07a','#2fb52a','#137a14','#d8ffd0','#064a0a'];if(c===COL.rd)return['#ff8a7a','#e5281c','#9e0f08','#ffd6d0','#4a0603'];
 if(c===0xffd23a)return['#fff0a0','#ffd23a','#d49a00','#fff8d8','#6a4a00'];
 const C=new T.Color(c),hx=k=>'#'+C.clone().multiplyScalar(k).getHexString();return[hx(1.35),hx(1),hx(.7),'#ffffff',hx(.35)];};
function bar16(w,h,c,txt='',o={}){const g=new T.Group();let col=c;const pad=8;
 const L=label(w+pad*2,h+pad*2,(x,cw,ch,k)=>{const p=PAL(col),r=Math.min(ch/2,ch*.5)-1,P2=pad*k;
  const rr=(X,Y,W,H,R)=>{x.beginPath();x.moveTo(X+R,Y);x.arcTo(X+W,Y,X+W,Y+H,R);x.arcTo(X+W,Y+H,X,Y+H,R);x.arcTo(X,Y+H,X,Y,R);x.arcTo(X,Y,X+W,Y,R);x.closePath();};
  x.shadowColor='rgba(0,0,0,.45)';x.shadowBlur=4*k;x.shadowOffsetY=2*k;rr(P2*.4,P2*.4,cw-P2*.8,ch-P2*.8,r);x.fillStyle=p[4];x.fill();x.shadowColor='transparent';
  rr(P2*.7,P2*.7,cw-P2*1.4,ch-P2*1.4,r-P2*.3);x.fillStyle=p[3];x.fill();
  const gr=x.createLinearGradient(0,P2,0,ch-P2);gr.addColorStop(0,p[0]);gr.addColorStop(.45,p[1]);gr.addColorStop(1,p[2]);rr(P2,P2,cw-P2*2,ch-P2*2,r-P2*.6);x.fillStyle=gr;x.fill();
  const gl=x.createLinearGradient(0,P2,0,ch/2);gl.addColorStop(0,'rgba(255,255,255,.45)');gl.addColorStop(1,'rgba(255,255,255,0)');rr(P2*1.6,P2*1.3,cw-P2*3.2,ch/2-P2,(r-P2)/1.4);x.fillStyle=gl;x.fill();
  if(g.txt){x.save();x.shadowColor='rgba(0,0,0,.55)';x.shadowBlur=3*k;x.shadowOffsetY=1.5*k;ftxt(x,g.txt,o.al=='l'?(pad+16)*k:cw/2,ch/2+2*k,(o.fs||h*.6)*k,'#fff',o.al=='l'?'left':'center',cw-(pad*2+24)*k,0);x.restore();}
  if(g.hl)g.hl(x,cw,ch,k);});
 L.position.z=6;g.add(L);g.L=L;g.txt=txt;L.set();
 const face={material:{color:{setHex:v=>{col=v;L.set();},getHex:()=>col}}};g.face=face;
 g.setT=(s,cc)=>{g.txt=s;if(cc!==undefined)col=cc;L.set();};g.setC=cc=>{col=cc;L.set();};return g;}
// ---------- sonidos ----------
const SND=n=>'f16/'+n;let _music=null,_bar=null,_tset=null,_sfx=null,_ban=null,AUs=null;
const swap=m=>{const k={ok:'acierto',error:'fallo',splash:m=='rosco'?'pasa':'tapa',aplauso:'aplauso',winner:'tiempo'};if(!AUs){AUs={};for(const n in k)AUs[n]=AU[n];}
 for(const n in k){AU[n]=new Audio('snd/'+SND(k[n])+'.ogg');AU[n].preload='auto';}};
const unswap=()=>{if(AUs){for(const n in AUs){if(AUs[n])AU[n]=AUs[n];else delete AU[n];}AUs=null;}};
function hook(){if(_music)return;_music=window.music;_bar=window.bar;_tset=window.timerSetup9;_sfx=window.sfx;
 bar=function(){return on?bar16.apply(this,arguments):_bar.apply(this,arguments);};
 sfx=function(n){if(on&&!inRosco&&n=='ok'&&api._st&&api._st.on){hitsP++;const is=col.children;const j=is.length-hitsP;if(j>=0&&is[j])is[j].classList.add('off');}return _sfx.apply(this,arguments);};
 try{_ban=FX5.banner;FX5.banner=function(){if(on)return;return _ban.apply(this,arguments);};}catch(e){}
 timerSetup9=function(secs,rid){const st=_tset.apply(this,arguments);if(on){try{G.children.forEach(o=>{if(o.set&&o.position&&Math.abs(o.position.y+262)<1)o.visible=false;});}catch(e){}api._st=st;tics=-1;hitsP=0;[...col.children].forEach(i=>i.classList.remove('off'));}return st;};}
function tick(){if(!on){loop=0;return;}loop=requestAnimationFrame(tick);
 const st=api._st,k=api._k||'na';if(st&&st.on&&!inRosco){const v=Math.max(0,Math.ceil(st.t)),s=v+'|'+k;if(s!==lastTm){lastTm=s;tmEl.textContent=v;tmEl.className='f16tm '+k;tmEl.style.display='block';col.className='f16col '+k;col.style.display='flex';if(v<=5&&v>0&&v!==tics){tics=v;_sfx(SND('tic'));}}}
 else if(lastTm){lastTm='';tmEl.style.display='none';col.style.display='none';}
 if(TM&&!inRosco){const s=TM.na.sec+"|"+TM.az.sec;if(s!==lastSc){lastSc=s;sc.innerHTML=`<span class="na">${TM.na.sec}</span><span class="az">${TM.az.sec}</span>`;}}}
const TIT={cab:'',he:'¡HE<br>DICHO!',suena:'ESTO ME<br>SUENA',donde:'¿DÓNDE<br>ESTÁN?',pinta:'¿TÚ QUÉ<br>PINTAS?',ristra:'LA<br>RISTRA',rosco:'EL<br>ROSCO',desp:'¡HASTA<br>LA PRÓXIMA!'};
async function playVid(n,rid){build();const b=card.querySelector('b');
 if(n=='cab'){b.innerHTML='<img src="f16v/logo.png" style="width:70vw;max-height:40vh;object-fit:contain">';sfx(SND('cabecera'));}else{b.innerHTML=TIT[n]||'';sfx(SND('cortinilla'));}
 card.classList.add('on');try{await wait(n=='cab'?4:n=='desp'?3:1.8,rid);}finally{card.classList.remove('on');}}
const VID={he:'he',suena:'suena',donde:'donde',pinta:'pinta',ristra:'ristra'};
const api={_st:null,_k:'na',_want:0,
 start(t){build();hook();swap("p");TM=t;on=true;api._want=1;setLogo(true);document.body.classList.add('f16');document.body.classList.remove('f16az');sc.style.display='none';ro.style.display=rt.style.display='none';split.style.display='none';lastSc='';if(!loop)loop=requestAnimationFrame(tick);},
 async cab(rid,fn){try{stopMusic();}catch(e){}cut('wide');_music(SND('rosco'),false);await wait(4,rid);try{stopMusic();}catch(e){}chk(rid);},
 vid:async(n,rid)=>{try{stopMusic();}catch(e){}await playVid(n,rid);chk(rid);},
 team(k){api._k=k;document.body.classList.toggle('f16az',k=='az');},
 async prueba(id,rid){if(VID[id]){await playVid(VID[id],rid);}else if(0){}else{card.querySelector('b').innerHTML='PALABRAS<br>CRUZADAS';card.classList.add('on');sfx(SND('cortinilla'));await wait(1.7,rid);card.classList.remove('on');}
  chk(rid);sc.style.display='block';},
 seg(pl){balls.forEach((b,i)=>b.classList.toggle('lim',pl?(i==14||i==24):(i==0||i==13)));},
 rosco(g,t){inRosco=true;if(!api._rs){api._rs=SHOTS.rosco;SHOTS.rosco=Object.assign({},api._rs,{l:V3(0,1.93,-4.9),f:21});}sc.style.display='none';ro.style.display='block';rt.style.display='flex';g.visible=false;AU.splash=new Audio('snd/'+SND('pasa')+'.ogg');try{stopMusic();}catch(e){}_music(SND('rosco'),true);
  const st=g.state.bind(g),sa=g.setAct.bind(g),tm=g.tm.set.bind(g.tm),ac=g.ac.setT.bind(g.ac),tmc=g.team.bind(g);
  g.state=(i,s)=>{st(i,s);const b=balls[i];if(b){b.classList.toggle('s1',s==1);b.classList.toggle('s2',s==2);}};
  g.setAct=i=>{sa(i);balls.forEach((b,j)=>b.classList.toggle('act',j===i));};
  g.tm.set=v=>{tm(v);rt.firstChild.textContent=v;};g.ac.setT=v=>{ac(v);rt.lastChild.textContent=v;};
  g.team=c=>{tmc(c);const az=c===TEAM9.az.c;rt.className='f16rt '+(az?'az':'na');};
  const keep=()=>{if(!inRosco)return;g.visible=false;[g.tm,g.ac].forEach(o=>{if(o&&o.visible)o.visible=false;});requestAnimationFrame(keep);};keep();},
 async roscoEnd(rid,R,T2){ro.style.display=rt.style.display='none';
  try{const pane=(k,cls)=>{const d=document.createElement('div');d.className=cls;const [r,bs]=mkRosco();R[k].st.forEach((s,i)=>{if(s)bs[i].classList.add('s'+s);});const q=mkRt();q.className='f16rt '+k;
    q.firstChild.textContent=Math.max(0,Math.ceil(R[k].tm));q.lastChild.textContent=R[k].st.filter(x=>x==1).length;const nm=document.createElement('div');nm.className='nm';nm.textContent=T2[k].name.toUpperCase();d.append(r,q,nm);return d;};
   split.innerHTML='';split.append(pane('az','L'),pane('na','R'));split.style.display='block';await wait(3.2,rid);}catch(e){if(e instanceof Stop)throw e;}finally{split.style.display='none';inRosco=false;if(api._rs){SHOTS.rosco=api._rs;api._rs=null;}try{stopMusic();}catch(e){}}},
 end(){unswap();if(api._rs){SHOTS.rosco=api._rs;api._rs=null;}on=false;inRosco=false;TM=null;api._st=null;api._want=0;setLogo(false);if(root){document.body.classList.remove('f16','f16az');ro.style.display=rt.style.display='none';split.style.display='none';tmEl.style.display='none';col.style.display='none';if(!vid.paused){vid.pause();vid.style.display='none';}}},
 menuLogo(f){api._want=f?1:0;setLogo(f);}};
return api;})();
{const _sm=showMenu;showMenu=function(s='main'){if(window.F16){if(document.body.classList.contains('f16')){F16.end();try{stopMusic();}catch(e){}}F16.menuLogo(s==='fam10'||s==='fam10n');}return _sm.apply(this,arguments);};}
$('#ver').textContent='v0.21';
