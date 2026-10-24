const p=require('/workspace/pp_ac/node_modules/puppeteer-core');
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const pg=await b.newPage();await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,3000));
console.log(await pg.evaluate(e=>eval(e).toString(),process.argv[2]));await b.close();})();
