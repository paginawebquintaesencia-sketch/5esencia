# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## Configuración de Supabase

- Crea un proyecto en Supabase y obtiene tu `Project URL` y `anon key`.
- Copia `.env.example` a `.env.local` y completa las variables:

```
VITE_SUPABASE_URL="https://YOUR-PROJECT-REF.supabase.co"
VITE_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
```

- En desarrollo, Vite cargará automáticamente las variables con el prefijo `VITE_`.
- En producción (Vercel), define las mismas variables en `Project Settings > Environment Variables`.
- El cliente se inicializa en `src/lib/supabaseClient.js` y puedes importarlo así:

```
import supabase from './utils/supabase'

// Ejemplo: iniciar sesión con correo y contraseña
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'tu@correo.com',
  password: 'tu-contraseña',
})
```

- Si las variables no están configuradas, verás un `console.warn` indicando que faltan.
