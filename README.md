# Lingua Viva

Centro personal de aprendizaje de idiomas, publicado en GitHub Pages. La portada es multilingüe; cada curso tiene su propio espacio.

## Arquitectura

- Sitio estático HTML, CSS y JavaScript, sin proceso de compilación.
- Cuenta opcional compartida con Edición Viva mediante Supabase Auth; datos de estudio en tablas `lingua_*` con RLS.
- La página principal siempre es `index.html`; no eliminarla al actualizar cursos.
- Francés A1 usa *Alter Ego+ 1* como referencia de progreso, con material didáctico original y enlaces al audio del editor.

## Publicar

En GitHub, configurar **Settings → Pages → Deploy from a branch → main → / (root)** si GitHub Pages todavía no está activado. Agregar `https://ignacioaragues.github.io/lingua-viva/` y `https://ignacioaragues.github.io/lingua-viva/francais/` a **Supabase Auth → URL Configuration → Redirect URLs** para confirmar cuentas por correo.
