import json,re
AC=json.load(open('ac_themes.json'));Q=json.load(open('q6.json'))
hx=lambda v:v if isinstance(v,str) else '#%06x'%v
def dress_ac(i):
  t=AC[i];h=t['host'];return dict(wa=hx(t['wallA']),wb=hx(t['wallB']),glow=hx(t['glow']),acc=hx(t['accent']),bg=hx(t['bg']),fog=hx(t['fog']),suit=hx(h['suit']),shirt=hx(h['shirt']),tie=hx(h['tie']),hat=h.get('hat',''),bow=bool(h.get('bowtie')))
def D(wa,wb,glow,acc,bg,suit='#1a1d26',shirt='#ffffff',tie='#c8102e',hat='',bow=False):return dict(wa=wa,wb=wb,glow=glow,acc=acc,bg=bg,fog=bg,suit=suit,shirt=shirt,tie=tie,hat=hat,bow=bow)
EM={'halloween':'🎃🦇👻🕷️🕸️💀🍬🧙','navidad':'🎄🎁⛄🔔⭐🦌🍪❄️','nochebuena':'🕯️🌟🍷🎄🦃🔔','mayores':'🎄👵👴🍫🎁☕','abuelos':'👵👴🧶☕🍪📻','carnaval':'🎭🎉🪅👑🎊🥁','findeano':'🥂🍇🕛🎆🎉✨','verano':'🏖️☀️🍉🕶️🍦🌴⛱️🦀','ninos':'🧸🎈🍭🪁🎠🖍️🦄🚂','especial300':'▶️🎬🎉⭐📈🏆','sub400ikeriano':'▶️🏆🎬🎉⭐','sub400marchelitos':'▶️🎬🎉⭐💜','mil':'🎉🎂🏆✨🎊🥇','fantasticos':'⚽🏆⭐🥇💪🎖️','profesiones':'🚒👩‍🍳👨‍⚕️👮🔧👩‍🏫','sanvalentin':'💘❤️🌹💌🍫💕','famosos':'⭐🎬🎤📸🕶️🏆','eligehuella':'🐾👣🐶🐱✨','aniversario':'🎂🎈🎉🥳🎁✨','youtube':'▶️📱🎬👍🔔💬','ano3000':'🚀🤖🛸🪐👽🛰️','piratas':'🏴‍☠️🦜⚓🗺️💰⚔️','dinosaurios':'🦖🦕🌋🥚🌿🦴','cole':'🎒📚✏️📐🍎🖍️','olimpiadas':'🏅🔥🥇🏃⚽🏊','selva':'🌴🐒🦁🐍🦜🐘','mar':'🐠🐙🐬🦀🐚🐳','primavera':'🌸🌷🐝🦋🌼🌈','reyes':'👑🐫⭐🎁🎂🌟',
 'primetime':'🌟💃🎧🎶✨💰','familia':'👨‍👩‍👦🏠❤️🎉','copa':'🏆🥇⭐🎖️','duelo':'⚔️🛡️🏆🔥','noche':'🌙⭐🏆✨','granfinal':'🏆🥇🎊⭐','connueve':'9️⃣🧠☀️🏖️','dibujadas':'✏️🖍️🎨🖼️','dibujadasnav':'✏️🎨🎄⛄','edverano':'☀️🏖️🍉🌊','reyes2016':'👑🏫🎁⭐','nochevieja2018':'🍇🕛🥂🎆','programa1000':'🎂🎉1️⃣🏆','granfinal2019':'🏆🎊🥇⭐','alaz':'🔠🔤🅰️🆉','ninos2':'🧸🏫🎈🍭🖍️🎒'}
