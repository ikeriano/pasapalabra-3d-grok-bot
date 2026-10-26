# v0.11 · datos nuevos de Pasapalabra 3D (todo lo inventado va marcado como inventado)
import sys,os
sys.path.insert(0,os.path.join(os.path.dirname(__file__),'..','v09'))
from synth9_bote import words
MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
def dia(n):return 'uno' if n==1 else words(n)
def anio(y):return 'dos mil' if y==2000 else 'dos mil '+words(y-2000)
def fecha_voz(f):
  d,m,y=[int(x) for x in f.split('-')]
  return f'el {dia(d)} de {MESES[m-1]} de {anio(y)}'
def euros(n):return f'{n//1000:,}'.replace(',','.')+'.000' if n%1000==0 else f'{n:,}'.replace(',','.')
# ---------- BOTES (Wikipedia, «Lista completa de ganadores de la prueba final») ----------
A3='Antena 3';T5='Telecinco'
# (nombre, importe, fecha dd-mm-yyyy, cadena, audiencia, nota, dud)
BOTES=[
 ('Manuel Romero',1023000,'17-03-2004',A3,'','Primer premio superior al millón de euros.',''),
 ('Carlos Villalba',852000,'23-02-2011',T5,'','',''),
 ('Ernesto García',555000,'14-04-2003',A3,'','',''),
 ('Susana García',450000,'11-06-2015',T5,'2.028.000 espectadores (18,5 %)','',''),
 ('Antonio García',450000,'24-09-2009',T5,'','',''),
 ('Rafael Moreno',432000,'09-12-2001',A3,'','',''),
 ('José Manuel Lucia',396000,'19-04-2009',T5,'','Segunda mayor racha de la historia del programa: acertó 23 palabras seguidas.',''),
 ('Alberto Izquierdo',374000,'21-05-2012',T5,'','',''),
 ('Rubén García',366000,'13-12-2009',T5,'','','La tabla de Wikipedia lista dos botes de un Rubén García (09-06-2006 y 13-12-2009) como botes distintos; no se indica si es la misma persona.'),
 ('Paco de Benito',362000,'21-08-2014',T5,'1.623.000 espectadores (21,4 %)','',''),
 ('Luis Esteban',354000,'19-02-2015',T5,'3.182.000 espectadores (21,5 %)','',''),
 ('Víctor Puig',342000,'28-04-2008',T5,'2.646.000 espectadores (24,3 %)','',''),
 ('Lilit Manukyan',318000,'21-11-2014',T5,'2.677.000 espectadores (20,6 %)','Primera persona ganadora del bote cuyo idioma nativo no es el español. Estuvo 85 programas.',''),
 ('Carlos Adán',318000,'17-01-2017',T5,'2.761.000 espectadores (18,7 %)','',''),
 ('Javier Álvarez',312000,'25-11-2008',T5,'','',''),
 ('Jon Iñaki Aguado',282000,'16-06-2009',T5,'','Ganó el bote en su primer programa.',''),
 ('Laura Gonzalo',282000,'12-03-2010',T5,'','',''),
 ('Josep Badia',240000,'19-06-2001',A3,'','',''),
 ('Miguel Rodríguez',240000,'16-11-2007',T5,'2.739.000 espectadores (22,7 %)','',''),
 ('Familia Díaz',198000,'04-06-2018','Telecinco (Pasapalabra en familia)','1.913.000 espectadores (15,2 %)','Único bote de «Pasapalabra en familia».',''),
 ('Daniel Cerrada',186000,'18-09-2007',T5,'1.746.000 espectadores (18,0 %)','Ganó el bote en su primer programa.',''),
 ('Gabriel García',168000,'24-11-2000',A3,'','',''),
 ('Rubén García',144000,'09-06-2006',A3,'1.288.000 espectadores (14,6 %)','Último bote de la primera etapa de Antena 3.','La tabla de Wikipedia lista dos botes de un Rubén García (09-06-2006 y 13-12-2009) como botes distintos; no se indica si es la misma persona.'),
 ('Marta Sierra',96000,'06-08-2007',T5,'1.304.000 espectadores (18,6 %)','Primer bote de la etapa de Telecinco.',''),
 ('Juan Campoy Armero',60000,'10-09-2000',A3,'','Bote más pequeño de la primera etapa de Antena 3.',''),
 ('Jon Otazua',18000,'24-02-2015',T5,'2.643.000 espectadores (16,3 %)','Bote más pequeño de la historia.',''),
]
def botes_js():
  out=[]
  for n,imp,f,c,aud,nota,dud in BOTES:
    nt=(nota+' ' if nota else '')+(('Audiencia: '+aud+'.') if aud else '')
    out.append(dict(n=n,imp=imp,f=f,c=c,nota=nt.strip(),src='Wikipedia (lista de ganadores de la prueba final)',dud=dud,
      say=f'Recordamos el bote de {n}: {words(imp)} euros, {fecha_voz(f)}, en {c.split(" (")[0]}.'))
  return out
