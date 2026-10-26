# v0.9 · sintetiza (Piper es_ES) las frases de v09data.js + las v9say('X','...') de v09.js + acumulados/n.º de programa
import json,hashlib,os,re,subprocess,wave,sys
from concurrent.futures import ThreadPoolExecutor
from piper import PiperVoice, SynthesisConfig
sys.path.insert(0,os.path.dirname(__file__))
from synth9_bote import words
R='/workspace/repos/pasapalabra-3d-grok-bot';O=R+'/www/snd/p9';B=R+'/www/snd/bote';W='/workspace/pasa3d_09/w2'
os.makedirs(O,exist_ok=True);os.makedirs(W,exist_ok=True)
VOICES={'H':('davefx-medium',None),'F':('sharvard-medium',1),'M':('carlfm-x_low',None),'N':('mls_10246-low',None),'G':('sharvard-medium',0)}
key=lambda t:re.sub(r'\s+',' ',re.sub(r'<[^>]*>','',t).replace('&nbsp;',' ')).strip()
S=[tuple(x) for x in json.load(open(R+'/tools/v09/lines9_data.json'))]
src=open(R+'/www/v09.js').read()
for m in re.finditer(r"v9say\('(\w)',\s*'((?:[^'\\]|\\.)*)'",src):
  t=m.group(2).replace("\\'","'")
  if '${' not in t:S.append((m.group(1),t))
S=sorted(set((v,key(t)) for v,t in S if key(t)))
vs={};man={};jobs=[]
def voice(v):
  n=VOICES[v][0]
  if n not in vs:vs[n]=PiperVoice.load(f'/workspace/piper/es_ES-{n}.onnx')
  return vs[n]
def syn(path,v,t):
  with wave.open(path,'wb') as w:
    sp=VOICES[v][1]
    cfg=SynthesisConfig(length_scale=0.985,speaker_id=sp) if sp is not None else SynthesisConfig(length_scale=0.985)
    voice(v).synthesize_wav(t,w,syn_config=cfg)
def enc(a):
  n,out=a;subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{W}/{n}.wav','-af','silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse','-ac','1','-ar','24000','-c:a','libopus','-b:a','16k','-application','voip',out],check=True)
for v,t in S:
  h=hashlib.md5((v+'|'+t).encode()).hexdigest()[:10];man[v+'|'+t]=h
  if not os.path.exists(f'{O}/{h}.ogg'):syn(f'{W}/{h}.wav',v,t);jobs.append((h,f'{O}/{h}.ogg'))
# acumulados (importes múltiplos de 100) y número de programa
ex=[(f'c{n}',words(n)+' euros.') for n in range(100,100000,100)]+[(f'pg{n}',f'Programa número {words(n)}.') for n in range(1,401)]
ex+=[('pre_acp','Acumulado del programa:'),('pre_acc','Acumulado del concursante:')]
for n,t in ex:
  if not os.path.exists(f'{B}/{n}.ogg'):syn(f'{W}/{n}.wav','H',t);jobs.append((n,f'{B}/{n}.ogg'))
with ThreadPoolExecutor(6) as e:list(e.map(enc,jobs))
dur=lambda f:round(float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout),2)
out={k:[h,dur(f'{O}/{h}.ogg')] for k,h in man.items()}
open(R+'/www/v09voz.js','w').write('// clips Piper es_ES v0.9 (tools/v09/synth9_lines.py): voz|texto → [archivo, segundos]\nconst CLIPS9='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
print(len(out),'frases',len(jobs),'nuevos')
