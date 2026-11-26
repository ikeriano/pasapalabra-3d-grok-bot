// v0.30 · Logos de Iker: mosca por etapa/cadena, pantallas del plató, opción «Rótulos de TV y logos». Reutiliza aps/logos sin recomprimir. v0.34: autopromo fija por programa. v0.32: la mosca de emisión vuelve a sus colores originales (sin filtro gris).
(function(){
const LOGOS30=['antena3_iker','antena3_blanco','antena3_blanco_v2','antena3_rosa','telecinco_circulo_azul','telecinco_anillo_azul','telecinco_hd','telecinco_2_dos','cuatro','cuatro_hd','fdf_hd','boing','divinity','divinity_esfera','mediaset_infinity_blanco','atresplayer','showtime_tv_azul','showtime_tv_oscuro','ahora_caigo_hd','ahora_caigo_v1','ahora_caigo_v2','la_caza','the_chase','pasapalabra_texto_blanco_v1','pasapalabra_texto_blanco_v2','acierta_o_abismo','acerte_ou_caia','alla_tu','juego_de_juegos','la_ruleta_de_la_suerte','la_ruleta_de_la_suerte_noche','quien_quiere_ser_millonario','reaccion_en_cadena','rueda_la_letra_ruleta','rueda_la_letra_texto','calificacion_mas7','calificacion_tp_circulo','calificacion_tp_cuadrado'];
const URL30=n=>n=='antenaps'?'aps/antenaps_simbolo_512.png':'aps/logos/'+n+'.png';
if(OPT.mosca30===undefined)OPT.mosca30='auto';   // la mosca ya existía: ahora usa el logo de la cadena de cada etapa
if(OPT.pant30===undefined)OPT.pant30=0;          // pantallas con logos en el plató: apagado por defecto
function autoLogo(){if(OPT.a3)return 'antena3_blanco';return (+OPT.etapa||2007)>=2014?'telecinco_circulo_azul':'telecinco_anillo_azul';}
function cur(){return OPT.mosca30=='auto'?autoLogo():OPT.mosca30;}
const TL=new T.TextureLoader(),TC={};
function tx(n){if(!TC[n]){const t=TL.load(URL30(n),t=>{t.needsUpdate=true;});if('colorSpace' in t&&T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;TC[n]=t;}return TC[n];}
let M=null,lastN='';
function moscaTick(){try{
 if(typeof MOSCA!=='undefined'&&MOSCA){
  if(!M){M=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({transparent:true,depthTest:false,opacity:.88}));M.renderOrder=999;GS.add(M);}
  const n=cur(),img=n&&n!='none'&&n!='clasica';
  if(n!==lastN&&img){const t=tx(n);M.material.map=t;M.material.needsUpdate=true;lastN=n;}
  const t=M.material.map,im=t&&t.image;let w=110,h=110;if(im&&im.width){const a=im.width/im.height;if(a>=1){w=130;h=130/a;}else{h=110;w=110*a;}}
  M.scale.set(w,h,1);const zz=MOSCA.position.z+1,f=(2041.5-zz)/2041.5;M.position.set(GW/2*f-28-w/2,-360*f+26+h/2,zz);
  M.visible=!!(MOSCA.visible&&img&&im&&!OPT.emi30);
  MOSCA.scale.setScalar(n=='clasica'?1:(n=='none'||img?0.0001:1));
 }
 // pantallas del plató
 if(OPT.pant30&&!SCR&&P.root){buildScr();}
 if(SCR){SCR.visible=!!OPT.pant30;if(OPT.pant30){const k=Math.floor(performance.now()/5000);if(k!==SCR.k){SCR.k=k;SCR.children.forEach((g,i)=>{const n=SHOW[(k*2+i)%SHOW.length];g.userData.l.material.map=tx(n);g.userData.l.material.needsUpdate=true;const im=tx(n).image;if(im&&im.width){const a=im.width/im.height,W=g.userData.W*.86,H=g.userData.H*.8;g.userData.l.scale.set(a>W/H?W:H*a,a>W/H?W/a:H,1);}});}}}
 // mosca en el módulo de TV (AntenaPlayStation)
 const aps=document.getElementById('aps');let d=document.getElementById('mosca30tv');
 if(aps&&!d){d=document.createElement('img');d.id='mosca30tv';d.src=URL30('antenaps');d.alt='';d.style.cssText='position:fixed;right:2.2vw;bottom:2.4vh;height:9vh;opacity:.85;z-index:2147483000;pointer-events:none;display:none';document.body.appendChild(d);}
 if(d){const on=aps&&getComputedStyle(aps).display!='none'&&aps.offsetParent!==null&&OPT.mosca30!='none';d.style.display=on?'block':'none';}
}catch(e){console.error('logos30',e);}requestAnimationFrame(moscaTick);}
const SHOW=['antenaps'].concat(LOGOS30);
let SCR=null;
function buildScr(){SCR={k:-1,children:[],set visible(v){this.children.forEach(g=>g.visible=v)},add(g){this.children.push(g)}};const tgt=(P.sideS&&P.sideS.length)?P.sideS:[null,null];
 tgt.forEach((m,ix)=>{const g=new T.Group();const W=m?m.geometry.parameters.width:3.2,H=m?m.geometry.parameters.height:1.8;
 const sc=new T.Mesh(new T.PlaneGeometry(W,H),new T.MeshBasicMaterial({color:0x0a2a6e}));sc.position.z=.02;g.add(sc);
 const l=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({transparent:true}));l.position.z=.04;g.add(l);g.userData={l,W,H};
 if(m)m.add(g);else{g.position.set(ix?9.2:-9.2,5.2,-8.5);P.root.add(g);}SCR.add(g);});
 SCR.children.forEach(g=>{}) ;}

// ===== v0.30 · Emisión de TV (estilo Telecinco/Antena 3 real): hashtag, autopromo y mosca semitransparente =====
if(OPT.emi30===undefined)OPT.emi30=1;      // Iker lo pidió: encendido por defecto
if(OPT.promo30===undefined)OPT.promo30='auto';
const PROMOS=[['ahora_caigo_hd',['Muy pronto estreno','Gran regreso','En Antena 3']],['la_caza',['Esta noche','No te lo pierdas','En Telecinco']],['rueda_la_letra_texto',['Mañana','A las 20:00','En Antena 3']],['reaccion_en_cadena',['Nueva temporada','Muy pronto','En Telecinco']],['la_ruleta_de_la_suerte',['De lunes a viernes','A las 14:00','En Antena 3']],['juego_de_juegos',['Este sábado','Gran estreno','En La 1']],['acierta_o_abismo',['Próximamente','Gran estreno','En Antena 3']],['quien_quiere_ser_millonario',['Vuelve','Muy pronto','En Antena 3']],['alla_tu',['Gran regreso','Esta semana','En Telecinco']],['the_chase',['Especial','Este domingo','En Cuatro']]];
const css=document.createElement('style');css.textContent=`#emi30{position:fixed;inset:0;pointer-events:none;z-index:40;font-family:Arial,Helvetica,sans-serif;color:#fff;display:none}
#emi30 .hs{position:absolute;left:1.5vw;top:5.4vh;font-weight:bold;font-size:4.2vh;line-height:1;opacity:.9;text-shadow:0 0 3px #000a;white-space:nowrap;animation:e30in .7s ease-out}
#emi30 .pr{position:absolute;right:1.6vw;top:2.3vh;width:15vw;text-align:center;transition:opacity .6s,transform .6s;text-shadow:0 0 3px #000c}
#emi30 .pr img{display:block;margin:0 auto;width:16.4vw;height:17vh;margin-left:-.7vw;object-fit:contain;filter:drop-shadow(0 0 3px #0008)}
#emi30 .pr div{position:absolute;left:50%;transform:translateX(-50%);top:15.9vh;white-space:nowrap;font-size:3.1vh;line-height:3.75vh;font-weight:500;letter-spacing:.01em}
#emi30 .pr.out{opacity:0;transform:translateX(6vw)}
#emi30 .mo{position:absolute;inset:0;opacity:.75;animation:e30in 1s ease-out}
#emi30 .mo .m1{position:absolute;right:4vw;bottom:5.4vh;width:4vw;height:7.1vh;object-fit:contain;filter:none}  
#emi30 .mo .m2{position:absolute;right:4.3vw;top:95.3vh;width:6.2vw;height:auto;filter:brightness(0) invert(1)}
#emi30.a3 .mo .m2{display:none!important}#emi30.a3::before{content:'atresplayer';position:absolute;left:1vw;top:1.4vh;font:400 2.3vh/1 Arial,Helvetica,sans-serif;letter-spacing:.02em;color:#fff;opacity:.6;padding-right:2.9vh;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M3 2h7l8 8-8 8H3l8-8z' fill='none' stroke='white' stroke-width='1.6' stroke-linejoin='round'/></svg>") right center/2.5vh 2.5vh no-repeat;z-index:3;pointer-events:none}#emi30.a3 .hs{top:6.2vh}
body.tema30 #sub,body.tema30 #ans,body.tema30 #toast,body.tema30 #acts>*{border:2px solid var(--t30a)!important;box-shadow:0 0 14px var(--t30g)!important}
body.tema30 #sub b,body.tema30 #sub strong{color:var(--t30g)!important}




body.e30 #skip{top:auto!important;bottom:2.4vh!important;right:auto!important;left:calc(1.5vw + 110px)!important}
body.e30 #tr5{top:auto!important;bottom:2.4vh!important;right:auto!important;left:1.5vw!important}
body.tema30 #emi30 .hs{color:#fff;text-shadow:0 0 6px var(--t30g),0 0 2px #000}
#emi30 .te{position:absolute;left:1.5vw;top:10.6vh;font-size:3.4vh;opacity:.9}
@keyframes e30in{from{opacity:0;transform:translateY(-1vh)}}`;document.head.appendChild(css);
const E=document.createElement('div');E.id='emi30';E.innerHTML='<div class="hs"></div><div class="te"></div><div class="pr out"><img alt=""><div></div></div><div class="mo"><img class="m1" alt=""><img class="m2" alt=""></div>';document.body.appendChild(E);
let armed34=true,prog34=null,pk=-1,ep=+(localStorage.getItem('pp30_ep')||34),wasOn=false;
function chanSub(n){return /^telecinco/.test(n)?'mediaset_infinity_blanco':(/^antena3/.test(n)?'atresplayer':'');}
function isA3_30(){try{return /^antena3|^atresplayer/.test(OPT.mosca30=='auto'?autoLogo():OPT.mosca30);}catch(e){return false;}}
function promoList(){const a3=isA3_30();return OPT.promo30=='auto'?PROMOS.filter(p=>{const l=p[1].join(' ');return a3?/En (Antena 3|laSexta)/.test(l):/En (Telecinco|Cuatro)/.test(l);}):PROMOS.filter(p=>p[0]==OPT.promo30).concat(OPT.promo30=='none'?[]:[]);}
let lastT=0;addEventListener('pointerdown',()=>{lastT=performance.now();},true);
function tagTR(){const vw0=innerWidth,vh0=innerHeight;for(const [fx,fy] of [[.97,.06],[.92,.06],[.88,.08],[.95,.12]]){const els=document.elementsFromPoint(vw0*fx,vh0*fy);for(const e of els){if(e.closest('#emi30')||e.closest('#tr5')||e.closest('#skip')||e.tagName=='CANVAS'||e===document.body||e===document.documentElement||e.id=='ui'||e.id=='reportaje'||e.closest('#reportaje'))continue;const r=e.getBoundingClientRect();if(r.width<vw0*.3&&r.height<vh0*.3)e.classList.add('e30tr');}}const vw=innerWidth,vh=innerHeight;document.querySelectorAll('button,.mbtn,[class*=btn]').forEach(e=>{if(e.closest('#emi30')||e.closest('#menu')||e.closest('#tr5'))return;const r=e.getBoundingClientRect();if(r.width&&r.right>vw*0.72&&r.top<vh*0.5)e.classList.add('e30tr');});}
function emiTick(){try{
 const on=!document.querySelector('.cred30')&&!!OPT.emi30&&typeof MODE!='undefined'&&(!MODE.menu||document.getElementById('menu')?.classList.contains('hidden'))&&!document.getElementById('aps')?.offsetParent;
 const mOn=typeof MODE!='undefined'&&MODE.menu&&!document.getElementById('menu')?.classList.contains('hidden');if(mOn)armed34=true;if(on&&armed34){armed34=false;ep++;localStorage.setItem('pp30_ep',ep);prog34=null;}wasOn=on;E.style.display=on?'block':'none';document.body.classList.toggle('e30',on);if(on){tagTR();document.body.classList.toggle('e30touch',performance.now()-lastT<4000);}
 const tm=OPT.tema&&OPT.tema!='normal'?OPT.tema:'';let ti=null;try{ti=tm&&typeof TEMA6!='undefined'?TEMA6.find(x=>x.id==tm):null;}catch(e){}if(!ti&&tm&&typeof DR6!='undefined'&&DR6[tm])ti={id:tm,dr:tm,name:(window.ESP30NAME||{})[tm]||tm,emoji:DR6[tm].em||''};
 const dr=(ti&&typeof DR6!='undefined')?(DR6[ti.dr]||DR6[tm]||{}):{};document.body.classList.toggle('tema30',!!ti);if(ti){document.body.style.setProperty('--t30a',dr.acc||'#ffd23a');document.body.style.setProperty('--t30g',dr.glow||'#ffd23a');}
 if(on){E.querySelector('.hs').textContent=ti?'#Pasapalabra'+ti.name.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9]/g,''):'#Pasapalabra'+ep;E.querySelector('.te').textContent=ti?Array.from(dr.em||ti.emoji||'').slice(0,6).join(''):'';
  const n=cur(),mo=E.querySelector('.mo');mo.style.display=(n=='none')?'none':'block';
  const u=n=='clasica'?URL30('telecinco_circulo_azul'):URL30(n);const m1=E.querySelector('.m1');if(m1.getAttribute('src')!=u)m1.src=u;
  E.classList.toggle('a3',/^antena3|^atresplayer/.test(n));const s=chanSub(n=='clasica'?'telecinco':n),m2=E.querySelector('.m2');m2.style.display=s?'block':'none';if(s&&m2.getAttribute('src')!=URL30(s))m2.src=URL30(s);
  const L=promoList(),pr=E.querySelector('.pr');
  const rep=document.getElementById('reportaje');const repOn=rep&&rep.offsetParent&&getComputedStyle(rep).display!='none'&&getComputedStyle(rep).visibility!='hidden'&&+getComputedStyle(rep).opacity>0;
  if(OPT.promo30=='none'||!L.length||repOn){pr.classList.add('out');}else{
   // v0.34: una sola autopromo por programa (se elige al empezar y se guarda); nada de rotar con el tiempo
   const key=OPT.promo30;if(!prog34||prog34.key!==key){let sv=null;try{sv=JSON.parse(localStorage.getItem('pp34_promo')||'null');}catch(e){}
    if(sv&&sv.ep===ep&&sv.key===key)prog34=sv;else{const prev=sv&&sv.id;let c=L.filter(p=>p[0]!==prev);if(!c.length)c=L;const p=c[Math.floor(Math.random()*c.length)];prog34={ep,key,id:p[0]};localStorage.setItem('pp34_promo',JSON.stringify(prog34));}}
   if(pk!==prog34.id){pk=prog34.id;const p=PROMOS.find(q=>q[0]===prog34.id)||L[0];pr.querySelector('img').src=URL30(p[0]);pr.querySelector('div').innerHTML=p[1].join('<br>');}
   pr.classList.remove('out');}}
}catch(e){console.error('emi30',e);}setTimeout(emiTick,250);}
emiTick();
window.EMI30={PROMOS};
window.LOGOS30={list:LOGOS30,cur,autoLogo};
SCR9.logos30=()=>{const c=OPT.mosca30;const it2=(v,lab,src)=>`<button class="tbtn ${OPT.promo30==v?'on':''}" data-go="x30:promo:${v}" style="width:118px;height:84px;margin:4px;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;background:${OPT.promo30==v?'#2b5fd9':'#16204a'}">${src?`<img src="${src}" style="max-width:96px;max-height:48px">`:''}<small>${lab}</small></button>`;const it=(v,lab,src)=>`<button class="tbtn ${c==v?'on':''}" data-go="x30:mosca:${v}" style="width:118px;height:84px;margin:4px;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;background:${c==v?'#2b5fd9':'#16204a'}">${src?`<img src="${src}" style="max-width:96px;max-height:48px">`:''}<small>${lab}</small></button>`;
 return `<h2>🏷 Rótulos de TV y logos</h2><div class="mtext">Como en «Rueda la Letra»: elige la mosca de la cadena (abajo a la derecha). En automático sale Antena 3 en las etapas de Antena 3 y Telecinco en las de Telecinco.</div>
 <div class="orow" style="margin:8px 0"><label>📺 PANTALLAS CON LOGOS en el plató: <b>${OPT.pant30?'Sí':'No'}</b></label> <button class="tbtn ${OPT.pant30?'on':''}" data-go="x30:pant">${OPT.pant30?'Apagar':'Encender'}</button></div>
 <div class="orow" style="margin:8px 0"><label>📡 EMISIÓN DE TV (hashtag, autopromo y mosca como en la tele): <b>${OPT.emi30?'Sí':'No'}</b></label> <button class="tbtn ${OPT.emi30?'on':''}" data-go="x30:emi">${OPT.emi30?'Apagar':'Encender'}</button></div><h3>Autopromo (arriba a la derecha) · textos 🆕 INVENTADO</h3><div>${it2('auto','Todas, rotando')}${it2('none','Ninguna')}${EMI30.PROMOS.map(p=>it2(p[0],p[0].replace(/_/g,' '),URL30(p[0]))).join('')}</div><h3>Mosca de la cadena (ahora: ${c=='auto'?'Automática → '+autoLogo():c})</h3><div>${it('auto','Automática según etapa',URL30(autoLogo()))}${it('none','Ninguna')}${it('clasica','El «5» clásico')}${it('antenaps','AntenaPlayStation',URL30('antenaps'))}${LOGOS30.map(n=>it(n,n.replace(/_/g,' '),URL30(n))).join('')}</div>${back9()}`;};
const prevGo=window.go30;
window.go30=function(g){const id=g.slice(4);
 if(id=='logos')return showMenu('logos30');
 if(id=='emi'){OPT.emi30=OPT.emi30?0:1;saveOpt();return showMenu('logos30');}
 if(id.startsWith('promo:')){OPT.promo30=id.slice(6);saveOpt();return showMenu('logos30');}
 if(id=='pant'){OPT.pant30=OPT.pant30?0:1;saveOpt();return showMenu('logos30');}
 if(id.startsWith('mosca:')){OPT.mosca30=id.slice(6);saveOpt();return showMenu('logos30');}
 return prevGo(g);};
requestAnimationFrame(moscaTick);
})();
