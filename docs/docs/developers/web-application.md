---
sidebar_position: 5
---

# Web Application

The last step to be able to develop in the Revelations platform is your understanding of how the Web Application works!

## ReactJS

ReactJS is an open source framework mantained by Meta (formerly known as Facebook) which supports a rich ecosystem of libraries, like Redux Toolkit and React Query, which are both used in this platform!

:::tip Check the docs

Check out the docs in each one of them:

1. [ReactJS](https://reactjs.org/)
2. [Redux Toolkit](https://redux-toolkit.js.org/)
3. [React Query](https://react-query-v3.tanstack.com/)

:::

## TailwindCSS

TailwindCSS motto is "rapidly build modern websites without ever leaving your HTML". And that's what it does!

:::tip Tailwind components we are followind

1. [WindUI](https://wind-ui.com/)
2. [Tailwind Components](https://tailwindcomponents.com/)

:::

## Structure

```
.
├── Dockerfile
├── package.json
├── package-lock.json
├── public
│   ├── about.txt
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── site.webmanifest
├── README.md
├── src
│   ├── app
│   │   ├── hooks.ts
│   │   ├── keycloakConfig.ts
│   │   └── store.ts
│   ├── App.scss
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── Add your components here!
│   ├── index.tsx
│   ├── interfaces
│   │   ├── Add the interfaces needed here!
│   ├── pages
│   │   └── Add your pages here!
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── tailwind.config.js
└── tsconfig.json
```

:::danger Try to follow the structure

No code will be accepted that doesn't follow the structure to the core!

:::

## Example - Containers
