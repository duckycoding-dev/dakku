# [shadcn/ui](https://ui.shadcn.com/)

I use shadcn/ui for faster ui development as this provides many ready-to-go components that I can just copy and paste or, better, add to our codebase via CLI.

The way the CLI works is defined in the `components.json` file, in the root of the `frontend` app: I defined a directory called `shadcn`, inside of the `src` folder, in which everything will be added (I've renamed the default `lib` to `shadcn` for easier logical imports, as this is the first time I'm using shadcn)

To do so I've followed the basic guide which, in short, just took a few simple command to run.

- `npm install tailwindcss @tailwindcss/vite`
- Update the `vite.config.ts` as follows

```
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- Update the `tsconfig.json` by adding the pathssame paths symbol used in the Vite configs above

```
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    ...
    "paths": {
      "@/*": ["./src/*"]
    },
    ...
  }
  ...
}
```

- Create the `style.css` and import tailwind css by adding `@import 'tailwindcss';`
- `npx shadcn@canary init`: this creates the `lib` folder and the `components.json` file for shadcn
- I've renamed the `lib` folder to `shacn` and updated the `components.json` aliases accordingly

```
  ...
  "aliases": {
    "components": "@/shadcn/components",
    "utils": "@/shadcn/lib/utils",
    "ui": "@/shadcn/components/ui",
    "lib": "@/shadcn/lib",
    "hooks": "@/shadcn/hooks"
  },
  ...
```

- Finally add the first shacn component: `npx shadcn@canary add button`
