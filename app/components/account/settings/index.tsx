import {Field, FieldDescription, FieldGroup, FieldLabel} from "~/components/ui/field";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel} from "~/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type {ComponentFieldBindingObject} from "vee-validate";
import axios from "axios";
import {toast} from "vue-sonner";



export default defineComponent({
    setup() {
        const email = ref("")
        const full_name = ref("")
        const phone = ref("")
        const password = ref("")
        const role = ref("")
        function clickOnChangeProfileButton() {
            // Отправить POST-запрос
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/profile/update',
                data: {
                    email: email.value,
                    full_name: full_name.value,
                    phone: phone.value,
                    role: role.value,
                    password: password.value
                }
            }).then(function (response) {
                toast.success('Данные были изменены!')
            }).catch(function (error) {
                toast.error('При изменении данных произошла ошибка!')
            });

        }
        return() => (
            <div class={'flex flex-col gap-6'}>
                <form>
                    <FieldGroup>
                        <div class="flex flex-col items-center gap-2 text-center">
                            <h1 class="text-xl font-bold">
                                Профиль
                            </h1>
                            <FieldDescription>
                                Здесь хранятся настройки вашего профиля
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
                                ФИО
                            </FieldLabel>
                            <Input type={'text'} placeholder={'Иванов Иван Иванович'} modelValue={full_name.value} onUpdate:modelValue={(v: string) => (full_name.value = v)} required/>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Телефон
                            </FieldLabel>
                            <Input type={'phone'} placeholder={'+7 (999) 999-99-99'} modelValue={phone.value} onUpdate:modelValue={(v: string) => (phone.value = v)} required/>
                        </Field>
                        <Field>
                        </Field>
                    </FieldGroup>
                </form>
                <Button onClick={clickOnChangeProfileButton}>
                    Изменить данные профиля
                </Button>
            </div>
        )
    }
})
