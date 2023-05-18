# Blank Space Documentation

## Introduction

Blank Space is a web application that provides a customizable theme for creating a blank space with various styling options. This documentation provides an overview of the project structure, key components, and configuration options.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Composables](#composables)
  - [useAppTheme](#useapptheme)
  - [useRouteThemeOptions](#useroutethemeoptions)
  - [useStorage](#usestorage)
  - [useThemeStyle](#usethemestyle)
- [Components](#components)
  - [App.vue](#appvue)
  - [layouts/default.vue](#layoutsdefaultvue)
  - [pages/index.vue](#pagesindexvue)
- [Configuration Files](#configuration-files)
  - [app.config.ts](#appconfigts)
  - [nuxt.config.ts](#nuxtconfigts)
- [Dependencies](#dependencies)

## Installation

To run the Blank Space application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/blank-space.git`
2. Navigate to the project directory: `cd blank-space`
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open the application in your browser at [http://localhost:3000](http://localhost:3000)

## Configuration

The Blank Space application provides several configuration options that allow you to customize the theme and behavior. These configurations can be modified in the provided configuration files.

### Theme Configuration

The theme configuration options can be found in the `useAppTheme.ts` file. This file contains the following options:

- `hexSourceColor`: The source color in hexadecimal format. Default: `#FFFFFFFF`
- `isDarkModeEnabled`: Flag indicating whether dark mode is enabled. Default: `true`

To customize the theme, update these options accordingly.

### Route Theme Options Configuration

The route theme options configuration can be found in the `useRouteThemeOptions.ts` file. This file contains the following options:

- `hexSourceColor`: The source color in hexadecimal format.
- `isDarkModeEnabled`: Flag indicating whether dark mode is enabled.

These options can be set as route query parameters to override the default theme options.

## Composables

The Blank Space application utilizes the following composables:

### useAppTheme

The `useAppTheme` composable provides functionality to manage the application theme. It includes the following methods and properties:

- `theme`: A computed property that returns the current theme based on the configured options.
- `toggleThemeMode`: A method to toggle the theme mode between light and dark.
- `themeOptions`: The theme options used to generate the theme.

### useRouteThemeOptions

The `useRouteThemeOptions` composable provides functionality to manage the theme options based on the route query parameters. It includes the following methods and properties:

- `hexSourceColor`: A writable computed property that represents the source color in the route query.
- `isDarkModeEnabled`: A writable computed property that represents the dark mode flag in the route query.

### useStorage

The `useStorage` composable provides functionality to store and retrieve data using local storage. It includes the following methods:

- `retrieve(key)`: Retrieves the value associated with the given key from local storage.
- `store(key, value)`: Stores the given value with the specified key in local storage.

### useThemeStyle

The `useThemeStyle` composable provides functionality to generate

 CSS styles based on the theme. It includes the following properties:

- `style`: A shallow ref that holds the generated CSS properties based on the theme.

## Components

The Blank Space application includes the following components:

### App.vue

The `App.vue` component is the root component of the application. It includes a layout component and renders the main content of the application.

### layouts/default.vue

The `layouts/default.vue` component represents the default layout used throughout the application. It includes the following features:

- Applies the theme styles to the layout based on the configured theme options.
- Renders the content within a container div.

### pages/index.vue

The `pages/index.vue` component represents the main page of the application. It includes the following features:

- Renders an input field with a placeholder.
- Binds the input field value to the `spaceName` data property.
- Updates the route query parameter when the `spaceName` value changes.
- Updates the page title based on the `spaceName`.

## Configuration Files

The Blank Space application includes the following configuration files:

### app.config.ts

The `app.config.ts` file contains the application configuration options. It includes the following options:

- `appTheme`: The theme options used to configure the application theme.

### nuxt.config.ts

The `nuxt.config.ts` file contains the Nuxt.js configuration options. It includes the following options:

- `app`: Configuration options related to the application.
- `theme`: The theme mode for the application.
- `css`: Additional CSS files to be included in the application.
- `modules`: Additional Nuxt.js modules to be used in the application.
- `typescript`: TypeScript configuration options.
- `vite`: Vite.js configuration options.

## Dependencies

The Blank Space application relies on the following dependencies:

- `@material/material-color-utilities`: Utilities for working with material colors.
- `@vueuse/core`: Collection of Vue.js composition utilities.
- `@vueuse/nuxt`: Nuxt.js plugin for VueUse composition utilities.
- `defu`: Deep merge utility for JavaScript objects.
- `localforage`: Library for using asynchronous storage (e.g., IndexedDB, WebSQL, localStorage).

Please refer to the `package.json` file for the exact versions of these dependencies.