# ---------- ROSCOS (índice 6 en adelante) ----------
W='Wikipedia'
ROSCOS=[
 dict(t='La escalera de los segundos',d='Récord de segundos extra para el rosco: Nacho Mangut, 86 (02-11-2016); Rafa Castaño, 90 extra y 175 en total (06-05-2017); Antonio Ruiz lo iguala (17-11-2017); Francisco González, 93 (23-11-2018) y 97 (07-12-2018).',src=W,dud='',
  m3=dict(n=97,u='segundos extra',sub='Francisco González · 07-12-2018',ic='⏱️'),
  say='La escalera de los segundos. Nacho Mangut logró ochenta y seis, Rafa Castaño noventa extra, Antonio Ruiz lo igualó y Francisco González llegó a noventa y siete segundos extra, el siete de diciembre de dos mil dieciocho.'),
 dict(t='Dieciséis seguidas en «Una de cuatro»',d='El 22-02-2019 Eloína Marcos acertó 16 preguntas consecutivas y logró 32 segundos, récord hasta la fecha, en el equipo naranja.',src=W,dud='',
  m3=dict(n=16,u='aciertos seguidos',sub='Eloína Marcos · 22-02-2019 · 32 segundos',ic='🎯'),
  say='Una de cuatro. El veintidós de febrero de dos mil diecinueve, Eloína Marcos acertó dieciséis preguntas seguidas y logró treinta y dos segundos.'),
 dict(t='Racha de 23 · José Manuel Lucia',d='19-04-2009: acertó 23 palabras seguidas, la segunda mayor racha de la historia. Recreación: el resto del rosco no consta.',src=W,dud='Se recrea la racha de 23 aciertos; no consta cómo fue el resto de su rosco.',rrec=[23,0,'José Manuel Lucia'],
  say='La racha de José Manuel Lucia: veintitrés palabras seguidas, el diecinueve de abril de dos mil nueve.'),
 dict(t='Racha de 23 · Rafa Castaño',d='08-03-2023: Rafael Castaño acierta 23 palabras seguidas. Recreación: el resto del rosco no consta.',src=W,dud='Se recrea la racha de 23 aciertos; no consta cómo fue el resto de su rosco.',rrec=[23,0,'Rafa Castaño'],
  say='La racha de Rafa Castaño: veintitrés palabras seguidas, el ocho de marzo de dos mil veintitrés.'),
 dict(t='Racha de 22 · Sebastián Navarro',d='28-03-2018: 22 aciertos seguidos. Recreación: el resto del rosco no consta.',src=W,dud='Se recrea la racha de 22 aciertos; no consta cómo fue el resto del rosco.',rrec=[22,0,'Sebastián Navarro'],
  say='La racha de Sebastián Navarro: veintidós palabras seguidas, el veintiocho de marzo de dos mil dieciocho.'),
 dict(t='Racha de 22 · Orestes Barbero',d='25-11-2022: 22 aciertos seguidos. Recreación: el resto del rosco no consta.',src=W,dud='Se recrea la racha de 22 aciertos; no consta cómo fue el resto del rosco.',rrec=[22,0,'Orestes Barbero'],
  say='La racha de Orestes Barbero: veintidós palabras seguidas, el veinticinco de noviembre de dos mil veintidós.'),
 dict(t='Racha de 21 · Jaime Conde',d='08-11-2021: 21 aciertos seguidos. Recreación: el resto del rosco no consta.',src=W,dud='Se recrea la racha de 21 aciertos; no consta cómo fue el resto del rosco.',rrec=[21,0,'Jaime Conde'],
  say='La racha de Jaime Conde: veintiuna palabras seguidas, el ocho de noviembre de dos mil veintiuno.'),
 dict(t='Racha de 20 · Orestes Barbero',d='18-11-2022: 20 aciertos seguidos. Recreación: el resto del rosco no consta.',src=W,dud='Se recrea la racha de 20 aciertos; no consta cómo fue el resto del rosco.',rrec=[20,0,'Orestes Barbero'],
  say='Otra racha de Orestes Barbero: veinte palabras seguidas, el dieciocho de noviembre de dos mil veintidós.'),
]
# ---------- MOMENTOS ----------
MOMENTOS=[
 dict(t='El bote más pequeño: Jon Otazua',d='El 24-02-2015 Jon Otazua ganó el bote más pequeño de la historia: 18.000 €.',src=W,dud='',m3=dict(n=18000,u='€',sub='Jon Otazua · 24-02-2015',ic='🪙'),
  say='El bote más pequeño de la historia: Jon Otazua, dieciocho mil euros, el veinticuatro de febrero de dos mil quince.'),
 dict(t='Lilit Manukyan, primera ganadora de otra lengua',d='El 21-11-2014 Lilit Manukyan ganó 318.000 €. Fue la primera persona ganadora del bote cuyo idioma nativo no es el español, tras 85 programas.',src=W,dud='',m3=dict(n=85,u='programas',sub='Lilit Manukyan · bote de 318.000 € el 21-11-2014',ic='🌍'),
  say='Lilit Manukyan fue la primera persona ganadora del bote cuyo idioma nativo no es el español: ochenta y cinco programas y trescientos dieciocho mil euros, el veintiuno de noviembre de dos mil catorce.'),
 dict(t='El único bote de «Pasapalabra en familia»',d='El 04-06-2018 la Familia Díaz ganó 198.000 €, el único bote de «Pasapalabra en familia» (Telecinco, desde el 16-04-2018, de 13:30 a 15:00).',src=W,dud='',m3=dict(n=198000,u='€',sub='Familia Díaz · 04-06-2018',ic='👨‍👩‍👧'),
  say='El único bote de Pasapalabra en familia: la familia Díaz, ciento noventa y ocho mil euros, el cuatro de junio de dos mil dieciocho.'),
 dict(t='Premio Ondas 2010',d='En 2010 el programa recibió el Premio Especial del Jurado de los Premios Ondas por sus 10 años de éxito en televisión.',src=W,dud='',m3=dict(n=10,u='años de éxito',sub='Premio Especial del Jurado · Ondas 2010',ic='🏆'),
  say='En dos mil diez, Pasapalabra recibió el Premio Especial del Jurado de los Premios Ondas por sus diez años de éxito en televisión.'),
 dict(t='Récord de audiencia: 4.844.000',d='El 25-02-2021 el concurso marcó su máximo histórico absoluto en espectadores: 4.844.000.',src=W,dud='',m3=dict(n=4844000,u='espectadores',sub='25-02-2021 · máximo histórico',ic='📺'),
  say='El veinticinco de febrero de dos mil veintiuno, Pasapalabra marcó su récord de espectadores: cuatro millones ochocientos cuarenta y cuatro mil.'),
 dict(t='Récord de cuota de pantalla: 37,4 %',d='El 16-03-2023, el día del bote de Rafa Castaño, el programa alcanzó su récord histórico de cuota de pantalla: 37,4 %.',src=W,dud='',m3=dict(n=37.4,u='% de cuota',sub='16-03-2023 · récord histórico',ic='📈'),
  say='El dieciséis de marzo de dos mil veintitrés, el día del bote de Rafa Castaño, Pasapalabra alcanzó su récord de cuota de pantalla: treinta y siete coma cuatro por ciento.'),
 dict(t='Manu Pascual, 437 programas',d='Manu Pascual es el concursante con más programas de la tercera etapa de Antena 3: 437, del 16-05-2024 al 05-02-2026.',src=W,dud='',m3=dict(n=437,u='programas',sub='Manu Pascual · 16-05-2024 → 05-02-2026',ic='🎖️'),
  say='Manu Pascual jugó cuatrocientos treinta y siete programas, del dieciséis de mayo de dos mil veinticuatro al cinco de febrero de dos mil veintiséis.'),
 dict(t='Laguardia contra Óscar Díaz: 157 duelos',d='Moisés Laguardia y Óscar Díaz se enfrentaron en 157 duelos, del 23-09-2023 al 15-05-2024.',src=W,dud='',m3=dict(n=157,u='duelos',sub='23-09-2023 → 15-05-2024',ic='⚔️'),
  say='Moisés Laguardia y Óscar Díaz se enfrentaron en ciento cincuenta y siete duelos, del veintitrés de septiembre de dos mil veintitrés al quince de mayo de dos mil veinticuatro.'),
 dict(t='La Audiencia Provincial de Barcelona',d='El 17-11-2022 la Audiencia Provincial de Barcelona condenó a Atresmedia a cesar la emisión de «El rosco» por vulnerar derechos de MC&F, con 50.000 € de indemnización por daños morales.',src=W,dud='',m3=dict(n=50000,u='€ de indemnización',sub='17-11-2022 · Audiencia Provincial de Barcelona',ic='⚖️'),
  say='El diecisiete de noviembre de dos mil veintidós, la Audiencia Provincial de Barcelona condenó a Atresmedia a dejar de emitir El rosco y fijó cincuenta mil euros de indemnización por daños morales.'),
 dict(t='El Supremo confirma la sentencia',d='El 19-05-2026 el Tribunal Supremo confirmó la sentencia de la Audiencia Provincial de Barcelona: «El rosco» era una obra protegida por la propiedad intelectual.',src=W,dud='',m3=dict(txt='19-05-2026',u='',sub='Tribunal Supremo · sentencia confirmada',ic='⚖️'),
  say='El diecinueve de mayo de dos mil veintiséis, el Tribunal Supremo confirmó la sentencia: El rosco era una obra protegida por la propiedad intelectual.'),
 dict(t='El último rosco: 18-06-2026',d='La prueba final «El rosco» se emitió por última vez el 18-06-2026, por efecto de la sentencia del Tribunal Supremo.',src=W,dud='',m3=dict(txt='18-06-2026',u='',sub='Último «El rosco»',ic='🎬'),
  say='El dieciocho de junio de dos mil veintiséis se emitió por última vez El rosco, por la sentencia del Tribunal Supremo.'),
 dict(t='Estreno de «AlaZ»',d='El 19-06-2026 se estrenó «AlaZ» como prueba final, basada en el formato suizo DallAZetA (RSI), presentado por Sara Galeazzi entre 2022 y 2024.',src=W,dud='',m3=dict(txt='19-06-2026',u='',sub='Estreno de AlaZ · formato suizo DallAZetA',ic='🔠'),
  say='El diecinueve de junio de dos mil veintiséis se estrenó A la Z como prueba final, basada en el formato suizo Dal-A-Zeta, de la RSI.'),
 dict(t='Los suplentes del presentador',d='Constantino Romero sustituyó a Silvia Jato entre noviembre de 2002 y enero de 2003 por su baja de maternidad. Manel Fuentes sustituyó a Roberto Leal durante dos programas en septiembre de 2020 por positivo en COVID-19.',src=W,dud='',m3=dict(n=2,u='presentadores suplentes',sub='Constantino Romero · Manel Fuentes',ic='🎤'),
  say='Dos presentadores suplentes: Constantino Romero sustituyó a Silvia Jato entre noviembre de dos mil dos y enero de dos mil tres, y Manel Fuentes sustituyó a Roberto Leal dos programas en septiembre de dos mil veinte.'),
 dict(t='Edición prime time: verano de 2011',d='Entre el 18-08-2011 y el 01-09-2011 se emitieron programas especiales los jueves a las 22:00, con DJ, bailarines y azafatas.',src=W,dud='',m3=dict(n=3,u='jueves a las 22:00',sub='18-08-2011 → 01-09-2011',ic='🌙'),
  say='En el verano de dos mil once hubo una edición en horario de máxima audiencia: los jueves a las diez de la noche, con DJ, bailarines y azafatas.'),
 dict(t='Jero Hernández, 120 programas sin bote',d='Jero Hernández, del servicio de Protocolo de la Universidad de Salamanca, jugó 120 programas consecutivos sin ganar el bote, hasta que lo superó Antonio Ruiz.',src=W,dud='',m3=dict(n=120,u='programas seguidos',sub='Jero Hernández · récord hasta Antonio Ruiz',ic='🎓'),
  say='Jero Hernández jugó ciento veinte programas seguidos, aunque no consiguió el bote.'),
 dict(t='Paz Herrera y la audiencia',d='Durante la estancia de Paz Herrera la audiencia pasó del 16,7 % en su primer día al 26,9 % en el último, cuando ganó 1.310.000 € (27-05-2014).',src=W,dud='',m3=dict(n=26.9,u='% de cuota',sub='Paz Herrera · desde el 16,7 % hasta el 26,9 %',ic='📈'),
  say='Durante la estancia de Paz Herrera, la audiencia pasó del dieciséis coma siete por ciento al veintiséis coma nueve por ciento. Ganó un millón trescientos diez mil euros, el veintisiete de mayo de dos mil catorce.'),
]
# ---------- NIVELES nuevos de «jugar un rosco famoso» (aproximados) ----------
LV=[
 ['Racha de 22 · Orestes','Orestes',.88,22,'Llega a 22 aciertos como Orestes Barbero (25-11-2022); el rival imita su nivel, no su rosco real.',0],
 ['Los 175 segundos de Rafa','Rival',.6,25,'Empieza con 175 segundos como Rafa Castaño (06-05-2017) e intenta completar el rosco.',55],
 ['Los 183 segundos de Fran','Rival',.55,22,'Empieza con 183 segundos como Francisco González (07-12-2018).',63],
]
# ---------- PRUEBAS PREVIAS NUEVAS (INVENTADAS) ----------
SINON=[('feliz','contento','triste','enfadado'),('rápido','veloz','lento','pesado'),('grande','enorme','minúsculo','estrecho'),('bonito','hermoso','feo','antiguo'),('hablar','conversar','callar','mirar'),
 ('comenzar','empezar','terminar','esperar'),('mentira','falsedad','verdad','historia'),('valiente','osado','cobarde','tranquilo'),('rico','adinerado','pobre','sabroso'),('fácil','sencillo','difícil','corto'),
 ('cansado','agotado','despierto','alegre'),('amigo','compañero','enemigo','vecino'),('casa','vivienda','calle','jardín'),('tranquilo','sereno','nervioso','ruidoso'),('listo','inteligente','torpe','joven'),('ladrón','ratero','policía','vendedor')]
