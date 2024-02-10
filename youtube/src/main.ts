
import {createApp} from 'vue';
import App from './App.vue';
// import './global.d.ts'

let isMobile = !document.querySelector('#Rightbar');
isMobile = false
let $section = document.createElement('section')
$section.id = 'vue-app'
document.body.append($section)
if (!isMobile) {
  let vueApp = createApp(App)
  vueApp.config.unwrapInjectedRef = true
  vueApp.mount($section);
}