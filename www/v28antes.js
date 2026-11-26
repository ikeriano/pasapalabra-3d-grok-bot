// ===== v0.28 · ANTES Y DESPUÉS (Telecinco, prueba08.mp4) — etapa 2007 =====
// Un trozo (p. ej. «CON»): un equipo, palabras que ACABAN así («final de palabra con…»); el otro, que EMPIEZAN así.
// Turnos dentro del equipo: si aciertas sigues; si pasas o fallas, juega el compañero. Barra vertical de 10 casillas.
(()=>{
const AD=[['CON',{fin:[['EMOTICÓN','Carita que ponemos al final de los mensajes.'],['ATRACÓN','Gran banquete que uno se pega cuando nadie le mira.'],['TACÓN','Lo que lleva el zapato debajo del talón.'],['RINCÓN','Esquina donde van los castigados.'],['BALCÓN','Ventana con barandilla que sobresale de la fachada.'],['HALCÓN','Ave rapaz que usaban los cetreros.'],['FALCON','Avión del presidente del Gobierno.'],['MELOCOTÓN','Fruta de piel aterciopelada.'],['SALCHICHÓN','Embutido que se come en bocadillo.'],['CAJÓN','Parte de la mesa que se abre para guardar cosas.']],
 ini:[['CONEJO','Animal de orejas largas que come zanahorias.'],['CONCIERTO','Actuación musical en directo.'],['CONDUCTOR','Persona que maneja el autobús.'],['CONTAR','Decir los números en orden.'],['CONSEJO','Lo que te da alguien para ayudarte a decidir.'],['CONCURSO','Programa como Pasapalabra.'],['CONGELADOR','Parte de la nevera donde se hace el hielo.'],['CONVERSAR','Hablar entre dos o más personas.'],['CONFETI','Papelitos de colores que se tiran en las fiestas.'],['CONTENTO','Feliz, alegre.']]}],
 ['MAR',{fin:[['CALAMAR','Molusco que se come rebozado en bocadillo en Madrid.'],['AMAR','Querer mucho a alguien.'],['LLAMAR','Lo que haces con el teléfono.'],['SUMAR','Operación del signo más.'],['TOMAR','Coger algo con la mano.'],['QUEMAR','Destruir con fuego.'],['ARMAR','Montar un mueble por piezas.'],['ASOMAR','Sacar la cabeza por la ventana.'],['DOMAR','Amansar a un caballo.'],['REMAR','Mover los remos.']],
 ini:[['MARTES','Día de la semana después del lunes.'],['MARINERO','Persona que trabaja en un barco.'],['MARIPOSA','Insecto de alas de colores.'],['MARCO','Lo que rodea a un cuadro.'],['MARRÓN','Color del chocolate.'],['MARTILLO','Herramienta para clavar clavos.'],['MARZO','Tercer mes del año.'],['MAREO','Lo que sientes a veces en un barco.'],['MARISCO','Gambas, cigalas y almejas.'],['MARCADOR','Muestra el resultado del partido.']]}]];
const nrm=s=>String(s||'').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-ZÑ]/g,'');
async function antes07(rid){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;const [frag,S]=pick(AD);const bl=OPT.eq25!==1;
 cut('host');hostSay(`<b>Antes y Después</b> con <b>${frag}</b>: el equipo azul juega con el <b>final de palabra</b> (…${frag}) y el naranja con el <b>principio</b> (${frag}…). Si la sabes y aciertas, sigues; si pasas palabra o no aciertas, paso el turno a tu compañero.`);await wait(4.5,rid);
 const mine=shuffle((bl?S.fin:S.ini).slice()),hc=bl?COL.bl:COL.or;cut('blue');let t=75,ac=0,who=0;const pl=['Jugador 1','Jugador 2','Jugador 3'];
 const slots=[...Array(10)].map((_,i)=>{const b=bar(46,22,0x123a9e,'',{r:2});b.position.set(GW/2-90,-200+i*30,0);G.add(b);return b;});
 const tm=timer(hc);tm.position.set(-GW/2+120,-260,20);G.add(tm);tm.set(t);const dq=bar(Math.min(GW*.6,620),56,hc,'',{fs:24});dq.position.set(0,-262,10);G.add(dq);const ab=acBox(hc);ab.position.set(GW/2-90,-262,20);G.add(ab);
 const piece=bar(170,44,hc,bl?'…'+frag:frag+'…',{fs:28});piece.position.set(0,-200,10);G.add(piece);
 let run=true;anim(dt=>{if(!run||rid!==RUN)return false;if(!ASK)return true;t-=dt;tm.set(Math.max(0,Math.ceil(t)));return true;});
 let qi=0;while(t>0&&ac<10&&qi<mine.length*3){const [w,d]=mine[qi%mine.length];if(mine[qi%mine.length].ok){qi++;continue;}dq.setT(d.toUpperCase(),hc);hostSay(`<b>${pl[who]}</b> · ${d}`);
  const a=await ask(()=>t<=0||rid!==RUN);chk(rid);if(a===null)break;if(nrm(a)===nrm(w)){mine[qi%mine.length].ok=1;slots[ac].setC(COL.gr);ac++;ab.setT(String(ac));sfx('ok');piece.setT(w,COL.gr);await wait(.6,rid);piece.setT(bl?'…'+frag:frag+'…',hc);}else{sfx('error');who=(who+1)%3;say(`Pasa a <b>${pl[who]}</b>`);}qi++;}
 run=false;say();chk(rid);sfx('winner');GAME.sec[0]+=ac*5;GAME.ac[0]+=ac;await rotulo(`${bl?'AZUL':'NARANJA'}: ${ac} ACIERTOS · +${ac*5} s`,hc,rid);clearG();
 const c=await cpuTurn('Rival',bl?COL.or:COL.bl,.6,rid);GAME.sec[1]+=c*5;await rotulo(`${bl?'NARANJA':'AZUL'}: ${c} ACIERTOS · +${c*5} s`,bl?COL.or:COL.bl,rid);clearG();}
CORT.antes={title:['Antes y','Después'],tx:0,ty:0,fs:72};
if(!ETAPAS[2007].pr.some(p=>p[0]=='antes')){ETAPAS[2007].pr.unshift(['antes',antes07]);ETAPAS[2007].names='Antes y Después, '+ETAPAS[2007].names;}
DBG.antes07=antes07;
})();
