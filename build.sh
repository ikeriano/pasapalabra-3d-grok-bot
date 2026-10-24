#!/bin/bash
# Compila el APK sin Gradle: javac + d8 + aapt2 + zipalign + apksigner. KS=carpeta con pp3d.jks y keystore.properties
set -e; J=$ANDROID_HOME/platforms/android-34/android.jar; B=$(mktemp -d)
javac -source 8 -target 8 -cp $J -d $B/cls android/src/com/ikeriano/pasapalabra3d/MainActivity.java
d8 --lib $J --min-api 21 --output $B $(find $B/cls -name "*.class")
aapt2 compile --dir android/res -o $B/res.zip && aapt2 link -o $B/u.apk -I $J --manifest android/AndroidManifest.xml $B/res.zip
mkdir -p $B/st/assets && cp -r www $B/st/assets/ && cp $B/classes.dex $B/st/ && (cd $B/st && zip -qr0 ../u.apk .)
g(){ grep "^$1=" $KS/keystore.properties | cut -d= -f2-; }
zipalign -f -p 4 $B/u.apk $B/a.apk && apksigner sign --ks $KS/pp3d.jks --ks-key-alias pp3d --ks-pass "pass:$(g storePassword)" --out Pasapalabra-3D.apk $B/a.apk
