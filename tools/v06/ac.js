const p=require('/workspace/pp_ac/node_modules/puppeteer-core');
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
for(const t of ['halloween','navidad']){const pg=await b.newPage();await pg.setViewport({width:1024,height:480});
await pg.evaluateOnNewDocument(t=>{localStorage.setItem('ac_theme',t);localStorage.setItem('ac_estreno_visto','1');},t);
await pg.goto('http://localhost:8767/index.html');await new Promise(r=>setTimeout(r,9000));await pg.screenshot({path:'/tmp/ac_'+t+'.jpg',quality:80});await pg.close();}
await b.close();})();
