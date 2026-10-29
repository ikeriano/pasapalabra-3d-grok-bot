/* Pasapalabra (Bialplen 2001 / Silvia Jato) - JS rebuild for Pasapalabra 3D v0.14
   Assets: original UGF graphics, TRK sounds and QST question files converted 1:1. */
(function(){
'use strict';
var C=document.getElementById('c'),X=C.getContext('2d');
var R=window.SJR,D=window.SJDATA;
var IMG={},SND={},MUS=null,musName='';
var IMGS='ABanner1 Ap00 Ap01 Black Center Center2 Cup1 Cup2 Cup3 Exit Figol FontBig FontGame FontMid FontMid2 FontNormal FontPremium FontQst FontShadow Game1Spr Game2Spr Game3Spr Game4Spr Game5Spr Game6Spr General HelpBkg HelpSpr HiScoreBkg IBanner InputRecordsBkg InputRecordsSpr IntroSpr J1Spr Last00 Left Left2 License LogoSpr Matona MicroBanner1 MicroBanner2 MinBanner1 MinBanner2 Noris OptSpr Optbkg Papela Banner1 Banner2 PremiumSpr PremiumSpr2 Presen1Bkg Presen1Spr Right Right2 Seguro Select1PBkg Select2PBkg SelectSpr TableBkg Tgames1 Tgames2 Warning Zamara premiumBkg title'.split(' ');
var SNDS='1Jugador 2Jugadores Applause Ayuda Banner Bye Clang Click Clock Comodin Creditos Cups InputRecords Music0 Music1 Music2 Music3 Music4 No Opciones PasaP Pasap1 Pasapalabra Pozi Premium Records SPACE Salir SelectMusic SelectP Stuck Sure TimeOver Wick Intro LAUGH'.split(' ');
var PLAYERS=['Seguro','Matona','Figol','Zamara','Noris','Papela'];
var GLY='abcdefghijklmnñopqrstuvwxyz#ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789.,:;¿?-+*/=';
var LS={get:function(k,d){try{var v=localStorage.getItem('sj13_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set:function(k,v){try{localStorage.setItem('sj13_'+k,JSON.stringify(v))}catch(e){}}};
var opt={dif:LS.get('dif',1)};
var DEFREC=[['GIORGIO',15000],['CHELVIS',12500],['YOLANDA',10000],['SILVIA',7500],['GELO',5000],['SILVIA',2500]].map(function(r){return {n:r[0],s:r[1],p:[0,1,2]}});
function records(){return LS.get('rec',DEFREC)}
function bote(){return LS.get('bote',6000)}

/* ---------- audio ---------- */
var muted=false;
function snd(n,vol){if(muted)return null;var a=SND[n];if(!a)return null;try{var b=a.cloneNode();b.volume=vol==null?1:vol;b.play().catch(function(){});return b}catch(e){return null}}
function music(n,loop){if(musName===n&&MUS&&!MUS.paused)return;stopMusic();if(!n)return;musName=n;MUS=new Audio('snd/'+n+'.ogg');MUS.loop=loop!==false;MUS.volume=.7;MUS.play().catch(function(){})}
function stopMusic(){if(MUS){MUS.pause();MUS=null}musName=''}

/* ---------- drawing ---------- */
function img(n,x,y,a){var i=IMG[n];if(!i)return;if(a!=null&&a<1){X.globalAlpha=Math.max(0,a);X.drawImage(i,x|0,y|0);X.globalAlpha=1}else X.drawImage(i,x|0,y|0)}
function spr(n,k,x,y,a,s){var r=R[n]&&R[n][k],i=IMG[n];if(!r||!i)return;s=s||1;if(a!=null)X.globalAlpha=Math.max(0,Math.min(1,a));X.drawImage(i,r[0],r[1],r[2],r[3],x|0,y|0,Math.round(r[2]*s),Math.round(r[3]*s));X.globalAlpha=1}
function sw(n,k){return R[n][k][2]}function sh(n,k){return R[n][k][3]}
var ACC={'á':'a','à':'a','é':'e','è':'e','í':'i','ì':'i','ó':'o','ò':'o','ú':'u','ù':'u','ü':'u','Á':'A','À':'A','É':'E','È':'E','Í':'I','Ó':'O','Ú':'U','Ü':'U','ç':'c','Ç':'C','¡':'','!':'','(':'',')':'','\'':'','´':'','º':'','ª':'','·':'.','—':'-','_':'-'};
function gi(ch){var k=GLY.indexOf(ch);if(k<0&&ACC[ch]!=null){var c2=ACC[ch];if(!c2)return -2;k=GLY.indexOf(c2)}return k}
function tw(f,s,sc){sc=sc||1;var w=0,sp=Math.round(R[f][0][2]*.75);for(var i=0;i<s.length;i++){var k=gi(s[i]);if(k===-2)continue;w+=(k<0?sp:R[f][k][2]+1)}return w*sc}
function txt(f,s,x,y,al,sc,a){s=String(s);sc=sc||1;if(al==='c')x-=tw(f,s,sc)/2;else if(al==='r')x-=tw(f,s,sc);var sp=Math.round(R[f][0][2]*.75);if(a!=null)X.globalAlpha=a;
 for(var i=0;i<s.length;i++){var k=gi(s[i]);if(k===-2)continue;if(k<0){x+=sp*sc;continue}var r=R[f][k];var dy=(s[i]==='¿'||'gjpqy'.indexOf(s[i])>=0)?0:0;X.drawImage(IMG[f],r[0],r[1],r[2],r[3],Math.round(x),Math.round(y+dy),Math.round(r[2]*sc),Math.round(r[3]*sc));x+=(r[2]+1)*sc}X.globalAlpha=1}
function txtC(f,s,cx,cy,sc){sc=sc||1;var h=R[f][GLY.indexOf('0')][3]*sc;txt(f,s,cx,cy-h/2,'c',sc)}
function wrap(f,s,maxw,sc){var out=[];String(s).split('\n').forEach(function(par){var w=par.split(' '),line='';w.forEach(function(word){var t=line?line+' '+word:word;if(tw(f,t,sc)>maxw&&line){out.push(line);line=word}else line=t});out.push(line)});return out}
function para(f,s,cx,cy,maxw,lh,sc){var L=wrap(f,s,maxw,sc);var y=cy-L.length*lh/2;L.forEach(function(l,i){txt(f,l,cx,y+i*lh,'c',sc)})}
function fmt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
function norm(s){return String(s).toUpperCase().replace(/[ÁÀÂ]/g,'A').replace(/[ÉÈÊ]/g,'E').replace(/[ÍÌÎ]/g,'I').replace(/[ÓÒÔ]/g,'O').replace(/[ÚÙÛÜ]/g,'U').replace(/[^A-ZÑ0-9]/g,'')}
function inR(p,x,y,w,h){return p.x>=x&&p.x<x+w&&p.y>=y&&p.y<y+h}

/* ---------- scene system ---------- */
var S=null,T=0,mouse={x:-1,y:-1},fade=0;
function go(sc){if(S&&S.leave)S.leave();S=sc;S.t=0;fade=1;kbShow(!!S.typing);if(S.enter)S.enter()}
function after(t,fn){return {t:t,fn:fn}}

/* ---------- touch keyboard (DOM) ---------- */
var kb=document.getElementById('kb'),kbOn=false;
(function(){var rows=['QWERTYUIOP','ASDFGHJKLÑ','ZXCVBNM'];var h='';rows.forEach(function(r,i){h+='<div class="r">';r.split('').forEach(function(c){h+='<b data-k="'+c+'">'+c+'</b>'});if(i===2)h+='<b class="w" data-k="BS">⌫</b>';h+='</div>'});
 h+='<div class="r"><b class="w" data-k="SP">ESPACIO</b><b class="w" data-k="PASA">PASAPALABRA</b><b class="w" data-k="OK">INTRO</b></div>';kb.innerHTML=h;
 kb.addEventListener('touchstart',function(e){var b=e.target.closest('b');if(!b)return;e.preventDefault();press(b.dataset.k)},{passive:false});
 kb.addEventListener('mousedown',function(e){var b=e.target.closest('b');if(b){e.preventDefault();press(b.dataset.k)}});
 function press(k){unlock();if(!S||!S.key)return;S.key(k==='BS'?'Backspace':k==='OK'?'Enter':k==='SP'?' ':k==='PASA'?'PASA':k)}})();
function kbShow(on){kbOn=on&&('ontouchstart' in window||navigator.maxTouchPoints>0);kb.style.display=kbOn?'block':'none';var p=kb.querySelector('[data-k=PASA]');if(p)p.style.display=(S&&S.rosco)?'':'none';layout()}
function layout(){var W=innerWidth,H=innerHeight,kh=kbOn?kb.offsetHeight:0;var s=Math.min(W/640,(H-kh)/480);C.style.width=640*s+'px';C.style.height=480*s+'px';C.style.left=(W-640*s)/2+'px';C.style.top=Math.max(0,(H-kh-480*s)/2)+'px';layout.s=s}
addEventListener('resize',layout);
function pt(e){var r=C.getBoundingClientRect(),t=e.changedTouches?e.changedTouches[0]:e;return {x:(t.clientX-r.left)*640/r.width,y:(t.clientY-r.top)*480/r.height}}
var unlocked=false;function unlock(){if(unlocked)return;unlocked=true;if(MUS&&MUS.paused)MUS.play().catch(function(){})}
C.addEventListener('mousemove',function(e){mouse=pt(e)});
C.addEventListener('touchstart',function(e){e.preventDefault();unlock();mouse=pt(e);if(S&&S.down)S.down(mouse)},{passive:false});
C.addEventListener('touchend',function(e){e.preventDefault();var p=pt(e);mouse=p;if(S&&S.click)S.click(p);setTimeout(function(){mouse={x:-1,y:-1}},120)},{passive:false});
C.addEventListener('mousedown',function(e){unlock();if(S&&S.down)S.down(pt(e))});
C.addEventListener('click',function(e){if(e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents)return;unlock();if(S&&S.click)S.click(pt(e))});
addEventListener('keydown',function(e){unlock();if(!S||!S.key)return;var k=e.key;if(k.length===1||k==='Enter'||k==='Backspace'||k==='Escape'||k.indexOf('Arrow')===0){S.key(k.length===1?k.toUpperCase():k);e.preventDefault()}});
if(parent!==window)document.getElementById('back').style.display='none';document.getElementById('back').onclick=function(){quitToHost()};
function quitToHost(){stopMusic();try{parent.postMessage({sj13:'salir'},'*')}catch(e){}if(parent===window)go(Menu())}

/* ---------- button helper ---------- */
function Btn(sheet,n,h,x,y,cb,voice){return {sheet:sheet,n:n,h:h,x:x,y:y,cb:cb,voice:voice,on:false}}
function drawBtns(B){B.forEach(function(b){if(b.hidden)return;var over=inR(mouse,b.x,b.y,sw(b.sheet,b.n),sh(b.sheet,b.n));if(over&&!b.on&&b.voice)snd(b.voice);b.on=over;spr(b.sheet,over?b.h:b.n,b.x,b.y)})}
function clickBtns(B,p){for(var i=0;i<B.length;i++){var b=B[i];if(!b.hidden&&inR(p,b.x,b.y,sw(b.sheet,b.n),sh(b.sheet,b.n))){snd('Click');b.cb();return true}}return false}

/* ---------- boot: License -> Warning -> credits -> menu ---------- */
function Still(name,dur,next,draw){return {draw:function(){img(name,0,0);if(draw)draw(this.t)},update:function(){if(this.t>dur)go(next())},click:function(){go(next())},key:function(k){if(k==='Enter'||k===' '||k==='Escape')go(next())}}}
var CREDIT_DUR=2.2;
function Credits(next){return {enter:function(){music('Music1',false);snd('Creditos')},
 draw:function(){X.fillStyle='#000';X.fillRect(0,0,640,480);var k=Math.floor(this.t/CREDIT_DUR);if(k>4)return;var f=this.t-k*CREDIT_DUR,a=Math.min(1,f/.5,(CREDIT_DUR-f)/.5);var r=R.IntroSpr[k];spr('IntroSpr',k,(640-r[2])/2,(480-r[3])/2,a)},
 update:function(){if(this.t>5*CREDIT_DUR+.3)go(next())},click:function(){go(next())},key:function(){go(next())}}}
function Boot(){return Still('License',4,function(){return Still('Warning',4,function(){return Credits(Menu)})})}

/* ---------- menu ---------- */
var TITLE_X=function(k){return 38+45*k};
function Menu(){var B=[],L=[['1Jugador',function(){go(Select(1))}],['2Jugadores',function(){go(Select(2))}],['Opciones',function(){go(Options())}],['Ayuda',function(){go(Help(0))}],['Records',function(){go(Records(Menu))}],['Creditos',function(){go(Credits(Menu))}],['Salir',function(){go(ExitAsk(Menu,function(){go(ExitAds())}))}]];
 var P=[[138,180],[105,220],[90,260],[88,300],[100,340],[130,380],[210,420]];
 L.forEach(function(l,i){B.push(Btn('Presen1Spr',12+2*i,13+2*i,P[i][0],P[i][1],l[1],l[0]))});
 return {B:B,enter:function(){music('PasaP')},
 draw:function(){img('Presen1Bkg',0,0);for(var k=0;k<11;k++){var tt=this.t*6-k;if(tt<=0)continue;var y=15-Math.max(0,(1-tt))*60;spr('Presen1Spr',k,TITLE_X(k),y,Math.min(1,tt))}
  spr('Presen1Spr',11,564,400);drawBtns(B)},
 update:function(){var k=Math.floor(this.t*6);if(k!==this.lk&&k<11){this.lk=k;if(k%3===0)snd('Clang',.4)}},
 click:function(p){clickBtns(B,p)},key:function(k){if(k==='Escape')L[6][1]();if(k==='1')L[0][1]();if(k==='2')L[1][1]()}}}

/* ---------- exit dialog / ads ---------- */
function ExitAsk(back,yes){var prev=S;return {enter:function(){snd('Sure')},draw:function(){if(prev&&prev.draw)prev.draw.call(prev);var E=IMG.Exit;X.drawImage(E,0,0,398,235,121,122,398,235);var si=inR(mouse,189,258,90,60),no=inR(mouse,353,258,90,60);X.drawImage(E,si?90:0,236,90,60,189,258,90,60);X.drawImage(E,no?270:180,236,90,60,353,258,90,60)},
 click:function(p){if(inR(p,189,258,90,60)){snd('Click');yes()}else if(inR(p,353,258,90,60)){snd('Click');S=prev;kbShow(!!prev.typing);if(prev.resume)prev.resume()}},
 key:function(k){if(k==='S'||k==='Enter')yes();if(k==='N'||k==='Escape'){S=prev;kbShow(!!prev.typing);if(prev.resume)prev.resume()}}}}
function ExitAds(){stopMusic();snd('Bye');return Still('Last00',10,function(){return Still('Tgames1',6,function(){return Still('Tgames2',6,function(){quitToHost();return Menu()})})})}

/* ---------- options ---------- */
function Options(){var B=[Btn('OptSpr',0,1,310,330,function(){go(Menu())})];
 return {enter:function(){snd('Opciones')},draw:function(){img('Optbkg',0,0);[[2,200],[4,240],[6,280]].forEach(function(o,i){spr('OptSpr',o[0]+(opt.dif===i?1:0),310,o[1])});drawBtns(B)},
 click:function(p){for(var i=0;i<3;i++)if(inR(p,310,200+40*i,170,32)){opt.dif=i;LS.set('dif',i);snd('Click');return}clickBtns(B,p)},key:function(k){if(k==='Escape')go(Menu())}}}

/* ---------- help ---------- */
function Help(n){var sc=0,dir=0,B=[];for(var i=0;i<6;i++)(function(i){B.push(Btn('HelpSpr',4+2*i,5+2*i,90*i,448,function(){go(Help(i))}))})(i);B.push(Btn('HelpSpr',16,17,540,448,function(){go(Menu())}));
 var lines=D.ayuda[n].replace(/\r/g,'').split('\n'),LH=26,top=90,bot=440,maxs=Math.max(0,lines.length*LH-(bot-top)+10);
 return {enter:function(){snd('Ayuda')},draw:function(){img('HelpBkg',0,0);X.save();X.beginPath();X.rect(0,top,640,bot-top);X.clip();lines.forEach(function(l,i){txt('FontNormal',l.replace(/\s+$/,''),i===0?30:28,top+8+i*LH-sc)});X.restore();
  spr('HelpSpr',sc>0?1:0,600,56);spr('HelpSpr',sc<maxs?3:2,600,394);drawBtns(B)},
 update:function(dt){sc=Math.max(0,Math.min(maxs,sc+dir*120*dt))},
 down:function(p){dir=inR(p,590,46,40,52)?-1:inR(p,590,384,40,52)?1:0},
 click:function(p){dir=0;if(inR(p,590,46,40,52)){sc=Math.max(0,sc-LH*3);return}if(inR(p,590,384,40,52)){sc=Math.min(maxs,sc+LH*3);return}clickBtns(B,p)},
 key:function(k){if(k==='ArrowUp')sc=Math.max(0,sc-LH);if(k==='ArrowDown')sc=Math.min(maxs,sc+LH);if(k==='Escape')go(Menu())}}}

/* ---------- records ---------- */
function Records(next,hi){var rec=records();return {enter:function(){snd('Records');music('SelectMusic')},
 draw:function(){img('HiScoreBkg',0,0);var off=rec.length>4?Math.max(0,Math.min((rec.length-4)*95,(this.t-3)*30)):0;X.save();X.beginPath();X.rect(0,85,640,395);X.clip();
  rec.forEach(function(r,i){var y=101+95*i-off;if(y<-90||y>480)return;txtC('FontBig',String(i+1),187,y+40);for(var j=0;j<3;j++)spr(PLAYERS[r.p[j]],2,226+65*j,y);
   var f=(hi===i&&Math.floor(T*3)%2)?'FontMid':'FontPremium';txt(hi===i&&Math.floor(T*3)%2?'FontMid':'FontQst',r.n,437,y+12,'l',.75);txt('FontQst',String(r.s),437,y+36,'l',.6)});X.restore()},
 update:function(){if(this.t>(rec.length>4?(rec.length-4)*95/30+9:12))go(next())},click:function(){go(next())},key:function(){go(next())}}}

/* ---------- player select ---------- */
var GRID=[[77,95],[149,95],[221,95],[77,180],[149,180],[221,180]];
function Select(np){var chosen=[],B=[Btn('SelectSpr',0,1,0,279,function(){go(Menu())})];var J=Btn('SelectSpr',2,3,550,279,function(){go(Bote({np:np,teams:np===1?[chosen]:[chosen.slice(0,3),chosen.slice(3)]}))});J.hidden=true;B.push(J);
 var need=np*3;
 function slot(i){return np===1?[213+70*i,378]:(i<3?[53+80*i,378]:[353+80*(i-3),378])}
 return {enter:function(){music('SelectMusic');snd('SelectP')},
 draw:function(){img(np===1?'Select1PBkg':'Select2PBkg',0,0);spr('LogoSpr',Math.floor(this.t*10)%16,350,100);
  GRID.forEach(function(g,i){if(chosen.indexOf(i)<0){var o=inR(mouse,g[0],g[1],62,80);spr(PLAYERS[i],o?3:2,g[0],g[1])}});
  for(var i=0;i<need;i++){var s=slot(i);if(np===1)spr('SelectSpr',4,s[0],s[1]);if(chosen[i]!=null)spr(PLAYERS[chosen[i]],2,s[0]+2,s[1]+2)}
  J.hidden=chosen.length<need;drawBtns(B)},
 click:function(p){for(var i=0;i<6;i++){var g=GRID[i];if(chosen.indexOf(i)<0&&chosen.length<need&&inR(p,g[0],g[1],62,80)){chosen.push(i);snd('Pozi');return}}
  for(var j=0;j<chosen.length;j++){var s=slot(j);if(inR(p,s[0],s[1],66,84)){chosen.splice(j,1);snd('Click');return}}clickBtns(B,p)},
 key:function(k){if(k==='Escape')go(Menu());if(k==='Enter'&&chosen.length===need)J.cb()}}}

/* ---------- bote ---------- */
function Bote(G){var b=bote();return {enter:function(){stopMusic();snd('Premium')},draw:function(){img('premiumBkg',0,0);img('IBanner',20,60,.85);
  txt('FontNormal','En el dia de hoy tenemos un bote',320,130,'c');txt('FontNormal','de '+fmt(b)+' euros.',320,160,'c');txt('FontNormal','Pulsa INTRO para continuar..',320,215,'c');
  img('PremiumSpr2',20,315);X.drawImage(IMG.PremiumSpr2,170,34,2,56,170,349,300,56);txt('FontBig',fmt(b)+' ',300,362,'c');X.fillStyle='#fff';X.font='bold 30px Arial';X.fillText('€',300+tw('FontBig',fmt(b))/2+6,388)},
 update:function(){if(this.t>6.5)start()},click:function(){start()},key:function(k){if(k==='Enter'||k===' ')start()}};
 function start(){if(S.done)return;S.done=1;newGame(G)}}

/* ---------- game core ---------- */
var CAMS=['Left','Right','Center','Left2','Right2','Center2'];
function newGame(G){var progs=Object.keys(D.programas);G.prog=D.programas[progs[Math.floor(Math.random()*progs.length)]];G.pts=[0,0];G.secs=[0,0];G.hearts=[2,2];G.bote=bote();G.rosco=[null,null];G.game=1;G.team=0;go(Intro(G))}
var GNAMES=['','De la "A" a la "Z"','Palabra incompleta','Famosos','Piramide','Palabra imposible','El rosco'];
function Intro(G){return {enter:function(){snd('Banner');music('Music'+(G.game%5),true)},draw:function(){img('TableBkg',0,0);img('MinBanner'+(G.team+1),60,40,.85);
  txt('FontPremium','Prueba '+G.game,320,58,'c');txt('FontNormal',GNAMES[G.game]+(G.teams.length>1?'  -  Equipo '+(G.team?'Rojo':'Azul'):''),320,100,'c')},
 update:function(){if(this.t>3)begin()},click:function(){begin()},key:function(k){if(k==='Enter')begin()}};
 function begin(){if(S.done)return;S.done=1;go([null,Game1,Game2,Game3,Game4,Game5,Game6][G.game](G))}}
function budget(){return [120,90,60][opt.dif]}
function nextPart(G){if(G.teams.length>1&&G.team===0){G.team=1;go(Intro(G));return}G.team=0;if(G.game<6){G.game++;go(Intro(G))}else go(Final(G))}
function timeOver(G,cb){snd('TimeOver');go(Msg(['Se acabo tu tiempo'],2.6,cb))}
function Msg(lines,dur,cb){return {draw:function(){img('premiumBkg',0,0);img('IBanner',20,60,.85);lines.forEach(function(l,i){txt('FontNormal',l,320,150-lines.length*14+i*30,'c')})},update:function(){if(this.t>dur)this.go()},go:function(){if(this.d)return;this.d=1;cb()},click:function(){this.go()},key:function(k){if(k==='Enter')this.go()}}}

/* common HUD + base object */
function Base(G,o){var t=G.team,sp=G.teams[t];o.typing=o.typing!==false;o.G=G;o.ans='';o.cam=CAMS[0];o.pl=0;o.flash=0;o.flashTxt='';
 o.newCam=function(){this.cam=CAMS[Math.floor(Math.random()*CAMS.length)];this.pl=sp[Math.floor(Math.random()*sp.length)]};
 o.hud=function(){img(this.cam,0,0);spr(PLAYERS[this.pl],0,111+(this.cam.indexOf('Left')===0?40:this.cam.indexOf('Right')===0?-40:0),2);
  X.drawImage(IMG.General,0,322+56*t,640,56,0,424,640,56);
  spr('General',t,10,10);spr('General',18,135,8);txt('FontMid',String(G.pts[t]),210,4);spr('General',20,405,8);for(var i=0;i<G.hearts[t];i++)spr('General',17,507+20*i,8);
  spr('General',15,10,38);spr('General',22,535,0);spr('General',14,583,425)};
 o.btns=[Btn('General',8,10,1,451,function(){go(ExitAsk(o,function(){go(Menu())}))}),Btn('General',9,11,102,451,function(){o.end()}),Btn('General',16,19,230,451,function(){if(G.hearts[t]>0){G.hearts[t]--;snd('Comodin');o.comodin()}else snd('No')})];
 o.drawAns=function(y){if(this.typing){txt('FontNormal',this.ans,320,(y||323)-26,'c');if(Math.floor(T*2)%2)spr('General',2,320-11+tw('FontNormal',this.ans)/2+4,y||323)}};
 o.drawFlash=function(){if(this.flash>0){img('ABanner1',60,54);txt('FontNormal',this.flashTxt,320,57,'c')}};
 o.say=function(s,d){this.flash=d||2.5;this.flashTxt=s};
 o.click=function(p){clickBtns(this.btns,p)||(this.click2&&this.click2(p))};
 o.key=function(k){if(k==='Escape'){this.btns[0].cb();return}if(this.flash>0||!this.typing)return;if(k==='Enter'){if(this.ans)this.submit(this.ans);this.ans='';return}if(k==='Backspace'){this.ans=this.ans.slice(0,-1);return}if(k==='PASA'){if(this.pasa)this.pasa();return}
  if(k===' '&&!this.ans){if(this.pasa&&this.rosco){this.pasa();return}}if(this.ans.length<22&&/^[A-ZÑ ]$/.test(k))this.ans+=k};
 o.end=o.end||function(){};o.comodin=o.comodin||function(){};
 return o}
function ok(a,b){return norm(a)===norm(b)}

/* Game 1 : A..Z */
function Game1(G){var t=G.team,Q=G.prog['1'].slice(t*12,t*12+12),qi=0,QT=[20,16,12][opt.dif];
 var o=Base(G,{enter:function(){this.newCam();this.qt=QT},
 cur:function(){return Q[qi]},
 draw:function(){this.hud();var q=this.cur();if(q){spr('General',24,245,60);txt('FontNormal',q[0][0],410,64);img('Banner'+(t+1),20,97,.82);para('FontShadow',q[1],320,193,540,24)}
  spr('Game1Spr',4*t,40,337);txtC('FontBig',String(G.secs[t]),95,377);var f=Math.min(15,Math.floor((1-this.qt/QT)*16));spr('J1Spr',f,169,343);var L=q?q[0][0]:'';var li='ABCDEFGHIJKLMNOPQRSTUVYZ'.indexOf(L);if(li>=0)spr('Game1Spr',8+li,201-sw('Game1Spr',8+li)/2,375-15,1,1);
  this.drawAns();this.drawFlash();drawBtns(this.btns)},
 update:function(dt){if(this.flash>0){this.flash-=dt;if(this.flash<=0)this.next();return}this.qt-=dt;if(this.qt<=0){snd('No');this.say(this.cur()[0])}},
 submit:function(a){var q=this.cur();if(ok(a,q[0])){snd('Pozi');G.pts[t]+=60;G.secs[t]+=[4,3,2][opt.dif];this.next()}else{snd('No');this.say(q[0])}},
 comodin:function(){var q=this.cur();this.say(q[0],1.6);G.pts[t]+=0},
 next:function(){this.flash=0;qi++;this.ans='';this.qt=QT;this.newCam();if(qi>=Q.length)nextPart(G)},
 end:function(){nextPart(G)}});return o}

/* Game 2 : palabra incompleta (prefix team1 / suffix team2) */
function Game2(G){var t=G.team,Q=G.prog['2'].slice(t*12,t*12+12),qi=0;
 function aff(){var w=Q.map(function(q){return norm(q[0])});var a=w[0];if(t===0){var n=0;while(w.every(function(x){return x[n]===a[n]})&&n<a.length)n++;return a.slice(0,Math.max(3,Math.min(3,n)))}var m=0;while(w.every(function(x){return x[x.length-1-m]===a[a.length-1-m]})&&m<a.length)m++;return a.slice(a.length-3)}
 var A=aff(),ac=0;
 var o=Base(G,{enter:function(){this.newCam();this.tl=budget()},
 draw:function(){this.hud();var q=Q[qi];img('Banner'+(t+1),20,97,.82);if(q)para('FontShadow',q[1],320,193,540,24);
  var b=9*t;spr('Game2Spr',1+b,40,347);spr('Game2Spr',6+b+Math.floor(T*3)%3,45,350);txtC('FontBig',String(Math.ceil(this.tl)),110,376);spr('Game2Spr',2+b,140,347);txtC('FontBig',t===0?A+'...':'...'+A,225,376,.9);spr('Game2Spr',4+b,310,347);txtC('FontBig',String(ac),355,376);
  this.drawAns(320);this.drawFlash();drawBtns(this.btns)},
 update:function(dt){if(this.flash>0){this.flash-=dt;if(this.flash<=0)this.next();return}this.tl-=dt;if(this.tl<=0)this.end()},
 submit:function(a){if(ok(a,Q[qi][0])){snd('Pozi');ac++;G.pts[t]+=60;G.secs[t]+=2;this.next()}else{snd('No');this.say(Q[qi][0])}},
 comodin:function(){this.say(Q[qi][0],1.6)},
 next:function(){this.flash=0;qi++;this.ans='';this.newCam();if(qi>=Q.length)this.end()},
 end:function(){if(this.ended)return;this.ended=1;timeOver(G,function(){nextPart(G)})}});return o}

/* Game 3 : famosos */
function Game3(G){var t=G.team,raw=G.prog['3'],F=[];for(var i=0;i<raw.length;i++){if(raw[i][0]!=='PISTA'){var p=raw[i+1]&&raw[i+1][0]==='PISTA'?raw[i+1][1]:'';F.push({name:raw[i][0],a:raw[i][2]||'',txt:raw[i][1]+' '+(raw[i][2]||'?')[0]+'... '+(raw[i][3]||''),pista:p})}}
 var Q=F.slice(t*6,t*6+6),qi=0,fails=0,ac=0;
 var o=Base(G,{enter:function(){this.newCam();this.tl=budget()},
 draw:function(){this.hud();var q=Q[qi];if(q){txt('FontNormal',q.name,320,40,'c');img('Banner'+(t+1),20,97,.82);para('FontShadow',q.txt,320,193,540,24);if(fails>=2&&q.pista){img('MicroBanner'+(t+1),210,300,.85);txt('FontPremium','PISTA',420,306,'c',.7);para('FontShadow',q.pista,420,380,390,24)}}
  spr('Game3Spr',3*t,40,336);txtC('FontBig',String(ac),90,377);txtC('FontBig',String(Math.ceil(this.tl)),190,377);this.drawAns(310);this.drawFlash();drawBtns(this.btns)},
 update:function(dt){if(this.flash>0){this.flash-=dt;if(this.flash<=0)this.next();return}this.tl-=dt;if(this.tl<=0)this.end()},
 submit:function(a){var q=Q[qi];if(ok(a,q.a)){snd('Pozi');ac++;G.pts[t]+=60;G.secs[t]+=2;this.next()}else{fails++;snd('No');if(fails>=3)this.say(q.a);else if(fails===2)snd('Wick')}},
 comodin:function(){fails=Math.max(fails,2)},
 next:function(){this.flash=0;qi++;fails=0;this.ans='';this.newCam();if(qi>=Q.length)this.end()},
 end:function(){if(this.ended)return;this.ended=1;timeOver(G,function(){nextPart(G)})}});return o}

/* Game 4 : piramide */
function Game4(G){var t=G.team,all=G.prog['4'],P=[];for(var i=0;i+4<all.length;i+=5)P.push(all.slice(i,i+5));var pyr=P.slice(t*5,t*5+5).filter(function(p){return p.length===5}),pi=0,ri=0,ac=0;
 function missing(a,b){a=norm(a).split('');norm(b).split('').forEach(function(c){var k=a.indexOf(c);if(k>=0)a.splice(k,1)});return a.join('')}
 var o=Base(G,{enter:function(){this.newCam();this.tl=budget()},
 draw:function(){this.hud();var py=pyr[pi];if(py){for(var r=0;r<5;r++){var w=norm(py[r][0]),bi=Math.max(0,Math.min(4,w.length-3)),bw=sw('Game4Spr',bi+5*t),x=128-bw/2,y=215-40*r;spr('Game4Spr',bi+5*t,x,y,r<=ri?1:.45);
    var s=r<ri?w.split('').join(' '):r===ri?(w[0]+' '+'_ '.repeat(w.length-1)).trim():'';txt('FontNormal',s,128,y+7,'c',.95);if(r===ri&&r>0){var m=missing(py[r-1][0],w);txt('FontPremium',m,128+bw/2+16,y+44,'c',.8)}}
   img('MinBanner'+(t+1),60,282,.82);para('FontShadow',py[ri][1],320,330,480,24)}
  spr('Game4Spr',10+3*t,40,384);txtC('FontBig',String(ac),90,425);txtC('FontBig',String(Math.ceil(this.tl)),190,425);this.drawAns(260);this.drawFlash();drawBtns(this.btns)},
 update:function(dt){if(this.flash>0){this.flash-=dt;if(this.flash<=0)this.next();return}this.tl-=dt;if(this.tl<=0)this.end()},
 submit:function(a){var w=pyr[pi][ri][0];if(ok(a,w)){snd('Pozi');ac++;G.pts[t]+=60;G.secs[t]+=2;this.next()}else{snd('No');this.say(w)}},
 comodin:function(){this.say(pyr[pi][ri][0],1.6)},
 next:function(){this.flash=0;this.ans='';ri++;this.newCam();if(ri>=5){ri=0;pi++;if(pi>=pyr.length)this.end()}},
 end:function(){if(this.ended)return;this.ended=1;timeOver(G,function(){nextPart(G)})}});return o}

/* Game 5 : palabra imposible (click the word) */
function Game5(G){var t=G.team,W=G.prog['5'].slice(t*8,t*8+8),left=W.slice(),cur=null;function pick(){cur=left[Math.floor(Math.random()*left.length)]}pick();
 var o=Base(G,{typing:false,enter:function(){this.newCam();this.tl=budget()},
 draw:function(){this.hud();spr('Game5Spr',t,22,62);var self=this;left.forEach(function(w,i){var y=72+40*i,ov=inR(mouse,22,y-4,224,40);txt(ov?'FontMid':'FontBig',w[0],40,y,'l',.9)});
  img('MicroBanner'+(t+1),210,130,.85);if(cur)para('FontShadow',cur[1],420,200,390,24);spr('Game5Spr',2+3*t,420,355);txtC('FontBig',String(G.secs[t]),470,396);txtC('FontBig',String(Math.ceil(this.tl)),570,396);this.drawFlash();drawBtns(this.btns)},
 update:function(dt){if(this.flash>0)this.flash-=dt;this.tl-=dt;if(this.tl<=0)this.end()},
 click2:function(p){for(var i=0;i<left.length;i++)if(inR(p,22,68+40*i,224,40)){if(left[i]===cur){snd('Pozi');G.pts[t]+=60;G.secs[t]+=2;left.splice(i,1);this.newCam();if(!left.length){this.end();return}pick()}else{snd('No');this.say(cur[0]);G.secs[t]=0;left=W.slice();pick()}return}},
 comodin:function(){this.say(cur[0],1.6)},
 end:function(){if(this.ended)return;this.ended=1;timeOver(G,function(){nextPart(G)})}});return o}

/* Game 6 : el rosco */
var RL=['A','B','C','D','E','F','G','H','I','J','L','LL','M','N','Ñ','O','P','Q','R','S','T','U','V','X','Y','Z'];
function Game6(G){var t=G.team,Q=G.prog['6'].slice(t*28,t*28+28),n=Q.length;
 var letters=Q.map(function(q,i){var a=norm(q[0]);var std='ABCDEFGHIJLMNÑOPQRSTUVXYZ';return null});
 // derive the letter of each slot from the standard 28-letter order of the original
 var ORD=['A','B','C','D','E','F','G','H','I','J','K','L','LL','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 if(n!==28)ORD=ORD.slice(0,n);
 var st=Q.map(function(){return 0}),ci=0,ac=0;
 var o=Base(G,{rosco:true,enter:function(){this.newCam();this.tl=Math.min(199,99+G.secs[t]);snd('Pasapalabra')},
 lett:function(i){var L=ORD[i],a=norm(Q[i][0]);var starts=L==='LL'?a.indexOf('LL')===0:a[0]===L;return {L:L,starts:starts}},
 draw:function(){this.hud();var cx=338,cy=234,r=207;for(var i=0;i<n;i++){var an=i/n*Math.PI*2,x=cx+Math.sin(an)*r*1.0,y=cy-Math.cos(an)*r;var k=st[i]===1?1:st[i]===2?2:0;var cur=i===ci;var s=cur?1.15:1;
   spr('Game6Spr',k,x-22*s,y-22*s,1,s);if(!cur||Math.floor(T*3)%2)txt('FontShadow',ORD[i],x,y-11,'c',.85)}
  var q=Q[ci];if(q){var l=this.lett(ci);spr('General',l.starts?24:3,245,60);txt('FontNormal',l.L,(l.starts?410:390),64);img('Banner'+(t+1),20,97,.82);para('FontShadow',q[1],320,193,540,24)}
  spr('Game6Spr',3+3*t,30,320);txtC('FontBig',String(ac),68,348);spr('Game6Spr',5+3*t,30,378);txtC('FontBig',String(Math.ceil(this.tl)),110,406);
  spr('Game6Spr',9+t,255,330);this.drawAns(323-60);this.drawFlash();drawBtns(this.btns)},
 update:function(dt){if(this.flash>0){this.flash-=dt;if(this.flash<=0)this.adv();return}this.tl-=dt;if(this.tl<=0)this.end(true)},
 click2:function(p){if(inR(p,255,330,152,48))this.pasa()},
 pasa:function(){if(this.flash>0)return;snd('Pasap1');this.ans='';this.adv()},
 submit:function(a){if(ok(a,Q[ci][0])){snd('Pozi');st[ci]=1;ac++;G.pts[t]+=60;this.adv()}else{snd('No');st[ci]=2;this.say(Q[ci][0])}},
 comodin:function(){if(this.flash>0)return;snd('Pozi');st[ci]=1;ac++;this.adv()},
 adv:function(){this.flash=0;this.ans='';this.newCam();for(var k=1;k<=n;k++){var j=(ci+k)%n;if(st[j]===0){ci=j;return}}this.end(false)},
 end:function(timeout){if(this.ended)return;this.ended=1;G.rosco[t]={ac:ac,full:ac===n,left:Math.max(0,Math.ceil(this.tl))};var go2=function(){nextPart(G)};if(timeout||ac<n)timeOver(G,go2);else go2()}});return o}

/* ---------- final ---------- */
function Final(G){var won=-1;G.rosco.forEach(function(r,i){if(r&&r.full&&won<0)won=i});var b=G.bote;
 var score=G.teams.map(function(_,i){return G.pts[i]+(G.rosco[i]?G.rosco[i].left*10:0)+(won===i?b:0)});
 var wi=score.length>1&&score[1]>score[0]?1:0;
 if(won>=0)LS.set('bote',6000);else LS.set('bote',b+6000);
 var lines=won>=0?['¡Enhorabuena!','Has conseguido el bote de','  '+fmt(b)+' euros']:['Has finalizado la prueba','Pero no has conseguido el bote.','Intentalo otra vez...'];
 if(G.teams.length>1)lines.push('Gana el Equipo '+(wi?'Rojo':'Azul'));
 return Msg(lines,5,function(){if(won>=0)snd('Applause');var rec=records(),pos=0;while(pos<rec.length&&rec[pos].s>=score[wi])pos++;
  if(pos<10){var next=function(){go(NameInput(G,score[wi],G.teams[wi],wi,pos))};if(pos<3)go(Cup(pos,next));else next()}else go(Records(Menu))})}
function Cup(pos,next){return {enter:function(){snd('Cups');music('Premium',false)},draw:function(){img('Cup'+(pos+1),0,0)},update:function(){if(this.t>5)next()},click:function(){next()},key:function(){next()}}}
var KEYS='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ 0123456789<>'.split('');
function NameInput(G,score,team,ti,pos){var name='',sel=-1;
 function kp(i){var c=i%10,r=Math.floor(i/10);return [104+46.4*c,97+49*r]}
 function press(k){if(k==='>'){if(!name)return;var rec=records();rec.splice(pos,0,{n:name,s:score,p:team.slice(0,3)});rec=rec.slice(0,10);LS.set('rec',rec);go(Records(Menu,pos));return}if(k==='<'){name=name.slice(0,-1);return}if(name.length<10)name+=k;snd('Click')}
 return {enter:function(){music('InputRecords')},draw:function(){img('InputRecordsBkg',0,0);spr('General',ti,10,25);txt('FontMid',String(score),560,30,'c',.8);
  for(var i=0;i<KEYS.length;i++){var p=kp(i),k=2*i,w=sw('InputRecordsSpr',k),h=sh('InputRecordsSpr',k),ov=inR(mouse,p[0]-w/2,p[1]-h/2,w,h);spr('InputRecordsSpr',k+(ov?1:0),p[0]-w/2,p[1]-h/2)}
  txt('FontNormal',name+(Math.floor(T*2)%2?'-':''),320,300,'c');for(var j=0;j<3;j++)spr(PLAYERS[team[j]],2,210+81*j,381)},
 click:function(p){for(var i=0;i<KEYS.length;i++){var q=kp(i),w=sw('InputRecordsSpr',2*i),h=sh('InputRecordsSpr',2*i);if(inR(p,q[0]-w/2,q[1]-h/2,w,h)){press(KEYS[i]);return}}},
 key:function(k){if(k==='Enter')press('>');else if(k==='Backspace')press('<');else if(/^[A-ZÑ0-9 ]$/.test(k))press(k)}}}

/* ---------- main loop ---------- */
var last=0;function frame(ts){var dt=Math.min(.1,(ts-last)/1000||0);last=ts;T+=dt;if(S){S.t+=dt;if(S.update)S.update(dt);X.globalAlpha=1;if(S.draw)S.draw();if(fade>0){X.fillStyle='rgba(0,0,0,'+fade+')';X.fillRect(0,0,640,480);fade=Math.max(0,fade-dt*5)}}requestAnimationFrame(frame)}

/* ---------- preload ---------- */
var n=0,tot=IMGS.length;IMGS.forEach(function(k){var i=new Image();i.onload=i.onerror=function(){if(++n===tot)ready()};i.src='img/'+k+'.png';IMG[k]=i});
SNDS.forEach(function(k){var a=new Audio();a.preload='auto';a.src='snd/'+k+'.ogg';SND[k]=a});
function ready(){document.getElementById('load').style.display='none';layout();var q=location.hash.slice(1)||location.search.slice(1);
 if(q==='menu')go(Menu());else if(/^g\d$/.test(q)){var G={np:1,teams:[[2,0,1]]};newGame(G);G.game=+q[1];go([null,Game1,Game2,Game3,Game4,Game5,Game6][G.game](G))}
 else if(q==='credits')go(Credits(Menu));else if(q==='records')go(Records(Menu));else if(q==='help')go(Help(0));else if(q==='opc')go(Options());else if(q==='sel1')go(Select(1));else if(q==='sel2')go(Select(2));else go(Boot());requestAnimationFrame(frame)}
window.SJ={go:function(s){go(s)},Menu:Menu,Credits:Credits,Records:Records,Select:Select,Help:Help,Options:Options};
})();
