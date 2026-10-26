# v0.9 · genera www/v09data.js (datos de «Lo mejor», extras, conversaciones, pruebas previas) y tools/v09/lines9.json (frases a sintetizar)
import json,sys
sys.path.insert(0,'/workspace/repos/pasapalabra-3d-grok-bot/tools/v09')
from synth9_bote import words
MES=['','enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
def dia(d):
  return 'uno' if d==1 else words(d)
def fecha(s):
  if not s or s.count('-')<2:return None
  d,m,y=map(int,s.split('-'));return f'{dia(d)} de {MES[m]} de {words(y)}'
def euros(n):return words(n)+' euros'
# ---------------- LO MEJOR: botes (datos verificados; dudoso=True → se marca en pantalla) ----------------
B=[ # nombre, importe, fecha dd-mm-aaaa|None, año, canal, nota, fuente, dudas
 ('Rosa Rodríguez',2716000,'05-02-2026','Antena 3 (Roberto Leal)','Tras 307 programas de duelo con Manu Pascual. Última palabra: «Earl Morrall» (M), con 3 s en el reloj. Récord absoluto de bote.','EL PAÍS, Atresmedia, EFE, ABC','ABC publicó 2.710.000 € y Marca un año equivocado (2024); aquí, el importe y la fecha de EL PAÍS/Atresmedia. La definición de la palabra final es la de la prensa, no literal.'),
 ('Rafa Castaño',2272000,'16-03-2023','Antena 3','Primer concursante que gana el bote con las 25 palabras de una sola tacada. Última palabra: «Zabro» (Z). Su rival, Orestes, quedó con 0 aciertos.','ABC, El Español, Wikipedia',''),
 ('Eduardo Benito',2190000,None,'Antena 3 (Jaime Cantizano)','Ganó el bote en 2006, en su primer día de concurso. Letra J: «Jiménez» (el poeta de «Platero y yo»).','ABC, El Español, OKdiario','La fecha exacta no está verificada: solo consta el año 2006.'),
 ('David Leo García',1866000,'10-10-2016','Telecinco','Palabra final: «Ranzón».','ABC, Wikipedia','Las fuentes difieren en sus programas: 103 o 109. No se afirma ninguna cifra.'),
 ('Pablo Díaz',1828000,'01-07-2021','Antena 3','Palabra final: «Dux». Llevaba 260 programas y se había quedado doce veces a una palabra del bote.','ABC',''),
 ('Óscar Díaz',1816000,'15-05-2024','Antena 3','Se llevó el bote en mayo de 2024.','OKdiario, Marca',''),
 ('Juan Pedro «Juanpe» Gómez',1674000,'18-07-2013','Telecinco','Palabra final: «Medianoche», en su programa 24. Pasó cuatro años en paro y con el bote pagó su hipoteca.','ABC, El Español, Wikipedia',''),
 ('Fran González',1542000,'22-01-2019','Telecinco','Tras 168 programas. Está recreado con el audio real de Christian Gálvez de ese programa.','Wikipedia y el vídeo del programa',''),
 ('César Garrido',1524000,'24-02-2012','Telecinco','','Wikipedia',''),
 ('Paz Herrera',1310000,'27-05-2014','Telecinco','','Wikipedia',''),
 ('Antonio Ruiz',1164000,'19-12-2017','Telecinco','','Marca',''),
 ('Julio Escartín',318000,'14-03-2017','Telecinco','Ganó en su primer programa, 25 aciertos frente a los 24 de Pablo Díaz.','Wikipedia y el programa completo','Una fuente da a Carlos Adán como ganador de 318.000 € el 17-01-2017; no se ha podido resolver.'),
 ('Sofía Álvarez',466000,'27-09-2021','Antena 3','Gana con 25 aciertos frente a los 24 de Marco Antonio. Antes de Rosa Rodríguez fue la única mujer de esta lista.','Wikipedia','')]
LB=[]
for n,imp,f,c,nota,src,dud in B:
  fh=fecha(f)
  if f: when=f'el {fh}'
  else: when='en el año dos mil seis'
  txt=f'Recordamos el bote de {n}: {euros(imp)}, {when}, en {c.split(" (")[0]}.'
  LB.append(dict(n=n,imp=imp,f=f or '2006',c=c,nota=nota,src=src,dud=dud,say=txt))
# ---------------- LO MEJOR: roscos y récords ----------------
R=[
 ('Rosco casi perfecto','Julio Escartín 25 aciertos frente a 24 de Pablo Díaz (14-03-2017, Telecinco).','Wikipedia','El programa completo está en vídeo.','Recordamos aquel rosco: Julio Escartín, veinticinco aciertos, frente a veinticuatro de Pablo Díaz, el catorce de marzo de dos mil diecisiete.'),
 ('Veinticinco contra veinticuatro','Sofía Álvarez 25 frente a Marco Antonio 24 (27-09-2021, Antena 3).','Wikipedia','','Recordamos el rosco de Sofía Álvarez: veinticinco aciertos frente a veinticuatro de Marco Antonio, el veintisiete de septiembre de dos mil veintiuno.'),
 ('El rosco de una tacada','Rafa Castaño 25 aciertos seguidos; Orestes, 0 (16-03-2023, Antena 3).','Wikipedia, ABC','','Recordamos el rosco de Rafa Castaño: veinticinco aciertos seguidos, el dieciséis de marzo de dos mil veintitrés. Su rival, Orestes, se quedó en cero.'),
 ('Fran contra Javier','Fran González 21 frente a Javier 5 (17-01-2019, Telecinco).','Wikipedia','','Recordamos el rosco de Fran González: veintiún aciertos frente a cinco de Javier, el diecisiete de enero de dos mil diecinueve.'),
 ('Más segundos en la prueba final','1) Javier Dávila 186 s (06-01-2024, Noche de Campeones) · 2) Pablo Díaz 185 s (10-02-2021) · 3) Fran González 183 s (07-12-2018) · 4) David Trigo 180 s (05-10-2026, A la Z) · 5) Rafa Castaño 179 s (16-03-2023).','Wikipedia','','Los que más segundos tuvieron en el rosco: Javier Dávila, ciento ochenta y seis; Pablo Díaz, ciento ochenta y cinco; Fran González, ciento ochenta y tres; David Trigo, ciento ochenta; y Rafa Castaño, ciento setenta y nueve.'),
 ('Muerte súbita en la Noche de Campeones','Orestes ganó a Luis de Lama por 5 a 4 en la muerte súbita.','Wikipedia','No consta la fecha en las notas de la sección.','En la Noche de Campeones, Orestes ganó a Luis de Lama por cinco a cuatro en la muerte súbita.')]
M=[
 ('El final de Pasapalabra en Telecinco','El 1 de octubre de 2019 terminó la emisión por el litigio entre Mediaset e ITV Studios; el Tribunal Supremo dio la razón a ITV. Rafa y Orestes siguieron jugando en «El tirón».','Wikipedia','','Recordamos el final de Pasapalabra en Telecinco, el uno de octubre de dos mil diecinueve, tras el litigio entre Mediaset e ITV Studios.'),
 ('La vuelta a Antena 3','En 2020 Pasapalabra volvió a Antena 3 con Roberto Leal como presentador.','Wikipedia','','En dos mil veinte, Pasapalabra volvió a Antena 3 con Roberto Leal como presentador.'),
 ('El duelo de los 307 programas','Rosa Rodríguez y Manu Pascual se enfrentaron durante 307 programas hasta el bote de 2.716.000 €.','EL PAÍS, Atresmedia','','El duelo más largo: Rosa Rodríguez y Manu Pascual se enfrentaron durante trescientos siete programas.'),
 ('Orestes Barbero, el más constante','360 programas consecutivos y 479 en total.','Wikipedia','','Orestes Barbero jugó trescientos sesenta programas seguidos y cuatrocientos setenta y nueve en total.'),
 ('El más joven y el más veterano','Pablo Díaz ganó con 19 años; Sebastián Navarro jugó con 62 (su último programa fue el 13-04-2018).','Wikipedia','','Pablo Díaz, el más joven, con diecinueve años. Sebastián Navarro, el más veterano, con sesenta y dos.'),
 ('Ganar en el primer programa','Daniel Cerrada (18-09-2007), Francisco M. García (10-01-2008), Jon Iñaki Aguado (16-06-2009), Javier Granda (09-07-2009) y Julio Escartín (14-03-2017).','Wikipedia','','Cinco concursantes ganaron el bote en su primer programa: Daniel Cerrada, Francisco García, Jon Iñaki Aguado, Javier Granda y Julio Escartín.'),
 ('La historia de Juanpe','Cuatro años en paro, bote de 1.674.000 € el 18-07-2013 y la hipoteca pagada.','ABC, El Español','','La historia de Juanpe: cuatro años en paro, y el dieciocho de julio de dos mil trece se llevó un bote de un millón seiscientos setenta y cuatro mil euros.')]
# ---------------- Extras: tomas falsas, fuera de cámaras, publicidad (humor propio, sin hechos reales de personas) ----------------
TOMAS=[
 ('lapsus','¡Y ahora el rosco de las veinticinco… veinticinquetas! ¡Corten!'),
 ('lapsus','Dice el equipo azul: «Pasapalabra»… ¡y yo he contestado «gracias»! ¡Corten!'),
 ('lapsus','Empieza por B: planta trepadora que da uvas. ¡Berenjena! No… ¡Corten!'),
 ('broma','¿Quién ha puesto confeti en mi chaqueta? ¡Hasta en el micrófono! ¡Corten!'),
 ('broma','He abierto el sobre y salió un pato de goma. ¡Qué buen bote! ¡Corten!'),
 ('broma','Me han cambiado las fichas por caramelos. ¡Prueba superada! ¡Corten!'),
 ('corten','Vamos otra vez desde el principio… ¡Tres, dos, uno! ¡Corten!'),
 ('corten','Se me ha olvidado el nombre del programa. Pasa… pasa… ¡Pasapalabra! ¡Corten!')]
FUERA=[('H','Estamos fuera de cámaras. Aquí el equipo prepara el rosco con mucho cariño.'),
 ('H','Mira, esa es la letra Ñ. Tiene gorrito y no se quita ni para dormir.'),
 ('F','¿Y cuánto tarda en girar el rosco entero?'),
 ('H','Depende de lo nervioso que esté el concursante. ¡Hoy va rápido!'),
 ('N','Yo prefiero la fila de atrás, que desde ahí se ven todas las letras.'),
 ('H','Pues ven con nosotros y cuéntale a todos cómo se prepara un buen aplauso.'),
 ('M','Se prepara así: manos arriba, sonrisa grande… ¡y a aplaudir!'),
 ('H','Y ahora, silencio, que volvemos a emitir. ¡Tres, dos, uno!')]
PUBLI=[('Colchones «Rosco Dormilón»','¿Duermes mal pensando en la letra Z? Con los colchones Rosco Dormilón, soñarás con veinticinco aciertos. Rosco Dormilón: descansa tú, que el bote no se va.'),
 ('Galletas «Pasa Palabra»','Galletas Pasa Palabra: crujientes por fuera, sabias por dentro. Una galleta, una definición. ¡Pruébalas con leche y con ganas de ganar!'),
 ('Relojes «Cuenta Atrás»','Relojes Cuenta Atrás: porque cada segundo vale oro. Tres minutos de rosco nunca fueron tan elegantes. Cuenta Atrás: llega siempre a tiempo.'),
 ('Paraguas «Bote y Chubasco»','Paraguas Bote y Chubasco: llueva o truene, tu bote siempre a cubierto. Ábrelo y verás que hoy sí que sale el sol.')]
# ---------------- Concursantes FICTICIOS y conversación del primer programa ----------------
C=[
 dict(n='Marta Ledesma',v='F',d='profesora de Geografía',L=[
  ('H','Bienvenida, Marta. Cuéntanos quién eres y a qué te dedicas.'),
  ('C','Hola, Christian. Soy profesora de Geografía y llevo toda la vida buscando capitales y ríos.'),
  ('H','Pues hoy buscas palabras. ¿Cocinas tan bien como colocas los mapas?'),
  ('C','Qué va. Me gusta ver a Karlos Arguiñano, pero a mí el arroz me sale pegado.'),
  ('H','Pues aquí lo que se pega es el bote. Aunque sea una tontería, ¿tienes alguna letra favorita?'),
  ('C','La erre, porque rueda sola. Y la ele, porque me recuerda a mi madre.'),
  ('H','Qué bonito. ¿Has visto Pasapalabra alguna vez desde el sofá?'),
  ('C','Cada tarde, con mi abuela. Ella siempre dice las respuestas antes que yo.'),
  ('H','Pues hoy tu abuela te anima desde casa. ¡Mucha suerte, Marta!')]),
 dict(n='Álvaro Pinedo',v='M',d='ingeniero y ciclista aficionado',L=[
  ('H','Álvaro, bienvenido. ¿Quién eres cuando no estás en un plató?'),
  ('C','Soy ingeniero. Los fines de semana me escapo en bici por la sierra.'),
  ('H','Una bici y un rosco: dos cosas que hay que saber mantener en equilibrio.'),
  ('C','Eso mismo digo yo, aunque en la bici me caigo menos que en las preguntas.'),
  ('H','¿Y has participado en otros concursos?'),
  ('C','Solo en el de mi pueblo, el de la mejor tortilla. Quedé segundo.'),
  ('H','¡Segundo en tortilla! Eso merece un aplauso. ¿Ves también a Karlos Arguiñano?'),
  ('C','A veces. Me gusta cómo se ríe mientras cocina. Yo me río, pero cuando la tortilla se rompe.'),
  ('H','Pues hoy, a romper el rosco. ¡Suerte, Álvaro!')]),
 dict(n='Rocío Garmendia',v='F',d='enfermera con afición al bordado',L=[
  ('H','Rocío, encantado. ¿Qué haces cuando no estás en el hospital?'),
  ('C','Bordo. Llevo dos años con un mantel enorme que nunca acabo.'),
  ('H','Como el rosco: parece que no acaba, pero un día se completa.'),
  ('C','Pues ojalá. Y cuando me estreso, pongo música de los programas de cocina.'),
  ('H','¿De Karlos Arguiñano, quizá?'),
  ('C','Claro. Sus recetas me relajan, aunque luego en mi casa se prende la sartén.'),
  ('H','Mejor no cocines hoy. ¿Tienes algún método para las palabras difíciles?'),
  ('C','Las apunto en una libreta. Tengo mil, y la mitad de las veces ni sé qué significan.'),
  ('H','Pues hoy es el día de ponerlas a prueba. ¡Ánimo, Rocío!')]),
 dict(n='Nacho Valverde',v='N',d='guía de museo y jugador de ajedrez',L=[
  ('H','Nacho, qué alegría. Dime, ¿de dónde vienes tú?'),
  ('C','Soy guía de un museo. Me paso el día explicando cuadros a gente cansada.'),
  ('H','Y entre cuadro y cuadro, ¿qué haces?'),
  ('C','Juego al ajedrez. El rosco me parece un tablero de veintiséis casillas.'),
  ('H','El rosco tiene veinticinco letras, Nacho. ¡Un tablero algo más raro que el tuyo!'),
  ('C','Ja, ja. Es el nerviosismo. Por cierto, mi hermano dice que soy más de concursos que de cocina.'),
  ('H','Qué casualidad: yo igual. Pero a Karlos Arguiñano no hay quien lo supere en sonrisa.'),
  ('C','Eso sí. Y en la cocina también. Yo, en cambio, solo como lo que me hace mi madre.'),
  ('H','Pues hoy toca ganar el bote para invitarla a cenar. ¡Suerte, Nacho!')])]
LINES_EXTRA=[ # frases sueltas del presentador (v09.js)
 ]
# ---------------- Pruebas previas del juego (INVENTADAS) ----------------
VF=[('El Sol es una estrella.',1),('Un pulpo tiene tres corazones.',1),('La capital de Australia es Sídney.',0),('Los delfines son peces.',0),
 ('El agua hierve a cien grados a nivel del mar.',1),('Madrid está a orillas del mar.',0),('El murciélago es un mamífero que vuela.',1),
 ('La ballena azul es el animal más grande que existe.',1),('El Quijote lo escribió Miguel de Cervantes.',1),('La Luna tiene luz propia.',0),
 ('Las arañas son insectos.',0),('El Teide está en Canarias.',1),('El oro es un metal.',1),('Venus es el planeta más cercano al Sol.',0),
 ('El corazón humano tiene cuatro cavidades.',1),('El Amazonas es un río.',1)]
INT=[(['Rojo','Azul','Verde','Mesa'],3),(['Perro','Gato','Caballo','Cuchara'],3),(['Madrid','París','Roma','Tomate'],3),(['Guitarra','Violín','Piano','Zapato'],3),
 (['Enero','Marzo','Lunes','Julio'],2),(['Manzana','Pera','Plátano','Martillo'],3),(['Silla','Sofá','Cama','Nube'],3),(['Brazo','Pierna','Mano','Lámpara'],3),
 (['Trigo','Maíz','Arroz','Coche'],3),(['Verano','Otoño','Invierno','Jueves'],3)]
LET=[('A',['Árbol','Barco','Avión','Casa','Abeja','Dedo'],[0,2,4]),('M',['Mesa','Perro','Mano','Luna','Moneda','Sol'],[0,2,4]),
 ('S',['Silla','Rosa','Sapo','Mar','Sol','Pelo'],[0,2,4]),('P',['Pato','Taza','Pan','Gato','Piedra','Lana'],[0,2,4]),
 ('T',['Tren','Rana','Tigre','Mono','Tarta','Ola'],[0,2,4]),('C',['Casa','Lobo','Coche','Mesa','Cama','Pez'],[0,2,4]),
 ('L',['Lápiz','Mano','Luna','Pie','Libro','Gato'],[0,2,4]),('R',['Rana','Pato','Rey','Sol','Rosa','Lobo'],[0,2,4])]
PRE_LINES=['Esta es una prueba previa del juego, inventada para este Pasapalabra 3D.']
D9=dict(botes=LB,roscos=[dict(t=a,d=b,src=c,dud=d,say=e) for a,b,c,d,e in R],momentos=[dict(t=a,d=b,src=c,dud=d,say=e) for a,b,c,d,e in M],
 tomas=[dict(k=k,t=t) for k,t in TOMAS],fuera=[dict(w=w,t=t) for w,t in FUERA],publi=[dict(n=n,t=t) for n,t in PUBLI],
 conc=[dict(n=c['n'],v=c['v'],d=c['d'],L=[dict(w=w,t=t) for w,t in c['L']]) for c in C],
 vf=[dict(t=t,v=v) for t,v in VF],intr=[dict(w=w,i=i) for w,i in INT],let=[dict(l=l,w=w,ok=ok) for l,w,ok in LET])
open('/workspace/repos/pasapalabra-3d-grok-bot/www/v09data.js','w').write('// v0.9 · datos (generado por tools/v09/build_data.py). «Lo mejor»: fuentes verificadas; extras y pruebas previas: texto propio.\nconst D9='+json.dumps(D9,ensure_ascii=False,separators=(',',':'))+';\n')
# frases a sintetizar: (voz, texto)
S=[]
for b in LB:S.append(('H',b['say']))
for x in D9['roscos']+D9['momentos']:S.append(('H',x['say']))
for t in D9['tomas']:S.append(('H',t['t']))
for f in D9['fuera']:S.append((f['w'],f['t']))
for p in D9['publi']:S.append(('N',p['t']))
for c in D9['conc']:
  for l in c['L']:S.append(('H' if l['w']=='H' else c['v'],l['t']))
for v in D9['vf']:S.append(('H',v['t']))
for i in D9['intr']:S.append(('H','¿Cuál es el intruso? '+', '.join(i['w'][:-1])+' o '+i['w'][-1]+'.'))
json.dump(S,open('/workspace/repos/pasapalabra-3d-grok-bot/tools/v09/lines9_data.json','w'),ensure_ascii=False)
print(len(S),'frases de datos')
