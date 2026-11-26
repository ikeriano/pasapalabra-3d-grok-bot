// ===== v0.28 · PALABRAS CRUZADAS tal cual Telecinco (prueba12.mp4) =====
// Panel: 9 fragmentos a la izquierda (bola a la derecha) y 9 a la derecha (bola a la izquierda) en el color del equipo;
// abajo, número grande del reloj + barra de definición. Acierto: las dos bolas en verde y las pastillas desaparecen (queda la bola).
const CRUZ28=[
 {t:'Superhéroes',real:1,w:[['DARE','DEVIL','Superhéroe ciego de Marvel, «el hombre sin miedo».'],['LO','BEZNO','Miembro de los X-Men encarnado por Hugh Jackman.'],['SU','PERMAN','Superhombre interpretado por Christopher Reeve.'],['SPI','DERMAN','Hombre araña al que dio vida Tobey Maguire.'],['CAT','WOMAN','Mujer gato a la que puso rostro Michelle Pfeiffer.'],['BAT','MAN','Caballero oscuro al que dio vida Christian Bale.'],['TOR','MENTA','Superheroína de los X-Men que controla el clima.'],['AMÉ','RICA','Continente que da nombre al capitán encarnado por Chris Evans.'],['VER','DE','Color característico de Hulk, al que Eric Bana dio vida en 2003.']]},
 {t:'Sting',real:1,w:[['SUM','NER','Apellido real de Sting: Gordon Matthew…'],['BA','JO','Instrumento que toca Sting en sus conciertos.'],['DU','NE','Película de David Lynch en la que actuó Sting.'],['HIN','DUISMO','Religión por la que Sting declaró un gran interés.'],['SPRING','STEEN','Bruce, «el Boss», con quien Sting compartió gira por los derechos humanos.'],['SIMP','SON','Familia amarilla en cuya serie apareció Sting.'],['CASTE','LLANO','Idioma en el que Sting grabó «Fragilidad».'],['PO','LICE','Grupo que lideró Sting antes de su carrera en solitario.'],['ROX','ANNE','Canción de The Police dedicada a una mujer de la calle.']]},
 {t:'Cocina 🆕',w:[['SAR','TÉN','Utensilio con mango para freír.'],['CU','CHARA','Cubierto con el que se toma la sopa.'],['TENE','DOR','Cubierto con púas.'],['CACE','ROLA','Recipiente para guisar, más bajo que la olla.'],['ESPU','MADERA','Utensilio con agujeros para sacar fritos.'],['HOR','NO','Aparato donde se asa el pollo.'],['BAT','IDORA','Aparato para montar nata.'],['RA','LLADOR','Utensilio para desmenuzar el queso.'],['EMBU','DO','Cono para pasar líquidos a una botella.']]},
 {t:'Animales 🆕',w:[['ELE','FANTE','El mamífero terrestre más grande.'],['COCO','DRILO','Reptil enorme de los ríos africanos.'],['CANG','URO','Marsupial que salta.'],['MARI','POSA','Insecto de alas de colores.'],['PIN','GÜINO','Ave que no vuela y vive en el hielo.'],['DEL','FÍN','Cetáceo muy inteligente que hace piruetas.'],['TORT','UGA','Reptil que lleva su casa a cuestas.'],['MUR','CIÉLAGO','Mamífero volador que cuelga cabeza abajo.'],['ARDI','LLA','Roedor de cola peluda que come nueces.']]}];
const C28={bl:['#3b8cff','#0d3fc4','#7fd0ff'],or:['#ffb43a','#e86a00','#ffd27a']};
function pill28(txt,pal,side){const g=new T.Group();const L=label(150,30,(c,cw,ch,k)=>{if(g.gone)return;const r=ch/2,x0=side=='L'?2*k:24*k,w=cw-26*k;c.fillStyle='#fff';c.beginPath();c.roundRect(x0-2*k,1*k,w+4*k,ch-2*k,5*k);c.fill();const gr=c.createLinearGradient(0,0,0,ch);gr.addColorStop(0,pal[0]);gr.addColorStop(1,pal[1]);c.fillStyle=gr;c.beginPath();c.roundRect(x0,3*k,w,ch-6*k,4*k);c.fill();ftxt(c,txt,x0+w/2,ch/2+1*k,ch*.5,'#fff','center',w-8*k,0);});
 let B;B=label(30,30,(c,cw,ch)=>{const gr=c.createRadialGradient(cw*.38,ch*.35,1,cw/2,ch/2,cw/2);const col=g&&g.ball||pal;gr.addColorStop(0,'#fff');gr.addColorStop(.3,col[2]);gr.addColorStop(1,col[1]);c.fillStyle=gr;c.beginPath();c.arc(cw/2,ch/2,cw/2-1,0,7);c.fill();});
 L.position.set(side=='L'?-14:14,0,0);B.position.set(side=='L'?62:-62,0,2);g.add(L,B);g.L=L;g.B=B;
 g.setBall=col=>{g.ball=col;B.set();};g.hide=()=>{g.gone=1;L.visible=false;};return g;}
