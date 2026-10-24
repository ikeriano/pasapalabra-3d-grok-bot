// ======================================================================
//  v0.7 — estilo TV en todas las pruebas, sintonías reales en la Pista Musical,
//  rótulos de los especiales visibles, «−5 s» junto al reloj de A la Z.
// ======================================================================
window.V7={inRos:false};
// reloj naranja TV en todas las pruebas (el rosco conserva el suyo)
{const _t=timer;timer=function(col){return V7.inRos?_t(col):tvTimer();};
 const _rg=roscoGraf;roscoGraf=function(){V7.inRos=true;try{return _rg.apply(this,arguments);}finally{V7.inRos=false;}};}
// las pastillas moradas de 2007 pasan a naranja TV
{const _b=bar;bar=function(w,h,col,txt,o){if(col===COL.pu)col=COL.or;return _b(w,h,col,txt,o);};}
// Sopa de Letras: vuelve a la versión 3D (sin la pantalla completa de v0.4)
/*SOPA*/
// ¿Dónde Están?: rejilla verde 3x3 como en la tele
{let s=dondeEstan.toString();s=s.replace("bar(160,52,COL.bl,w,{fs:24,r:26})","bar(160,52,COL.gr,w,{fs:24,r:26})");(0,eval)('dondeEstan='+s);}
for(const y in ETAPAS)ETAPAS[y].pr.forEach(p=>{if(p[0]=='sopa')p[1]=sopaTV;if(p[0]=='donde')p[1]=dondeEstan;});
// La Silla Azul: rótulo TV y dos letras grandes
{const _s=sillaAzul;sillaAzul=async function(rid){const hd=bar(520,54,COL.bl,'LA SILLA AZUL',{fs:28});hd.position.set(0,300,0);
 const _sa=setActs;let tiles=[];const clr=()=>{tiles.forEach(t=>G.remove(t));tiles=[];};
 setActs=function(a){clr();if(!hd.parent)G.add(hd);if(a&&a.length==2&&a.every(x=>/^Letra /.test(x.t))){a.forEach((x,i)=>{const L=x.t.slice(6);const b=bar(150,150,COL.gr,L,{fs:96,r:30});b.position.set(-100+i*200,60,0);b.userData.tap=i;G.add(b);tiles.push(b);});TAP=i=>{if(i===null||!a[i])return;TAP=null;clr();a[i].cb();};}
  return _sa.apply(this,arguments);};
 try{return await _s(rid);}finally{setActs=_sa;clr();G.remove(hd);}};
 window.DBG&&(DBG.sillaAzul=sillaAzul);
 for(const y in ETAPAS)ETAPAS[y].pr.forEach(p=>{if(p[0]=='silla')p[1]=sillaAzul;});}
// rótulo del especial: en la parte alta de la pantalla gigante (ya no queda tapado por la mesa)
{const _a=TH6.apply;TH6.apply=function(id){const t=_a(id);if(t&&TH6.sv&&P.scr){const w=new T.Vector3();P.scr.getWorldPosition(w);TH6.sv.add.forEach(([p,o])=>{if(o.isMesh&&o.geometry&&o.geometry.parameters&&o.geometry.parameters.width==10){o.position.set(w.x,w.y+2.15,w.z+.08);o.scale.setScalar(.92);o.renderOrder=5;}});}return t;};}
// La Pista Musical: sintonías reales de programas de televisión
{const rep={federico:['saberyganar','Saber y ganar','Es un concurso de La 2 de preguntas de cultura general que lleva muchísimos años en antena.','Conocer y vencer'],
 karasevda:['hormiguero','El Hormiguero','Es un programa de entrevistas y experimentos presentado por Pablo Motos con dos hormigas, Trancas y Barrancas.','La casa de las hormigas']};
 for(let i=0;i<PM5.length;i++){const r=rep[PM5[i][0]];if(r)PM5[i]=r;}}

// intro de cada tema/especial (antes del bote) y frase de presentación para pruebas sin clip de Christian
{const _bt=bote;let last=-1;bote=async function(rid,x){const T=V5.tema();if(x===false&&last!==rid&&T&&T.intro&&T.intro.length&&rid===RUN){last=rid;const sh=['host','wide','front'];for(let i=0;i<T.intro.length;i++){cut(sh[i%3]);hostSay(T.intro[i]);await wait(2.4,rid);}say();cut('wide');hostSay('Y en el bote hoy hay…');}return _bt.apply(this,arguments);};}
{const _vz=voz;voz=async function(k,rid){const r=await _vz(k,rid);if(r||!/_pre$/.test(k)||(window.V6&&V6.inEsp))return r;const id=k.slice(0,-4);const E=ETAPAS[OPT.etapa];if(E&&E.lines&&E.lines[id])return r;
 const c=CORT[id];cut('host');hostSay('Vamos con la siguiente prueba: <b>'+(c?c.title.join(' '):id)+'</b>.');await wait(2.2,rid);say();return true;};}

// cortinillas sin animación propia (Silla Azul, Con nueve basta, Palabras dibujadas): nube de letras que cae
{const mkW=w=>(AW,blue)=>{const it=[];const s=w.replace(/ /g,'');for(let r=0;r<7;r++)for(let i=0;i<14;i++)it.push({ch:s[(i+r*3)%s.length],base:new T.Vector3(-AW*.5+i*AW/13,-260+r*90,-40+(i%3)*30),p:new T.Vector3(),s:r==3?70:34,r:rnd(-.3,.3),c:0xffffff,row:r,d:(i+r)*.03});
  const art=letterCloud(it,{op:.85});art.anim=t=>{art.items.forEach(x=>{const k=Math.min(1,Math.max(0,(t-x.d)*1.4));x.p.set(x.base.x,x.base.y+(1-eout(k))*600,x.base.z);});art.upd();};return art;};
 for(const [id,w] of [['silla','SILLAAZUL'],['connueve','CONNUEVEBASTA'],['dibujadas','PALABRASDIBUJADAS']])if(CORT[id]&&!CORT[id].mk)CORT[id].mk=mkW(w);}
Object.assign(window.DBG||{},{sopaTV,dondeEstan});
$('#ver').textContent='v0.7';
