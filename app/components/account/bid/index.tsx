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
        const equipment_id = ref("")
        const term_months = ref("")
        const rate = ref("")
        const payment_scheme = ref("")
        const auth = useAuthStore()
        const userId = computed(() => auth.userId)
        function clickCreateBidButton() {
            // Отправить POST-запрос
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/leases/create',
                data: {
                    user_id: userId.value,
                    advance: 100,
                    amount: 200000,
                    equipment_id: equipment_id.value,
                    term: term_months.value,
                    rate: rate.value,
                    payment_scheme: payment_scheme.value
                }
            }).then(function (response) {
                toast.success('Заявка создана успешно!')
            }).catch(function (error) {
                toast.error('Ошибка при создании заявки!')
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
                                Оставьте заявку на оборудование!
                            </h1>
                            <FieldDescription>
                                Заполните форму!
                            </FieldDescription>
                        </div>
                        <Field>
                            <FieldLabel>
                                Id оборудования
                            </FieldLabel>
                            <Input type={'equipmentId'} placeholder={'1234'} modelValue={equipment_id.value} onUpdate:modelValue={(v: string) => (equipment_id.value = v)} required/>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Срок (месяцы)
                            </FieldLabel>
                            <Input type={'months'} placeholder={'10'} modelValue={term_months.value} onUpdate:modelValue={(v: string) => (term_months.value = v)} required/>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Ставка %
                            </FieldLabel>
                            <Input type={'rate'} placeholder={'13%'} modelValue={rate.value} onUpdate:modelValue={(v: string) => (rate.value = v)} required/>
                        </Field>
                        <FormField name={ 'behaviour' }>
                            {
                                ({ componentField }: { componentField: ComponentFieldBindingObject }) => (
                                    <FormItem>
                                        <FormLabel>Схема платежа</FormLabel>
                                        <Select { ...componentField } modelValue={payment_scheme.value}
                                                onUpdate:modelValue={(v: string) => (payment_scheme.value = v)}>
                                            <FormControl>
                                                <SelectTrigger class={'w-full'}>
                                                    <SelectValue placeholder={ 'Выберите тип платежа' } />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value={ 'annuity' }>
                                                        Аннуитет
                                                    </SelectItem>
                                                    <SelectItem value={ 'differentiated' }>
                                                        Дифференцированная
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
                <Button onClick={clickCreateBidButton}>
                    Создать заявку
                </Button>
            </div>
        )
    }
})
