import {Field, FieldDescription, FieldGroup, FieldLabel} from "~/components/ui/field";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";


export default defineComponent({
    setup() {
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
                            <Input type={'email'} placeholder={'example@email.com'} required/>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Пароль
                            </FieldLabel>
                            <Input type={'password'} placeholder={'********'} required/>
                        </Field>
                        <Field>
                            <Button type="submit">
                                Войти
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        )
    }
})
