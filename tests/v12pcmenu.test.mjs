// v0.12 · Modo clásico desde el MENÚ PRINCIPAL: botón visible → menú PC → «JUGAR (los 6 juegos)» → vuelve al principal
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_12/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
const shot=n=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:84});
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;window.SPEED=12;});
await ev(()=>showMenu('main'));await sleep(600);
check('botón «Modo clásico» visible en el menú principal',await ev(()=>{const b=document.querySelector('[data-go="a12:pcm"]');return !!b&&b.offsetParent!==null&&/Modo clásico/.test(b.textContent);}));
await shot('v12_clasico_menu_principal');
await ev(()=>document.querySelector('[data-go="a12:pcm"]').scrollIntoView({block:'center'}));await sleep(300);await T.tap(...await T.center('[data-go="a12:pcm"]'));await sleep(3000);
const m1=await ev(()=>({menu:MODE.menu,pcb:[...document.querySelectorAll('#pc12 .pcb')].map(b=>b.textContent)}));
check('se abre el menú del juego de PC con «JUGAR» y «Juegos sueltos»',!m1.menu&&m1.pcb.some(t=>/JUGAR/.test(t))&&m1.pcb.some(t=>/sueltos/i.test(t)),JSON.stringify(m1.pcb));
await shot('v12_clasico_menu_pc');
await ev(()=>{[...document.querySelectorAll('#pc12 .pcb')].find(b=>/JUGAR/.test(b.textContent)).onpointerdown({preventDefault(){}});});
const seen=new Set();let back=false;
for(let i=0;i<900&&!back;i++){await sleep(150);
 const s=await ev(()=>{const t=document.querySelector('#pc12 .hd,#pc12 .tit');return {h:t?t.textContent.slice(0,40):'',pcb:[...document.querySelectorAll('#pc12 .pcb')].map(b=>b.textContent)};});
 if(s.pcb.some(t=>/sueltos/i.test(t))&&seen.size>2)back=true;
 await ev(()=>{try{askEnd(Math.random()<.5?'pasapalabra':'xx');}catch(e){}[...document.querySelectorAll('#pc12 .opt,#pc12 .pcb')].filter(b=>b.onpointerdown&&!/JUGAR|sueltos|Volver|Salir|ayuda|museo/i.test(b.textContent)).slice(0,1).forEach(b=>{try{b.onpointerdown({preventDefault(){}});}catch(e){}});
  const e=document.querySelector('#pc12 .pulsa,#pc12 .go');if(e&&e.onpointerdown)try{e.onpointerdown({preventDefault(){}});}catch(e){}});
 for(const g of await ev(()=>[...document.querySelectorAll('#pc12 .intro,#pc12 .hd')].map(e=>e.textContent.slice(0,30))))seen.add(g);}
check('juega los 6 juegos y vuelve al menú PC',back,'vistos='+[...seen].length);
await ev(()=>{RUN++;showMenu('main');});await sleep(400);
check('vuelve al menú principal',await ev(()=>MODE.menu));
check('sin errores de página',T.errs.length==0,T.errs.slice(0,4).join(' | '));
console.log(check.fail?`\n${check.fail} FALLAN`:'\nTODAS PASAN');await T.close();process.exit(check.fail?1:0);
