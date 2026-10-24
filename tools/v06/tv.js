const p=require('/workspace/pp_ac/node_modules/puppeteer-core');const [,,which,year]=process.argv;
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
const pg=await b.newPage();await pg.setViewport({width:1280,height:720});pg.on('pageerror',e=>console.log('ERR',e.message));pg.on('console',m=>{console.log('C',m.text())});
await pg.evaluateOnNewDocument(y=>{localStorage.setItem('pp3d_opt',JSON.stringify({etapa:+y,plato:+y,mus:0,sfx:0}));},year);
await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,3500));
const sl=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(w=>{menu.classList.add('hidden');MODE.menu=false;GAME.sec=w=='alaZ'?[30,25]:[20,25];if(w=='cocoLoco')D2.COCO=[['ELEFANTE','Animal enorme con trompa y orejas grandes'],['GLOBO','Se infla con aire']];const rid=DBG.run();window.__p=DBG[w](rid).catch(e=>console.log('E '+e));},which);
if(which=='cocoLoco'){await sl(9000);for(const L of ['E','L']){await pg.evaluate(L=>{const b=document.querySelector(`#kb6 [data-l="${L}"]`);b&&b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))},L);await sl(1500);}await sl(800);}
else if(which=='alaZ'){await sl(5000);await pg.evaluate(()=>{const b=document.querySelector('#acts button');b&&b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))});await sl(4000);await pg.evaluate(()=>{const b=[...document.querySelectorAll('#acts button')].find(x=>/Letra/.test(x.textContent));b&&b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))});await sl(1500);}
else if(which=='alazCab'){for(const t of [800,1700,2600,3500,4800,5200,6900]){await sl(t-(global.lt||0));global.lt=t;await pg.screenshot({path:`/tmp/cab_${t}.jpg`,type:'jpeg',quality:80});}await b.close();return;}
else await sl(+process.argv[4]||6000);
await pg.screenshot({path:`/tmp/tv_${which}_${Date.now()%100000}.jpg`,type:'jpeg',quality:85});await b.close();})();
