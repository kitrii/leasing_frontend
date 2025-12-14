import Sidebar from "~/components/sidebar-app-menu/sidebar-app-menu-create-order";


export default defineComponent({
    setup(_, {slots}) {
        return () => (
            <div class={ 'min-w-0 w-full h-full flex-1 overflow-x-auto p-4' }>
                <Sidebar/>
                { slots.default?.() }
            </div>
        )
    }

})