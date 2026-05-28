# NCERT Study Hub

Free online NCERT textbooks for **Classes 6–12** — read chapters in the browser, open **exercise & question** sets, and download PDFs. Built for **students and teachers**.

## Features

- **Classes 9–12** — Science (9–10); Physics, Chemistry, Biology, Maths (11–12)
- **Chapter reader** — full-screen PDF viewer with download
- **Exercises** — dedicated entry per chapter for NCERT intext and back questions
- **Search & library** — filter by class, subject, and material type

## Setup

```bash
npm install
npm run fetch-pdfs    # download official NCERT chapter PDFs (~800MB)
npm run dev
```

PDFs are stored in `src/assets/science/` (from [ncert.nic.in](https://ncert.nic.in/textbook.php)).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run fetch-pdfs` | Download NCERT chapter PDFs |
| `npm run build` | Production build |

---

Built with React, TypeScript, and Vite.
