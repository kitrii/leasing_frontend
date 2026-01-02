import { useCustomAuthStore } from '~/stores/auth'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {NuxtLink} from "#components";

export default defineComponent({
    setup() {
        const auth = useCustomAuthStore()
        const router = useRouter()

        const logout = () => {
            auth.logout()
            router.push('/')
        }

        return () => (
            <NavigationMenu>
                <NavigationMenuList>
                    {!auth.isAuthenticated ? (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to="/login">Вход</NuxtLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to="/register">Регистрация</NuxtLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    ) : (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to={`/account/${auth.userId}`}>
                                        Личный кабинет
                                    </NuxtLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink onClick={logout}>
                                    Выйти
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        )
    }
})
