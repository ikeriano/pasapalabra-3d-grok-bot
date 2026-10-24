const p=require('/workspace/pp_ac/node_modules/puppeteer-core');const ids=process.argv.slice(2);
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
for(const id of ids){const pg=await b.newPage();await pg.setViewport({width:1280,height:720});pg.on('pageerror',e=>console.log(id,'ERR',e.message));pg.on('console',m=>{if(/warn|rror/i.test(m.text()))console.log(id,'C',m.text())});
await pg.evaluateOnNewDocument(()=>{localStorage.setItem('pp3d_opt',JSON.stringify({etapa:2014,plato:2014,mus:0,sfx:0}));});
await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,3000));
await pg.evaluate(id=>{especial(id).catch(e=>console.log('rror '+e.stack))},id);await new Promise(r=>setTimeout(r,+process.env.D||9000));
await pg.screenshot({path:`/workspace/envio/pp3d/v07/v07_especial_${id}.jpg`,type:'jpeg',quality:80});await pg.close();}
await b.close();})();