DR={k:dress_ac(k) for k in AC if k not in('normal','ahoracago')}
DR['reyes']=D('#2a0b50','#6a2aa0','#ffd23a','#ff5fb0','#0e0520',suit='#5a1a8a',tie='#ffd23a',hat='corona')
DR['familia']=D('#0d3a1a','#2a8a3a','#3dcc5a','#ffd23a','#04140a',tie='#3dcc5a')
DR['copa']=D('#2a2008','#8a6a10','#ffd23a','#ffffff','#120d02',tie='#ffd23a',bow=True)
DR['duelo']=D('#3a0808','#a01a10','#ff3c28','#ffd23a','#140302',tie='#ff3c28')
DR['noche']=D('#060a3a','#1a2aa0','#3c50ff','#ffd23a','#02031a',tie='#3c50ff',bow=True)
DR['granfinal']=dict(DR['copa'])
DR['connueve']=D('#003a4a','#00a0c0','#26c2f0','#ffd23a','#001820',suit='#f0f0f0',shirt='#26c2f0',tie='#ffd23a',hat='paja')
DR['dibujadas']=D('#3a2a00','#e09a10','#ffd23a','#ff5fb0','#1a1000',suit='#2a6af0',shirt='#ffffff',tie='#ff5fb0',hat='paja')
DR['dibujadasnav']=dict(DR['navidad'])
DR['edverano']=dict(DR['verano'])
DR['reyes2016']=dict(DR['reyes'])
DR['nochevieja2018']=dict(DR['findeano'])
DR['programa1000']=dict(DR['mil'],hat='fiesta')
DR['granfinal2019']=dict(DR['copa'])
DR['alaz']=D('#0a1a40','#ff7a1a','#ff8a1a','#2a7bff','#040a1c',tie='#ff8a1a')
DR['ninos2']=D('#3a0a5a','#ff5fb0','#ffd23a','#26c2f0','#1a0830',suit='#2a6af0',shirt='#fff36a',tie='#ff3c8c',hat='helice')
for k in DR:DR[k]['em']=EM.get(k,'⭐✨')
fix=lambda s:re.sub(r'¡Ahora [Cc]aigo!(!?)',lambda m:'Pasapalabra!'+('' if m.group(1) else ''),re.sub(r'(?<!¡)Ahora [Cc]aigo','Pasapalabra',s)).replace('trampillas doradas','roscos dorados').replace('a las trampillas','al rosco').replace('los valores de cada huella los habéis elegido vosotros','las palabras del rosco las habéis elegido vosotros')
# --- temas nuevos (Programa temático) portados de AC
TEMAN={}
for k,t in AC.items():
  if k in('normal','ahoracago','primetime'):continue
  TEMAN[k]=dict(id=k,name=t['name'].replace('¡Ahora caigo! 1000','Pasapalabra 1000'),emoji=t['emoji'],banner=t.get('banner') or ('ESPECIAL '+t['name'].upper()),saludo=fix(t.get('saludo','')))
TEMAN['reyes']=dict(id='reyes',name='Reyes Magos',emoji='👑',banner='ESPECIAL REYES',saludo='¡Feliz día de Reyes! Bienvenidos a Pasapalabra: hoy Sus Majestades traen un rosco lleno de regalos.')
TOPIC={'halloween':'monstruos, brujas y calabazas','navidad':'la Navidad','nochebuena':'la Nochebuena','mayores':'la Navidad y nuestros mayores','abuelos':'los abuelos','carnaval':'disfraces y fiesta','findeano':'el Fin de Año','verano':'el verano','ninos':'cosas de niños','especial300':'YouTube y vídeos','sub400ikeriano':'YouTube y vídeos','sub400marchelitos':'YouTube y vídeos','mil':'celebraciones y récords','fantasticos':'los grandes campeones','profesiones':'las profesiones','sanvalentin':'el amor','famosos':'los famosos','eligehuella':'animales y huellas','aniversario':'cumpleaños y fiestas','youtube':'YouTube','ano3000':'el futuro','piratas':'piratas y tesoros','dinosaurios':'los dinosaurios','cole':'el colegio','olimpiadas':'los deportes','selva':'la selva','mar':'el fondo del mar','primavera':'la primavera','reyes':'los Reyes Magos'}
for k,T in TEMAN.items():
  T['intro']=[f'Hoy todas las preguntas, y también las del rosco, van de <b>{TOPIC[k]}</b>.','¡El plató se ha vestido para la ocasión! ¡Mucha suerte, equipo azul!']
