const fs=require('fs');
const ls={};
global.window={};
global.document={readyState:'complete', addEventListener(){}, getElementById(){return null;}, querySelector(){return null;}, querySelectorAll(){return [];}, createElement(){return {appendChild(){}, style:{}, className:'', textContent:''};}};
global.localStorage={getItem:k=>ls.hasOwnProperty(k)?ls[k]:null, setItem:(k,v)=>{ls[k]=String(v);}, removeItem:k=>{delete ls[k];}};
global.Audio=function(){this.play=()=>Promise.resolve(); this.pause=()=>{}; this.load=()=>{}; this.removeAttribute=()=>{};};
const root='/workspace/pasapalabra037/www';
eval(fs.readFileSync(root+'/chat039_data.js','utf8'));
eval(fs.readFileSync(root+'/chat039.js','utf8'));
const P=window.PP039;
function run(who, msgs){
  const lines=[];
  for (const m of msgs){
    const r=P.replyFor(m, who);
    lines.push({user:m, who, reply:r.text, intent:r.intent});
  }
  return lines;
}
P.saveName('');
const c1=run('Christian',['Hola','Me llamo iker','¿Qué tal estás?','Ayer soñé con un autobús de lunares']);
const c2=run('Christian',['Cuéntame un chiste','Adiós']);
P.saveName('');
const lola=run('Lola',['Hola','Me llamo iker','Cuéntame un chiste']);
process.stdout.write(JSON.stringify({c1,c2,lola},null,2));
