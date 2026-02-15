# Waarom dit misgaat (in gewone mensentaal)

Je doet niks doms. Je loopt in 2 Git-problemen tegelijk:

1. `package.json` bestaat niet op jouw `main`.
2. De branch `work` bestaat niet op jouw GitHub remote.

Daarom werken deze niet:
- `npm install` (want geen `package.json`)
- `git merge work` (want die branch heb jij niet)

---

## Snelle fix (5 minuten) — direct op `main`

Run dit exact, 1 blok tegelijk:

```bash
git checkout main
git pull origin main
```

### Maak basisbestanden aan (copy/paste)

```bash
cat > package.json <<'JSON'
{
  "name": "professor-pint-2",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "studio": "remotion studio",
    "render": "remotion render",
    "compositions": "remotion compositions"
  },
  "dependencies": {
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "remotion": "4.0.236"
  },
  "devDependencies": {
    "@types/react": "19.0.10",
    "@types/react-dom": "19.0.4",
    "typescript": "5.7.3"
  }
}
JSON

cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "allowJs": false,
    "noEmit": true
  },
  "include": ["src", "remotion.config.ts"]
}
JSON

cat > remotion.config.ts <<'TS'
import {Config} from 'remotion';

Config.setEntryPoint('./src/index.ts');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
TS
```

### Commit + push op `main`

```bash
git add package.json tsconfig.json remotion.config.ts
git commit -m "Add missing Remotion project setup files"
git push origin main
```

### Dan starten

```bash
npm install
npx remotion studio
```

---

## Waarom eerdere merge-commands faalden

- `merge: work - not something we can merge` = er is geen lokale branch `work`.
- `couldn't find remote ref work` = er is ook geen `origin/work` op GitHub.

Dus: stop met `work` mergen. Gewoon direct op `main` fixen (zoals hierboven).

---

## Als je wilt dat ik voortaan wel op dezelfde lijn zit als jij

Gebruik altijd 1 van deze 2 workflows:

1. **Allebei op main werken** (simpel, iets risicovoller)
2. **Allebei via dezelfde vaste branchnaam**, bv `feature/video-001`

Belangrijk: branchnaam moet echt bestaan op GitHub, anders kunnen we niet syncen.
