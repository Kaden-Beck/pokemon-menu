import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        pokemon_details: resolve(__dirname, 'src/pokemon-details/index.html' )
      },
    },
  },
});
