from pathlib import Path
import json,wave,subprocess,os
# Limit ONNX/BLAS threads before importing models on the shared box.
os.environ['OMP_NUM_THREADS']='1';os.environ['OPENBLAS_NUM_THREADS']='1'
from piper import PiperVoice
from piper.config import SynthesisConfig
R=Path('/workspace/pasapalabra037');D=json.loads((R/'contenido037.json').read_text());out=R/'www/voz037';out.mkdir(exist_ok=True)
models={'Christian':('davefx-medium',0),'Javi':('carlfm-x_low',0),'Lola':('sharvard-medium',1),'Pablo':('sharvard-medium',0)}
for who,(model,spk) in models.items():
 voice=PiperVoice.load('/workspace/piper/es_ES-'+model+'.onnx');config=SynthesisConfig(speaker_id=spk,length_scale=1.04)
 for k,line in D['lines'].items():
  if line['who']!=who:continue
  dst=out/(k+'.ogg')
  if dst.exists():continue
  tmp=Path('/dev/shm/pasapalabra037-build/voz.wav')
  with wave.open(str(tmp),'wb') as f:voice.synthesize_wav(line['text'],f,config)
  subprocess.run(['ffmpeg','-nostdin','-v','error','-i',str(tmp),'-c:a','libvorbis','-q:a','2','-n',str(dst)],check=True)
  print('VOICE',who,k,dst.stat().st_size,flush=True)
 del voice
print('VOICES_DONE',flush=True)
