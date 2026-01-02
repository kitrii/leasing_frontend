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
import { Eye, EyeOff } from "lucide-vue-next"
import { useCustomAuthStore } from "~/stores/auth"

export default defineComponent({
    setup() {
        const email = ref("")
        const full_name = ref("")
        const phone = ref("")
        const password = ref("")
        const role = ref("")
        const auth = useCustomAuthStore()
        const userId = computed(() => auth.userId)
        const oldPassword = ref("")
        const showOldPassword = ref(false)
        const showNewPassword = ref(false)

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
            if (!oldPassword.value || !password.value) {
                toast.error("Заполните оба поля пароля")
                return
            }

            try {
                await axios.post(`http://localhost:8000/users/${userId.value}/change-password`, {
                    old_password: oldPassword.value,
                    new_password: password.value,
                })
                oldPassword.value = ""
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
                                    Роль не может быть изменена
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
                            {/* СТАРЫЙ ПАРОЛЬ */}
                            <Field>
                                <FieldLabel>Старый пароль</FieldLabel>
                                <div class="relative">
                                    <Input
                                        type={showOldPassword.value ? "text" : "password"}
                                        placeholder="Введите старый пароль"
                                        modelValue={oldPassword.value}
                                        onUpdate:modelValue={(v: string) => (oldPassword.value = v)}
                                    />
                                    <Button
                                        type="button"
                                        class="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                                        variant="ghost"
                                        onClick={() => (showOldPassword.value = !showOldPassword.value)}
                                    >
                                        {showOldPassword.value ? <EyeOff class="w-5 h-5" /> : <Eye class="w-5 h-5" />}
                                    </Button>
                                </div>
                            </Field>

                            {/* НОВЫЙ ПАРОЛЬ */}
                            <Field>
                                <FieldLabel>Новый пароль</FieldLabel>
                                <div class="relative">
                                    <Input
                                        type={showNewPassword.value ? "text" : "password"}
                                        placeholder="••••••••"
                                        modelValue={password.value}
                                        onUpdate:modelValue={(v: string) => (password.value = v)}
                                    />
                                    <Button
                                        type="button"
                                        class="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                                        variant="ghost"
                                        onClick={() => (showNewPassword.value = !showNewPassword.value)}
                                    >
                                        {showNewPassword.value ? <EyeOff class="w-5 h-5" /> : <Eye class="w-5 h-5" />}
                                    </Button>
                                </div>
                                <FieldDescription>Минимум 8 символов</FieldDescription>
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
