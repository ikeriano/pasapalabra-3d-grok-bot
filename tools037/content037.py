import json,random,re
from pathlib import Path
R=Path('/workspace/pasapalabra037'); C=json.loads((R/'catalogo037.json').read_text());lines={}
def add(k,text,who='Christian'):
 lines[k]=dict(text=text,who=who,src='voz037/'+k+'.ogg');return k
# Todas las intervenciones son ficción del avatar, nunca una grabación ni una imitación del presentador real.
common=[
'¡Seguimos juntos, Iker! Puedes probar a responder antes que ellos.',
'Cada palabra cuenta. Y si no sale, pasapalabra y a por la siguiente.',
'¡Qué gusto volver a ver la etapa de Telecinco en nuestro plató!',
'Yo me quedo aquí contigo; no hace falta acertarlas todas para disfrutar.',
'El equipo naranja y el azul van reuniendo segundos para el rosco.',
'¡Ojo a la pantalla! Tú también puedes jugar desde el sofá.',
'La gracia está en intentarlo. Una respuesta difícil no estropea el programa.',
'¿Has pensado una respuesta? Guárdala y compárala con la del concurso.',
'Yo soy el avatar del juego. Estos comentarios los hemos inventado para acompañarte.',
'¡Vaya ritmo! Si quieres fijarte mejor, tienes la pausa abajo.',
'El vídeo continúa completo. Puedes apagar mis comentarios sin cortar el programa.',
'Las letras dan para mucho. A veces la palabra está en la punta de la lengua.',
'¡Vamos con calma! Aquí cada concursante tiene su manera de pensar.',
'Puedes mover la barra y volver a cualquier momento del programa.',
'Los dos colores ayudan a seguir los turnos de los equipos.',
'A mí me gusta ver cómo se ayudan entre compañeros.',
'¡Seguimos! Cuando una no sale, la siguiente puede dar una alegría.',
'Fíjate en las respuestas y en las reacciones. Hay juego para todos.',
'No voy a adelantar el resultado. Mejor descubrirlo juntos.',
'En nuestro chat puedes hablar con los personajes mientras miramos.',
'Este programa sigue su duración original; no es un resumen.',
'¡A por otra palabra! Un poquito de memoria y otro poquito de intuición.',
'La pantalla del plató es nuestra ventana a estos programas.',
'¡Buen intento! Acertar está muy bien, pero pasarlo bien también cuenta.',
'Puedes activar los avatares dentro de la imagen cuando te apetezca.',
'Los comentarios bajan un poco el sonido del vídeo y después lo recuperan.',
'¡Qué de palabras caben en un programa! Seguimos sin prisas.',
'Cada cual a su ritmo. Aquí puedes pausar siempre que quieras.',
'¡Seguimos atentos! Una pista pequeña puede abrir una respuesta grande.',
'El próximo turno puede cambiarlo todo. Vamos a verlo.',
]
for i,t in enumerate(common):add(f'com{i:02}',t)
add('entrada','¡Hola, Iker! Vamos a ver el vídeo entero en la pantalla de nuestro plató. Te acompaño con comentarios inventados.')
add('salida','¡Hemos llegado al final! Gracias por verlo conmigo. Puedes repetirlo o elegir otro vídeo.')
add('inicio-prueba','Vamos a ver la prueba completa. Mira los grafismos y los turnos; yo te acompaño con comentarios inventados.')
anchors={
'c06yoItjk3s':[(20,'¡Christian empieza el especial de Nochevieja! Esta vez celebramos el cambio de año con palabras.'),(200,'En las opciones del equipo naranja aparecen nombres de actrices y cantantes. ¡Hay que elegir bien!'),(380,'El equipo azul tiene nombres como Rafa Nadal entre sus opciones. Fíjate en la pista de arriba.'),(560,'¡Gafas de dos mil diecinueve! La Pista también se viste de fiesta esta Nochevieja.'),(740,'Ahora vemos una vista amplia del plató y a los equipos alrededor de la mesa.'),(920,'El público se levanta y celebra. ¡Se nota el ambiente de fiesta!'),(1100,'En la sopa de letras aparece la pista: relativo al mantecado. ¡A buscarla!'),(1280,'¡Qué plano desde arriba! Se ve la mesa redonda y el rosco de luces del plató.'),(1460,'Ahora están las nueve posiciones numeradas de Dónde están. Hay que acordarse del orden.'),(1640,'¡Un abrazo en el plató! Aquí también hay sitio para los momentos de cariño.'),(1820,'En las pantallas se lee feliz año nuevo. Ya estamos en la parte final del especial.'),(2000,'El rosco del concursante azul ya tiene bastantes letras verdes. Seguimos sin adelantar el resultado.'),(2180,'Ahora vemos el rosco de la concursante naranja. Cada letra tiene su oportunidad.'),(2360,'En el plano general se ven los dos atriles y la gran esfera de letras.'),(2540,'La concursante naranja sigue pensando sus palabras del rosco. ¡Concentración!'),(2720,'Quedan pocas letras por resolver en el rosco naranja. ¡Qué emoción!'),(2900,'Volvemos al rosco azul. Los aciertos verdes van marcando el recorrido.'),(3080,'¡Despedida y créditos del especial! Hemos llegado juntos hasta el final.')],
'p_cg9AGn4_E':[(20,'Christian presenta el programa del diecinueve de diciembre de dos mil diecisiete.'),(200,'Se ve La Silla Azul en las pantallas del plató. Hoy también hay que ganarse un sitio.'),(380,'En el equipo naranja aparecen varias palabras en columna. Fíjate en las letras que faltan.'),(560,'¡Llega la cortinilla roja de La Pista! Vamos a escuchar qué nos proponen.'),(740,'El plano general deja ver el bote en la pantalla del fondo y la mesa redonda.'),(920,'La Pista nos enseña los dos lados y los pulsadores. ¡Atentos a la música!'),(1100,'En el equipo azul aparece una palabra que empieza por e. Vamos a seguir la pista de las letras.'),(1280,'Christian está leyendo frente al fondo azul de letras. Nosotros seguimos con él.'),(1460,'El equipo naranja aplaude. ¡Buen ambiente antes de seguir!'),(1640,'El rosco de Carlos ya está en marcha. Las letras esperan su respuesta.'),(1820,'Carlos suma letras verdes en su rosco. Cada acierto cuenta.'),(2000,'Ahora vemos a Antonio en el rosco naranja, con muchas letras ya resueltas.'),(2180,'Antonio sigue con su rosco. ¡No adelantamos nada de lo que queda!'),(2360,'Quedan muy poquitas letras en el rosco de Antonio. El momento invita a concentrarse.'),(2540,'Antonio continúa pensando esa respuesta. Dejamos que el programa nos cuente el resultado.'),(2720,'Christian y Antonio comparten un momento junto al atril. Seguimos hasta la despedida.'),(2900,'En el último tramo vemos también a los invitados. El vídeo no se corta antes del final.')],
'my8KxEx_i0c':[(20,'¡Feliz día de Reyes! El especial tiene niños, regalos y decoración de Navidad.'),(200,'La concursante se ríe en el equipo naranja. Empezamos el especial con alegría.'),(380,'Entre las opciones aparecen Mickey Mouse, Simba, Spider-Man y Dory. ¡Una pista de dibujos!'),(560,'Ahora el equipo azul tiene opciones como Finn, Gru y Morat. ¡A leer con atención!'),(740,'En el fondo se lee Friends mientras vemos a los equipos en la mesa.'),(920,'En La Pista vemos a los niños y los dos pulsadores. ¡Que suene la música!'),(1100,'Christian prepara las tarjetas frente a la esfera de letras. Seguimos el especial.'),(1280,'En la sopa de letras la pista dice: en el salón de casa. Vamos a buscar.'),(1460,'Los dos chicos del equipo azul aparecen juntos en pantalla. Hoy los pequeños también juegan.'),(1640,'El plano general muestra los segundos de los dos equipos y los colores naranja y azul.'),(1820,'La cámara enfoca a varios niños del público. ¡También están pendientes!'),(2000,'Ahora vemos a David en primer plano, con su chapa azul. Seguimos atentos.'),(2180,'Los niños del equipo azul aplauden. ¡Aquí todos animan!'),(2360,'El rosco de la concursante naranja está en marcha. Vamos letra a letra.'),(2540,'David resuelve su rosco azul. Las letras verdes señalan lo que ya ha acertado.'),(2720,'Volvemos al rosco naranja. ¡Menudo final de especial!'),(2900,'Regresamos a un plano del plató, decorado para el día de Reyes.'),(3080,'Los pequeños se acercan al final del especial. ¡Llegamos hasta la despedida!')],
}
# Las fechas/títulos son los de los archivos aportados, no una nueva verificación editorial.
pretty={'c06yoItjk3s':'Nochevieja · 31/12/2018 · completo','p_cg9AGn4_E':'Telecinco · 19/12/2017 · completo','my8KxEx_i0c':'Especial Reyes · 04/01/2019 · completo','ot-SllvM1oI':'Atrapa un millón y Pasapalabra · vídeo mixto','7s5zJAla2jk':'Javier Merino se lleva el bote · fragmento','vOthWF1d8f8':'Pasapalabra con Javier Merino · fragmento'}
rules={1:('¿Dónde están?','Mira la cuadrícula de tres por tres. Aquí importa recordar la posición de cada nombre.'),2:('He dicho','Escuchamos las palabras y las intervenciones de los equipos. Esta es la versión en familia.'),3:('¿Tú qué pintas?','El dibujo da las pistas. Intenta reconocerlo antes de que se termine de dibujar.'),4:('Coco Loco','El vídeo enseña cómo se encadenan las intervenciones en Coco Loco. Seguimos sus ejemplos.'),5:('Con nueve basta','Nueve letras pueden esconder una palabra. Vamos a ver cómo la construyen.'),6:('Del tirón','Hay que mantener el hilo de las respuestas. Mira cómo enlazan una con otra.'),7:('¿Cómo se dice?','La forma de decir cada palabra es la protagonista. Escucha la explicación del vídeo.'),8:('En pocas palabras','Las palabras de las pistas importan tanto como la respuesta. Escucha antes de elegir.'),9:('¿Qué es qué?','Fíjate en el cuadro de palabras y las fichas de abajo. Los colores distinguen a los equipos.'),10:('Palabras cruzadas','Fíjate en las dos columnas de palabras y en cómo las relacionan.'),11:('La Pista','En La Pista la música ayuda a encontrar el título. ¡Atentos al fragmento!'),12:('Letra a letra','Una letra puede cambiarlo todo. Hay que mirar con cuidado cómo va creciendo la palabra.'),13:('La Escalera','En la escalera las palabras se colocan por longitud. La de siete letras va abajo.'),14:('El Pulsador','El pulsador sirve para pedir el turno. Mira cuándo lo aprietan y cómo contestan.'),15:('De par en par','Vamos a buscar parejas. Fíjate en lo que tienen en común las dos palabras.'),16:('La palabra imposible','Algunas pistas despistan. Mira cómo se van descartando las posibilidades.'),17:('Antes y después','Hay que relacionar lo que viene antes y lo que viene después. Vamos a seguir el ejemplo.')}
for x in C:
 x['title']=pretty.get(x['id'],rules.get(x['n'],(x['title'],''))[0]);x['comments']=[]
 def cue(t,k):x['comments'].append(dict(t=round(t,2),line=k))
 cue(0.4,'inicio-prueba' if x['kind']=='prueba' else 'entrada')
 for i,t in enumerate(range(36,int(x['duration'])-12,36)):
  cue(t,f'com{(i*7+x["n"]*3)%len(common):02}')
 for i,(t,text) in enumerate(anchors.get(x['id'],[])):
  key=add(x['id']+'a'+str(i),text);x['comments']=[c for c in x['comments'] if abs(c['t']-t)>=12]
  cue(t,key)
 if x['kind']=='prueba':
  title,text=rules[x['n']];key=add('regla'+str(x['n']),text)
  # La explicación de la prueba reaparece al principio y a mitad, sin afirmar una respuesta concreta.
  for t in [12,max(48,x['duration']*.5)]:
   x['comments']=[c for c in x['comments'] if abs(c['t']-t)>12];cue(t,key)
 cue(x['duration']-9,'salida');x['comments'].sort(key=lambda c:c['t'])
 x['promo']=dict(logo='reaccion_en_cadena' if x['n']%2 else 'alla_tu',text='Muy pronto · En Telecinco',inventado=True)
