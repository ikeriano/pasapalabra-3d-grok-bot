from pathlib import Path
import json,subprocess
R=Path('/workspace/pasapalabra037');D=json.loads((R/'contenido037.json').read_text());records=[]
for x in D['items']:
 p=Path('/dev/shm/pasapalabra037-media')/(x['id']+'.mp4')
 d=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_name,profile,level,width,height,avg_frame_rate,sample_rate','-of','json',str(p)]));v=next(s for s in d['streams'] if s['codec_name']=='h264');a=next(s for s in d['streams'] if s['codec_name']=='aac');duration=float(d['format']['duration'])
 assert (v['width'],v['height'],v['profile'],v['level'])==(640,360,'Main',31),(x['id'],v)
 assert abs(duration-x['duration'])<.12,(x['id'],duration,x['duration'])
 records.append(dict(id=x['id'],size=p.stat().st_size,duration=duration,source_duration=x['duration'],video=v,audio=a))
(R/'tests037-medios.json').write_text(json.dumps(records,ensure_ascii=False,indent=2));print('MEDIA_CHECK_OK',len(records),'bytes',sum(x['size'] for x in records))
