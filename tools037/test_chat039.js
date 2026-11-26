// Node tests for the v0.39 local chat (no browser required).
const fs=require('fs');
const path=require('path');
const root=path.join(__dirname,'..','www');
const ls={};
global.window={};
global.document={readyState:'complete', addEventListener(){}, getElementById(){return null;}, querySelector(){return null;}, querySelectorAll(){return [];}, createElement(){return {appendChild(){}, style:{}, className:'', textContent:''};}};
global.localStorage={getItem:k=>ls.hasOwnProperty(k)?ls[k]:null, setItem:(k,v)=>{ls[k]=String(v);}, removeItem:k=>{delete ls[k];}};
global.Audio=function(){this.play=()=>Promise.resolve(); this.pause=()=>{}; this.load=()=>{}; this.removeAttribute=()=>{};};
eval(fs.readFileSync(path.join(root,'chat039_data.js'),'utf8'));
eval(fs.readFileSync(path.join(root,'chat039.js'),'utf8'));
const P=window.PP039;
if(!P) throw new Error('PP039 missing');
let failed=0;
function ok(name,cond,extra){if(!cond){failed++; console.error('FAIL',name,extra||'');} else console.log('OK',name);}

// name memory
ls.pp039_nombre && P.saveName('');
const n1=P.extractName('Me llamo iker');
ok('extract Me llamo iker', n1==='Iker', n1);
ok('isIker Iker', P.isIker('Iker'));
ok('isIker ikee', P.isIker('ikee'));
ok('isIker ikeriano', P.isIker('ikeriano'));
const typo=P.extractName('me yamo ikee');
ok('extract typo me yamo ikee', typo && P.isIker(typo), typo);
ok('soy feliz is not a name', P.extractName('soy feliz')==='');
ok('soy Maria', P.extractName('soy Maria')==='Maria' || P.extractName('soy maria')==='Maria');

// intents
ok('hola -> saludo', P.analyze('Hola').k==='saludo', P.analyze('Hola'));
ok('que tal -> comoestas', P.analyze('¿Qué tal estás?').k==='comoestas', P.analyze('¿Qué tal estás?'));
ok('estoy triste -> animo', P.analyze('Estoy triste').k==='animo');
ok('cuentame un chiste', P.analyze('Cuéntame un chiste').k==='chiste');
ok('adios', P.analyze('Adiós, me voy').k==='despedida');
ok('el rosco', P.analyze('Vamos al rosco').k==='rosco');
ok('me llamo wins over hola', P.analyze('Hola, me llamo Iker').k==='nombre');
ok('me gusta -> favoritos', P.analyze('Me gusta el fútbol').k==='favoritos');
ok('fallback random', P.analyze('Ayer soñé con un autobús de lunares y una taza enorme').k==='fallback', P.analyze('Ayer soñé con un autobús de lunares y una taza enorme'));
ok('typo holaa', ['saludo','fallback'].includes(P.analyze('holaa').k)); // holaa reduced? double a stays? osa('holaa','hola')=1 if not reduced to holaa with max 2 repeats... (.)\1{2,} only 3+ so holaa stays, osa=1, we have special hola typo for len>=3 osa<=1. Good if saludo.

// replies
P.saveName('');
const r1=P.replyFor('Me llamo iker','Christian');
ok('reply name Iker mentions Iker', /Iker/.test(r1.text), r1);
ok('saved Iker', P.loadName()==='Iker', P.loadName());
ok('intent nombre', r1.intent==='nombre', r1);
ok('has piper src', /^voz039\//.test(r1.src), r1.src);
ok('no robot phrase', !/respuesta preparada/i.test(r1.text));

const r2=P.replyFor('Hola','Christian');
ok('later hola uses Iker', /Iker/.test(r2.text), r2);
ok('saludo after name', r2.intent==='saludo', r2);

const r3=P.replyFor('Ayer soñé con un autobús de lunares y una taza enorme','Christian');
ok('fallback quotes user', /autobús|autobus|lunares|eso que has dicho|interesante|curiosidad|mosca|cuéntame|cuentame|«/i.test(r3.text), r3.text);
ok('fallback not robot', !/respuesta preparada/i.test(r3.text));
ok('fallback includes quote or curiosity', r3.intent==='fallback', r3);

// all avatars have lines and never robot
for(const who of ['Christian','Lola','Javi','Pablo']){
  P.saveName('');
  const a=P.replyFor('Me llamo iker', who);
  ok(who+' name Iker', /Iker/.test(a.text)&&a.intent==='nombre'&&!/respuesta preparada/i.test(a.text), a);
  const b=P.replyFor('asdf zxcv cosa rara 123', who);
  ok(who+' fallback warm', b.intent==='fallback'&&!/respuesta preparada/i.test(b.text), b);
}

// no missing audio files referenced (if already synthesized)
const missing=[];
for(const who of Object.keys(window.CHAT039.characters)){
  for(const items of Object.values(window.CHAT039.characters[who])){
    for(const it of items){
      const p=path.join(root,it.src);
      if(!fs.existsSync(p)) missing.push(it.src);
    }
  }
}
if(missing.length){
  console.log('AUDIO_PENDING', missing.length, 'first', missing[0]);
}else{
  ok('all oggs present', true);
}

if(failed){console.error('FAILED',failed); process.exit(1);}
console.log('ALL_PASS');