chat={
'saludo':['¡Hola, {p}! Me alegro de verte en nuestro plató. ¿Qué te apetece hacer?','¡Muy buenas, {p}! Aquí estoy para hablar contigo y jugar un rato.'],
'animo':['Claro que puedes intentarlo. Vamos palabra a palabra y sin prisas.','Si una no sale, no pasa nada. Estamos aquí para disfrutar juntos.'],
'juego':['Puedes ver programas completos, aprender las pruebas o jugar un rosco por turnos.','En el menú de Telecinco tienes los vídeos, las pruebas y el multijugador local.'],
'rosco':['En nuestro rosco puedes contestar, decir pasapalabra o pasar el teléfono al siguiente turno.','Los aciertos se ponen verdes. Si no sabes una, puedes dejarla para otra vuelta.'],
'video':['Los programas se ven enteros en la pantalla del plató. La Biblioteca tiene que estar instalada.','Los comentarios son inventados para el juego. El vídeo original sigue sin saltarse el final.'],
'prueba':['La Escalera, El Pulsador y las demás están en Las pruebas, con su vídeo completo.','En Las pruebas puedes mirar cómo juegan los equipos y repetir cualquier momento.'],
'musica':['La música del vídeo sigue siendo la original. Mis frases son voces sintéticas de este juego.','Cuando hablo baja un poco el vídeo. Puedes silenciar los comentarios con su botón.'],
'quien':['Soy un personaje de este juego, no la persona real. Mis respuestas son inventadas.','Tengo frases preparadas con voz Piper en español. No soy una inteligencia conectada a internet.'],
'gracias':['¡Gracias a ti por estar aquí! Me encanta compartir este ratito de juego.','¡De nada! Seguimos cuando te apetezca, sin ninguna prisa.'],
'despedida':['¡Hasta luego! Aquí te esperamos para el próximo rosco.','¡Nos vemos! Gracias por pasar por el plató.'],
'ayuda':['Prueba a preguntarme por el rosco, los vídeos, la música o las pruebas.','Este chat reconoce temas sencillos sin internet. Si no te entiendo, prueba con una frase más corta.'],
'default':['No tengo una respuesta preparada para eso. Puedes hablarme del juego, los vídeos o el rosco.','No lo he entendido del todo. ¿Probamos con algo del programa o con una prueba?'],
}
chars=[dict(name='Christian',label='Christian · avatar',voice='davefx',color='#40a9ff'),dict(name='Lola',label='Lola · 🆕 INVENTADA',voice='sharvardF',color='#ffac50'),dict(name='Javi',label='Javi · 🆕 INVENTADO',voice='carlfm',color='#70d6a3'),dict(name='Pablo',label='Pablo · 🆕 INVENTADO',voice='sharvardM',color='#c698ff')]
prefix={'Christian':'','Lola':'¡Soy Lola! ','Javi':'¡Javi al habla! ','Pablo':'¡Aquí Pablo! '}
for ch in chars:
 ch['pools']={}
 for intent,texts in chat.items():
  keys=[]
  for i,text in enumerate(texts):
   # Nombre del jugador solo en texto; la pista grabada es genérica y nunca reutiliza otro nombre.
   text=text.replace(', {p}','').replace('{p}','')
   keys.append(add('chat'+ch['name']+intent+str(i),prefix[ch['name']]+text,ch['name']))
  ch['pools'][intent]=keys

