import json,hashlib,os,subprocess,wave
from piper import PiperVoice, SynthesisConfig
P5='/workspace/v23/www/snd/p5';W='/workspace/v23/w'
T=["Silencio… las cámaras están escondidas. El público no sabe nada.","Hoy el rosco tiene una sola letra: ¡la A! A ver quién se da cuenta.","Nadie lo ha notado… ¡qué cara de concentración!","¡Era una cámara oculta! ¡Un aplauso para nuestro público!",
"¡Bienvenidos a Pasatiempo! Perdón… ¡a Pasapalabra!","Empieza por la… ¿dónde está la ficha? ¡Se me ha caído!","¡Rosco completo! Ah, no, que todavía no hemos empezado.","¡Corten! Vamos otra vez…",
"Esto es lo que no se ve: el plató antes de encender las luces de directo.","Aquí ensayamos las preguntas, probamos el rosco y el reloj.","Y aquí calentamos antes de entrar en directo.",
"Los mejores momentos de la temporada…","¡El rosco que se resolvió en el último segundo!","¡La remontada en Una de cuatro!","¡Y el bote más grande de nuestra historia inventada!"]
v=PiperVoice.load('/workspace/piper/es_ES-davefx-medium.onnx');cfg=SynthesisConfig(length_scale=0.985);out={}
for t in T:
  h=hashlib.md5(t.encode()).hexdigest()[:10];o=f'{P5}/{h}.ogg'
  if not os.path.exists(o):
    with wave.open(f'{W}/{h}.wav','wb') as w:v.synthesize_wav(t,w,syn_config=cfg)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{W}/{h}.wav','-af','silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse','-ac','1','-ar','24000','-c:a','libopus','-b:a','16k','-application','voip',o],check=True)
  d=round(float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',o],capture_output=True,text=True).stdout),2);out[t]=[h,d]
open('/workspace/v23/www/v23voz.js','w').write('// clips Piper es_ES-davefx-medium v0.23 (escenas 🆕 INVENTADO)\nObject.assign(VOZ5,'+json.dumps(out,ensure_ascii=False)+');\n');print(len(out))
