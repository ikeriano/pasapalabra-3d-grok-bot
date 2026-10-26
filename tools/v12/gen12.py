# v0.12 · genera www/v12scenes.js (banco de escenas INVENTADAS, determinista) y www/v12count.json (cifras REALES)
import json,os,random,re
import data12a as A,data12b as B,data12c as C
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
N={'mono':600,'cam':600,'fuera':600,'tomas':600,'mej':600,'prev':300}
LINES=[];IDX={}
def L(role,text):
  k=(role,text)
  if k not in IDX:IDX[k]=len(LINES);LINES.append([role,text])
  return IDX[k]
class Deck:
  def __init__(s,items,rng):s.items=list(items);s.rng=rng;s.d=[]
  def next(s):
    if not s.d:s.d=s.items[:];s.rng.shuffle(s.d)
    return s.d.pop()
def prev_intro(i,v):
  e=C.ENGINES[i];n,rule=e[1],e[2]
  return ['Prueba previa inventada: %s. %s'%(n,rule),'Antes del rosco, calentamos con %s. %s'%(n.lower() if n[0]!='E' or True else n,rule),'Toca %s. %s ¡A por ello!'%(n.lower(),rule),'%s: la prueba que nadie pidió. %s'%(n,rule)][v]
def build():
  T={};seen={}
  # ---- monólogos
  rng=random.Random(1201);do=Deck(range(len(A.MONO_OPEN)),rng);dc=Deck(range(len(A.MONO_CLOSE)),rng);db=Deck(range(len(A.MONO_BRIDGE)),rng);dj=Deck(range(len(A.MONO_JOKE)),rng)
  out=[];used=set()
  while len(out)<N['mono']:
    a=dj.next();b=dj.next()
    if a==b or (a,b) in used:continue
    used.add((a,b));ja,jb=A.MONO_JOKE[a],A.MONO_JOKE[b]
    ls=[L('H',A.MONO_OPEN[do.next()]),L('H',ja[1]),L('H',ja[2]),L('H',A.MONO_BRIDGE[db.next()]),L('H',jb[1]),L('H',jb[2]),L('H',A.MONO_CLOSE[dc.next()])]
    out.append(['Monólogo %d · %s y %s'%(len(out)+1,ja[0],jb[0]),ls,[a,b]])
  T['mono']=out
  # ---- cámaras ocultas
  rng=random.Random(1202);cats=list(A.CAM_PREM);dop=Deck(range(len(A.CAM_OPEN)),rng);dre=Deck(range(len(A.CAM_REVEAL)),rng);dfi=Deck(range(len(A.CAM_FINAL)),rng);dpu=Deck(range(len(A.CAM_PUBLIC)),rng)
  out=[];used=set();k=0
  while len(out)<N['cam']:
    c=cats[k%len(cats)];k+=1
    p=rng.randrange(6);e=rng.randrange(6);r1,r2=rng.sample(range(8),2);rv=dre.next();fi=dfi.next()
    key=(c,p,e,r1,r2,rv,fi)
    if key in used:continue
    used.add(key);pr=A.CAM_PREM[c][p];es=A.CAM_ESC[c][e]
    ls=[L('G',A.CAM_OPEN[dop.next()]),L(pr[0],pr[1]),L('H',A.CAM_REACT[c][r1]),L(es[0],es[1]),L('H',A.CAM_REACT[c][r2]),L('G',A.CAM_REVEAL[rv]),L('H',A.CAM_FINAL[fi]),L('N',A.CAM_PUBLIC[dpu.next()])]
    out.append(['Cámara oculta %d · %s'%(len(out)+1,c),ls,[c]])
  T['cam']=out
  # ---- fuera de cámaras
  rng=random.Random(1203);dcl=Deck(range(len(B.FUERA_CLOSE)),rng);out=[];used=set();k=0
  while len(out)<N['fuera']:
    pl=k%len(B.PLACES);k+=1
    ok=[i for i,x in enumerate(B.FUERA) if x[4] is None or pl in x[4]]
    ex=rng.sample(ok,3)
    if (pl,tuple(ex)) in used:continue
    used.add((pl,tuple(ex)));ls=[]
    for i in ex:x=B.FUERA[i];ls+=[L(x[0],x[1]),L(x[2],x[3])]
    cl=B.FUERA_CLOSE[dcl.next()];ls.append(L(cl[0],cl[1]))
    out.append(['Fuera de cámaras %d · %s'%(len(out)+1,B.PLACES[pl]),ls,[pl]])
  T['fuera']=out
  # ---- tomas falsas
  rng=random.Random(1204);dop=Deck(range(len(B.TOMA_OPEN)),rng);dco=Deck(range(len(B.TOMA_CORTEN)),rng);dri=Deck(range(len(B.TOMA_RISA)),rng);dcl=Deck(range(len(B.LETRAS_CLUE)),rng);dev=Deck(range(len(B.TOMA_EV)),rng)
  out=[];used=set()
  while len(out)<N['tomas']:
    nt=2 if rng.random()<.45 else 1;ls=[];ks=[]
    for t in range(nt):
      cl=dcl.next();ev=dev.next();x=B.TOMA_EV[ev];ks.append((cl,ev))
      ls+=[L('G',B.TOMA_OPEN[dop.next()]),L('H',B.LETRAS_CLUE[cl][1]),L(x[0],x[1]),L(x[2],x[3]),L('G',B.TOMA_CORTEN[dco.next()])]
    if tuple(ks) in used:continue
    used.add(tuple(ks));ls.append(L('N',B.TOMA_RISA[dri.next()]))
    out.append(['Tomas falsas %d · letra %s%s'%(len(out)+1,B.LETRAS_CLUE[ks[0][0]][0],' y '+B.LETRAS_CLUE[ks[1][0]][0] if nt==2 else ''),ls,[nt]])
  T['tomas']=out
  # ---- mejores momentos
  rng=random.Random(1205);dop=Deck(range(len(B.MEJ_OPEN)),rng);dou=Deck(range(len(B.MEJ_OUT)),rng);dm=Deck(range(len(B.MEJ_MOM)),rng);out=[];used=set()
  while len(out)<N['mej']:
    ms=[dm.next() for _ in range(3)]
    if len(set(ms))<3 or tuple(sorted(ms)) in used:continue
    used.add(tuple(sorted(ms)));ls=[L('H',B.MEJ_OPEN[dop.next()])]
    for m in ms:x=B.MEJ_MOM[m];ls+=[L('H',x[1]),L('N',x[2])]
    ls.append(L('H',B.MEJ_OUT[dou.next()]))
    out.append(['Mejores momentos %d · %s'%(len(out)+1,', '.join(B.MEJ_MOM[m][0] for m in ms)),ls,[B.MEJ_MOM[m][0] for m in ms]])
  T['mej']=out
  # ---- pruebas previas (intro grabada; las preguntas se generan en el juego con la semilla)
  out=[];ne=len(C.ENGINES);per=N['prev']//ne
  for s in range(per):
    for e in range(ne):
      v=(s+e)%4;out.append(['Prueba previa %d · %s (semilla %d)'%(len(out)+1,C.ENGINES[e][1],s+1),[L('H',prev_intro(e,v))],[e,s+1]])
  T['prev']=out
  return T
