// Pasapalabra DVD — «Juego clásico del DVD». Módulo 2D reutilizable.
// Uso:  import { montarClasico } from './clasico.js';
//       const c = montarClasico(hostEl, { base:'', data:D, opc:OPC, salir:()=>{...} });  c.destruir();
// Recursos (relativos a `base`): a/*.mp3, v/c/*.mp4, v/reglas.mp4, v/dvd/*.mp4 (menú en bucle, intro, cabeceras, XXX), clasico/img/*.jpg, css/clasico.css
// Opciones: base, data, opc, salir, intro (false = no reproducir la animación de título al empezar «Partida completa»)
function montarClasico(host, o) {
  const B = o.base || '', D = o.data, OPC = o.opc || { mus: 1, voz: 1, sfx: 1, musVol: 0.8, vozVol: 1, extra: 0, saltar: 0 };
  if (!document.getElementById('cls-css')) { const l = document.createElement('link'); l.id = 'cls-css'; l.rel = 'stylesheet'; l.href = B + 'css/clasico.css'; document.head.appendChild(l); }
  host.insertAdjacentHTML('beforeend', '<div id="cls"><div id="cst"><video id="cbg" loop muted playsinline preload="auto"></video><div id="cvw"></div><video id="cvid" muted playsinline preload="auto"></video><div id="cturno" class="hide"></div></div><button id="cpb" class="cbx nar cpb" style="width:auto;padding:.3em 1em;font-size:1.4em;bottom:auto">Salir</button><div id="cpa" class="hide"></div></div>');
  const R = host.querySelector('#cls'), st = R.querySelector('#cst'), vw = R.querySelector('#cvw'), vid = R.querySelector('#cvid'), bg = R.querySelector('#cbg'), tur = R.querySelector('#cturno'), pb = R.querySelector('#cpb'), pa = R.querySelector('#cpa');
  const rnd = n => (Math.random() * n) | 0, shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const NOM = { N: 'Naranja', A: 'Azul' }, otro = t => t == 'N' ? 'A' : 'N', c1 = t => t == 'N' ? 'n' : 'a', c2 = t => t == 'N' ? 'na' : 'az';
  const html = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const normL = s => s.toUpperCase().replace(/Ñ/g, '#').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/#/g, 'Ñ');
  function fit() { const w = host.clientWidth || innerWidth, h = host.clientHeight || innerHeight, sw = Math.min(w, h * 4 / 3); st.style.width = sw + 'px'; st.style.height = sw * 0.75 + 'px'; st.style.fontSize = sw / 50 + 'px'; pa.style.fontSize = Math.min(w, h * 4 / 3) / 50 + 'px'; }
  fit(); addEventListener('resize', fit); setTimeout(fit, 60);
  // ---- audio ----
  let musA = null, musN = '', duck = 1, vozA = null, vozRes = null, run = 0, pausado = false, muerto = false;
  const aud = n => { const a = new Audio(B + 'a/' + n + '.ogg'); a.preload = 'auto'; return a; };
  const vol = () => { if (musA) musA.volume = Math.min(1, OPC.musVol * duck); if (fondoN) bgVol(); };
  // vídeo de fondo en bucle (menú del DVD, con su audio). n: 0 = oculto, 1 = menú, 2 = submenús (ampliado y oscurecido para tapar los botones del DVD)
  let fondoN = 0;
  const bgVol = () => { bg.muted = !OPC.mus; bg.volume = Math.min(1, OPC.musVol * duck); };
  function fondo(n) {
    fondoN = n; st.classList.toggle('sub', n == 2);
    if (!n) { bg.pause(); bg.style.display = 'none'; return; }
    if (!bg.getAttribute('src')) bg.src = B + 'v/dvd/menu.mp4';
    bg.style.display = 'block'; bgVol(); if (!pausado) bg.play().catch(() => { bg.muted = true; bg.play().catch(() => {}); });
  }
  function musica(n, loop = true) { pararMus(); musN = n; if (!OPC.mus) return null; musA = aud(n); musA.loop = loop; musA.volume = Math.min(1, OPC.musVol * duck); musA.play().catch(() => {}); return musA; }
  function pararMus() { if (musA) { musA.pause(); musA = null; } musN = ''; }
  function sfx(n, v = 1, loop = false) { if (!OPC.sfx) return null; const a = aud(n); a.volume = Math.min(1, v * OPC.vozVol); a.loop = loop; a.play().catch(() => {}); return a; }
  function voz(n) { return new Promise(res => { cancelaVoz(); if (!OPC.voz) { res(); return; } const a = aud(n); vozA = a; vozRes = res; a.volume = Math.min(1, OPC.vozVol); duck = 0.3; vol(); const fin = () => { if (vozA === a) { vozA = null; vozRes = null; duck = 1; vol(); } res(); }; a.onended = a.onerror = fin; a.play().catch(fin); }); }
  function cancelaVoz() { if (vozA) { const a = vozA, r = vozRes; vozA = null; vozRes = null; a.pause(); a.onended = a.onerror = null; duck = 1; vol(); r && r(); } }
  const W = p => { const r = run; return Promise.resolve(p).then(v => r === run ? v : new Promise(() => {})); };
  const esperar = ms => W(new Promise(r => { let acc = 0, last = performance.now(); const iv = setInterval(() => { const n = performance.now(); if (!pausado) acc += n - last; last = n; if (acc >= ms || muerto) { clearInterval(iv); r(); } }, 50); }));
  // ---- pantallas ----
  let respuesta = null; const IMG = n => 'url(' + B + 'clasico/img/' + n + '.jpg)';
  function pant(img, h, turno, f) {
    fondo(f || 0); st.style.backgroundImage = IMG(img); vw.innerHTML = h; vid.style.display = 'none';
    if (turno) { tur.className = c1(turno); tur.textContent = 'Equipo ' + NOM[turno]; } else tur.className = 'hide';
  }
  const esp = (r) => W(new Promise(res => { respuesta = res; })).then(v => { respuesta = null; return v; });
  const bar = (r, t, c = '', x = '') => '<button class="cbar ' + c + '" data-r="' + r + '" ' + x + '>' + t + '</button>';
  const cb = (r, t, c, pos) => '<button class="cbx ' + c + ' ' + pos + '" data-r="' + r + '">' + t + '</button>';
  const hs = (r, x0, y0, x1, y1) => '<button class="hs" data-r="' + r + '" style="left:' + x0 * 100 + '%;top:' + y0 * 100 + '%;width:' + (x1 - x0) * 100 + '%;height:' + (y1 - y0) * 100 + '%"></button>';
  st.addEventListener('click', e => { const b = e.target.closest('[data-r]'); if (b && respuesta && !b.disabled) { sfx('s_click', 0.5); const f = respuesta; respuesta = null; f(b.dataset.r); } });
  // cuenta atrás
  function cuenta(seg, el, bed) {
    let resto = seg, parado = false, res, last = performance.now(), sound = null; const p = W(new Promise(r => res = r));
    const iv = setInterval(() => { const n = performance.now(), dt = (n - last) / 1000; last = n; if (parado) return; if (!pausado) resto -= dt; if (el) el.textContent = Math.max(0, Math.ceil(resto)); if (resto <= 0 || muerto) fin('fin'); }, 80);
    if (bed) sound = sfx(bed, 0.4, true);
    function fin(c) { if (parado) return; parado = true; clearInterval(iv); if (sound) sound.pause(); res({ causa: c, resto: Math.max(0, resto) }); }
    return { p, stop: () => fin('stop') };
  }
  const segTot = s => Math.round(s * (OPC.extra ? 1.5 : 1));
  // clip: vídeo de Christian (silencioso) + su audio real; tocar = saltar
  function clip(n, tap = true) {
    return W(new Promise(res => {
      cancelaVoz(); let fin = false, vOk = false, aOk = false; const hecho = () => { if (fin) return; fin = true; vid.onended = vid.onerror = null; vid.pause(); vid.style.display = 'none'; vw.style.visibility = ''; vid.removeAttribute('src'); st.removeEventListener('click', skip); res(); };
      const chk = () => { if (vOk && aOk) hecho(); }; const skip = () => { cancelaVoz(); vOk = aOk = true; hecho(); };
      vid.style.display = 'block'; vw.style.visibility = 'hidden'; vid.src = B + 'v/c/' + n + '.mp4'; vid.onended = vid.onerror = () => { vOk = true; chk(); }; vid.play().catch(() => { vOk = true; chk(); });
      voz(n).then(() => { aOk = true; chk(); }); if (tap) st.addEventListener('click', skip);
    }));
  }
  // vídeo real del DVD (v/dvd/<n>.mp4) sobre toda la pantalla, con su audio. skip: tocar = saltar. mantener: deja el último fotograma. Devuelve true/false (false = no se pudo reproducir)
  function video(n, skip = true, mantener = false) {
    return W(new Promise(res => {
      cancelaVoz(); pararMus(); fondo(0); let fin = false, tm = 0;
      const hecho = ok => { if (fin) return; fin = true; clearTimeout(tm); vid.onended = vid.onerror = null; st.removeEventListener('click', sk); vid.pause(); vid.muted = true; if (!mantener) { vid.style.display = 'none'; vid.removeAttribute('src'); } res(ok); };
      const sk = () => hecho(true), vig = () => { if (pausado) tm = setTimeout(vig, 1000); else hecho(true); };
      vid.muted = !OPC.mus; vid.volume = Math.min(1, OPC.musVol); vid.style.display = 'block'; vid.src = B + 'v/dvd/' + n + '.mp4';
      vid.onended = () => hecho(true); vid.onerror = () => hecho(false); tm = setTimeout(vig, 60000);
      vid.play().catch(() => { vid.muted = true; vid.play().catch(() => hecho(false)); });
      if (skip) st.addEventListener('click', sk);
    }));
  }
  // ---- menú DVD ----
  function menu() {
    run++; cancelaVoz(); respuesta = null; pausado = false; pa.classList.add('hide'); pb.textContent = 'Salir'; pb.classList.remove('hide');
    pararMus(); pant('menu', hs('j', 0.19, 0.74, 0.46, 0.86) + hs('r', 0.56, 0.74, 0.84, 0.86), null, 1);
    respuesta = v => v == 'j' ? juegos() : reglas();
  }
  function juegos() {
    pant('azul', '<div class="ctit">Juegos</div><div class="clist">' + bar('full', 'Partida completa') + bar('pul', 'El Pulsador') + bar('dpp', 'De Par en Par') + bar('pi', 'La Palabra imposible') + bar('rosco', 'El Rosco') + '</div>' + cb('b', 'Volver', 'rj', 'l'), null, 2);
    respuesta = v => v == 'b' ? menu() : v == 'rosco' ? eligeSeg() : eligeEquipo(v, 10);
  }
  function eligeSeg() { pant('azul', '<div class="ctit">El Rosco · tiempo por pregunta</div><div class="clist">' + bar(5, '5 segundos') + bar(10, '10 segundos') + bar(15, '15 segundos') + '</div>' + cb('b', 'Volver', 'rj', 'l'), null, 2); respuesta = v => v == 'b' ? juegos() : eligeEquipo('rosco', +v); }
  function eligeEquipo(modo, seg) { pant('azul', '<div class="ctit">¿Qué equipo empieza?</div><div class="clist">' + bar('N', 'Equipo Naranja') + bar('A', 'Equipo Azul', 'az') + '</div>' + cb('b', 'Volver', 'rj', 'l'), null, 2); respuesta = v => v == 'b' ? juegos() : partida(modo, v, seg); }
  function reglas() { fondo(0); pararMus(); cancelaVoz(); run++; pb.classList.add('hide'); tur.className = 'hide'; vid.style.display = 'block'; vid.muted = false; vid.volume = Math.min(1, OPC.vozVol); vid.src = B + 'v/reglas.mp4'; vw.innerHTML = '<button class="cbx nar r" data-r="x" style="bottom:2%;width:26%;opacity:.85">Cerrar vídeo</button>'; vid.play().catch(() => {});
    const fin = () => { vid.onended = null; vid.pause(); vid.muted = true; vid.style.display = 'none'; vid.removeAttribute('src'); menu(); }; vid.onended = fin; respuesta = fin; }
  // ---- partidas ----
  const G = { tiempo: { N: [10, 10, 10], A: [10, 10, 10] }, n: { N: 0, A: 0 } };
  const usados = { pul: [], dpp: [], pi: [] };
  function unico(l, n) { let c; do { c = rnd(n); } while (l.includes(c) && l.length < n); l.push(c); return c; }
  // cabecera de prueba: vídeo real del DVD (hv) con su música; si no se puede reproducir, imagen fija + música PC/mp3 (mus)
  async function titulo(img, mus, boton, hv) {
    pant(img, '', null); const ok = hv ? await video(hv, !boton, boton) : false;
    if (ok) { if (boton) { vw.innerHTML = hs('i', 0.5, 0.67, 0.82, 0.81); await esp(); respuesta = null; } else await esperar(300); return; }
    pant(img, boton ? hs('i', 0.5, 0.67, 0.82, 0.81) : '', null); const a = musica(mus, false); const dur = a ? new Promise(r => { a.onended = r; a.onerror = r; setTimeout(r, 40000); }) : esperar(2500);
    if (boton) { await esp(); } else await W(Promise.race([dur, esp()])); respuesta = null; pararMus();
  }
  const UMB = [[2, 4], [3, 6], [3, 7]], TW = ['t2_w_', 't3_w_', 't4_w'], sPA = (n, u) => n <= u[0] ? 5 : n <= u[1] ? 10 : 15;
  async function resultado(team, n, k) { const s = sPA(n, UMB[k]); G.tiempo[team][k] = s; if (s >= 10) sfx('s_applause', 0.5); await clip(TW[k] + c1(team) + s); }
  async function pulsador(team) {
    const t = unico(usados.pul, 18), qs = D.pul.q[t]; let ok = 0; pant('azul', '<div class="ctit">' + html(D.pul.themes[t][0].toUpperCase() + D.pul.themes[t].slice(1)) + '</div>', team); await voz('pi' + t); await esperar(250);
    for (let q = 0; q < 5; q++) {
      pant('azul', '<div class="cbox mag">' + html(qs[q][0]) + '</div>', team); await voz('p' + t + '_' + q);
      const seg = segTot(12); pant('azul', '<div class="cbox mag">' + html(qs[q][0]) + '</div><div class="ctm" id="ctm">' + seg + '</div>' + cb('v', 'Pulsador', 'nar', 'c'), team);
      const cu = cuenta(seg, vw.querySelector('#ctm'), 's_clock'); respuesta = () => { sfx('s_click', 0.8); cu.stop(); }; const r = await cu.p; respuesta = null; if (r.causa == 'fin') sfx('s_timeover');
      pant('azul', '<div class="cbox mag" style="height:26%">' + html(qs[q][0]) + '</div><div class="cbox gre" style="top:40%">' + html(qs[q][1]) + '</div>' + cb('c', 'Correcto', 'vd', 'l') + cb('k', 'Incorrecto', 'rj', 'r'), team);
      const v = await esp(); if (v == 'c') { ok++; sfx('s_applause', 0.4); } else sfx('s_no', 0.8); await esperar(300);
    } return ok;
  }
  async function depar(team) {
    const s = unico(usados.dpp, 20), d = D.dpp[s]; let ok = 0; const hecho = new Array(9).fill(0);
    const lista = act => '<div class="clist" style="top:5%;bottom:15%">' + d.l.map((w, i) => '<button class="cbar ' + (hecho[i] == 1 ? 'ok' : hecho[i] == 2 ? 'ko' : '') + '" style="font-size:1.35em;margin:.14em 0;padding:.3em 0" ' + (act && !hecho[i] ? '' : 'disabled') + ' data-r="' + i + '">' + html(w) + '</button>').join('') + '</div>';
    pant('azul', '<div class="ctit">' + html(d.t[0].toUpperCase() + d.t.slice(1)) + '</div>', team); await voz('dt' + s); await esperar(250);
    for (let k = 0; k < 9; k++) {
      pant('azul', lista(false), team); await voz('d' + s + '_' + k); pant('azul', lista(true) + cb('rep', 'Repetir', 'nar', 'r'), team);
      let v; for (;;) { v = await esp(); if (v == 'rep') { await voz('d' + s + '_' + k); continue; } break; }
      v = +v; if (v == d.a[k]) { hecho[v] = 1; ok++; sfx('s_applause', 0.4); } else { hecho[v] = 2; hecho[d.a[k]] = 1; sfx('s_no', 0.8); }
      pant('azul', lista(false), team); await esperar(800);
    } return ok;
  }
  async function imposible(team) {
    const s = unico(usados.pi, 20), d = D.pi[s]; let mejor = 0;
    const caja = (hecho, act) => '<div class="cbox blu">' + d.l.map((w, i) => '<button class="cbar ' + (hecho[i] ? 'ok' : '') + '" data-r="' + i + '" ' + (act && !hecho[i] ? '' : 'disabled') + '>' + html(w) + '</button>').join('') + '</div>';
    for (let at = 1; at <= 3; at++) {
      const hecho = new Array(8).fill(0); let ok = 0, fallo = false; pant('seg10', '', team); await esperar(1500);
      for (let k = 0; k < 8; k++) {
        pant('azul', caja(hecho, false), team); await voz('q' + s + '_' + k);
        const seg = segTot(10); pant('azul', caja(hecho, true) + cb('rep', 'Repetir', 'nar', 'r') + '<div class="ctm" id="ctm" style="right:3%;top:8%;font-size:2em">' + seg + '</div>', team);
        const cu = cuenta(seg, vw.querySelector('#ctm'), 's_clock'); let dato = null; respuesta = r => { dato = r; cu.stop(); }; const rr = await cu.p; const v = dato; respuesta = null;
        if (rr.causa == 'fin' || v === null) { sfx('s_timeover'); fallo = true; } else if (v == 'rep') { k--; continue; } else if (+v == d.a[k]) { hecho[+v] = 1; ok++; sfx('s_applause', 0.4); } else { sfx('s_no', 0.8); fallo = true; }
        if (fallo) break; await esperar(450);
      }
      mejor = Math.max(mejor, ok); if (!fallo) break;
      pant('xxx', ['<div class="cxo" style="left:42%"></div><div class="cxo" style="left:62%"></div>', '<div class="cxo" style="left:62%"></div>', ''][at - 1] || '', team); await video('xxx', true); await clip('t4_att' + at + c1(team));
    } return mejor;
  }
  const PRUEBAS = [{ n: 'pul', img: 't_pul', m: 'm_h_pul', v: 'h_pul', f: pulsador, tot: 5 }, { n: 'dpp', img: 't_dpp', m: 'm_h_dpp', v: 'h_dpp', f: depar, tot: 9 }, { n: 'pi', img: 't_pi', m: 'm_h_pi', v: 'h_pi', f: imposible, tot: 8 }];
  async function pruebaDos(k, starter) {
    const P = PRUEBAS[k]; await titulo(P.img, P.m, k == 0, P.v); await clip(['t2_in_', 't3_in_', 't4_intro_'][k] + c1(starter)); if (k == 2) await clip('t4_rules_' + c1(starter));
    for (const [i, t] of [starter, otro(starter)].entries()) { if (i == 1 && k < 2) await clip(['t2_tn_', 't3_tn_'][k] + c2(t)); const n = await P.f(t); await resultado(t, n, k); }
  }
  // Rosco
  const ETAPAS = [[0, 8], [8, 16], [16, 25]]; let ORDEN = [];
  const pos = i => { const a = -Math.PI / 2 + i * 2 * Math.PI / 25; return 'left:' + (50 + 44 * Math.cos(a)) + '%;top:' + (50 + 44 * Math.sin(a)) + '%'; };
  const ring = (Rr, team, cur, k) => '<div class="rg">' + ORDEN.map((L, i) => { const e = Rr[team].est[L], d = i >= ETAPAS[k][0] && i < ETAPAS[k][1]; return '<i class="' + (L == cur ? 'cur ' : '') + (e || '') + (d || e == 'ok' ? '' : ' fu') + '" style="' + pos(i) + '">' + L + '</i>'; }).join('') + '</div>';
  function nuevoRosco() { ORDEN = Object.keys(D.ros); const Rr = { N: { est: {}, ent: {}, res: {} }, A: { est: {}, ent: {}, res: {} } }; for (const L of ORDEN) { const l = shuf(D.ros[L]); Rr.N.ent[L] = l[0]; Rr.A.ent[L] = l[1] || l[0]; } return Rr; }
  const nOk = (Rr, t) => ORDEN.filter(x => Rr[t].est[x] == 'ok').length;
  async function etapa(Rr, k, starter, tiempos) {
    const q = { N: ORDEN.slice(...ETAPAS[k]), A: ORDEN.slice(...ETAPAS[k]) }; let cur = starter, primero = null;
    while (q.N.length || q.A.length) {
      let team = cur; if (!q[team].length) team = otro(team); cur = team; const L = q[team][0], e = Rr[team].ent[L], emp = normL(e.a).startsWith(L);
      const T = segTot(tiempos[team]), guardado = Rr[team].res[L];
      const base = ring(Rr, team, L, k) + '<div class="rtx"><small>' + (emp ? 'Empieza por ' : 'Contiene la ') + L + ' · Naranja ' + nOk(Rr, 'N') + ' · Azul ' + nOk(Rr, 'A') + '</small>' + html(e.d) + '</div>';
      pant('azul', base, team); if (guardado == null) await voz('r' + e.i);
      const seg = guardado != null ? guardado : T; pant('azul', base + '<div class="rtm" id="rtm">' + Math.ceil(seg) + '</div>' + cb('c', 'Contestar', 'vd', 'l') + cb('p', 'Pasar', 'rj', 'r'), team);
      const cu = cuenta(seg, vw.querySelector('#rtm'), 's_clock'); let pasar = false; respuesta = x => { pasar = x == 'p'; cu.stop(); }; const r = await cu.p; respuesta = null;
      if (pasar) { Rr[team].res[L] = Math.max(1, r.resto); sfx('s_pasapalabra'); const o2 = otro(team); if (q[o2].length) { await clip('ch_pa_' + c2(team)); cur = o2; } continue; }
      if (r.causa == 'fin') { sfx('s_timeover'); delete Rr[team].res[L]; q[team].push(q[team].shift()); Rr[team].est[L] = 'ko'; pant('azul', base + '<div class="rtm" style="font-size:1.6em">Era: ' + html(e.a) + '</div>', team); const o2 = otro(team); if (q[o2].length) { await clip('ch_to_' + c2(team)); cur = o2; } else await esperar(1200); Rr[team].est[L] = ''; continue; }
      pant('azul', '<div class="cbead">' + L + '</div><div class="cbox gre" style="left:25%;right:25%;top:22%;height:42%">' + html(e.a) + '</div>' + cb('c', 'Correcto', 'vd', 'l') + cb('k', 'Incorrecto', 'rj', 'r'), team);
      const v = await esp(); delete Rr[team].res[L];
      if (v == 'c') { Rr[team].est[L] = 'ok'; q[team].shift(); sfx('s_applause', 0.5); await esperar(300); if (!q[team].length && !primero) primero = team; if (nOk(Rr, team) == 25) return { fin: true, ganador: team, primero }; }
      else { Rr[team].est[L] = 'ko'; q[team].push(q[team].shift()); sfx('s_no', 0.8); const o2 = otro(team); if (q[o2].length) { await clip('ch_ko_' + c2(team)); cur = o2; } await esperar(200); Rr[team].est[L] = ''; }
    } return { fin: false, primero: primero || starter };
  }
  async function victoria(g) {
    pararMus(); sfx('s_applause', 0.7); await clip('ch_win_' + c2(g)); musica('m_sting', false);
    pant('azul', '<div class="clist" style="top:12%;bottom:auto"><button class="cbar" style="font-size:2.8em;pointer-events:none">El Equipo ' + NOM[g] + ' Gana</button></div><div class="clist" style="top:46%">' + bar('o', 'Jugar otra partida', 'vd') + bar('m', 'Menú del DVD', 'rj') + '</div>'); return esp();
  }
  async function partida(modo, starter, fijo) {
    run++; pb.textContent = 'Pausa'; pb.classList.remove('hide'); G.tiempo = { N: [10, 10, 10], A: [10, 10, 10] }; usados.pul = []; usados.dpp = []; usados.pi = []; let st2 = starter;
    if (modo == 'full') { pararMus(); if (o.intro !== false) await video('intro', true); await clip('ch_hola'); }
    if (modo == 'full' || modo == 'rosco') {
      const Rr = nuevoRosco(); let ganador = null;
      for (let k = 0; k < 3; k++) {
        if (modo == 'full') await pruebaDos(k, st2); else G.tiempo.N[k] = G.tiempo.A[k] = fijo;
        if (k == 0 || modo == 'full') await titulo('t_pi', 'm_h_ros', false, 'h_ros').catch(() => {}); musica('m_menu'); duck = 0.35; vol();
        const res = await etapa(Rr, k, st2, { N: G.tiempo.N[k], A: G.tiempo.A[k] }); if (res.fin) { ganador = res.ganador; break; } st2 = res.primero;
      }
      duck = 1; if (ganador) { const v = await victoria(ganador); return v == 'o' ? partida(modo, starter, fijo) : menu(); }
    } else { const k = { pul: 0, dpp: 1, pi: 2 }[modo]; await pruebaDos(k, st2); pant('azul', '<div class="cres"><h2>Prueba terminada</h2><p>Naranja: ' + G.tiempo.N[k] + ' s por pregunta</p><p>Azul: ' + G.tiempo.A[k] + ' s por pregunta</p></div><div class="clist" style="top:62%;bottom:4%">' + bar('o', 'Jugar otra vez', 'vd') + bar('m', 'Menú del DVD', 'rj') + '</div>'); const v = await esp(); if (v == 'o') return partida(modo, starter); }
    return menu();
  }
  // ---- pausa / salir ----
  pb.onclick = () => {
    if (pb.textContent == 'Salir') { run++; cancelaVoz(); pararMus(); o.salir && o.salir(); return; }
    if (!pa.classList.contains('hide')) return; pausado = true; if (vozA) vozA.pause(); if (musA) musA.pause(); vid.pause(); bg.pause(); pa.classList.remove('hide');
    pa.innerHTML = '<div class="p"><h1 style="font-size:3em">Pausa</h1><button class="cbar vd" data-p="c">Continuar</button><button class="cbar rj" data-p="s">Salir al menú del DVD</button></div>';
  };
  pa.addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (!b) return; pausado = false; pa.classList.add('hide'); if (b.dataset.p == 'c') { if (vozA) vozA.play().catch(() => {}); if (musA) musA.play().catch(() => {}); if (vid.src && vid.style.display != 'none') vid.play().catch(() => {}); if (fondoN) bg.play().catch(() => {}); } else { cancelaVoz(); vid.pause(); vid.style.display = 'none'; menu(); } });
  menu();
  return { menu, partida, destruir() { muerto = true; run++; cancelaVoz(); pararMus(); vid.pause(); bg.pause(); bg.removeAttribute('src'); bg.load(); removeEventListener('resize', fit); R.remove(); },
    dbg: { G, pant, clip, video, fondo, juegos, pulsador, depar, imposible, etapa, nuevoRosco, victoria, titulo, reglas, resultado, get ORDEN() { return ORDEN; } } };
}

window.montarClasico=montarClasico;
