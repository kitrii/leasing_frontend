import AccountLayout from "~/components/layout/account-layout";
import AccountSettings from "~/components/account/settings";


export default defineComponent({
    setup() {
        return () => (
            <AccountLayout>
                <div class={'flex min-h-svh flex-col items-center'}>
                    <div class={'w-full'}>
                        <AccountSettings/>
                    </div>
                </div>
            </AccountLayout>
        )
    }
})
