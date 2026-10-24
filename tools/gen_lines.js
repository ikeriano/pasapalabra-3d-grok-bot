const fs=require('fs');const W='/workspace/pp3d/app/www/';global.window=global;
eval(['data.js','data2.js'].map(f=>fs.readFileSync(W+f,'utf8').replace(/^var /mg,'global.')).join('\n')+fs.readFileSync(W+'v05data.js','utf8'));
const L=new Set();const add=s=>L.add(s);const cap=d=>d.charAt(0)+d.slice(1).toLowerCase();
const LET='ABCDEFGHIJLMNÑOPQRSTUVXYZ';const norm=s=>s.toUpperCase().replace(/Ñ/g,'#').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/#/g,'Ñ');
// programa
['¡Hola, hola! Bienvenidos a <b>Pasapalabra</b>. ¡Hoy jugamos el equipo <b>azul</b> contra el equipo <b>naranja</b>!','Y en el bote hoy hay…','Equipo <b>azul</b>: ¡tú y tu invitada!','Equipo <b>naranja</b>: ¡nuestro rival!','¡Rosco completo! ¡Enhorabuena, campeón!','¡Hasta mañana! ¡Pasapalabra!','<b>¡¡HAS GANADO EL BOTE!!</b> 🎉',
'Comenzamos, primera prueba, <b>Una de Cuatro</b>','Seguimos jugando, <b>pista musical</b>','Nos vamos a la <b>Sopa de Letras</b>','Última prueba, últimos segundos en juego, vamos a <b>¿Dónde Están?</b>','Vamos al <b>Rosco</b> final de Pasapalabra','Empezamos con la <b>Silla Azul</b>',
'¡Llega <b>El Rosco</b>! 25 letras. Si dudas, di <b>«Pasapalabra»</b> y vuelves a ella después.','<b>«¡Pasapalabra!»</b>','Naranja responde: <b>…</b>',
'<b>La Escalera</b>: empezamos con 7 letras y cada palabra tiene una letra menos. ¡Baja la escalera!','<b>La Palabra Imposible</b>: palabras raras y parecidas. Toca la que corresponde a la definición.',
'<b>¡Has pulsado tú!</b> Escribe la respuesta.','<b>Pulsa el equipo naranja…</b>','¡Rebote para el otro equipo!',
'<b>Letra a letra</b>: las letras de la palabra aparecen una a una. ¡Escríbela en cuanto la sepas!','<b>La Pista musical</b>: van saliendo pistas. ¡Pulsa en cuanto sepas la respuesta!','<b>La Pista</b>: van saliendo pistas, cada una más fácil. ¡Pulsa antes que tu rival!',
'<b>Palabras Cruzadas</b>: toca una sílaba de la izquierda y otra de la derecha para formar la palabra de la definición.','<b>¿Qué es Qué?</b>: cinco palabras curiosas. Toca la palabra que corresponde al significado iluminado.','<b>Coco Loco</b>: la palabra está escondida. Cada vez que explota un globo aparece una letra. ¡Adivínala cuanto antes!',
'¡Memoriza! 👀','¡Todas encontradas!','<b>La Silla Azul</b>: elige una de las dos letras y responde. ¡Quien falle dos preguntas, deja la silla!','¡Te quedas en la <b>Silla Azul</b>! ¡Bien hecho!','¡El rival se queda en la silla! Pero tú sigues jugando, ¡ánimo!','¡Empate! ¡Seguimos los dos!',
'¡Muy bien!','¡Correcto!','¡Eso es!','¡Perfecto!','¡Bravo!','¡Oh, no!'].forEach(add);
for(let n=0;n<=25;n++){add(`¡Ganas el programa con <b>${n}</b> aciertos! ¡Mañana vuelves a por el bote!`);add(`¡Gran rosco, con <b>${n}</b> aciertos! ¡Mañana más y mejor!`);}
// rosco + silla
const LS='ABCDEFGHIJLMNOPRSTUVZ'.split('');
ORIG.ROS.forEach((a,i)=>a.forEach(([ans,def])=>{const Lt=LET[i],st=norm(ans[0]).startsWith(Lt);add(`<b>${st?'Empieza por':'Contiene la'} ${Lt}:</b> ${cap(def)}`);add(`La respuesta correcta: <b>${ans[0]}</b>`);add(`Naranja responde: <b>${ans[0]}</b>`);}));
add('¿Qué letra eliges?');
LS.forEach(l=>add(`El rival elige la <b>${l}</b>`));
// 2007
ORIG.ESC.flat().forEach(([w,,d])=>{add(`${d} <b>(${w.length} letras)</b>`);add(`Era <b>${w}</b>.`);});
ORIG.PUL.forEach(([t,qs])=>{add(`<b>El Pulsador</b>: pulsa antes que tu rival y acierta. Tema: <b>${t}</b>.`);qs.forEach(([q,a])=>{add(q);const A=a.toUpperCase();add(`La respuesta era <b>${A}</b>.`);add(`Naranja responde: <b>${A}</b>`);add(`La respuesta: <b>${A}</b>.`);add(`¡<b>${A}</b>! Punto para el equipo azul.`);add(`¡<b>${A}</b>! Punto para el equipo naranja.`);});});
ORIG.PAR.forEach(([t,ps])=>{add(`<b>De Par en Par</b>: toca la barra que forma pareja con el dato de abajo. Tema: <b>${t}</b>.`);ps.forEach(([n,c])=>add(cap(c)));});
ORIG.IMP.flat().forEach(([w,d])=>add(d));
// 2011-2019
D2.LAL.forEach(([w,d])=>{add(`${d} <b>(${w.length} letras)</b>`);add(`Era <b>${w}</b>. ¡A por la siguiente!`);});
D2.COCO.forEach(([w,d])=>{add(`${d} <b>(${w.length} letras)</b>`);add(`¡<b>${w}</b>!`);add(`Era <b>${w}</b>. ¡Vamos con otra!`);});
[...D2.PISTA,...D2.PISTAM].forEach(([a,cl])=>{cl.forEach(add);add(`Era <b>${a}</b>.`);add(`Naranja responde: <b>${a}</b>`);add(`La respuesta: <b>${a}</b>.`);for(const p of [1,2,3,4])for(const e of['azul','naranja'])add(`¡<b>${a}</b>! ${p} ${p>1?'puntos':'punto'} para el equipo ${e}.`);});
D2.CRUZ.forEach(([a,b])=>add(`¡<b>${a}${b}</b>!`));
D2.QEQ.flat().forEach(([w])=>add(`Era <b>${w}</b>.`));
D2.U4.forEach(([t,o,qs])=>{add(`<b>Una de Cuatro</b>: cada definición corresponde a una de las cuatro respuestas. Tema: <b>${t}</b>.`);qs.forEach(q=>add(`${q[0]}…`));});
D2.SOPA.forEach(([t,ws])=>{add(`<b>Sopa de Letras</b>: busca las palabras del tema <b>${t}</b>. Desliza el dedo desde la primera hasta la última letra.`);ws.forEach(w=>add(`¡<b>${w}</b>!`));});
D2.DONDE.forEach(([t,ws])=>{add(`<b>¿Dónde Están?</b>: memoriza las nueve palabras de <b>${t}</b>. Luego se esconden tras los números: ¡toca dónde está cada una!`);ws.forEach(w=>add(`¿Dónde está <b>${w}</b>?`));});
// v05b: especiales, temáticas, promos, monólogos, tomas falsas
{const s5=fs.readFileSync(W+'v05lines.js','utf8');const L5=eval('('+s5.slice(s5.indexOf('const L5=')+9,s5.indexOf(']]};')+3)+')');
 L5.TEMAS.forEach(t=>t.saludo&&add(t.saludo));Object.values(L5.ESP).forEach(E=>{E.intro.forEach(add);(E.players||[]).forEach(n=>add(L5.ESPL[0]+' <b>'+n+'</b>'));if(E.prize)add(L5.ESPL[7]+' <b>'+E.prize+'</b>');});
 L5.ESPL.forEach(add);L5.PROMOS.forEach(p=>add(p[1]));L5.NORMAS.forEach(add);L5.PUBLICO.forEach(add);L5.TOMAS.forEach(t=>add(t[0]));
 ['Primera prueba: <b>La pista</b>','Ahora, <b>Letra a letra</b>','Primera prueba: <b>Palabras cruzadas</b>','Seguimos con <b>¿Dónde están?</b>','Y ahora, ¡<b>El Rosco</b>!'].forEach(add);}
{const s5=fs.readFileSync(W+'v05lines.js','utf8');const PM5=eval('('+s5.slice(s5.indexOf('const PM5=')+10,s5.indexOf('];',s5.indexOf('const PM5='))+1)+')');const PML5=eval('('+s5.slice(s5.indexOf('const PML5=')+11,s5.indexOf('};',s5.indexOf('const PML5='))+1)+')');
 add(PML5.intro);PML5.turnos.forEach(add);PML5.pistas.forEach(add);add(PML5.rebote);PM5.forEach(([i,a,d,o])=>{add(d);add('«'+o+'»');add(`¡Correcto! Era <b>${a}</b>.`);add(PML5.nadie+` Era <b>${a}</b>.`);});}
