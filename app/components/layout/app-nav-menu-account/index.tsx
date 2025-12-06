import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import {NuxtLink} from "#components";


export default defineComponent({
    setup() {
        return () => (
            <div>
                <NavigationMenu>
                    <NavigationMenuList class={'flex-wrap'}>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NuxtLink to={'/login'}>Вход</NuxtLink>
                            </NavigationMenuLink>

                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NuxtLink to={'/register'}>Регистрация</NuxtLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        )
    }
})