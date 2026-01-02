import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { toast } from 'vue-sonner'

export default defineComponent({
    setup() {
        const route = useRoute()
        const userId = route.params.id as string

        const user = ref<any>(null)
        const leases = ref<any[]>([])
        const loading = ref(false)

        async function fetchUser() {
            loading.value = true
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/users/${userId}`
                )
                user.value = data
            } catch (error: any) {
                toast.error(
                    error?.response?.data?.detail ||
                    'Не удалось загрузить пользователя'
                )
                router.back()
            } finally {
                loading.value = false
            }
        }

        async function fetchUserLeases() {
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/api/leases/list/${userId}`
                )
                leases.value = data.leases
            } catch (e) {
                toast.error('Не удалось загрузить заявки пользователя')
            }
        }

        onMounted(async () => {
            await fetchUser()
            await fetchUserLeases()
        })

        return () => (
            <div class="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Назад */}
                <Button variant="ghost" onClick={() => router.back()}>
                    ← Назад
                </Button>

                {loading.value && <p>Загрузка...</p>}

                {user.value && (
                    <>
                        {/* Карточка пользователя */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Клиент #{user.value.id}
                                </CardTitle>
                            </CardHeader>

                            <CardContent class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p class="text-muted-foreground">ФИО</p>
                                    <p class="font-medium">
                                        {user.value.full_name || '—'}
                                    </p>
                                </div>

                                <div>
                                    <p class="text-muted-foreground">Телефон</p>
                                    <p>{user.value.phone || '—'}</p>
                                </div>

                                <div>
                                    <p class="text-muted-foreground">Email</p>
                                    <p>{user.value.email}</p>
                                </div>

                                <div>
                                    <p class="text-muted-foreground">Дата регистрации</p>
                                    <p>
                                        {new Date(user.value.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Заявки пользователя */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Заявки клиента
                                </CardTitle>
                            </CardHeader>

                            <CardContent class="space-y-2 text-sm">
                                {leases.value.length === 0 && (
                                    <p class="text-muted-foreground">
                                        Заявок нет
                                    </p>
                                )}

                                {leases.value.map(lease => (
                                    <div
                                        key={lease.id}
                                        class="flex justify-between items-center border rounded-md px-3 py-2"
                                    >
                                        <div>
                                            <p class="font-medium">
                                                Заявка #{lease.id}
                                            </p>
                                            <p class="text-muted-foreground">
                                                {lease.amount.toLocaleString('ru-RU')} ₽ · {lease.term} мес.
                                            </p>
                                        </div>

                                        <div class="flex items-center gap-3">
                      <span class="text-xs text-muted-foreground">
                        {lease.status}
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        )
    },
})
