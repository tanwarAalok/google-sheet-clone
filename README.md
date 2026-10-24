# Google Sheet Clone

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

A spreadsheet in the browser, built with plain HTML, CSS and JavaScript and no libraries. It supports formulas that reference other cells, keeps dependent cells up to date, and detects circular references with a graph algorithm, then animates the cycle so you can see where it is.

**Live demo:** [google-sheet-clone.netlify.app](https://google-sheet-clone.netlify.app/)

![Google Sheet Clone](https://github.com/tanwarAalok/google-sheet-clone/assets/78805153/89adc44d-dd05-4de7-8256-e4836c4134cd)

## Features

- **Formulas** such as `( A1 + B2 ) * 2` (space-separated tokens), on a 100 × 26 grid, with automatic recalculation of every dependent cell when a value changes.
- **Cycle detection:** formulas form a dependency graph, and a DFS rejects any formula that would create a circular reference.
- **Cycle tracing:** optionally walk the detected cycle cell by cell with a colour animation.
- **Formatting:** font family and size, bold, italic, underline, alignment, text colour and background colour.
- **Cut, copy and paste** of a selected range.
- **Multiple sheets** in one workbook: add, switch and remove sheets.
- **Save and open** a workbook as a JSON file.

## How it works

| File | Responsibility |
| --- | --- |
| `grid.js` | Builds the grid, row and column headers and the address bar |
| `cell-properties.js` | Per-cell storage and formatting toolbar |
| `formula.js` | Formula evaluation and parent/child dependency tracking |
| `cycle-validation.js` | Graph of formula dependencies and DFS cycle detection |
| `cycle-path-tracing.js` | Animated tracing of a detected cycle |
| `cutCopyPaste.js` | Range selection, cut, copy and paste |
| `sheetHandler.js` | Multiple sheets |
| `openSave.js` | Download and upload the workbook as JSON |

## Run locally

No build step. Clone the repo and open `index.html` in a browser, or serve the folder:

```bash
git clone https://github.com/tanwarAalok/google-sheet-clone.git
cd google-sheet-clone
npx serve .
```
