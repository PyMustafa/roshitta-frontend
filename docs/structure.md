# Project Structure Explanation

This document explains the modular structure of the project, designed for scalability, maintainability, and clear separation of concerns. Each directory and its purpose are described below.

---

## Root Directories

- **public/**: Static files served directly (e.g., images, favicon).
- **src/**: All source code for the frontend application.
- **docs/**: Documentation files for the project.

---

## Inside `src/`

### 1. `api/`
Holds API logic, such as axios instances, endpoint definitions, and API hooks for each domain (e.g., `auth.js`, `users.js`). Keeps network logic separate from UI and state.

### 2. `assets/`
Static assets like images, SVGs, and icons used throughout the app.

### 3. `components/`
Reusable UI components shared across features. Subfolders:
- `common/`: Generic components (buttons, inputs, modals).
- `forms/`: Form elements and helpers.
- `layout/`: Layout-related components (headers, footers, sidebars).

### 4. `constants/`
Application-wide constants and enums (e.g., status codes, user roles).

### 5. `context/`
React context providers for global state not managed by Redux (e.g., theme, auth context).

### 6. `features/`
Feature-based modular structure. Each feature (e.g., `auth`, `doctors`, `patients`) contains:
- `components/`: Feature-specific UI components.
- `hooks/`: Custom hooks for feature logic.
- `pages/`: Pages/screens for routing.
- `[feature]Slice.js`: (If using Redux) State management for the feature.

This structure allows teams to work independently on features and makes codebase navigation easier.

### 7. `hooks/`
Global custom React hooks used across multiple features.

### 8. `layouts/`
Layout components for different app sections (e.g., dashboard, public site).

### 9. `pages/`
Top-level route pages. These may wrap feature pages or provide general routing logic (e.g., `Home.jsx`, `NotFound.jsx`).

### 10. `routes/`
Route definitions and guards (e.g., `AppRoutes.jsx`, `ProtectedRoute.jsx`).

### 11. `store/`
Redux (or other state management) store setup and configuration files.

### 12. `styles/`
Global stylesheets, variables, and theming files.

### 13. `utils/`
Utility/helper functions used throughout the app.

---

## Benefits of This Structure
- **Scalability:** Easily add new features without cluttering the codebase.
- **Separation of Concerns:** UI, logic, and state are clearly separated.
- **Team Collaboration:** Multiple teams can work on different features independently.
- **Maintainability:** Easier to refactor, test, and maintain.

---

## Example Feature Folder (`src/features/doctors/`)
```
doctors/
  components/      # Doctor-specific UI components
  hooks/           # Custom hooks for doctor logic
  pages/           # Pages/screens for doctor routes
  doctorSlice.js   # Redux slice for doctor state (if using Redux)
```

---

For any new feature, simply add a new folder under `features/` following the same pattern.
