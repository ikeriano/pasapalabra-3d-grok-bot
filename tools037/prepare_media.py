import json,subprocess,re,os
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
R=Path('/workspace/pasapalabra037'); out=Path('/dev/shm/pasapalabra037-media');out.mkdir(exist_ok=True)
roots=[Path('/workspace/videos_nuevos/lote2/pasapalabra_telecinco/enc'),Path('/workspace/videos_nuevos/lote3/pasapalabra_pruebas/enc')]
items=[]
for root in roots:
 for p in sorted(root.glob('*.mp4')):
  n,rest=p.name.split('_',1);vid=rest[:11];title=rest[12:-4].replace('_',' ')
  if vid=='doaiMZy3QH0':continue
  d=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(p)]))
  sec=float(d['format']['duration']);kind='prueba' if 'pruebas' in str(root) else ('programa' if int(n)<=3 else 'otro')
  items.append(dict(id=vid,title=title,kind=kind,duration=sec,source=str(p),src=f'media037/{vid}.mp4',poster=f'poster037/{vid}.jpg',url=f'https://www.youtube.com/watch?v={vid}',n=int(n)))
(R/'catalogo037.json').write_text(json.dumps(items,ensure_ascii=False,indent=2))
(R/'www/poster037').mkdir(exist_ok=True)
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13)
for x in items:
 src=x['source'];dst=out/(x['id']+'.mp4')
 if not dst.exists():
  print('ENCODE',x['id'],x['duration'],flush=True)
  subprocess.run(['ffmpeg','-nostdin','-v','error','-i',src,'-vf','scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2,setsar=1','-r','25','-c:v','libx264','-profile:v','main','-level:v','3.1','-preset','veryfast','-threads','2','-b:v','280k','-maxrate','450k','-bufsize','900k','-pix_fmt','yuv420p','-g','50','-c:a','aac','-b:a','48k','-ac','2','-ar','44100','-movflags','+faststart','-n',str(dst)],check=True)
 print('READY',dst.name,dst.stat().st_size,flush=True)
 subprocess.run(['ffmpeg','-nostdin','-v','error','-ss',str(min(20,x['duration']/5)),'-i',src,'-frames:v','1','-vf','scale=320:180','-threads','1','-n',str(R/'www'/x['poster'])],check=True)
 if x['kind']=='programa':
  tiles=[]
  for t in range(0,int(x['duration']),120):
   f=R/'capturas'/f"referencia-{x['id']}-{t:04}.jpg"
   subprocess.run(['ffmpeg','-nostdin','-v','error','-ss',str(t),'-i',src,'-frames:v','1','-vf','scale=320:180','-threads','1','-n',str(f)],check=True)
   im=Image.new('RGB',(320,205),'#081734');im.paste(Image.open(f),(0,0));ImageDraw.Draw(im).text((8,184),f"{t//60:02}:{t%60:02} · {x['id']}",font=font,fill='white');tiles.append(im)
  sheet=Image.new('RGB',(1280,205*((len(tiles)+3)//4)),'#081734')
  for i,im in enumerate(tiles):sheet.paste(im,(i%4*320,i//4*205))
  sheet.save(R/'capturas'/('referencias-'+x['id']+'.jpg'),quality=88)
print('MEDIA_DONE',flush=True)
