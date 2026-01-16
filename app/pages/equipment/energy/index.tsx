import { defineComponent, ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Slider } from "~/components/ui/slider"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { NuxtLink } from "#components"
import axios from "axios"
import { useCustomAuthStore } from "~/stores/auth"
import { Scale } from "lucide-vue-next"

export default defineComponent({
    setup() {
        const router = useRouter()
        const auth = useCustomAuthStore()

        /* ===== ФИЛЬТРЫ ===== */
        const price = ref([50_000_000])
        const power = ref<[number, number]>([10, 150])
        const year = ref<[number, number]>([2000, 2024])

        /* ===== ПОЛЬЗОВАТЕЛЬ ===== */
        const userId = computed(() => auth.userId)
        const isClient = computed(() => auth.role === "client")

        /* ===== ОБОРУДОВАНИЕ ===== */
        const equipment = ref<any[]>([])
        const loading = ref(false)

        async function fetchEquipment() {
            loading.value = true
            try {
                const { data } = await axios.get("http://127.0.0.1:8000/equipment/", {
                    params: { type: "energy" },
                })
                equipment.value = data.data
            } finally {
                loading.value = false
            }
        }

        onMounted(fetchEquipment)

        const filteredEquipment = computed(() =>
            equipment.value.filter(item =>
                item.price <= price.value[0] &&
                item.power >= power.value[0] &&
                item.power <= power.value[1] &&
                item.year >= year.value[0] &&
                item.year <= year.value[1]
            )
        )

        /* ===== СРАВНЕНИЕ ===== */
        const compareList = ref<any[]>([])
        const MAX_COMPARE = 3

        onMounted(() => {
            const saved = localStorage.getItem("equipment-compare")
            if (saved) compareList.value = JSON.parse(saved)
        })

        function toggleCompare(item: any) {
            const exists = compareList.value.some(i => i.id === item.id)

            if (exists) {
                compareList.value = compareList.value.filter(i => i.id !== item.id)
            } else {
                if (compareList.value.length >= MAX_COMPARE) {
                    alert(`Можно сравнить не более ${MAX_COMPARE} единиц`)
                    return
                }
                compareList.value.push(item)
            }

            localStorage.setItem(
                "equipment-compare",
                JSON.stringify(compareList.value)
            )
        }

        function isInCompare(id: number) {
            return compareList.value.some(i => i.id === id)
        }

        function clearCompare() {
            compareList.value = []
            localStorage.removeItem("equipment-compare")
        }

        return () => (
            <div class="space-y-10">
                {/* ===== ЗАГОЛОВОК ===== */}
                <section class="flex justify-center">
                    <div class="max-w-3xl text-center space-y-4">
                        <h1 class="text-4xl font-bold tracking-tight">
                            Энергетическое оборудование
                        </h1>
                        <p class="text-lg text-muted-foreground">
                            Токарные, фрезерные и лазерные станки для промышленного производства.
                            Оформление в лизинг на выгодных условиях.
                        </p>
                    </div>
                </section>

                {/* ===== ФИЛЬТРЫ ===== */}
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
                            max={250_000_000}
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

                        <div class="flex gap-2 mt-2">
                            <Input
                                type="number"
                                placeholder="От"
                                modelValue={power.value[0]}
                                onUpdate:modelValue={(v) =>
                                    (power.value = [Number(v), power.value[1]])
                                }
                            />
                            <Input
                                type="number"
                                placeholder="До"
                                modelValue={power.value[1]}
                                onUpdate:modelValue={(v) =>
                                    (power.value = [power.value[0], Number(v)])
                                }
                            />
                        </div>

                        <Slider
                            min={1}
                            max={200}
                            step={1}
                            modelValue={power.value}
                            onUpdate:modelValue={(v) => (power.value = v as [number, number])}
                            class="mt-3"
                        />

                        <div class="flex justify-between text-xs text-muted-foreground">
                            <span>1</span>
                            <span>50</span>
                            <span>100</span>
                            <span>150</span>
                            <span>200 кВт</span>
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-medium">Год выпуска</label>

                        <div class="flex gap-2 mt-2">
                            <Input
                                type="number"
                                placeholder="От"
                                modelValue={year.value[0]}
                                onUpdate:modelValue={(v) =>
                                    (year.value = [Number(v), year.value[1]])
                                }
                            />
                            <Input
                                type="number"
                                placeholder="До"
                                modelValue={year.value[1]}
                                onUpdate:modelValue={(v) =>
                                    (year.value = [year.value[0], Number(v)])
                                }
                            />
                        </div>

                        <Slider
                            min={1990}
                            max={2025}
                            step={1}
                            modelValue={year.value}
                            onUpdate:modelValue={(v) => (year.value = v as [number, number])}
                            class="mt-3"
                        />

                        <div class="flex justify-between text-xs text-muted-foreground">
                            <span>1990</span>
                            <span>2000</span>
                            <span>2010</span>
                            <span>2020</span>
                            <span>2025</span>
                        </div>
                    </div>



                </section>

                {/* ===== КАРТОЧКИ ===== */}
                <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredEquipment.value.map(item => (
                        <Card key={item.id} class="relative flex gap-4 p-4">
                            <div class="w-28 h-28 overflow-hidden rounded-md">
                                <img
                                    src={item.image_url}
                                    class="w-full h-full object-cover"
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
                                {/* КНОПКА СРАВНЕНИЯ */}
                                <button
                                    class={[
                                        "absolute top-3 right-3 p-1 rounded-md border transition",
                                        isInCompare(item.id)
                                            ? "bg-primary text-white"
                                            : "hover:bg-muted"
                                    ]}
                                    onClick={() => toggleCompare(item)}
                                >
                                    <Scale class="w-4 h-4" />
                                </button>

                                {isClient.value && (
                                    <Button asChild size="sm" class="mt-2 self-start">
                                        <NuxtLink
                                            to={{
                                                path: `/account/${userId.value}/createbid`,
                                                query: {
                                                    equipmentId: item.id,
                                                },
                                            }}
                                        >
                                            Создать заявку на оборудование
                                        </NuxtLink>
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </section>

                {/* ===== ПАНЕЛЬ СРАВНЕНИЯ ===== */}
                {compareList.value.length > 0 && (
                    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border shadow-lg rounded-xl px-4 py-3 flex gap-4 z-50">
                        <span>
                            Выбрано: <b>{compareList.value.length}</b>
                        </span>

                        <Button
                            size="sm"
                            onClick={() =>
                                router.push({
                                    path: "/equipment/compare",
                                    query: {
                                        ids: compareList.value.map(i => i.id).join(","),
                                    },
                                })
                            }
                        >
                            Сравнить
                        </Button>

                        <Button size="sm" variant="ghost" onClick={clearCompare}>
                            Очистить
                        </Button>
                    </div>
                )}
            </div>
        )
    },
})
