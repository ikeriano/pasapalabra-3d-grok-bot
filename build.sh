set -e
source /workspace/pp221/env.sh; cd /workspace/pp3d/build
sed -i 's/android:versionCode="[0-9]*" android:versionName="[^"]*"/android:versionCode="2" android:versionName="0.2"/' AndroidManifest.xml
AJ=$(ls /home/box/android-sdk/platforms/*/android.jar | tail -1)
rm -rf cres && mkdir cres && aapt2 compile --dir res -o cres/res.zip
aapt2 link -o base.apk -I $AJ --manifest AndroidManifest.xml cres/res.zip --min-sdk-version 21 --target-sdk-version 34 --version-code 2 --version-name 0.2
python3 - <<'P'
import zipfile,os
z=zipfile.ZipFile('base.apk','a')
z.write('dex/classes.dex','classes.dex',zipfile.ZIP_DEFLATED)
R='/workspace/pp3d/app/www'
for d,_,fs in os.walk(R):
  for f in fs:
    if f.endswith(('.mjs',)):continue
    p=os.path.join(d,f);a='assets/www/'+os.path.relpath(p,R)
    z.write(p,a,zipfile.ZIP_STORED if f.endswith(('.ogg','.png','.jpg','.ttf')) else zipfile.ZIP_DEFLATED)
z.close()
P
zipalign -f -p 4 base.apk aligned.apk
P=../keystore/keystore.properties; SP=$(grep storePassword $P|cut -d= -f2-); KP=$(grep keyPassword $P|cut -d= -f2-)
apksigner sign --ks ../keystore/pp3d.jks --ks-key-alias pp3d --ks-pass pass:$SP --key-pass pass:$KP --out ../Pasapalabra-3D-v0.2.apk aligned.apk
apksigner verify ../Pasapalabra-3D-v0.2.apk && ls -la ../Pasapalabra-3D-v0.2.apk
