import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        userId: null as number | null,
    }),

    actions: {
        login(userId: number) {
            this.isAuthenticated = true
            this.userId = userId

            localStorage.setItem(
                'auth',
                JSON.stringify({ userId })
            )
        },

        logout() {
            this.isAuthenticated = false
            this.userId = null
            localStorage.removeItem('auth')
        },

        init() {
            const data = localStorage.getItem('auth')
            if (data) {
                const parsed = JSON.parse(data)
                this.isAuthenticated = true
                this.userId = parsed.userId
            }
        }
    }
})
