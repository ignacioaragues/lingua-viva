/* Alter Ego+ 1 — Dossier 1, «Vers le DELF A1», p. imprimée 42 (PDF p. 43).
 * Activités reformulées como acompañamiento del manual, sin copia del scan.
 * Compréhension de l'oral: piste 54, cinco preguntas, 10 puntos.
 * Production écrite: formulario del concurso de diccionarios, 10 puntos.
 * No hay corrección automática ni se envían datos personales.
 */
window.AE_DELF_D1_GROUPS=[
  {
    "id": "d1-delf-oral",
    "label": "Dossier 1 · Vers le DELF A1 · Compréhension de l’oral",
    "description": "Épreuve d'écoute · 5 questions · 10 points · piste 54 · p. 42",
    "items": [
      [
        42,
        "oral-1",
        "Écoute · objet des cours",
        "fields",
        "Leé la primera pregunta de la página 42. Escuchá dos veces la pista 54 y elegí qué idioma quiere estudiar Maria.",
        [
          {
            "label": "Langue choisie",
            "type": "select",
            "options": [
              "le français",
              "l’anglais",
              "le portugais"
            ]
          }
        ],
        "54"
      ],
      [
        42,
        "oral-2",
        "Écoute · profession",
        "fields",
        "Respondé a la pregunta 2 a partir del audio 54. Anotá la profesión de Maria en francés, sin consultar una transcripción que no figure en el manual.",
        [
          {
            "label": "Profession de Maria",
            "type": "text"
          }
        ],
        "54"
      ],
      [
        42,
        "oral-3",
        "Écoute · jour disponible",
        "fields",
        "Respondé a la pregunta 3. Elegí el día en que Maria tiene disponibilidad, según el audio.",
        [
          {
            "label": "Jour disponible",
            "type": "select",
            "options": [
              "lundi",
              "mardi",
              "mercredi",
              "jeudi",
              "vendredi",
              "samedi",
              "dimanche"
            ]
          }
        ],
        "54"
      ],
      [
        42,
        "oral-4",
        "Écoute · moment de la journée",
        "fields",
        "Escuchá para identificar en qué momento del día está disponible Maria; seleccioná una de las tres opciones del ejercicio 4.",
        [
          {
            "label": "Moment de la journée",
            "type": "select",
            "options": [
              "le matin",
              "l’après-midi",
              "le soir"
            ]
          }
        ],
        "54"
      ],
      [
        42,
        "oral-5",
        "Écoute · numéro de téléphone",
        "fields",
        "Registrá el número de teléfono indicado en el audio para responder a la pregunta 5. Podés separar las cifras por pares, como se hace habitualmente en francés.",
        [
          {
            "label": "Numéro de téléphone",
            "type": "text"
          },
          {
            "label": "Anotación fonética o cifras que te costó distinguir",
            "type": "multiline"
          }
        ],
        "54"
      ]
    ]
  },
  {
    "id": "d1-delf-ecrit",
    "label": "Dossier 1 · Vers le DELF A1 · Production écrite",
    "description": "Formulario de inscripción · 10 points · p. 42",
    "items": [
      [
        42,
        "ecrit-1",
        "Production écrite · formulaire de concours",
        "fields",
        "Completá los campos del formulario del concurso de diccionarios de la página 42. Podés usar datos ficticios: el propósito es practicar la inscripción en francés. Las respuestas quedan guardadas solamente en este navegador, sin enviarse al concurso.",
        [
          {
            "label": "Nom",
            "type": "text"
          },
          {
            "label": "Prénom",
            "type": "text"
          },
          {
            "label": "Date de naissance",
            "type": "text"
          },
          {
            "label": "Nationalité",
            "type": "text"
          },
          {
            "label": "Adresse",
            "type": "multiline"
          },
          {
            "label": "Pays",
            "type": "text"
          },
          {
            "label": "Numéro de téléphone",
            "type": "text"
          },
          {
            "label": "Mail",
            "type": "text"
          },
          {
            "label": "École / Université",
            "type": "text"
          }
        ]
      ]
    ]
  }
];
