import zipfile,os,json,hashlib,subprocess,shlex,struct,shutil,sys
from pathlib import Path
R=Path('/workspace/pasapalabra037');T=Path('/dev/shm/pasapalabra037-build');OUT=R/'salida';OUT.mkdir(exist_ok=True)
D=json.loads((R/'contenido037.json').read_text());STORE={'.mp4','.ogg','.opus','.mp3','.m4a','.wav','.png','.jpg','.jpeg','.webp','.glb','.ttf','.arsc'}
keys={}
for s in Path('/workspace/_keys/pasapalabra.env').read_text().splitlines():
 k,v=s.split('=',1);keys[k]=v
ENV=dict(os.environ,**keys,JAVA_HOME='/home/box/tools/jdk-17.0.21+9');ENV['PATH']=ENV['JAVA_HOME']+'/bin:'+ENV['PATH']
def stored(z,name,data=None,path=None,ctype=zipfile.ZIP_STORED):
 info=zipfile.ZipInfo(name,date_time=(2026,11,11,7,0,0));info.compress_type=ctype;info.external_attr=0o644<<16
 if ctype==zipfile.ZIP_STORED:
  n=(-(z.fp.tell()+30+len(name.encode('utf-8'))+4))%4;info.extra=struct.pack('<HH',0xD935,n)+b'\0'*n
 if path is not None:
  info.file_size=path.stat().st_size
  with path.open('rb') as src,z.open(info,'w') as dst:shutil.copyfileobj(src,dst,1024*1024)
 else:z.writestr(info,data)
selected=sys.argv[1] if len(sys.argv)>1 else 'all'
consume='--consume-generated-media' in sys.argv
recordfile=OUT/'huellas037.json'
records=json.loads(recordfile.read_text()) if recordfile.exists() else []
for kind,name in [('main','Pasapalabra-3D-v0.37.apk'),('library','Pasapalabra-Biblioteca-v0.37.apk')]:
 if selected not in ('all',kind):continue
 target=OUT/name
 if target.exists():raise SystemExit('No se sobrescribe el APK final: '+str(target))
 src=T/(kind+'-base.apk');memfd=os.memfd_create('pasapalabra037-'+kind,0);unsigned=Path('/proc/'+str(os.getpid())+'/fd/'+str(memfd));aligned=unsigned
 with zipfile.ZipFile(unsigned,'w',allowZip64=True) as z,zipfile.ZipFile(src) as base:
  for n in base.namelist():stored(z,n,data=base.read(n),ctype=zipfile.ZIP_STORED if n.endswith(('.arsc','.png')) else zipfile.ZIP_DEFLATED)
  stored(z,'classes.dex',path=R/'native037/dex/classes.dex',ctype=zipfile.ZIP_DEFLATED)
  if kind=='main':
   for p in sorted((R/'www').rglob('*')):
    if p.is_file() and not p.name.startswith('.') and not p.name.endswith('.tmp'):
     ct=zipfile.ZIP_STORED if p.suffix.lower() in STORE else zipfile.ZIP_DEFLATED
     stored(z,'assets/www/'+str(p.relative_to(R/'www')),path=p,ctype=ct)
  else:
   for x in D['items']:
    p=Path('/dev/shm/pasapalabra037-media')/(x['id']+'.mp4')
    if not p.is_file():raise RuntimeError('Falta vídeo '+str(p))
    stored(z,'assets/media037/'+p.name,path=p)
    if consume:
     # Solo recodificaciones temporales creadas por esta tarea; los originales permanecen intactos.
     p.unlink();print('TEMPORAL_EMPAQUETADO',p.name,flush=True)
   stored(z,'assets/catalogo037.json',data=json.dumps(D['items'],ensure_ascii=False).encode(),ctype=zipfile.ZIP_DEFLATED)
 print('PACK',kind,unsigned.stat().st_size,flush=True)
 subprocess.run(['/home/box/tools/android-14/zipalign','-c','-p','4',str(unsigned)],check=True,env=ENV)
 aligned=unsigned
 original_target=target;volatile=False
 if shutil.disk_usage(OUT).free<unsigned.stat().st_size+60*1024*1024:
  ram=Path('/dev/shm/pasapalabra037-salida');ram.mkdir(exist_ok=True)
  if shutil.disk_usage(ram).free<unsigned.stat().st_size+45*1024*1024:raise SystemExit('No hay espacio seguro ni en disco ni en RAM; no se borra ningún archivo ajeno.')
  target=ram/name;volatile=True
  if target.exists():raise SystemExit('No se sobrescribe un APK existente en RAM')
  print('AVISO: APK final en RAM por disco lleno; debe copiarse a disco antes de reiniciar.',target,flush=True)
 subprocess.run(['/home/box/tools/android-14/apksigner','sign','--ks','/workspace/_keys/pasapalabra.jks','--ks-key-alias',keys['PASAPALABRA_KEY_ALIAS'],'--ks-pass','env:PASAPALABRA_STORE_PASS','--key-pass','env:PASAPALABRA_STORE_PASS','--out',str(target),str(aligned)],check=True,env=ENV)
 cert=subprocess.check_output(['/home/box/tools/android-14/apksigner','verify','--print-certs',str(target)],env=ENV,text=True)
 (OUT/(name+'.cert.txt')).write_text(cert)
 if volatile:original_target.symlink_to(target)
 sha=hashlib.file_digest(target.open('rb'),'sha256').hexdigest();rec=dict(path=str(original_target),realPath=str(target),volatile=volatile,size=target.stat().st_size,sha256=sha,versionCode=38,versionName='0.37',cert=cert);records.append(rec);print('SIGNED',rec,flush=True)
 # Sólo se limpian los dos temporales recién generados, nunca archivos previos de Iker.
 os.close(memfd)
recordfile.write_text(json.dumps(records,ensure_ascii=False,indent=2));print('PACKAGE_DONE',flush=True)
