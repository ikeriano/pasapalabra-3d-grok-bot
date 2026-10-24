import json,re,unicodedata,subprocess,sys
exec(open('banks.py').read())
DROP={'halloween':['EQUIS|X','YEMA','KETCHUP'],'navidad':['QUESO','WHISKY','YATE'],'reyes':['UNO','QUESO','KÉTCHUP|KETCHUP'],'mar':['URCHIN|ERIZO'],'selva':['UNICORNIO','KOALA']}
def norm(s):return ''.join(c for c in unicodedata.normalize('NFD',s.upper()) if unicodedata.category(c)!='Mn' or c=='\u0303').replace('N\u0303','Ñ')
LET='ABCDEFGHIJLMNÑOPQRSTUVXYZ'
# fallback fácil: rosco genérico de v05data (R)
src=open('/workspace/pp3d/app/www/v05data.js').read()
out={};seen={}
for k,txt in B.items():
  if id(txt) in seen: out[k]=seen[id(txt)];continue
  W=[]
  for ln in txt.strip().split('\n'):
    a,d=ln.split(':',1)
    if a in DROP.get(k,[]):continue
    W.append([a.split('|'),d.strip()])
  used=set();ros=[]
  R={}
  for L in sorted(LET,key=lambda l:('XYQKWÑUZJV'+LET).index(l)):
    c=[w for w in W if norm(w[0][0]).startswith(L) and w[0][0] not in used] or [w for w in W if L in norm(w[0][0]) and w[0][0] not in used]
    if c: used.add(c[0][0][0]);R[L]=[c[0][0],c[0][1]]
    else: R[L]=None
  ros=[R[L] for L in LET]
  d={'ros':ros,'words':[[w[0][0],w[1]] for w in W]}
  seen[id(txt)]=d;out[k]=d
miss={k:[LET[i] for i,r in enumerate(v['ros']) if r is None] for k,v in out.items()}
print({k:v for k,v in miss.items() if v})
json.dump(out,open('q6.json','w'),ensure_ascii=False)
