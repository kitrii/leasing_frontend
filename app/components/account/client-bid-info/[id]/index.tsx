import { defineComponent, ref, onMounted, computed } from "vue"
import axios from "axios"
import { toast } from "vue-sonner"
import {Button} from "~/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";


export default defineComponent({
    setup() {
        const route = useRoute()
        const leaseId = computed(() => Number(route.params.id))

        const lease = ref<any | null>(null)
        const payments = ref<any[]>([])
        const loading = ref(false)
        const userId = computed(() => route.params.id)

        const hasUnconfirmedPayments = computed(() =>
            payments.value.some(p => p.status === "Сформирован")
        )

        async function fetchLeaseInfo() {
            loading.value = true
            try {
                const [leaseRes, paymentsRes] = await Promise.all([
                    axios.get(`http://localhost:8000/api/leases/${leaseId.value}`).catch(() => null),
                    axios.get(`http://localhost:8000/leases/${leaseId.value}/payments`).catch(() => ({ data: { payments: [] } }))
                ])

                lease.value = leaseRes?.data ?? null
                payments.value = paymentsRes?.data?.payments ?? []
            } catch (e) {
                toast.error("Не удалось загрузить данные по заявке")
            } finally {
                loading.value = false
            }
        }

        async function confirmPayments() {
            const ok = confirm(
                "Вы подтверждаете график платежей и принимаете условия договора?"
            )
            if (!ok) return

            try {
                await axios.patch(
                    `http://localhost:8000/leases/${leaseId.value}/payments/accept`,
                    { status: "accepted" }
                )

                toast.success("График платежей подтверждён")
                fetchLeaseInfo()
            } catch (e) {
                toast.error("Не удалось подтвердить платежи")
            }
        }

        function goBack() {
            navigateTo(`/account/${userId.value}/bids`)
        }

        onMounted(fetchLeaseInfo)

        return () => (
            <div class="space-y-6 max-w-4xl">
                {/* КНОПКА НАЗАД */}
                <div class="flex justify-start">
                    <Button onClick={goBack} variant="outline">
                        ← Назад к заявкам
                    </Button>
                </div>

                <h1 class="text-2xl font-bold">
                    Информация по заявке #{leaseId.value}
                </h1>

                {/* ИНФОРМАЦИЯ ПО ЗАЯВКЕ */}
                {lease.value ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Данные договора</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-2 text-sm">
                            <div><b>Оборудование:</b> {lease.value.equipment ?? "-"}</div>
                            <div><b>Сумма договора:</b> {lease.value.amount ? lease.value.amount.toLocaleString("ru-RU") + " ₽" : "-"}</div>
                            <div><b>Статус:</b> {lease.value.status ?? "-"}</div>
                            <div>
                                <b>Дата оформления:</b>{" "}
                                {lease.value.created_at ? new Date(lease.value.created_at).toLocaleDateString() : "-"}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <p class="text-muted-foreground">Информация по заявке отсутствует</p>
                )}

                {/* ПЛАТЕЖИ */}
                <Card>
                    <CardHeader>
                        <CardTitle>График платежей</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {payments.value.length === 0 ? (
                            <p class="text-muted-foreground">Платежи отсутствуют</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Сумма</TableHead>
                                        <TableHead>Дата платежа</TableHead>
                                        <TableHead>Статус</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {payments.value.map(payment => (
                                        <TableRow key={payment.id}>
                                            <TableCell>
                                                {payment.amount ? payment.amount.toLocaleString("ru-RU") + " ₽" : "-"}
                                            </TableCell>
                                            <TableCell>
                                                {payment.due_date ? new Date(payment.due_date).toLocaleDateString() : "-"}
                                            </TableCell>
                                            <TableCell>
                                                {payment.status ?? "-"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        {/* КНОПКА ПОДТВЕРЖДЕНИЯ */}
                        {hasUnconfirmedPayments.value && (
                            <div class="mt-6 flex justify-end">
                                <Button onClick={confirmPayments}>
                                    Подтвердить график платежей
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        )
    },
})
