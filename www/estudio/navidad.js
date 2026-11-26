/* Navidad · árbol con luces y regalos low-poly para cualquier plató (ediciones navideñas). Reutilizable.
   Uso: EstudioNavidad.add(THREE, parent, {x,y,z, escala, regalos, seed}) → Group (dispose con EstudioNavidad.free(group)).
   Coste: ~8 mallas (conos + cajas + 1 InstancedMesh de luces), MeshBasic/Lambert, sin sombras. */
(function(){
function add(T,par,o){o=o||{};const g=new T.Group();g.name='navidad';const s=o.escala||1,L=(c)=>new T.MeshLambertMaterial({color:c}),Bm=(c)=>new T.MeshBasicMaterial({color:c});
 const tronco=new T.Mesh(new T.CylinderGeometry(.18*s,.22*s,.6*s,6),L(0x6b3d1f));tronco.position.y=.3*s;g.add(tronco);
 [[1.25,1.3,.9],[1.0,1.1,1.6],[.72,.95,2.25],[.45,.8,2.85]].forEach(([r,h,y])=>{const c=new T.Mesh(new T.ConeGeometry(r*s,h*s,8),L(0x1f7a3a));c.position.y=y*s;g.add(c);});
 const star=new T.Mesh(new T.OctahedronGeometry(.22*s,0),Bm(0xffd84a));star.position.y=3.35*s;g.add(star);
 const N=42,cols=[0xff3b3b,0xffd84a,0x5ad1ff,0xffffff,0xff7ad9],luz=new T.InstancedMesh(new T.SphereGeometry(.06*s,5,4),new T.MeshBasicMaterial(),N),m=new T.Object3D(),col=new T.Color();
 for(let i=0;i<N;i++){const t=i/N,y=(.55+t*2.6)*s,r=(1.2-t*1.05)*s+.04*s,a=i*2.4;m.position.set(Math.cos(a)*r,y,Math.sin(a)*r);m.updateMatrix();luz.setMatrixAt(i,m.matrix);luz.setColorAt(i,col.setHex(cols[i%cols.length]));}
 g.add(luz);g.userData.luz=luz;
 const R=o.regalos==null?6:o.regalos,pc=[[0xd62828,0xffd84a],[0x2a6fdb,0xffffff],[0x2ecc71,0xd62828],[0xffd84a,0x2a6fdb],[0xb04ad6,0xffffff],[0xff8a00,0x1f7a3a]];
 for(let i=0;i<R;i++){const a=i/R*6.283+.4,r=(1.5+(i%2)*.35)*s,w=(.35+(i%3)*.12)*s,h=(.3+(i%2)*.15)*s,[c1,c2]=pc[i%pc.length];
  const bx=new T.Mesh(new T.BoxGeometry(w,h,w),L(c1));bx.position.set(Math.cos(a)*r,h/2,Math.sin(a)*r);bx.rotation.y=a;g.add(bx);
  const ci=new T.Mesh(new T.BoxGeometry(w*1.02,h*1.02,w*.18),L(c2));ci.position.copy(bx.position);ci.rotation.y=a;g.add(ci);
  const ci2=ci.clone();ci2.rotation.y=a+Math.PI/2;g.add(ci2);}
 g.position.set(o.x||0,o.y||0,o.z||0);par.add(g);
 let t0=performance.now();g.onBeforeRender=null;g.userData.tick=()=>{const t=(performance.now()-t0)/400|0;if(t===g.userData.lt)return;g.userData.lt=t;for(let i=0;i<N;i++)luz.setColorAt(i,col.setHex((i+t)%3?cols[(i+t)%cols.length]:0x222222));luz.instanceColor.needsUpdate=true;};
 return g;}
function free(g){if(!g)return;g.parent&&g.parent.remove(g);g.traverse(o=>{o.geometry&&o.geometry.dispose();o.material&&o.material.dispose&&o.material.dispose();});}
function tickAll(root){root&&root.traverse(o=>{o.userData&&o.userData.tick&&o.userData.tick();});}
window.EstudioNavidad={add,free,tickAll};})();
