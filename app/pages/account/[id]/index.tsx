import AccountLayout from "~/components/layout/account-layout";


export default defineComponent({
    setup() {
        return () => (
            <AccountLayout>
                <div class="flex flex-col items-center justify-center text-center px-4 py-10 space-y-6">
                    {/* Заголовок */}
                    <h1 class="text-2xl font-bold tracking-tight">
                        Добро пожаловать в личный кабинет!
                    </h1>
                    {/* Подзаголовок / описание */}
                    <p class="max-w-xl text-lg text-muted-foreground">
                        Здесь вы можете добавлять оборудование в каталог.
                    </p>
                </div>
            </AccountLayout>
        );
    }
});
