import {Button} from "~/components/ui/button";
import {NuxtLink} from "#components";

export default defineComponent({
    setup() {
        return () => (
            <nav class={'flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1'}>
                <Button class={'w-full text-left justify-start items-start'} variant={'ghost'} asChild>
                    <NuxtLink to={'/account/{id}/createbid'}>Создать заявку</NuxtLink>
                </Button>
                <Button class={'w-full text-left justify-start items-start'} variant={'ghost'} asChild>
                    <NuxtLink to={'/account/{id}/bids'}>
                        Мои заявки
                    </NuxtLink>
                </Button>
                <Button class={'w-full text-left justify-start items-start'} variant={'ghost'} asChild>
                    <NuxtLink to={'/account/{id}/payments'}>Платежи</NuxtLink>
                </Button>
                <Button class={'w-full text-left justify-start items-start'} variant={'ghost'} asChild>
                    <NuxtLink to={'/account/{id}/settings'}>
                        Настройки
                    </NuxtLink>
                </Button>
                <Button class={'w-full text-left justify-start items-start'} variant={'outline'} asChild>
                    <NuxtLink>
                        Выйти
                    </NuxtLink>
                </Button>
            </nav>
        )
    },
})
