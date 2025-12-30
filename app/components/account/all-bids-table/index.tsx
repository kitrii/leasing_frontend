import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "~/components/ui/table";
import axios from "axios";
import { onMounted } from "vue"
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from "~/components/ui/select";

export default defineComponent({
    setup() {
        const route = useRoute()
        // const userId = route.params.user_id as string
        const statusFilter = ref<string>('all')
        const orderDate = ref<'asc' | 'desc'>('desc')
        const leases = ref<any[]>([])
        const loading = ref(false)

        function statusClass(status: string) {
            switch (status) {
                case 'Отправлена':
                    return 'bg-yellow-100 text-yellow-800'
                case 'Одобрена':
                    return 'bg-green-100 text-green-800'
                case 'Оформлен договор':
                    return 'bg-blue-100 text-blue-800'
                default:
                    return 'bg-gray-100 text-gray-800'
            }
        }


        async function fetchLeases() {
            loading.value = true
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/leases/list`,
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
        watch([statusFilter, orderDate], () => {
            fetchLeases()
        })
        const router = useRouter()


        return() => (
            <div class={'overflow-x-auto'}>
                <h1 class="text-xl font-bold">Мои договоры лизинга</h1>

                <Table class="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID заявки</TableHead>
                            <TableHead>ID клиента</TableHead> {/* ← НОВОЕ */}
                            <TableHead>Оборудование</TableHead>
                            <TableHead>Сумма</TableHead>
                            <TableHead>
                                <Select
                                    modelValue={statusFilter.value}
                                    onUpdate:modelValue={(v) => (statusFilter.value = v)}
                                >
                                    <SelectTrigger class="w-38">
                                        <SelectValue placeholder="Все статусы" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Статус</SelectItem>
                                        <SelectItem value="Отправлена">Отправлена</SelectItem>
                                        <SelectItem value="Одобрена">Одобрена</SelectItem>
                                        <SelectItem value="Оформлен договор">Оформлен договор</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableHead>
                            <TableHead>
                                <Select
                                    modelValue={orderDate.value}
                                    onUpdate:modelValue={(v) => (orderDate.value = v)}
                                >
                                    <SelectTrigger class="w-40">
                                        <SelectValue />
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
                        {leases.value.map((lease) => (
                            <TableRow
                                key={lease.id}
                                class="cursor-pointer hover:bg-muted/50 transition"
                                onClick={() => router.push(`/manager/leases/${lease.id}`)}
                            >
                                <TableCell>{lease.id}</TableCell>
                                <TableCell>{lease.user_id}</TableCell> {/* ← НОВОЕ */}
                                <TableCell>{lease.equipment}</TableCell>
                                <TableCell>
                                    {lease.amount.toLocaleString("ru-RU")} ₽
                                </TableCell>
                                <TableCell >
                                    <span
                                        class={['px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                                            statusClass(lease.status),]}>
                                        {lease.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {new Date(lease.created_at).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        )
    }
})
