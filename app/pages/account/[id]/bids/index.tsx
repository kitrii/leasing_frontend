import AccountLayout from "~/components/layout/account-layout";
import AccountBid from "~/components/account/bids-table";
import {AccountBidsTable} from "#components";


export default defineComponent({
    setup() {
        return () => (
            <AccountLayout>
                <div class={'flex min-h-svh flex-col items-center'}>
                    <div class={'w-full'}>
                        <AccountBidsTable/>
                    </div>
                </div>
            </AccountLayout>
        )
    }
})
