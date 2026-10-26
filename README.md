# Pasapalabra 3D · Etapa 2007 (v0.1)
Juego fan en 3D (three.js en WebView Android) que recrea el plató y los grafismos de Pasapalabra 2007:
cabecera, presentador, bote, La Escalera, El Pulsador, De Par en Par, La Palabra Imposible y El Rosco, con cortinillas rojas en 3D.
Menú al estilo de la app Ahora Caigo, con Opciones de Plató y Etapa (2007 jugable; 2011–2019 próximamente).
Personajes estilizados, controles táctiles y teclado del móvil. Optimizado para Xiaomi Redmi A2.
Descarga el APK en Releases. Capturas y comparativas con la TV en `screenshots/`.


## v0.10 – Pasapalabra en familia, equipos de 3 y «Lo mejor de Pasapalabra» completo

- **👨‍👩‍👦 Pasapalabra en familia, como juego propio** (accesos en el menú principal, en Programas especiales y en Programas temáticos). Dos familias de **tres**: la **naranja** (ganó el programa anterior) y la **azul** (la que entra). Seis pruebas que dan **segundos**: *He dicho*, *Palabras cruzadas*, *¿Dónde están?*, *¿Tú qué pintas?*, *Esto me suena* y *La ristra* (3 al azar o las 6, en Opciones de la familia).
- **El Rosco** de 25 palabras con **85 s + los segundos ganados**: en cada familia juegan **2 miembros**, uno **de la A a la Ñ** y el otro **de la O a la Z**, siempre por turnos (nunca a la vez); el turno pasa con un fallo o con «Pasapalabra». Empieza la familia con más segundos (la naranja si empatan).
- **Resultado**: gana quien más aciertos tenga → 1.200 € y vuelve al programa; si empatan, quien tenga menos fallos; si empatan en todo, 600 € cada una y vuelven las dos. Con **25 aciertos** se llevan el **bote** (sube 6.000 € por programa sin ganador). Christian lo narra con sus propias palabras (voz es_ES), con grafismos naranja y azul, control táctil con el dedo y teclado fijo, todo en 3D.
- **Equipos de 3 personas** en todos los modos por equipos (tres sillas por lado en el plató 3D).
- **⭐ Lo mejor de Pasapalabra**, igual que el de «¡Ahora Caigo!»: botón dorado en el menú y **acceso en cada sección** (Especiales, Temáticos, Museo, Extras, Familia, Historia, Cómo se juega, Opciones…). Modal azul con borde dorado: especial completo, **mejores botes, roscos y momentos recreados en 3D sin presentador** (con **repetición a cámara lenta** al 30 % en los roscos; un toque la salta), **jugar un rosco famoso** (niveles aproximados), **Salón de la fama** (tus botes y roscos quedan guardados) y **🎞️ Vídeos de Ikeriano** (rejilla con póster, reproductor, anterior/siguiente; está **vacía y lista** para cargar vídeos).
- Los datos dudosos aparecen marcados con ⚠; las pruebas, definiciones, dibujos y canciones de *Pasapalabra en familia* son **contenido inventado** para este juego.
- Voces empaquetadas sin pérdida (el APK sigue por debajo de los 25 MB, sin recomprimir ningún audio).
- Mismo applicationId y misma firma que las versiones anteriores (versionCode 11).

