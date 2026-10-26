# v0.11 · voz Piper es_ES (nunca es_MX) de las líneas nuevas → snd/p9 + www/v11voz.js (se suma a CLIPS9)
import json,hashlib,os,re,subprocess,wave,sys
from concurrent.futures import ThreadPoolExecutor
from piper import PiperVoice, SynthesisConfig
sys.path.insert(0,os.path.dirname(__file__))
import data11 as D
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'));O=R+'/www/snd/p9';W='/workspace/pasa3d_11/w';os.makedirs(W,exist_ok=True)
VOICES={'H':('davefx-medium',None),'F':('sharvard-medium',1),'M':('carlfm-x_low',None),'N':('mls_10246-low',None),'G':('sharvard-medium',0)}
key=lambda t:re.sub(r'\s+',' ',re.sub(r'<[^>]*>','',t).replace('&nbsp;',' ')).strip()
S=sorted(set((v,key(t)) for v,t in D.lines11()))
vs={}
def voice(v):
  n=VOICES[v][0]
  if n not in vs:vs[n]=PiperVoice.load(f'/workspace/piper/es_ES-{n}.onnx')
  return vs[n]
def syn(path,v,t):
  with wave.open(path,'wb') as w:
    sp=VOICES[v][1];cfg=SynthesisConfig(length_scale=0.985,speaker_id=sp) if sp is not None else SynthesisConfig(length_scale=0.985)
    voice(v).synthesize_wav(t,w,syn_config=cfg)
def enc(a):
  n,out=a;subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{W}/{n}.wav','-af','silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse','-ac','1','-ar','24000','-c:a','libopus','-b:a','16k','-application','voip',out],check=True)
man={};jobs=[]
for v,t in S:
  h=hashlib.md5((v+'|'+t).encode()).hexdigest()[:10];man[v+'|'+t]=h
  if not os.path.exists(f'{O}/{h}.ogg'):syn(f'{W}/{h}.wav',v,t);jobs.append((h,f'{O}/{h}.ogg'))
with ThreadPoolExecutor(4) as e:list(e.map(enc,jobs))
dur=lambda f:round(float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout),2)
out={k:[h,dur(f'{O}/{h}.ogg')] for k,h in man.items()}
open(R+'/www/v11voz.js','w').write('// clips Piper es_ES v0.11 (tools/v11/synth11.py): voz|texto → [archivo, segundos]; se suman a CLIPS9\nObject.assign(CLIPS9,'+json.dumps(out,ensure_ascii=False,separators=(',',':'))+');\n')
print(len(out),'frases',len(jobs),'nuevas',sum(os.path.getsize(f'{O}/{h}.ogg') for h in man.values()),'bytes')
