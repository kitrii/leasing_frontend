import { defineComponent, ref, watch } from "vue"
import {Field, FieldDescription, FieldGroup, FieldLabel} from "~/components/ui/field"
import {Input} from "~/components/ui/input"
import {Button} from "~/components/ui/button"
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import type {ComponentFieldBindingObject} from "vee-validate"
import axios from "axios"
import {toast} from "vue-sonner"
import { useAuthStore } from "~/stores/auth"
import { computed } from "vue"

export default defineComponent({
    setup() {
        const equipment_id = ref("")
        const term_months = ref("")
        const advance = ref(0) // первоначальный взнос
        const rate = ref(20) // фиксированная ставка 20%
        const payment_scheme = ref("")
        const amount = ref(0) // стоимость оборудования из базы
        const auth = useAuthStore()
        const userId = computed(() => auth.userId)

        // При вводе ID оборудования подгружаем его стоимость
        watch(equipment_id, async (id) => {
            if (!id) {
                amount.value = 0
                return
            }
            try {
                const response = await axios.get(`http://localhost:8000/equipment/${id}`)
                amount.value = response.data.price
            } catch (error) {
                console.error("Ошибка при получении стоимости оборудования", error)
                amount.value = 0
            }
        })

        async function clickCreateBidButton() {
            if (!equipment_id.value || !term_months.value || !payment_scheme.value) {
                toast.error("Заполните все обязательные поля!")
                return
            }

            try {
                await axios.post("http://localhost:8000/api/leases/create", {
                    user_id: userId.value,
                    advance: advance.value,
                    amount: amount.value,
                    equipment_id: equipment_id.value,
                    term: term_months.value,
                    rate: rate.value,
                    payment_scheme: payment_scheme.value
                })
                toast.success('Заявка создана успешно!')
            } catch (error) {
                console.error(error)
                toast.error('Ошибка при создании заявки!')
            }
        }

        return () => (
            <div class={'flex flex-col gap-6'}>
                <form>
                    <FieldGroup>
                        <div class="flex flex-col items-center gap-2 text-center">
                            <a href="#" class="flex flex-col items-center gap-2 font-medium">
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
                            <FieldLabel>Id оборудования</FieldLabel>
                            <Input type="text" placeholder="1234" modelValue={equipment_id.value} onUpdate:modelValue={(v: string) => (equipment_id.value = v)} required/>
                        </Field>

                        <Field>
                            <FieldLabel>Срок (месяцы)</FieldLabel>
                            <Input type="number" placeholder="10" modelValue={term_months.value} onUpdate:modelValue={(v: string) => (term_months.value = v)} required/>
                        </Field>

                        <Field>
                            <FieldLabel>Первоначальный взнос</FieldLabel>
                            <Input type="number" placeholder="100000" modelValue={advance.value} onUpdate:modelValue={(v: string) => (advance.value = Number(v))} required/>
                        </Field>

                        <Field>
                            <FieldLabel>Ставка % (фиксированная 20%)</FieldLabel>
                            <Input type="number" modelValue={rate.value} disabled />
                        </Field>

                        <FormField name="behaviour">
                            {({ componentField }: { componentField: ComponentFieldBindingObject }) => (
                                <FormItem>
                                    <FormLabel>Схема платежа</FormLabel>
                                    <Select {...componentField} modelValue={payment_scheme.value} onUpdate:modelValue={(v: string) => (payment_scheme.value = v)}>
                                        <FormControl>
                                            <SelectTrigger class={'w-full'}>
                                                <SelectValue placeholder={'Выберите тип платежа'} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value={'annuity'}>Аннуитет</SelectItem>
                                                <SelectItem value={'differentiated'}>Дифференцированная</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        </FormField>
                    </FieldGroup>
                </form>

                <Button onClick={clickCreateBidButton}>
                    Создать заявку
                </Button>
            </div>
        )
    }
})
