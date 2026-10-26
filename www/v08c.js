'use strict';
// ======================================================================
//  v0.8 — CABECERAS DE LAS PRUEBAS: la música suena ENTERA
//  Antes: el efecto de sonido de la cortinilla se disparaba una vez con sfx() y la
//  animación (5 s) podía terminar antes que la música, o la música no sonar.
//  Ahora: cada cabecera se reproduce de principio a fin (audio HTML precargado) y
//  el programa no avanza hasta que la música termina, con el plano estable del plató.
//  2019: audio REAL de las cabeceras de Telecinco (cortes de los vídeos de referencia
//  de Iker, recortados sin voz del presentador); 2007-2017: sus cortinillas reales.
// ======================================================================
(function(){
const H19={pista:['h19_pista.ogg',5],u4:['h19_u4.ogg',9],sopa:['h19_sopa.ogg',4],donde:['h19_donde.ogg',9],rosco:['h19_rosco.ogg',4]};
const GEN={2007:['cortinilla.ogg',6.5],2011:['cort2011.ogg',5.5],2014:['cort2014.ogg',5.5],2017:['cort2017.ogg',5.5],2019:['cort2019.ogg',5]};
const PRE=[];for(const k in H19)PRE.push(H19[k][0]);for(const k in GEN)PRE.push(GEN[k][0]);
setTimeout(()=>PRE.forEach(f=>{try{const a=new Audio('snd/'+f);a.preload='auto';a.load();}catch(e){}}),1500);
const _pc=playCort,_sfx=sfx;
playCort=async function(id,rid){
 const y=OPT.etapa,spec=(y==2019&&H19[id])||GEN[y];if(!spec||(!CORT[id]&&!CORT[id+'B'])||(id=='rosco'&&OPT.final=='alaz'))return _pc(id,rid);
 let skipped=false;sfx=function(n){if(!skipped&&/^cort/.test(n)){skipped=true;return;}return _sfx.apply(this,arguments);};
 const t0=performance.now();let a=null;
 try{a=playClip8(spec[0],1);}catch(e){}
 try{await _pc(id,rid);}finally{sfx=_sfx;}
 // la animación acaba antes que la música: plano estable del plató hasta que la música termine
 const dur=a&&isFinite(a.duration)&&a.duration>0?a.duration:spec[1];
 const rest=dur-(performance.now()-t0)/1e3;
 if(rest>.05&&a){cut('wide');await wait(rest+.05,rid);}
 stopClip8();};
window.V8c={H19,GEN};
})();
