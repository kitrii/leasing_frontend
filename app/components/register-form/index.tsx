import {Field, FieldDescription, FieldGroup, FieldLabel} from "~/components/ui/field";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel} from "~/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type {ComponentFieldBindingObject} from "vee-validate";



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
                                Давайте знакомиться!
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
                                ФИО
                            </FieldLabel>
                            <Input type={'text'} placeholder={'Иванов Иван Иванович'} required/>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Телефон
                            </FieldLabel>
                            <Input type={'phone'} placeholder={'+7 (999) 999-99-99'} required/>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Пароль
                            </FieldLabel>
                            <Input type={'password'} placeholder={'********'} required/>
                        </Field>
                        <FormField name={ 'behaviour' }>
                            {
                                ({ componentField }: { componentField: ComponentFieldBindingObject }) => (
                                    <FormItem>
                                        <FormLabel>Роль</FormLabel>
                                        <Select { ...componentField }>
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
                            <Button type="submit">
                                Зарегистрироваться
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        )
    }
})
