import {RegisterForm} from "#components";


export default defineComponent({
    setup() {
        return() => (
            <div class={'flex min-h-svh flex-col items-center justify-center gap-6 p-6'}>
                <div class={'w-full max-w-sm'}>
                    <RegisterForm/>
                </div>
            </div>
        )
    }
})
