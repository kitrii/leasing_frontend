
import AppNavMenuAccount from "~/components/layout/app-nav-menu-account";
import AppNavMenu from "~/components/layout/app-nav-menu/index";
import AppNavMenuHeader from "~/components/layout/app-nav-menu-header";
import AppNavMenuCommon from "~/components/layout/app-nav-menu-common";


export default defineComponent({
    setup() {
        return () => (
            <div class={'flex items-center justify-between gap-4'}>
                <AppNavMenuHeader/>
                <AppNavMenuCommon/>
                <AppNavMenuAccount/>

            </div>

        )
    }
})