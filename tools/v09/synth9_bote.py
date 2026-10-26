# v0.9 · voz del bote: importes y frases con Piper es_ES (davefx, castellano peninsular)
import json,os,subprocess,wave
from concurrent.futures import ThreadPoolExecutor
from piper import PiperVoice, SynthesisConfig
U=['','un','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiún','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve']
D=['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa']
C=['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos']
def w999(n,ap=True):  # ap: apocopa «uno»->«un» (delante de mil/millón)
  if n==100:return 'cien'
  s=[];c,r=divmod(n,100)
  if c:s.append(C[c])
  if r:
    if r<30:s.append(U[r] if (ap or r!=1) else 'uno')
    else:
      d,u=divmod(r,10)
      s.append(D[d]+((' y '+('un' if ap else 'uno')) if u==1 else (' y '+U[u] if u else '')))
  return ' '.join(s)
def words(n):
  m,r=divmod(n,1000000);p=[]
  if m:p.append('un millón' if m==1 else w999(m)+' millones')
  k,u=divmod(r,1000)
  if k:p.append('mil' if k==1 else w999(k)+' mil')
  if u:p.append(w999(u,False))
  return ' '.join(p)
if __name__=='__main__':
  O='/workspace/repos/pasapalabra-3d-grok-bot/www/snd/bote';W='/workspace/pasa3d_09/w'
  amts=sorted(set(list(range(60000,3000001,6000))+[300000,25000]))
  PRE={'inicio':'Y el bote de hoy está en','sube':'Y el bote sube. ¡Ahora está en','rosco':'Atención, que en este rosco hay en juego un bote de','gana':'¡Rosco completo! ¡Te llevas el bote de'}
  v=PiperVoice.load('/workspace/piper/es_ES-davefx-medium.onnx');cfg=SynthesisConfig(length_scale=0.985)
  jobs=[]
  items=[(f'a{a}',words(a)+' euros.') for a in amts]+[(f'pre_{k}',t) for k,t in PRE.items()]
  for n,t in items:
    if not os.path.exists(f'{O}/{n}.ogg'):
      with wave.open(f'{W}/{n}.wav','wb') as w:v.synthesize_wav(t,w,syn_config=cfg)
      jobs.append(n)
  def enc(n):subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{W}/{n}.wav','-af','silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse','-ac','1','-ar','24000','-c:a','libopus','-b:a','16k','-application','voip',f'{O}/{n}.ogg'],check=True)
  with ThreadPoolExecutor(6) as ex:list(ex.map(enc,jobs))
  open('/workspace/pasa3d_09/bote_words.json','w').write(json.dumps({str(a):words(a) for a in amts},ensure_ascii=False,indent=0))
  print(len(amts),'importes',len(jobs),'nuevos')
