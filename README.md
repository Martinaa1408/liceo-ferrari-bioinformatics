# Bioinformatics at Liceo Ferrari

Materials from two sessions on bioinformatics and data science at Liceo Scientifico "Enzo Ferrari", Cesenatico (quinta, Scienze applicate), November 2026.

**Toolkit in italiano:** https://martinaa1408.github.io/liceo-ferrari-bioinformatics/it/
**Toolkit in inglese:** https://martinaa1408.github.io/liceo-ferrari-bioinformatics/
**Lab (test ed esplorazione di strumenti):** https://martinaa1408.github.io/lab/

Incontri: 21 novembre 2026 (8-11) e 28 novembre 2026 (10-13).

## Run the code

No installation. You need a browser and a Google account.

| Notebook | What it does | Open |
|---|---|---|
| Toolkit | All the code from both sessions, plus exercises | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Martinaa1408/liceo-ferrari-bioinformatics/blob/main/notebooks/Toolkit_studenti.ipynb) |
| Session 1 live coding | DNA as text, translation to protein, mutations | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Martinaa1408/liceo-ferrari-bioinformatics/blob/main/notebooks/Session_1_live_coding_DNA.ipynb) |
| Session 2 live demo | A decision tree learns a rule | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Martinaa1408/liceo-ferrari-bioinformatics/blob/main/notebooks/Session_2_decision_tree.ipynb) |

## Contents

```
it/index.html          toolkit in italiano (versione semplificata, accessibile)
index.html             toolkit in inglese, con link alla versione italiana
feedback.html          questionario finale
dashboard.html         dashboard con risposte, gradimento e suggerimenti
apps_script/Code.gs    backend Google Apps Script del questionario
attivita/              schede attivita per gli studenti (senza soluzioni)
notebooks/             notebook Colab
slides/                slide degli incontri (PPTX e PDF)
qr/                    codici QR
assets/                immagini e badge
```

## Questionario e dashboard

1. Crea un Google Sheet, apri Estensioni, Apps Script e incolla `apps_script/Code.gs`.
2. Cambia la costante `TOKEN` con una parola d'ordine tua.
3. Distribuisci come app web (esegui come te, accesso a chiunque) e copia l'URL che termina con `/exec`.
4. Incolla l'URL in `ENDPOINT` dentro `feedback.html` e `dashboard.html`.
5. Apri `dashboard.html`, inserisci il token. Con `dashboard.html#demo` vedi dati di prova.

## Topics

- Session 1: DNA and proteins as data, mutations, sequence alignment (Needleman-Wunsch).
- Session 2: machine learning, decision trees, training and test sets, recall and precision, SQL in a hospital database.

## Author

Martina Castellucci. Diploma at Liceo Ferrari, BSc in Biotechnology, MSc in Bioinformatics at the University of Bologna. Thesis internship at Neotron Laboratories (Modena) on a decision support system for food contamination risk. Since October 2026, Product Specialist at [Onit](https://www.onit.it) in Cesena, working on healthcare data warehouses and dashboards.

Data used in exercises and quizzes is made up for teaching.

## Licence

Text and slides: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Code: MIT.
