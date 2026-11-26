#!/usr/bin/env python3
"""Empaqueta Pasapalabra-3D-v0.39.apk (main), firmado con pasapalabra.jks."""
import zipfile, os, json, hashlib, subprocess, struct, shutil, sys
from pathlib import Path

R=Path('/workspace/pasapalabra037')
T=Path('/dev/shm/pasapalabra037-build')
T.mkdir(parents=True, exist_ok=True)
OUT=R/'salida'
OUT.mkdir(exist_ok=True)
STORE={'.mp4','.ogg','.opus','.mp3','.m4a','.wav','.png','.jpg','.jpeg','.webp','.glb','.ttf','.arsc'}
keys={}
for s in Path('/workspace/_keys/pasapalabra.env').read_text().splitlines():
    k,v=s.split('=',1); keys[k]=v
ENV=dict(os.environ, **keys, JAVA_HOME='/home/box/tools/jdk-17.0.21+9')
ENV['PATH']=ENV['JAVA_HOME']+'/bin:'+ENV['PATH']
SDK='/workspace/arguinano_build/stage/android-34.jar'
AAPT2='/home/box/tools/android-14/aapt2'
ZIPALIGN='/home/box/tools/android-14/zipalign'
APKSIGNER='/home/box/tools/android-14/apksigner'

# Relink manifest+icon with version 0.39
reszip=T/'res.zip'
subprocess.run([AAPT2,'compile','--dir',str(R/'native037/res'),'-o',str(reszip)],check=True,env=ENV)
base=T/'main-base-039.apk'
base.unlink(missing_ok=True)
subprocess.run([AAPT2,'link','-o',str(base),'-I',SDK,'--manifest',str(R/'native037/manifest-main.xml'),str(reszip),'--version-code','40','--version-name','0.39'],check=True,env=ENV)
print('BASE', base, base.stat().st_size, flush=True)

def stored(z,name,data=None,path=None,ctype=zipfile.ZIP_STORED):
    info=zipfile.ZipInfo(name, date_time=(2026,11,26,16,0,0))
    info.compress_type=ctype
    info.external_attr=0o644<<16
    if ctype==zipfile.ZIP_STORED:
        n=(-(z.fp.tell()+30+len(name.encode('utf-8'))+4))%4
        info.extra=struct.pack('<HH',0xD935,n)+b'\0'*n
    if path is not None:
        info.file_size=path.stat().st_size
        with path.open('rb') as src, z.open(info,'w') as dst:
            shutil.copyfileobj(src,dst,1024*1024)
    else:
        z.writestr(info,data)

name='Pasapalabra-3D-v0.39.apk'
target_final=OUT/name
memfd=os.memfd_create('pasapalabra039-main',0)
unsigned=Path('/proc/'+str(os.getpid())+'/fd/'+str(memfd))
dex=R/'native037/dex/classes.dex'
if not dex.is_file():
    raise SystemExit('Falta classes.dex')

www=R/'www'
skip_parts={'.git','.tmp'}
with zipfile.ZipFile(unsigned,'w',allowZip64=True) as z, zipfile.ZipFile(base) as b:
    for n in b.namelist():
        stored(z,n,data=b.read(n),ctype=zipfile.ZIP_STORED if n.endswith(('.arsc','.png')) else zipfile.ZIP_DEFLATED)
    stored(z,'classes.dex',path=dex,ctype=zipfile.ZIP_DEFLATED)
    nfiles=0
    for p in sorted(www.rglob('*')):
        if not p.is_file() or p.name.startswith('.') or p.name.endswith('.tmp'):
            continue
        rel=p.relative_to(www)
        if any(part.startswith('.') for part in rel.parts):
            continue
        ct=zipfile.ZIP_STORED if p.suffix.lower() in STORE else zipfile.ZIP_DEFLATED
        stored(z,'assets/www/'+str(rel),path=p,ctype=ct)
        nfiles+=1
print('PACK files', nfiles, 'unsigned', unsigned.stat().st_size, flush=True)
subprocess.run([ZIPALIGN,'-c','-p','4',str(unsigned)],check=True,env=ENV)

ram=Path('/dev/shm/pasapalabra039-salida')
ram.mkdir(exist_ok=True)
signed=ram/name
if signed.exists():
    signed.unlink()
subprocess.run([APKSIGNER,'sign','--ks','/workspace/_keys/pasapalabra.jks','--ks-key-alias',keys['PASAPALABRA_KEY_ALIAS'],'--ks-pass','env:PASAPALABRA_STORE_PASS','--key-pass','env:PASAPALABRA_STORE_PASS','--out',str(signed),str(unsigned)],check=True,env=ENV)
os.close(memfd)
cert=subprocess.check_output([APKSIGNER,'verify','--print-certs',str(signed)],env=ENV,text=True)
assert 'Verifies' in subprocess.check_output([APKSIGNER,'verify','--verbose',str(signed)],env=ENV,text=True)
sha=hashlib.file_digest(signed.open('rb'),'sha256').hexdigest()
# copy to salida (may already exist from a previous attempt)
if target_final.exists():
    bak=OUT/(name+'.prev')
    if bak.exists(): bak.unlink()
    target_final.rename(bak)
shutil.copy2(signed, target_final)
# drop ram copy after copy to save shm? keep until verified
print('SIGNED', json.dumps({'path':str(target_final),'size':target_final.stat().st_size,'sha256':sha,'versionCode':40,'versionName':'0.39','cert':cert},ensure_ascii=False), flush=True)
print('PACKAGE_DONE', flush=True)
