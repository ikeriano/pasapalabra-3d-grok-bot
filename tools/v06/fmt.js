const p=require('/workspace/pp_ac/node_modules/puppeteer-core');
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const pg=await b.newPage();await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,3000));
console.log(await pg.evaluate(()=>{const o={};for(const k of ['LAL','COCO','QEQ','SOPA','DONDE','CRUZ','U4','ESC'])o[k]=D2[k]?JSON.stringify(D2[k][0]).slice(0,300)+' n='+D2[k].length:'-';for(const k of ['IMP','PUL','ESC','PAR','ROS'])o['O'+k]=ORIG[k]?JSON.stringify(ORIG[k][0]).slice(0,300)+' n='+ORIG[k].length:'-';o.keys=Object.keys(D2)+' | '+Object.keys(ORIG);return JSON.stringify(o,null,1)}));await b.close();})();
