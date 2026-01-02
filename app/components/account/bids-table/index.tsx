import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "~/components/ui/table";
import axios from "axios";
import {onMounted} from "vue"
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from "~/components/ui/select";
import {Trash2, SquareArrowOutUpRight} from "lucide-vue-next"
import {toast} from "vue-sonner"
import {useCustomAuthStore} from "~/stores/auth";

export default defineComponent({
    setup() {
        const route = useRoute()
        // const userId = route.params.user_id as string
        const statusFilter = ref<string>('all')
        const orderDate = ref<'asc' | 'desc'>('desc')
        const leases = ref<any[]>([])
        const loading = ref(false)
        const auth = useCustomAuthStore()
        const userId = computed(() => auth.userId)

        async function cancelLease(leaseId: number) {
            const ok = confirm("Вы уверены, что хотите отменить заявку?")
            if (!ok) return
            try {
                await axios.patch(
                    `http://localhost:8000/api/leases/${leaseId}/status`,
                    {status: "Отменена лизингополучателем"}
                )
                toast.success("Заявка отменена")
                fetchLeases()
            } catch (e: any) {
                toast.error(
                    e.response?.data?.detail || "Не удалось отменить заявку"
                )
            }
        }

        async function fetchLeases() {
            loading.value = true
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/leases/list/${userId.value}`,
                    {
                        params: {
                            status: statusFilter.value,
                            order_data: orderDate.value,
                        },
                    }
                )


                leases.value = response.data.leases
            } catch (e) {
                console.error('Ошибка загрузки заявок', e)
            } finally {
                loading.value = false
            }
        }

        onMounted(fetchLeases)
        watch([statusFilter, orderDate, userId], () => {
            fetchLeases()
        })


        return () => (
            <div class={'flex flex-col gap-6'}>
                <h1 class="text-xl font-bold">Мои договоры лизинга</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>ID Оборудования</TableHead>
                            <TableHead>Оборудование</TableHead>
                            <TableHead>Сумма</TableHead>
                            <TableHead>
                                <Select
                                    modelValue={statusFilter.value}
                                    onUpdate:modelValue={(v) => (statusFilter.value = v)}
                                >
                                    <SelectTrigger class="w-48">
                                        <SelectValue placeholder="Все статусы"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Все статусы</SelectItem>
                                        <SelectItem value="Отправлена">Отправлена</SelectItem>
                                        <SelectItem value="В процессе обработки">В процессе обработки</SelectItem>
                                        <SelectItem value="Одобрена">Одобрена</SelectItem>
                                        <SelectItem value="Оформлен договор">Оформлен договор</SelectItem>
                                        <SelectItem value="Завершена">Завершена</SelectItem>
                                        <SelectItem value="Отклонена">Отклонена</SelectItem>
                                        <SelectItem value="Отменена лизингополучателем">Отменена лизингополучателем</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableHead>
                            <TableHead>
                                <Select
                                    modelValue={orderDate.value}
                                    onUpdate:modelValue={(v) => (orderDate.value = v)}
                                >
                                    <SelectTrigger class="w-45">
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="desc">Сначала новые</SelectItem>
                                        <SelectItem value="asc">Сначала старые</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {!loading.value && leases.value.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} class="text-center text-muted-foreground py-6">
                                    У вас пока нет заявок
                                </TableCell>
                            </TableRow>
                        )}

                        {leases.value.map((lease) => (
                            <TableRow
                                key={lease.id}
                                class="cursor-pointer hover:bg-muted/50 transition"
                                onClick={() =>
                                    navigateTo(`/client/leases/info/${lease.id}`)
                                }
                            >
                                <TableCell class="font-mono">
                                    #{lease.id}
                                </TableCell>

                                <TableCell>
                                    {lease.equipment_id}
                                </TableCell>
                                <TableCell>
                                    {lease.equipment_name}
                                </TableCell>

                                <TableCell>
                                    {lease.amount.toLocaleString("ru-RU")} ₽
                                </TableCell>

                                <TableCell>
                                    {lease.status}
                                </TableCell>

                                <TableCell class="flex items-center justify-between gap-2">
                                    <span>
                                        {new Date(lease.created_at).toLocaleDateString()}
                                    </span>

                                    <div class="flex items-center gap-2">
                                        {/* ИКОНКА ДЛЯ ОФОРМЛЕННОГО ДОГОВОРА */}
                                        {lease.status === "Оформлен договор" && (
                                            <button
                                                class="text-primary hover:text-primary/80 transition"
                                                title="Посмотреть и подтвердить информацию по заявке"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    navigateTo(`/client/leases/info/${lease.id}`)
                                                }}
                                            >
                                                <SquareArrowOutUpRight class="w-4 h-4"/>
                                            </button>
                                        )}
                                        {/* КНОПКА ОТМЕНЫ */}
                                        {!["Отменена", "Завершена", "Отклонена", "Оформлен договор", "Отменена лизингополучателем"].includes(lease.status) && (
                                            <button
                                                class="text-muted-foreground hover:text-destructive transition"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    cancelLease(lease.id)
                                                }}
                                                title="Отменить заявку"
                                            >
                                                <Trash2 class="w-4 h-4"/>
                                            </button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        )
    }
})
