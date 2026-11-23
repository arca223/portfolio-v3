import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'
import './assets/main.css'

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('reveal', vReveal)

app.mount('#app')
