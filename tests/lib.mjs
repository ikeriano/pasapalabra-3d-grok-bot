// Utilidades de test táctil: Chrome headless con viewport de móvil y eventos táctiles REALES (CDP Input.dispatchTouchEvent)
import puppeteer from 'puppeteer-core';
import http from 'http';import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const here=path.dirname(fileURLToPath(import.meta.url));
export const WWW=process.env.WWW||path.join(here,'..','www');
const MIME={'.html':'text/html','.js':'text/javascript','.ttf':'font/ttf','.ogg':'audio/ogg','.png':'image/png','.jpg':'image/jpeg','.json':'application/json'};
export function serve(){return new Promise(r=>{const s=http.createServer((q,res)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p=='/')p='/index.html';const f=path.join(WWW,p);if(!f.startsWith(WWW)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end();}
 res.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);}).listen(0,'127.0.0.1',()=>r(s));});}
export const sleep=ms=>new Promise(r=>setTimeout(r,ms));
// El juego se ve en horizontal (sensorLandscape): el Redmi A2 es 720x1600 y gira a 1600x720.
export async function open(opts={}){
 const s=await serve(),port=s.address().port;
 const b=await puppeteer.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required','--ignore-gpu-blocklist']});
 const p=await b.newPage();const W=opts.w||1600,H=opts.h||720;
 await p.setViewport({width:W,height:H,deviceScaleFactor:opts.dpr||1,isMobile:true,hasTouch:true});
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.evaluateOnNewDocument(()=>{window.__ev=[];for(const t of ['pointerdown','pointerup','pointercancel','touchstart','touchend','click','mousedown'])addEventListener(t,e=>{__ev.push(t)},true);});
 await p.goto(`http://127.0.0.1:${port}/index.html`,{waitUntil:'load'});
 await p.waitForFunction('window.DBG&&document.querySelector("#menu .title")',{timeout:60000});
 const cdp=await p.createCDPSession();
 const T={p,b,s,cdp,errs,W,H,
  async touch(pts,{step=16,wait=0}={}){// pts: [[x,y],...] primer punto = touchstart, último = touchend
   const P=a=>[{x:a[0],y:a[1],id:1}];await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:P(pts[0])});
   for(let i=1;i<pts.length;i++){if(step)await sleep(step);await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:P(pts[i])});}
   if(wait)await sleep(wait);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});},
  tap:(x,y)=>T.touch([[x,y]],{step:0,wait:40}),
  // desliza de (x,y) a (x+dx,y+dy) en n pasos
  swipe:(x,y,dx,dy,n=12,{step=16,wait=0}={})=>T.touch(Array.from({length:n+1},(_,i)=>[x+dx*i/n,y+dy*i/n]),{step,wait}),
  center:async sel=>p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];},sel),
  async close(){await b.close();s.close();}};
 return T;}
export function check(name,ok,info=''){console.log((ok?'✔ ':'✘ ')+name+(info?'  → '+info:''));if(!ok)check.fail=(check.fail||0)+1;return ok;}
