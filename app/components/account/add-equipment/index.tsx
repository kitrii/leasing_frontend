import { defineComponent, ref } from "vue"
import { Field, FieldLabel, FieldGroup, FieldDescription } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "~/components/ui/select"
import { toast } from "vue-sonner"
import axios from "axios"

// Енам для типов оборудования
enum EquipmentType {
    Metalworking = "metalworking",
    Energy = "energy",
    Mining = "mining",
    Construction = "construction",
    Wood = "wood",
    Metallurgy = "metallurgy"
}


export default defineComponent({
    setup() {
        const type = ref<EquipmentType | "">("")
        const name = ref("")
        const description = ref("")
        const price = ref<number | null>(null)
        const power = ref<number | null>(null)
        const year = ref<number | null>(null)
        const imageFile = ref<File | null>(null)

        const createEquipment = async () => {
            if (!type.value || !name.value || !price.value) {
                toast.error("Заполните обязательные поля")
                return
            }

            const formData = new FormData()
            formData.append("type", type.value)
            formData.append("name", name.value)
            formData.append("description", description.value ?? "")
            formData.append("price", String(price.value))
            if (power.value) formData.append("power", String(power.value))
            if (year.value) formData.append("year", String(year.value))
            if (imageFile.value) formData.append("image", imageFile.value)

            try {
                await axios.post("http://localhost:8000/equipment/create", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                toast.success("Оборудование успешно добавлено")
                // Сброс формы
                type.value = ""
                name.value = ""
                description.value = ""
                price.value = null
                power.value = null
                year.value = null
                imageFile.value = null
            } catch (err) {
                console.error(err)
                toast.error("Ошибка при создании оборудования")
            }
        }

        return () => (
            <div class="max-w-xl mx-auto space-y-6 p-6">
                <h1 class="text-2xl font-bold text-center">Добавить оборудование</h1>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Тип оборудования</FieldLabel>
                        <Select modelValue={type.value} onUpdate:modelValue={(v) => (type.value = v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(EquipmentType).map((t) => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel>Название</FieldLabel>
                        <Input modelValue={name.value} onUpdate:modelValue={(v) => (name.value = v)} placeholder="Станок XYZ" />
                    </Field>

                    <Field>
                        <FieldLabel>Описание</FieldLabel>
                        <Input modelValue={description.value} onUpdate:modelValue={(v) => (description.value = v)} placeholder="Описание оборудования" />
                    </Field>

                    <Field>
                        <FieldLabel>Цена, ₽</FieldLabel>
                        <Input type="number" modelValue={price.value} onUpdate:modelValue={(v) => (price.value = Number(v))} placeholder="1000000" />
                    </Field>

                    <Field>
                        <FieldLabel>Мощность, кВт</FieldLabel>
                        <Input type="number" modelValue={power.value} onUpdate:modelValue={(v) => (power.value = Number(v))} placeholder="50" />
                    </Field>

                    <Field>
                        <FieldLabel>Год выпуска</FieldLabel>
                        <Input type="number" modelValue={year.value} onUpdate:modelValue={(v) => (year.value = Number(v))} placeholder="2022" />
                    </Field>

                    <Field>
                        <FieldLabel>Изображение</FieldLabel>
                        <Input type="file" onInput={(e: Event) => {
                            const target = e.target as HTMLInputElement
                            if (target.files && target.files[0]) {
                                imageFile.value = target.files[0]
                            }
                        }} />
                    </Field>
                </FieldGroup>

                <Button onClick={createEquipment}>Добавить оборудование</Button>
            </div>
        )
    },
})
