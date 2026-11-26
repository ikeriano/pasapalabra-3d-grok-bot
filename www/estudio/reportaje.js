/* Reportaje en pantalla (1.69 AC / 1.2 UPG): cuando alguien habla de algo, sale un recuadro de reportaje
   con imágenes o vídeos de ese tema (medios de Iker y capturas del juego). Carga perezosa: el vídeo solo
   recibe src al mostrarse y se suelta al ocultarse (bueno para el Redmi A2). Nunca bloquea la escena. */
(function () {
  const me = document.currentScript && document.currentScript.src || location.href;
  const ROOT = me.replace(/[^/]*$/, '') + '../';
  const R = window.REPORTAJE = { on: localStorage.getItem('reportaje_off') !== '1', cat: [], def: [], ult: null, usados: {} };
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let box, lab, cur = null, tOcultar = 0, rot = 0;
  function dom() {
    if (box) return;
    const st = document.createElement('style');
    st.textContent = '#reportaje{position:fixed;top:24%;right:1.5%;width:min(34vw,430px);aspect-ratio:16/9;z-index:40;pointer-events:none;border:3px solid #ffd23a;border-radius:12px;overflow:hidden;background:#000;box-shadow:0 6px 24px #000a;opacity:0;transform:scale(.92);transition:opacity .45s,transform .45s}' +
      '#reportaje.v{opacity:1;transform:none}#reportaje{background:#123}#reportaje>video,#reportaje>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .5s}' +
      '#reportaje>img.kb{animation:repkb 9s ease-in-out infinite alternate}@keyframes repkb{from{transform:scale(1)}to{transform:scale(1.12) translate(-3%,-2%)}}' +
      '#reportaje>b{position:absolute;left:0;top:0;z-index:2;background:#d00d;color:#fff;font:800 clamp(9px,1.4vw,13px) system-ui,Arial;padding:.25em .6em;border-bottom-right-radius:8px;letter-spacing:.05em}' +
      '@media (max-height:420px){#reportaje{top:26%;width:min(29vw,290px)}}';
    document.head.appendChild(st);
    box = document.createElement('div'); box.id = 'reportaje'; lab = document.createElement('b'); box.appendChild(lab); document.body.appendChild(box);
  }
  function soltar(el) { if (el && el.tagName === 'VIDEO') { try { el.pause(); el.removeAttribute('src'); el.load(); } catch (e) { } } el && el.remove(); }
  function mostrar(m, titulo) {
    dom(); const [tipo, ruta] = [m[0], m.slice(2)]; let [src, t] = ruta.split('@'); const url = ROOT + src;
    if (cur === m) return; cur = m;
    const viejos = [...box.querySelectorAll('video,img')];
    let el;
    const base = () => { if (box.querySelector('img.base')) return; const f = R.fondo || (window.REPORTAJE_FONDO); if (!f) return; const b = document.createElement('img'); b.className = 'base kb'; b.src = ROOT + f; b.style.zIndex = -1; box.insertBefore(b, box.firstChild); };
    base();
    const quitarViejos = () => viejos.forEach(v => { if (!v.classList.contains('base')) soltar(v); });
    if (tipo === 'v') {
      el = document.createElement('video'); el.muted = true; el.playsInline = true; el.setAttribute('playsinline', ''); el.preload = 'auto'; el.loop = true;
      const poster = url.replace(/\.(mp4|webm)$/, '.jpg'); el.poster = poster;
      let listo = false; const ver = () => { if (listo || cur !== m) return; listo = true; el.style.opacity = 1; setTimeout(quitarViejos, 550); };
      const aImg = () => { if (listo) return; const i = document.createElement('img'); i.src = poster; i.className = 'kb'; i.style.opacity = 0; i.onload = () => { if (cur === m) { i.style.opacity = 1; setTimeout(quitarViejos, 550); } }; i.onerror = () => i.remove(); el.replaceWith(i); listo = true; };
      el.onerror = aImg; el.addEventListener('playing', ver); el.addEventListener('loadeddata', () => { if (el.readyState >= 2) ver(); });
      setTimeout(() => { if (!listo) aImg(); }, 2500);
      el.src = url + (t ? '#t=' + t : ''); el.play && el.play().catch(() => { });
      el.style.opacity = 0; box.insertBefore(el, lab);
    } else { el = document.createElement('img'); el.className = 'kb'; el.decoding = 'async'; el.style.opacity = 0; el.onload = () => { if (cur === m) { el.style.opacity = 1; setTimeout(quitarViejos, 550); } }; el.src = url; el.onerror = () => el.remove(); box.insertBefore(el, lab); }
    lab.textContent = '🎥 REPORTAJE · ' + titulo; box.classList.add('v');
  }
  R.ocultar = function () { if (!box) return; box.classList.remove('v'); cur = null; setTimeout(() => { if (!cur) box.querySelectorAll('video,img').forEach(e => { if (!e.classList.contains('base')) soltar(e); }); }, 500); };
  R.elegir = function (texto) {
    const n = norm(texto);
    for (const c of R.cat) { if (c.re.test(n)) { const k = c.t, i = (R.usados[k] = (R.usados[k] || 0) + 1) - 1; return [c.m[i % c.m.length], c.t]; } }
    if (R.ult) return R.ult;
    const d = R.def; if (!d.length) return null; return [d[(rot++) % d.length], 'Detrás de las cámaras'];
  };
  R.linea = function (texto, quien) {
    try {
      if (!R.on || !texto) return; const e = R.elegir(texto); if (!e) return; R.ult = e; mostrar(e[0], e[1]);
      clearTimeout(tOcultar); tOcultar = setTimeout(() => { R.ult = null; R.ocultar(); }, 14000);
    } catch (err) { }
  };
  R.cargar = function (lista, def) { R.cat = lista.map(c => ({ re: new RegExp(c.k), m: c.m, t: c.t })); R.def = def || []; if (!R.fondo) { const all = [].concat(R.def, ...lista.map(c => c.m)); const i = all.find(x => x && x[0] === 'i'); if (i) R.fondo = i.slice(2); } };
})();
