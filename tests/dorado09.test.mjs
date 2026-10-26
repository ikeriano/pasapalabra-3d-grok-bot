// v0.9: final dorado. Mide k y capta el plató azul → dorado.
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_09/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;
await p.evaluate(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');SHOTS.scr9={p:V3(0,3.6,-1.5),l:V3(0,3.6,-11),f:38,dr:0};SHOTS.w9={p:V3(0,3.2,3),l:V3(0,3.4,-11),f:46,dr:0};setInterval(()=>cut(window.__sh||'scr9'),200);});
await sleep(1200);
await p.screenshot({path:OUT+'/dorado09_0_azul.jpg',type:'jpeg',quality:84});
await p.evaluate(()=>{gold9(true);});
const ks=[];for(let i=0;i<6;i++){await sleep(300);ks.push(await p.evaluate(()=>+GOLD9.k.toFixed(2)));}
console.log('k',ks.join(' '));
check('transición suave y creciente (sin saltos >0,3 por 300 ms)',ks.every((v,i)=>i==0||(v>=ks[i-1]&&v-ks[i-1]<=.3)));
await p.screenshot({path:OUT+'/dorado09_1_mitad.jpg',type:'jpeg',quality:84});
await sleep(1400);check('k llega a 1',(await p.evaluate(()=>GOLD9.k))==1);
await p.screenshot({path:OUT+'/dorado09_2_dorado_pantalla.jpg',type:'jpeg',quality:84});
await p.evaluate(()=>{window.__sh='wide';});await sleep(1800);
await p.screenshot({path:OUT+'/dorado09_3_dorado_plato.jpg',type:'jpeg',quality:84});
await p.evaluate(()=>{gold9(false);});await sleep(1800);
check('vuelve al azul',(await p.evaluate(()=>GOLD9.k))==0&&await p.evaluate(()=>!V9c.build()||true));
// flujo real: premio8
await p.evaluate(()=>{window.__sh=null;});
await p.evaluate(()=>{window.__pr=premio8(1,{amount:'1.542.000 €',title:'FRAN GONZÁLEZ',sub:'prueba',keep:true,noBoteVoz:true,noClip:true}).catch(e=>String(e));});
await sleep(3500);const kk=await p.evaluate(()=>GOLD9.k);check('al ganar el bote (premio8) el plató se vuelve dorado',kk>.99,'k='+kk);
await p.screenshot({path:OUT+'/dorado09_4_premio.jpg',type:'jpeg',quality:84});
console.log('errs',T.errs);await T.close();process.exit(check.fail?1:0);