function board28(set,pal){const L=shuffle(set.w.map((x,i)=>[x[0],i])),R=shuffle(set.w.map((x,i)=>[x[1],i]));const ox=GW/2-110;
 const lp=L.map(([s,i],j)=>{const p=pill28(s,pal,'L');p.i=i;p.position.set(-ox,250-j*36,0);p.userData.tap='L'+j;G.add(p);return p;});
 const rp=R.map(([s,i],j)=>{const p=pill28(s,pal,'R');p.i=i;p.position.set(ox,250-j*36,0);p.userData.tap='R'+j;G.add(p);return p;});
 const tw=Math.min(GW*.66,720);let Q='',TV='';const df=label(tw,62,(c,cw,ch,k)=>{c.fillStyle='#fff';c.beginPath();c.roundRect(2,2,cw-4,ch-4,ch/2);c.fill();const gr=c.createLinearGradient(0,0,0,ch);gr.addColorStop(0,pal[0]);gr.addColorStop(1,pal[1]);c.fillStyle=gr;c.beginPath();c.roundRect(5*k,5*k,cw-10*k,ch-10*k,ch/2-5*k);c.fill();wrap(c,Q,cw/2,ch/2,cw-60*k,20*k);});
 df.position.set(40,-282,10);G.add(df);
 const tm=label(110,80,(c,cw,ch)=>{c.font=`italic 900 ${ch*.92}px N,Arial`;c.textAlign='center';c.textBaseline='middle';c.lineWidth=ch*.08;c.strokeStyle='#fff';c.strokeText(String(TV),cw/2,ch/2+3);c.fillStyle=pal[0];c.fillText(String(TV),cw/2,ch/2+3);});
 tm.position.set(-tw/2-30,-282,12);G.add(tm);tm.setV=v=>{if(v!==TV){TV=v;tm.set();}};
 // entrada: bolas primero y pastillas que crecen (como en el vídeo, ~1 s)
 [...lp,...rp].forEach((p,n)=>{p.L.scale.x=.01;p.B.scale.setScalar(.01);});
 tween(1.1,e=>[...lp,...rp].forEach((p,n)=>{const f=Math.max(0,Math.min(1,e*1.6-(n%9)*.06));p.B.scale.setScalar(Math.min(1,f*2)||.01);p.L.scale.x=Math.max(.01,f);}),eout);
 return {lp,rp,df,tm,setQ:q=>{Q=q.toUpperCase();df.set();}};}
async function cruz28turn(rid,set,pal,cpu,t0){const B=board28(set,pal);const st={t:t0};let ac=0,cur=0,sel=null;const done=new Set();
 const next=()=>{for(let k=0;k<9;k++){const c=(cur+k)%9;if(!done.has(c)){cur=c;B.setQ(set.w[c][2]);return true;}}return false;};
 const hit=async i=>{const a=B.lp.find(p=>p.i===i),b=B.rp.find(p=>p.i===i);[a,b].forEach(p=>p.setBall(['#7dff6a','#1d9a1d','#c8ffb8']));sfx('ok');done.add(i);ac++;say(`¡<b>${set.w[i][0]}${set.w[i][1]}</b>!`);await wait(.55,rid);[a,b].forEach(p=>{p.hide();p.setBall(null);});};
 next();B.tm.setV(t0);await wait(1.2,rid);
 anim(dt=>{if(rid!==RUN||st.t<=0||done.size>=9)return false;st.t-=dt;B.tm.setV(Math.max(0,Math.ceil(st.t)));return true;});
 if(cpu){while(st.t>0&&done.size<9){await wait(rnd(2.2,4.2),rid);if(st.t<=0)break;if(Math.random()<.68){await hit(cur);}else{sfx('error');}cur=(cur+1)%9;next();}}
 else{let busy=false;
  setActs([{t:'Pasapalabra',ic:'➜',cb:()=>{sel&&sel.p.setBall(null);sel=null;cur=(cur+1)%9;next();sfx('ok');}}]);
  TAP=async id=>{if(!id||busy||typeof id!='string')return;const side=id[0],j=+id.slice(1);const p=(side=='L'?B.lp:B.rp)[j];if(!p||p.gone)return;
   if(!sel||sel.side==side){sel&&sel.p.setBall(null);sel={side,p};p.setBall(['#fff7a0','#d9a400','#fff3b0']);return;}
   const a=sel.p;sel=null;busy=true;if(a.i===cur&&p.i===cur){await hit(cur);next();}else{a.setBall(['#ff8a8a','#b01010','#ffb0b0']);p.setBall(['#ff8a8a','#b01010','#ffb0b0']);sfx('error');await wait(.6);a.setBall(null);p.setBall(null);cur=(cur+1)%9;next();}busy=false;};}
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN||done.size>=9){r();return false;}return true;}));chk(rid);TAP=null;setActs();
 set.w.forEach((x,i)=>{if(!done.has(i)){B.lp.find(p=>p.i===i).setBall(['#ff8a8a','#b01010','#ffb0b0']);}});await wait(1.4,rid);clearG();return ac;}
async function cruz28(rid){prep();const sets=shuffle(CRUZ28.slice());const bl=OPT.eq25!==1;
 cut('host');hostSay('<b>Palabras Cruzadas</b>: nueve definiciones. Une un trozo de la izquierda con otro de la derecha para formar la palabra. Si no la sabes, <b>pasapalabra</b> y vuelve luego. Tiempo compartido por la pareja.');await wait(3.6,rid);
 cut({p:V3(1.6,1.75,-.6),l:V3(4.6,1.5,.9),f:30,dr:.04});
 const me=await cruz28turn(rid,sets[0],bl?C28.bl:C28.or,false,80);GAME.sec[0]+=me*5;GAME.ac[0]+=me;await rotulo(`${bl?'AZUL':'NARANJA'}: ${me} DE 9 · +${me*5} s`,bl?COL.bl:COL.or,rid);clearG();
 const cp=await cruz28turn(rid,sets[1],bl?C28.or:C28.bl,true,80);GAME.sec[1]+=cp*5;GAME.ac[1]+=cp;await rotulo(`${bl?'NARANJA':'AZUL'}: ${cp} DE 9 · +${cp*5} s`,bl?COL.or:COL.bl,rid);clearG();}
for(const y of [2011])ETAPAS[y].pr=ETAPAS[y].pr.map(([k,f])=>k=='cruzadas'?[k,cruz28]:[k,f]);
DBG.cruz28=cruz28;
