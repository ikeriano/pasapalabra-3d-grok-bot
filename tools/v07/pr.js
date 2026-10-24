const p=require('/workspace/pp_ac/node_modules/puppeteer-core');const [,,tag,...L]=process.argv;
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
for(const it of L){const [fn,y,ms]=it.split(':');const pg=await b.newPage();await pg.setViewport({width:1280,height:720});pg.on('pageerror',e=>console.log(fn,'ERR',e.message));pg.on('console',m=>{if(/rror|warn/i.test(m.text()))console.log(fn,m.text())});
await pg.evaluateOnNewDocument(y=>{localStorage.setItem('pp3d_opt',JSON.stringify({etapa:+y,plato:+y,mus:0,sfx:0}));},y);
await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,3000));
const ok=await pg.evaluate(fn=>{menu.classList.add('hidden');MODE.menu=false;document.body.classList.add('ingame');GAME.sec=[20,25];const f=DBG[fn]||window[fn];if(!f)return false;const rid=DBG.run();f(rid).catch(e=>{if(!/abort|RUN/i.test(e))console.log('error '+e)});return true;},fn);
if(!ok)console.log(fn,'missing');await new Promise(r=>setTimeout(r,+ms||9000));
await pg.screenshot({path:`/tmp/pr_${tag}_${fn}.jpg`,type:'jpeg',quality:82});await pg.close();}
await b.close();})();
