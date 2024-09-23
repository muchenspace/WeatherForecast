import { createRouter, createWebHistory } from "vue-router"

import settingsVue from "../views/settings.vue"
import mainMenu from "../views/layout.vue"

const routes = [
    {
        path: "/", component: mainMenu
    },
    {
        path: "/settings", component: settingsVue
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router