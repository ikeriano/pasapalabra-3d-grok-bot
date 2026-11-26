// v0.30 · Decoración de ediciones especiales en TODAS las cabeceras (Telecinco 2007-2019, Antena 3 2020/2023/2026 y en familia).
// Se dibuja en la capa de grafismo (GS) a los lados de la pantalla mientras suena la cabecera; la cabecera normal no cambia. 🆕 INVENTADO
(function(){
const XM=/navidad|findeano|reyes|nochebuena|mayores/;
function build(){const tema=OPT.tema||'';if(!tema||tema=='normal')return null;const g=new T.Group();const parts=[];
 const xs=[-(GW/2-170),GW/2-170];
 if(XM.test(tema)&&window.EstudioNavidad){xs.forEach((x,i)=>{const tg=new T.Group();EstudioNavidad.add(T,tg,{x:0,y:0,z:0,escala:70,regalos:6,seed:i?9:3});tg.position.set(x*0.82,-300,0);g.add(tg);parts.push(['x',tg]);});}
 else if(window.DECO30&&DECO30.special(tema)){xs.forEach((x,i)=>{const c=DECO30.cluster(tema,62,i?1:-1);c.position.set(x,-350,-150);g.add(c);parts.push(['d',c]);});}
 else return null;
 GS.add(g);return {g,parts};}
function wrap(){const _c=cabecera;cabecera=async function(rid){
 const own=OPT.cab30&&[2000,2002,2006].includes(+OPT.a3)&&window.CAB2000_30; // la cabecera 2000 ya trae su decoración
 const D=own?null:build();let t0=performance.now(),run=true;
 if(D){(function tk(){if(!run)return;if(!D.g.parent)GS.add(D.g);const t=(performance.now()-t0)/1000;D.parts.forEach(([k,o])=>{try{if(k=='x')EstudioNavidad.tickAll(o);else DECO30.tick(o,t);}catch(e){}});requestAnimationFrame(tk);})();}
 try{return await _c.apply(this,arguments);}finally{run=false;if(D){D.parts.forEach(([k,o])=>{try{if(k=='x')EstudioNavidad.free(o);else DECO30.free(o);}catch(e){}});GS.remove(D.g);}}};}
wrap();
window.DECOCAB30={build};
})();
