import { defineComponent, ref } from "vue"
import { Slider } from "~/components/ui/slider"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "~/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select"
import { NuxtLink } from "#components"

import axios from "axios"



export default defineComponent({
    setup() {
        /* ФИЛЬТРЫ */
        const price = ref([50_000_000])
        const power = ref([50])
        const year = ref([2020])
        const type = ref("all")
        const route = useRoute()


        const equipment = ref<any[]>([])
        const loading = ref(false)

        async function fetchEquipment() {
            loading.value = true
            try {
                const response = await axios.get("http://127.0.0.1:8000/equipment/", {
                    params: {
                        type: "metallurgy" // сюда передаем ключ типа, например "metalworking"
                    },
                })
                equipment.value = response.data.data
            } catch (e) {
                console.error("Ошибка загрузки оборудования", e)
            } finally {
                loading.value = false
            }
        }
        onMounted(() => {
            fetchEquipment()
        })


        const filteredEquipment = computed(() => {
            return equipment.value.filter((item) => {
                const matchPrice = item.price <= price.value[0]
                const matchPower = item.power <= power.value[0]
                const matchYear = item.year >= year.value[0]
                const matchType =
                    type.value === "all" || item.type === type.value

                return matchPrice && matchPower && matchYear && matchType
                return true
            })
        })
        function applyFilters() {
            const el = document.getElementById("results")
            el?.scrollIntoView({ behavior: "smooth" })
        }

        return () => (
            <div class="space-y-10">
                {/* HERO */}
                <section class="space-y-4">
                    <h1 class="text-3xl font-bold">
                        Металлообрабатывающее оборудование
                    </h1>
                    <p class="text-muted-foreground max-w-2xl">
                        Токарные, фрезерные и лазерные станки для промышленного производства.
                        Оформление в лизинг на выгодных условиях.
                    </p>

                    <Button onClick={applyFilters}>
                        Подобрать по параметрам
                    </Button>
                </section>

                {/* ФИЛЬТРЫ */}
                <section class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label class="text-sm font-medium">Стоимость до, ₽</label>
                        <Input
                            class="mt-2"
                            modelValue={price.value[0]}
                            onUpdate:modelValue={(v) => (price.value = [Number(v)])}
                        />
                        <Slider
                            min={0}
                            max={150_000_000}
                            step={1_000_000}
                            modelValue={price.value}
                            onUpdate:modelValue={(v) => (price.value = v)}
                        />
                        {/* Разметка под слайдером */}
                        <div class="flex justify-between text-sm text-muted-foreground">
                            <span>0</span>
                            <span>50 млн</span>
                            <span>100 млн</span>
                            <span>150 млн</span>
                            <span>200 млн</span>
                            <span>250 млн</span>
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-medium">Мощность, кВт</label>
                        <Slider
                            min={1}
                            max={200}
                            modelValue={power.value}
                            onUpdate:modelValue={(v) => (power.value = v)}
                        />
                        <div class="flex justify-between text-sm text-muted-foreground">
                            <span>0</span>
                            <span>50 кВт</span>
                            <span>100 кВт</span>
                            <span>150 кВт</span>
                            <span>170 кВт</span>
                            <span>200 кВт</span>
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-medium">Год выпуска</label>
                        <Slider
                            min={2005}
                            max={2025}
                            modelValue={year.value}
                            onUpdate:modelValue={(v) => (year.value = v)}
                        />
                        <div class="flex justify-between text-sm text-muted-foreground">
                            <span>0</span>
                            <span>2021</span>
                            <span>2022</span>
                            <span>2023</span>
                            <span>2024</span>
                            <span>2025</span>
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-medium">Тип станка</label>
                        <Select
                            modelValue={type.value}
                            onUpdate:modelValue={(v) => (type.value = v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Все типы" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все</SelectItem>
                                <SelectItem value="lathe">Токарные</SelectItem>
                                <SelectItem value="milling">Фрезерные</SelectItem>
                                <SelectItem value="laser">Лазерные</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </section>

                {/* КАРТОЧКИ */}
                <section
                    id="results"
                    class="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {filteredEquipment.value.length === 0 && (
                        <p class="text-muted-foreground col-span-full">
                            По заданным параметрам оборудование не найдено
                        </p>
                    )}

                    {filteredEquipment.value.map((item) => (
                        <Card key={item.id} class="flex gap-4 p-4">
                            {/* ЛЕВАЯ КОЛОНКА — КАРТИНКА */}
                            <div class="w-28 h-28 flex-shrink-0 overflow-hidden rounded-md">
                                <img
                                    src={item.image_url}
                                    class="h-full w-full object-cover"
                                    alt={item.name}
                                />
                            </div>

                            {/* ПРАВАЯ КОЛОНКА — ИНФОРМАЦИЯ */}
                            <div class="flex flex-col justify-between flex-1">
                                <div class="space-y-1">
                                    <h3 class="font-semibold text-base">
                                        {item.name}
                                    </h3>
                                    {/* ID оборудования */}
                                    <p class="font-semibold text-base">ID оборудования: {item.id}</p>

                                    <p class="text-sm text-muted-foreground">
                                        {item.description}
                                    </p>

                                    <div class="text-sm">
                                        <span class="mr-3">Мощность: {item.power} кВт</span>
                                        <span>Год: {item.year}</span>
                                    </div>

                                    <div class="font-medium">
                                        {item.price.toLocaleString("ru-RU")} ₽
                                    </div>
                                </div>

                                <Button asChild size="sm" class="mt-2 self-start">
                                    <NuxtLink to={`/equipment/metallurgy/${item.id}`}>
                                        Подробнее
                                    </NuxtLink>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </section>
            </div>
        )
    },
})