# --- especiales nuevos
ESPN={
'connueve':dict(name='Con nueve basta',sub='Verano 2013 y 2014 · prueba de memoria: nueve palabras en orden · 2 s por acierto',emoji='9️⃣',etapa=2011,q='connueve',add=['connueve','quees'],
 intro=['¡Bienvenidos a la edición de verano de Pasapalabra con una prueba nueva: <b>Con nueve basta</b>!','Os enseño palabras una a una y tenéis que recordarlas en el mismo orden.','Cada serie que acertéis suma <b>dos segundos</b> para el rosco. ¡Con nueve basta!']),
'dibujadas':dict(name='Palabras dibujadas · verano',sub='Verano de 2016 · adivina la palabra a partir de un dibujo · 5 s por acierto',emoji='✏️',etapa=2014,q='dibujadas',dr='dibujadas',add=['dibujadas','rosco'],
 intro=['¡Bienvenidos al especial de verano con <b>Palabras dibujadas</b>!','Un dibujo aparece poco a poco en la pantalla. ¡Adivinad qué palabra es!','Cada acierto suma <b>cinco segundos</b> para el rosco.']),
'dibujadasnav':dict(name='Palabras dibujadas · Navidad',sub='Navidad de 2016 · los dibujos se llenan de espumillón',emoji='🎨',etapa=2014,q='navidad',add=['dibujadas','rosco'],
 intro=['¡Feliz Navidad! Hoy volvemos con <b>Palabras dibujadas</b>, edición navideña.','Los dibujos son de Navidad: árboles, regalos, renos… ¡Atentos!']),
'edverano':dict(name='Edición Verano',sub='Pasapalabra de verano · plató de playa y preguntas de vacaciones',emoji='🏖️',etapa=2017,q='edverano',
 intro=['¡Bienvenidos a la <b>edición de verano</b> de Pasapalabra!','Hoy el plató huele a crema solar y todas las preguntas son de vacaciones.']),
'reyes2016':dict(name='Especial Reyes 2016',sub='6 de enero de 2016 · dos colegios apadrinados por famosos · aula de informática para el colegio',emoji='👑',etapa=2014,q='reyes',kids=True,rivalN='Colegio naranja',
 intro=['¡Feliz día de Reyes! Hoy Pasapalabra es <b>solidario</b>.','Juegan dos colegios, cada uno apadrinado por un famoso.','El colegio ganador se lleva un <b>aula de informática</b>. ¡Vamos, colegio azul!']),
'nochevieja2018':dict(name='Nochevieja 2018',sub='31 de diciembre de 2018 · gala de fin de año con uvas en el rosco',emoji='🍇',etapa=2017,q='nochevieja',
 intro=['¡Bienvenidos a la última tarde del año en Pasapalabra!','Hoy despedimos 2018 con un rosco de uvas, campanadas y cotillón.']),
'programa1000':dict(name='Programa 1000',sub='El programa número mil de Telecinco · tarta, globos y confeti',emoji='🎂',etapa=2011,q='programa1000',
 intro=['¡Hoy es un día histórico: celebramos el <b>programa mil</b> de Pasapalabra!','Mil programas, miles de roscos y muchísimos «¡Pasapalabra!». ¡Gracias por estar ahí!']),
'granfinal2019':dict(name='Gran final · Copa de maestros 2019',sub='2019 · solo la gran final a rosco entre dos maestros',emoji='🏆',etapa=2019,q='granfinal',torneo=dict(players=['Paco Fernández','Rosa Nestal'],rounds=['Gran final'],tie='tiron'),
 intro=['¡Bienvenidos a la <b>Gran final de la Copa de maestros</b>!','Solo queda un rosco: el que gane, ¡se lleva la copa!']),
'alaz':dict(name='AlaZ · la final',sub='Final de AlaZ: El Rosco de 110 segundos, de la A a la Z o de la Z a la A',emoji='🔠',etapa=2019,q='alaz',alaz=True,
 intro=['¡Bienvenidos a la final de <b>AlaZ</b>!','En el rosco final tienes <b>110 segundos</b> más los que ganes en las pruebas.','Y tú eliges: ¿de la <b>A a la Z</b>… o de la <b>Z a la A</b>?']),
'ninos2':dict(name='Pasapalabra Niños',sub='Especial infantil: dos colegios, preguntas muy fáciles y un plató de colores',emoji='🧸',etapa=2014,q='ninos2',kids=True,rivalN='Colegio naranja',
 intro=['¡Hola, chicos y chicas! ¡Bienvenidos a <b>Pasapalabra Niños</b>!','Hoy juegan dos colegios. Cada equipo tiene un padrino famoso.','Las preguntas son facilísimas… ¡pero hay que estar atentos!','El colegio que gane se lleva un premio para toda la clase. ¡Vamos!']),
}
for k in ESPN:ESPN[k].setdefault('dr',k);ESPN[k]['banner']=ESPN[k]['name'].upper().replace(' · ',' · ')
# AC ports as specials
ACP={}
for k,T in TEMAN.items():
  ACP['ac_'+k]=dict(name=T['name'],sub='Especial de «¡Ahora Caigo!» adaptado a Pasapalabra',emoji=T['emoji'],q=k,dr=k,tema=k,banner=T['banner'],intro=[T['saludo']]+T['intro'])
QMAP={k:Q[k] for k in Q}
js='// v0.6 datos: decorados, temas, especiales y preguntas temáticas (generado por pp3d/v06/gen6.py)\n'
js+='const DR6='+json.dumps(DR,ensure_ascii=False)+';\n'
js+='const TEMA6='+json.dumps(list(TEMAN.values()),ensure_ascii=False)+';\n'
js+='const ESP6='+json.dumps(ESPN,ensure_ascii=False)+';\n'
js+='const ACP6='+json.dumps(ACP,ensure_ascii=False)+';\n'
js+='const Q6D='+json.dumps(QMAP,ensure_ascii=False,separators=(',',':'))+';\n'
open('/workspace/pp3d/app/www/v06data.js','w').write(js)
# lines for Piper
lines=set()
for T in TEMAN.values():lines|={T['saludo'],*T['intro']}
for E in ESPN.values():lines|=set(E['intro'])
json.dump(sorted(lines),open('lines6.json','w'),ensure_ascii=False)
print(len(lines),len(js))
