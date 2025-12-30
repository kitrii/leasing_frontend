import { NuxtLink } from "#components"

export default defineComponent({
    setup() {
        return () => (
            <NuxtLink
                to="/"
                class="
          group
          inline-flex
          items-center
          select-none
        "
            >
                <h2
                    class="
            text-2xl
            font-bold
            tracking-tight
            text-black
            transition-all
            duration-300

            /* 3D эффект */
            [text-shadow:
              1px_1px_0_#e5e5e5,
              2px_2px_0_#d4d4d4,
              3px_3px_0_#bfbfbf
            ]

            group-hover:-translate-y-0.5
            group-hover:[text-shadow:
              1px_1px_0_#e5e5e5,
              2px_2px_0_#d4d4d4,
              3px_3px_0_#bfbfbf,
              4px_4px_8px_rgba(0,0,0,0.15)
            ]
          "
                >
                    Лизингомания
                </h2>
            </NuxtLink>
        )
    },
})
