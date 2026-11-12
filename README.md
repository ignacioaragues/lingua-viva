# Lingua Viva

Centro personal de aprendizaje de idiomas, publicado en GitHub Pages. La portada es multilingüe; cada curso tiene su propio espacio.

## Arquitectura

- Sitio estático HTML, CSS y JavaScript, sin proceso de compilación.
- Cuenta opcional compartida con Edición Viva mediante Supabase Auth; datos de estudio en tablas `lingua_*` con RLS.
- La página principal siempre es `index.html`; no eliminarla al actualizar cursos.
- Francés A1 usa *Alter Ego+ 1* como referencia de progreso, con material didáctico original y enlaces al audio del editor.
- Griego bíblico sigue **Jeremy Duff, Curso de griego bíblico (CLIE, 2019)**, desde el capítulo 1. `griego-biblico/` ofrece lector privado, navegación de las 522 páginas del PDF, cuaderno por página, ejercicios del capítulo 1, teclado griego, guía de pronunciación para hispanohablantes y preguntas al tutor.
- **Lecturas anotadas:** `griego-biblico/greek-reading.js` contiene Juan 1:1–2 (24 tokens, 12 formas) con fichas de lema, morfología y glosa, traducción española propia opcional y enlace a STEP Bible. Se muestra en las páginas físicas PDF 46–48. No está anotado todavía Juan 1:3–23.
- **Pronunciación griega:** 24 ejemplos de letras, contrastes útiles para español rioplatense, enlaces a Koine Foundations; la síntesis `el-GR`, cuando existe, se rotula explícitamente como **griego moderno**, no como lectura histórica de Duff.
- **Francés:** `francais/morphology.js` anota las 23 formas distintas de la primera lectura «Un prénom à l’accueil» con lema y rasgos contextuales, enlaces de conjugación y pronunciación por voz del navegador; la lección del alfabeto incluye laboratorio de contrastes y práctica TV5MONDE.
- **Privacidad:** el PDF NO se aloja en este repositorio público ni en GitHub Pages. La cuenta autorizada lo sube una vez desde el lector a un bucket privado `lingua-duff-private` de Supabase Storage (RLS). Los apuntes se guardan en `lingua_notes` con `lesson_id='duff:p:<n>'`; los capítulos completados, en `lingua_lesson_progress` con `lesson_id='duff-ch<n>'`. El progreso editorial se documenta en `editorial/duff-progress.json`. El lector requiere la cuenta autorizada; el código estático de la interfaz sigue siendo público.

## Publicar

En GitHub, configurar **Settings → Pages → Deploy from a branch → main → / (root)** si GitHub Pages todavía no está activado. Agregar `https://ignacioaragues.github.io/lingua-viva/` y `https://ignacioaragues.github.io/lingua-viva/francais/` a **Supabase Auth → URL Configuration → Redirect URLs** para confirmar cuentas por correo.
