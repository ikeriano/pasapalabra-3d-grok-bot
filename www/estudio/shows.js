// Platós del edificio (uno por programa). tipo = decorado low-poly. inv = 🆕 INVENTADO
window.ESTUDIO_SHOWS = window.ESTUDIO_SHOWS || [
 {id:'pasapalabra',n:'Pasapalabra',tipo:'rosco',c:[0x0a2a6a,0x1e90ff,0xffd400],real:true,detalle:true},
 {id:'ahoracaigo',n:'¡Ahora Caigo!',tipo:'trampillas',c:[0x3a1a8a,0xff8a00,0xffd400]},
 {id:'unoparaganar',n:'Uno para ganar',tipo:'mesareloj',c:[0x0b2a8a,0xe8262d,0xffd23a]},
 {id:'cifras',n:'Cifras y Letras',tipo:'pizarra',c:[0x123a2a,0x2ecc71,0xffffff]},
 {id:'tiron',n:'El Tirón',tipo:'atriles',c:[0x4a0a2a,0xff3060,0xffd400]},
 {id:'cazador',n:'El Cazador',tipo:'escalera',c:[0x101820,0xff2020,0xffffff],real:true},
 {id:'ruleta',n:'La Ruleta de la Suerte',tipo:'ruleta',c:[0x2a0a5a,0xff00aa,0xffd400],real:true},
 {id:'wipeout',n:'Wipeout',tipo:'obstaculos',c:[0x0a4a6a,0xff6a00,0x3aff6a]},
 {id:'password',n:'Password',tipo:'atriles',c:[0x1a1a1a,0x00e0ff,0xff00ff]},
 {id:'millonario',n:'¿Quién quiere ser millonario?',tipo:'circulo',c:[0x05052a,0x5050ff,0xffffff],real:true},
 {id:'tenable',n:'Tenable',tipo:'torre',c:[0x0a0a3a,0x00ffcc,0xffd400]},
 {id:'aciertaocae',n:'Acierta o Cae',tipo:'trampillas',c:[0x0a1a5a,0x1e5aff,0xffffff],inv:true},
 {id:'boom',n:'Boom',tipo:'bomba',c:[0x2a0a0a,0xff4400,0xffd400],real:true},
 {id:'altatension',n:'Alta Tensión',tipo:'atriles',c:[0x061a6a,0x5ad1ff,0xffd400],real:true},
 {id:'reaccionencadena',n:'Reacción en cadena',tipo:'atriles',c:[0x06208a,0x3aff6a,0xff7a1a],real:true},
 {id:'ruedalaletra',n:'Rueda la Letra',tipo:'atriles',c:[0x3a1a5a,0xc03ad0,0x2ad0e0],real:true},
 {id:'veinticinco',n:'25 Palabras',tipo:'atriles',c:[0x0a2aa0,0x2ad8ff,0xffc81a],real:true}
];

// real:true = réplica del plató REAL de TV (estudio/reales.js, fotos en ref/platos_reales). ?navidad=1 activa la edición navideña (árbol + regalos).
(function(){var q=new URLSearchParams(location.search),nv=q.get('navidad')==='1';var era=q.get('era');window.ESTUDIO_SHOWS.forEach(function(s){s.navidadActiva=nv;if(era&&s.id==='ruleta')s.era=era;});})();
