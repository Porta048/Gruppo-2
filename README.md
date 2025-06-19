# Progetto Esame - Gruppo 2

Questo progetto è un'applicazione web per un quiz a tempo. L'utente può scegliere la difficoltà delle domande, rispondere a una serie di quesiti e ottenere un punteggio finale con un feedback basato sulle risposte fornite.

## Struttura del Progetto

Il progetto è suddiviso nelle seguenti cartelle:

- **assets**: Contiene tutte le risorse statiche come fogli di stile, immagini e file audio.
- **html**: Contiene i file HTML che compongono le diverse pagine dell'applicazione.
- **script**: Contiene i file JavaScript che gestiscono la logica dell'applicazione.

## Dettaglio dei File

### HTML

- `welcome.html`: La pagina di benvenuto, punto di ingresso dell'applicazione.
- `difficulty.html`: La pagina dove l'utente può selezionare il livello di difficoltà del quiz.
- `benchmark.html`: La pagina principale del quiz, dove vengono visualizzate le domande.
- `results.html`: La pagina che mostra i risultati del quiz.
- `feedback.html`: La pagina di feedback finale.

### CSS (in `assets/css`)

- `reset.css`: Resetta gli stili di default del browser.
- `style-welcome.css`: Stili per la pagina di benvenuto.
- `difficulty.css`: Stili per la pagina di selezione della difficoltà.
- `style.css`: Stili per la pagina del quiz (`benchmark.html`).
- `result-style.css`: Stili per la pagina dei risultati.
- `feedback-style.css`: Stili per la pagina di feedback.

### JavaScript (in `script`)

- `creazioneDomanda.js`: Gestisce la creazione e la visualizzazione delle domande del quiz.
- `domandedifficili.js`: Contiene l'array di oggetti con le domande di difficoltà difficile.
- `medium.js`: Contiene l'array di oggetti con le domande di difficoltà media.
- `scorrimentoDomande.js`: Gestisce la logica per passare da una domanda all'altra.
- `timer.js`: Implementa il timer per il quiz.
- `calcoloRisultati.js`: Calcola il punteggio finale e gestisce la logica della pagina dei risultati.

### Assets

- **assets/audio**: Contiene i file audio utilizzati nell'applicazione.
- **assets/image**: Contiene le immagini e le icone.

## Come Avviare il Progetto

Per avviare il progetto è sufficiente aprire il file `html/welcome.html` in un qualsiasi browser web. Da lì, si può navigare attraverso l'intera applicazione.

## Librerie Utilizzate

Questo progetto utilizza le seguenti librerie esterne:

- **Google Fonts**: Per l'inclusione di caratteri personalizzati ("Montserrat", "Inter", "Poppins", "Outfit"). Viene utilizzata nei file `benchmark.html` e `results.html`.
- **Chart.js**: Per la creazione di grafici. Viene utilizzata in `benchmark.html` per il timer circolare e in `results.html` per il grafico a ciambella dei risultati.
- **Canvas Confetti**: Per l'effetto coriandoli nella pagina dei risultati (`results.html`).

## Funzionalità Speciali

### Effetto "Indovina il Pokémon" (Modalità Difficile)

Quando l'utente seleziona la modalità di gioco "Difficile", il quiz si trasforma in un "Indovina il Pokémon" con le seguenti caratteristiche:

- **Audio Tematico**: Ad ogni nuova domanda, viene riprodotto il celebre jingle "Who's That Pokémon?". La riproduzione parte solo dopo la prima interazione dell'utente (il primo click su una risposta) per rispettare le policy dei browser sull'audio.
- **Silhouette del Pokémon**: Al posto del testo della domanda, viene mostrata l'immagine di un Pokémon con un effetto silhouette. Lo scopo del giocatore è indovinare il nome del Pokémon corretto tra le opzioni proposte.
- **Domande a Tema**: Tutte le domande e le risposte in questa modalità sono focalizzate sul mondo dei Pokémon.

## Architettura del Codice

### Stili (CSS)

Il file principale che definisce l'aspetto del quiz è `assets/css/style.css`. La sua struttura si basa su:

- **Layout Generale**: Un'immagine di sfondo (`bg.jpg`) viene impostata per coprire l'intera pagina. Il contenuto principale è centrato sia orizzontalmente che verticalmente utilizzando una combinazione di `display: table` e `vertical-align: middle`.
- **Header**: L'header è posizionato in modo fisso nella parte superiore e contiene il logo a sinistra e il timer a destra.
- **Timer Circolare**: Realizzato tramite la libreria Chart.js, il suo aspetto è personalizzato per mostrare un anello che si "svuota" e un testo centrato con il conto alla rovescia.
- **Area Quiz**: Domande, opzioni di risposta e contatore sono centrati nella pagina. Le opzioni di risposta sono disposte su una griglia a due colonne.
- **Effetto Pokémon**: Per la modalità difficile, l'immagine del Pokémon viene resa come una silhouette nera tramite la proprietà `filter: brightness(0)`. L'immagine originale viene rivelata al passaggio del mouse.
- **Interattività**: Gli stili per gli stati `:hover` (passaggio del mouse) e `.selected` (risposta selezionata) forniscono un feedback visivo immediato all'utente.

