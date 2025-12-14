import Calculator from "~/components/calculator";


export default defineComponent({
    setup() {
        return () => (
            <div class={ 'min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6' }>
                <Calculator/>
            </div>
        )
    }

})