// v0.10 · lector de clips empaquetados. Si existe el índice (APK), los «new Audio('snd/p5/xxx.ogg')» salen de un solo fichero .bin;
// sin índice (repositorio / pruebas) no hace nada y se usan los ficheros sueltos.
(function(){const M=window.PK10;if(!M)return;const NA=window.Audio,blobs={},ready={},maps={},urls=new Map();
 const dirs=Object.keys(M);
 function load(d){if(!ready[d])ready[d]=new Promise(res=>{try{const x=new XMLHttpRequest();x.open('GET',M[d].f);x.responseType='blob';x.onload=()=>{blobs[d]=x.response;res(x.response);};x.onerror=()=>res(null);x.send();}catch(e){res(null);}});return ready[d];}
 function map(d){if(!maps[d]){const n=M[d].n.split(','),l=M[d].l.split(',').map(Number),m={};let o=0;for(let i=0;i<n.length;i++){m[n[i]]=[o,l[i]];o+=l[i];}maps[d]=m;}return maps[d];}
 function url(d,n){const k=d+n;let u=urls.get(k);if(u)return u;const b=blobs[d];if(!b)return null;const e=map(d)[n];if(!e)return null;u=URL.createObjectURL(b.slice(e[0],e[0]+e[1],'audio/ogg'));urls.set(k,u);
  if(urls.size>300){const f=urls.keys().next().value;URL.revokeObjectURL(urls.get(f));urls.delete(f);}return u;}
 function PA(src){const a=new NA();if(src===undefined)return a;src=String(src);const d=dirs.find(x=>src.startsWith(x));
  if(!d||!src.endsWith('.ogg')){a.src=src;return a;}const n=src.slice(d.length,-4);if(!map(d)[n]){a.src=src;return a;}
  if(blobs[d]){a.src=url(d,n);return a;}
  const op=a.play;a.play=function(){return load(d).then(()=>{if(!a.src||a.src===location.href)a.src=url(d,n)||'';return op.call(a);});};return a;}
 PA.prototype=NA.prototype;window.Audio=PA;
 // precarga en segundo plano (tras arrancar)
 setTimeout(()=>dirs.forEach(d=>load(d)),400);
})();
