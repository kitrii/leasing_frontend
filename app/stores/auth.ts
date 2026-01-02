import { defineStore } from 'pinia'

export const useCustomAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        userId: null as number | null,
        role: null as 'client' | 'supplier' | 'manager' | null,
        isReady: false, // 👈 ВАЖНО
    }),

    actions: {
        login(userId: number, role: 'client' | 'supplier' | 'manager') {
            this.isAuthenticated = true
            this.userId = userId
            this.role = role

            localStorage.setItem(
                'auth',
                JSON.stringify({ userId, role })
            )
        },

        logout() {
            this.isAuthenticated = false
            this.userId = null
            this.role = null
            this.isReady = false
            localStorage.removeItem('auth')
        },

        init() {
            const data = localStorage.getItem('auth')
            if (data) {
                const parsed = JSON.parse(data)
                this.isAuthenticated = true
                this.userId = parsed.userId
                this.role = parsed.role ?? null
            }
            this.isReady = true // 👈 ТОЛЬКО ЗДЕСЬ
        }
    }
})
