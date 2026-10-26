# Pasapalabra 3D · Etapa 2007 (v0.1)
Juego fan en 3D (three.js en WebView Android) que recrea el plató y los grafismos de Pasapalabra 2007:
cabecera, presentador, bote, La Escalera, El Pulsador, De Par en Par, La Palabra Imposible y El Rosco, con cortinillas rojas en 3D.
Menú al estilo de la app Ahora Caigo, con Opciones de Plató y Etapa (2007 jugable; 2011–2019 próximamente).
Personajes estilizados, controles táctiles y teclado del móvil. Optimizado para Xiaomi Redmi A2.
Descarga el APK en Releases. Capturas y comparativas con la TV en `screenshots/`.


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
