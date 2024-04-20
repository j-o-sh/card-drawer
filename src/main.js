import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'

const sfcComponents = import.meta.glob('./components/**/*.vue');
const app = createApp(App)

for (const [path, cmp] of Object.entries(sfcComponents)) {
  const name = path.match(/(\w+).vue$/)[1]
  app.component(name, defineAsyncComponent(cmp))
}

app.mount('#app')
