import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const resolveAliases = {
  '~icons': '/src/assets/icons',
  '~types': '/src/types',
  '~hooks': '/src/hooks',
  '~pages': '/src/pages',
  '~constants': '/src/constants',
  '~services': '/src/services',
  '~utils': '/src/utils',
  '~atoms': '/src/components/atoms',
  '~molecules': '/src/components/molecules',
  '~organisms': '/src/components/organisms',
  '~': '/src',
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
    },
    plugins: [react()],
    resolve: {
      alias: resolveAliases,
    },
  };
});
