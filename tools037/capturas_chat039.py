#!/usr/bin/env python3
import json, subprocess, html, time
from pathlib import Path

ROOT = Path('/workspace/pasapalabra037')
OUT = ROOT / 'capturas' / 'chat039'
CSS = (OUT / 'chat.css').read_text(encoding='utf-8')
raw = subprocess.check_output(['node', str(ROOT/'tools037'/'conv_chat039.js')], text=True)
data = json.loads(raw)
(OUT / 'conversacion039.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')

def page(who_label, lines):
    log = []
    for t in lines:
        log.append('<div class="line"><span class="sender">Tú: </span>'+html.escape(t['user'])+'</div>')
        log.append('<div class="line"><span class="sender">'+html.escape(t['who'])+' · 🆕 INVENTADO: </span>'+html.escape(t['reply'])+'</div>')
    return (
        '<!doctype html><html lang="es"><meta charset="utf-8"><title>Chat del plató v0.39</title>'
        '<style>'+CSS+'</style><body><div class="stage"></div><div id="ver">v0.39</div>'
        '<div class="brand"><b>Pasapalabra 3D</b><small>Chat del plató · 🆕 INVENTADO</small></div>'
        '<aside id="chat37" class="p37"><div class="row"><strong>💬 Chat del plató</strong><button>✕</button></div>'
        '<div class="row"><select><option selected>'+html.escape(who_label)+'</option></select>'
        '<button>🔊 Voz: sí</button></div>'
        '<div class="invent">🆕 INVENTADO · charla cálida y local, con voz Piper · sin internet</div>'
        '<div id="chatLog37" class="log">'+''.join(log)+'</div>'
        '<form><input placeholder="Cuéntame lo que quieras…"><button type="submit">Enviar</button></form>'
        '</aside><button id="chatToggle37">💬 Chat del plató</button></body></html>'
    )

shots = [
    ('01_hola_y_me_llamo_iker', 'Christian · avatar', data['c1'][:2]),
    ('02_conversacion_christian', 'Christian · avatar', data['c1']+data['c2']),
    ('03_lola_iker_chiste', 'Lola · 🆕 INVENTADA', data['lola']),
]

httpd = subprocess.Popen(['python3','-m','http.server','8039','--bind','127.0.0.1'], cwd=str(ROOT), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    time.sleep(0.5)
    for name, label, lines in shots:
        html_path = OUT/(name+'.html')
        png_path = OUT/(name+'.png')
        html_path.write_text(page(label, lines), encoding='utf-8')
        url = 'http://127.0.0.1:8039/capturas/chat039/'+name+'.html'
        cmd = ['/usr/bin/google-chrome','--headless=new','--disable-gpu','--hide-scrollbars','--no-sandbox',
               '--window-size=1280,720','--force-device-scale-factor=1','--screenshot='+str(png_path), url]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print('SHOT', png_path, png_path.stat().st_size, flush=True)
finally:
    httpd.terminate()
print('SHOTS_DONE', flush=True)
