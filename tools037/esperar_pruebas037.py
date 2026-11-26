import os,time,subprocess
while True:
 try:os.kill(594360,0)
 except ProcessLookupError:break
 time.sleep(3)
raise SystemExit(subprocess.call(['node','tools037/functional037.cjs']))
