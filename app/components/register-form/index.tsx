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
        function clickRegisterButton() {
            // Отправить POST-запрос
            axios({
                method: 'post',
                url: 'http://localhost:8000/register',
                data: {
                    email: email.value,
                    full_name: full_name.value,
                    phone: phone.value,
                    role: role.value,
                    password: password.value
                }
            }).then(function (response) {
                toast.success('Регистрация прошла успешно!')
            }).catch(function (error) {
                const message = 'При регистрации произошла ошибка! ';
                const detailed = error.response?.data?.detail || error.message || '';
                toast.error(`${message}${detailed}`);
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
                                Давайте знакомиться!
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
                            <FieldLabel>
                                Пароль
                            </FieldLabel>
                            <Input type={'password'} placeholder={'********'} modelValue={password.value} onUpdate:modelValue={(v: string) => (password.value = v)} required/>
                        </Field>
                        <FormField name={ 'behaviour' }>
                            {
                                ({ componentField }: { componentField: ComponentFieldBindingObject }) => (
                                    <FormItem>
                                        <FormLabel>Роль</FormLabel>
                                        <Select { ...componentField } modelValue={role.value}
                                                onUpdate:modelValue={(v: string) => (role.value = v)}>
                                            <FormControl>
                                                <SelectTrigger class={'w-full'}>
                                                    <SelectValue placeholder={ 'Выберите роль' } />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value={ 'Client' }>
                                                        Лизингополучатель
                                                    </SelectItem>
                                                    <SelectItem value={ 'Manager' }>
                                                        Лизингодатель
                                                    </SelectItem>
                                                    <SelectItem value={ 'Supplier' }>
                                                        Поставщик оборудования
                                                    </SelectItem>
                                                    <SelectItem value={ 'Admin' }>
                                                        Администратор
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )
                            }
                        </FormField>
                        <Field>
                        </Field>
                    </FieldGroup>
                </form>
                <Button onClick={clickRegisterButton}>
                    Зарегистрироваться
                </Button>
            </div>
        )
    }
})
