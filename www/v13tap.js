// ======================================================================
//  v0.14 · UN SOLO GESTOR DE TOQUES para todos los menús y pantallas de juego.
//  Antes convivían varios (v0.8 toque-al-levantar por elemento, gestos del menú, deslizar en filas de
//  opciones = cambiar opción, deslizar en juego = mover selección + tocar en hueco = confirmar,
//  pointerdown directos y onclick nativos), y un deslizamiento o el "click" fantasma posterior podían
//  elegir algo. Ahora: todo pointerdown/pointerup real se intercepta aquí (fase de captura en window);
//  si el dedo se mueve más de V13.SLOP px o el navegador cancela (desplazamiento nativo) no pasa nada;
//  si es un toque limpio se reenvía UNA vez (pointerdown+pointerup sintéticos en el mismo punto) y se
//  bloquean los "click" nativos (salvo campos de formulario y teclado).
//  Excepciones que siguen recibiendo el gesto tal cual: campos de texto, deslizadores (range), la sopa
//  de letras (.sgrid, arrastre) y el lienzo en la prueba de dibujo (V13.draw).
// ======================================================================
window.V13={SLOP:10,MAXMS:1200,draw:false,log:[]};
(()=>{let g=null,synth=false,lastTap=0;
 const raw=t=>t&&t.closest&&(t.closest('input:not([type=button]):not([type=submit]),textarea,select,[contenteditable=true],.sgrid,#sjframe13')||(V13.draw&&t.id==='c'));
 const fire=(type,s,e)=>{const o={bubbles:true,cancelable:true,composed:true,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY,pointerId:s.id,pointerType:s.pt,isPrimary:true,button:0,buttons:type==='pointerdown'?1:0};
  synth=true;try{(s.t.isConnected?s.t:document.elementFromPoint(e.clientX,e.clientY)||document.body).dispatchEvent(new PointerEvent(type,o));}finally{synth=false;}};
 addEventListener('pointerdown',e=>{if(synth||!e.isTrusted)return;if(raw(e.target)){g=null;return;}
  e.stopImmediatePropagation();if(!e.isPrimary||e.button>0){g=null;return;}
  g={id:e.pointerId,x:e.clientX,y:e.clientY,t:e.target,pt:e.pointerType,t0:performance.now(),ok:true};},true);
 addEventListener('pointermove',e=>{if(!g||e.pointerId!==g.id||synth)return;if(Math.hypot(e.clientX-g.x,e.clientY-g.y)>V13.SLOP)g.ok=false;},true);
 addEventListener('pointercancel',e=>{if(g&&e.pointerId===g.id)g=null;},true);
 addEventListener('pointerup',e=>{if(synth||!e.isTrusted)return;if(!g||e.pointerId!==g.id)return;const s=g;g=null;e.stopImmediatePropagation();
  if(!s.ok||Math.hypot(e.clientX-s.x,e.clientY-s.y)>V13.SLOP||performance.now()-s.t0>V13.MAXMS){V13.log.push('swipe');return;}
  lastTap=performance.now();V13.log.push('tap:'+(s.t.id||s.t.className||s.t.tagName));
  fire('pointerdown',s,e);fire('pointerup',s,e);
  // elementos que solo escuchan "click": un click sintético, una sola vez
  const c=s.t.isConnected&&s.t.closest&&s.t.closest('[onclick],a[href],button,label');if(c&&(c.onclick||c.tagName==='A'||c.tagName==='LABEL'||c.__click13)){synth=true;try{c.click();}finally{synth=false;}}},true);
 // clicks nativos: fuera (son los "fantasma" que caían en la pantalla siguiente), salvo teclado y formularios
 addEventListener('click',e=>{if(synth||!e.isTrusted)return;if(e.detail===0)return;if(raw(e.target))return;e.stopImmediatePropagation();e.preventDefault();},true);
 // los addEventListener('click') del juego también se cuentan para el click sintético
 const ael=EventTarget.prototype.addEventListener;EventTarget.prototype.addEventListener=function(t,f,o){if(t==='click'&&this instanceof Element)this.__click13=1;return ael.call(this,t,f,o);};
 const st=document.createElement('style');st.textContent='html,body,button,.mb,.mbtn,.tbtn,.orow,#menu,#c{touch-action:manipulation}#menu .col,#menu .col *{touch-action:pan-y!important}*{-webkit-tap-highlight-color:transparent}';document.head.appendChild(st);
})();
