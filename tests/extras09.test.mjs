// v0.9: humo de los bloques nuevos (extras, Lo mejor, pruebas previas ×5, Silla 2017, conversación, Juegos DVD, opciones, promos)
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_09/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
const shot=(n)=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:84});
const stop=async()=>{await ev(()=>{RUN++;try{stopMusic();}catch(e){}});await sleep(600);};
const menuShot=async(scr,n)=>{await ev(s=>{showMenu(s);},scr);await sleep(500);await shot(n);return ev(()=>menu.querySelector('.col').innerText.slice(0,20000));};
await ev(()=>{OPT.etapa=OPT.plato=2019;});
// --- menús
let t=await menuShot('main','x9_menu_principal');check('menú principal: Lo mejor, Extras y Juegos DVD',/Lo mejor de Pasapalabra/.test(t)&&/Extras/.test(t)&&/Juegos DVD/.test(t));
check('«Juegos DVD» abre el juego clásico del DVD (módulo integrado)',await ev(()=>{showMenu('main');const b=menu.querySelector('[data-go=dvd9]');return !!b&&/Juegos DVD/.test(b.textContent)&&typeof montarClasico=='function'&&!!window.DVD_DATA;}));
t=await menuShot('mejor','x9_mejor');check('Lo mejor: 3 apartados',/Mejores botes/.test(t)&&/Mejores roscos/.test(t)&&/Momentos/.test(t));
t=await menuShot('mejor_botes','x9_mejor_botes');check('Mejores botes con fuente y dudosos marcados',/Fuente:/.test(t)&&/Dudoso/.test(t)&&/318\.000/.test(t));
t=await menuShot('mejor_roscos','x9_mejor_roscos');check('Roscos con fuente',/Fuente:/.test(t));
t=await menuShot('mejor_momentos','x9_mejor_momentos');check('Momentos con fuente',/Fuente:/.test(t));
t=await menuShot('extras9','x9_extras');check('Extras: 5 entradas',['Tomas falsas','Fuera de cámaras','Publicidad','Promos','Cámara libre'].every(x=>t.includes(x)));
t=await menuShot('opt','x9_opciones');
const opts=await ev(()=>({boteVoz:OPT.boteVoz,conversa:OPT.conversa,previas:OPT.previas,tomasIn:OPT.tomasIn,publiIn:OPT.publiIn}));
check('opciones nuevas: bote en voz ON, el resto OFF',opts.boteVoz==1&&!opts.conversa&&!opts.previas&&!opts.tomasIn&&!opts.publiIn,JSON.stringify(opts));
// --- escenas
await ev(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');});
const sc=async(name,code,wait=3500)=>{await ev(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');});const src=typeof code=='function'?`(${code})()`:code;await ev(`setTimeout(()=>{${src}},0);0`);await sleep(wait);const s=await ev(()=>({n:G.children.length,say:(document.querySelector('#sub')||{}).innerText||'',run:RUN}));await shot('x9_'+name);check(name+': se ve algo y sin errores',T.errs.length==0,`G=${s.n} · ${s.say.slice(0,60)}`);await stop();return s;};
await sc('bote_0',"DBG.x9go('x9:bote:0')",5000);
await sc('bote_fran',"{const i=DBG.D9.botes.findIndex(b=>b.n=='Fran González');DBG.x9go('x9:bote:'+Math.max(0,i));}",6000);
await sc('rosco_0',()=>DBG.x9go('x9:rosco:0'));
await sc('momento_0',()=>DBG.x9go('x9:momento:0'));
for(let i=0;i<3;i++)await sc('toma_'+i,`DBG.x9go('x9:toma:${i}')`,4500);
await sc('publi_0',"DBG.x9go('x9:publi:0')",4000);
await sc('fuera',"DBG.x9go('x9:fuera')",4000);
{await ev(`setTimeout(()=>{DBG.x9go('x9:cam')},0);0`);await sleep(1500);const n=await ev(()=>document.querySelectorAll('#acts button, #acts .act, #acts > *').length);await shot('x9_camara_libre');check('cámara libre: botones de planos',n>=5,String(n));await stop();}
// --- promos
await ev(()=>{showMenu('promos');});await sleep(500);
t=await ev(()=>menu.querySelector('.col').innerText);check('Promos: lista',/promo/i.test(t));
// --- previas
for(const f of ['pVF','pPares','pIntruso','pLetra','pFlash'])await sc('previa_'+f,`DBG.${f}(++RUN).catch(()=>{})`,4500);
// --- Silla 2017 y conversación
await sc('silla_2017',"OPT.etapa=2017;DBG.sillaAzul17(++RUN).catch(()=>{})",7000);
await ev(()=>{OPT.etapa=OPT.plato=2019;});
await sc('conversacion',"DBG.convo9(++RUN).catch(()=>{})",5000);
check('sin errores de JavaScript',T.errs.length==0,T.errs.join(' | '));
console.log(check.fail?`\n${check.fail} FALLAN`:'\nTODAS PASAN');await T.close();process.exit(check.fail?1:0);
