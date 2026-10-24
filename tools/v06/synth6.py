import wave,subprocess,json
from piper import PiperVoice, SynthesisConfig
v=PiperVoice.load('/workspace/piper/es_ES-davefx-medium.onnx');cfg=SynthesisConfig(length_scale=0.985)
L={"desp6a":"¡Y esto ha sido todo por hoy! Muchas gracias por jugar con nosotros.","desp6b":"Mañana volvemos con un nuevo rosco y un bote todavía más grande. ¡Hasta mañana, y recordad: Pasapalabra!"}
import os;O='/workspace/pp3d/app/www/snd/p6';os.makedirs(O,exist_ok=True);out={}
for k,t in L.items():
  with wave.open(f'/tmp/{k}.wav','wb') as w: v.synthesize_wav(t,w,syn_config=cfg)
  subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'/tmp/{k}.wav','-ac','1','-ar','24000','-c:a','libopus','-b:a','16k',f'{O}/{k}.ogg'],check=True)
  d=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{O}/{k}.ogg'],capture_output=True,text=True).stdout);out[k]=[t,round(d,2)]
print(json.dumps(out,ensure_ascii=False))
