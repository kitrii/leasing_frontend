import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "~/components/ui/table";
import axios from "axios";
import { onMounted } from "vue"
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from "~/components/ui/select";

export default defineComponent({
    setup() {
        const route = useRoute()
        // const userId = route.params.user_id as string
        const userId = 1
        const statusFilter = ref<string>('all')
        const orderDate = ref<'asc' | 'desc'>('desc')
        const leases = ref<any[]>([])
        const loading = ref(false)

        async function fetchLeases() {
            loading.value = true
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/leases/list',
                    {
                        params: {
                            user_id: userId,
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

        const lease = leases

        return() => (
            <div class={'flex flex-col gap-6'}>
                <h1 class="text-xl font-bold">Мои договоры лизинга</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
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
                                    <SelectTrigger class="w-45">
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
                            <TableRow key={lease.id}>
                                <TableCell>{lease.id}</TableCell>
                                <TableCell>{lease.equipment}</TableCell>
                                <TableCell>
                                    {lease.amount.toLocaleString("ru-RU")} ₽
                                </TableCell>
                                <TableCell>
                    <span class="capitalize">
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
