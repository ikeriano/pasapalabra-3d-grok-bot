#!/usr/bin/env python3
"""v0.10 · empaqueta los clips de voz pequeños (sin pérdida) para que el APK no pague ~250 B por fichero.
Uso: pack.py <www_staging>   (trabaja SOLO sobre la copia de preparación, nunca sobre el repo)
- quita las etiquetas Ogg (ffmpeg -c copy -map_metadata -1 -fflags +bitexact; el audio decodificado es idéntico bit a bit)
- concatena los .ogg de cada carpeta en snd/pk/<dir>.bin y escribe pk10idx.js (nombre, longitud) que lee el shim de pk10.js."""
import os,sys,subprocess,json,concurrent.futures as cf
W=sys.argv[1]
DIRS=['p5','bote','p9','p10']
def strip(a):
    src,dst=a
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',src,'-map_metadata','-1','-c:a','copy','-fflags','+bitexact','-flags:a','+bitexact',dst],check=True)
    return os.path.getsize(dst)
os.makedirs(f'{W}/snd/pk',exist_ok=True)
tmp=f'{W}/../_pktmp';os.makedirs(tmp,exist_ok=True)
idx={};saved=0;tot=0
for d in DIRS:
    p=f'{W}/snd/{d}'
    if not os.path.isdir(p):continue
    names=sorted(f[:-4] for f in os.listdir(p) if f.endswith('.ogg'))
    jobs=[(f'{p}/{n}.ogg',f'{tmp}/{d}_{n}.ogg') for n in names]
    with cf.ThreadPoolExecutor(4) as ex:sizes=list(ex.map(strip,jobs))
    with open(f'{W}/snd/pk/{d}.bin','wb') as o:
        for (s,t),n in zip(jobs,names):
            b=open(t,'rb').read();o.write(b);os.remove(t);os.remove(s)
    saved+=sum(os.path.getsize(f'{p}/{n}.ogg') for n in []);tot+=sum(sizes)
    idx[f'snd/{d}/']={'f':f'snd/pk/{d}.bin','n':','.join(names),'l':','.join(map(str,sizes))}
    os.rmdir(p) if not os.listdir(p) else None
    print(d,len(names),sum(sizes),file=sys.stderr)
open(f'{W}/pk10idx.js','w').write('window.PK10='+json.dumps(idx,separators=(',',':'))+';')
os.rmdir(tmp)
