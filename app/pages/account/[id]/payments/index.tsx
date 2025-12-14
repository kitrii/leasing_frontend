import AccountLayout from "~/components/layout/account-layout";
import AccountPayments from "~/components/account/payments";


export default defineComponent({
    setup() {
        return () => (
            <AccountLayout>
                <div class={'flex min-h-svh flex-col items-center'}>
                    <div class={'w-full'}>
                        <AccountPayments/>
                    </div>
                </div>
            </AccountLayout>
        )
    }
})
