import AccountLayout from "~/components/layout/account-layout";
import AllBidsTable from "~/components/account/all-bids-table";
import {AccountBidsTable} from "#components";


export default defineComponent({
    setup() {
        return () => (
            <AccountLayout>
                <div class={'flex min-h-svh flex-col items-center'}>
                    <div class={'w-full'}>
                        <AllBidsTable/>
                    </div>
                </div>
            </AccountLayout>
        )
    }
})
