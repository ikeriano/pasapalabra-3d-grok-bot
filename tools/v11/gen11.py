# v0.11 · genera www/v11data.js (const D11) desde data11.py (única fuente de los textos)
import json,os
import data11 as D
R=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
d=dict(botes=D.botes_js(),roscos=D.ROSCOS,momentos=D.MOMENTOS,lv=D.LV,fuera=[dict(t=s['t'],L=[dict(w=w,t=t) for w,t in s['L']]) for s in D.FUERA],
 tomas=[dict(k=k,t=t) for k,t in D.TOMAS],camaras=[dict(t=c['t'],L=[dict(w=w,t=t) for w,t in c['L']]) for c in D.CAMARAS],copro=D.COPRO,
 normas=[dict(id=i,c=c,n=n,d=de,u=u,x=x) for i,c,n,de,u,x in D.NORMAS],nsIntro=D.NS_INTRO,nsFin=D.NS_FIN,cat=D.CAT_NAME,prev=D.PREV,
 sinon=[list(x) for x in D.SINON],rimas=[list(x) for x in D.RIMAS])
open(R+'/www/v11data.js','w').write('// v0.11 · datos nuevos (tools/v11/data11.py → gen11.py). Todo lo inventado va marcado como inventado.\nconst D11='+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';\n')
print('ok',os.path.getsize(R+'/www/v11data.js'))
