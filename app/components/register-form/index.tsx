import { defineComponent, ref } from "vue";
import { Field, FieldDescription, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { ComponentFieldBindingObject } from "vee-validate";
import axios from "axios";
import { toast } from "vue-sonner";

export default defineComponent({
    setup() {
        const email = ref("");
        const full_name = ref("");
        const phone = ref("");
        const password = ref("");
        const role = ref("");

        function clickRegisterButton() {
            axios({
                method: "post",
                url: "http://localhost:8000/register",
                data: { email: email.value, full_name: full_name.value, phone: phone.value, role: role.value, password: password.value },
            })
                .then(() => toast.success("Регистрация прошла успешно!"))
                .catch((error) => {
                    const message = "При регистрации произошла ошибка! ";
                    const detailed = error.response?.data?.detail || error.message || "";
                    toast.error(`${message}${detailed}`);
                });
        }

        return () => (
            <div class="max-w-md mx-auto p-6 space-y-6 bg-white shadow-lg rounded-xl">
                {/* Заголовок */}
                <div class="flex flex-col items-center gap-2 text-center">
                    <h1 class="text-2xl font-extrabold text-black">Добро пожаловать!</h1>
                    <FieldDescription>Создайте свой аккаунт и начните работу с платформой</FieldDescription>
                </div>

                {/* Форма */}
                <form class="space-y-4">
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            type="email"
                            placeholder="Введите ваш email"
                            modelValue={email.value}
                            onUpdate:modelValue={(v: string) => (email.value = v)}
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel>ФИО</FieldLabel>
                        <Input
                            type="text"
                            placeholder="Введите полное имя"
                            modelValue={full_name.value}
                            onUpdate:modelValue={(v: string) => (full_name.value = v)}
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel>Телефон</FieldLabel>
                        <Input
                            type="tel"
                            placeholder="+7 (999) 999-99-99"
                            modelValue={phone.value}
                            onUpdate:modelValue={(v: string) => (phone.value = v)}
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel>Пароль</FieldLabel>
                        <Input
                            type="password"
                            placeholder="Придумайте надежный пароль"
                            modelValue={password.value}
                            onUpdate:modelValue={(v: string) => (password.value = v)}
                            required
                        />
                    </Field>

                    <FormField name="role">
                        {({ componentField }: { componentField: ComponentFieldBindingObject }) => (
                            <FormItem>
                                <FormLabel>Роль</FormLabel>
                                <Select {...componentField} modelValue={role.value} onUpdate:modelValue={(v: string) => (role.value = v)}>
                                    <FormControl>
                                        <SelectTrigger class="w-full">
                                            <SelectValue placeholder="Выберите роль" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Client">Лизингополучатель</SelectItem>
                                            <SelectItem value="Manager">Лизингодатель</SelectItem>
                                            <SelectItem value="Supplier">Поставщик оборудования</SelectItem>
                                            <SelectItem value="Admin">Администратор</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    </FormField>

                    <Button class="w-full  text-white font-semibold mt-4" onClick={clickRegisterButton}>
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        );
    },
});
