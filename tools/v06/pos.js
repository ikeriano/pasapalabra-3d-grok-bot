const p=require('/workspace/pp_ac/node_modules/puppeteer-core');
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const pg=await b.newPage();await pg.goto('http://localhost:8766/index.html');await new Promise(r=>setTimeout(r,3500));
console.log(await pg.evaluate(()=>JSON.stringify(['ply','ply2','cpu','cpu2'].map(k=>{const o=P[k];const w=new THREE.Vector3();o.getWorldPosition(w);return k+' '+w.toArray().map(v=>v.toFixed(2))+' rot '+o.rotation.y.toFixed(2)+' '+(o.parent&&o.parent.rotation.y.toFixed(2))}))));await b.close();})();
