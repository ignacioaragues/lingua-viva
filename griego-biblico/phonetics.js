/* Lingua Viva · fonética comparada del griego. Cuadro histórico propio, no transcripción del manual de Duff.
   IPA entre / / = representación fonémica aproximada; [ ] = realizaciones contextuales.
   Flecha = cambio histórico, no alternativas simultáneas. Las cronologías de la koiné son graduales y regionales. */
window.LINGUA_GREEK_PHONETICS={
  intro:"Ático: reconstrucción de Atenas, siglos V–IV a. C. Koiné bíblica: aproximaciones a los siglos I–II d. C., con cambios que no ocurrieron al mismo tiempo en todas las regiones. Moderno: griego estándar actual. Las flechas (→) indican evolución histórica; «~» señala variantes o análisis alternativos. La pronunciación escolar de Duff es una cuarta convención, no idéntica a ninguna de estas tres columnas.",
  letters:[
    ["α","alfa","/a, aː/","/a/ (cantidad en retroceso)","/a/","La duración de α podía ser breve o larga en ático; el griego moderno ya no distingue cantidad vocálica."],
    ["β","beta","/b/","/b/ → /β/ (más tarde /v/)","/v/","En ático era oclusiva como la b de «barco»; la fricativización fue gradual. No proyectes automáticamente la /v/ moderna al siglo I."],
    ["γ","gama","/ɡ/; [ŋ] ante velar","/ɡ/ → /ɣ/; [ŋ] ante velar","/ɣ/; [ʝ] ante /e, i/","[ɣ] se aproxima a la g intervocálica rioplatense de «lago»; [ʝ] es una variante palatal. γγ y γκ tienen reglas especiales."],
    ["δ","delta","/d/","/d/ → /ð/ (gradual)","/ð/","[ð] se parece a la d relajada entre vocales en español, como en «cada». La d oclusiva clásica era distinta."],
    ["ε","épsilon","/e/","/e/","/e/","Vocal breve en ático; el griego moderno no mantiene esa oposición de duración."],
    ["ζ","zeta","/zd/ ~ /dz/","/z/ (generalizado)","/z/","El orden de los componentes clásicos es discutido. /z/ es una s sonora, no la s rioplatense habitual."],
    ["η","eta","/ɛː/","/e/ → /i/ (según época y región)","/i/","Ático: e abierta y larga. En la koiné hubo cierre e itacismo; no debe identificarse siempre η con /i/ en todo el NT."],
    ["θ","theta","/tʰ/","/tʰ/ → /θ/","/θ/","En ático era t con aspiración, no /θ/. El valor /θ/ recuerda al inglés think, no a la z rioplatense (/s/)."],
    ["ι","iota","/i, iː/","/i/","/i/","En ático podía ser breve o larga; en moderno ambas longitudes se fusionaron."],
    ["κ","kapa","/k/","/k/","/k/; [c] ante vocal anterior","[c] es una realización palatalizada en ciertos contextos modernos, no otra letra."],
    ["λ","lambda","/l/","/l/","/l/","Aproximadamente como la l española; hay ajustes contextuales en la pronunciación real."],
    ["μ","mu","/m/","/m/","/m/","Nasal bilabial, como la m de «mano»."],
    ["ν","nu","/n/","/n/; asimilaciones","/n/; [ŋ, ɱ, m] según contexto","La n se asimila al lugar de articulación de la consonante siguiente."],
    ["ξ","xi","/ks/","/ks/","/ks/","Grupo /k/ + /s/, comparable a la pronunciación cuidada de «taxi»."],
    ["ο","ómicron","/o/","/o/","/o/","Ático: o breve. El moderno fusionó ο y ω."],
    ["π","pi","/p/","/p/","/p/","Oclusiva bilabial sorda, sin aspiración distintiva."],
    ["ρ","rho","/r/; [r̥] inicial con ῥ","/r/; pérdida progresiva de [h]","/ɾ/ ~ [r]","El sonido vibrante puede variar entre simple y múltiple. El espíritu áspero inicial es una característica histórica."],
    ["σ / ς","sigma","/s/; [z] ante sonora","/s/; [z] ante sonora","/s/; [z] ante sonora","ς es la grafía final de σ, no un fonema diferente. [z] aparece por asimilación contextual."],
    ["τ","tau","/t/","/t/","/t/","Oclusiva dental sorda, como la t española."],
    ["υ","ípsilon","/y, yː/","/y/ → /i/ (proceso prolongado)","/i/","La /y/ antigua es como la u francesa: labios de u y lengua de i. Duff emplea /u/ como convención escolar española."],
    ["φ","fi","/pʰ/","/pʰ/ → /f/","/f/","Ático: p aspirada; moderno: f. La fricativización no fue instantánea."],
    ["χ","ji","/kʰ/","/kʰ/ → /x/","/x/; [ç] ante /e, i/","Ático: k aspirada. En moderno [ç] es más palatal que la j española, como el alemán ich."],
    ["ψ","psi","/ps/","/ps/","/ps/","Grupo /p/ + /s/; ambos segmentos se conservan en pronunciación cuidada."],
    ["ω","omega","/ɔː/","/o/ (cantidad neutralizada)","/o/","Ático: o abierta y larga. El sistema de Duff suele simplificarla como /oː/."]
  ],
  combinations:[
    ["αι","alfa + iota","/ai̯/","/e/ (monoptongado)","/e/","En el ático clásico era un diptongo; en la koiné del NT normalmente ya equivalía a ε."],
    ["ει","épsilon + iota","/eː/; antes /ei̯/","/i/ (en gran parte del NT)","/i/","En ático clásico muchas grafías ει ya representaban /eː/; el valor /ei̯/ corresponde a una fase más antigua o a contextos particulares."],
    ["οι","ómicron + iota","/oi̯/","/y/ → /i/ (más tardío)","/i/","No hay que anticipar /i/ para toda la koiné temprana: el cierre pasó por una vocal redondeada /y/."],
    ["ου","ómicron + ípsilon","/uː/; antes /ou̯/","/u/","/u/","En ático clásico la grafía ου normalmente ya indicaba /uː/; no debe leerse como /o/ + /u/."],
    ["υι","ípsilon + iota","/yi̯/","/yi̯/ ~ /y/; más tarde /i/","/i/","Secuencia infrecuente; la monoptongación y el itacismo variaron según época."],
    ["αυ","alfa + ípsilon","/au̯/","/au̯/ → /av, af/","/av/ ~ /af/","En moderno /av/ ante vocal o consonante sonora, /af/ ante consonante sorda."],
    ["ευ","épsilon + ípsilon","/eu̯/","/eu̯/ → /ev, ef/","/ev/ ~ /ef/","La consonante siguiente determina sonoridad en moderno: εὐαγγέλιον /evaŋˈɡelio/ en una lectura modernizada."],
    ["ηυ","eta + ípsilon","/ɛːu̯/","/eu̯/ → /ev, ef/ (tardío)","/iv/ ~ /if/ (formas raras)","Secuencia infrecuente; las realizaciones exactas de la koiné dependen de la etapa reconstruida."],
    ["ᾳ","alfa con iota","/aːi̯/ → /aː/","/a/","/a/","La iota suscrita es una convención gráfica tardía; en ático clásico era originalmente pronunciada."],
    ["ῃ","eta con iota","/ɛːi̯/ → /ɛː/","/e/ → /i/","/i/","La evolución de la vocal sigue la de η después de perderse la iota."],
    ["ῳ","omega con iota","/ɔːi̯/ → /ɔː/","/o/","/o/","En koiné y moderno la iota ya no se pronuncia en este tipo de grafía."]
  ],
  clusters:[
    ["γγ","doble gama","/ŋɡ/","/ŋɡ/ ~ /ŋɣ/","/ŋɡ/ ~ /ŋɣ/","La primera γ se nasaliza ante la segunda. La realización varía según el registro y el hablante."],
    ["γκ","gama + kapa","/ŋk/","/ŋk/","/ɡ/ inicial; /ŋɡ/ ~ /ɡ/ medial","En griego moderno γκ puede representar una g oclusiva; no traslades esta regla moderna al ático."],
    ["μπ","mu + pi","/mp/","/mp/","/b/ inicial; /mb/ ~ /b/ medial","El moderno usa μπ para escribir una b oclusiva en muchos préstamos y palabras."],
    ["ντ","nu + tau","/nt/","/nt/","/d/ inicial; /nd/ ~ /d/ medial","El moderno usa ντ para representar una d oclusiva en muchos contextos."]
  ],
  signs:[
    ["῾","espíritu áspero","/h/ inicial (y [r̥] con ῥ)","/h/ perdido progresivamente","sin sonido","No es una letra: indica una aspiración histórica que desapareció en la koiné."],
    ["᾿","espíritu suave","sin /h/","sin /h/","sin sonido","Marca ausencia de aspiración; no añade sonido."],
    ["´ / ῀","acento agudo / circunflejo","acento tonal (altura melódica)","transición a acento de intensidad","acento de intensidad","El acento griego antiguo distinguía melodía tonal; el moderno marca principalmente sílaba tónica."]
  ],
  sources:[
    {name:"Oxford Classical Dictionary · Greek pronunciation",url:"https://www.ling-phil.ox.ac.uk/files/amd_ocd_entries_4th_ed._2012.pdf"},
    {name:"University of California Press · Introduction to Attic Greek",url:"https://content.ucpress.edu/chapters/5647001.ch01.pdf"},
    {name:"Briercrest · Reconstructed Koine alphabet (Miller)",url:"https://ntgreeketal.com/wp-content/uploads/2020/04/miller_koine-alphabet-handout.pdf"},
    {name:"Wikimedia Commons · Alfabeto griego moderno, grabación",url:"https://commons.wikimedia.org/wiki/File:Ell-AlphabitosUpload.ogg"}
  ],
  modernAlphabetAudio:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Ell-AlphabitosUpload.ogg"
};