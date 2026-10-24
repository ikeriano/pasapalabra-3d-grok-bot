const p=require('/workspace/pp_ac/node_modules/puppeteer-core');
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const pg=await b.newPage();await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,4000));
console.log(await pg.evaluate(()=>{const m=new Map();let L=[];S.traverse(o=>{if(o.isLight)L.push(o.type+':'+o.color.getHexString());if(!o.material)return;[].concat(o.material).forEach(x=>{const k=x.type+' '+(x.color?x.color.getHexString():'')+' em'+(x.emissive?x.emissive.getHexString():'')+(x.map?' map':'');m.set(k,(m.get(k)||0)+1);});});
return JSON.stringify({bg:S.background&&S.background.getHexString&&S.background.getHexString(),fog:!!S.fog,L,mats:[...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,60),keys:Object.keys(P),hostKids:P.host.children.length});}));await b.close();})();
