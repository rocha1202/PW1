import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Confirma que o alias '@' está apontando para o diretório correto
    },
  },
  test: {
    environment: "jsdom", // Certifique-se de que o ambiente seja jsdom
    globals: true, // Habilitar a função global 'it', 'describe', 'expect' etc.

  },
});
