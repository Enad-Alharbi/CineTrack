# CineTrack — Movie & Series Tracker  
### Product Requirements Document (PRD)

---

## 1. Overview  
**CineTrack** is a front-end web application built using **Angular (Standalone Components)** that allows users to discover, organize, and track movies and TV shows.  
It provides features like marking content as watched, creating custom lists, filtering by genre, and viewing detailed information retrieved from **TMDB API**.  
The app is purely client-side, utilizing **LocalStorage** for user authentication and data persistence.

---

## 2. Problem Statement  
Many users struggle to manage and track the vast number of movies and TV shows they watch or plan to watch.  
Existing platforms may require logins or subscriptions.  
This project aims to create a **lightweight, user-friendly alternative** for tracking and organizing content — entirely on the front-end.

---

## 3. Objectives  
- Allow users to register, log in, and maintain personal data locally.  
- Fetch movie and TV show data dynamically using **TMDB API**.  
- Let users mark items as watched and categorize them in custom lists.  
- Enable search and filtering based on genre, type, and popularity.  
- Provide a responsive and visually appealing UI using **SCSS**.

---

## 4. Target Audience  
- Movie and TV enthusiasts who want to track what they watch.  
- Users who prefer lightweight apps without sign-ups or backend storage.  
- Developers learning **Angular** through a realistic, API-based project.

---

## 5. Core Features  
- **User Authentication (Local)** – Register and log in locally using LocalStorage.  
- **Default Lists** – Three built-in lists for every user:
  - Watchlist: For content the user plans to watch
  - Watched: For content the user has completed watching
  - Favorite: For content the user particularly enjoyed
- **Custom Lists** – Create and manage additional custom lists (e.g., Marvel Movies, Disney Favorites).  
- **Search & Discovery** – Search movies/series using TMDB endpoints.  
- **Genre Filtering** – Filter content dynamically by genre.  
- **Profile Page** – Display watched items and personal lists.  
- **Responsive UI** – Clean, modern layout with adaptive SCSS design.  
- **Localization (i18n)** – The application supports multiple languages (English and Arabic) using Angular’s built-in i18n module.  
  All static text and UI elements are translatable, and layout direction (LTR/RTL) automatically adjusts based on the selected language.

---

## 6. User Flow  
1. User opens the app → navigates to **Home page**.  
2. User can browse trending movies/series fetched from **TMDB API**.  
3. If not logged in → user registers or logs in (saved in LocalStorage).  
4. Once logged in → user can mark content as watched or add to lists.  
5. Profile page displays watched items and user-created lists.  
6. User can filter or search for content anytime.  
7. Logout clears session but retains stored data for next login.

---

## 7. APIs Used  
**TMDB API** ([developer.themoviedb.org](https://developer.themoviedb.org/)) – primary source for movies and TV shows.  
- `/trending/all/week` → Fetch trending content.  
- `/search/movie` and `/search/tv` → Search functionality.  
- `/genre/movie/list` and `/genre/tv/list` → Fetch available genres.  
- `/discover/movie?with_genres={id}` → Filter by genre.

---

## 8. Technical Requirements  
- **Framework:** Angular 20 (Standalone Components, no NgModules).  
- **Styling:** SCSS with responsive layouts.  
- **State Management:** RxJS BehaviorSubject for session/user states.  
- **Storage:** LocalStorage for users and lists.  
- **Routing:** Angular Router with AuthGuards for protected pages.  
- **API Communication:** Angular HTTPClient with Observables.  
- **Localization:** Implemented via Angular i18n with translation files (XLIFF or JSON).  
  The app dynamically switches between Arabic and English, with directionality (RTL/LTR) handled globally using SCSS and Angular Renderer2.

---

## 9. Non-Functional Requirements  
- **Performance:** Quick loading via caching and local data storage.  
- **Usability:** Intuitive UI with clear navigation and feedback.  
- **Responsiveness:** Fully responsive for mobile, tablet, and desktop.  
- **Reliability:** Data persistence ensured via browser LocalStorage.  
- **Maintainability:** Modular architecture with standalone components.  
- **Accessibility & Localization:** The interface automatically adapts to the active language, adjusting text direction, layout, and typography to ensure accessibility for both Arabic and English users.

---

## 10. Future Enhancements  
- Integrate real backend authentication using Firebase or Auth0.  
- Sync user data to cloud for multi-device access.  
- Add social features (ratings, comments, recommendations).  
- Implement dark/light themes and accessibility features.  
- Extend localization support to additional languages and dynamically load translations from external JSON files or a CMS for scalability.
