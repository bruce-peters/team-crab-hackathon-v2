# Canvas Dashboard Extension (CANVAI)

A Chrome extension that injects a React dashboard, branded **CANVAI**, at the top of Canvas (`*.instructure.com`) pages. Its service worker sends a list of assignments to Google's Gemini API, which rates each one's priority (urgency, share of the grade, difficulty). The dashboard shows them as high / medium / low priority tasks.

There is no hosted demo. It is a browser extension, so you build it (or use the committed `dist/`) and load it unpacked in Chrome.

## Features

- **Tasks widget**: assignments ranked by a Gemini priority rating (1-10), shown as high (8+), medium (5-7), or low priority with due dates
- **AI Assistant chat box**: sends questions to a separate backend server at `http://localhost:3000/api/query` (not included in this repo, see Notes)
- **Injected into Canvas**: the content script mounts the dashboard above the Canvas page content

## Run it

### Prerequisites
- Google Chrome (or another Chromium browser such as Edge)
- Node.js 20.19+ or 22.12+ (required by Vite 7) and npm, only if you want to rebuild `dist/`
- A Gemini API key (free from [Google AI Studio](https://aistudio.google.com/app/apikey)) for the task ranking

### 1. Build (optional)
The built bundle is committed in `dist/`, so you can skip this unless you change `src/`.
```bash
npm ci
npm run build   # writes dist/dashboard.js and dist/dashboard-main.css
```

### 2. Add your Gemini API key
```bash
cp config.example.js config.js
```
Open `config.js` and replace `YOUR_GEMINI_API_KEY` with your key. `config.js` is gitignored, and `sw.js` loads it when the service worker starts. Without it the extension still loads, but the Tasks widget shows "No tasks available".

### 3. Load the extension in Chrome
1. Open `chrome://extensions/`
2. Turn on **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select this repository's root folder (the one containing `manifest.json`)
4. Visit any Canvas page on `*.instructure.com`. The CANVAI dashboard appears at the top of the page.

The service worker ranks the assignments when the extension is installed or reloaded. The first ranking takes a few seconds, so if the Tasks list is empty on the first Canvas page, reload that page. After changing `config.js`, click the reload icon on the extension's card in `chrome://extensions/`.

## Project structure

```
├── manifest.json              # MV3 manifest: service worker, content scripts, icons
├── sw.js                      # Service worker: loads prunertest.json, asks Gemini to rank it, serves tasks
├── content.js                 # Content script: injects the CSS and mounts the dashboard
├── config.example.js          # Template for config.js (Gemini API key)
├── prunertest.json            # Assignment data the extension ranks (an exported Canvas assignment list)
├── src/
│   ├── main.jsx               # Exposes window.mountCanvasDashboard for content.js
│   ├── App.jsx
│   ├── main.css               # Tailwind CSS entry
│   └── components/
│       ├── Dashboard.jsx      # Layout
│       ├── TasksWidget.jsx    # Ranked tasks from the service worker
│       └── ChatboxWidget.jsx  # Chat box that calls the localhost:3000 backend
├── dist/                      # Built bundle loaded by the manifest (committed)
├── gemini.js                  # Earlier Node prototype of the Gemini call (not used by the extension)
├── test.html                  # Static page that mounts dist/dashboard.js without Chrome APIs
└── vite.config.mjs
```

## Technology stack

- **React 19** UI components
- **Vite 7** build tool and bundler
- **Tailwind CSS 4** styling
- **Chrome Extensions Manifest V3** (service worker + content scripts)
- **Google Gemini API** (`gemini-flash-latest`, JSON output) for priority ratings

## Notes and limitations

- **Assignments come from the bundled `prunertest.json`, not from your live Canvas account.** `sw.js` has a commented-out Canvas API token and a placeholder `CANVAS_API` URL, but no live Canvas fetch.
- **The AI Assistant chat needs a backend that is not in this repo.** `ChatboxWidget.jsx` POSTs `{ q }` to `http://localhost:3000/api/query`. Without that server the chat replies "Sorry, I'm having trouble connecting right now."
- **What was tested here:** `npm ci` and `npm run build` pass on Node 22, and the build output is byte-identical to the committed `dist/`. The extension was loaded unpacked in headless Chromium against a mocked `*.instructure.com` page. With no key, the dashboard renders with an empty task list. With a mocked Gemini response, the ranked tasks render. A real Gemini key and a real Canvas site were not tested.
- `test.html` previews the dashboard layout outside the extension: serve the folder (for example `npx http-server . -p 8080`) and open `http://localhost:8080/test.html`. Without Chrome extension APIs it cannot show ranked tasks.

## Early MVP screenshot

From the first MVP (PR #1). The current UI is the CANVAI Tasks + AI Assistant layout described above.

![Dashboard Screenshot](https://github.com/user-attachments/assets/1d322ce5-b677-43bb-8d79-7177cd9583f9)
