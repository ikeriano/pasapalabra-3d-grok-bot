from pathlib import Path
import time,subprocess,os
R=Path('/workspace/pasapalabra037')
print('Esperando el final de la codificación, sin tocar otros trabajos…',flush=True)
while 'MEDIA_DONE' not in (R/'media037.log').read_text():
 try:os.kill(509829,0)
 except ProcessLookupError:raise SystemExit('La codificación terminó sin MEDIA_DONE; revisar media037.log')
 time.sleep(4)
print('Medios preparados; comprobando códecs y empaquetando…',flush=True)
subprocess.run(['python3',str(R/'tools037/media_check037.py')],cwd=R,check=True)
subprocess.run(['python3',str(R/'tools037/package037.py')],cwd=R,check=True)
print('BUILD_FINISHED',flush=True)
