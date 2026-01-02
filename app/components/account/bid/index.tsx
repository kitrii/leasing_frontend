import { defineComponent, ref, watch, computed } from "vue"
import { useRoute } from "#imports"
import axios from "axios"
import { toast } from "vue-sonner"

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "~/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"

import { useCustomAuthStore } from "~/stores/auth"

export default defineComponent({
    setup() {
        const auth = useCustomAuthStore()
        const userId = computed(() => auth.userId)
        const route = useRoute()

        /** ----------- СОСТОЯНИЯ ----------- */
        const equipmentMode = ref<"byId" | "byName">("byId")

        const equipment_id = ref("")
        const equipment_name = ref("")
        const equipment_price = ref(0)

        const search = ref("")
        const equipmentOptions = ref<
            { id: number; name: string; price: number }[]
        >([])
        const loadingEquipment = ref(false)

        const term_months = ref("")
        const advance = ref("")
        const rate = ref(20)
        const payment_scheme = ref("")

        const equipmentSelected = ref(false)


        /** ----------- ПОДТЯГИВАЕМ ID ИЗ QUERY ----------- */
        const equipmentIdFromQuery = computed(
            () => route.query.equipmentId as string | undefined
        )

        if (equipmentIdFromQuery.value) {
            equipmentMode.value = "byId"
            equipment_id.value = equipmentIdFromQuery.value
            fetchEquipmentById(equipmentIdFromQuery.value)
        }

        /** ----------- ЗАПРОСЫ ----------- */

        async function fetchEquipmentById(id: string) {
            if (!id) return
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/equipment/${id}`
                )
                equipment_name.value = data.data.name
                equipment_price.value = data.data.price
            } catch {
                equipment_name.value = "Оборудование не найдено"
                equipment_price.value = 0
            }
        }

        function filterByKeywords(
            items: { id: number; name: string; price: number }[],
            query: string
        ) {
            const keywords = query
                .toLowerCase()
                .split(" ")
                .map(w => w.trim())
                .filter(Boolean)

            return items.filter(item => {
                const name = item.name.toLowerCase()
                return keywords.every(word => name.includes(word))
            })
        }

        watch(
            () => search.value,
            async (value) => {
                if (equipmentMode.value !== "byName") return
                if (equipmentSelected.value) return   // ⬅ ВАЖНО
                if (value.length < 2) {
                    equipmentOptions.value = []
                    return
                }

                loadingEquipment.value = true
                try {
                    const res = await axios.get(
                        "http://localhost:8000/equipment",
                        { params: { query: value } }
                    )

                    const raw = res.data.data ?? res.data
                    equipmentOptions.value = filterByKeywords(raw, value)
                } catch (e) {
                    console.error("Ошибка поиска оборудования", e)
                    equipmentOptions.value = []
                } finally {
                    loadingEquipment.value = false
                }
            }
        )


        /** ----------- СОЗДАНИЕ ЗАЯВКИ ----------- */
        async function clickCreateBidButton() {
            if (
                !equipment_id.value ||
                !term_months.value ||
                !payment_scheme.value
            ) {
                toast.error("Заполните все обязательные поля")
                return
            }

            try {
                await axios.post("http://localhost:8000/api/leases/create", {
                    user_id: userId.value,
                    equipment_id: equipment_id.value,
                    amount: equipment_price.value,
                    term: term_months.value,
                    advance: advance.value,
                    rate: rate.value,
                    payment_scheme: payment_scheme.value,
                })

                toast.success("Заявка успешно создана")
            } catch (error) {
                console.error(error)
                toast.error("Ошибка при создании заявки")
            }
        }

        /** ----------- UI ----------- */
        return () => (
            <div class="flex flex-col gap-6 max-w-xl">
                <form>
                    <FieldGroup>
                        <div class="flex flex-col items-center gap-2 text-center">
                            <h1 class="text-xl font-bold">
                                Оставьте заявку на оборудование
                            </h1>
                            <FieldDescription>
                                Заполните форму для оформления лизинга
                            </FieldDescription>
                        </div>

                        {/* СПОСОБ ВЫБОРА */}
                        <Field>
                            <FieldLabel>Выбор оборудования</FieldLabel>
                            <Select
                                modelValue={equipmentMode.value}
                                onUpdate:modelValue={(v) =>
                                    (equipmentMode.value = v)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите способ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="byId">
                                        По ID
                                    </SelectItem>
                                    <SelectItem value="byName">
                                        По названию
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* ПО ID */}
                        {equipmentMode.value === "byId" && (
                            <Field>
                                <FieldLabel>ID оборудования</FieldLabel>
                                <Input
                                    type="number"
                                    placeholder="123"
                                    modelValue={equipment_id.value}
                                    onUpdate:modelValue={(v: string) => {
                                        equipment_id.value = v
                                        fetchEquipmentById(v)
                                    }}
                                />
                                {equipment_name.value && (
                                    <p class="text-sm text-muted-foreground">
                                        {equipment_name.value}
                                    </p>
                                )}
                            </Field>
                        )}

                        {/* ПО НАЗВАНИЮ */}
                        {equipmentMode.value === "byName" && (
                            <Field>
                                <FieldLabel>Оборудование</FieldLabel>
                                <Input
                                    placeholder="Начните вводить название..."
                                    modelValue={search.value}
                                    onUpdate:modelValue={(v: string) => {
                                        search.value = v
                                        equipmentSelected.value = false
                                        equipment_id.value = ""
                                        equipment_name.value = ""
                                        equipment_price.value = 0
                                    }}
                                />
                                {equipment_id.value && (
                                    <div class="text-sm text-muted-foreground mt-2 space-y-1">
                                        <div>
                                            <b>ID:</b> {equipment_id.value}
                                        </div>
                                    </div>
                                )}

                                {equipmentOptions.value.length > 0 && (
                                    <div class="border rounded-md mt-2 max-h-40 overflow-auto">
                                        {equipmentOptions.value.map((eq) => (
                                            <div
                                                key={eq.id}
                                                class="px-3 py-2 cursor-pointer hover:bg-muted"
                                                onClick={() => {
                                                    equipment_id.value = String(eq.id)
                                                    equipment_name.value = eq.name
                                                    equipment_price.value = eq.price

                                                    search.value = eq.name
                                                    equipmentSelected.value = true   // ⬅ блокируем watch
                                                    equipmentOptions.value = []      // ⬅ убираем выпадашку
                                                }}

                                            >
                                                {eq.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Field>
                        )}

                        <Field>
                            <FieldLabel>Первоначальный взнос</FieldLabel>
                            <Input type="number" placeholder="сумма первоначального взноса" modelValue={advance.value} onUpdate:modelValue={(v: string) => (advance.value = Number(v))} required/>
                        </Field>


                        <Field>
                            <FieldLabel>Срок (месяцы)</FieldLabel>
                            <Input type="number" placeholder="кол-во месяцев" modelValue={term_months.value} onUpdate:modelValue={(v: string) => (term_months.value = v)} required/>
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
