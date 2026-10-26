#!/usr/bin/env python3
"""v0.12 · extrae del juego de PC de Antena 3 (PASAP.EXE, Bialplen ~2001) lo que usa la etapa de Silvia Jato.
Uso: assets12.py <carpeta del ISO extraída: ref_jato_juego> <www>
 - gráficos (UGF→PNG ya decodificados) → www/jato/*.jpg|webp
 - preguntas Program*.qst (bytes +0x78) → www/v12jato.js (JQ12)
 - sonidos .trk (WAV) → www/snd/j12_*.ogg
 - fuente FontBig (UGF) → atlas webp + celdas"""
import sys,os,re,json,glob,subprocess
import numpy as np
from PIL import Image
R,W=sys.argv[1],sys.argv[2]
G=R+'/decoded/gfx';os.makedirs(W+'/jato',exist_ok=True);os.makedirs(W+'/snd',exist_ok=True)
JPG=['Game1Bkg','TableBkg','Presen1Bkg','title','Loading','License','Select1PBkg','Select2PBkg','Optbkg','HiScoreBkg','HelpBkg','premiumBkg','Cup1','Cup2','Cup3','Ap00','Ap01','Center2','Exit','Warning','Last00','General','Left','Right','Center','Tgames1','Tgames2']
for n in JPG:
    im=Image.open(f'{G}/{n}.png').convert('RGB')
    im.save(f'{W}/jato/{n}.jpg',quality=78,optimize=True)
def alpha(im):
    a=np.array(im.convert('RGBA'));m=(a[:,:,0]>230)&(a[:,:,1]<40)&(a[:,:,2]>230);a[m,3]=0;return Image.fromarray(a)
for n in ['Figol','Matona','Noris','Papela','Zamara','Seguro']:
    alpha(Image.open(f'{G}/{n}.png')).crop((0,0,430,480)).save(f'{W}/jato/{n}.webp',lossless=True,quality=100,method=6)
# fuente
import importlib.util
sp=importlib.util.spec_from_file_location('glyphs',os.path.join(os.path.dirname(__file__),'glyphs12.py'));gm=importlib.util.module_from_spec(sp);sp.loader.exec_module(gm)
atlas={}
for fn,bands in [('FontBig',[(1,20),(29,61),(66,98)])]:
    cs=gm.cells(G+'/'+fn,bands);rows=[[c for c in r if c[1]-c[0]>=8] for a,b,r in cs]
    seq=['abcdefghijklmnñopqrstuvwxyz','ABCDEFGHIJKLMNÑOPQR','STUVWXYZ0123456789.']
    for (a,b,_),row,chars in zip(cs,rows,seq):
        for ch,(x0,x1) in zip(chars,row):atlas[ch]=[x0,a,x1-x0,b-a]
    a=np.array(Image.open(f'{G}/{fn}.png').convert('RGB')).astype(int);l=np.clip(a.max(2)*1.3,0,255).astype(np.uint8);o=np.zeros(a.shape[:2]+(4,),np.uint8);o[:,:,:3]=255;o[:,:,3]=l;Image.fromarray(o).save(f'{W}/jato/{fn}.webp',lossless=True,method=6)
json.dump(atlas,open(W+'/jato/FontBig.json','w'),ensure_ascii=False)
# preguntas
Q=[]
for f in sorted(glob.glob(R+'/Data/Questions/*.qst')):
    t=bytes((x-0x78)&255 for x in open(f,'rb').read()).decode('latin-1').replace('¤','ñ')
    g=re.split(r'\[JUEGO(\d)\]\r?\n',t);d={int(g[i]):[l for l in g[i+1].splitlines() if l.strip()] for i in range(1,len(g),2)}
    Q.append([os.path.basename(f)[7:10]]+[[l.split('#',1) if '#' in l else [l,''] for l in d[k]] for k in range(1,7)])
# J3: «Nombre#frase con #PALABRA#» + «PISTA#texto»
open(W+'/v12jato.js','w').write('// v0.12 · preguntas del juego de PC «Pasapalabra» de Antena 3 (Bialplen S.L., ~2001): 52 programas × 6 juegos, descifradas de Program*.qst\nconst JQ12='+json.dumps(Q,ensure_ascii=False,separators=(',',':'))+';\n')
# sonidos
for f in sorted(glob.glob(R+'/decoded/snd/*.wav')):
    n=os.path.basename(f)[:-4].lower()
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f,'-ac','1','-ar','24000','-c:a','libopus','-b:a','24k',f'{W}/snd/j12_{n}.ogg'],check=True)
print('ok',len(Q),'programas',len(atlas),'glifos')