// historia
const src=fs.readFileSync(W+'v05.js','utf8');const h=eval(src.slice(src.indexOf('const HIST5=')+12,src.indexOf('];',src.indexOf('const HIST5='))+1));
const out={};const key=s=>s.replace(/<[^>]*>/g,'').replace(/^Presentador:\s*/,'').replace(/\s+/g,' ').trim();
const NM={A:'a',B:'be',C:'ce',D:'de',E:'e',F:'efe',G:'ge',H:'hache',I:'i',J:'jota',L:'ele',M:'eme',N:'ene','Ñ':'eñe',O:'o',P:'pe',Q:'cu',R:'erre',S:'ese',T:'te',U:'u',V:'uve',X:'equis',Y:'i griega',Z:'zeta'};
const tts=k=>k.replace(/(Empieza por|Contiene la|elige la|Letra) ([A-ZÑ])\b/g,(m,a,b)=>a+' '+NM[b]).replace(/<b>|<\/b>/g,'').replace(/: ([A-ZÑ]) o ([A-ZÑ])\?/,(m,a,b)=>': '+NM[a]+' o '+NM[b]+'?').replace(/ \(([0-9]+) letras\)/,', de $1 letras.').replace(/👀|🎉|«|»/g,'').replace(/…$/,'.').replace(/^…$/,'').replace(/\bS\.A\./,'S A').replace(/MCQUEEN/g,'Mac Kuin').replace(/\b[A-ZÁÉÍÓÚÜÑ]{2,}(?: [A-ZÁÉÍÓÚÜÑ.0-9]+)*\b/g,m=>m.toLowerCase()).replace(/300\.000/g,'trescientos mil').replace(/25\.000/g,'veinticinco mil').replace(/1\.200/g,'mil doscientos').replace(/6\.000/g,'seis mil').replace(/1\.000/g,'mil').replace(/2011/g,'dos mil once').replace(/\bDJ\b/gi,'di yei').trim();
for(const s of L){const k=key(s);if(k.replace(/[^A-Za-zÁ-úñÑ0-9]/g,'')==='')continue;out[k]=tts(k);}
h.forEach(([s,t])=>{out[key(s)]=t||tts(key(s));});
fs.writeFileSync('/workspace/pp3d/v05/lines.json',JSON.stringify(out,null,0));console.log(Object.keys(out).length);
