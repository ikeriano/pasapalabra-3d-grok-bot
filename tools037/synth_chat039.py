#!/usr/bin/env python3
import json, os, wave, subprocess, sys
from pathlib import Path
os.environ['OMP_NUM_THREADS']='1'
os.environ['OPENBLAS_NUM_THREADS']='1'
from piper import PiperVoice
from piper.config import SynthesisConfig

R=Path('/workspace/pasapalabra037')
data=json.loads((R/'tools037/chat039_data.json').read_text())
OUT=R/'www'/'voz039'
OUT.mkdir(exist_ok=True)
TMP=Path('/dev/shm/chat039-voz.wav')
VOICES={'Christian':('davefx-medium',0),'Javi':('carlfm-x_low',0),'Lola':('sharvard-medium',1),'Pablo':('sharvard-medium',0)}

only_missing='--force' not in sys.argv
by_who={}
for who, pools in data['characters'].items():
    for items in pools.values():
        for it in items:
            by_who.setdefault(who, []).append(it)

done=skip=0
for who, items in by_who.items():
    missing=[]
    for it in items:
        dst=R/'www'/it['src']
        if only_missing and dst.exists() and dst.stat().st_size>200:
            skip+=1
        else:
            missing.append(it)
    print('SYNTH_START', who, 'pending', len(missing), 'of', len(items), flush=True)
    if not missing:
        continue
    model,spk=VOICES[who]
    voice=PiperVoice.load('/workspace/piper/es_ES-'+model+'.onnx')
    cfg=SynthesisConfig(speaker_id=spk, length_scale=1.04)
    for it in missing:
        dst=R/'www'/it['src']
        TMP.unlink(missing_ok=True)
        with wave.open(str(TMP),'wb') as f:
            voice.synthesize_wav(it['voz'], f, cfg)
        dst.unlink(missing_ok=True)
        subprocess.run(['ffmpeg','-nostdin','-v','error','-i',str(TMP),'-c:a','libvorbis','-q:a','2',str(dst)],check=True)
        done+=1
        if done%15==0:
            print('SYNTH', done, who, it['id'], dst.stat().st_size, flush=True)
    del voice
TMP.unlink(missing_ok=True)
print('SYNTH_DONE', done, 'skipped', skip, flush=True)
