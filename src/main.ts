import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';
import Aura from '@primevue/themes/aura'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
      preset: Aura,
      options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
      }
  }
});
app.mount('#app');
