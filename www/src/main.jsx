import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import {ThemeProvider} from './components/theme-provider';

const pages = import.meta.glob('./pages/**/*.tsx');

document.addEventListener('DOMContentLoaded', () => {

  createInertiaApp({
    resolve: async (name) => {
      const pagePath = `./pages/${name}.tsx`;
      const pageLoader = pages[pagePath];
      if (!pageLoader) {
        throw new Error(`Page not found: ${name}`);
      }
      const page = await pageLoader();
      return page.default;
    },
    setup({ el, App, props }) {
      const root = createRoot(el);
      root.render(
        <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
          <App {...props} />
        </ThemeProvider>

    );
    }
  });
});

