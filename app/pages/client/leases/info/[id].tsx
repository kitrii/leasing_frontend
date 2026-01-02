import AccountLayout from "~/components/layout/account-layout";
import AccountClientBidInfo from "~/components/account/client-bid-info/[id]";


export default defineComponent({
    setup() {
        return () => (
            <AccountLayout>
                <div class={'flex min-h-svh flex-col items-center'}>
                    <div class={'w-full'}>
                        <AccountClientBidInfo/>
                    </div>
                </div>
            </AccountLayout>
        )
    }
})
