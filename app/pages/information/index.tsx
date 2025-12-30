import { defineComponent, ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Check, Mail, User, ChevronDown } from "lucide-vue-next";

export default defineComponent({
    setup() {
        const openRoles = ref(true);
        const openAbout = ref(true);

        const toggleRoles = () => openRoles.value = !openRoles.value;
        const toggleAbout = () => openAbout.value = !openAbout.value;

        return () => (
            <div class="space-y-12 p-8 max-w-4xl mx-auto font-sans">
                {/* Заголовок страницы */}
                <div class="text-center space-y-2">
                    <h1 class="text-4xl font-extrabold">Общая информация о приложении</h1>
                    <p class="text-muted-foreground text-lg">Об авторе, роли пользователей и возможности</p>
                </div>

                {/* Автор */}
                <Card class="border-2 border-blue-400 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <User class="w-5 h-5 text-blue-500" /> Автор проекта
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-2 text-sm md:text-base text-neutral-800 font-sans">
                        <p class="flex items-center gap-2">
                            <User class="w-4 h-4 text-neutral-500" />
                            <strong>Имя:</strong> Нагих Екатерина Александровна
                        </p>
                        <p class="flex items-center gap-2">
                            <Mail class="w-4 h-4 text-neutral-500" />
                            <strong>Почта:</strong> 215728@edu.fa.ru
                        </p>
                    </CardContent>
                </Card>

                {/* Роли пользователей (Accordion) */}
                <Card class="border-2 border-purple-400 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle
                            class="flex items-center justify-between cursor-pointer"
                            onClick={toggleRoles}
                        >
                            <div class="flex items-center gap-2">
                                <Badge variant="secondary">Роли и возможности</Badge>
                            </div>
                            <ChevronDown
                                class={`w-5 h-5 transition-transform duration-300 ${openRoles.value ? "rotate-180" : ""}`}
                            />
                        </CardTitle>
                    </CardHeader>
                    <CardContent class={`space-y-3 text-sm md:text-base text-neutral-800 font-sans ${openRoles.value ? "block" : "hidden"}`}>
                        <p>Пользователи могут зарегистрироваться под разными ролями:</p>
                        <ul class="space-y-2 list-none">
                            <li class="flex items-start gap-2">
                                <Check class="w-5 h-5 text-purple-500 mt-0.5" /> <strong>Администратор:</strong> управление оборудованием, пользователями и настройками.
                            </li>
                            <li class="flex items-start gap-2">
                                <Check class="w-5 h-5 text-purple-500 mt-0.5" /> <strong>Менеджер:</strong> просмотр и редактирование оборудования, формирование предложений и заявок.
                            </li>
                            <li class="flex items-start gap-2">
                                <Check class="w-5 h-5 text-purple-500 mt-0.5" /> <strong>Пользователь:</strong> просмотр каталога оборудования, оформление заявок на лизинг.
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* О приложении (Accordion) */}
                <Card class="border-2 border-blue-400 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle
                            class="flex items-center justify-between cursor-pointer"
                            onClick={toggleAbout}
                        >
                            Описание приложения
                            <ChevronDown
                                class={`w-5 h-5 transition-transform duration-300 ${openAbout.value ? "rotate-180" : ""}`}
                            />
                        </CardTitle>
                    </CardHeader>
                    <CardContent class={`space-y-2 text-sm md:text-base text-neutral-800 font-sans ${openAbout.value ? "block" : "hidden"}`}>
                        <p>
                            Приложение предназначено для управления металлообрабатывающим, строительным, фармацевтическим и другими видами промышленного оборудования.
                        </p>
                        <p>
                            Пользователи могут просматривать каталог, фильтровать оборудование по параметрам, а также оформлять заявки на лизинг.
                        </p>
                        <p>
                            Для разработчиков: приложение использует <strong>Nuxt 3</strong> и <strong>ShadCN Vue</strong> для UI, <strong>FastAPI</strong> для backend и <strong>MinIO</strong> для хранения изображений.
                        </p>
                    </CardContent>
                </Card>

                {/* Футер */}
                <div class="text-center text-neutral-400 text-sm mt-8">
                    &copy; 2025 Нагих Екатерина. Все права защищены.
                </div>
            </div>
        );
    },
});
