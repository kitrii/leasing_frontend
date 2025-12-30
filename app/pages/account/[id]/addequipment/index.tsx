import { defineComponent, ref } from "vue"
import AccountLayout from "~/components/layout/account-layout";
import {AccountAddEquipment} from "#components";

// Енам для типов оборудования

export default defineComponent({
    setup() {
        return () => (
            <AccountLayout>
                <div class={'flex min-h-svh flex-col items-center'}>
                    <div class={'w-full'}>
                        <AccountAddEquipment/>
                    </div>
                </div>
            </AccountLayout>
        )
    }
})
