import json,hashlib,os,subprocess,wave,re,glob
from concurrent.futures import ThreadPoolExecutor
from piper import PiperVoice, SynthesisConfig
key=lambda h:re.sub(r'\s+',' ',re.sub(r'^Presentador:\s*','',re.sub(r'<[^>]*>','',h).replace('&nbsp;',' '))).strip()
L=json.load(open('/workspace/pp3d/v06/lines6.json'))
for f in glob.glob('/workspace/pp3d/app/www/v06*.js')+glob.glob('/workspace/pp3d/app/www/v07*.js'):
  for m in re.finditer(r"hostSay\('((?:[^'\\]|\\.)*)'\)",open(f).read()):
    t=m.group(1)
    if '${' not in t and "'+" not in t: L.append(t)
exec(open('/workspace/pp3d/v07/extra_lines.py').read()) if os.path.exists('/workspace/pp3d/v07/extra_lines.py') else None
ks=sorted(set(key(x) for x in L if key(x)))
O='/workspace/pp3d/app/www/snd/p5';W='/tmp/p7w';os.makedirs(W,exist_ok=True)
v=PiperVoice.load('/workspace/piper/es_ES-davefx-medium.onnx');cfg=SynthesisConfig(length_scale=0.985)
man={};jobs=[]
for t in ks:
  h=hashlib.md5(t.encode()).hexdigest()[:10];man[t]=h
  if not os.path.exists(f'{O}/{h}.ogg'):
    with wave.open(f'{W}/{h}.wav','wb') as w: v.synthesize_wav(t.replace('¡Pasapalabra!','¡Pasapalabra!'),w,syn_config=cfg)
    jobs.append(h)
def enc(h):subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{W}/{h}.wav','-af','silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse','-ac','1','-ar','24000','-c:a','libopus','-b:a','16k','-application','voip',f'{O}/{h}.ogg'],check=True)
with ThreadPoolExecutor(8) as ex: list(ex.map(enc,jobs))
out={t:[h,round(float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{O}/{h}.ogg'],capture_output=True,text=True).stdout),2)] for t,h in man.items()}
open('/workspace/pp3d/app/www/v07voz.js','w').write('// clips Piper es_ES-davefx-medium v0.7 (pp3d/v07/synth7.py)\nObject.assign(VOZ5,'+json.dumps(out,ensure_ascii=False,separators=(',',':'))+');\n')
print(len(out),'new',len(jobs))
