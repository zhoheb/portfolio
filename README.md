# zachhoheb.dev

Personal portfolio site. Vite + React + TypeScript, fully static, deployed to GitHub Pages.

## Run locally

Requires Node 20.19+ (or 22.12+).

```sh
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check and build to dist/
npm run preview  # serve the production build locally
```

## Edit content

All text (intro, bio, education, experience, projects, skills, links) lives in
[`src/data/content.ts`](src/data/content.ts). The components in `src/components/`
only render that data, one component per section, so the content survives a
styling or template swap.

Still to fill in:

- Project repo links: each project in `src/data/content.ts` has an empty `github` field marked with a TODO

The Resume link serves `public/resume.pdf`; replace that file to update it.

Styling is a single file, [`src/styles.css`](src/styles.css).

## Deploy

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages.

One-time setup:

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. At your DNS provider, point `zachhoheb.dev` at GitHub Pages:
   - `A` records for the apex domain: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - optionally a `CNAME` record for `www` pointing to `<github-username>.github.io`
4. Back in **Settings → Pages**, enter `zachhoheb.dev` as the custom domain and
   enable **Enforce HTTPS** once the certificate is issued.

`public/CNAME` holds the custom domain and is copied into every build, and
`base: '/'` in `vite.config.ts` matches serving from the domain root.
