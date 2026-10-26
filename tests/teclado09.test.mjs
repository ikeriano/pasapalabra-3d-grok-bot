// v0.9.1: el teclado del móvil/tablet funciona al escribir respuestas (CDP: toque real, Input.insertText, teclas, composición IME, viewport reducido por el teclado)
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_09/shots';
const T=await open({w:800,h:360,dpr:2});const {p,cdp}=T;const ev=(f,...a)=>p.evaluate(f,...a);
const shot=n=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:84});
// escena de pregunta (como en el rosco)
await ev(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');OPT.etapa=OPT.plato=2019;applyPlato(2019);cut('rosco');window.__ans='nada';hostSay('<b>Empieza por A:</b> Lugar donde se guardan los aviones, en un aeropuerto');window.__ev.length=0;
 setActs([{t:'Pasapalabra',ic:'⟳',cls:'y',cb:()=>{askEnd('')}}]);ask(()=>false).then(v=>{window.__ans=v;});});
await sleep(1200);
const st=()=>ev(()=>{const k=document.getElementById('kb'),r=k.getBoundingClientRect(),cs=getComputedStyle(k),s=document.getElementById('sub').getBoundingClientRect(),c=document.getElementById('c');return {r:[r.left,r.top,r.width,r.height],fs:parseFloat(cs.fontSize),op:+cs.opacity,vis:cs.visibility,disp:getComputedStyle(k.parentNode).display,act:document.activeElement&&document.activeElement.id,val:k.value,ask:DBG.ASK,sub:[s.top,s.bottom],cw:c.width,ch:c.height,W:innerWidth,H:innerHeight,ac:k.autocapitalize,sc:k.spellcheck,acor:k.getAttribute('autocorrect')};});
let s=await st();
check('el campo de texto es visible y grande (≥44 px alto, fuente ≥16 px)',s.disp!='none'&&s.vis=='visible'&&s.op==1&&s.r[3]>=44&&s.r[2]>=200&&s.fs>=16,JSON.stringify(s.r)+' fs '+s.fs);
check('el campo queda en la mitad superior (a salvo del teclado)',s.r[1]+s.r[3]<s.H*.5);
check('la pista (#sub) también queda arriba, visible con el teclado abierto',s.sub[1]<s.H*.55,JSON.stringify(s.sub));
check('autocapitalize/spellcheck/autocorrect configurados',s.ac=='characters'&&s.sc===false&&s.acor=='off');
// toque REAL sobre el campo → foco
await T.tap(s.r[0]+s.r[2]/2,s.r[1]+s.r[3]/2);await sleep(300);s=await st();
check('tocar el campo le da el foco',s.act=='kb',s.act);
// teclear con dispatchKeyEvent (teclado físico/hardware)
const key=async ch=>{await cdp.send('Input.dispatchKeyEvent',{type:'keyDown',text:ch,key:ch,unmodifiedText:ch});await cdp.send('Input.dispatchKeyEvent',{type:'keyUp',key:ch});};
for(const ch of 'hangar')await key(ch);await sleep(150);s=await st();
check('teclas sueltas: se escribe «hangar» entero',s.val.toLowerCase()=='hangar',s.val);
const shown=await ev(()=>document.getElementById('ans').innerHTML);check('la respuesta sigue la entrada (input)',/HANGAR/.test(shown));
// ahora simulamos el teclado abierto: el viewport pierde la mitad de alto
const cw0=s.cw,ch0=s.ch;
await cdp.send('Emulation.setDeviceMetricsOverride',{width:800,height:170,deviceScaleFactor:2,mobile:true});await sleep(500);s=await st();
check('con el teclado abierto (viewport 800×170) el 3D NO se reescala',s.cw==cw0&&s.ch==ch0,`${cw0}×${ch0} → ${s.cw}×${s.ch}`);
check('…y la pregunta sigue activa, el foco se mantiene y el texto no se pierde',s.ask&&s.act=='kb'&&s.val.toLowerCase()=='hangar',`ask ${s.ask} foco ${s.act} «${s.val}»`);
check('con el teclado abierto el campo sigue dentro de la zona visible',s.r[1]>=0&&s.r[1]+s.r[3]<=s.H,`campo ${Math.round(s.r[1])}-${Math.round(s.r[1]+s.r[3])} de ${s.H}`);
await cdp.send('Emulation.setDeviceMetricsOverride',{width:800,height:360,deviceScaleFactor:2,mobile:true});await ev(()=>{const d=document.createElement('div');d.id='tecladoSim';d.style.cssText='position:fixed;left:0;right:0;bottom:0;height:46%;background:#d9dce1;z-index:999;display:flex;align-items:center;justify-content:center;font:700 20px Arial;color:#555;border-top:2px solid #999';d.textContent='⌨  teclado del sistema (simulado)';document.body.appendChild(d);});await sleep(700);await shot('teclado09_abierto');await ev(()=>document.getElementById('tecladoSim').remove());await cdp.send('Emulation.setDeviceMetricsOverride',{width:800,height:170,deviceScaleFactor:2,mobile:true});await sleep(300);
// tocar el 3D no cierra el teclado
await T.tap(400,100);await sleep(250);s=await st();check('tocar la escena 3D no roba el foco al campo',s.act=='kb'&&s.ask);
// composición IME (teclado predictivo): la entrada se compone y se confirma
await ev(()=>{const k=document.getElementById('kb');k.value='';k.oninput();});
await cdp.send('Input.imeSetComposition',{text:'av',selectionStart:2,selectionEnd:2});await sleep(120);
await cdp.send('Input.imeSetComposition',{text:'avión',selectionStart:5,selectionEnd:5});await sleep(120);
let mid=await st();
await cdp.send('Input.insertText',{text:'avión'});await sleep(150);s=await st();
check('composición IME: «avión» se escribe y se confirma sin duplicar ni perder letras',s.val=='avión'&&/AVIÓN/.test(await ev(()=>document.getElementById('ans').innerHTML)),`durante: «${mid.val}» final: «${s.val}»`);
await cdp.send('Input.insertText',{text:' viejo'});await sleep(100);s=await st();check('insertText (teclado de pantalla) añade texto',s.val=='avión viejo',s.val);
// ninguna tecla de letra es consumida por atajos globales
const dp=await ev(()=>{window.__dp=[];addEventListener('keydown',e=>__dp.push(e.defaultPrevented),false);return 1;});
for(const ch of 'xyz ')await key(ch);await sleep(100);const dpr=await ev(()=>window.__dp.slice());s=await st();
check('ningún atajo global consume letras o espacio (keydown sin preventDefault)',dpr.length>=4&&dpr.every(x=>!x),dpr.join(','));
check('el texto sigue completo tras teclear xyz',s.val=='avión viejoxyz ',JSON.stringify(s.val));
// Backspace funciona
await cdp.send('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'Backspace',code:'Backspace',windowsVirtualKeyCode:8});await cdp.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Backspace',code:'Backspace',windowsVirtualKeyCode:8});await sleep(100);s=await st();
check('Retroceso borra un carácter',s.val=='avión viejoxyz',JSON.stringify(s.val));
// el teclado se cierra: el viewport vuelve y todo sigue bien
await cdp.send('Emulation.setDeviceMetricsOverride',{width:800,height:360,deviceScaleFactor:2,mobile:true});await sleep(500);s=await st();
check('al cerrar el teclado el 3D sigue con su tamaño',s.cw==cw0&&s.ch==ch0&&s.ask);
// Enter confirma
await ev(()=>{const k=document.getElementById('kb');k.value='';k.oninput();});for(const ch of 'hangar')await key(ch);
await cdp.send('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await cdp.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await sleep(250);
check('Intro envía la respuesta',await ev(()=>window.__ans)=='hangar',await ev(()=>window.__ans));
// botón ✔ (envío táctil) y submit del formulario
await sleep(500);await ev(()=>{window.__ans='nada';ask(()=>false).then(v=>{window.__ans=v;});});await sleep(300);
await T.tap(...(await T.center('#kb')));await sleep(200);await cdp.send('Input.insertText',{text:'oruga'});await sleep(100);
await T.tap(...(await T.center('#kbok')));await sleep(300);
check('el botón ✔ envía la respuesta con el dedo',await ev(()=>window.__ans)=='oruga',await ev(()=>window.__ans));
// dos preguntas seguidas: el campo no se oculta entre medias (sin parpadeo del teclado)
await ev(()=>{window.__a2=[];ask(()=>false).then(v=>{window.__a2.push(v);ask(()=>false).then(v=>window.__a2.push(v));});});await sleep(200);
await T.tap(...(await T.center('#kb')));await cdp.send('Input.insertText',{text:'uno'});await cdp.send('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await cdp.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await sleep(120);
s=await st();check('en la siguiente pregunta el campo sigue visible, vacío y con foco',s.disp!='none'&&s.val==''&&s.act=='kb'&&s.ask,JSON.stringify({d:s.disp,v:s.val,a:s.act}));
await cdp.send('Input.insertText',{text:'dos'});await cdp.send('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await cdp.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await sleep(700);
check('las dos respuestas llegan completas',JSON.stringify(await ev(()=>window.__a2))=='["uno","dos"]',JSON.stringify(await ev(()=>window.__a2)));
check('al terminar, el campo se oculta',(await st()).disp=='none');
check('sin errores de JavaScript',T.errs.length==0,T.errs.join(' | '));
await ev(()=>{ask(()=>false);});await sleep(300);await cdp.send('Input.insertText',{text:'prueba'});await shot('teclado09_escrito');
await T.close();console.log(check.fail?'FALLOS: '+check.fail:'OK');process.exit(check.fail?1:0);
