/* v0.30 · Paquete «Ahora Caigo 1.69» para Pasapalabra 3D · guiones (🆕 INVENTADO salvo «La historia», que es real)
   Formato: escena {t:título, cat:categoría, lugar:'plato'|'maquillaje'|..., L:[[quién, frase, acción?]]}
   acción: 'spot:<quién>' foco · 'falsa' sello TOMA FALSA · 'aplauso' · 'conf' confeti · 'cam:<plano>' · 'off' sin foco */
window.CAST30={
 pres:{n:'Presentador',v:'davefx'}, off:{n:'Voz en off',v:'davefx@0.92'},
 lola:{n:'Lola · directora',v:'mls_10246',shirt:0x7a2b6a,hair:0x2a1810,long:1},
 paco:{n:'Paco · regidor',v:'carlfm',shirt:0x222831,hair:0x3a2a1a},
 nuria:{n:'Nuria · maquillaje',v:'sharvard:1',shirt:0xf2a0c0,hair:0x6a3a1a,long:1},
 marta:{n:'Marta · peluquería',v:'sharvard:1@1.12',shirt:0x40b0a0,hair:0xc08a3a,long:1},
 julia:{n:'Julia · vestuario',v:'mls_10246@1.15',shirt:0xe8c040,hair:0x1a1410,long:1},
 sergio:{n:'Sergio · realizador',v:'sharvard:0@1.08',shirt:0x2a4a8a,hair:0x1a1410},
 ines:{n:'Inés · redactora',v:'mls_10246@0.88',shirt:0x8a5ad0,hair:0x4a2a1a,long:1},
 rober:{n:'Rober · sonido',v:'carlfm@0.93',shirt:0x3a6a3a,hair:0x2a1a10},
 toni:{n:'Toni · decorados',v:'sharvard:0@0.88',shirt:0xd06a20,hair:0x6a5a4a},
 nacho:{n:'Nacho · guionista',v:'sharvard:0@1.07',shirt:0x5a5a6a,hair:0x2a1a10},
 carmen:{n:'Carmen · recepción',v:'mls_9972@1.07',shirt:0x1a3c9a,hair:0x3a2a1a,long:1},
 ana:{n:'Ana · concursante',v:'sharvard:1@0.90',seat:'cpu'},
 dani:{n:'Dani · concursante',v:'carlfm@1.14',seat:'ply'}
};
window.S30={
making:[
 {t:'Llegada al estudio',cat:'🎬 MAKING OF',lugar:'recepcion',L:[
  ['off','Así se hace Pasapalabra 3D. Son las ocho de la mañana y el estudio se despierta.'],
  ['carmen','¡Buenos días! Aquí tenéis vuestras acreditaciones. Bienvenidos a Showtime TV.'],
  ['dani','¡Buenos días! Estoy muy contento de estar aquí.'],
  ['ana','Yo también. He repasado el abecedario en el tren.'],
  ['carmen','Seguid las flechas azules hasta la sala de espera. ¡Que os vaya genial!']]},
 {t:'Montaje del decorado',cat:'🎬 MAKING OF',lugar:'plato',L:[
  ['toni','Encendemos el rosco por partes. Primero la A, luego todas las demás letras.'],
  ['lola','Toni, ¿cómo va el decorado?'],
  ['toni','Perfecto, Lola. Las luces azules ya funcionan y el suelo está brillante.'],
  ['sergio','Prueba de cámaras. Cámara uno al presentador, cámara dos a los equipos.','cam:wide'],
  ['lola','¡Precioso! Así da gusto empezar el día.']]},
 {t:'Maquillaje y peluquería',cat:'🎬 MAKING OF',lugar:'maquillaje',L:[
  ['nuria','Un poco de polvo para que la luz del plató no haga brillos.'],
  ['pres','Nuria, eres una artista. Parezco recién salido de vacaciones.'],
  ['marta','Y ahora el peinado. Un toque de laca y listo.'],
  ['pres','Gracias, Marta. Con este pelo, el rosco va a salir redondo.'],
  ['julia','Tu chaqueta está planchada y esperándote en el vestuario.']]},
 {t:'Ensayo del rosco',cat:'🎬 MAKING OF',lugar:'plato',L:[
  ['paco','Ensayo general. Concursantes, a sus sitios, por favor.'],
  ['lola','Vamos a elegir quién empieza el ensayo. ¿Ana o Dani?'],
  ['lola','¡Empieza Ana! El foco ya la está buscando.','spot:ana'],
  ['ana','¡Qué emoción! Con la A, alegría.','spot:ana'],
  ['pres','¡Muy bien! Ahora Dani: con la B, bote.','spot:dani'],
  ['dani','¡Bote! Me encanta esa palabra.','spot:dani'],
  ['rober','Los micros suenan de maravilla.','off']]},
 {t:'Cuenta atrás',cat:'🎬 MAKING OF',lugar:'plato',L:[
  ['paco','¡Público, muchas gracias por venir! Cuando yo levante la mano, aplausos fuertes.'],
  ['sergio','Grabamos en cinco, cuatro, tres…','cam:front'],
  ['pres','¡Hola, hola! ¡Bienvenidos a Pasapalabra!','aplauso'],
  ['off','Y así empieza otro programa. Todo el equipo trabaja junto para que sea especial.','conf']]}
],
entresijos:[
 {t:'Las preguntas del rosco',cat:'🔍 ENTRESIJOS',lugar:'redaccion',L:[
  ['ines','Cada definición del rosco se comprueba tres veces en dos diccionarios.'],
  ['nacho','Y siempre tenemos preguntas de reserva por si una se repite.'],
  ['ines','Lo más difícil es la Ñ. Hay pocas palabras, así que buscamos con mucho cariño.'],
  ['nacho','Mi favorita es «contiene la X». Siempre da sorpresas.']]},
 {t:'El casting',cat:'🔍 ENTRESIJOS',lugar:'espera',L:[
  ['lola','En el casting buscamos personas a las que les encanten las palabras.'],
  ['ana','Me hicieron un rosco pequeño de práctica. ¡Me lo pasé muy bien!'],
  ['dani','Y me preguntaron por mis aficiones. Les conté que colecciono diccionarios.'],
  ['lola','Lo importante es disfrutar y jugar con buen humor.']]},
 {t:'El decorado por dentro',cat:'🔍 ENTRESIJOS',lugar:'plato',L:[
  ['toni','El rosco tiene veinticinco letras. Cada una es una luz que cambia de color.'],
  ['toni','Verde si aciertas, rojo si fallas y azul si dices pasapalabra.','cam:rosco'],
  ['sergio','Desde control vemos el plató con muchas cámaras a la vez.'],
  ['toni','Montar el decorado completo lleva casi dos días.']]},
 {t:'La sala de control',cat:'🔍 ENTRESIJOS',lugar:'control',L:[
  ['sergio','Esta es la sala de control. Aquí elijo qué cámara se ve en cada momento.'],
  ['rober','Y yo cuido el sonido: los micros, la música y los aplausos.'],
  ['sergio','Cuando un concursante va a ganar el bote, preparamos el plano más bonito.'],
  ['rober','¡Y la música sube para que todos lo celebremos!','conf']]},
 {t:'El regidor',cat:'🔍 ENTRESIJOS',lugar:'plato',L:[
  ['paco','El regidor es como un director de orquesta, pero con cascos.'],
  ['paco','Hago señales al presentador: más despacio, más deprisa, sonríe.'],
  ['pres','Paco es el que más sabe de este programa. ¡Lo ha visto todo!'],
  ['paco','¡Y todavía me emociono cuando alguien completa el rosco!','aplauso']]}
],
entrenamientos:[
 {t:'Calentamiento con la A',cat:'🏋️ ENTRENAMIENTO',lugar:'plato',L:[
  ['pres','Entrenamiento antes de grabar. ¡Sin presión, solo para divertirse!'],
  ['pres','Ana, con la A: árbol que da aceitunas.','spot:ana'],
  ['ana','¿Olivo? Ay, no, que empieza por O… ¡Aceituno!','spot:ana'],
  ['pres','¡Aceituno! ¡Correcto, Ana! Muy bien pensado.','aplauso'],
  ['pres','Dani, con la C: animal que da leche.','spot:dani'],
  ['dani','¡Cabra! O vaca… ¡Cabra!','spot:dani'],
  ['pres','¡Correcto! ¡Bravo!','aplauso']]},
 {t:'Practicar los segundos',cat:'🏋️ ENTRENAMIENTO',lugar:'plato',L:[
  ['lola','Hoy entrenamos para responder rápido. Respirad hondo.'],
  ['dani','Mi truco es decir pasapalabra en cuanto dudo.','spot:dani'],
  ['ana','El mío es imaginar la palabra escrita en el aire.','spot:ana'],
  ['lola','¡Los dos trucos son estupendos!']]},
 {t:'Ensayo de La Escalera',cat:'🏋️ ENTRENAMIENTO',lugar:'plato',L:[
  ['pres','La escalera: cada palabra tiene una letra menos. Tirón, trío, tío.'],
  ['ana','¡Qué divertido! Es como quitar piezas de un puzle.','spot:ana'],
  ['dani','Yo me lo imagino como bajar escalones.','spot:dani'],
  ['pres','¡Así se aprende! Los dos lo habéis hecho genial.','conf']]},
 {t:'Ensayo con el público',cat:'🏋️ ENTRENAMIENTO',lugar:'plato',L:[
  ['paco','Público, vamos a ensayar los aplausos. ¡Muy fuerte!','aplauso'],
  ['paco','¡Perfecto! Ahora más suave, como si fuera un susurro.'],
  ['pres','Este público es el mejor de toda la temporada.'],
  ['paco','¡Ensayo superado! Todos sobresaliente.','conf']]}
],
fuera:[
 {t:'La cafetería',cat:'🎥 FUERA DE CÁMARAS',lugar:'cafeteria',L:[
  ['rober','Un café con leche, por favor. Hoy me toca un día largo.'],
  ['nacho','He traído bizcocho para todo el equipo.'],
  ['pres','¡Nacho, eres el mejor! Este bizcocho merece un bote.'],
  ['nacho','Lo hizo mi madre. Le encanta el programa.']]},
 {t:'Pasillo de los platós',cat:'🎥 FUERA DE CÁMARAS',lugar:'pasillo',L:[
  ['julia','¡Corre, que la chaqueta del presentador va camino del plató!'],
  ['toni','Tranquila, Julia, que llegamos a tiempo.'],
  ['julia','Siempre llegamos a tiempo, pero me gusta correr un poquito.'],
  ['toni','¡Pues hacemos una carrera hasta la puerta!']]},
 {t:'Camerinos',cat:'🎥 FUERA DE CÁMARAS',lugar:'camerinos',L:[
  ['pres','En el camerino repaso el guion y escucho música tranquila.'],
  ['ana','¿Puedo pasar? Solo quería darte las gracias por el ensayo.'],
  ['pres','¡Claro que sí! Gracias a ti por venir con tanta ilusión.'],
  ['ana','¡Hasta luego en el plató!']]},
 {t:'Después del programa',cat:'🎥 FUERA DE CÁMARAS',lugar:'plato',L:[
  ['lola','¡Qué programa tan bonito! Gracias a todos.'],
  ['sergio','Las cámaras se van a dormir. ¡Buenas noches, cámara uno!'],
  ['dani','Ha sido uno de los mejores días de mi vida.','spot:dani'],
  ['pres','¡Para nosotros también! Te esperamos mañana.','conf']]}
],
oculta:[
 {t:'La tarta sorpresa',cat:'📹 CÁMARA OCULTA',lugar:'plato',L:[
  ['off','Cámara oculta. El equipo prepara una sorpresa para Paco, el regidor.'],
  ['lola','Paco, ¿puedes revisar esa caja de luces de ahí detrás?'],
  ['paco','Claro, Lola. ¿Esta caja? Qué raro, pesa muy poco.'],
  ['nuria','¡Sorpresa! ¡Feliz aniversario, Paco! ¡Diez años con nosotros!','conf'],
  ['paco','¡Pero bueno! ¡Qué equipo tan maravilloso tengo!','aplauso']]},
 {t:'El rosco que canta',cat:'📹 CÁMARA OCULTA',lugar:'plato',L:[
  ['off','Sergio ha programado el rosco para que suene una canción cuando el presentador entre.'],
  ['pres','Buenos días a todos… ¿qué es esa música?'],
  ['sergio','¡Es el rosco, que hoy está muy contento!'],
  ['pres','¡Me encanta! Que suene en todos los programas.','aplauso']]},
 {t:'El concursante invitado',cat:'📹 CÁMARA OCULTA',lugar:'espera',L:[
  ['off','Dani cree que viene a un ensayo normal. Pero hoy le espera alguien especial.'],
  ['carmen','Dani, te esperan en la sala de espera.'],
  ['dani','¿Quién será?'],
  ['pres','¡Hola, Dani! He venido a desearte mucha suerte en persona.'],
  ['dani','¡No me lo puedo creer! ¡Muchísimas gracias!','conf']]}
],
tomas:[
 {t:'La palabra trabalenguas',cat:'😂 TOMAS FALSAS',lugar:'plato',L:[
  ['pres','Con la T: tres tristes tigres tragaban trigo en un tri… trigal… tigral…'],
  ['pres','¡Ay, que se me ha enredado la lengua!','falsa'],
  ['paco','¡Vamos otra vez!'],
  ['pres','Tres tristes tigres tragaban trigo en un trigal. ¡Toma ya!','aplauso']]},
 {t:'El pulsador rebelde',cat:'😂 TOMAS FALSAS',lugar:'plato',L:[
  ['dani','¡Lo sé, lo sé!','spot:dani'],
  ['dani','Ay, he pulsado el botón de mi compañera.','falsa'],
  ['paco','¡Vamos otra vez!'],
  ['dani','Ahora sí. ¡Lo sé!','spot:dani'],
  ['pres','¡Perfecto, Dani!','aplauso']]},
 {t:'La silla giratoria',cat:'😂 TOMAS FALSAS',lugar:'plato',L:[
  ['ana','Con la G: girar. Como esta silla que no para de girar.','spot:ana'],
  ['ana','¡Que me voy a dar la vuelta entera!','falsa'],
  ['paco','¡Vamos otra vez!'],
  ['ana','Con la G: girar. Esta vez sin moverme.','spot:ana'],
  ['pres','¡Muy bien! La silla y tú, campeonas.','aplauso']]},
 {t:'El estornudo',cat:'😂 TOMAS FALSAS',lugar:'plato',L:[
  ['pres','Y en el bote hoy hay… ¡achís!'],
  ['nuria','Perdona, es el polvo del maquillaje.','falsa'],
  ['paco','¡Vamos otra vez!'],
  ['pres','Y en el bote hoy hay… ¡un montón de ilusión!','conf']]},
 {t:'El bote que no cabía',cat:'😂 TOMAS FALSAS',lugar:'plato',L:[
  ['pres','El bote de hoy es de… novecientos noventa y nueve mil novecientos… uy, qué largo.'],
  ['sergio','Es tan largo que no cabe en la pantalla.','falsa'],
  ['paco','¡Vamos otra vez!'],
  ['pres','¡El bote de hoy es enorme! Y con eso lo decimos todo.','aplauso']]}
],
historia:[
 {t:'La historia de Pasapalabra',cat:'📜 LA HISTORIA',lugar:'plato',real:1,L:[
  ['pres','Os voy a contar la historia de Pasapalabra. ¡Poneos cómodos!'],
  ['pres','Pasapalabra nació en el Reino Unido, en un concurso de la tele británica llamado The Alphabet Game.'],
  ['pres','En España se estrenó en Antena 3 el veinticuatro de julio del año dos mil, presentado por Silvia Jato.'],
  ['pres','Al principio el rosco se jugaba en un plató con un gran arco azul y letras doradas.'],
  ['pres','Durante unas semanas de dos mil dos lo presentó Constantino Romero, y después volvió Silvia Jato.'],
  ['pres','En dos mil seis lo presentó Jaime Cantizano, también en Antena 3.'],
  ['pres','En dos mil siete Pasapalabra se mudó a Telecinco, con Christian Gálvez como presentador.'],
  ['pres','Allí nacieron pruebas como La Escalera, La Pista y Coco Loco, y el rosco se hizo todavía más famoso.'],
  ['pres','En dos mil diecinueve el programa se despidió de Telecinco.'],
  ['pres','Y el trece de mayo de dos mil veinte volvió a Antena 3, con Roberto Leal.'],
  ['pres','Desde entonces, muchos rosqueros se han llevado botes enormes y nos han hecho aplaudir muchísimo.'],
  ['pres','Y la historia sigue cada tarde, con el rosco, las letras y mucha ilusión.','conf'],
  ['pres','¡Gracias por escuchar la historia de Pasapalabra!','aplauso']]}
]
};
/* v0.30 · ESPECIAL HALLOWEEN detrás de las cámaras · 🆕 INVENTADO (todo en tono divertido y positivo) */
Object.assign(window.S30,{
hw_making:[
 {t:'Decoramos el plató para Halloween',cat:'🎃 MAKING OF HALLOWEEN',lugar:'plato',L:[['toni','¡Buenos días! Hoy convertimos el plató en una casa encantada de broma.','spot:toni'],['toni','Calabazas a los lados del atril, y telarañas de algodón en las gradas.'],['lola','Las luces van en morado y naranja. ¡Que se vea desde la calle!','cam:wide'],['sergio','Probamos la luz morada en la cámara tres… ¡qué bonita queda!'],['pres','¡Me encanta! Parece un castillo, pero un castillo muy simpático.','aplauso']]},
 {t:'Ensayo con disfraces',cat:'🎃 MAKING OF HALLOWEEN',lugar:'plato',L:[['paco','¡Atención, ensayo con disfraces en cinco, cuatro, tres!','spot:paco'],['ana','Voy de bruja buena. Mi escoba solo barre respuestas correctas.'],['dani','Y yo de vampiro, pero solo bebo zumo de tomate.'],['pres','¡Hoy el rosco da un poquito de miedo… de lo divertido que va a ser!','conf']]}],
hw_entresijos:[
 {t:'Maquillaje de Halloween',cat:'🔍 ENTRESIJOS HALLOWEEN',lugar:'maquillaje',L:[['nuria','Hoy toca maquillaje especial: una calabaza pintada en la mejilla.','spot:nuria'],['ana','¡Qué divertido! ¿Me pones también una arañita pequeña?'],['nuria','Claro. Pintura suave, que se quita con agua y no pica nada.'],['marta','Y en peluquería, un toque de laca naranja. ¡Brilla con los focos!']]},
 {t:'El vestuario del especial',cat:'🔍 ENTRESIJOS HALLOWEEN',lugar:'camerinos',L:[['julia','Este es el armario de Halloween: capas, sombreros de bruja y orejas de gato.','spot:julia'],['julia','Para el presentador, una capa morada con estrellas doradas.'],['pres','¡Me queda perfecta! Soy el mago del rosco.'],['julia','Todo es cómodo, para poder pulsar el botón sin problemas.']]},
 {t:'Las preguntas del especial',cat:'🔍 ENTRESIJOS HALLOWEEN',lugar:'redaccion',L:[['ines','Las preguntas de hoy van de calabazas, murciélagos y fantasmas simpáticos.','spot:ines'],['nacho','Con la C: hortaliza naranja que se ilumina en Halloween.'],['ines','¡Calabaza! Esa la acierta todo el mundo.']]}],
hw_fuera:[
 {t:'El fantasma del pasillo',cat:'🎥 FUERA DE CÁMARAS HALLOWEEN',lugar:'pasillo',L:[['rober','¿Habéis oído eso? Un ruido raro en el pasillo…','spot:rober'],['toni','¡Buuu! Tranquilo, Rober, soy yo con una sábana.'],['rober','¡Ja, ja! Toni, eres el fantasma más gracioso del estudio.'],['carmen','Y el que más ayuda: va recogiendo telarañas de algodón.']]},
 {t:'Merienda terrorífica',cat:'🎥 FUERA DE CÁMARAS HALLOWEEN',lugar:'cafeteria',L:[['nacho','He traído galletas con forma de calabaza para todos.','spot:nacho'],['lola','¡Qué ricas! Y estas con forma de murciélago, también.'],['pres','Las mejores galletas de la historia del programa. ¡Feliz Halloween, equipo!','conf']]}]
});
