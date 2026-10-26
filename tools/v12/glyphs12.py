from PIL import Image
import numpy as np
def cells(n,bands):
    im=np.array(Image.open(n+'.png').convert('RGB')).astype(int)
    h,w,_=im.shape;mag=(im[:,:,0]>200)&(im[:,:,1]<80)&(im[:,:,2]>200)
    out=[]
    for (a,b) in bands:
        col=mag[a:b].sum(0)>=(b-a)*0.85
        xs=[x for x in range(w) if col[x]]
        # groups
        grp=[];
        for x in xs:
            if grp and x-grp[-1][1]<=2:grp[-1][1]=x
            else:grp.append([x,x])
        row=[]
        for i in range(len(grp)-1):
            x0=grp[i][1]+1;x1=grp[i+1][0]
            if x1-x0>=2:row.append((x0,x1))
        out.append((a,b,row))
    return out
if __name__=='__main__':
    for n,b in [('FontBig',[(1,20),(29,61),(66,98)]),('FontNormal',[(1,24),(35,58),(63,86)]),('FontMid',[(1,25),(34,58),(63,87)])]:
        print(n,[len(r) for a,bb,r in cells(n,b)],[ (r[0],r[-1]) for a,bb,r in cells(n,b)])
