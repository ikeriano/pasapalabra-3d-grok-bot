#!/bin/bash
set -euo pipefail
cd /workspace/pasapalabra037
export JAVA_HOME=/home/box/tools/jdk-17.0.21+9
export PATH="$JAVA_HOME/bin:/home/box/tools/android-14:$PATH"
SDK=/workspace/arguinano_build/stage/android-34.jar
javac -source 8 -target 8 -classpath /home/box/tools/android-14/core-lambda-stubs.jar -bootclasspath "$SDK" -d native037/classes native037/src/com/ikeriano/pasapalabra3d/*.java
jar cf native037/classes037.jar -C native037/classes .
d8 --min-api 21 --lib "$SDK" --output native037/dex native037/classes037.jar
mkdir -p native037/res/mipmap
unzip -p base036/Pasapalabra-3D-v0.36.apk res/mipmap/ic_launcher.png > native037/res/mipmap/ic_launcher.png
aapt2 compile --dir native037/res -o /dev/shm/pasapalabra037-build/res.zip
for t in main library; do aapt2 link -o /dev/shm/pasapalabra037-build/$t-base.apk -I "$SDK" --manifest native037/manifest-$t.xml /dev/shm/pasapalabra037-build/res.zip --version-code 38 --version-name 0.37; done
echo NATIVE_DONE
