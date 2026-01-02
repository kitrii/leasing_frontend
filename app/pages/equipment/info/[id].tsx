import { defineComponent, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { toast } from "vue-sonner"

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()

        const equipmentId = route.params.id as string
        const fromLease = route.query.fromLease as string | undefined

        const equipment = ref<any>(null)
        const loading = ref(false)

        async function fetchEquipment() {
            loading.value = true
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/equipment/${equipmentId}`
                )
                equipment.value = data.data
            } catch (error: any) {
                const message =
                    error?.response?.data?.detail ||
                    error?.message ||
                    "Не удалось загрузить оборудование"

                toast.error(message)
                router.back()
            } finally {
                loading.value = false
            }
        }


        onMounted(fetchEquipment)

        return () => (
            <div class="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
                {/* Назад */}
                <Button
                    variant="ghost"
                    onClick={() =>
                        fromLease
                            ? router.push(`/manager/leases/${fromLease}`)
                            : router.back()
                    }
                >
                    ← Вернуться в заявку
                </Button>

                {loading.value && <p>Загрузка...</p>}

                {equipment.value && (
                    <Card>
                        <CardHeader>
                            <CardTitle class="text-2xl">
                                {equipment.value.name}
                            </CardTitle>
                            <p class="text-sm text-muted-foreground">
                                Оборудование #{equipment.value.id}
                            </p>
                        </CardHeader>

                        <CardContent>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Левая колонка — картинка */}
                                <div class="flex items-center justify-center">
                                    <img
                                        src={equipment.value.image_url || "/images/placeholder.png"}
                                        alt={equipment.value.name}
                                        class="
                      w-full
                      max-h-64
                      object-contain
                      rounded-lg
                      border
                    "
                                    />
                                </div>

                                {/* Правая колонка — информация */}
                                <div class="space-y-4 text-sm">
                                    <div>
                                        <p class="text-muted-foreground">Тип оборудования</p>
                                        <p class="font-medium">
                                            {equipment.value.type || "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-muted-foreground">Год выпуска</p>
                                        <p>{equipment.value.year || "—"}</p>
                                    </div>

                                    <div>
                                        <p class="text-muted-foreground">Мощность</p>
                                        <p>{equipment.value.power} кВт</p>
                                    </div>

                                    <div>
                                        <p class="text-muted-foreground">Стоимость</p>
                                        <p class="font-semibold text-base">
                                            {equipment.value.price.toLocaleString("ru-RU")} ₽
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-muted-foreground">Описание</p>
                                        <p class="leading-relaxed">
                                            {equipment.value.description || "Описание отсутствует"}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        )
    },
})
