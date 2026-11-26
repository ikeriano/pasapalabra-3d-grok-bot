// ===== v0.28 · LA PALABRA IMPOSIBLE (Telecinco ~2009, vídeo de Iker) — etapa 2007-2009 =====
// Panel de 8 palabras a la derecha; definiciones en orden; acierto = desaparece y sigue el mismo jugador;
// fallo/pasapalabra = turno al siguiente y la cadena SE REINICIA (vuelven las 8). Hay que sacar las 8 seguidas en 60 s.
// Premio por completarla: no visible en el vídeo → PROVISIONAL (+40 s al rosco).
(()=>{
const IMP28=[[['GATO','Felino doméstico que maúlla.'],['RELOJ','Marca las horas.'],['NUBE','De ella cae la lluvia.'],['PUENTE','Lo cruzas para pasar un río.'],['LIBRO','Tiene páginas y se lee.'],['FAROLA','Ilumina la calle por la noche.'],['ZAPATO','Calzado con suela y tacón.'],['ESPEJO','Te devuelve tu imagen.']],
 [['SOL','Estrella que nos da luz y calor.'],['TREN','Va por las vías.'],['QUESO','Se hace con leche cuajada.'],['GUITARRA','Instrumento de seis cuerdas.'],['ALMOHADA','Apoyas en ella la cabeza para dormir.'],['TIJERAS','Sirven para cortar papel.'],['PALOMA','Ave blanca símbolo de la paz.'],['ESCALERA','Tiene peldaños para subir.']]];
async function imposible09(rid){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;const bl=OPT.eq25!==1;const set=pick(IMP28);
 const F=bl?['#1a4fd0','#9fd4ff']:['#ff7a12','#ffd23a'];const pl=['Jugador 1','Jugador 2','Jugador 3'];let who=0;
 cut('host');hostSay('<b>La Palabra Imposible</b>: ocho palabras. Te leo las definiciones en orden: si aciertas, la palabra desaparece y sigues; si fallas o pasas, juega tu compañero y <b>la cadena vuelve a empezar</b>. Hay que decir las ocho seguidas en 60 segundos.');await wait(4.5,rid);
 cut('blue');let t=60,idx=0,tv=60;const shown=shuffle(set.map((x,i)=>i));const gone=new Set();
 const PW=230,PH=8*44+20,px=bl?GW/2-PW/2-40:-GW/2+PW/2+40;
 const panel=label(PW,PH,(g,cw,ch,k)=>{g.fillStyle='#fff';g.beginPath();g.roundRect(0,0,cw,ch,10*k);g.fill();g.fillStyle=F[1];g.beginPath();g.roundRect(4*k,4*k,cw-8*k,ch-8*k,8*k);g.fill();{const gr=g.createLinearGradient(0,0,cw,ch);gr.addColorStop(0,F[1]);gr.addColorStop(.45,F[0]);gr.addColorStop(1,F[0]);g.fillStyle=gr;}g.beginPath();g.roundRect(9*k,9*k,cw-18*k,ch-18*k,6*k);g.fill();g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=2*k;const e=16*k,m=14*k;[[m,m,1,1],[cw-m,m,-1,1],[m,ch-m,1,-1],[cw-m,ch-m,-1,-1]].forEach(([x,y,a,b])=>{g.beginPath();g.moveTo(x+a*e,y);g.lineTo(x,y);g.lineTo(x,y+b*e);g.stroke();});
  shown.forEach((wi,j)=>{if(!gone.has(wi))ftxt(g,set[wi][0],cw/2,(10+22+j*44)*k,24*k,'#fff','center',cw-30*k,0);});});
 panel.position.set(px,40,5);G.add(panel);
 const ck=label(110,110,(g,cw,ch)=>{g.fillStyle=F[0];g.fillRect(0,0,cw,ch);g.fillStyle='#fff';g.beginPath();g.arc(cw/2,ch/2,cw*.4,0,7);g.fill();ftxt(g,String(tv),cw/2,ch/2+3,ch*.42,bl?'#0b2f86':'#b84a00');});ck.position.set(px,40-PH/2-70,5);G.add(ck);
 const zones=[...Array(8)].map((_,j)=>{const z=new T.Mesh(new T.PlaneGeometry(PW-20,40),new T.MeshBasicMaterial({transparent:true,opacity:0}));z.position.set(px,40+PH/2-10-22-j*44,8);z.userData.tap=j;G.add(z);return z;});
 const askQ=()=>hostSay(`<b>${pl[who]}</b> · ${set[idx][1]}`);askQ();
 anim(dt=>{if(rid!==RUN||t<=0||idx>=8)return false;t-=dt;const v=Math.max(0,Math.ceil(t));if(v!==tv){tv=v;ck.set();}return true;});
 const reset=()=>{idx=0;gone.clear();who=(who+1)%3;panel.set();sfx('error');say(`¡La cadena vuelve a empezar! Juega <b>${pl[who]}</b>`);askQ();};
 setActs([{t:'Pasapalabra',ic:'➜',cb:()=>reset()}]);
 TAP=id=>{if(typeof id!=='number'||t<=0||idx>=8)return;const wi=shown[id];if(gone.has(wi))return;if(wi===idx){gone.add(wi);idx++;panel.set();sfx('ok');if(idx<8)askQ();}else reset();};
 await new Promise(r=>anim(()=>{if(t<=0||rid!==RUN||idx>=8){r();return false;}return true;}));chk(rid);TAP=null;setActs();
 const win=idx>=8;sfx(win?'winner':'j12_timeover');await wait(1,rid);clearG();const g=win?40:0;GAME.sec[0]+=g;GAME.ac[0]+=idx;
 await rotulo(win?'¡PALABRA IMPOSIBLE CONSEGUIDA! +40 s (provisional)':'NO SE COMPLETÓ · 0 s',bl?COL.bl:COL.or,rid);clearG();
 const cw=Math.random()<.3;if(cw)GAME.sec[1]+=40;await rotulo(`${bl?'NARANJA':'AZUL'}: ${cw?'¡CONSEGUIDA! +40 s':'NO LA COMPLETA'}`,bl?COL.or:COL.bl,rid);clearG();}
ETAPAS[2007].pr=ETAPAS[2007].pr.map(([k,f])=>k=='imposible'?[k,imposible09]:[k,f]);DBG.imposible09=imposible09;
})();
