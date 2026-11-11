# Upgrade Vision AI — website

The site for Upgrade Vision AI, which finds the step missing from how a company works, builds it with AI and trains the team to run it.

- **Stack:** React 18, Vite, Tailwind, Lenis, a hand-written WebGL2 hero with no 3D library. Every route is prerendered to static HTML at build time and deployed on Netlify.
- **Content:** English copy lives in [`src/content/site.ts`](src/content/site.ts), Bulgarian (`/bg`) in [`src/content/bg.ts`](src/content/bg.ts).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck, build and prerender into dist/
npm run preview   # serve the production build
```
