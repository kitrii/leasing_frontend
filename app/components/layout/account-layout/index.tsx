import SidebarAppMenu from "~/components/layout/sidebar-app-menu";
import {Separator} from "~/components/ui/separator";

export default defineComponent({
    setup(_, {slots}) {
        function onButtonClick() {

        }

        return () => (
            <div class={'pb-16 space-y-6'}>
                <div class={'space-y-0.5'}>
                    <h2 class={'text-2xl font-bold tracking-tight'}>
                        Личный кабинет
                    </h2>
                    <p class={'text-muted-foreground'}>
                        Личный кабинет юзера, Катя потом что-нибудь придумает обязательно
                    </p>
                </div>
                <Separator/>
                <div class={'flex flex-col lg:flex-row space-y-6 lg:space-x-12 lg:space-y-0'}>
                    <div class={'w-full overflow-x-auto pb-2 lg:w-1/6 lg:pb-0'}>
                        <SidebarAppMenu/>
                    </div>
                    <div class={'flex-1 lg:max-w-2xl'}>
                        <div class={'space-y-6'}>
                            { slots.default?.() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
