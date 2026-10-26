'use strict';
// ======================================================================
//  v0.9 — Pantalla de LA SILLA AZUL con el grafismo real de cada época (referencias de Iker, ref_silla_azul_grafismo):
//  A = 2016 (azul oscuro; Aurora/Javier)  · B = 2018 (celeste; Paula/Fran)  · C = 2020 (cian; Sara/Moisés).
//  Un cuadro por jugador con su chapa (nombre), su letra y 2 bolas (verdes = vidas; pasan a rojo al fallar).
//  Asignación a las etapas de la app (suposición, marcada): 2014→A, 2017→A (2016 y 2017 equidistan; se usa A), 2019→B; C (2020+) disponible
//  en Opciones (la app no tiene etapa 2020+). Los cuadros son figuras genéricas (sin fotos de personas reales).
// ======================================================================
(function(){
OPT.sillaEst=OPT.sillaEst||0; // 0 auto · 1 A · 2 B · 3 C
const css=document.createElement('style');css.textContent=`
#silla9{position:fixed;left:50%;top:9vh;transform:translateX(-50%);display:none;z-index:14;pointer-events:none;gap:0;height:min(58vh,330px);aspect-ratio:1.9/1}
#silla9.on{display:flex}
#silla9 .p9{position:relative;flex:1;overflow:hidden;transition:transform .35s,filter .35s,opacity .35s;filter:saturate(.85) brightness(.82);transform:scale(.97)}
#silla9 .p9.me{filter:none;transform:scale(1.02);z-index:2}
#silla9 .p9 svg.fig{position:absolute;left:0;right:0;bottom:0;width:100%;height:88%}
#silla9 .bg9{position:absolute;inset:0}
#silla9 .ch9{position:absolute;left:9%;bottom:19%;width:19%;aspect-ratio:1;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 clamp(7px,1.4vw,13px)/1 system-ui,sans-serif;color:#fff;letter-spacing:.5px;text-shadow:0 1px 2px #0008}
#silla9 .pl9{position:absolute;bottom:4%;height:15%;display:flex;align-items:center;gap:5%;padding:0 5%}
#silla9 .L9{height:78%;aspect-ratio:1;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 clamp(11px,2.2vw,22px)/1 system-ui,sans-serif}
#silla9 .b9{height:62%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#b6ff9e,#26b824 60%,#0b6a10);box-shadow:0 1px 3px #0007;transition:background .3s}
#silla9 .b9.x{background:radial-gradient(circle at 35% 30%,#ffb0a0,#e02418 60%,#7a0a06)}
/* A · 2016 azul oscuro: marco azul brillante, tira roja en medio, fondo celeste con trama de puntos */
#silla9.A .p9{border:.5vh solid #1d58ff;border-radius:10px;box-shadow:inset 0 0 0 2px #7fb0ff}
#silla9.A .bg9{background:radial-gradient(circle,#ffffff44 1px,transparent 1.6px) 0 0/9px 9px,linear-gradient(180deg,#4a95e6,#2c78d8)}
#silla9.A .mid9{width:1.2vh;background:#d8242e;z-index:3}
#silla9.A .ch9{background:radial-gradient(circle at 50% 40%,#5c82e0,#2347b0);border:2px solid #cfe0ff}
#silla9.A .pl9{background:linear-gradient(#2a4fc0,#10307f);border-radius:99px;border:2px solid #8fb4ff}
#silla9.A .L9{background:none;color:#fff}
#silla9.A .pl9.l{left:8%}#silla9.A .pl9.r{right:8%}
/* B · 2018 celeste: esquinas redondeadas, marco celeste claro, píldora con la letra en círculo blanco */
#silla9.B .p9{border:.6vh solid #a6dcff;border-radius:16px;margin:0 .3vh}
#silla9.B .bg9{background:radial-gradient(circle,#ffffff30 1px,transparent 1.8px) 0 0/12px 12px,linear-gradient(160deg,#2f8bf2,#58b9ff)}
#silla9.B .mid9{display:none}
#silla9.B .ch9{background:radial-gradient(circle at 50% 40%,#5f86e8,#2748b8);border:2px solid #fff}
#silla9.B .pl9{background:linear-gradient(#ffffff40,#ffffff18);border:2px solid #fff;border-radius:99px}
#silla9.B .L9{background:#fff;color:#1f5fd6}
#silla9.B .pl9.l{right:6%}#silla9.B .pl9.r{left:6%}
/* C · 2020 cian: marcos cian muy redondeados, fondo azul con confeti, píldora azul con la letra en círculo blanco */
#silla9.C .p9{border:.5vh solid #1fd8ff;border-radius:34px;margin:0 .6vh}
#silla9.C .bg9{background:radial-gradient(circle at 20% 18%,#ffd24a 0 3px,transparent 4px),radial-gradient(circle at 78% 30%,#ff5aa0 0 3px,transparent 4px),radial-gradient(circle at 60% 12%,#fff 0 3px,transparent 4px),linear-gradient(160deg,#2f6ff5,#1ea8ff)}
#silla9.C .mid9{display:none}
#silla9.C .ch9{background:radial-gradient(circle at 50% 40%,#5f86e8,#2748b8);border:2px solid #bfeaff}
#silla9.C .pl9{background:linear-gradient(#2b5be0,#1a3fb8);border:2px solid #8fdcff;border-radius:99px;left:50%;transform:translateX(-50%);padding:0 6%}
#silla9.C .L9{background:#fff;color:#2347c0}
`;document.head.appendChild(css);
const el=document.createElement('div');el.id='silla9';document.body.appendChild(el);
const FIG=(sk,sh)=>`<svg class="fig" viewBox="0 0 100 110" preserveAspectRatio="xMidYMax meet"><path d="M8 110c0-26 14-38 42-38s42 12 42 38z" fill="${sh}"/><rect x="42" y="56" width="16" height="20" rx="6" fill="${sk}"/><ellipse cx="50" cy="36" rx="19" ry="23" fill="${sk}"/><path d="M30 34c0-20 11-26 21-26s20 8 19 26c-4-9-10-13-20-13s-16 4-20 13z" fill="#3a2a22"/></svg>`;
const S9={on:false,st:'B',lives:[0,0],rid:0};window.S9=S9;
const pick9=(etapa)=>{const o=OPT.sillaEst|0;if(o)return 'ABC'[o-1];return {2014:'A',2017:'A',2019:'B'}[etapa]||'B';};
S9.show=function(names,letters,o){o=o||{};S9.st=o.style||pick9(OPT.etapa);S9.lives=[0,0];S9.rid=RUN;S9.on=true;
 const mk=(i)=>{const side=i?'r':'l';const pl=`<div class="pl9 ${side}"><div class="L9">${letters[i]||'?'}</div><i class="b9"></i><i class="b9"></i></div>`;
  // B: la letra queda en el lado interior (como en la referencia: izquierda «I • •», derecha «• • H»)
  const pl2=S9.st=='B'&&i?`<div class="pl9 ${side}"><i class="b9"></i><i class="b9"></i><div class="L9">${letters[i]||'?'}</div></div>`:pl;
  return `<div class="p9 ${i?'rt':'lt'}" data-i="${i}"><div class="bg9"></div>${FIG(i?'#d8a47e':'#e4b79a',i?'#7e8aa0':'#2e8a63')}<div class="ch9">${names[i]}</div>${pl2}</div>`;};
 el.className='on '+S9.st;el.innerHTML=mk(0)+'<div class="mid9"></div>'+mk(1);};
S9.turn=i=>{el.querySelectorAll('.p9').forEach(p=>p.classList.toggle('me',+p.dataset.i===i));};
S9.letter=(i,L)=>{const p=el.querySelector(`.p9[data-i="${i}"] .L9`);if(p)p.textContent=L;};
S9.fail=i=>{const b=[...el.querySelectorAll(`.p9[data-i="${i}"] .b9`)];const k=S9.lives[i]++;if(b[k])b[k].classList.add('x');};
S9.hide=()=>{S9.on=false;el.className='';};
setInterval(()=>{if(S9.on&&S9.rid!==RUN)S9.hide();},300);
// opción de estilo en Opciones
{const _sm=showMenu;showMenu=function(s){const r=_sm.apply(this,arguments);if(s=='opt'){const col=menu.querySelector('.col');if(col&&!col.querySelector('[data-o9=sillaEst]')){const row=document.createElement('div');row.className='orow';const nm=['Automático (por etapa)','A · 2016 azul oscuro','B · 2018 celeste','C · 2020 cian'];
  row.innerHTML=`<label>💺 Grafismo de la Silla Azul: <b class="v9">${nm[OPT.sillaEst|0]}</b></label><input type="range" min="0" max="3" step="1" value="${OPT.sillaEst|0}" data-o9="sillaEst">`;const a=col.querySelector('[data-o9=dorado]');(a&&a.parentNode?a.parentNode.after(row):col.appendChild(row));
  const i=row.querySelector('input');i.oninput=()=>{OPT.sillaEst=+i.value;row.querySelector('.v9').textContent=nm[+i.value];saveOpt();};try{NAV.attach(s);}catch(e){}}}return r;};}
})();
