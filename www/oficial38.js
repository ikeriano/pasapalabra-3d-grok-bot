'use strict';
// v0.39 · App original de Momentum Games (1.3.1 y 1.15.2) como opciones del menú.
// Las apps van en APKs a parte, firmadas, y se abren si están instaladas. El contenido de esas apps no se modifica.
(()=>{
const BR=()=>window.Oficial38||null;
const APPS={
  v131:{title:'App original 1.3.1', ic:'📱', full:'com.ikeriano.pasapalabra.v131', lite:'com.ikeriano.pasapalabra.l131',
    blurb:'La app oficial de Momentum Games, versión 1.3.1, recuperada para instalarse junto a Pasapalabra 3D.',
    apk:'Pasapalabra-oficial-1.3.1.apk', liteApk:'Pasapalabra-oficial-1.3.1-Lite.apk', liteNote:'Lite de 42 MB, solo 32 bits (armeabi-v7a), pensada para el Redmi A2',
    installNote:'Todavía no está instalada. En el Redmi A2 instala <b>Pasapalabra-oficial-1.3.1.apk</b> (completa) o la Lite <b>Pasapalabra-oficial-1.3.1-Lite.apk</b> (32 bits, más ligera) y vuelve a entrar aquí.'},
  v152:{title:'App original 1.15.2', ic:'📱', full:'com.ikeriano.pasapalabra.v152', lite:'com.ikeriano.pasapalabra.l152',
    blurb:'La app oficial de Momentum Games, versión 1.15.2 (el archivo era 1.15.2, no 1.15.7), recuperada con librerías arm64. En el Redmi A2 no se instala hasta que llegue el split de 32 bits (config.armeabi_v7a).',
    apk:'Pasapalabra-oficial-1.15.2.apk', liteApk:'Pasapalabra-oficial-1.15.2-Lite.apk', liteNote:'Lite arm64, mismo tamaño; no instala en el Redmi A2 (falta el split de 32 bits)',
    installNote:'Esta versión solo trae librerías de 64 bits, así que <b>no se instala en el Redmi A2</b> hasta que tengamos el split config.armeabi_v7a. En un teléfono de 64 bits instala <b>Pasapalabra-oficial-1.15.2.apk</b> o la Lite y vuelve a entrar aquí.'}
};
function inst(pkg){try{const b=BR();return !!(b&&b.instalada(pkg));}catch(e){return false;}}
function abrir(pkg){try{const b=BR();return !!(b&&b.abrir(pkg));}catch(e){return false;}}
function estado(a){const f=inst(a.full), l=inst(a.lite);return {f,l,any:f||l};}
function panel(id){
  const a=APPS[id]; if(!a){showMenu('main');return;}
  const st=estado(a);
  let body=`<h2>${a.ic} ${a.title}</h2><div class="mtext">${a.blurb}</div>`;
  if(st.f){body+=`<div class="mbtn y" data-open="${a.full}"><span class="ic">▶</span><div>Abrir la versión completa<small>${a.apk} está instalada</small></div></div>`;}
  if(st.l){body+=`<div class="mbtn y" data-open="${a.lite}"><span class="ic">▶</span><div>Abrir la versión Lite<small>${a.liteApk} · ${a.liteNote}</small></div></div>`;}
  if(!st.any){body+=`<div class="mtext">${a.installNote||('Todavía no está instalada en este teléfono. Instala <b>'+a.apk+'</b> o la Lite <b>'+a.liteApk+'</b> y vuelve a entrar aquí.')}</div>`;}
  body+=`<div class="mbtn y" data-go="main"><span class="ic">⟵</span><div>Volver</div></div>`;
  if(menu.querySelector('.col')){
    const h2=menu.querySelector('.col');
    h2.innerHTML=body;
    h2.querySelectorAll('[data-open]').forEach(b=>b.onpointerdown=ev=>{ev.preventDefault();sfx&&sfx('ok');if(!abrir(b.dataset.open)){b.querySelector('small')?b.querySelector('small').textContent='No se ha podido abrir. ¿Está instalada?':'';}});
    h2.querySelectorAll('[data-go]').forEach(b=>b.onpointerdown=ev=>{ev.preventDefault();sfx&&sfx('ok');showMenu('main');});
  }else{
    menu.innerHTML=`<div class="mbox"><div class="col text">${body}</div></div>`;
    menu.querySelectorAll('[data-open]').forEach(b=>b.onpointerdown=ev=>{ev.preventDefault();if(!abrir(b.dataset.open)){};});
    menu.querySelectorAll('[data-go]').forEach(b=>b.onpointerdown=ev=>{ev.preventDefault();showMenu('main');});
  }
}
const _sm=showMenu;
showMenu=function(s='main'){
  if(s==='orig131'){const r=_sm.call(this,'main');try{panel('v131');}catch(e){console.error(e);}try{el('ver').textContent='v0.39';}catch(e){}return r;}
  if(s==='orig152'){const r=_sm.call(this,'main');try{panel('v152');}catch(e){console.error(e);}try{el('ver').textContent='v0.39';}catch(e){}return r;}
  const r=_sm.apply(this,arguments);
  try{
    el('ver').textContent='v0.39';
    if(s==='main'){
      const col=menu.querySelector('.col');
      if(col&&!el('entryOficial38')){
        const st1=estado(APPS.v131), st2=estado(APPS.v152);
        const sub1=st1.any?'Instalada · tócala para abrirla':'La app oficial de Momentum Games, recuperada';
        const sub2=st2.any?'Instalada · tócala para abrirla':'La app oficial de Momentum Games, recuperada';
        const block=document.createElement('div');
        block.id='entryOficial38';
        block.innerHTML=`<button class="mbtn" id="orig131" style="margin-top:8px;width:100%"><span class="ic">📱</span><div>App original 1.3.1<small>${sub1}</small></div></button><button class="mbtn" id="orig152" style="margin-top:8px;width:100%"><span class="ic">📱</span><div>App original 1.15.2<small>${sub2}</small></div></button>`;
        const entry=el('entry37');
        if(entry)entry.insertAdjacentElement('afterend',block);
        else col.appendChild(block);
        el('orig131').onclick=()=>showMenu('orig131');
        el('orig152').onclick=()=>showMenu('orig152');
      }
    }
  }catch(e){console.error(e);}
  return r;
};
window.PPOficial38={APPS,estado,abrir,show:panel};
})();
