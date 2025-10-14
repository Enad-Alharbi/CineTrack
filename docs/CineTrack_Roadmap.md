# CineTrack — Movie & Series Tracker  
### Project Roadmap  

---

## **Phase 1: Project Setup & Authentication**

### 1.1 - Initialize Angular Project (Standalone Components)
Create a new Angular project using the latest version with standalone components. Configure routing and project structure.  
**Angular Concepts:** Angular CLI, Standalone Components, Routing Setup  

### 1.2 - Implement Local Authentication
Build Login and Register pages with localStorage-based user handling. Include form validation and basic navigation after login.  
**Angular Concepts:** Reactive Forms, Form Validation, Services, LocalStorage Integration, Routing Navigation  

### 1.3 - Add AuthGuard and Session Management
Create an AuthGuard to protect private routes and redirect unauthorized users. Manage current user state via BehaviorSubject.  
**Angular Concepts:** Route Guards, Dependency Injection, RxJS BehaviorSubject, Conditional Rendering  

---

## **Phase 2: Movie & TV Data Integration**

### 2.1 - Integrate TMDB API
Connect to TMDB API and fetch trending movies and TV shows. Display data dynamically using Angular HTTPClient.  
**Angular Concepts:** HTTPClient, Observables, Async Pipe, API Integration  

### 2.2 - Build Home Page with Search Functionality
Implement a search bar to find movies or TV shows using TMDB’s search endpoint.  
**Angular Concepts:** Reactive Forms, HTTP Params, Two-way Binding, API Calls  

### 2.3 - Movie & TV Details Page
Display detailed info (poster, rating, overview) for each selected movie or show.  
**Angular Concepts:** Routing with Params, Component Communication, Dynamic Rendering  

---

## **Phase 3: User Interaction & Lists**

### 3.1 - Implement Default Lists System
Set up the three default lists every user gets automatically:
- Watchlist: For tracking content to watch
- Watched: For completed content
- Favorite: For specially liked content
Implement the core functionality to add/remove items from these lists.
**Angular Concepts:** LocalStorage CRUD, Services, BehaviorSubject State Management

### 3.2 - User Profile Page
Display watched items and personalized data per user. Enable user-specific state management.  
**Angular Concepts:** Routing, Services, RxJS Subjects, Data Binding  

### 3.3 - Custom Lists Management
Enable users to create, view, and delete additional custom lists beyond the default ones (e.g., Marvel, Disney). Each list can contain multiple movies/shows.  
**Angular Concepts:** Reactive Forms, CRUD Operations, LocalStorage, Component Interaction  

---

## **Phase 4: Advanced Features & UI Polishing**

### 4.1 - Filter by Genre
Use TMDB genre endpoints to let users filter movies and shows based on genres.  
**Angular Concepts:** HTTP Params, Reactive Forms, Event Binding, Query Params  

### 4.2 - Responsive UI & Design Enhancements
Polish layout and responsiveness using SCSS and Angular built-in directives.  
**Angular Concepts:** SCSS, Responsive Design, *ngIf / *ngFor, Component Styling  

### 4.3 - Final Testing & Optimization
Ensure components communicate effectively, routes are protected, and data updates correctly.  
**Angular Concepts:** Lifecycle Hooks, Debugging, RxJS Unsubscribe Patterns  

---

## **Phase 5: Localization (i18n) & Multi-language Support**

### 5.1 - Setup i18n Infrastructure
Configure Angular’s built-in i18n system. Create translation files for English (en) and Arabic (ar). Adjust project structure to support multiple locales.  
**Angular Concepts:** Internationalization (i18n), Translation Files, Angular CLI Localization Setup  

### 5.2 - Apply Translations to UI Components
Add i18n attributes to all static texts in templates (buttons, labels, menus). Generate translation files using Angular CLI and provide translated strings for each language.  
**Angular Concepts:** i18n Attributes, Template Translation, JSON/XLIFF Language Files  

### 5.3 - Implement Language Switcher Component
Build a standalone component to let users switch between Arabic and English dynamically. Use BehaviorSubject or a service to update the active language in real-time.  
**Angular Concepts:** Reactive State, Services, BehaviorSubject, Component Communication  

### 5.4 - Handle Directionality (RTL / LTR)
Implement logic to automatically change layout direction based on selected language (Arabic → RTL, English → LTR). Adjust global styles accordingly.  
**Angular Concepts:** Angular Renderer2, DOM Manipulation, SCSS Directional Styles, Conditional Rendering  

### 5.5 - Localize Dates, Numbers, and Content
Ensure proper localization of numbers, currencies, and dates using Angular’s built-in pipes (DatePipe, DecimalPipe, CurrencyPipe) that respect the active locale.  
**Angular Concepts:** Angular Pipes, Locale Data Registration, Internationalization Utilities  

