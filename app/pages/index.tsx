import { defineComponent, ref, onMounted } from "vue";
import logoImg from "~/assets/images/logo4.png";

export default defineComponent({
    setup() {
        const angle = ref(0);

        onMounted(() => {
            setInterval(() => {
                angle.value += 0.3;
            }, 50);
        });

        return () => (
            <div
                class="
          min-h-screen
          bg-white
          text-black
          flex
          flex-col
          items-center
          justify-center
          px-6
          overflow-hidden
        "
            >
                {/* Фон */}
                <div
                    class="
            absolute inset-0
            bg-[radial-gradient(#000_1px,transparent_1px)]
            [background-size:32px_32px]
            opacity-[0.03]
            pointer-events-none
          "
                />

                {/* Контейнер заголовка */}
                <div class="relative flex items-center justify-center mb-10">
                    {/* Левый логотип */}
                    <img
                        src={logoImg}
                        alt="logo"
                        class="absolute w-24 opacity-80"
                        style={{
                            transform: `translate(-350px, -80px) rotate(${angle.value}deg)`,
                            transition: "transform 0.05s linear",
                        }}
                    />

                    {/* Заголовок */}
                    <h1
                        class="
              relative
              z-10
              text-6xl
              md:text-8xl
              font-extrabold
              tracking-tight
              text-black
              [text-shadow:
                1px_1px_0_#e5e5e5,
                2px_2px_0_#d4d4d4,
                3px_3px_0_#bfbfbf
              ]
            "
                    >
                        Лизингомания
                    </h1>

                    {/* Правый логотип */}
                    <img
                        src={logoImg}
                        alt="logo"
                        class="absolute w-20 opacity-70"
                        style={{
                            transform: `translate(360px, 150px) rotate(${-angle.value}deg)`,
                            transition: "transform 0.05s linear",
                        }}
                    />
                </div>

                {/* Описание */}
                <p
                    class="
            max-w-3xl
            text-center
            text-lg
            md:text-xl
            text-neutral-700
          "
                >
                    Современная платформа лизинга оборудования.
                    Каталог, калькулятор и управление заявками — в одном месте.
                </p>
            </div>
        );
    },
});
