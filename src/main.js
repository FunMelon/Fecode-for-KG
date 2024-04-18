import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'default-passive-events'

const app = createApp(App);
app.use(Antd).mount('#app');
