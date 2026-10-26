'use strict';
// ===== v0.10 · Pasapalabra en familia · datos =====
// Mecánica según la Wikipedia (Telecinco, 16-04-2018 a 14-06-2018, Christian Gálvez); el rosco lo juegan 2 por familia: A–Ñ y O–Z (corrección de Iker).
// TODO el contenido de las pruebas (frases, definiciones, dibujos, canciones, familias y personajes) está INVENTADO para este juego.
const F10D={
 // familias ficticias del plató (3 miembros cada una)
 fam:[['Ledesma','Marta','Nacho','Lucía'],['Quintana','Raúl','Inés','Teo'],['Barrios','Elena','Gonzalo','Aitana'],['Aguirre','Maite','Joan','Noa'],['Roldán','Sergio','Paula','Dani'],['Zubiri','Amaia','Pedro','Clara'],['Montero','Rosa','Hugo','Alba'],['Salvatierra','Óscar','Nuria','Biel']],
 // He dicho: [personaje inventado, frase con ___, respuesta, 3 señuelos]
 he:[['La portera Remedios','Ojos que no ven, corazón que no ___','siente',['llora','olvida','duele']],
  ['El abuelo Anselmo','Más vale pájaro en mano que ciento ___','volando',['cantando','saltando','comiendo']],
  ['La inspectora Valdés','A caballo regalado no le mires el ___','diente',['pelo','rabo','lomo']],
  ['El chef Armando','No por mucho madrugar amanece más ___','temprano',['claro','deprisa','caliente']],
  ['Tía Encarna','Quien a buen árbol se arrima, buena ___ le cobija','sombra',['fruta','hoja','rama']],
  ['El capitán Bermúdez','Camarón que se duerme, se lo lleva la ___','corriente',['marea','ola','red']],
  ['La profesora Lola','En casa del herrero, cuchillo de ___','palo',['hierro','madera','plata']],
  ['El comisario Ferrán','Dime con quién andas y te diré quién ___','eres',['eras','serás','vienes']],
  ['La portera Remedios','Al mal tiempo, buena ___','cara',['ropa','gana','hora']],
  ['El abuelo Anselmo','Perro ladrador, poco ___','mordedor',['valiente','cobarde','bueno']],
  ['La inspectora Valdés','Cuando el río suena, agua ___','lleva',['trae','deja','corre']],
  ['El chef Armando','Genio y figura hasta la ___','sepultura',['vejez','locura','cuna']],
  ['Tía Encarna','A quien madruga, Dios le ___','ayuda',['premia','llama','mira']],
  ['La profesora Lola','El que ríe el último, ríe ___','mejor',['peor','mucho','más']]],
 // Palabras cruzadas: [definición, mitad izquierda, mitad derecha]
 cruz:[['Fruta amarilla y alargada','PLÁ','TANO'],['Ave nocturna de ojos grandes','LE','CHUZA'],['Mueble para dormir','CA','MA'],['Instrumento de seis cuerdas','GUI','TARRA'],['Animal lento con caparazón','TOR','TUGA'],['Fruto de la encina','BE','LLOTA'],['Se enciende para ver de noche','LÁM','PARA'],['Gran extensión de agua dulce rodeada de tierra','LA','GO'],['Estación más calurosa del año','VE','RANO'],['Persona que cura a los enfermos','MÉ','DICO'],['Se abre para no mojarse con la lluvia','PARA','GUAS'],['Lugar con muchos árboles','BOS','QUE']],
 // ¿Dónde están?: paneles de 9 palabras
 donde:[['PERA','LUNA','CASA','RELOJ','NUBE','PLATO','SILLA','GATO','FLOR'],['MAR','LLAVE','TREN','PAN','LIBRO','ÁRBOL','SOL','VASO','PUERTA'],['BOTA','RÍO','ZAPATO','MESA','PINO','LÁPIZ','ISLA','VELA','MONTE'],['CAFÉ','NIEVE','PIANO','COCHE','LECHE','CAMA','PLAYA','MANO','TAZA']],
 // ¿Tú qué pintas?: [tema, palabras]; las 11 primeras tienen dibujo para la CPU
 pinta:[['Naturaleza',['SOL','LUNA','ÁRBOL','FLOR','NUBE','MONTAÑA','ESTRELLA']],['Transporte',['COCHE','BARCO','BICICLETA','AVIÓN','TREN','COHETE']],['Casa y mar',['CASA','PEZ','LLAVE','PARAGUAS','RELOJ','SILLA']],['Animales',['GATO','TORTUGA','CARACOL','PÁJARO','ARAÑA','PEZ']]],
 // Esto me suena: [título, 5 pistas de la más difícil a la más fácil] (pistas inventadas, sin letras de canciones)
 suena:[['Macarena',['Es un baile de moda en los años noventa','La cantaron dos sevillanos, Los del Río','Su título es un nombre de mujer','Se baila con una coreografía de brazos y caderas','Fue un éxito mundial en el verano de 1996']],
  ['Bohemian Rhapsody',['Es una canción de rock de los años setenta','Es de un grupo británico','Dura casi seis minutos','Mezcla balada, ópera y rock duro','El cantante era Freddie Mercury, de Queen']],
  ['Thriller',['Es un éxito de 1982','Su vídeo es como una mini película de zombis','Da nombre a uno de los discos más vendidos de la historia','Su autor es conocido como el Rey del Pop','Lo canta Michael Jackson']],
  ['Despacito',['Es un éxito mundial de 2017','Es un tema de reguetón','Su título significa «poco a poco, sin prisa»','Colabora Daddy Yankee','Lo canta el puertorriqueño Luis Fonsi']],
  ['Mediterráneo',['Es de principios de los años setenta','Es de un cantautor catalán','Habla de un mar','Lo canta Joan Manuel Serrat','Su título es el nombre del mar de la costa este de España']],
  ['Y viva España',['Es una canción de 1973','Es un clásico de verano muy español','Se canta en las verbenas','Su título es un viva a nuestro país','La cantó Manolo Escobar']],
  ['We Are the Champions',['Es un himno que se canta en las celebraciones deportivas','Es de los años setenta','Es de un grupo británico','Lo cantaba Freddie Mercury','Su título dice que somos los campeones']],
  ['Gasolina',['Es un éxito del año 2004','Lanzó el reguetón al mundo','Lo canta Daddy Yankee','Su título es un combustible','Se echa en el depósito del coche']],
  ['La camisa negra',['Es un éxito del año 2005','Mezcla pop y ritmos latinos','Su cantante es colombiano: Juanes','Su título habla de una prenda','Esa prenda es de color negro']],
  ['Livin\' la vida loca',['Es un éxito de 1999','Es pop latino','Su título mezcla inglés y español','Lo canta Ricky Martin','Su título habla de vivir la vida de forma alocada']],
  ['Color esperanza',['Es un éxito de 2001','Es una canción optimista','Habla de buscar un futuro mejor y de no rendirse','Lo canta el argentino Diego Torres','Su título junta un color y un sentimiento positivo']],
  ['Bailando',['Es un éxito de 2014','Está en español y triunfó en medio mundo','Lo canta Enrique Iglesias','Colaboran Descemer Bueno y Gente de Zona','Su título es un verbo en gerundio relacionado con la danza']]],
 // La ristra: palabras
 ristra:[['MESA','PERRO','LUNA','TREN','PAN','SOL','LAGO','FLOR','CAMA'],['NUBE','LIBRO','MAR','GATO','VELA','PLATO','PINO','COCHE','RÍO'],['TAZA','ISLA','MANO','LECHE','PIANO','BOTA','NIEVE','PUERTA','LÁPIZ']]
};
// ---------- frases del presentador (con voz Piper es_ES: clips en snd/p5, tools/v10/synth10.py) ----------
const T10={
 hola:'¡Muy buenas, familia! Bienvenidos a Pasapalabra en familia.',
 dos:'Hoy se enfrentan dos familias, de tres personas cada una.',
 naranja:'Equipo naranja: la familia que ganó el programa anterior.',
 azul:'Equipo azul: la familia que llega hoy al plató.',
 meAz:'Y el equipo azul sois vosotros, la familia de casa. ¡Bienvenidos!',
 meNa:'Y el equipo naranja sois vosotros, la familia de casa. ¡Campeones!',
 dosHum:'Hoy jugáis las dos familias desde casa. Pasaos el móvil cuando os toque.',
 bote:'En el bote de hoy hay:',
 // cómo se juega (primer programa o «Cómo se juega»)
 e1:'Pasapalabra en familia se emitió en Telecinco en dos mil dieciocho, presentado por Christian Gálvez.',
 e2:'Tiene dos partes: unas pruebas para ganar segundos, y el rosco final.',
 e3:'Hay seis pruebas con palabras, dibujos y canciones, y cada acierto se convierte en segundos extra para el rosco.',

 e5:'El rosco tiene veinticinco palabras, y ochenta y cinco segundos, más los que hayáis ganado.',
 e6:'Lo juegan dos miembros de cada familia: uno, de la A a la Ñ, y el otro, de la O a la Z.',
 e7:'Empieza la familia con más segundos. Si empatan, el equipo naranja.',
 e8:'Se juega por turnos, nunca a la vez. Se sigue mientras no falles ni digas «Pasapalabra»; entonces pasa el turno.',
 e9:'Gana la familia con más aciertos. Se lleva mil doscientos euros y vuelve al siguiente programa.',
 e10:'Si empatan a aciertos, gana quien haya fallado menos. Si también empatan a fallos, seiscientos euros para cada una, y las dos vuelven.',
 e11:'Y si una familia acierta las veinticinco palabras, se lleva el bote. Cada programa que nadie se lo lleva, se suman seis mil euros más.',
 e12:'Eso sí: quien se lleva el bote no se lleva además los mil doscientos euros.',
 e13:'La familia que ganó el programa anterior es el equipo naranja, y la que entra, el equipo azul. ¡Pues a jugar!',
 recuerdo:'Ya sabéis cómo va: pruebas para ganar segundos y, después, el rosco.',
 // pruebas
 ord1:'Primera prueba.',ord2:'Segunda prueba.',ord3:'Tercera prueba.',ord4:'Cuarta prueba.',ord5:'Quinta prueba.',ord6:'Sexta y última prueba.',
 he:'«He dicho»: completad la frase de un personaje. Cada acierto suma dos segundos.',
 cruz:'«Palabras cruzadas»: formad la palabra con una mitad de cada columna. Cada acierto, tres segundos.',
 donde:'«¿Dónde están?»: veréis nueve palabras un momento, y luego se tapan. Si falláis, pasa el turno. Cada acierto, tres segundos.',
 pinta:'«¿Tú qué pintas?»: uno dibuja y los demás adivinan. Cada acierto, tres segundos.',
 suena:'«Esto me suena»: la gramola da hasta cinco pistas. Cuantas menos uséis, más segundos.',
 ristra:'«La ristra»: repetid la cadena de palabras y añadid una nueva. Quien se equivoca, termina la prueba.',
 tnaranja:'Turno del equipo naranja.',tazul:'Turno del equipo azul.',
 memo:'Memorizad bien las nueve palabras.',
 tiempo:'¡Tiempo!',
 sumaNa:'El equipo naranja suma:',sumaAz:'El equipo azul suma:',
 // rosco
 roscoIni:'Llega el rosco final: veinticinco palabras para cada familia.',
 conNa:'El equipo naranja jugará con:',conAz:'El equipo azul jugará con:',
 empNa:'Empieza el equipo naranja, que tiene más segundos.',empAz:'Empieza el equipo azul, que tiene más segundos.',empEmp:'Hay empate a segundos, así que empieza el equipo naranja.',
 j1:'Juega el primer miembro de la familia: de la A a la Ñ.',
 j2:'Ahora juega el segundo miembro: de la O a la Z.',
 fin:'¡Se acabó el rosco!',
 hitsNa:'El equipo naranja ha hecho:',hitsAz:'El equipo azul ha hecho:',
 empFal:'¡Empate a aciertos! Decide quién ha fallado menos.',
 gNa:'Gana el equipo naranja.',gAz:'Gana el equipo azul.',g12:'Se lleva mil doscientos euros, ¡y vuelve al próximo programa!',
 empTot:'¡Empate total! Se reparten los mil doscientos euros: seiscientos para cada familia, ¡y las dos vuelven al próximo programa!',
 boteNa:'¡Veinticinco aciertos! ¡Rosco completo! El equipo naranja se lleva el bote de:',
 boteAz:'¡Veinticinco aciertos! ¡Rosco completo! El equipo azul se lleva el bote de:',
 boteDos:'¡Las dos familias han completado el rosco! Se reparten el bote.',
 sube:'Hoy nadie se lleva el bote, así que sube seis mil euros. Mañana habrá en juego:',
 baja:'Y el bote vuelve a seis mil euros. ¡Hasta el próximo programa!',
 adios:'Gracias por jugar en familia. ¡Hasta el próximo programa!',
 invitados:'Equipo azul: ¡tú y tus dos invitados!'
};
F10D.famLine=F10D.fam.map(f=>`La familia ${f[0]}: ${f[1]}, ${f[2]} y ${f[3]}.`);
// dibujos de la CPU en ¿Tú qué pintas? (cuadrícula 100×100): c=círculo, e=elipse, a=arco, p=polilínea
F10D.icons={'SOL':[['c',50,50,14],...[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return ['p',50+22*Math.cos(a),50+22*Math.sin(a),50+38*Math.cos(a),50+38*Math.sin(a)];})],
 'LUNA':[['a',50,50,32,60,300],['a',64,50,26,118,242]],
 'ÁRBOL':[['p',44,60,44,92,56,92,56,60],['c',50,38,24]],
 'FLOR':[['c',50,38,8],['c',50,19,10],['c',68,31,10],['c',63,52,10],['c',37,52,10],['c',32,31,10],['p',50,48,50,92],['p',50,74,68,66,50,80]],
 'NUBE':[['c',32,56,16],['c',52,44,20],['c',70,56,15],['p',32,72,70,71]],
 'MONTAÑA':[['p',8,86,38,28,58,60,74,40,93,86,8,86]],
 'ESTRELLA':[['p',50,8,61,38,92,38,67,57,77,90,50,70,23,90,33,57,8,38,39,38,50,8]],
 'COCHE':[['p',8,66,8,50,30,47,40,32,66,32,78,47,93,52,93,66,8,66],['c',29,68,9],['c',72,68,9]],
 'BARCO':[['p',14,60,86,60,72,82,28,82,14,60],['p',50,60,50,14],['p',50,18,50,56,80,56,50,18]],
 'PEZ':[['e',44,50,28,17],['p',70,50,92,34,92,66,70,50],['c',30,45,2.4]],
 'CASA':[['p',14,90,14,50,50,18,86,50,86,90,14,90],['p',42,90,42,64,58,64,58,90],['p',66,56,78,56,78,68,66,68,66,56]]};
