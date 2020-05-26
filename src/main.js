import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'

let app = createApp(App)


window.mitt = mitt()

// // 定义中央事件总线
// var EventBus = new Vue()

// // 将中央事件总线赋值到Vue.prototype上，这样所有组件都能访问到了
// Vue.prototype.$EventBus = EventBus
//.use(router)
app.use(store).mount('#app')
