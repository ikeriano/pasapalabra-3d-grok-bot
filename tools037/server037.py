from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import re,mimetypes,json,zipfile,struct
ROOT=Path('/workspace/pasapalabra037/www');MEDIA=Path('/dev/shm/pasapalabra037-media')
class Handler(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def translate_path(self,path):
  from urllib.parse import urlparse,unquote
  path=unquote(urlparse(path).path)
  root=MEDIA if path.startswith('/media037/') else ROOT
  name=path.removeprefix('/media037/') if root==MEDIA else path.lstrip('/')
  p=(root/name).resolve()
  return str(p) if p.is_relative_to(root.resolve()) else str(root/'not-found')
 def send_head(self):
  p=Path(self.translate_path(self.path));self._remaining=None
  if p.is_dir():p=p/'index.html'
  base=0;disk=p
  if not p.is_file():
   apk=ROOT.parent/'salida/Pasapalabra-Biblioteca-v0.37.apk'
   if p.parent!=MEDIA or not apk.is_file():self.send_error(404);return None
   try:
    with zipfile.ZipFile(apk) as z:info=z.getinfo('assets/media037/'+p.name)
    if info.compress_type!=zipfile.ZIP_STORED:raise ValueError('Se necesita vídeo sin compresión ZIP')
    with apk.open('rb') as f:f.seek(info.header_offset);header=f.read(30)
    namelen,extra=struct.unpack_from('<HH',header,26);base=info.header_offset+30+namelen+extra;size=info.file_size;disk=apk
   except Exception:self.send_error(404);return None
  else:size=p.stat().st_size
  start=0;end=size-1;partial=False;r=self.headers.get('Range')
  if r:
   m=re.match(r'bytes=(\d*)-(\d*)',r)
   if m:
    a,b=m.groups();start=int(a) if a else max(0,size-int(b));end=min(size-1,int(b)) if a and b else size-1;partial=True
  if start>=size or end<start:self.send_error(416);return None
  self.send_response(206 if partial else 200);self.send_header('Content-Type',mimetypes.guess_type(str(p))[0] or 'application/octet-stream');self.send_header('Content-Length',str(end-start+1));self.send_header('Accept-Ranges','bytes');self.send_header('Cache-Control','no-cache')
  if partial:self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
  self.end_headers();f=disk.open('rb');f.seek(base+start);self._remaining=end-start+1;return f
 def copyfile(self,src,dst):
  left=self._remaining
  try:
   while left:
    b=src.read(min(65536,left))
    if not b:break
    dst.write(b);left-=len(b)
  except (BrokenPipeError,ConnectionResetError):pass
print('SERVER_READY 127.0.0.1:8737',flush=True)
ThreadingHTTPServer(('127.0.0.1',8737),Handler).serve_forever()
