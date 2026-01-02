import { useCustomAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
    const auth = useCustomAuthStore()
    auth.init()
})
