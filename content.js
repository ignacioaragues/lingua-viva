/* Lingua Viva · parcours original inspiré par la progression d'Alter Ego+ 1.
   Ni les textes ni les exercices du manuel ne sont reproduits ici. */
window.LINGUA = {
  audio: "https://alteregoplus.hachettefle.fr/alter-ego-%2B-1_livre-de-l-eleve_fr.html",
  lessons: [
    {
      id:"d0-bonjour", dossier:0, title:"Bonjour !", subtitle:"Saluer et prendre congé", pages:"13–16", duration:15,
      goal:"Entrer dans un lieu, saluer une personne et terminer une conversation poliment.",
      grammarTitle:"Tu ou vous ?",
      grammar:{fr:"En français, on utilise « tu » avec les proches et « vous » dans une situation formelle, avec une personne inconnue ou avec plusieurs personnes. « Bonjour » convient presque partout pendant la journée. « Salut » est familier et peut servir à dire bonjour ou au revoir.",es:"En francés, «tu» se usa con personas cercanas y «vous» en situaciones formales, con desconocidos o para dirigirse a varias personas. «Bonjour» sirve en casi cualquier situación durante el día. «Salut» es informal y sirve tanto para saludar como para despedirse."},
      example:["— Bonjour, madame. Comment allez-vous ?", "— Très bien, merci. Et vous ?", "— Bien, merci. Au revoir !", "— Au revoir, monsieur !"],
      words:[["Bonjour","salutation de la journée"],["Bonsoir","salutation du soir"],["Salut","salutation familière"],["Merci","pour remercier"],["Au revoir","pour prendre congé"]],
      exercises:[
        {id:"d0b1",q:"Vous entrez dans une boulangerie. Que dites-vous ?",opts:["Salut, mon pote !","Bonjour, madame !","Bonne nuit !"],answer:1,why:"« Bonjour » est une salutation polie, adaptée à cette situation."},
        {id:"d0b2",q:"Un ami vous dit « Salut ! ». Quelle réponse est naturelle ?",opts:["Salut !","Je suis belge.","Vous êtes professeur."],answer:0,why:"Entre amis, « salut » est tout à fait naturel."},
        {id:"d0b3",q:"Vous parlez à une personne inconnue. Quel pronom choisissez-vous ?",opts:["Tu","Vous","Ils"],answer:1,why:"« Vous » marque ici la politesse."}
      ],
      writing:"Écrivez un dialogue de 4 à 6 répliques dans un café : salutation, question de politesse et prise de congé.",
      speaking:"Tu es mon professeur de français A1. Faisons un jeu de rôle uniquement en français : je suis client dans une librairie à Lyon, tu es libraire. Pose une question à la fois, parle lentement et corrige-moi gentiment à la fin."
    },
    {
      id:"d0-alphabet", dossier:0, title:"L’alphabet", subtitle:"Épeler et demander de répéter", pages:"17–20", duration:18,
      goal:"Reconnaître les 26 lettres, distinguer leur nom de leur son, épeler votre nom et demander une répétition.",
      grammarTitle:"Lettres, sons et accents",
      grammar:{
        fr:"L’alphabet français comprend 26 lettres. Chaque lettre a un nom (« B » se nomme « bé », /be/), mais sa prononciation dans un mot peut être différente. Par exemple, le nom de « E » est /ø/, alors que dans « été », la première lettre se prononce /e/. Le tableau ci-dessous donne un son fréquent pour chaque lettre, pas toutes ses prononciations.\n\nUne même lettre peut représenter plusieurs sons : « c » se prononce /k/ dans « café » et /s/ dans « cinéma » ; « g » se prononce /g/ dans « gare » et /ʒ/ dans « girafe ». Le « h » n’a normalement pas de son propre en français. Le groupe « ou » se prononce /u/, mais « u » se prononce /y/.\n\nLes accents comptent : « é », « è », « ê », « ë » et « ç » ne sont pas de nouvelles lettres, mais ils peuvent changer la prononciation ou l’orthographe. Pour épeler un mot, nommez les lettres une par une. Pour demander de répéter : « Vous pouvez répéter, s’il vous plaît ? » ou « Comment ça s’écrit ? ».",
        es:"El alfabeto francés tiene 26 letras. Cada una posee un nombre (« B » se llama « bé », /be/), pero ese nombre no coincide necesariamente con su sonido dentro de una palabra. Por ejemplo, « E » se llama /ø/, aunque la primera letra de « été » se pronuncia /e/. En la tabla, el sonido indicado es solamente uno de los posibles.\n\nHay letras con distintas realizaciones: « c » representa /k/ en « café » y /s/ en « cinéma »; « g » representa /g/ en « gare » y /ʒ/ en « girafe ». La « h » normalmente no tiene sonido propio en francés. « Ou » se pronuncia /u/, mientras que « u » se pronuncia /y/ (parecido a una i con los labios redondeados).\n\nLos acentos son importantes: « é », « è », « ê », « ë » y « ç » no son letras adicionales, pero pueden modificar la pronunciación o la ortografía. Para deletrear un nombre, decís los nombres de las letras. Para pedir que repitan: « Vous pouvez répéter, s’il vous plaît ? » o « Comment ça s’écrit ? »."
      },
      alphabet:[
        ["A","a","/a/","avion","/a/"],["B","bé","/be/","bonjour","/b/"],
        ["C","cé","/se/","café","/k/"],["D","dé","/de/","deux","/d/"],
        ["E","euh","/ø/","été","/e/"],["F","èf","/ɛf/","fille","/f/"],
        ["G","gé","/ʒe/","gare","/g/"],["H","ache","/aʃ/","hôtel","muet"],
        ["I","i","/i/","ici","/i/"],["J","ji","/ʒi/","jour","/ʒ/"],
        ["K","ka","/ka/","kilo","/k/"],["L","èl","/ɛl/","livre","/l/"],
        ["M","èm","/ɛm/","merci","/m/"],["N","èn","/ɛn/","nom","/n/"],
        ["O","o","/o/","orange","/ɔ/"],["P","pé","/pe/","Paris","/p/"],
        ["Q","ku","/ky/","qui","/k/"],["R","èr","/ɛʁ/","rue","/ʁ/"],
        ["S","ès","/ɛs/","salut","/s/"],["T","té","/te/","tu","/t/"],
        ["U","u","/y/","une","/y/"],["V","vé","/ve/","vous","/v/"],
        ["W","double vé","/dublə ve/","week-end","/w/"],["X","iks","/iks/","taxi","/ks/"],
        ["Y","i grec","/i gʁɛk/","yoga","/j/"],["Z","zèd","/zɛd/","zéro","/z/"]
      ],
      dictation:["Paris","Lyon","Marie","Salut"],
      reading:{
        title:"Un prénom à l’accueil",
        sentences:[
          {fr:"Bonjour ! Je m’appelle Léa.",es:"¡Hola! Me llamo Léa."},
          {fr:"Je suis à Lyon. Mon nom s’écrit L – É – A.",es:"Estoy en Lyon. Mi nombre se escribe L – É – A."},
          {fr:"À l’accueil, un homme demande : « Comment ça s’écrit ? »",es:"En recepción, un hombre pregunta: «¿Cómo se escribe?»"},
          {fr:"Je réponds : « L, É, A. » Il dit : « Merci ! »",es:"Respondo: «L, É, A». Él dice: «¡Gracias!»"}
        ],
        glossary:{
          "bonjour":["hola / buenos días","saludo de día"],"je":["yo","pronombre sujeto"],"m’appelle":["me llamo","verbo s’appeler; 1.ª persona"],
          "léa":["Léa","nombre propio francés"],"suis":["soy / estoy","verbo être; 1.ª persona"],"à":["en / a","preposición"],
          "lyon":["Lyon","ciudad francesa"],"mon":["mi","posesivo masculino singular"],"nom":["nombre / apellido","sustantivo masculino"],
          "s’écrit":["se escribe","verbo s’écrire; 3.ª persona"],"l":["ele","nombre de la letra L"],"é":["e con acento agudo","nombre de letra con signo diacrítico"],
          "a":["a","nombre de la letra A"],"l’accueil":["la recepción","sustantivo masculino, con artículo elidido"],
          "un":["un","artículo indefinido masculino"],"homme":["hombre","sustantivo masculino; h muda"],
          "demande":["pregunta","verbo demander; 3.ª persona"],"comment":["cómo","adverbio interrogativo"],
          "ça":["eso / esto","pronombre demostrativo familiar"],"réponds":["respondo","verbo répondre; 1.ª persona"],
          "il":["él","pronombre sujeto"],"dit":["dice","verbo dire; 3.ª persona"],"merci":["gracias","expresión de agradecimiento"]
        }
      },
      example:["— Comment vous appelez-vous ?", "— Je m’appelle Martin.", "— Vous pouvez épeler, s’il vous plaît ?", "— M – A – R – T – I – N."],
      words:[["Épeler","dire les lettres d’un mot"],["Répéter","dire encore une fois"],["Comment ça s’écrit ?","pour demander l’orthographe"],["S’il vous plaît","formule de politesse"],["Je m’appelle","pour dire son nom"],["Une lettre","un signe de l’alphabet"],["Un accent","signe comme é, è ou ê"],["Un prénom","le nom personnel d’une personne"],["Un nom de famille","le nom partagé par une famille"]],
      exercises:[
        {id:"d0a1",q:"Vous ne comprenez pas un nom. Que demandez-vous ?",opts:["Vous pouvez épeler ?","Vous habitez où ?","Vous êtes français ?"],answer:0,why:"« Épeler » signifie dire les lettres d’un mot."},
        {id:"d0a2",q:"Dans le mot « vous », comment se prononce « ou » ?",opts:["/y/","/u/","/ɛ̃/"],answer:1,why:"Le groupe de lettres « ou » correspond ici au son /u/."},
        {id:"d0a3",q:"Quelle phrase est polie ?",opts:["Répète !","Vous pouvez répéter, s’il vous plaît ?","Vous parler !"],answer:1,why:"La deuxième phrase emploie « vous » et « s’il vous plaît »."},
        {id:"d0a4",q:"Quel est le nom de la lettre « H » ?",opts:["ache","hôtel","hé"],answer:0,why:"Le nom de H est « ache » /aʃ/. Dans « hôtel », cette lettre ne représente pas de son."},
        {id:"d0a5",q:"Dans « café » et « cinéma », la lettre C a…",opts:["toujours le son /k/","deux sons différents","toujours le son /s/"],answer:1,why:"« café » commence par /k/ ; « cinéma » commence par /s/."},
        {id:"d0a6",q:"Quelle différence entre « u » et « ou » ?",opts:["Aucune","« u » = /y/ ; « ou » = /u/","« u » = /u/ ; « ou » = /y/"],answer:1,why:"La voyelle /y/ s’articule avec les lèvres arrondies ; /u/ correspond au son de « vous »."}
      ],
      writing:"Écrivez un dialogue très court : vous demandez un nom, vous demandez de l’épeler, puis vous remerciez.",
      speaking:"Nous sommes à l’accueil d’un hôtel en France. Demande-moi mon nom, puis épelle le tien. Fais-moi répéter des lettres. Parle lentement en français A1 et corrige mes erreurs à la fin."
    },
    {
      id:"d0-nombres", dossier:0, title:"Les nombres", subtitle:"Compter de zéro à vingt", pages:"21–24", duration:17,
      goal:"Comprendre et dire des nombres de 0 à 20 et un numéro de téléphone fictif.",
      grammarTitle:"Les nombres de 11 à 20",
      grammar:{fr:"On dit « onze », « douze », « treize », « quatorze », « quinze », « seize », puis « dix-sept », « dix-huit », « dix-neuf » et « vingt ». Les nombres ne suivent donc pas tous le même modèle. Pour un numéro de téléphone, parlez lentement et vérifiez les chiffres entendus.",es:"Del 11 al 16 las formas son particulares: «onze», «douze», «treize», «quatorze», «quinze», «seize». Después siguen «dix-sept», «dix-huit», «dix-neuf» y «vingt». Para los teléfonos, conviene escuchar y repetir las cifras en grupos."},
      example:["— C’est quoi, votre numéro ?", "— Zéro six, douze, quinze…", "— Pardon ? Vous pouvez répéter ?", "— Bien sûr : zéro six, douze, quinze…"],
      words:[["Zéro","0"],["Cinq","5"],["Dix","10"],["Douze","12"],["Seize","16"],["Vingt","20"]],
      exercises:[
        {id:"d0n1",q:"Quel nombre correspond à « douze » ?",opts:["2","12","20"],answer:1,why:"« Douze » est le nombre 12."},
        {id:"d0n2",q:"Comment écrit-on le nombre 16 ?",opts:["Seize","Sixante","Dix-six"],answer:0,why:"Le nombre 16 se dit « seize »."},
        {id:"d0n3",q:"Quel nombre est « dix-neuf » ?",opts:["9","19","29"],answer:1,why:"« Dix-neuf » correspond à 19."},
        {id:"d0n4",q:"Nina dit : « J’ai seize ans. » Quel âge a-t-elle ?",opts:["6 ans","16 ans","18 ans"],answer:1,why:"« Seize » signifie 16 ; pour exprimer l’âge, le français utilise avoir : « j’ai seize ans »."},
        {id:"d0n5",q:"Dans « Hugo a dix-huit ans », que signifie « a » ?",opts:["La lettre A","Le verbe avoir, 3e personne du singulier","La préposition à"],answer:1,why:"Sans accent, « a » est ici le présent du verbe avoir (il a). « À » avec accent est une préposition."},
        {id:"d0n6",q:"Quel groupe correspond à « zéro six, douze, quinze » ?",opts:["06 12 15","60 12 50","06 20 15"],answer:0,why:"Zéro six = 06, douze = 12, quinze = 15. Il s’agit d’un numéro fictif incomplet, pas d’un numéro à appeler."}
      ],
      reading:{
        title:"Un numéro pour la bibliothèque",
        sentences:[
          {fr:"Bonjour, je suis Nina. J’ai seize ans.",es:"Hola, soy Nina. Tengo dieciséis años."},
          {fr:"Je suis à la bibliothèque avec mon ami Hugo.",es:"Estoy en la biblioteca con mi amigo Hugo."},
          {fr:"Hugo a dix-huit ans. Il demande mon numéro.",es:"Hugo tiene dieciocho años. Me pide mi número."},
          {fr:"Je réponds : « Zéro six, douze, quinze. » Il répète lentement.",es:"Respondo: «Cero seis, doce, quince». Él repite lentamente."}
        ],
        glossary:{
          "bonjour":["hola","saludo"],"je":["yo","pronombre sujeto"],"suis":["soy / estoy","être, presente"],"nina":["Nina","nombre propio"],"j’ai":["tengo","avoir, presente"],"seize":["dieciséis","numeral"],"ans":["años","sustantivo plural"],"à":["en","preposición"],"la":["la","artículo definido"],"bibliothèque":["biblioteca","sustantivo femenino"],"avec":["con","preposición"],"mon":["mi","posesivo"],"ami":["amigo","sustantivo masculino"],"hugo":["Hugo","nombre propio"],"a:avoir":["tiene","avoir, presente"],"dix-huit":["dieciocho","numeral"],"il":["él","pronombre sujeto"],"demande":["pide","demander, presente"],"numéro":["número","sustantivo masculino"],"réponds":["respondo","répondre, presente"],"zéro":["cero","numeral"],"six":["seis","numeral"],"douze":["doce","numeral"],"quinze":["quince","numeral"],"répète":["repite","répéter, presente"],"lentement":["lentamente","adverbio"]
        }
      },
      writing:"Inventez une fiche avec un prénom, un âge, une ville et un numéro de téléphone fictif écrit en toutes lettres.",
      speaking:"Tu travailles dans une médiathèque. Demande-moi mes coordonnées en français A1. Je donne un numéro fictif lentement ; vérifie chaque groupe de chiffres. Corrige-moi à la fin."
    },
    {
      id:"d1-contacts", dossier:1, title:"Contacts", subtitle:"Se présenter", pages:"26–29", duration:22,
      goal:"Dire votre nom, votre nationalité, votre ville et votre profession.",
      grammarTitle:"Être, s’appeler, habiter",
      grammar:{fr:"Pour se présenter : « Je m’appelle… », « Je suis argentin », « J’habite à Hong Kong ». Le sujet est normalement obligatoire : « je suis », « tu es », « il/elle est », « vous êtes ». Après « être », une profession apparaît souvent sans article : « Je suis professeur ».",es:"Para presentarte usás verbos distintos: «je m’appelle» (me llamo), «je suis» (soy) y «j’habite à» (vivo en). Normalmente el pronombre sujeto es obligatorio: «je suis», «tu es», «il/elle est», «vous êtes». Con profesiones suele omitirse el artículo: «Je suis professeur»."},
      example:["— Bonjour, comment vous appelez-vous ?", "— Je m’appelle Camille. Et vous ?", "— Moi, c’est Alex. Vous êtes française ?", "— Oui, et je suis architecte."],
      words:[["Je suis","pour présenter une identité"],["J’habite à","pour dire sa ville"],["Je travaille","pour parler de son activité"],["Nationalité","pays d’appartenance"],["Enchanté(e)","quand on rencontre quelqu’un"]],
      exercises:[
        {id:"d1c1",q:"Quelle phrase est correcte ?",opts:["Je suis appelle Hugo.","Je m’appelle Hugo.","Moi appeler Hugo."],answer:1,why:"Le verbe pronominal est « s’appeler » : je m’appelle."},
        {id:"d1c2",q:"Complétez : « Vous ___ professeur ? »",opts:["es","êtes","suis"],answer:1,why:"Avec « vous », on dit « vous êtes »."},
        {id:"d1c3",q:"Quelle question appelle « Je suis argentin » ?",opts:["Vous êtes de quelle nationalité ?","Quel est votre prénom ?","Comment ça va ?"],answer:0,why:"La réponse donne une nationalité."}
      ],
      writing:"Présentez-vous en 50 à 70 mots : nom, origine, ville actuelle, profession et raison d’apprendre le français.",
      speaking:"Nous sommes à une conférence à Paris. Présente-toi en français A1 et pose-moi des questions simples sur mon identité. Une question à la fois ; corrige-moi à la fin."
    },
    {
      id:"d1-mediatheque", dossier:1, title:"M comme médiathèque", subtitle:"Remplir une fiche", pages:"30–33", duration:22,
      goal:"Comprendre les informations demandées dans un formulaire simple.",
      grammarTitle:"Nom, prénom et questions",
      grammar:{fr:"Sur un formulaire français, le « nom » est le nom de famille ; le « prénom » est le nom personnel. On demande « Quel est votre nom ? » et « Quelle est votre adresse ? ». L’adjectif interrogatif change selon le genre du nom : « quel » (masculin), « quelle » (féminin).",es:"Ojo con los falsos amigos: en un formulario francés «nom» es apellido y «prénom» es nombre de pila. Las preguntas usan «quel» con sustantivos masculinos («Quel est votre nom ?») y «quelle» con femeninos («Quelle est votre adresse ?»)."},
      example:["— Votre nom, s’il vous plaît ?", "— Martin. Et mon prénom, c’est Léa.", "— Quelle est votre adresse électronique ?", "— lea.martin@example.com"],
      words:[["Nom","nom de famille"],["Prénom","nom personnel"],["Adresse","lieu de résidence"],["Courriel","message électronique"],["Formulaire","fiche à remplir"]],
      exercises:[
        {id:"d1m1",q:"Dans la case « Prénom », vous écrivez…",opts:["Votre nom de famille","Votre prénom","Votre profession"],answer:1,why:"Le prénom est le nom donné à la naissance, par exemple Léa."},
        {id:"d1m2",q:"Quelle question est correcte ?",opts:["Quel est votre nom ?","Quelle âge avez-vous ?","Où vous être ?"],answer:0,why:"« Nom » est masculin : quel est votre nom ?"},
        {id:"d1m3",q:"« Adresse électronique » signifie…",opts:["Adresse postale","Adresse e-mail","Numéro de téléphone"],answer:1,why:"C’est votre adresse e-mail."}
      ],
      writing:"Écrivez un courriel de 50 à 70 mots à une médiathèque pour demander des informations sur l’inscription. Donnez vos coordonnées fictives.",
      speaking:"Tu es bibliothécaire dans une médiathèque française. Je veux m’inscrire. Pose-moi des questions sur mon nom, mon adresse et mes goûts. Français A1, lentement, avec corrections à la fin."
    },
    {
      id:"d1-tv5", dossier:1, title:"En direct de TV5", subtitle:"Présenter une autre personne", pages:"34–37", duration:24,
      goal:"Présenter une autre personne et comprendre une courte présentation orale.",
      grammarTitle:"De je à il / elle",
      grammar:{fr:"Pour parler d’une autre personne, changez le sujet et le verbe : « Je suis journaliste » devient « Elle est journaliste ». « J’habite à Lyon » devient « Il habite à Lyon ». « C’est… » sert à identifier : « C’est Sarah ». « Qui est-ce ? » demande l’identité.",es:"Al pasar de hablar de vos a hablar de otra persona, cambia el sujeto y la forma verbal: «je suis» → «il/elle est»; «j’habite» → «il/elle habite». «C’est Sarah» presenta o identifica; «Qui est-ce ?» pregunta quién es."},
      example:["— Qui est-ce ?", "— C’est Sarah. Elle est journaliste.", "— Elle habite où ?", "— Elle habite à Montréal."],
      words:[["Qui est-ce ?","question d’identité"],["C’est","pour identifier"],["Elle est","pour parler d’une femme"],["Il habite","pour indiquer sa ville"],["Émission","programme à la télévision ou à la radio"]],
      exercises:[
        {id:"d1t1",q:"Complétez : « Elle ___ journaliste. »",opts:["suis","es","est"],answer:2,why:"« Elle » s’emploie avec « est »."},
        {id:"d1t2",q:"Comment demande-t-on l’identité d’une personne ?",opts:["Qui est-ce ?","Qu’est-ce que ?","Pourquoi il ?"],answer:0,why:"« Qui est-ce ? » concerne une personne."},
        {id:"d1t3",q:"« Ils habitent à Lyon » signifie…",opts:["Leur ville est Lyon.","Ils travaillent à Lyon.","Ils visitent Lyon."],answer:0,why:"Le verbe « habiter » indique le lieu de résidence."}
      ],
      writing:"Inventez la présentation d’une personne pour une émission de radio (50 à 70 mots) : nom, profession, nationalité et ville.",
      speaking:"Tu animes une émission francophone. Interviewe-moi en français A1, puis demande-moi de présenter un ami imaginaire. Pose des questions courtes et corrige-moi à la fin."
    },
    {
      id:"d1-culture", dossier:1, title:"Regards francophones", subtitle:"Découvrir la francophonie", pages:"38–39", duration:16,
      goal:"Identifier plusieurs espaces francophones et situer des villes.",
      grammarTitle:"À, en ou au ?",
      grammar:{fr:"On emploie « à » devant les villes : « à Paris », « à Montréal ». Devant les pays, on emploie souvent « en » avec les noms féminins (« en France », « en Belgique ») et « au » avec les noms masculins (« au Canada »). Il existe des exceptions à découvrir plus tard.",es:"Con ciudades, «à»: «à Paris», «à Montréal». Con países femeninos suele usarse «en» («en France», «en Belgique») y con masculinos «au» («au Canada»). Hay excepciones que veremos más adelante."},
      example:["— Tu habites où ?", "— À Bruxelles, en Belgique.", "— Et ta sœur ?", "— Elle habite au Canada."],
      words:[["La Belgique","pays d’Europe"],["Le Québec","région francophone du Canada"],["La Suisse","pays d’Europe"],["Le Sénégal","pays d’Afrique"],["La francophonie","ensemble de communautés francophones"]],
      exercises:[
        {id:"d1cu1",q:"Complétez : « J’habite ___ Canada. »",opts:["en","au","à"],answer:1,why:"Le Canada est masculin : au Canada."},
        {id:"d1cu2",q:"Dans quel pays parle-t-on aussi français ?",opts:["La Belgique","La Suède","La Corée du Sud"],answer:0,why:"Le français est l’une des langues officielles de la Belgique."},
        {id:"d1cu3",q:"Quelle préposition accompagne une ville ?",opts:["en Paris","au Paris","à Paris"],answer:2,why:"Devant le nom d’une ville, on emploie « à »."}
      ],
      writing:"Choisissez trois villes francophones et écrivez 50 mots pour expliquer pourquoi vous aimeriez les visiter.",
      speaking:"Parlons des voyages et de la francophonie en français A1. Demande-moi quelles villes j’aime et aide-moi à parler de trois pays. Corrige mes prépositions à la fin."
    },
    {
      id:"d1-bilan", dossier:1, title:"Bilan et révision", subtitle:"Mettre les acquis en pratique", pages:"40–42", duration:24,
      goal:"Participer à une conversation A1 de deux minutes : saluer, se présenter et poser des questions.",
      grammarTitle:"L’essentiel de votre premier parcours",
      grammar:{fr:"Vous savez dire « Je m’appelle… », « Je suis… », « J’habite… » et poser des questions simples : « Comment vous appelez-vous ? », « Où habitez-vous ? », « Vous êtes de quelle nationalité ? ». Pour progresser, réutilisez ces phrases sans consulter vos notes.",es:"Ya podés presentarte con «je m’appelle», «je suis» y «j’habite», y formular preguntas sencillas como «Comment vous appelez-vous ?», «Où habitez-vous ?», «Vous êtes de quelle nationalité ?». El siguiente paso es producir estas estructuras sin mirar los apuntes."},
      example:["— Bonjour, je m’appelle André. Et vous ?", "— Moi, c’est Lucie. Je suis belge.", "— Vous habitez à Bruxelles ?", "— Non, j’habite à Genève."],
      words:[["Je m’appelle","pour dire son nom"],["Vous êtes","forme de politesse"],["Vous habitez","pour parler de résidence"],["Quel / quelle","pour demander une information"],["Où ?","pour demander un lieu"]],
      exercises:[
        {id:"d1bi1",q:"Complétez : « Je ___ argentin et j’___ à Hong Kong. »",opts:["suis / habite","es / habites","est / habitons"],answer:0,why:"Avec « je », on dit « je suis » et « j’habite »."},
        {id:"d1bi2",q:"Complétez : « ___ prénom est Émile. »",opts:["Mon","Ma","Mes"],answer:0,why:"« Prénom » est masculin : « mon prénom »."},
        {id:"d1bi3",q:"Quelle question est naturelle ?",opts:["Vous habitez où ?","Vous êtes comment nom ?","Tu est français ?"],answer:0,why:"« Vous habitez où ? » est une question orale courante."}
      ],
      writing:"Écrivez un courriel de 80 mots à un collègue francophone : présentez-vous, parlez de votre métier et de votre ville, puis posez deux questions.",
      speaking:"Organise une conversation complète de deux minutes au niveau A1, entièrement en français. Je dois saluer, me présenter, poser des questions et prendre congé. Ne corrige pas pendant l’échange ; fais un bilan ensuite."
    }
  ],
  resources:[
    {id:"hachette",lesson:"all",type:"Audio",title:"Alter Ego+ 1 · pistes officielles",desc:"Écoutez les enregistrements associés aux activités du livre sur le site de l’éditeur.",url:"https://alteregoplus.hachettefle.fr/alter-ego-%2B-1_livre-de-l-eleve_fr.html"},
    {id:"tv5",lesson:"all",type:"Exercices",title:"TV5MONDE · Apprendre A1",desc:"Vidéos authentiques et exercices de compréhension pour débutants.",url:"https://apprendre.tv5monde.com/fr/exercices/a1-debutant"},
    {id:"tv5alphabet",lesson:"d0-alphabet",type:"Prononciation · audios natifs",title:"TV5MONDE · Les 26 lettres de l’alphabet",desc:"Écoutez chaque lettre et un prénom exemple, avec des enregistrements natifs. Complément aux voix de synthèse de cette page.",url:"https://apprendre.tv5monde.com/fr/aides/prononciation-les-lettres-de-lalphabet"},
    {id:"tv5enchaînement",lesson:"d0-alphabet",type:"Prononciation · liaison",title:"TV5MONDE · Enchaînement vocalique",desc:"Escuchá los enlaces entre vocales y repetí las frases antes de responder los ejercicios A1.",url:"https://apprendre.tv5monde.com/fr/exercices/a1-debutant/prononciation-lenchainement-vocalique"},
    {id:"tv5alphabetpractice",lesson:"d0-alphabet",type:"Exercices d’écoute",title:"TV5MONDE · Prononciation : alphabet",desc:"Quatre exercices A1 d’écoute et de prononciation.",url:"https://apprendre.tv5monde.com/fr/exercices/a1-debutant/prononciation-les-lettres-de-lalphabet"},
    {id:"alexa",lesson:"d0-bonjour",type:"Vidéo",title:"Learn French with Alexa · débutants",desc:"Premiers mots, salutations et prononciation.",url:"https://www.youtube.com/watch?v=RxCR3g6aYJ0"},
    {id:"songbonjour",lesson:"d0-bonjour",type:"Chanson",title:"Alain Le Lait · Bonjour Bonjour",desc:"Repérez les salutations et la question « Comment ça va ? ».",url:"https://www.youtube.com/watch?v=atNkI6QFZ50"},
    {id:"pierre",lesson:"d1-contacts",type:"Écoute",title:"Français avec Pierre · informations personnelles",desc:"Un exemple de présentation et de questions simples.",url:"https://www.francaisavecpierre.com/podcast-en-francais-informations-personnelles-niv-a1a2/"},
    {id:"tv5info",lesson:"d1-tv5",type:"Vidéo",title:"TV5MONDE · Nous nous informons en français",desc:"Écoute et compréhension guidée autour de la télévision.",url:"https://apprendre.tv5monde.com/fr/exercices/a1-debutant/nous-nous-informons-en-francais"},
    {id:"zaz",lesson:"d1-culture",type:"Chanson",title:"ZAZ · Je veux",desc:"Écoute libre : repérez « je veux » ; la chanson est plus difficile que le niveau A1.",url:"https://www.youtube.com/watch?v=0TFNGRYMz1U"}
  ]
};