### Algoritmi Principali (JavaScript)

La logica del quiz è suddivisa in diversi file, ognuno con uno scopo specifico. Gli algoritmi chiave sono:

- **Caricamento Dinamico delle Domande**: Al momento dell'avvio del quiz, uno script in `benchmark.html` legge la difficoltà scelta dall'utente (salvata nel `localStorage`) e carica dinamicamente il file JavaScript corrispondente (`domandedifficili.js`, `medium.js` o `creazioneDomanda.js`). Questo permette di separare i set di domande senza caricare dati inutili.
- **Mescolamento delle Risposte (`mischiaArray`)**: Per evitare che la risposta corretta appaia sempre nella stessa posizione, viene utilizzato l'algoritmo di Fisher-Yates per mescolare l'array delle risposte (corretta e sbagliate) prima di visualizzarle.
- **Gestione dello Stato del Quiz**: Vengono utilizzate variabili globali come `currentQuestionIndex` e `score` per tenere traccia della domanda corrente e del punteggio. La funzione `procediAllaProssimaDomanda` in `scorrimentoDomande.js` gestisce l'avanzamento, aggiornando l'indice e chiamando la funzione per creare la domanda successiva.
- **Controllo del Tempo (`timer.js`)**: Un `setInterval` scandisce il conto alla rovescia. Ad ogni secondo, la funzione `updateTimer` aggiorna sia il testo del timer sia il grafico Chart.js. Se il tempo scade, il timer viene fermato e si passa automaticamente alla domanda successiva. La funzione `startTimer` resetta e riavvia il processo per ogni nuova domanda.
- **Calcolo e Visualizzazione dei Risultati (`calcoloRisultati.js`)**: Dopo il quiz, i dati finali (punteggio e numero di domande) vengono letti dal `localStorage`. Questi dati vengono usati per calcolare le percentuali di risposte corrette e sbagliate, che sono poi visualizzate in un grafico a ciambella (Chart.js) e come testo.

### Struttura delle Pagine (HTML)

Le pagine HTML definiscono la struttura e il flusso di navigazione dell'applicazione.

- **`welcome.html`**: È la pagina di ingresso. Presenta le istruzioni del quiz e contiene una checkbox che l'utente deve spuntare per accettare le condizioni. Il pulsante "Proceed" si attiva solo dopo l'accettazione e reindirizza alla pagina di selezione della difficoltà.

- **`difficulty.html`**: In questa pagina, l'utente sceglie il livello di difficoltà del quiz (Facile, Media, Difficile). La scelta viene salvata nel `localStorage` del browser, in modo che la pagina successiva possa sapere quali domande caricare. Un pulsante "AVANTI" appare dopo la selezione per proseguire.

- **`benchmark.html`**: È il cuore dell'applicazione, la pagina dove si svolge il quiz. La sua struttura è composta da:
    - Un header con il logo e l'area dedicata al timer.
    - Contenitori vuoti (`div`) che vengono popolati dinamicamente tramite JavaScript con il testo della domanda, le opzioni di risposta, e l'immagine del Pokémon (in modalità difficile).
    - Un pulsante "AVANTI" per passare alla domanda successiva, inizialmente nascosto.
    - Un elemento `<audio>` per il jingle "Who's That Pokémon?".
    - È la pagina che carica la maggior parte degli script di logica, inclusi il timer, il caricamento delle domande e la gestione dell'avanzamento.

- **`results.html`**: Mostra il riepilogo finale del quiz. Al suo caricamento, recupera il punteggio e il numero totale di domande dal `localStorage`. Contiene:
    - Sezioni per mostrare le percentuali e i numeri di risposte corrette e sbagliate.
    - Un elemento `<canvas>` dove viene disegnato un grafico a ciambella (tramite Chart.js) che visualizza i risultati.
    - Un pulsante "RATE US" per navigare alla pagina di feedback.

- **`feedback.html`**: L'ultima pagina del flusso. Permette all'utente di lasciare un feedback tramite un sistema di valutazione a stelle (da 0 a 10) e un campo di testo per commenti. Un pulsante "MORE INFO" reindirizza al sito ufficiale di Epicode. 