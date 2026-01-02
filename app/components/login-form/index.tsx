import { defineComponent, ref } from "vue";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useCustomAuthStore } from "~/stores/auth";
import axios from "axios";
import { toast } from "vue-sonner";

export default defineComponent({
    setup() {
        const router = useRouter();
        const email = ref("");
        const password = ref("");
        const auth = useCustomAuthStore();

        async function clickLoginButton() {
            try {
                const response = await axios.post("http://localhost:8000/login", {
                    email: email.value,
                    password: password.value,
                });
                const userId = response.data.user_id;
                const userRole = response.data.role;
                auth.login(userId, userRole);
                router.push(`/account/${userId}`);
            } catch (error) {
                toast.error("При входе возникла ошибка!");
            }
        }

        return () => (
            <div class="max-w-md mx-auto p-6 space-y-6 bg-white shadow-lg rounded-xl">
                {/* Заголовок */}
                <div class="flex flex-col items-center gap-2 text-center">
                    <h1 class="text-2xl font-bold">Вход в приложение</h1>
                    <FieldDescription>Введите свои данные для входа</FieldDescription>
                </div>

                {/* Форма */}
                <form class="space-y-4">
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            type="email"
                            placeholder="example@email.com"
                            modelValue={email.value}
                            onUpdate:modelValue={(v: string) => (email.value = v)}
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel>Пароль</FieldLabel>
                        <Input
                            type="password"
                            placeholder="********"
                            modelValue={password.value}
                            onUpdate:modelValue={(v: string) => (password.value = v)}
                            required
                        />
                    </Field>

                    <Button
                        type="button"
                        class="w-full"
                        onClick={clickLoginButton}
                    >
                        Войти
                    </Button>
                </form>
            </div>
        );
    },
});
