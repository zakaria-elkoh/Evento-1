# Documentation for Technologies Used in the Frontend Project

This document provides an overview of the technologies and dependencies used in this project, along with a brief explanation of their purpose.

---

## Core Dependencies

### [React](https://reactjs.org/)

A JavaScript library for building user interfaces. React focuses on building reusable components and managing the application's state effectively.

### [React Router DOM](https://reactrouter.com/)

A library for implementing dynamic routing in React applications.

### [React Redux](https://react-redux.js.org/)

The official binding library for Redux, providing a state management solution for React applications.

### [@reduxjs/toolkit](https://redux-toolkit.js.org/)

A modern and efficient way to manage Redux state with simplified APIs, reducing boilerplate code.

### [React Hook Form](https://react-hook-form.com/)

A library for building and managing forms in React with improved performance and simplified validation.

### [Zod](https://zod.dev/)

A TypeScript-first schema declaration and validation library, often used for form validation.

### [Axios](https://axios-http.com/)

A promise-based HTTP client for making API requests from the frontend.

### [Radix UI](https://www.radix-ui.com/)

A set of accessible React components such as Dialog, Dropdown, Switch, Toast, and more, used for building high-quality UIs.

### [Tailwind CSS](https://tailwindcss.com/)

A utility-first CSS framework for rapidly building custom designs.

### [Tailwind CSS Animate](https://github.com/joe-bell/tailwindcss-animate)

A plugin for Tailwind CSS that provides animation utilities.

### [Tailwind Merge](https://github.com/dcastil/tailwind-merge)

A utility that intelligently merges Tailwind CSS classes, avoiding conflicting class combinations.

### [Lucide React](https://lucide.dev/)

A library of beautifully designed, customizable SVG icons for React.

### [Class Variance Authority (CVA)](https://github.com/joe-bell/cva)

A utility for managing and organizing class names in complex UI components.

### [Sonner](https://github.com/emilkowalski/sonner)

A lightweight toast notification library for React.

### [Input OTP](https://github.com/viveknayyar/input-otp)

A simple and customizable OTP (One-Time Password) input field component for React.

### [jsPDF](https://github.com/parallax/jsPDF) and [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)

Libraries for generating PDF documents on the client-side, with support for table generation.

---

## Development Dependencies

### [Vite](https://vitejs.dev/)

A fast build tool and development server for modern frontend frameworks like React.

### [TypeScript](https://www.typescriptlang.org/)

A strongly-typed superset of JavaScript, enabling better code reliability and maintainability.

### [Tailwind CSS](https://tailwindcss.com/)

For styling the UI with utility-first CSS.

### [ESLint](https://eslint.org/)

A tool for identifying and fixing JavaScript code issues, with support for TypeScript and React.

### [Cypress](https://www.cypress.io/)

An end-to-end testing framework for frontend applications.

### [PostCSS](https://postcss.org/) and [Autoprefixer](https://github.com/postcss/autoprefixer)

Tools for transforming CSS with plugins and ensuring cross-browser compatibility by adding vendor prefixes.

### [@vitejs/plugin-react](https://vitejs.dev/plugins/)

A Vite plugin that adds React-specific optimizations to the build process.

---

## Scripts

The `package.json` includes several scripts for common tasks:

| Script         | Description                                           |
| -------------- | ----------------------------------------------------- |
| `dev`          | Starts the Vite development server.                   |
| `build`        | Builds the production-ready application.              |
| `preview`      | Previews the built application locally.               |
| `lint`         | Runs ESLint to identify and fix code issues.          |
| `cypress:open` | Opens the Cypress test runner for end-to-end testing. |
| `cypress:run`  | Runs Cypress tests in the terminal.                   |

---

## Testing Configuration

The project uses Cypress for end-to-end testing. Key commands include:

- `cypress:open` for interactive test writing.
- `cypress:run` for running tests in CI/CD environments.

---

## Environment Variables

Environment variables are managed through `.env` files. Example:

```env
VITE_API_URL=<your_backend_api_url>
VITE_SOME_OTHER_CONFIG=<your_config_value>
```
