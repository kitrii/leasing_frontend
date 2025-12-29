import {Field, FieldDescription, FieldGroup, FieldLabel} from "~/components/ui/field";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {useAuthStore} from "~/stores/auth";
import axios from "axios"
import {toast} from "vue-sonner";


export default defineComponent({
    setup() {
        const router = useRouter()
        const email = ref("")
        const password = ref("")
        const auth = useAuthStore()

        async function clickLoginButton() {
            console.log('LOGIN CLICK')
            try {
                const response = await axios.post('http://localhost:8000/login', {
                    email: email.value,
                    password: password.value,
                })
                console.log(response.data)
                const userId = response.data.user_id
                auth.login(userId)
                router.push(`/account/${userId}`)
            } catch (error) {
                toast.error('При входе возникла ошибка!')
            }
        }

        return() => (
            <div class={'flex flex-col gap-6'}>
                <form>
                    <FieldGroup>
                        <div class="flex flex-col items-center gap-2 text-center">
                            <a
                                href="#"
                                class="flex flex-col items-center gap-2 font-medium"
                            >
                                <span class="sr-only">Лизингомания</span>
                            </a>
                            <h1 class="text-xl font-bold">
                                Welcome to ASS!
                            </h1>
                            <FieldDescription>
                                Давайте войдём!
                            </FieldDescription>
                        </div>
                        <Field>
                            <FieldLabel>
                                Email
                            </FieldLabel>
                            <Input type={'email'} placeholder={'example@email.com'} modelValue={email.value} onUpdate:modelValue={(v: string) => (email.value = v)} required/>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Пароль
                            </FieldLabel>
                            <Input type={'password'} placeholder={'********'} modelValue={password.value} onUpdate:modelValue={(v: string) => (password.value = v)} required/>
                        </Field>
                        <Field>
                        </Field>
                    </FieldGroup>
                </form>
                <Button type="button" onClick={clickLoginButton}>
                    Войти
                </Button>
            </div>
        )
    }
})

