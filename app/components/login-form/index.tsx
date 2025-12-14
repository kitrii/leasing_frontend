import {Field, FieldDescription, FieldGroup, FieldLabel} from "~/components/ui/field";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import axios from "axios"
import {toast} from "vue-sonner";


export default defineComponent({
    setup() {
        const router = useRouter()
        const email = ref("")
        const password = ref("")

        function clickLoginButton() {
            // Отправить POST-запрос
            const response = axios({
                method: 'post',
                url: 'http://localhost:8000/login',
                data: {
                    email: email.value,
                    password: password.value
                }
            }).then(function (redirectToUserAccount) {
                const userId = redirectToUserAccount.data.user_id
                router.push('/account/${userId}')
            }).catch(function (error) {
                toast.error('При входе возникла ошибка!')
            });

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
                <Button onClick={clickLoginButton}>
                    Войти
                </Button>
            </div>
        )
    }
})

