import { defineComponent, ref } from "vue"
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Slider } from "~/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Label } from "~/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"

export default defineComponent({
    setup() {
        const paymentScheme = ref<"annuity" | "differentiated">("annuity")

        const assetPrice = ref(10_000_000)
        const advancePercent = ref(20)
        const termMonths = ref(36)
        const annualRate = ref(15)

        return () => (
            <div class="space-y-6 max-w-6xl mx-auto p-6">

                {/* === ВХОДНЫЕ ДАННЫЕ === */}
                <Card>
                    <CardHeader>
                        <CardTitle>Параметры лизинга</CardTitle>
                    </CardHeader>

                    <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Схема платежей */}
                        <div class="space-y-2">
                            <Label>Схема платежей</Label>
                            <RadioGroup
                                modelValue={paymentScheme.value}
                                onUpdate:modelValue={(v) => (paymentScheme.value = v)}
                                class="flex gap-6"
                            >
                                <div class="flex items-center gap-2">
                                    <RadioGroupItem value="annuity" />
                                    <Label>Аннуитетная</Label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioGroupItem value="differentiated" />
                                    <Label>Дифференцированная</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Стоимость имущества */}
                        <div class="space-y-2">
                            <Label>Стоимость имущества, ₽</Label>
                            <Input
                                type="number"
                                modelValue={assetPrice.value}
                                onUpdate:modelValue={(v) => (assetPrice.value = Number(v))}
                            />
                            <Slider
                                min={0}
                                max={250_000_000}
                                step={100_000}
                                modelValue={[assetPrice.value]}
                                onUpdate:modelValue={([v]) => (assetPrice.value = v)}
                            />
                            {/* Разметка под слайдером */}
                            <div class="flex justify-between text-sm text-muted-foreground">
                                <span>0</span>
                                <span>50 млн</span>
                                <span>100 млн</span>
                                <span>150 млн</span>
                                <span>200 млн</span>
                                <span>250 млн</span>
                            </div>
                        </div>


                        {/* Аванс */}
                        <div class="space-y-2">
                            <Label>Аванс, %</Label>
                            <Input
                                type="number"
                                modelValue={advancePercent.value}
                                onUpdate:modelValue={(v) => (advancePercent.value = Number(v))}
                            />
                            <Slider
                                min={0}
                                max={50}
                                step={1}
                                modelValue={[advancePercent.value]}
                                onUpdate:modelValue={([v]) => (advancePercent.value = v)}
                            />
                            {/* Разметка под слайдером */}
                            <div class="flex justify-between text-sm text-muted-foreground">
                                <span>0%</span>
                                <span>10%</span>
                                <span>20%</span>
                                <span>30%</span>
                                <span>40%</span>
                                <span>50%</span>
                            </div>
                        </div>

                        {/* Срок */}
                        <div class="space-y-2">
                            <Label>Срок договора, мес.</Label>
                            <Input
                                type="number"
                                modelValue={termMonths.value}
                                onUpdate:modelValue={(v) => (termMonths.value = Number(v))}
                            />
                            <Slider
                                min={6}
                                max={84}
                                step={1}
                                modelValue={[termMonths.value]}
                                onUpdate:modelValue={([v]) => (termMonths.value = v)}
                            />
                            <div class="flex justify-between text-sm text-muted-foreground">
                                <span>12 мес.</span>
                                <span>24 мес.</span>
                                <span>36 мес.</span>
                                <span>42 мес.</span>
                                <span>56 мес.</span>
                                <span>68 мес.</span>
                            </div>
                        </div>

                        {/* Ставка */}
                        <div class="space-y-2">
                            <Label>Процентная ставка, % годовых</Label>
                            <Input
                                type="number"
                                step="0.1"
                                modelValue={annualRate.value}
                                onUpdate:modelValue={(v) => (annualRate.value = Number(v))}
                            />
                            <Slider
                                min={5}
                                max={30}
                                step={1}
                                modelValue={[annualRate.value]}
                                onUpdate:modelValue={([v]) => (annualRate.value = v)}
                            />
                            <div class="flex justify-between text-sm text-muted-foreground">
                                <span>5%</span>
                                <span>10%</span>
                                <span>15%</span>
                                <span>20%</span>
                                <span>25%</span>
                                <span>30%</span>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* === РЕЗУЛЬТАТЫ === */}
                <Card>
                    <CardHeader>
                        <CardTitle>Результаты расчёта</CardTitle>
                    </CardHeader>

                    <CardContent class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <Label>Ежемесячный платёж</Label>
                            <p class="text-xl font-bold">— ₽</p>
                        </div>

                        <div>
                            <Label>Сумма договора</Label>
                            <p class="text-xl font-bold">— ₽</p>
                        </div>

                        <div>
                            <Label>Экономия на налогах</Label>
                            <p class="text-xl font-bold text-green-600">— ₽</p>
                        </div>

                        <div>
                            <Label>Годовое удорожание</Label>
                            <Badge variant="outline">— %</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* === ГРАФИК ПЛАТЕЖЕЙ === */}
                <Card>
                    <CardHeader>
                        <CardTitle>График платежей</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Месяц</TableHead>
                                    <TableHead>Платёж</TableHead>
                                    <TableHead>Проценты</TableHead>
                                    <TableHead>Основной долг</TableHead>
                                    <TableHead>Остаток</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={5} class="text-center text-muted-foreground">
                                        Данные будут рассчитаны
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>
        )
    },
})
