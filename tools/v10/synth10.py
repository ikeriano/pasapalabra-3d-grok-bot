# v0.10 · voz de «Pasapalabra en familia» (Piper es_ES davefx, la misma de Ahora Caigo): frases de T10/famLine → snd/p5, números → snd/p10
import json,hashlib,os,subprocess,sys,wave
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0,os.path.join(os.path.dirname(__file__),'..','v09'))
from piper import PiperVoice, SynthesisConfig
from synth9_bote import w999
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'));P5=R+'/www/snd/p5';P10=R+'/www/snd/p10';W='/workspace/pasa3d_10/w';os.makedirs(P5,exist_ok=True);os.makedirs(P10,exist_ok=True);os.makedirs(W,exist_ok=True)
js="global.window={};eval(require('fs').readFileSync('%s/www/v10data.js','utf8').replace(/^'use strict';/,'')+';console.log(JSON.stringify([Object.values(T10),F10D.famLine]))')"%R
T,FL=json.loads(subprocess.run(['node','-e',js],capture_output=True,text=True,check=True).stdout)
texts=sorted(set(T+FL))
def clean(n):
  return n
nums=[(f's{n}',('un segundo.' if n==1 else (w999(n,True) if n else 'cero')+' segundos.')) for n in range(0,61)]+[('sm','más de sesenta segundos.')]
nums+=[(f'h{n}',('un acierto.' if n==1 else (w999(n,True) if n else 'cero')+' aciertos.')) for n in range(0,26)]
v=PiperVoice.load('/workspace/piper/es_ES-davefx-medium.onnx');cfg=SynthesisConfig(length_scale=0.985)
jobs=[];man={}
def syn(path,t):
  with wave.open(path,'wb') as w:v.synthesize_wav(t,w,syn_config=cfg)
for t in texts:
  h=hashlib.md5(t.encode()).hexdigest()[:10];man[t]=h
  if not os.path.exists(f'{P5}/{h}.ogg'):syn(f'{W}/{h}.wav',t);jobs.append((h,f'{P5}/{h}.ogg'))
for n,t in nums:
  if not os.path.exists(f'{P10}/{n}.ogg'):syn(f'{W}/{n}.wav',t);jobs.append((n,f'{P10}/{n}.ogg'))
def enc(a):
  n,out=a;subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{W}/{n}.wav','-af','silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse','-ac','1','-ar','24000','-c:a','libopus','-b:a','16k','-application','voip',out],check=True)
with ThreadPoolExecutor(4) as e:list(e.map(enc,jobs))
dur=lambda f:round(float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout),2)
out={t:[h,dur(f'{P5}/{h}.ogg')] for t,h in man.items()}
open(R+'/www/v10voz.js','w').write('// clips Piper es_ES v0.10 (tools/v10/synth10.py): texto → [archivo en snd/p5, segundos]\nObject.assign(VOZ5,'+json.dumps(out,ensure_ascii=False,separators=(',',':'))+');\n')
tot=sum(os.path.getsize(f'{P5}/{h}.ogg') for h in man.values())+sum(os.path.getsize(f'{P10}/{n}.ogg') for n,_ in nums)
print(len(out),'frases',len(nums),'números',len(jobs),'nuevos',tot,'bytes')
