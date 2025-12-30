import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "~/components/ui/table";
import axios from "axios";
import {computed, onMounted} from "vue"
import {useAuthStore} from "~/stores/auth";

export default defineComponent({
    setup() {
        const route = useRoute()
        // const userId = route.params.user_id as string
        const payments = ref<any[]>([])
        const loading = ref(false)
        const auth = useAuthStore()
        const userId = computed(() => auth.userId)

        async function fetchPayments() {
            loading.value = true
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/payments/list',
                    {
                        params: {
                            user_id: userId.value,
                        },
                    }
                )

                payments.value = response.data.payments
            } catch (e) {
                console.error('Ошибка загрузки заявок', e)
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
                            <TableHead>Оборудование</TableHead>
                            <TableHead>Сумма платежа</TableHead>
                            <TableHead>Дата платежа</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {payments.value.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.equipment}</TableCell>
                                <TableCell>
                                    {payment.amount.toLocaleString("ru-RU")} ₽
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    {new Date(payment.created_at).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        )
    }
})
