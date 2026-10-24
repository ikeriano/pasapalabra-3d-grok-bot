const p=require('/workspace/pp_ac/node_modules/puppeteer-core');
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
const pg=await b.newPage();await pg.setViewport({width:1280,height:600});pg.on('console',m=>{if(/error|warn/i.test(m.type()))console.log('C',m.type(),m.text())});pg.on('pageerror',e=>console.log('PE',e.message));
await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,5000));
await pg.evaluate(()=>{OPT.plato=OPT.etapa=+(new URLSearchParams(location.search).get('e')||2011);GAME.res=[21,18];const r=++RUN;document.querySelector('.menu,#menu')?.classList.add('hidden');despedida(r).catch(e=>console.error('ERR',e&&e.stack||e));});
await new Promise(r=>setTimeout(r,11000));await pg.screenshot({path:'/workspace/envio/pp3d/v06_creditos.jpg',quality:85});
await new Promise(r=>setTimeout(r,13500));await pg.screenshot({path:'/workspace/envio/pp3d/v06_final_logo.jpg',quality:85});
await new Promise(r=>setTimeout(r,5000));console.log('menu?',await pg.evaluate(()=>!!document.getElementById('fin6')));await b.close();})();
