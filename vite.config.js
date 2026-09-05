import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js', 'resources/js/auth.tsx', 'resources/js/register.tsx', 'resources/js/landing.tsx', 'resources/js/vendor-registration.tsx', 'resources/js/terms.tsx', 'resources/js/privacy.tsx', 'resources/js/rfq.tsx', 'resources/js/about.tsx', 'resources/js/trading.tsx', 'resources/js/tender.tsx', 'resources/js/consolidation.tsx', 'resources/js/industries-page.tsx', 'resources/js/contact.tsx', 'resources/js/track.tsx', 'resources/js/dashboard.tsx', 'resources/js/admin.tsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
