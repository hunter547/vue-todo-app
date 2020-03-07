import Vue from 'vue'
import App from './App.vue'
import { MdField, MdButton, MdList, MdCheckbox, MdIcon, MdCard } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css'

Vue.use(MdField);
Vue.use(MdButton);
Vue.use(MdList);
Vue.use(MdCheckbox);
Vue.use(MdIcon);
Vue.use(MdCard);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
