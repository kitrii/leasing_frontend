import AccountLayout from "~/components/layout/account-layout";
import AccountBid from "~/components/account/bid";


export default defineComponent({
    setup() {
        return () => (
            <AccountLayout>
                <div class={'flex min-h-svh flex-col items-center'}>
                    <div class={'w-full max-w-sm'}>
                        <AccountBid/>
                    </div>
                </div>
            </AccountLayout>
        )
    }
})
