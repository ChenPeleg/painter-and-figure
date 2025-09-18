import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path';

export default defineConfig({
    server : {
        port : 4000,
    },

    base: '',
    publicDir: path.resolve(process.cwd(), 'public'),
    plugins: [tailwindcss(),
    ],
    define: {
        'import.meta.env.VITE_BUILD_DATE': JSON.stringify(new Date().toISOString()),
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
    },
    root: './html/index.html',


});