## v0.9 – Cabeceras 2019, Extras, Lo mejor de Pasapalabra, La Silla Azul verificada, pruebas previas por equipos y final dorado
**Incluye todo lo de la versión anterior (v0.8).**
- **Táctil (prioridad)**: menús y listas se desplazan arrastrando el dedo (scroll nativo con inercia en el WebView), sin pulsar al arrastrar; en juego, gestos naturales (deslizar para cambiar de opción/año, tocar para elegir) y la cruceta de botones como alternativa, **oculta por defecto** (se activa y desactiva con «Cruceta de botones» en Opciones y se recuerda; en PC sin táctil se sigue usando el teclado). Tests con toques CDP: `tests/touch08.test.mjs`, `tests/touch09.test.mjs`. La inercia (fling) no se puede reproducir en Chrome sin pantalla; está cubierta por el scroll nativo.
- **Cabeceras 2019 rehechas** a imagen de los fotogramas reales: La Pista, Una de Cuatro, Sopa de Letras, ¿Dónde Están?, El Rosco (`www/v09e.js`, captura `screenshots/v0.9/cabeceras2019_JUEGO.jpg`). Cada cabecera sigue sonando entera y el programa espera a que termine el audio.
- **Bola de letras** como la del programa real de Fran (22-01-2019): letras más grandes y menos densas, giro lento medido (≈33 s por vuelta), inclinación 16°.
- **Final dorado** al ganar el bote (opción «Plató dorado», desactivada por defecto): plató y bola en dorado con rayos, sin tinte azul.
- **Christian dice el bote en voz alta** (opción activada por defecto). Las demás opciones nuevas están desactivadas por defecto.
- **La Silla Azul con datos verificados** (programa del 14/03/2017, Julio Escartín, 318.000 €; letras G y M; preguntas alternas, máximo dos fallos, «primero fallito, ¿vale?»). Grafismos A=2016 (azul oscuro), B=2018 (celeste), C=2020 (cian); las etapas sin referencia usan el estilo más cercano (suposición marcada). No hay Silla en junio de 2014 ni etapa 2015. La etapa Antena 3 NO está añadida.
- **Lo mejor de Pasapalabra**: mejores botes, mejores roscos y récords, momentos. Datos reales de prensa y Wikipedia con su fuente; los datos dudosos llevan ⚠. Cada elemento se puede ver como recreación jugable (narración).
- **Extras** (estilo Ahora Caigo): Tomas falsas con animaciones 3D, Fuera de cámaras, Publicidad (anuncios ficticios), Promos y Cámara libre. Voces Piper es_ES. Test: `tests/extras09.test.mjs`.
- **Acumulado del programa / concursante y número de programas** en pantalla; conversaciones de primer programa.
- **Pruebas previas del juego (inventadas)** en todas las etapas: Verdadero/Falso, Parejas, Intruso, Empieza por…, Rosco relámpago. Juegan DOS EQUIPOS, naranja (#fa8804) y azul (#1269f4), por turnos (nunca a la vez), con los grafismos del color del equipo. Capturas de los turnos naranja y azul en `screenshots/v0.9/`. Test: `tests/equipos09.test.mjs`.
- **Juegos DVD**: el Pasapalabra clásico del DVD (Partida completa, El Pulsador, De Par en Par, La Palabra imposible, El Rosco y Reglas) integrado como módulo 2D (`www/dvdc/`) con sus grafismos, los vídeos reales del DVD (menú en bucle, intro, cabeceras) y los sonidos del DVD de Telecinco (módulo DVD v1.1). Se abre con un toque, para el 3D mientras está activo y vuelve al menú de 3D con «Salir» (o con Atrás). Audio y vídeo recomprimidos (Opus ~10 kbps, vídeo H.264 de baja tasa) para que el APK siga bajo 25 MB.
- APK: `android/build09.sh` (versionCode 9, versionName 0.9, `com.ikeriano.pasapalabra3d.gb`, app aparte; no se instala sobre v0.7).

## v0.8 – Control táctil, final del bote, bola de letras, Keedy Sans y cabeceras enteras
- **Control táctil rehecho**: se activa al SOLTAR el dedo (no al apoyarlo), un deslizamiento mueve exactamente UNA opción (sin inercia), cruceta grande ▲▼◀▶ ✔ siempre visible y opción resaltada. Tope de 30 fps. Test con toques reales simulados (`tests/touch08.test.mjs`).
- **Bote**: al completar el rosco (25 aciertos) se gana el bote y TERMINA el programa: confeti, aplausos, pantalla con el importe, despedida y vuelta al menú. En todas las etapas y especiales. 2019 con el sonido y la despedida reales de Christian (22-01-2019). Test: `tests/bote08.test.mjs`.
- **Bola de letras** del plató contenida detrás y centrada con el título «Pasapalabra»; letras sueltas que flotan siempre (sin girar).
- **Tipografía Keedy Sans** incrustada en local (`www/font/keedy.ttf`) en rótulos, título, premio y subtítulos.
- **Cabeceras**: cada cabecera suena entera de principio a fin y el programa espera a que termine la música (`www/v08c.js`, `tests/cab08.test.mjs`). 2019: audio real de las cinco cabeceras (La Pista, Una de Cuatro, Sopa de Letras, ¿Dónde Están?, El Rosco).
- APK como app aparte: `com.ikeriano.pasapalabra3d.gb` (firma nueva, no se instala sobre v0.7).
- Pendiente para v0.9: La Silla Azul verificada en programas reales, «Lo mejor de Pasapalabra», sección Extras (tomas falsas, etc.).

## v0.3 – Cortinillas reales, cabeceras plano a plano y realización TV
- Cortinillas recreadas fotograma a fotograma para cada etapa: iris 3D descentrado, título Keedy con bisel que llega letra a letra (2007 en orden aleatorio, 2011–2017 en orden con giro y zoom), barrido de luz, salida con disco junto al título; 2019 con estallido de símbolos, título grande y letras que salen despedidas hacia la cámara.
- Cabeceras recreadas plano a plano con su música original sincronizada: campo de letras, túnel de anillos, esfera, letras gigantes en órbita, logotipo en espejo, iris y grúa sobre el plató (2019 con sus cortes, cintas y anillos de luz).
- Realización automática: grúas, dolly, travelling, órbita en el Rosco, planos de público y de reacción en cada respuesta.
- Plató vivo: presentador que gesticula al hablar, concursantes que celebran, público que aplaude con aplausos originales, focos en movimiento y LEDs que laten.
- Hojas comparativas TV/app en `screenshots/v0.3/` y análisis en `analisis_v03.md`.

## v0.2 – Etapas 2007, 2011, 2014, 2017 y 2019
- Selector de plató y etapa activo para todos los años, cada uno con su plató, logo, cabecera, cortinillas, pruebas reales y despedida.
- Voz real del presentador (recortes de los programas originales) antes de cada cortinilla y en las explicaciones de las pruebas, con subtítulos de sus palabras.
- Logo con la palabra «Pasapalabra» centrada sobre el ecuador de la esfera de letras, en tipografía Keedy Sans.
- En 2007 el concursante del Rosco juega de pie.
- Capturas en `screenshots/v0.2/` (app_* y cmp_* comparativas TV/app).

## v0.5
- El Rosco fácil (6 roscos que rotan, «Contiene» en Ñ, Q y X).
- Pruebas con temas inventados y bancos nuevos. La Escalera va de 7 a 3 letras y llega la Silla azul (2019).
- **La pista musical**, como en la tele: 3 turnos con 5 pistas (5-4-3-2-1 s). Usa solo sintonías de programas reales.
- Voz Piper es_ES-davefx-medium en todo lo que no dice Christian Gálvez. Sus clips reales se mantienen.
- La historia contada en voz alta.
- Programas especiales: Prime Time 2011, En familia, Copa de maestros, Duelo de campeones y Noche de campeones.
- Traído de Ahora Caigo 1.58: programas temáticos, promos, monólogos y las 10 normas, tomas falsas, museo, más opciones y los botones de arriba.
