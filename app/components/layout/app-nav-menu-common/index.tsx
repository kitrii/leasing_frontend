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
                            <NavigationMenuTrigger>Каталог оборудования</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to={'/calculator'}>Металлообрабатывающее</NuxtLink>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to={'/calculator'}>Энергетическое</NuxtLink>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to={'/calculator'}>Горнодобывающее</NuxtLink>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to={'/calculator'}>Фармацевтическое</NuxtLink>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to={'/calculator'}>Строительное</NuxtLink>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to={'/calculator'}>Деревообрабатывающее</NuxtLink>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <NuxtLink to={'/calculator'}>Металлургическое</NuxtLink>
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NuxtLink to={'/calculator'}>Калькулятор</NuxtLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NuxtLink to={'/information'}>Общая информация</NuxtLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        )
    }
})