if __name__=='__main__':
  T=build()
  d={'L':LINES,'T':T,'PL':B.PLACES,'ENG':[[e[0],e[1],e[2]] for e in C.ENGINES]}
  open(R+'/www/v12scenes.js','w').write('// v0.12 · banco de escenas INVENTADAS (tools/v12/gen12.py): L=frases [voz,texto], T=escenas [título,[índices de frase],meta]\nconst S12='+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';\n')
  # datos de preguntas de las pruebas previas
  q={'ref':C.REFRANES,'vf':C.VF,'cat':C.INTRUSO_CATS,'ana':C.ANAGRAMAS,'cap':C.CAPITALES,'ant':C.ANTONIMOS}
  open(R+'/www/v12qdata.js','w').write('const Q12='+json.dumps(q,ensure_ascii=False,separators=(',',':'))+';\n')
  uniq=len(LINES)
  cnt={'escritas_a_mano':{'monólogos':{'chistes (planteamiento+remate)':len(A.MONO_JOKE),'aperturas':len(A.MONO_OPEN),'puentes':len(A.MONO_BRIDGE),'cierres':len(A.MONO_CLOSE)},
  'cámaras ocultas':{'premisas':36,'escaladas':36,'reacciones':48,'aperturas':len(A.CAM_OPEN),'revelaciones':len(A.CAM_REVEAL),'finales':len(A.CAM_FINAL),'público':len(A.CAM_PUBLIC)},
  'fuera de cámaras':{'diálogos de 2 frases':len(B.FUERA),'cierres':len(B.FUERA_CLOSE),'lugares':len(B.PLACES)},
  'tomas falsas':{'fallos (frase+reacción)':len(B.TOMA_EV),'pistas de letra':len(B.LETRAS_CLUE),'aperturas':len(B.TOMA_OPEN),'cortes':len(B.TOMA_CORTEN),'risas':len(B.TOMA_RISA)},
  'mejores momentos':{'momentos (relato+reacción)':len(B.MEJ_MOM),'aperturas':len(B.MEJ_OPEN),'cierres':len(B.MEJ_OUT)},
  'pruebas previas':{'motores de juego':len(C.ENGINES),'refranes':len(C.REFRANES),'verdadero/falso':len(C.VF),'grupos de intruso':len(C.INTRUSO_CATS),'palabras':len(C.ANAGRAMAS),'capitales':len(C.CAPITALES),'antónimos':len(C.ANTONIMOS)}},
  'escenas_combinadas_en_menu':{k:len(v) for k,v in T.items()},'frases_grabadas_unicas':uniq}
  json.dump(cnt,open(R+'/www/v12count.json','w'),ensure_ascii=False,indent=1)
  print(cnt['escenas_combinadas_en_menu'],'frases únicas',uniq,'bytes',os.path.getsize(R+'/www/v12scenes.js'))
