// ===== v0.28 · ¿DÓNDE ESTÁN? tal cual Telecinco 2018-2019 (prueba16.mp4) =====
(()=>{
const D18=[['CRUELLA',['PONGO','PERDITA','CRUELLA','DÁLMATA','HORACIO','GASPAR','ROGER','ANITA','NANNY']],['EGB',['ESTUCHE','PIZARRA','TIZA','RECREO','BABI','CARTERA','COMPÁS','REGLA','GOMA']],['FRUTAS',['PERA','UVA','KIWI','LIMÓN','MELÓN','PIÑA','FRESA','CEREZA','MANGO']],['COLORES',['ROJO','AZUL','VERDE','ROSA','GRIS','NEGRO','BLANCO','LILA','OCRE']]];
async function donde18(rid){prep();const bl=OPT.eq25!==1;const brd=bl?'#38d6ff':'#ff8a12';const sets=shuffle(D18.slice());const [th,ws0]=sets[0];const ws=shuffle(ws0.slice());
 cut('host');hostSay(`<b>¿Dónde Están?</b> Tema: <b>${th}</b>. Memoriza las nueve palabras: en unos segundos se tapan. Yo digo una palabra y tú dices el número. Si fallas, se tapa todo el panel y sigue tu compañero. ¡Hay que sacar las nueve seguidas!`);await wait(4.2,rid);
 cut('blue');const st={t:75};let tv=75;const open=new Set();let state={};
 const box=i=>{const L=label(170,70,(g,cw,ch,k)=>{const s=state[i]||'n';g.fillStyle=brd;g.beginPath();g.roundRect(0,0,cw,ch,10*k);g.fill();g.fillStyle=s=='r'?'#c81818':'#0b1f6a';g.beginPath();g.roundRect(7*k,7*k,cw-14*k,ch-14*k,6*k);g.fill();ftxt(g,s=='n'?String(i+1):ws[i],cw/2,ch/2+2*k,(s=='n'?36:24)*k,'#ffe23a','center',cw-24*k,0);});L.position.set((i%3-1)*185,150-Math.floor(i/3)*82,5);L.userData.tap=i;G.add(L);return L;};
 ws.forEach((w,i)=>state[i]='w');const B=ws.map((w,i)=>box(i));
 const TM=label(100,100,(g,cw,ch)=>{g.fillStyle='#fff';g.beginPath();g.arc(cw/2,ch/2,cw/2-2,0,7);g.fill();g.fillStyle=bl?'#1a78f0':'#ff8a12';g.beginPath();g.arc(cw/2,ch/2,cw/2-9,0,7);g.fill();ftxt(g,String(tv),cw/2,ch/2+3,ch*.42,'#fff');});TM.position.set(0,-120,10);G.add(TM);
 const flip=async(i,s)=>{await tween(.15,e=>B[i].scale.x=1-e);state[i]=s;B[i].set();await tween(.15,e=>B[i].scale.x=Math.max(.01,e));};
 await wait(3.6,rid);for(let i=0;i<9;i++)flip(i,'n');sfx('splash');await wait(.4,rid);
 anim(dt=>{if(rid!==RUN||st.t<=0||open.size>=9)return false;st.t-=dt;const v=Math.max(0,Math.ceil(st.t));if(v!==tv){tv=v;TM.set();}return true;});
 const players=['Jugador 1','Jugador 2','Jugador 3'];let who=0,order=shuffle([...Array(9).keys()]),qi=0;
 const askQ=()=>{while(open.has(order[qi%9]))qi++;hostSay(`<b>${players[who]}</b>: ¿dónde está <b>${ws[order[qi%9]]}</b>?`);};askQ();let busy=false;
 TAP=async id=>{if(typeof id!=='number'||busy||open.has(id)||st.t<=0)return;busy=true;const tgt=order[qi%9];
  if(id===tgt){await flip(id,'w');open.add(id);sfx('ok');qi++;if(open.size<9)askQ();}
  else{await flip(id,'r');sfx('error');await wait(.7,rid);await Promise.all([...open,id].map(i=>flip(i,'n')));open.clear();who=(who+1)%3;order=shuffle([...Array(9).keys()]);qi=0;askQ();}busy=false;};
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN||open.size>=9){r();return false;}return true;}));chk(rid);TAP=null;
 const win=open.size>=9;sfx(win?'winner':'j12_timeover');await wait(1.2,rid);clearG();const g=win?Math.max(0,tv):0;GAME.sec[0]+=g;GAME.ac[0]+=open.size;
 await rotulo(win?`¡LAS NUEVE! +${g} s`:'NO SE COMPLETÓ EL PANEL · 0 s',bl?COL.bl:COL.or,rid);clearG();
 const cw=Math.random()<.45,cg=cw?Math.round(rnd(5,30)):0;GAME.sec[1]+=cg;await rotulo(`${bl?'NARANJA':'AZUL'}: ${cw?'¡LAS NUEVE! +'+cg+' s':'0 s'}`,bl?COL.or:COL.bl,rid);clearG();}
ETAPAS[2019].pr=ETAPAS[2019].pr.map(([k,f])=>k=='donde'?[k,donde18]:[k,f]);DBG.donde18=donde18;
})();
