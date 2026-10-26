// v0.9: pruebas previas por turnos (AZUL / NARANJA nunca a la vez, grafismos del color del equipo) + Silla Azul A/B/C.
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_09/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;
await p.evaluate(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');OPT.etapa=2019;window.__log=[];setInterval(()=>cut(window.__sh||'host'),200);});
await sleep(800);
// Silla Azul: tres estilos
for(const [st,nm] of [['A','2016'],['B','2018'],['C','2020']]){await p.evaluate((st)=>{S9.show(['TÚ','RIVAL'],st=='B'?['I','H']:['H','O'],{style:st});S9.turn(0);S9.fail(1);S9.fail(0);S9.fail(0);},st);await sleep(700);
 await p.screenshot({path:`${OUT}/silla9_${st}_${nm}.jpg`,type:'jpeg',quality:86});
 check('Silla Azul estilo '+st+' visible, 2 cuadros con letra y 2 bolas',await p.evaluate(()=>{const e=document.querySelector('#silla9');return e.classList.contains('on')&&e.querySelectorAll('.p9').length==2&&e.querySelectorAll('.b9').length==4&&e.querySelectorAll(".b9.x").length==3;}));}
await p.evaluate(()=>S9.hide());
// prueba previa por turnos
await p.evaluate(()=>{window.__r=++RUN;window.__teams=[];window.__pr=PREVFN9.prev_vf(__r).catch(e=>String(e));
 setInterval(()=>{if(PT9.team){const n=PT9.team.n;if(!__teams.length||__teams[__teams.length-1].n!=n)__teams.push({n,t:Date.now(),bl:COL.bl,or:COL.or});}if(TAP)TAP(Math.random()<.6?1:0);},400);});
const got={};
for(let i=0;i<260&&Object.keys(got).length<2;i++){await sleep(500);const s=await p.evaluate(()=>{const k=PT9.team&&PT9.team.n;return k?{k,n:G.children.length,bl:COL.bl.toString(16),or:COL.or.toString(16)}:null;});
 if(s&&s.n>=4&&!got[s.k]){await sleep(1200);got[s.k]=s;await p.screenshot({path:`${OUT}/previa9_turno_${s.k.toLowerCase()}.jpg`,type:'jpeg',quality:86});console.log('captura',s.k,JSON.stringify(s));}}
check('turno azul con grafismos azules (#1269f4)',got.AZUL&&got.AZUL.bl=='1269f4',JSON.stringify(got.AZUL));
check('turno naranja con grafismos naranja (#fa8804 en el color principal)',got.NARANJA&&got.NARANJA.bl=='fa8804',JSON.stringify(got.NARANJA));
const tl=await p.evaluate(()=>__teams.map(t=>t.n));check('nunca los dos a la vez: se alternan AZUL→NARANJA',tl.join()=='AZUL,NARANJA',tl.join());
await p.evaluate(()=>{RUN++;});await sleep(500);
check('al terminar se restauran los colores',await p.evaluate(()=>COL.bl==0x2f5fe0&&COL.or==0xec7a16),await p.evaluate(()=>COL.bl.toString(16)));
console.log('errs',T.errs);await T.close();process.exit(0);
