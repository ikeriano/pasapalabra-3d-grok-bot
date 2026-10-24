const p=require('/workspace/pp_ac/node_modules/puppeteer-core');
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const pg=await b.newPage();await pg.setViewport({width:1280,height:720});pg.on('pageerror',e=>console.log('ERR',e.message));
await pg.evaluateOnNewDocument(()=>{localStorage.setItem('pp3d_opt',JSON.stringify({etapa:2019,plato:2019,mus:0,sfx:0}));});
await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,3500));
const ids=await pg.evaluate(()=>{menu.classList.add('hidden');MODE.menu=false;document.body.classList.add('ingame');return L5.TEMAS.map(t=>t.id).filter(i=>DR6[i]);});
console.log(ids.join(' '));
for(const id of ids){await pg.evaluate(id=>{TH6.clear();const T=L5.TEMAS.find(t=>t.id==id);V6.cur=T;TH6.apply(id);cut('wide');},id);await new Promise(r=>setTimeout(r,1200));
 await pg.screenshot({path:`/workspace/envio/pp3d/v07/v07_tema_${id}.jpg`,type:'jpeg',quality:80});
 if(id=='halloween'||id=='navidad'){await pg.evaluate(()=>cut('host'));await new Promise(r=>setTimeout(r,900));await pg.screenshot({path:`/tmp/tema_host_${id}.jpg`,type:'jpeg',quality:80});}}
await b.close();})();
