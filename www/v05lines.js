// v0.5 — textos del presentador para especiales, temáticas, promos y monólogos (voz Piper pregenerada)
const L5={
TEMAS:[
 {id:'normal',name:'Normal',emoji:'⭐',tint:'',banner:'',saludo:''},
 {id:'halloween',name:'Halloween',emoji:'🎃',tint:'rgba(255,120,0,.16)',banner:'ESPECIAL HALLOWEEN',conf:['#ff8a00','#7a1fd0','#111'],saludo:'¡Buuu! Bienvenidos al especial de Halloween de Pasapalabra. ¡Que no os dé miedo el rosco!'},
 {id:'navidad',name:'Navidad',emoji:'🎄',tint:'rgba(255,0,30,.12)',banner:'ESPECIAL NAVIDAD',conf:['#e01020','#2fbf4a','#fff'],saludo:'¡Feliz Navidad! ¡Jo, jo, jo! Bienvenidos al especial navideño de Pasapalabra.'},
 {id:'findeano',name:'Fin de Año',emoji:'🥂',tint:'rgba(255,210,60,.14)',banner:'ESPECIAL FIN DE AÑO',conf:['#ffd23a','#fff','#c0c0c0'],saludo:'¡Bienvenidos al especial de Fin de Año! Hoy el rosco viene con uvas.'},
 {id:'verano',name:'Verano',emoji:'🏖️',tint:'rgba(0,200,255,.12)',banner:'ESPECIAL VERANO',conf:['#26c2f0','#ffd23a','#ff5fb0'],saludo:'¡Bienvenidos al especial de verano! Crema solar, gafas de sol… ¡y a por el rosco!'},
 {id:'carnaval',name:'Carnaval',emoji:'🎭',tint:'rgba(160,40,255,.14)',banner:'ESPECIAL CARNAVAL',conf:['#3dff8a','#ffd23a','#8a1fd0'],saludo:'¡Bienvenidos al especial de Carnaval! Hoy hasta las letras vienen disfrazadas.'},
 {id:'sanvalentin',name:'San Valentín',emoji:'💘',tint:'rgba(255,60,140,.14)',banner:'ESPECIAL SAN VALENTÍN',conf:['#ff3c8c','#fff','#c8102e'],saludo:'¡Feliz San Valentín! Hoy en Pasapalabra hay mucho amor… ¡por las palabras!'},
 {id:'ninos',name:'Niños',emoji:'🧸',tint:'rgba(255,230,0,.10)',banner:'ESPECIAL NIÑOS',conf:['#ff5fb0','#ffd23a','#26c2f0'],saludo:'¡Bienvenidos al especial de niños! Hoy los más peques son los campeones.'}],
// Programas especiales según el artículo de Wikipedia «Pasapalabra (España)»
ESP:{
 primetime:{name:'Edición Prime Time',sub:'Verano de 2011 · jueves por la noche · 1.000 € por segundo · rosco de 300.000 €',emoji:'🌟',banner:'EDICIÓN PRIME TIME',tint:'rgba(255,0,180,.13)',conf:['#ff2fb0','#26c2f0','#ffd23a'],
  intro:['¡Bienvenidos a la <b>Edición Prime Time</b> de Pasapalabra! ¡La noche de los jueves!','Hoy juegan los mejores concursantes que no lograron completar el rosco.','Cada segundo que acumuléis en las pruebas vale <b>1.000 euros</b>.','Y quien complete el rosco… ¡se lleva <b>300.000 euros</b>!','Tenemos DJ, bailarines y azafatas. ¡Que empiece la fiesta!']},
 familia:{name:'Pasapalabra en familia',sub:'Desde 2018 · dos familias de tres personas · Palabras cruzadas, ¿Dónde están? y El rosco',emoji:'👨‍👩‍👦',banner:'PASAPALABRA EN FAMILIA',tint:'rgba(60,200,90,.12)',conf:['#3dcc5a','#ffd23a','#2a6af0'],
  intro:['¡Bienvenidos a <b>Pasapalabra en familia</b>!','Hoy juegan dos familias, de tres personas cada una.','La familia que ganó ayer es el equipo <b>naranja</b>. La familia nueva, ¡el equipo <b>azul</b>!','En el rosco final, dos de los tres miembros de cada familia juegan por turnos.','La familia que más acierte se lleva <b>1.200 euros</b>. ¡Y con las 25, el bote!']},
 copa:{name:'Copa de maestros',sub:'Enero de 2022 · 8 maestros · cuartos, semifinales y final a rosco',emoji:'🏆',banner:'COPA DE MAESTROS',tint:'rgba(255,200,40,.13)',conf:['#ffd23a','#fff','#2a6af0'],
  players:['Marta Sierra','Susana García','Carlos Adán','María Hernanz','Fran González','Juanpe Gómez','Eduardo Benito','Antonio Ruiz'],rounds:['Primera ronda','Semifinales','Final'],tie:'tiron',
  intro:['¡Bienvenidos a la <b>Copa de maestros</b>!','Ocho grandes maestros del rosco. Y hoy, ¡tú eres uno de ellos!','Primera ronda, semifinales y final: todo se decide en el rosco.','Si hay empate a aciertos y fallos, gana quien haga el tirón de aciertos más largo.']},
 duelo:{name:'Duelo de campeones',sub:'Enero de 2023 · 8 campeones · eliminatorias a rosco',emoji:'⚔️',banner:'DUELO DE CAMPEONES',tint:'rgba(255,60,40,.13)',conf:['#ff3c28','#ffd23a','#fff'],
  players:['Nacho Mangut','Alberto Izquierdo','César Garrido','Pablo Díaz','Jero Hernández','Marta Terrasa','Rosa Nestal','Sofía Álvarez'],rounds:['Primera ronda','Semifinales','Final'],tie:'vuelta',
  intro:['¡Bienvenidos al <b>Duelo de campeones</b>!','Ocho campeones de Pasapalabra se juegan el título en el rosco.','Primera ronda, semifinales y una gran final.','Si hay empate, pasa quien tuvo más aciertos en la primera vuelta.']},
 noche:{name:'Noche de campeones',sub:'Enero de 2024 · 4 campeones · semifinales y final · premio de 25.000 €',emoji:'🌙',banner:'NOCHE DE CAMPEONES',tint:'rgba(60,80,255,.16)',conf:['#3c50ff','#ffd23a','#fff'],
  players:['Orestes Barbero','Javier Dávila','Pablo Díaz','Luis de Lama'],rounds:['Semifinales','Final'],tie:'subita',prize:'25.000 €',
  intro:['¡Bienvenidos a la <b>Noche de campeones</b>!','Cuatro campeones, semifinales y una final.','El premio para el ganador: <b>25.000 euros</b>.','Y si hay empate en la final… ¡muerte súbita!']}},
ESPL:['Tu rival en esta ronda:','¡Ganas la eliminatoria! ¡Pasas a la siguiente ronda!','¡Oh! Esta vez gana tu rival. ¡Pero ha sido un gran rosco!','¡Empate! Vamos a desempatar…','Gana quien hizo el tirón de aciertos más largo.','Pasa quien tuvo más aciertos en la primera vuelta.','¡Muerte súbita! Una pregunta cada uno, hasta que alguien falle.','¡ERES EL CAMPEÓN! ¡Enhorabuena!','¡Has completado el rosco! ¡Te llevas 300.000 euros!','Equipo azul, juega el primer miembro de la familia.','Equipo azul, ahora juega el segundo miembro de la familia.','¡Gana la familia azul! ¡1.200 euros para vosotros!','Esta vez gana la familia naranja. ¡Mañana más!','¡Hasta la próxima! ¡Pasapalabra!'],
PROMOS:[
 ['Mañana, nuevo programa','Mañana, otro programa de <b>Pasapalabra</b>. Dos equipos, cinco pruebas y un rosco final. ¡No te lo pierdas!'],
 ['El bote','El bote sigue creciendo: <b>6.000 euros</b> más cada día que nadie completa el rosco. ¿Serás tú quien se lo lleve?'],
 ['Edición Prime Time','Este jueves por la noche, <b>Edición Prime Time</b>: cada segundo vale mil euros y el rosco, trescientos mil. ¡Con DJ y bailarines!'],
 ['En familia','Llega <b>Pasapalabra en familia</b>: dos familias de tres personas se juegan el rosco. ¡Trae a tu familia!'],
 ['Campeones','Copa de maestros, Duelo de campeones y Noche de campeones: ¡los mejores del rosco, cara a cara!'],
 ['Especial Halloween','La noche de Halloween, Pasapalabra se pone el disfraz. ¡Buuu! ¡Ven si te atreves!'],
 ['Especial Navidad','Por Navidad, Pasapalabra se llena de luces, regalos… ¡y palabras!']],
NORMAS:['Bienvenidos al plató. Antes de empezar, las <b>diez normas</b> de Pasapalabra.','Norma número uno: aquí no se grita la respuesta del rosco desde el sofá. ¡Bueno, un poquito sí!','Norma número dos: si no sabes una palabra, se dice «Pasapalabra». No vale decir «paso de todo».','Norma número tres: prohibido comerse las letras. Ni siquiera la Ñ, que tiene gorrito.','Norma número cuatro: el equipo azul y el naranja se respetan. ¡Aquí somos todos amigos!','Norma número cinco: el público aplaude… pero no mientras pienso.','Norma número seis: nadie toca el bote. El bote solo se lo lleva quien acierta las veinticinco.','Norma número siete: si te equivocas, no pasa nada. ¡De los errores también se aprende!','Norma número ocho: el reloj no se para. Ni siquiera si se lo pides por favor.','Norma número nueve: se juega con buen humor. ¡Y con una sonrisa!','Y norma número diez: al final del programa, todos juntos decimos… ¡Pasapalabra!'],
PUBLICO:['¡Hola, público! ¿Qué tal estáis hoy? ¡Ese aplauso!','Os voy a contar un secreto: yo también me pongo nervioso en el rosco… ¡y eso que no juego!','A ver, los de la tercera fila: ¿quién sabe una palabra que empiece por Ñ? ¡Ñu! ¡Muy bien!','¿Sabéis por qué la letra A está tan contenta? Porque siempre es la primera.','Gracias por venir. ¡Sin vosotros esto sería un concurso… de silencio!'],
TOMAS:[['¡Bienvenidos a Pasa… Pasa… Pasacalles! ¡Uy! ¡Corten!','tropiezo'],['Empieza por A: animal que da… que da… ¿leche? No, eso es la vaca. ¡Corten!','olvido'],['¡Y en el bote hoy hay… cero euros! Perdón, que he leído el papel al revés. ¡Corten!','papel'],['Equipo naranja… ¡digo azul! ¡Es que llevo el jersey del revés! ¡Corten!','equipo'],['¿Quién ha dejado el rosco girando? ¡Me estoy mareando! ¡Corten!','mareo']]};
// LA PISTA MUSICAL — solo sintonías de programas (sin canciones cantadas). [id, respuesta, descripción (pista 4), nombre con otras palabras (pista 2)]
const PM5=[
 ['pasapalabra','Pasapalabra','Es un concurso de palabras con un rosco de veinticinco letras al final.','Salta el vocablo'],
 ['ahoracaigo','Ahora caigo','Es un concurso en el que, si fallas, se abre una trampilla bajo tus pies.','Ya me doy cuenta'],
 ['arguinano','Karlos Arguiñano en tu cocina','Es un programa de recetas con un cocinero vasco muy gracioso. ¡Rico, rico y con fundamento!','Carlos entre tus fogones'],
 ['cifras','Cifras y letras','Es un concurso de hacer cuentas con números y formar palabras con letras.','Números y abecedario'],
 ['federico','Es la mañana de Federico','Es un programa de radio de esRadio que se escucha por la mañana temprano.','Ya amanece con Federico'],
 ['karasevda','Kara Sevda','Es una telenovela turca de amor entre Kemal y Nihan.','Amor negro, en turco']];
const PML5={intro:'¡<b>La pista musical</b>! Escuchad bien: hoy adivinamos <b>sintonías de programas</b>. Cinco pistas: 5, 4, 3, 2 y 1 segundos.',
 turnos:['Primer turno: ¡las <b>invitadas</b>!','Segundo turno: ¡los <b>concursantes</b>!','Tercer turno: ¡los <b>invitados</b>!'],
 pistas:['Pista de <b>5 segundos</b>: escuchad…','Pista de <b>4 segundos</b>:','Pista de <b>3 segundos</b>: otro trocito…','Pista de <b>2 segundos</b>: el nombre, con otras palabras:','Pista de <b>1 segundo</b>: ¡último trocito!'],
 rebote:'¡No! El turno pasa al rival.',nadie:'¡Nadie lo ha acertado!'};
