// v0.35 · logos de Iker para la etapa Telecinco (rojo 2007-2013, azul 2014-2019), sin retocar
(function(){const IM={r:new Image(),b:new Image()};IM.r.src='aps/logos/pasapalabra_t5_rojo.png';IM.b.src='aps/logos/pasapalabra_t5_azul.png';
const _l=logoURL;let n=0;
window.logoURL=logoURL=function(w=900,h=560,y=OPT.plato){y=+y;if(y>=2007&&y<2020){const im=y<2014?IM.r:IM.b;if(im.complete&&im.naturalWidth){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');const s=Math.min(w/im.naturalWidth,h/im.naturalHeight);const iw=im.naturalWidth*s,ih=im.naturalHeight*s;g.drawImage(im,(w-iw)/2,(h-ih)/2,iw,ih);return c.toDataURL();}}return _l.apply(this,arguments);};
const re=()=>{if(++n<2)return;try{LOGO=logoURL();}catch(e){}};IM.r.onload=re;IM.b.onload=re;})();
