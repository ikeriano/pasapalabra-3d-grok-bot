import json,hashlib,os,subprocess,wave,sys
from concurrent.futures import ThreadPoolExecutor
from piper import PiperVoice, SynthesisConfig
d=json.load(open('lines.json'));O='/workspace/pp3d/app/www/snd/p5';os.makedirs(O,exist_ok=True);W='/tmp/p5w';os.makedirs(W,exist_ok=True)
v=PiperVoice.load('/workspace/piper/es_ES-davefx-medium.onnx');cfg=SynthesisConfig(length_scale=0.985)
man={};jobs=[]
for k,t in d.items():
  h=hashlib.md5(t.encode()).hexdigest()[:10];wf=f'{W}/{h}.wav'
  if not os.path.exists(f'{O}/{h}.ogg'):
    with wave.open(wf,'wb') as w: v.synthesize_wav(t,w,syn_config=cfg)
    jobs.append(h)
  man[k]=h
def enc(h):subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{W}/{h}.wav','-af','silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse','-ac','1','-ar','24000','-c:a','libopus','-b:a','16k','-application','voip',f'{O}/{h}.ogg'],check=True)
with ThreadPoolExecutor(8) as ex: list(ex.map(enc,jobs))
out={}
for k,h in man.items():
  dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{O}/{h}.ogg'],capture_output=True,text=True).stdout.strip())
  out[k]=[h,round(dur,2)]
used=set(man.values())
for f in os.listdir(O):
  if f[:-4] not in used: os.remove(f'{O}/{f}')  # solo clips generados por este script
open('/workspace/pp3d/app/www/v05voz.js','w').write('// clips Piper es_ES-davefx-medium generados por pp3d/v05/synth.py\nconst VOZ5='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
print(len(out))
