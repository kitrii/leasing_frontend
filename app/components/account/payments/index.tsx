import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "~/components/ui/table";
import axios from "axios";
import {computed, onMounted} from "vue"
import {useCustomAuthStore} from "~/stores/auth";
import { toast } from "vue-sonner"

export default defineComponent({
    setup() {
        // const route = useRoute()
        // const userId = route.params.user_id as string
        const payments = ref<any[]>([])
        const loading = ref(false)
        const auth = useCustomAuthStore()
        const userId = computed(() => auth.userId)

        async function fetchPayments() {
            loading.value = true
            try {
                const response = await axios.get(
                    'http://localhost:8000/leases/payments/list',
                    {
                        params: {
                            user_id: userId.value
                        },
                    }
                )

                payments.value = response.data.payments
            } catch (e) {
                console.error('Ошибка загрузки заявок', e)
                toast.error("Ошибка загрузки заявок")
            } finally {
                loading.value = false
            }
        }

        onMounted(fetchPayments)

        return() => (
            <div class={'flex flex-col gap-6'}>
                <h1 class="text-xl font-bold">Мои платежи</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id Оборудования</TableHead>
                            <TableHead>Название оборудования</TableHead>
                            <TableHead>Сумма платежа</TableHead>
                            <TableHead>Статус платежа</TableHead>
                            <TableHead>Дата платежа</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {payments.value.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.equipment_id}</TableCell>
                                <TableCell>{payment.equipment_name}</TableCell>
                                <TableCell>
                                    {payment.amount.toLocaleString("ru-RU")} ₽
                                </TableCell>
                                <TableCell>{payment.status}</TableCell>
                                <TableCell>
                                    {new Date(payment.due_date).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        )
    }
})
