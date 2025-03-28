import { vercelPreset } from '@vercel/react-router/vite';
 
export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  presets: [vercelPreset()],
};