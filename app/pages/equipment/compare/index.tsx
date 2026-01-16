import { defineComponent, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import axios from "axios"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()

        const items = ref<any[]>([])
        const loading = ref(false)

        const error = ref('')

        onMounted(async () => {
            const rawIds = route.query.ids as string | undefined

            if (!rawIds) {
                error.value = 'Не выбрано оборудование для сравнения'
                return
            }

            const ids = rawIds
                .split(',')
                .map(id => Number(id))
                .filter(Boolean)

            if (ids.length === 0) {
                error.value = 'Некорректные параметры сравнения'
                return
            }

            loading.value = true
            error.value = ''

            try {
                const { data } = await axios.post(
                    'http://127.0.0.1:8000/equipment/byids',
                    { equipment_ids: ids}
                )

                items.value = data
            } catch (e: any) {
                console.error('Ошибка загрузки оборудования для сравнения', e)

                error.value =
                    e.response?.data?.detail ||
                    'Не удалось загрузить оборудование для сравнения'
            } finally {
                loading.value = false
            }
        })


        return () => (
            <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    ← Назад
                </Button>

                <h1 class="text-2xl font-bold">Сравнение оборудования</h1>

                {loading.value && <p>Загрузка...</p>}

                {items.value.length > 0 && (
                    <Card class="overflow-auto">
                        <table class="w-full border text-sm">
                            <thead>
                            <tr class="bg-muted">
                                <th class="p-2 border">Параметр</th>
                                {items.value.map(i => (
                                    <th key={i.id} class="p-2 border">
                                        {i.name}
                                    </th>
                                ))}
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td class="border p-2">Цена</td>
                                {items.value.map(i => (
                                    <td class="border p-2">
                                        {i.price.toLocaleString()} ₽
                                    </td>
                                ))}
                            </tr>

                            <tr>
                                <td class="border p-2">Мощность</td>
                                {items.value.map(i => (
                                    <td class="border p-2">{i.power} кВт</td>
                                ))}
                            </tr>

                            <tr>
                                <td class="border p-2">Год выпуска</td>
                                {items.value.map(i => (
                                    <td class="border p-2">{i.year}</td>
                                ))}
                            </tr>

                            <tr>
                                <td class="border p-2">Описание</td>
                                {items.value.map(i => (
                                    <td class="border p-2 text-xs">
                                        {i.description}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                    </Card>
                )}
            </div>
        )
    },
})
