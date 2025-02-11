import { createRouter, createWebHistory } from 'vue-router'
import FormBuilder from '../pages/FormBuilder.vue'
import DynamicForm from '../pages/DynamicForm.vue'
import FormResults from '../pages/FormResults.vue'

const routes = [
  { path: '/', component: FormBuilder },
  { path: '/form', component: DynamicForm },
  { path: '/dynamic-form/:id', component: DynamicForm, props: true },
  { path: '/form-results', component: FormResults }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
