const p=require('/workspace/pp_ac/node_modules/puppeteer-core');
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const pg=await b.newPage();await pg.setViewport({width:960,height:540});await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,3500));
for(const s of ['cu','cuo']){await pg.evaluate(s=>{menu.classList.add('hidden');MODE.menu=false;setPeople(true);DBG.cut(s);},s);await new Promise(r=>setTimeout(r,3000));console.log(await pg.evaluate(()=>cam.position.toArray().map(v=>v.toFixed(2))+" fov "+cam.fov));await pg.screenshot({path:`/tmp/s_${s}.jpg`,type:'jpeg'});}
await b.close();})();
