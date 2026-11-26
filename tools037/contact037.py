from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps
import json,math
R=Path('/workspace/pasapalabra037');C=R/'capturas';paths=sorted(C.glob('final-*.png'))+sorted(C.glob('programa-*.png'))
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13);title=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',27)
cols=4;w,h=320,207;sheet=Image.new('RGB',(cols*w,75+math.ceil(len(paths)/cols)*h),'#06152b');d=ImageDraw.Draw(sheet);d.text((18,10),'Pasapalabra 3D · 0.37',font=title,fill='#ffda75');d.text((18,46),'Capturas de las pruebas en Chrome / SwiftShader. No son capturas de un Redmi A2 real.',font=font,fill='#c5d7f0')
for i,p in enumerate(paths):
 im=ImageOps.contain(Image.open(p).convert('RGB'),(w,180));x=(i%cols)*w;y=75+(i//cols)*h;sheet.paste(im,(x+(w-im.width)//2,y+(180-im.height)//2));d.text((x+5,y+183),p.stem.replace('final-','')[:40],font=font,fill='white')
sheet.save(R/'hoja_0.37.png');(C/'indice037.json').write_text(json.dumps([str(p) for p in sorted(C.iterdir()) if p.suffix in ['.png','.jpg']],ensure_ascii=False,indent=2));print('CONTACT_SHEET',len(paths),R/'hoja_0.37.png','TOTAL_IMAGES',len(list(C.glob('*.png')))+len(list(C.glob('*.jpg'))))
