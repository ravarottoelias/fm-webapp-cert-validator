import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importar los estilos de Bootstrap
import './assets/scss/custom.scss'

import 'bootstrap-icons/font/bootstrap-icons.css'

// Importar JavaScript de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
