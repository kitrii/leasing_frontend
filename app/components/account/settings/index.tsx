import { defineComponent, ref, onMounted } from "vue"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "~/components/ui/tabs"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import axios from "axios"
import { toast } from "vue-sonner"

export default defineComponent({
    setup() {
        const email = ref("")
        const full_name = ref("")
        const phone = ref("")
        const password = ref("")
        const role = ref("")
        const auth = useAuthStore()
        const userId = computed(() => auth.userId)

        async function fetchProfile() {
            try {
                const { data } = await axios.get(`http://localhost:8000/users/${userId.value}`)
                email.value = data.email
                full_name.value = data.full_name
                phone.value = data.phone
                role.value = data.role
            } catch {
                toast.error("Не удалось загрузить профиль")
            }
        }

        async function updateProfile() {
            try {
                await axios.patch(`http://localhost:8000/users/${userId.value}/profile`, {
                    email: email.value,
                    full_name: full_name.value,
                    phone: phone.value,
                })
                toast.success("Контактные данные обновлены")
            } catch {
                toast.error("Ошибка при сохранении данных")
            }
        }

        async function updatePassword() {
            if (!password.value) {
                toast.error("Введите новый пароль")
                return
            }

            try {
                await axios.post(`http://localhost:8000/users/${userId.value}/change-password`, {
                    password: password.value,
                })
                password.value = ""
                toast.success("Пароль успешно изменён")
            } catch {
                toast.error("Ошибка при смене пароля")
            }
        }

        onMounted(fetchProfile)

        return () => (
            <div class="max-w-xl mx-auto flex flex-col gap-6">
                <div class="text-center">
                    <h1 class="text-2xl font-bold">Настройки аккаунта</h1>
                    <FieldDescription>
                        Управление профилем и безопасностью
                    </FieldDescription>
                </div>

                <Tabs defaultValue="role" class="w-full">
                    <TabsList class="grid grid-cols-3">
                        <TabsTrigger value="role">Роль</TabsTrigger>
                        <TabsTrigger value="contacts">Контакты</TabsTrigger>
                        <TabsTrigger value="password">Пароль</TabsTrigger>
                    </TabsList>

                    {/* РОЛЬ */}
                    <TabsContent value="role">
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Ваша роль в системе</FieldLabel>
                                <Input disabled modelValue={role.value} />
                                <FieldDescription>
                                    Роль назначается администратором и не может быть изменена
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </TabsContent>

                    {/* КОНТАКТЫ */}
                    <TabsContent value="contacts">
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    modelValue={email.value}
                                    onUpdate:modelValue={(v: string) => (email.value = v)}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>ФИО</FieldLabel>
                                <Input
                                    modelValue={full_name.value}
                                    onUpdate:modelValue={(v: string) => (full_name.value = v)}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Телефон</FieldLabel>
                                <Input
                                    placeholder="+7 (999) 999-99-99"
                                    modelValue={phone.value}
                                    onUpdate:modelValue={(v: string) => (phone.value = v)}
                                />
                            </Field>

                            <Button class="mt-4 w-full" onClick={updateProfile}>
                                Сохранить контактные данные
                            </Button>
                        </FieldGroup>
                    </TabsContent>

                    {/* ПАРОЛЬ */}
                    <TabsContent value="password">
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Новый пароль</FieldLabel>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    modelValue={password.value}
                                    onUpdate:modelValue={(v: string) => (password.value = v)}
                                />
                                <FieldDescription>
                                    Минимум 8 символов
                                </FieldDescription>
                            </Field>

                            <Button class="mt-4 w-full" onClick={updatePassword}>
                                Изменить пароль
                            </Button>
                        </FieldGroup>
                    </TabsContent>
                </Tabs>
            </div>
        )
    },
})
