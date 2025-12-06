import AppNavMenu from "~/components/layout/app-nav-menu";


export default defineComponent({
    setup(_, {slots}) {
        return () => (
            <div class={ 'min-w-0 w-full h-full flex-1 overflow-x-auto p-4' }>
                <AppNavMenu/>
                { slots.default?.() }
            </div>
        )
    }

})