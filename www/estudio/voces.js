// Voces grabadas (Piper TTS, solo es_ES) por personaje del estudio. Formato: modelo[:locutor][@tono]
// modelo = es_ES-<modelo>-*.onnx en /workspace/piper · locutor = id del modelo multi-voz · tono = factor de afinación (rubberband)
// Los audios están en estudio/voz/<fnv(personaje|frase)>.ogg (Opus) y la duración en estudio/voz/index.json.
// Se generan con tools/gen_voces_estudio.py. Si un juego cambia frases, vuelve a ejecutarlo.
// Reutiliza las voces que ya tenían los juegos: Adrián = davefx (Ahora Caigo y Uno para ganar), regidor = carlfm («reg»),
// y los personajes de Ahora Caigo 1.59 (v59_*), reconstruidos comparando sus audios con los modelos es_ES.
window.ESTUDIO_VOCES = window.ESTUDIO_VOCES || {
  adrian: 'davefx',          // presentador (Adrián Vega / Javier Valle)
  lola:   'mls_10246',       // directora (= v59_lola)
  nuria:  'sharvard:1',      // maquillaje (= «maq» y v59_nuria)
  marta:  'sharvard:1@1.12', // peluquería
  julia:  'mls_10246@1.15',  // vestuario
  sergio: 'sharvard:0@1.08', // realizador
  ines:   'mls_10246@0.88',  // redactora
  rober:  'carlfm@0.93',     // sonido (= v59_rober)
  paco:   'carlfm',          // regidor (= «reg»)
  toni:   'sharvard:0@0.88', // decorados
  carmen: 'mls_9972@1.07',   // recepción (= v59_carmen)
  luis:   'davefx@1.12',     // cafetería
  ana:    'sharvard:1@0.90', // concursante
  dani:   'carlfm@1.14',     // concursante
  nacho:  'sharvard:0@1.07', // guionista (= v59_nacho)
  marisa: 'mls_9972@0.95',   // catering (= v59_marisa)
  segu:   'carlfm@0.82',     // seguridad (= v59_segu)
  vet:    'carlfm@0.96',     // concursante veterano (= v59_vet)
  locu:   'davefx@0.95',     // voz en off (= v59_locu)
  jefe:   'davefx@0.85',     // «El jefe» (= v59_jefe)
  pub:    'carlfm@1.10',     // público (Ahora Caigo)
  peque:  'mls_9972@1.18',   // sobrino de un concursante (= v59_peque)
  abuela: 'mls_10246@0.85'   // abuela de un concursante (= v59_abuela)
};