# Los enlaces adicionales no se anuncian como nuevas emisiones completas.
otherlines=[
'Este es uno de los otros vídeos que aportaste. Lo vemos completo, sin presentarlo como una emisión completa nueva.',
'Este enlace está en la sección de otros vídeos. Puede incluir montaje, presentación o fragmentos.',
'Vamos a mirar el vídeo tal como está, sin adelantar el resultado.',
'También puedes pausar o volver a un momento anterior en este vídeo.',
'Mis comentarios son ficción del avatar, no forman parte de la grabación original.',
'Los personajes que aparecen delante de la pantalla son los avatares del juego.',
'Seguimos acompañando este vídeo. Si quieres oír solo el original, apaga Comentarios.',
'La grabación conserva su principio y su final. No hemos recortado este enlace.',
]
for i,t in enumerate(otherlines):add('otros'+str(i),t)
for x in C:
 if x['kind']=='otro':
  for i,c in enumerate(x['comments']):
   if c['line']!='salida':c['line']='otros'+str(i%len(otherlines))

out=dict(version='0.37',items=C,lines=lines,characters=chars,excluded=[dict(id='doaiMZy3QH0',reason='Corto de enfermería ajeno a Pasapalabra. No es un programa completo.')],playlist='https://youtube.com/playlist?list=PLX1TIKTxWbhU')
(R/'www/contenido037.js').write_text('window.CONTENIDO037='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
(R/'contenido037.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));print('LINES',len(lines),'CUES',sum(len(x['comments']) for x in C),'VIDEOS',len(C))
