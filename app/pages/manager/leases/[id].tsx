import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '~/components/ui/select'
import axios from 'axios'
import { toast } from 'vue-sonner'
import { onMounted, ref, computed } from 'vue'

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()

        const leaseId = route.params.id as string

        const lease = ref<any>(null)
        const loading = ref(false)
        const status = ref('')

        const LEASE_STATUSES = [
            'Отправлена',
            'В процессе обработки',
            'Одобрена',
            'Оформлен договор',
            'Отклонена',
            'Завершена',
            // 'Отменена лизингополучателем' на такой статус может менять только создатель заявки!
        ]

        async function fetchLease() {
            loading.value = true
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/api/leases/${leaseId}`
                )
                lease.value = data
                status.value = data.status
            } catch (e) {
                toast.error('Ошибка загрузки заявки')
                router.push('/manager/leases')
            } finally {
                loading.value = false
            }
        }

        async function updateStatus() {
            try {
                await axios.patch(
                    `http://localhost:8000/api/leases/${leaseId}/status`,
                    { status: status.value }
                )
                toast.success('Статус обновлён')
                lease.value.status = status.value
            } catch {
                toast.error('Не удалось обновить статус')
            }
        }

        onMounted(fetchLease)

        return () => (
            <div class="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    ← Назад
                </Button>

                {loading.value && <p>Загрузка...</p>}

                {lease.value && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Заявка №{lease.value.id}
                            </CardTitle>
                        </CardHeader>

                        <CardContent class="space-y-4">
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p class="text-muted-foreground">ID клиента</p>
                                    <button
                                        class="font-mono text-blue-600 hover:underline transition"
                                        onClick={() =>
                                            router.push(`/manager/users/${lease.value.user_id}`)
                                        }
                                    >
                                        #{lease.value.user_id}
                                    </button>
                                </div>


                                <div>
                                    <p class="text-muted-foreground">ID оборудования</p>
                                    <button
                                        class="font-mono text-blue-600 hover:underline transition"
                                        onClick={() =>
                                            router.push(
                                                `/equipment/info/${lease.value.equipment}?fromLease=${lease.value.id}`
                                            )
                                        }
                                    >
                                        #{lease.value.equipment}
                                    </button>
                                </div>

                                <div>
                                    <p class="text-muted-foreground">Сумма</p>
                                    <p class="font-semibold">
                                        {lease.value.amount.toLocaleString('ru-RU')} ₽
                                    </p>
                                </div>

                                <div>
                                    <p class="text-muted-foreground">Срок</p>
                                    <p>{lease.value.term} мес.</p>
                                </div>

                                <div>
                                    <p class="text-muted-foreground">Схема платежей</p>
                                    <p>{lease.value.payment_scheme}</p>
                                </div>

                                <div>
                                    <p class="text-muted-foreground">Дата создания</p>
                                    <p>
                                        {new Date(lease.value.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Управление статусом */}
                            <div class="pt-4 border-t space-y-3">
                                <p class="font-medium">Статус заявки</p>

                                {lease.value.status !== "Отменена лизингополучателем" && (
                                    <div class="flex gap-4 items-center">
                                        <Select
                                            modelValue={status.value}
                                            onUpdate:modelValue={(v) => (status.value = v)}
                                        >
                                            <SelectTrigger class="w-64">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {LEASE_STATUSES.map(s => (
                                                    <SelectItem value={s} key={s}>
                                                        {s}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Button type="button" onClick={updateStatus}>
                                            Сменить статус
                                        </Button>
                                    </div>
                                )}

                                {lease.value.status === "Отменена лизингополучателем" && (
                                    <p class="text-sm text-muted-foreground">
                                        Статус заявки "Отменена лизингополучателем", изменение недоступно
                                    </p>
                                )}
                            </div>

                        </CardContent>
                    </Card>
                )}
            </div>
        )
    },
})