RIMAS=[('canción','corazón','camino','cantante'),('luna','fortuna','sol','estrella'),('mesa','fresa','silla','cama'),('gato','pato','perro','ratón'),('sol','farol','luna','nube'),
 ('mano','hermano','pie','dedo'),('flor','amor','rosa','hoja'),('pan','volcán','harina','trigo'),('rosco','bosco','letra','palabra'),('noche','coche','día','tarde'),('mar','pesar','playa','ola'),('casa','masa','puerta','techo')]
PREV={
 'sinon':dict(t='Sinónimos',intro='<b>Sinónimos</b>: toca la palabra que significa lo mismo. Cada acierto, <b>2 segundos</b>.',inv='Prueba previa INVENTADA'),
 'calc':dict(t='Cálculo mental',intro='<b>Cálculo mental</b>: toca el resultado correcto. Cada acierto, <b>2 segundos</b>.',inv='Prueba previa INVENTADA'),
 'orden':dict(t='Ordena el abecedario',intro='<b>Ordena el abecedario</b>: toca las letras en orden alfabético. Cada ronda completa, <b>3 segundos</b>.',inv='Prueba previa INVENTADA'),
 'cuenta':dict(t='Cuenta los dibujos',intro='<b>Cuenta los dibujos</b>: toca cuántos hay. Cada acierto, <b>2 segundos</b>.',inv='Prueba previa INVENTADA'),
 'rima':dict(t='Rimas',intro='<b>Rimas</b>: toca la palabra que rima. Cada acierto, <b>2 segundos</b>.',inv='Prueba previa INVENTADA'),
}
# ---------- FUERA DE CÁMARAS (4 escenas nuevas, INVENTADAS) ----------
FUERA=[
 dict(t='En el camerino',L=[
  ('H','Aquí estamos, en el camerino, dos minutos antes de salir. Ojo: esta escena está inventada.'),
  ('F','¿Quieres que te retoque un poco la frente? Brilla más que el rosco.'),
  ('H','Es la luz de los focos. Y los nervios, que también dan brillo.'),
  ('G','Aquí tienes el guion. Hoy pone que tienes que decir «Pasapalabra» siete veces seguidas.'),
  ('H','¿Siete veces? Pasapalabra, pasapalabra, pasapalabra… Creo que me estoy quedando afónico.'),
  ('F','Te preparo un té con miel. Pero antes, la corbata, que la llevas del revés.'),
  ('H','¡Pues sí! Gracias. Me voy corriendo a plató, que ya suena la sintonía.')]),
 dict(t='En la sala de control',L=[
  ('H','Pasamos a la sala de control. Todo lo que se ve aquí es inventado, ¿eh?'),
  ('M','Cámara uno al presentador, cámara dos al rosco. Mantened el plano.'),
  ('G','Música de suspense lista. ¿Se la pongo ya, o dejo que el concursante dude un poco?'),
  ('M','Déjale dudar. Que se note la tensión, que para eso están los focos.'),
  ('H','¿Y ese botón rojo tan grande de ahí?'),
  ('M','Ese no se toca. Es el del café. Lo hemos pintado de rojo para que nadie se lo beba.'),
  ('H','Qué sabia es esta sala. Os dejo trabajar, ¡mucha suerte con el directo!')]),
 dict(t='El público antes del programa',L=[
  ('H','Antes de empezar, voy a saludar al público. Esta charla es inventada, como todo lo de fuera de cámaras.'),
  ('N','¡Hola! Yo vengo con mi abuela, que sabe más palabras que el diccionario.'),
  ('H','¡Pues que se prepare para aplaudir! ¿Y usted, qué letra del rosco prefiere?'),
  ('F','La eñe, porque lleva gorrito y nunca sale. ¡Ojalá hoy toque!'),
  ('N','Y mi abuela dice que la letra más difícil es la equis. Que nunca sabe si empieza o contiene.'),
  ('H','Tiene razón. Hoy, quien acierte la equis se lleva un aplauso doble. ¿Ensayamos?'),
  ('N','¡Tres, dos, uno… aplausos! ¡Qué bien suena la sala llena!')]),
 dict(t='El pasillo y el catering',L=[
  ('H','Último rincón: el pasillo del catering. Todo lo que oigas aquí está inventado.'),
  ('M','Hoy hay tortilla, jamón y unos bocadillos de «Pasapalabra»: llevan dentro una letra de pan.'),
  ('G','Yo me quedo con el café. Que hoy hay bote y la cosa promete.'),
  ('H','¿Y el rosco de la pastelería? Veo un rosco enorme con azúcar por encima.'),
  ('M','Es el rosco de verdad. Se lo come el que pierda. Es una norma que acabo de inventar yo.'),
  ('G','Pues entonces yo empiezo a gritar «¡Pasapalabra!» para que no me toque.'),
  ('H','Venga, a plató. Que el rosco comestible no se come solo.')]),
]
# ---------- TOMAS FALSAS NUEVAS (INVENTADAS) ----------
TOMAS=[
 ('lapsus','Empieza por P: ave que vuela de noche… ¡Pingüino! No… ¡Corten!'),
 ('lapsus','Con la eme: animal que ladra. ¡Mono! No, no, ¡mono ladra no…! ¡Corten!'),
 ('lapsus','Bienvenidos a Pasaprograma… ¡Pasapalabra! ¡Qué lío! ¡Corten!'),
 ('lapsus','Contiene la te: instrumento para medir el tiempo. ¡Termómetro! No… ¡Corten!'),
 ('broma','He abierto el sobre del bote y había un bocadillo de chorizo. ¡Qué rico! ¡Corten!'),
 ('broma','Alguien ha cambiado las letras del rosco por pegatinas de frutas. ¡Hoy toca la pera! ¡Corten!'),
 ('broma','Me han pegado una nariz roja en la ficha y no me he dado cuenta en todo el programa. ¡Corten!'),
 ('broma','Han puesto un globo en mi silla y cuando me he sentado… ¡pfff! ¡Corten!'),
 ('corten','Perdón, empiezo otra vez que me he tragado un caramelo. Tres, dos, uno… ¡Corten!'),
 ('corten','Se ha caído el decorado de la letra Z. Que alguien la vuelva a pegar. ¡Corten!'),
 ('corten','He dicho «rosco» tan fuerte que se ha movido el micrófono. ¡Otra vez! ¡Corten!'),
 ('corten','Me ha sonado el móvil en directo y era mi abuela diciendo que me veía muy guapo. ¡Corten!'),
]
# ---------- CÁMARAS OCULTAS (INVENTADAS · el presentador es la víctima) ----------
CAMARAS=[
 dict(t='El rosco al revés',L=[
  ('N','Perdone, presentador. Hoy el rosco gira al revés: empieza por la zeta y acaba en la a.'),
  ('H','¿Al revés? Pero eso no puede ser. El rosco empieza por la a, de toda la vida.'),
  ('N','Es una norma nueva del consejo de letras. Pone aquí, mire, firmado y todo.'),
  ('H','¿El consejo de letras? ¡Si ni sabía que existía!'),
  ('F','Y además, hoy el rosco se lee en voz baja, para no despertar a la eñe.'),
  ('H','¡Esto es una cámara oculta! ¡Seguro que es una cámara oculta!'),
  ('N','¡Inocente, inocente! Todo esto es una cámara oculta inventada.')]),
 dict(t='El bote que desaparece',L=[
  ('M','Presentador, malas noticias: el sobre del bote ha desaparecido.'),
  ('H','¿Cómo que ha desaparecido? ¡Pero si estaba aquí hace cinco minutos!'),
  ('M','Dicen que lo ha cogido un concursante despistado. Se lo ha llevado en la mochila.'),
  ('H','¡Que alguien llame a seguridad! ¡Y a la directora! ¡Y a mi madre!'),
  ('G','Tranquilo, que lo he encontrado: estaba debajo de su silla, con un lacito.'),
  ('H','¿Debajo de mi silla…? ¡Esto es una broma!'),
  ('M','¡Inocente, inocente! Cámara oculta inventada, no hay ningún bote perdido.')]),
 dict(t='El micrófono que habla solo',L=[
  ('N','Vamos a hacer una prueba de sonido, presentador. Diga «uno, dos».'),
  ('H','Uno, dos. ¿Se oye bien?'),
  ('F','Uno, dos. ¿Se oye bien? Se oye muy bien, gracias.'),
  ('H','Un momento: ¿quién ha hablado? Yo no he dicho eso.'),
  ('N','Es el micrófono, que hoy habla solo. Tiene opiniones propias.'),
  ('H','Pues dile que se calle, que ahora presento yo.'),
  ('F','¡Inocente, inocente! Esta cámara oculta es inventada y el micrófono no habla.')]),
 dict(t='La palabra prohibida',L=[
  ('M','Perdone, pero hoy no se puede decir «pasapalabra». Lo ha prohibido el director.'),
  ('H','¿Cómo que no puedo decir pasapalabra? ¡Si es el nombre del programa!'),
  ('M','Ni la palabra «rosco». Ni «bote». Tampoco «letra», por si acaso.'),
  ('H','Pues dime tú cómo presento un programa sin decir ninguna de esas palabras.'),
  ('G','Lo puede hacer con gestos. Un rosquito con la mano, así.'),
  ('H','Esto es de locos. ¡Esto tiene que ser una cámara oculta!'),
  ('M','¡Inocente, inocente! Cámara oculta inventada. Puede decir lo que quiera.')]),
 dict(t='El sillón del presentador',L=[
  ('F','Perdone, ese sillón está reservado. Hoy presenta un invitado muy importante.'),
  ('H','¿Un invitado importante? Pero si el presentador soy yo.'),
  ('N','Es mi abuelo, que lleva cuarenta años viendo el programa y quiere conocer el rosco.'),
  ('H','Pues… vale, que se siente, que se siente. Pero yo hago las preguntas.'),
  ('F','Lo siento, hoy las pregunta él. Y él también aprieta el botón de las respuestas.'),
  ('H','Esto me suena a cámara oculta, pero no estoy seguro…'),
  ('N','¡Inocente, inocente! Cámara oculta inventada, no tiene ningún abuelo sustituto.')]),
 dict(t='El reloj del rosco',L=[
  ('M','Presentador, el reloj va más rápido hoy. Cada segundo dura medio segundo.'),
  ('H','¿Medio segundo? Entonces los concursantes tienen la mitad de tiempo.'),
  ('M','No, tienen el doble de tiempo. Pero cuentan mal. Es complicado.'),
  ('H','No lo entiendo. ¿Cuánto tiempo tienen entonces?'),
  ('G','Entre dos y tres minutos. Según cómo se mire el reloj, que hoy está de guasa.'),
  ('H','¡Que me cambien este reloj ya! ¡No hay quien se aclare con él!'),
  ('M','¡Inocente, inocente! Cámara oculta inventada. El reloj funciona perfectamente.')]),
]
# ---------- COPRESENTADOR SORPRESA (personajes INVENTADOS del equipo del plató) ----------
COPRO=[
 dict(id='gema',v='F',nombre='Gema · regidora',shirt=0x8a2ad0,
  llega='¡Sorpresa! Hoy no presento solo: desde detrás de las cámaras sale nuestra regidora inventada, ¡Gema!',
  intro=['¡Hola a todos! Normalmente soy la que levanta el cartel de aplausos. Hoy aplaudo con la boca.','Presentador, tú pregunta, que yo controlo el tiempo con la mirada.'],
  prueba=['¡Atención a la prueba previa! Todo el mundo concentrado, que el tiempo vuela.','Esta prueba la he ensayado yo antes. Bueno, sin concursantes. Pero salía genial.','¡Un poco de silencio en el plató! Que se oiga hasta el reloj.'],
  rosco=['¡Llega el rosco! ¡Veintidós, veintitrés, veinticuatro letras de pura emoción!','Que nadie respire fuerte, que se mueven las letras.'],
  gana='¡Rosco completo! ¡Esto hay que celebrarlo con aplausos sin cartel!',pierde='No pasa nada. Hasta los mejores roscos se atascan en la eñe.',
  bote='Y recordad: todo lo que dice esta copresentadora es inventado, pero el bote es de verdad. Bueno, el del juego.',
  adios='¡Gracias por dejarme presentar! Vuelvo detrás de la cámara, que es donde se está fresquito.'),
 dict(id='quique',v='M',nombre='Quique · catering',shirt=0xffffff,
  llega='¡Hoy presento con alguien que nos alimenta a todos! ¡Quique, el del catering inventado!',
  intro=['¡Buenas tardes! Vine a traer los bocadillos y me he quedado. ¡Esto es mejor que la cocina!','Al que gane, le guardo el de jamón. Al que pierda, el de queso. Que también está bueno.'],
  prueba=['¡Esta prueba se pone más caliente que la plancha de los calamares!','¡A pensar rápido! Como cuando se me queman las tostadas.','Sin energía no hay respuesta. Alguien que pida un café.'],
  rosco=['¡El rosco! Esto es el postre del programa. ¡A por él!','Un rosco de letras, qué rico. Casi mejor que uno de azúcar.'],
  gana='¡Has ganado! Esto merece una tarta de tres pisos.',pierde='Lo siento mucho. Te invito a un bocadillo para el disgusto.',
  bote='El bote ya es bueno. Pero un bocadillo de calamares sigue siendo mejor.',
  adios='¡Gracias por dejarme presentar! Y ahora… ¡a recoger los platos!'),
 dict(id='berto',v='N',nombre='Berto · sonido',shirt=0x2a6a3a,
  llega='¡Sorpresa! Deja los cascos un momento, que hoy presenta con nosotros Berto, de sonido inventado.',
  intro=['Probando, probando… ¡Hola! ¿Se me oye bien? Claro, si el micro lo he puesto yo.','Hoy los efectos de sonido los hago en directo. Y alguno con la boca.'],
  prueba=['Subo la música de tensión… ¡más! ¡Más!','Preparo el tic-tac del reloj. Es mi sonido favorito. Después del aplauso.','Silencio total: hasta el micrófono está nervioso.'],
  rosco=['¡Rosco! Pongo el redoble de tambor… ¡trrrrrr!','Música épica activada. ¡Que giren las letras!'],
  gana='¡Fanfarria de victoria! ¡Tararí, tararí!',pierde='Sonido triste de trombón: ¡wah, wah, waaah! Pero con cariño.',
  bote='Sonido de caja registradora: ¡clin! ¡El bote es tuyo!',
  adios='Apago los micros. Último aviso: ¡hasta mañana! Clic.'),
 dict(id='lidia',v='G',nombre='Lidia · directora',shirt=0xc07020,
  llega='¡Hoy tenemos copresentadora sorpresa! Sale de la sala de control… ¡Lidia, nuestra directora inventada!',
  intro=['¡Buenas tardes! Por una vez me veis la cara. Normalmente solo me oís gritar «¡corten!».','Hoy te dirijo de cerca, así que nada de improvisar… demasiado.'],
  prueba=['Cámara uno al concursante, cámara dos al presentador. ¡Acción!','Quiero una prueba intensa, sin pausas y con mucho suspense. ¡Vamos!','Plano cenital de las fichas. Qué bonito ha quedado.'],
  rosco=['Atención, rosco: cámara lenta en cada acierto. ¡Que se vea la emoción!','Música de tensión, luces suaves. Vamos con el rosco.'],
  gana='¡Toma buena a la primera! ¡Has ganado!',pierde='No pasa nada. Hasta las mejores tomas salen mal alguna vez.',
  bote='Desde la sala de control os lo digo: ese bote se ve precioso en cámara.',
  adios='¡Y estamos fuera! Gracias, presentador. Ha sido un placer dirigirte cara a cara.'),
 dict(id='pepa',v='F',nombre='Pepa · público',shirt=0xff5a20,
  llega='¡Hoy comparto atril con una invitada del público inventada! ¡Pepa, bienvenida!',
  intro=['¡Hola! Vengo con mi abanico y con muchas ganas. ¿Puedo aplaudir ya?','Presentador, no me mires así, que yo he venido a ayudar. Y a comer algo.'],
  prueba=['¡Yo sé la respuesta! Bueno… la sabía. Se me ha ido.','Esta prueba me recuerda a la de mi sobrino, el listo de la familia.','¡Vamos, equipos! ¡Que se oiga esa sala!'],
  rosco=['¡El rosco! Yo quiero la eñe. Que nunca sale y me da pena.','Que no falle nadie. Mi abuela siempre decía: más vale pasar que fallar.'],
  gana='¡Qué alegría! Esto lo cuento mañana en el mercado.',pierde='Ánimo. A mí también me pasa con los crucigramas.',
  bote='Qué bote tan bonito. ¡Como para invitar a todo el barrio!',
  adios='¡Adiós a todos! Y gracias por dejarme sentar en el sillón bueno.'),
]
# ---------- NORMAS SORPRESA (INVENTADAS) ----------
# (id, categoría, nombre, descripción, universal(True=también A la Z y familia), excl)
NORMAS=[
 ('r_perdon','rosco','Perdón en el rosco','El primer fallo de cada equipo en el rosco no cuenta: la letra pasa a pasapalabra.',False,['r_perdon2']),
 ('r_perdon2','rosco','Doble perdón','Los dos primeros fallos de cada equipo en el rosco se perdonan y pasan a pasapalabra.',False,['r_perdon']),
 ('r_pista','rosco','Pista del número de letras','En el rosco, el presentador dice cuántas letras tiene cada respuesta.',False,[]),
 ('r_oro','rosco','Letra de oro','Una letra del rosco, elegida al azar, es de oro: si la aciertas, ganas diez segundos.',False,[]),
 ('r_racha','rosco','Racha de tres','Cada tres aciertos seguidos en el rosco ganas tres segundos más.',False,[]),
 ('r_rival','rosco','Naranja despistado','El equipo naranja está despistado en el rosco y acierta bastante menos.',False,[]),
 ('s_mas10','segundos','Diez segundos de regalo','El equipo azul empieza el rosco con diez segundos más.',True,['s_mas20']),
 ('s_mas20','segundos','Veinte segundos de regalo','El equipo azul empieza el rosco con veinte segundos más.',True,['s_mas10']),
 ('s_rival10','segundos','Naranja con diez menos','El equipo naranja empieza el rosco con diez segundos menos.',True,[]),
 ('s_igual','segundos','Tiempos igualados','Antes del rosco, los dos equipos igualan sus segundos con la media de los dos.',True,[]),
 ('s_pasa','segundos','Pasapalabra con premio','Cada pasapalabra de un equipo en el rosco le da dos segundos, hasta un máximo de diez.',False,[]),
 ('s_ambos15','segundos','Reloj ampliado','Los dos equipos empiezan el rosco con quince segundos más.',True,[]),
 ('b_x2','bote','Bote doble','El bote de hoy vale el doble.',False,['b_x15']),
 ('b_x15','bote','Bote y medio','El bote de hoy vale una vez y media.',False,['b_x2']),
 ('b_mas30','bote','Treinta mil de propina','El bote de hoy suma treinta mil euros más.',False,['b_mas60']),
 ('b_mas60','bote','Sesenta mil de propina','El bote de hoy suma sesenta mil euros más.',False,['b_mas30']),
 ('b_sube12','bote','Bote que sube de doce en doce','Si hoy nadie gana el bote, sube doce mil euros en vez de seis mil.',False,[]),
 ('b_24','bote','Veinticuatro bastan','Para ganar el bote hoy bastan veinticuatro aciertos en el rosco.',False,[]),
 ('p_doble','pruebas','Pruebas a doble','Los segundos que se ganan en cada prueba previa cuentan el doble.',True,[]),
 ('p_ganador3','pruebas','Premio al mejor de la prueba','En cada prueba, el equipo que más segundos gane se lleva tres segundos extra.',True,[]),
 ('p_minimo3','pruebas','Mínimo de tres','Cada equipo gana al menos tres segundos en cada prueba.',True,[]),
 ('p_naranja_mitad','pruebas','Naranja a medias','El equipo naranja solo se queda con la mitad de los segundos de cada prueba.',True,[]),
 ('p_azul_mas2','pruebas','Azul con propina','El equipo azul gana dos segundos extra en cada prueba.',True,[]),
 ('p_ultima_doble','pruebas','Última prueba a doble','La última prueba antes del rosco vale el doble.',True,[]),
 ('t_ini_n','turnos','Empieza el naranja','El equipo naranja es el primero en jugar el rosco.',False,[]),
 ('t_lim5','turnos','Relevo a los cinco','El equipo azul debe ceder el turno tras cinco aciertos seguidos en el rosco.',False,['t_lim8','t_lim3n']),
 ('t_lim8','turnos','Relevo a los ocho','Los dos equipos ceden el turno tras ocho aciertos seguidos en el rosco.',False,['t_lim5','t_lim3n']),
 ('t_lim3n','turnos','Naranja con relevo corto','El equipo naranja cede el turno cada tres aciertos seguidos.',False,['t_lim5','t_lim8']),
 ('t_regalo_a','turnos','Letra A regalada al azul','La letra A del rosco ya viene acertada para el equipo azul.',False,['t_regalo_n']),
 ('t_regalo_n','turnos','Letra A regalada al naranja','La letra A del rosco ya viene acertada para el equipo naranja.',False,['t_regalo_a']),
]
NS_INTRO='Normas sorpresa. Estas normas son inventadas para este Pasapalabra 3D; no son del programa real.'
NS_FIN='Estas son las normas de hoy. Recuerda: todas son inventadas. ¡Que empiece el programa!'
CAT_NAME={'rosco':'Rosco','segundos':'Segundos','bote':'Bote','pruebas':'Pruebas','turnos':'Turnos'}
def lines11():
  L=[]
  for b in botes_js():L.append(('H',b['say']))
  for x in ROSCOS+MOMENTOS:L.append(('H',x['say']))
  for s in FUERA:L+=[(w,t) for w,t in s['L']]
  for _,t in TOMAS:L.append(('H',t))
  for c in CAMARAS:L+=[(w,t) for w,t in c['L']]
  for c in COPRO:
    L.append(('H',c['llega']))
    for k in ('intro','prueba','rosco'):L+=[(c['v'],t) for t in c[k]]
    for k in ('gana','pierde','bote','adios'):L.append((c['v'],c[k]))
  for n in NORMAS:L.append(('H',n[2]+'. '+n[3]))
  L+=[('H',NS_INTRO),('H',NS_FIN)]
  L+=[('H','Cámara oculta inventada: '+c['t']+'.') for c in CAMARAS]
  return sorted(set(L))
