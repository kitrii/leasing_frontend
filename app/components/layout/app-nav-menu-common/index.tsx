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

const equipmentCategories = [
    {
        key: "metalworking",
        title: "Металлообрабатывающее",
        examples: ["Токарные станки", "Фрезерные", "ЧПУ", "Лазерная резка"],
    },
    {
        key: "energy",
        title: "Энергетическое",
        examples: ["Генераторы", "Турбины", "Котлы", "Трансформаторы"],
    },
    {
        key: "mining",
        title: "Горнодобывающее",
        examples: ["Экскаваторы", "Дробилки", "Конвейеры"],
    },
    {
        key: "pharma",
        title: "Фармацевтическое",
        examples: ["Реакторы", "Смесители", "Таблеточные линии"],
    },
    {
        key: "construction",
        title: "Строительное",
        examples: ["Краны", "Бетоносмесители", "Асфальтоукладчики"],
    },
    {
        key: "wood",
        title: "Деревообрабатывающее",
        examples: ["Пилорамы", "Фрезы", "Прессы"],
    },
    {
        key: "metallurgy",
        title: "Металлургическое",
        examples: ["Печи", "Прокатные станы"],
    },
]

export default defineComponent({
    setup() {
        return () => (
            <div>
                <NavigationMenu>
                    <NavigationMenuList class={'flex-wrap'}>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Каталог оборудования</NavigationMenuTrigger>
                            <NavigationMenuContent class="grid">
                                {equipmentCategories.map((cat) => (
                                    <NavigationMenuLink asChild key={cat.key}>
                                        <NuxtLink
                                            to={`/equipment/${cat.key}`}
                                            class="block rounded-md p-3 hover:bg-muted"
                                        >
                                            <div class="font-medium">{cat.title}</div>
                                            <div class="text-sm text-muted-foreground">
                                                {cat.examples.join(", ")}
                                            </div>
                                        </NuxtLink>
                                    </NavigationMenuLink>
                                ))}
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