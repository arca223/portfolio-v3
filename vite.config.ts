import { fileURLToPath, URL } from 'node:url'
import { Buffer } from 'node:buffer'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

/**
 * Obfuscates the contact email so it never appears as plain text in the bundle:
 * reverse the string, then base64. Decoded in the browser by `revealContactEmail()`.
 */
function encodeContactEmail(email: string): string {
  return Buffer.from([...email].reverse().join(''), 'utf8').toString('base64')
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Empty prefix: also loads non-VITE_ vars (from .env.local or the CI environment).
  // CONTACT_EMAIL is deliberately NOT prefixed with VITE_, which would inline it in plain text.
  const env = loadEnv(mode, process.cwd(), '')
  const contactEmail = (env.CONTACT_EMAIL ?? '').trim()

  if (command === 'build' && contactEmail === '') {
    console.warn(
      '\n\x1b[33m[contact] CONTACT_EMAIL is not set: the built site will not show an email address.\n' +
        '          Set it in .env.local (see .env.example) or in the CI environment.\x1b[0m\n',
    )
  }

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __CONTACT_EMAIL_ENC__: JSON.stringify(contactEmail ? encodeContactEmail(contactEmail) : ''),
    },
  }
})
