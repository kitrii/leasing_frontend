import {Button} from "~/components/ui/button";
import {NuxtLink} from "#components";

export default defineComponent({
    setup() {
        const route = useRoute()
        const userId = computed(() => route.params.id)
        return () => (
            <nav class={'flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1'}>
                <Button class={'w-full text-left justify-start items-start'} variant={'ghost'} asChild>
                    <NuxtLink to={`/account/${userId.value}/addequipment`}>
                        Добавить оборудование
                    </NuxtLink>
                </Button>
                <Button class={'w-full text-left justify-start items-start'} variant={'ghost'} asChild>
                    <NuxtLink to={`/account/${userId.value}/settings`}>
                        Настройки
                    </NuxtLink>
                </Button>
            </nav>
        )
    },
})
