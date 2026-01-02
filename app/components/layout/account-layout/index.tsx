import SidebarClient from "~/components/layout/sidebar-client"
import SidebarSupplier from "~/components/layout/sidebar-supplier"
import SidebarManager from "~/components/layout/sidebar-manager"
import { Separator } from "~/components/ui/separator"
import { useCustomAuthStore } from '~/stores/auth'
import {Loader} from "lucide-vue-next";

export default defineComponent({
    setup(_, { slots }) {
        const auth = useCustomAuthStore()


        const SidebarByRole = computed(() => {
            if (!auth.isReady) {
                return <Loader />
            }

            switch (auth.role) {
                case 'supplier':
                    return <SidebarSupplier />
                case 'manager':
                    return <SidebarManager />
                case 'client':
                    return <SidebarClient />
                default:
                    return null
            }
        })


        return () => (
            <div class="pb-16 space-y-6 w-full">
                <div class="space-y-0.5">
                    <h2 class="text-2xl font-bold tracking-tight">Личный кабинет</h2>
                    <p class="text-muted-foreground">
                        Управление аккаунтом
                    </p>
                </div>

                <Separator />

                <div class="flex gap-12">
                    {/* SIDEBAR */}
                    <aside class="w-64 shrink-0">
                        {SidebarByRole.value}
                    </aside>

                    {/* CONTENT */}
                    <main class="flex-1 w-full">
                        {slots.default?.()}
                    </main>
                </div>
            </div>
        )
    },
})
