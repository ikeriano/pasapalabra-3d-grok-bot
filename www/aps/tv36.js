/* tv36.js · Pasapalabra 3D v0.36 · Tele de AntenaPlayStation con programas 2D dibujados y voces (Piper es_ES).
   Todo el contenido de este archivo es 🆕 INVENTADO. Audio: fragmentos cortos aps/voz36/*.ogg que se combinan en tiempo de ejecución. */
(function(){if(!window.AntenaPS||!window.TV36)return;const D=TV36,INV='🆕 INVENTADO',VZ='aps/voz36/';
const P=(h,t,k,o={})=>Object.assign({h,t,k,inv:1},o);
// ---------- nuevos canales y parrilla completa (24 h)
function rep(list){const g=[];for(let m=0;m<1440;m+=30){const it=list[(m/30)%list.length];g.push(P(String(m/60|0).padStart(2,'0')+':'+String(m%60).padStart(2,'0'),it[0],it[1],it[2]||{}));}return g;}
const N24=[['APS 24h · Última hora','news'],['APS 24h · Deportes y El tiempo','news',{sub:'dep'}],['APS 24h · Resumen','news'],['APS 24h · Edición regional','news']];
const DIV=[['Las Letras Locas','series',{ep:'«La A y la Z cambian de sitio»'}],['Aquí no hay quien gane','series',{ep:'«La junta de vecinos»'}],['Los del plató','series',{ep:'«El pulsador del pato»'}],['Aquí no hay quien gane','series',{ep:'«Lucía va a Pasapalabra»'}],['Los del plató','series',{ep:'«El rosco tostado»'}],['Las Letras Locas','series',{ep:'«La A y la Z cambian de sitio» (rep.)'}]];
const CIN=[];for(let h=0;h<24;h+=2)CIN.push(P(String(h).padStart(2,'0')+':00',h%4?'Cine: Pasapalabra y El Rosco maldito':'Cine: El concurso del siglo','film',{syn:h%4?'Un rosco antiguo aparece en un plató abandonado.':'Una familia entera se presenta a un concurso de la tele.'}));
const CON=[P('00:00','Pasapalabra (repetición)','game',{inv:0,logo:'pasapalabra',rec:[2,3,4,5,6]}),P('03:00','Minutos musicales','music'),P('07:00','Pasapalabra · Clásicos','game',{inv:0,logo:'pasapalabra',rec:[2,3,4,5,6,7,8]}),P('11:00','APS Concursos · Resumen','news',{sub:'dep'}),P('14:00','Pasapalabra · Especial','game',{inv:0,logo:'pasapalabra',rec:[0,1,9,10,11]}),P('17:00','Aquí no hay quien gane','series',{ep:'«Lucía va a Pasapalabra»'}),P('18:00','Pasapalabra','game',{inv:0,logo:'pasapalabra',rec:[0,1,9,10,11,12,13,14,15,16,17,18]}),P('20:00','Los del plató','series',{ep:'«El pulsador del pato»'}),P('21:00','Pasapalabra (repetición)','game',{inv:0,logo:'pasapalabra',rec:[2,3,4,5,6]})];
[{id:'aps24',name:'APS 24h 🆕',logo:'logos/canal36_aps24.png',inv:1,grid:{lab:rep(N24)}},{id:'apsdiver',name:'APS Diver 🆕',logo:'logos/canal36_apsdiver.png',inv:1,grid:{lab:rep(DIV)}},
 {id:'apscine',name:'APS Cine 🆕',logo:'logos/canal36_apscine.png',inv:1,grid:{lab:CIN}},{id:'apsconc',name:'APS Concursos 🆕',logo:'logos/canal36_apsconc.png',inv:1,grid:{lab:CON}}].forEach(c=>{if(!AntenaPS.channels.some(x=>x.id==c.id))AntenaPS.addChannel(c);});
// ---------- reproductor de fragmentos
let RUN=0,AU=null;
function sayF(id,txt,run){return new Promise(res=>{if(run!==RUN)return res();let done=false;const fin=()=>{if(done)return;done=true;clearTimeout(t);res();};
 const t=setTimeout(fin,Math.max(2500,txt.length*75)+1500);try{AU&&AU.pause();AU=new Audio(VZ+id+'.ogg');AU.volume=(window.OPT&&OPT.vol!=null)?Math.min(1,OPT.vol):1;AU.onended=()=>setTimeout(fin,350);AU.onerror=()=>{};const pr=AU.play();pr&&pr.catch(()=>{});}catch(e){}});}
const W=ms=>new Promise(r=>setTimeout(r,ms));
// ---------- dibujo 2D
function person(g,x,y,s,col,skin,hair,talk,t,hairStyle){g.save();g.translate(x,y);g.scale(s,s);const bob=talk?Math.sin(t*9)*1.5:0;
 g.fillStyle=col;g.beginPath();g.moveTo(-34,90);g.quadraticCurveTo(-36,20,0,18);g.quadraticCurveTo(36,20,34,90);g.fill();
 g.fillStyle=skin;g.beginPath();g.arc(0,-10+bob,26,0,7);g.fill();g.fillStyle=hair;g.beginPath();g.arc(0,-18+bob,27,Math.PI,0);g.fill();if(hairStyle)g.fillRect(-27,-18+bob,9,34),g.fillRect(18,-18+bob,9,34);
 g.fillStyle='#222';g.beginPath();g.arc(-9,-12+bob,3,0,7);g.arc(9,-12+bob,3,0,7);g.fill();
 const mo=talk?Math.abs(Math.sin(t*14))*7+1:1.5;g.fillStyle='#7a2020';g.beginPath();g.ellipse(0,4+bob,7,mo,0,0,7);g.fill();g.restore();}
function letterChar(g,x,y,s,L,col,talk,t){g.save();g.translate(x,y+Math.sin(t*3+x)*6);g.scale(s,s);g.fillStyle=col;g.strokeStyle='#fff';g.lineWidth=6;g.beginPath();g.roundRect(-55,-60,110,120,22);g.fill();g.stroke();
 g.fillStyle='#fff';g.font='900 80px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(L,0,4);g.fillStyle='#fff';g.beginPath();g.arc(-20,-38,11,0,7);g.arc(20,-38,11,0,7);g.fill();g.fillStyle='#111';g.beginPath();g.arc(-20,-37,5,0,7);g.arc(20,-37,5,0,7);g.fill();
 const mo=talk?Math.abs(Math.sin(t*14))*9+2:2;g.fillStyle='#600';g.beginPath();g.ellipse(0,46,14,mo,0,0,7);g.fill();g.restore();}
function bigIcon(g,ic,x,y,sz){g.font=sz+'px "Noto Color Emoji",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(ic,x,y);}
// ---------- escenas
function mount(sc,kind){sc.innerHTML=`<div class="tv36" style="position:absolute;inset:0;background:#000"><canvas width="960" height="540" style="width:100%;height:100%;display:block"></canvas>
<div class="t36r" style="position:absolute;left:4%;bottom:15%;max-width:70%;display:none;background:linear-gradient(90deg,#c8102e,#e8343f);color:#fff;font:900 3.2vmin/1.15 Arial;padding:.8vmin 2vmin;border-left:1.2vmin solid #fff;box-shadow:0 .5vmin 1.5vmin #0008"></div>
<div class="t36s" style="position:absolute;left:8%;right:8%;bottom:3%;text-align:center;color:#fff;font:700 3vmin/1.25 Arial;text-shadow:0 0 .6vmin #000,0 0 .6vmin #000"></div>
<div style="position:absolute;right:2%;top:12%;background:#ffcc00;color:#000;font:900 2vmin Arial;padding:.4vmin 1vmin;border-radius:.6vmin">${INV}</div></div>`;
 const c=sc.querySelector('canvas');return{root:sc.querySelector('.tv36'),c,g:c.getContext('2d'),r:sc.querySelector('.t36r'),s:sc.querySelector('.t36s'),st:{}};}
function loop(M,run,draw){let last=0;const f=ts=>{if(run!==RUN||!M.root.isConnected)return;requestAnimationFrame(f);if(ts-last<50)return;last=ts;draw(M.g,ts/1000,M.st);};requestAnimationFrame(f);}
const SKIN=['#f1c7a3','#d9a47c','#f5d2b8'];
function drawNews(g,t,st){const gr=g.createLinearGradient(0,0,0,540);gr.addColorStop(0,'#0a1f5c');gr.addColorStop(1,'#123d9c');g.fillStyle=gr;g.fillRect(0,0,960,540);
 g.strokeStyle='rgba(120,190,255,.18)';g.lineWidth=2;for(let x=-200+(t*20)%80;x<960;x+=80){g.beginPath();g.moveTo(x,0);g.lineTo(x+200,540);g.stroke();}
 g.fillStyle='#061238';g.fillRect(560,70,340,220);g.strokeStyle='#5fb6ff';g.lineWidth=4;g.strokeRect(560,70,340,220);g.fillStyle='#0d2a72';g.fillRect(566,76,328,208);if(st.ic)bigIcon(g,st.ic,730,180,130);
 g.fillStyle='#fff';g.font='900 26px Arial';g.textAlign='left';g.fillText(st.prog||'APS NOTICIAS',30,96);
 if(st.dep){person(g,300,300,1.5,'#1d6e2e',SKIN[1],'#222',st.sp=='dep',t);}
 else if(st.tiempo){g.fillStyle='#2f8a3a';g.beginPath();g.ellipse(330,300,230,150,0,0,7);g.fill();[['☀️',230,250],['🌧️',360,200],['🌬️',430,330],['🌡️',270,360]].forEach(a=>bigIcon(g,a[0],a[1],a[2],56));person(g,700,380,1.3,'#7a2d8f',SKIN[2],'#5a3a1a',st.sp=='m1',t,1);}
 else{person(g,190,300,1.35,'#b8143a',SKIN[0],'#6b3b1b',st.sp=='ana',t,1);person(g,420,300,1.35,'#20304f',SKIN[1],'#2a1a10',st.sp=='luis',t);}
 g.fillStyle='#e9eef7';g.beginPath();g.moveTo(60,420);g.lineTo(560,420);g.lineTo(530,540);g.lineTo(90,540);g.fill();g.fillStyle='#c8102e';g.fillRect(60,420,500,14);g.fillStyle='#0a1f5c';g.font='900 30px Arial';g.textAlign='center';g.fillText('APS',310,490);
 g.fillStyle='#c8102e';g.fillRect(0,512,960,28);g.fillStyle='#fff';g.font='700 18px Arial';g.textAlign='left';const tk=(st.tk||'')+'   ';g.fillText(tk+tk,960-((t*90)%(g.measureText(tk).width+960)),532);}
function drawSeries(g,t,st){const k=st.key||'';if(k.startsWith('kids')){const gr=g.createLinearGradient(0,0,0,540);gr.addColorStop(0,'#7fd6ff');gr.addColorStop(1,'#c8f7b0');g.fillStyle=gr;g.fillRect(0,0,960,540);
  g.fillStyle='#ffe066';g.beginPath();g.arc(820,90,50,0,7);g.fill();g.fillStyle='#4caf50';g.fillRect(0,430,960,110);for(let i=0;i<6;i++){g.fillStyle='#fff';g.beginPath();g.arc((i*190+t*25)%1100-80,70+i%2*40,30,0,7);g.arc((i*190+t*25)%1100-50,70+i%2*40,38,0,7);g.fill();}
  letterChar(g,300,330,1.3,'A','#e53935',st.sp=='a',t);letterChar(g,660,330,1.3,'Z','#1e63d6',st.sp=='b',t);if(st.sp=='c'){g.fillStyle='#fff8';g.fillRect(380,60,200,44);g.fillStyle='#333';g.font='700 22px Arial';g.textAlign='center';g.fillText('📖 Narradora',480,90);}return;}
 const plato=k.startsWith('plato');if(plato){g.fillStyle='#14204a';g.fillRect(0,0,960,540);for(let i=0;i<8;i++){g.fillStyle='rgba(255,240,150,'+(.25+.2*Math.sin(t*2+i))+')';g.beginPath();g.moveTo(60+i*120,0);g.lineTo(20+i*120,300);g.lineTo(100+i*120,300);g.fill();}
  g.fillStyle='#2b6ae0';g.beginPath();g.arc(480,250,120,0,7);g.fill();g.fillStyle='#fff';g.font='900 40px Arial';g.textAlign='center';g.fillText(st.toast?'🍞':'?',480,265);g.fillStyle='#333';g.fillRect(0,420,960,120);}
 else{g.fillStyle='#f3dcb4';g.fillRect(0,0,960,540);g.fillStyle='#8fd0ff';g.fillRect(620,60,220,170);g.strokeStyle='#7a4b22';g.lineWidth=10;g.strokeRect(620,60,220,170);g.beginPath();g.moveTo(730,60);g.lineTo(730,230);g.stroke();
  g.fillStyle='#a0522d';g.fillRect(0,440,960,100);g.fillStyle='#b5651d';g.fillRect(90,330,420,110);g.fillStyle='#8b4513';g.fillRect(70,300,40,140);g.fillRect(490,300,40,140);g.fillStyle='#6b8e23';g.fillRect(60,80,60,60);}
 const C=st.cast||{};const pos={a:[220,330],b:[480,330],c:[740,330]},cols={a:'#8e44ad',b:'#2c7be5',c:'#e67e22'},hair={a:'#ccc',b:'#2a1a10',c:'#7b3f00'};
 Object.keys(C).forEach(id=>{const p=pos[id];person(g,p[0],p[1],1.4,cols[id],SKIN[id.charCodeAt(0)%3],hair[id],st.sp==id,t,id!='b');g.fillStyle='#000a';g.fillRect(p[0]-80,p[1]+130,160,30);g.fillStyle='#fff';g.font='700 18px Arial';g.textAlign='center';g.fillText(C[id][0],p[0],p[1]+152);});
 if(st.laugh&&t-st.laugh<1.6){g.fillStyle='#fff';g.font='italic 700 24px Arial';g.textAlign='center';g.fillText('(risas)',480,40);}}
function drawFilm(g,t,st){const k=st.n||0;g.fillStyle='#05060f';g.fillRect(0,0,960,540);const gr=g.createRadialGradient(480,260,20,480,260,500);gr.addColorStop(0,['#3a2a6a','#2a1030','#103040','#402010','#203a10','#301030'][k%6]);gr.addColorStop(1,'#000');g.fillStyle=gr;g.fillRect(0,60,960,420);
 g.fillStyle='#f6f2d0';g.beginPath();g.arc(760-k*40,150,46,0,7);g.fill();const R=130+Math.sin(t)*6;for(let i=0;i<25;i++){const a=i/25*Math.PI*2+t*.15;g.fillStyle=i<(st.lit==null?25:st.lit)?'#3fa9ff':'#333';g.beginPath();g.arc(420+Math.cos(a)*R,280+Math.sin(a)*R,14,0,7);g.fill();}
 g.fillStyle='#000';g.fillRect(0,0,960,60);g.fillRect(0,480,960,60);g.fillStyle='#ddd';g.font='italic 900 30px Georgia';g.textAlign='center';g.fillText(st.title||'',480,42);}
// ---------- secuencias
const day=()=>{const d=new Date();return d.getDate()+d.getMonth()*31;};
async function newsShow(M,run,title,dep){const st=M.st;st.prog=title.toUpperCase();st.tk=D.NEWS.map(n=>'● '+n.r).join('   ')+'   · '+INV;loop(M,run,drawNews);
 const h=new Date().getHours(),hola=/mañana/i.test(title)||h<12?'hola_m':(/noche/i.test(title)||h>=21?'hola_n':'hola_t');
 const say=async(id,sp,txt)=>{if(run!==RUN)return;st.sp=sp;M.s.textContent=txt;await sayF(id,txt,run);st.sp=null;};
 const FT=k=>D.F[k];const ftext={hola_m:'Buenos días. Les damos la bienvenida a APS Noticias.',hola_t:'Buenas tardes. Comenzamos APS Noticias.',hola_n:'Buenas noches. Este es el resumen de la jornada en APS Noticias.',tit:'Estos son los titulares.',mas:'Seguimos con más noticias.',dep_in:'Y ahora, los deportes.',tiempo_in:'Y vamos con el tiempo.',adios_a:'Esto ha sido todo. Gracias por su compañía.',adios_l:'Hasta la próxima edición. Buenas noches.',inv:'Recuerden: todas las noticias de este informativo son inventadas.',pasa_ana:'Ana, cuéntanos.',pasa_luis:'Luis, adelante.'};
 const spk={hola_m:'ana',hola_t:'luis',hola_n:'ana',tit:'luis',mas:'ana',dep_in:'luis',tiempo_in:'ana',adios_a:'ana',adios_l:'luis',inv:'luis',pasa_ana:'luis',pasa_luis:'ana'};
 const f=k=>say(FT(k),spk[k],ftext[k]);let off=(day()*3+h)%D.NEWS.length;
 for(let round=0;run===RUN;round++){if(!dep){await f(hola);await f('tit');const pick=[0,1,2,3].map(i=>D.NEWS[(off+i)%D.NEWS.length]);off+=4;
   M.r.style.display='block';for(const n of pick){M.r.textContent=n.r;await W(900);if(run!==RUN)return;M.r.textContent=n.r;}M.r.style.display='none';
   for(let i=0;i<pick.length&&run===RUN;i++){const n=pick[i];if(i)await f(n.v=='ana'?'pasa_ana':'pasa_luis');st.ic=n.ic;M.r.style.display='block';M.r.textContent=n.r;for(let j=0;j<n.f.length;j++)await say(n.f[j],n.v,n.t[j]);M.r.style.display='none';st.ic=null;if(i==1)await f('mas');}}
  await f('dep_in');st.dep=1;for(const n of [D.DEP[(off)%3],D.DEP[(off+1)%3]]){st.ic=n.ic;M.r.style.display='block';M.r.textContent=n.r;for(let j=0;j<n.f.length;j++)await say(n.f[j],'dep',n.t[j]);}st.dep=0;M.r.style.display='none';st.ic=null;
  await f('tiempo_in');st.tiempo=1;M.r.style.display='block';M.r.textContent='EL TIEMPO · MAÑANA';for(const w of D.TIEMPO)await say(w[1],'m1',w[2]);st.tiempo=0;M.r.style.display='none';
  await f('adios_a');await f('adios_l');await f('inv');await W(2500);}}
async function seriesShow(M,run,key){const S=D.SER[key];const st=M.st;st.key=key;st.cast=S.cast;loop(M,run,drawSeries);await W(1200);
 for(;run===RUN;){for(const [c,id,txt] of S.l){if(run!==RUN)return;st.sp=c;if(/tost|pan/i.test(txt))st.toast=1;M.s.innerHTML='<b style="color:#ffd54a">'+S.cast[c][0]+':</b> '+txt;await sayF(id,txt,run);st.sp=null;if(/[!¡?]/.test(txt)&&Math.random()<.5)st.laugh=performance.now()/1000;await W(250);}
  M.s.textContent='(Fin del episodio · '+INV+')';await W(4000);st.toast=0;}}
async function filmShow(M,run,key,title){const L=D.FILM[key];const st=M.st;st.title=title;loop(M,run,drawFilm);
 for(;run===RUN;){for(let i=0;i<L.length&&run===RUN;i++){st.n=i;st.lit=key=='cine2'?Math.max(3,25-i*5):25;M.s.textContent=L[i][1];await sayF(L[i][0],L[i][1],run);await W(1200);}st.lit=25;M.s.textContent='FIN · '+INV;await W(5000);}}
// ---------- enganche con el render de AntenaPS
function pickSeries(txt){if(/Letras Locas/i.test(txt))return'kids1';if(/plató/i.test(txt))return/tostad/i.test(txt)?'plato2':'plato1';return/Lucía|Pasapalabra»|apunta/i.test(txt)?'anhq2':'anhq1';}
function hook(sc){const c=sc.firstElementChild;if(!c||!c.classList||!c.classList.contains('cnt'))return;const txt=c.textContent||'';let run=++RUN;try{AU&&AU.pause();}catch(e){}
 if(c.classList.contains('news')){const lt=c.querySelector('.lt'),title=lt?lt.textContent:'APS Noticias';const dep=/DEPORTES/.test(title);const M=mount(sc,'news');newsShow(M,run,dep?'APS Deportes y El tiempo':title,dep);}
 else if(c.classList.contains('series')){const M=mount(sc,'series');seriesShow(M,run,pickSeries(txt));}
 else if(c.classList.contains('film')){const t=(c.querySelector('.ttl')||{}).textContent||'Cine';const M=mount(sc,'film');filmShow(M,run,/maldito/i.test(t)?'cine2':'cine1',t);}}
function watch(){const sc=document.querySelector('#antenaps .scr, .scr');if(!sc){return setTimeout(watch,1000);}if(sc.__tv36)return;sc.__tv36=1;
 new MutationObserver(()=>{const f=sc.firstElementChild;if(!f||f.classList.contains('tv36')){if(!f){RUN++;try{AU&&AU.pause();}catch(e){}}return;}hook(sc);}).observe(sc,{childList:true});hook(sc);}
setInterval(()=>{const sc=document.querySelector('.scr');if(sc&&!sc.__tv36)watch();},1500);
window.__tv36=()=>({run:RUN,ch:AntenaPS.channels.map(c=>c.id),au:AU&&AU.src});
})();
