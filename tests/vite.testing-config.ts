import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path';
import fs from 'node:fs/promises';

export default defineConfig(({ command,
                                 mode
                             } )=>{
    const defaultConfig = {   server : {
            port : 4000,
            open : './html/index.html',
        },

        base: '',
        publicDir: path.resolve(process.cwd(), 'public'),
        plugins: [tailwindcss(),
            {
                name: 'configure-response-headers',
                apply: "serve", //   docs:
                //   https://vitejs.dev/guide/api-plugin.html#conditional-application
                async transformIndexHtml(html) {


                    switch (mode) {
                        case "contrast_dev": {
                            const content = await fs.readFile(
                                "./index-contrast.html",
                                "utf8"
                            );
                            return { html: content, [] };
                        }
                        case "uncontrast_dev": {
                            const content = await fs.readFile(
                                "./index-uncontrast.html",
                                "utf8"
                            );
                            return { html: content, [] };
                        }
                    }

                    return html;
                },

            }

        ],
        define: {
            'import.meta.env.VITE_BUILD_DATE': JSON.stringify(new Date().toISOString()),
            'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
        },
    }
    return defaultConfig


});
