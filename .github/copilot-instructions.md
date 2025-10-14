# Copilot Instructions — CineTrack (Movie & Series Tracker)

> **Purpose:** This project is strictly **educational**. Your job (Copilot) is to **build CineTrack step-by-step**, explaining each action *immediately after you do it*. Do not rush, do not skip steps, and **ask before making non-trivial choices**.

---

## 0) Ground Rules for Copilot

- **Explain after every step** using this template:

  ```
  ### Step Report
  - What I did:
  - Why I did it:
  - Files touched (with paths):
  - Key snippets (short, not full files):
  - How to verify/run:
  - Next suggested step:
  ```

- **Ask first** if a decision changes structure, adds a library, or alters UX.
  - Examples: state management libraries, UI kits, CSS reset frameworks, routing style, file/folder naming, or introducing storage beyond LocalStorage.

- **Follow the stack & constraints**:
  - Angular **20+**, **Standalone Components** (no NgModules).
  - **SCSS** for styling.
  - **i18n** via Angular built-in tooling (en, ar) with RTL/LTR.
  - HTTP via **HttpClient** only.
  - **LocalStorage** for auth + lists.
  - **RxJS BehaviorSubject** for session/user state.
  - **Route Guards** for protected views.

- **Coding style**:
  - Strict typing; prefer `readonly` where possible.
  - Smaller, reusable components; smart/service separation.
  - Use `takeUntil` destroy pattern for subscriptions when needed.
  - Use `async` pipe where possible to avoid manual subscriptions.
  - Keep environment variables in `environment.ts` (do **not** hardcode API keys).

- **Testing/Verification**:
  - For each feature, include a quick manual test script (how to click through) in the Step Report.
  - Optional: add minimal unit tests for services and guards when feasible.

---

## 1) Project Bootstrap (Phase 1 of Roadmap)

> Reference: Project Setup & Authentication

### 1.1 Initialize Angular project
**Do:**
- Create project skeleton (if not created yet):

  ```bash
  ng new cine-track --standalone --style=scss --routing
  cd cine-track
  ```

- Configure base paths, strict TS options, and prettier/eslint if needed (ask first before adding configs).

**Deliverables:**
- Clean app boot with a blank home route.
- Step Report.

---

### 1.2 Auth (Local) — Login & Register
**Do:**
- Create `features/auth` with **standalone** components:
  - `features/auth/login`
  - `features/auth/register`
- Create `features/auth/auth.service.ts` that:
  - Persists users in **LocalStorage** (e.g., key: `ct_users`).
  - Manages current session (key: `ct_current_user`).
  - Exposes `currentUser$ : BehaviorSubject<User | null>`.
  - Methods: `register()`, `login()`, `logout()`, `isLoggedIn()`.

- Use **Reactive Forms** with validation (email, password min length).
- On successful login, navigate to `/profile`.

**Deliverables:**
- Working login/register pages.
- Step Report with a **manual verify** section.

---

### 1.3 AuthGuard + Session Management
**Do:**
- Add `guards/auth.guard.ts` (standalone injectable).
- Guard any private route (e.g., `/profile`, `/lists`).
- `AuthService.currentUser$` powers conditional UI (e.g., nav changes).

**Deliverables:**
- Attempt to visit `/profile` when logged out → redirected to `/login`.
- Step Report.

---

## 2) TMDB Integration (Phase 2 of Roadmap)

> Reference: Movie & TV Data Integration

### 2.1 TMDB Service + Trending
**Do:**
- Create `core/services/tmdb.service.ts`.
- Read API key from `environment.ts`:
  - `environment.tmdbApiKey`
  - `environment.tmdbBaseUrl = 'https://api.themoviedb.org/3'`
  - `environment.tmdbImgBaseUrl = 'https://image.tmdb.org/t/p'`
- Implement:
  - `getTrendingAll()`
  - `searchMovies(query)`, `searchTv(query)`
  - `getGenres(type: 'movie' | 'tv')`
  - `discoverByGenre(type, genreId)`

- Create `features/home` to render Trending (cards grid).

**Deliverables:**
- Home shows trending cards (title, poster, rating).
- Step Report.

---

### 2.2 Search
**Do:**
- Add search bar (Reactive Form) on Home.
- When typing & submitting, call TMDB search endpoints.
- Debounce input via RxJS if live-search is desired (ask first).

**Deliverables:**
- Search results grid replaces trending when active.
- Step Report.

---

### 2.3 Details Page
**Do:**
- Create `features/details` (**standalone**).
- Route: `/details/:type/:id` where `type` in `movie|tv`.
- TMDB calls: `GET /movie/{id}` or `GET /tv/{id}`; also load `/similar`.

**Deliverables:**
- Details page shows poster, overview, rating, genres, and similar items list.
- Step Report.

---

## 3) Interaction & Lists (Phase 3 of Roadmap)

> Reference: User Interaction & Lists

### 3.1 Mark as Watched
**Do:**
- `features/library/library.service.ts` for LocalStorage sets:
  - Keys per user: `ct_watched_{userId}`, `ct_lists_{userId}`
- From any card/details, allow “Mark as Watched” (toggle).
- Distinguish movie vs tv in stored items.

**Deliverables:**
- Visual badge/icon on watched items.
- Step Report.

---

