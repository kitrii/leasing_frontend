import { defineComponent } from "vue";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Check, Mail, User } from "lucide-vue-next";

export default defineComponent({
    setup() {
        return () => (
            <div class="space-y-12 p-8 max-w-5xl mx-auto">
                {/* Заголовок страницы */}
                <div class="text-center space-y-2">
                    <h1 class="text-4xl font-extrabold">Общая информация о приложении</h1>
                    <p class="text-muted-foreground text-lg">Управление оборудованием, роли пользователей и возможности</p>
                </div>

                {/* Автор */}
                <Card class="border-2 border-blue-400 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <User class="w-5 h-5 text-blue-500" /> Автор проекта
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-1">
                        <p><strong>Имя:</strong> Нагих Екатерина Александровна</p>
                        <p class="flex items-center gap-2">
                            <Mail class="w-4 h-4 text-green-500" /> <strong>Почта:</strong> 215728@edu.fa.ru
                        </p>
                    </CardContent>
                </Card>

                {/* Роли пользователей */}
                <Card class="border-2 border-purple-400 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <Badge variant="secondary">Роли и возможности</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <p>Пользователи могут зарегистрироваться под разными ролями:</p>
                        <ul class="space-y-2 list-none">
                            <li class="flex items-center gap-2">
                                <Check class="w-5 h-5 text-purple-500" /> <strong>Администратор:</strong> управление оборудованием, пользователями и настройками.
                            </li>
                            <li class="flex items-center gap-2">
                                <Check class="w-5 h-5 text-purple-500" /> <strong>Менеджер:</strong> просмотр и редактирование оборудования, формирование предложений и заявок.
                            </li>
                            <li class="flex items-center gap-2">
                                <Check class="w-5 h-5 text-purple-500" /> <strong>Пользователь:</strong> просмотр каталога оборудования, оформление заявок на лизинг.
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* О приложении */}
                <Card class="border-2 border-green-400 hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-green-50 to-green-100">
                    <CardHeader>
                        <CardTitle class="text-green-700 text-lg font-bold">Описание приложения</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-2">
                        <p>
                            Приложение предназначено для управления металлообрабатывающим, строительным, фармацевтическим и другими видами промышленного оборудования.
                            Пользователи могут просматривать каталог, фильтровать оборудование по параметрам, а также оформлять заявки на лизинг.
                        </p>
                        <p>
                            Для разработчиков: приложение использует <strong>Nuxt 3</strong> и <strong>ShadCN Vue</strong> для UI, <strong>FastAPI</strong> для backend и <strong>MinIO</strong> для хранения изображений.
                        </p>
                    </CardContent>
                </Card>

                {/* Футер */}
                <div class="text-center text-muted-foreground text-sm mt-8">
                    &copy; 2025 Нагих Екатерина. Все права защищены.
                </div>
            </div>
        );
    },
});
