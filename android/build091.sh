#!/bin/bash
# Compila y firma el APK v0.9.1 (applicationId com.ikeriano.pasapalabra3d.gb). Las contraseñas se leen de
# keystore.properties y se pasan por variables de entorno: no se imprimen ni se guardan.
set -e
REPO="$(cd "$(dirname "$0")/.." && pwd)"; OUT="${OUT:-/workspace/pasa3d_09/build091}"
KP="${KEYSTORE_DIR:-/cursor/stores/store-b6a3ca2b-7c3b-4225-8f28-1a7e8cfa3201/keystores}"
SDK=/home/box/android-sdk; BT=$SDK/build-tools/34.0.0; AJ=$SDK/platforms/android-34/android.jar
VC=10; VN=0.9.1
rm -rf "$OUT" && mkdir -p "$OUT/cls" "$OUT/dex" && cd "$OUT"
sed -e "s#package=\"com.ikeriano.pasapalabra3d\"#package=\"com.ikeriano.pasapalabra3d.gb\"#" \
    -e "s#android:versionCode=\"[0-9]*\" android:versionName=\"[^\"]*\"#android:versionCode=\"$VC\" android:versionName=\"$VN\"#" \
    -e 's#android:name=".MainActivity"#android:name="com.ikeriano.pasapalabra3d.MainActivity"#' "$REPO/android/AndroidManifest.xml" > AndroidManifest.xml
javac -source 8 -target 8 -cp "$AJ" -d cls "$REPO"/android/src/com/ikeriano/pasapalabra3d/*.java 2>&1 | grep -v "^warning\|^Note\|bootstrap" || true
$BT/d8 --min-api 21 --lib "$AJ" --output dex $(find cls -name '*.class')
$BT/aapt2 compile --dir "$REPO/android/res" -o res.zip
$BT/aapt2 link -o base.apk -I "$AJ" --manifest AndroidManifest.xml res.zip --min-sdk-version 21 --target-sdk-version 34 --version-code $VC --version-name $VN
python3 - "$REPO/www" <<'P'
import zipfile,os,sys
R=sys.argv[1];z=zipfile.ZipFile('base.apk','a');z.write('dex/classes.dex','classes.dex',zipfile.ZIP_DEFLATED)
for d,_,fs in os.walk(R):
  for f in fs:
    p=os.path.join(d,f);a='assets/www/'+os.path.relpath(p,R)
    z.write(p,a,zipfile.ZIP_STORED if f.endswith(('.ogg','.png','.jpg')) else zipfile.ZIP_DEFLATED)
z.close()
P
$BT/zipalign -f -p 4 base.apk aligned.apk
getp(){ grep "^$1=" "$KP/keystore.properties" | cut -d= -f2-; }
export KS_PASS="$(getp storePassword)" KEY_PASS="$(getp keyPassword)"
$BT/apksigner sign --ks "$KP/$(getp storeFile | xargs basename)" --ks-key-alias "$(getp keyAlias)" --ks-pass env:KS_PASS --key-pass env:KEY_PASS --out Pasapalabra-3D-v0.9.1.apk aligned.apk
unset KS_PASS KEY_PASS
$BT/apksigner verify --print-certs Pasapalabra-3D-v0.9.1.apk | grep -i "SHA-256\|Verifies" || true
$BT/aapt2 dump badging Pasapalabra-3D-v0.9.1.apk | grep -E "^package"
sha256sum Pasapalabra-3D-v0.9.1.apk; ls -la Pasapalabra-3D-v0.9.1.apk