### 3.2 Profile Page
**Do:**
- `features/profile` lists user watched items by category (Movies/TV).
- Sorting: recently added first.

**Deliverables:**
- Profile protected by guard, shows watched grid.
- Step Report.

---

### 3.3 Custom Lists
**Do:**
- `features/lists` with:
  - Create List (name, optional description).
  - Add/remove items to lists from card/details.
  - View list page.

**Deliverables:**
- Basic CRUD persisted in LocalStorage.
- Step Report.

---

## 4) Advanced & Polish (Phase 4 of Roadmap)

> Reference: Advanced Features & UI Polishing

### 4.1 Filter by Genre
**Do:**
- UI control (dropdown/checkbox group) to filter by genre using `discover` API.
- Allow switching between **movie** and **tv**.

**Deliverables:**
- Genre filter updates grid results.
- Step Report.

### 4.2 Responsive & Styling
**Do:**
- SCSS cleanup: variables, spacing scale, responsive grid.
- Card skeleton loaders and error states.

**Deliverables:**
- Smooth responsive layout; minimal CLS.
- Step Report.

### 4.3 Optimization
**Do:**
- Use `async` pipe where possible.
- Ensure subscriptions are cleaned up (if any).
- Extract reusable UI pieces (Card, Grid, RatingChip).

**Deliverables:**
- Small tidy diffs and rationale.
- Step Report.

---

## 5) Localization (i18n) (Phase 5 of Roadmap)

> Reference: Localization (i18n) & Multi-language Support

### 5.1 Setup i18n
**Do:**
- Configure Angular i18n with **en** and **ar**.
- Generate translation files (XLIFF recommended).
- Register locales and date/number formats.

### 5.2 Apply Translations
**Do:**
- Add `i18n` attributes to all static text.
- Extract & fill translations (menu, buttons, labels, empty states).

### 5.3 Language Switcher
**Do:**
- `shared/components/language-switcher` (standalone).
- Persist selected locale in LocalStorage (e.g., `ct_locale`).
- Update `dir="rtl"` for `ar`, `dir="ltr"` for `en` at the root (Renderer2).

### 5.4 Localize Dates/Numbers
**Do:**
- Ensure built-in pipes reflect active locale.
- Verify RTL spacing in cards and forms.

**Deliverables (for 5.1–5.4):**
- Language toggle works instantly; layout direction flips correctly.
- Step Reports (one per sub-step).

---

## 6) Suggestions (Optional Enhancement)

> Educational add-on showing similar content logic.

**Do:**
- On details page, render `/similar` results.
- On profile page, an experimental “Suggestions For You” section:
  - Gather top genres from watched items.
  - Query `discover` with those genres; de-duplicate results.

**Deliverables:**
- Clear *experimental* label and short explanation in the UI.
- Step Report.

---

## 7) Folder Structure (Guidance)

> Keep the folder hierarchy simple, modular, and aligned with Angular best practices.  
> Each main page belongs in `/features`, shared logic in `/core`, and reusable UI in `/shared`.

```
src/
  app/
    core/                    # Application-wide logic (services, guards, utils)
      
    features/                # Main app features (each route = one folder)

    shared/                  # Reusable UI elements and components
      components/            # Common UI blocks 

    i18n/                    # Translation files (English, Arabic)

  styles/                    # Global SCSS structure

```

---

### 💡 Notes for Copilot
- **core/** → for non-UI logic used across the app.  
- **features/** → each page or route has its own isolated folder.  
- **shared/** → visual, reusable, and stateless components.  
- **styles/** → global SCSS system for maintainable design.  
- **i18n/** → store language files (en/ar).  

---

## 8) Environments & Secrets

- Add placeholders in `environment.ts` and instruct the human to set a TMDB key:

  ```ts
  export const environment = {
    production: false,
    tmdbApiKey: 'YOUR_TMDB_KEY_HERE',
    tmdbBaseUrl: 'https://api.themoviedb.org/3',
    tmdbImgBaseUrl: 'https://image.tmdb.org/t/p'
  };
  ```

- Never commit real secrets. If needed, ask the human to provide the key locally.

---

## 9) Definition of Done (per feature)

- ✅ Builds without errors.
- ✅ User flow verified manually (short checklist in Step Report).
- ✅ No console errors.
- ✅ Basic empty/error/loading states covered.
- ✅ i18n text extracted (once i18n step begins).
- ✅ Guardrails respected (no surprise libraries).

---

## 10) Communication Prompts (for Copilot Chat)

When you need to proceed, use messages like:

- **Before a step:**  
  “I will implement `<feature>` now. This will touch `<files>`. Any preference on `<option A/B>`? If no response, I’ll proceed with `<default>` for educational clarity.”

- **After a step:**  
  Provide the **Step Report** template filled out.

- **When blocked:**  
  “I’m blocked by `<reason>`. Do you want me to `<option 1>` or `<option 2>`? My recommendation: `<reasoning>`.”

---

## 11) Getting Started (Human Checklist)

1. Run:
   ```bash
   ng new cine-track --standalone --style=scss --routing
   cd cine-track
   npm start
   ```
2. Add your TMDB API key to `environment.ts`.
3. Tell Copilot:  
   > “Follow `copilot-instructions.md` from Section **1.2** and proceed.”

---

**Reminder:** This is an educational build. Go slow, explain everything, and confirm decisions before introducing complexity.
