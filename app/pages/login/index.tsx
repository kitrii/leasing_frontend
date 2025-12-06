import {RegisterForm} from "#components";
import Login from "~/pages/login/index";
import LoginForm from "~/components/login-form";


export default defineComponent({
    setup() {
        return() => (
            <div class={'flex min-h-svh flex-col items-center justify-center gap-6 p-6'}>
                <div class={'w-full max-w-sm'}>
                    <LoginForm/>
                </div>
            </div>
        )
    }
})
