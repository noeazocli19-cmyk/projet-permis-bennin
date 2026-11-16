# PROJET PERMIS BÉNIN — Site web premium

Site web professionnel pour **PROJET PERMIS BÉNIN**, auto-école premium au Bénin.
Slogan : _« La route vers votre liberté commence ici. »_

## Stack technique

- **Next.js 16** (App Router) + **TypeScript 5**
- **Tailwind CSS 4** + **shadcn/ui** (composants New York)
- **Framer Motion** (animations, scroll reveal, respects `prefers-reduced-motion`)
- **React Hook Form** + **Zod** (formulaire d'inscription)
- **Prisma** ORM + **Neon** (PostgreSQL serverless)
- **Resend** (envoi d'e-mails, configurable par variables d'environnement)
- **Lucide React** (icônes)
- i18n léger côté client (FR / FON / EN) — sans routing `[locale]`, via `useSyncExternalStore`
- **pnpm** comme gestionnaire de paquets
- Déploiement : **Vercel** + **GitHub**

## Prérequis

- [Node.js](https://nodejs.org/) ≥ 20
- [pnpm](https://pnpm.io/) ≥ 9 (`npm i -g pnpm`)
- Un compte [Neon](https://neon.tech/) (base PostgreSQL serverless gratuite)
- Un compte [Vercel](https://vercel.com/) (déploiement)
- Un dépôt [GitHub](https://github.com/) (versionning + auto-déploiement Vercel)

## Lancement en local

```bash
pnpm install
cp .env.example .env      # puis remplir DATABASE_URL + DIRECT_URL (Neon)
pnpm db:push              # crée les tables dans Neon
pnpm dev                  # http://localhost:3000
```

### Lint

```bash
pnpm lint
```

## Structure

```
src/
  app/
    page.tsx              # Page unique (single-page) avec toutes les sections
    layout.tsx            # Layout, fonts, metadata SEO, JSON-LD, Navbar/Footer
    sitemap.ts            # Sitemap SEO
    api/contact/route.ts  # Endpoint : persiste dans Neon + envoie e-mail (Resend)
  components/
    layout/               # Navbar, Footer, LanguageSwitcher
    home/                 # Hero, About, WhyUs, Formations, Pricing, OnlineCourses,
                          # HowToRegister, Zones, InscriptionSection, ContactSection
    sections/             # SectionHeading (réutilisable)
    forms/                # InscriptionForm (RHF + Zod)
    ui/                   # shadcn/ui + motion.tsx (helpers Framer Motion)
  i18n/provider.tsx       # Provider i18n (useSyncExternalStore) + hook useI18n/useT
  lib/
    constants.ts          # Infos entreprise centralisées (téléphones, tarifs, villes…)
    db.ts                 # Client Prisma (singleton, Neon)
    whatsapp.ts           # Génération de liens wa.me
    validations.ts        # Schémas Zod
prisma/
  schema.prisma           # Schéma PostgreSQL (modèle Inscription)
messages/
  fr.json, en.json, fon.json
public/
  logo/logo-projet-permis-benin.png
  images/hero-car.png, formation-*.png, about-driving.png
```

## Base de données (Neon PostgreSQL)

### 1. Créer la base sur Neon

1. Se connecter sur [neon.tech](https://neon.tech/) → **New Project**.
2. Récupérer deux URL de connexion dans **Connection Details** :
   - **Pooled connection** (port `6543`, avec `pgbouncer=true`) → `DATABASE_URL`
   - **Direct connection** (port `5432`) → `DIRECT_URL`

### 2. Configurer les variables

Dans `.env` (local) **et** dans Project Settings → Environment Variables (Vercel) :

```env
DATABASE_URL="postgresql://USER:PASS@ep-XXXX-pooler.REGION.aws.neon.tech/DBNAME?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://USER:PASS@ep-XXXX.REGION.aws.neon.tech/DBNAME?sslmode=require"
```

### 3. Créer les tables

```bash
pnpm db:push
```

Cela crée la table `Inscription` (voir `prisma/schema.prisma`).

### Schéma

```prisma
model Inscription {
  id        String   @id @default(cuid())
  nom       String
  prenom    String
  telephone String
  ville     String
  categorie String          // A1 | A2 | A3 | B | C | C1 | D
  langue    String          // fr | fon | en
  message   String?
  source    String?  @default("web")
  status    String   @default("nouveau")   // nouveau | traite | archive
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Explorer les données

```bash
pnpm db:studio    # ouvre Prisma Studio sur localhost:5555
```

## E-mail (Resend, optionnel)

L'envoi d'e-mail du formulaire d'inscription est **optionnel**.
Pour l'activer, définir :

```env
RESEND_API_KEY=re_xxxxxxxx
CONTACT_EMAIL=contact@votre-domaine.bj
```

### Mode dégradé

L'endpoint `/api/contact` est conçu pour **ne jamais échouer silencieusement** :

- **DB + email configurés** → l'inscription est persistée dans Neon **et** un e-mail est envoyé.
- **DB seule** → persistée, pas d'e-mail.
- **E-mail seul** → e-mail envoyé, non persisté.
- **Aucun des deux** → retour HTTP 503, le frontend bascule sur WhatsApp.

Le bouton WhatsApp (message pré-rempli) est **toujours** disponible comme canal de secours.

## Déploiement Vercel

### Méthode recommandée (GitHub auto-deploy)

1. **Pousser le projet sur GitHub** :
   ```bash
   git init
   git add .
   git commit -m "PROJET PERMIS BÉNIN — site premium"
   git branch -M main
   git remote add origin https://github.com/TON_USER/projet-permis-benin.git
   git push -u origin main
   ```

2. **Connecter le dépôt à Vercel** :
   - Sur [vercel.com/new](https://vercel.com/new) → **Import Git Repository**.
   - Sélectionner le dépôt `projet-permis-benin`.
   - Framework Preset : **Next.js** (auto-détecté).
   - Build Command : `pnpm build` (déjà dans `vercel.json`).
   - Install Command : `pnpm install --frozen-lockfile` (déjà dans `vercel.json`).

3. **Ajouter les variables d'environnement** (Project Settings → Environment Variables) :
   - `DATABASE_URL` (Neon pooled)
   - `DIRECT_URL` (Neon direct)
   - `RESEND_API_KEY` (optionnel)
   - `CONTACT_EMAIL` (optionnel)

4. **Déployer**. Chaque `git push` sur `main` redéploie automatiquement.

### Méthode CLI (alternative)

```bash
pnpm add -g vercel
vercel login
vercel link              # lie le dossier au projet Vercel
vercel env add DATABASE_URL
vercel env add DIRECT_URL
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
vercel --prod            # déploiement production
```

URL attendue : `https://projet-permis-benin.vercel.app`

## WhatsApp

Le numéro WhatsApp est configurable dans `src/lib/constants.ts`
(`COMPANY.whatsappNumber`). Le formulaire d'inscription génère un message
pré-rempli et ouvre `wa.me`.

## Multilingue

- **Français** (par défaut)
- **Fongbé** — traductions provisoires, à valider par un locuteur compétent
  (une note l'indique dans le sélecteur de langue)
- **Anglais**

Le sélecteur de langue est dans la Navbar. La préférence est persistée dans
`localStorage`.

## SEO

- `metadata` complète (title, description, Open Graph, Twitter)
- `sitemap.ts` + `robots.txt`
- Données structurées JSON-LD (`EducationalOrganization`) avec informations vérifiées
  (nom, téléphones, pays, villes desservies, langues)
- Favicon basé sur le logo

## Notes importantes

- **Seules les informations fournies par le client sont utilisées.** Aucun
  témoignage, statistique, certification, adresse précise ou compte social inventé.
- Les dates historiques d'inscription ne sont pas présentées comme actuelles.
- Les conditions exactes par catégorie de permis doivent être confirmées auprès
  de l'entreprise (note affichée dans la section Tarifs).

## Commandes utiles

| Commande              | Description                                       |
| --------------------- | ------------------------------------------------- |
| `pnpm dev`            | Serveur de développement (port 3000)              |
| `pnpm build`          | Build production (Prisma generate + next build)   |
| `pnpm start`          | Démarre le serveur de production                  |
| `pnpm lint`           | Vérifie la qualité du code (ESLint)               |
| `pnpm db:push`        | Synchronise le schéma Prisma avec Neon            |
| `pnpm db:generate`    | Régénère le client Prisma                         |
| `pnpm db:migrate`     | Crée + applique une migration (dev)               |
| `pnpm db:deploy`      | Applique les migrations en production             |
| `pnpm db:studio`      | Ouvre Prisma Studio (UI base de données)          |

## Évolutions futures

- Administration (dashboard inscriptions reçues depuis Neon)
- Espace membre pour les cours en ligne (vidéos, quiz code de la route)
- Pages dédiées par catégorie de permis
