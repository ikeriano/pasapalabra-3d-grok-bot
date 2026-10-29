// ======================================================================
//  v0.14 · GANCHO para el juego COMPLETO de PC de Silvia Jato (PASAP.EXE, Bialplen/Antena 3, 2001).
//  Si existe assets/www/sjgame/index.html (emulación o port completo del juego), la etapa
//  «El juego de PC de Silvia Jato» / «Modo clásico» lo abre a pantalla completa en un iframe
//  (#sjframe13; el gestor táctil de v13tap.js le deja los gestos tal cual) con un botón «⟵ Pasapalabra 3D».
//  Si no existe, se sigue usando la recreación de v12p.js (PCX().pcMenu).
//  El juego embebido puede volver por sí mismo con: parent.postMessage({sj13:'salir'},'*').
// ======================================================================
window.SJ13={URL:'sjgame/index.html',ok:null,
 disponible(){if(SJ13.ok===null){try{const x=new XMLHttpRequest();x.open('HEAD',SJ13.URL,false);x.send();SJ13.ok=x.status===200||(x.status===0&&!!x.responseURL);}catch(e){SJ13.ok=false;}}return SJ13.ok;},
 abrir(back){SJ13.back=back||'a12hub';try{stopMusic();clearG();}catch(e){}
  const w=document.createElement('div');w.id='sjwrap13';w.style.cssText='position:fixed;inset:0;z-index:100;background:#000';
  w.innerHTML='<iframe id="sjframe13" src="'+SJ13.URL+'" allow="autoplay;fullscreen" style="border:0;width:100%;height:100%;touch-action:none"></iframe><button id="sjback13" style="position:absolute;top:6px;left:6px;z-index:2;padding:8px 12px;font:700 14px Arial;border-radius:10px;border:2px solid #ffd23a;background:#0b2a8acc;color:#fff">⟵ Pasapalabra 3D</button>';
  document.body.appendChild(w);w.querySelector('#sjback13').onclick=()=>SJ13.cerrar();},
 cerrar(){const w=document.getElementById('sjwrap13');if(w)w.remove();showMenu(SJ13.back||'a12hub');}};
addEventListener('message',e=>{if(e.data&&e.data.sj13==='salir')SJ13.cerrar();});
$('#ver').textContent='v0.15';
