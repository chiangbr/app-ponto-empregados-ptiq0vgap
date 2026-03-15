import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { time: '07:00', esperado: 10, presentes: 8 },
  { time: '08:00', esperado: 45, presentes: 40 },
  { time: '09:00', esperado: 50, presentes: 48 },
  { time: '10:00', esperado: 50, presentes: 49 },
  { time: '11:00', esperado: 50, presentes: 49 },
  { time: '12:00', esperado: 20, presentes: 18 }, // Almoço
]

const chartConfig = {
  esperado: {
    label: 'Esperado (Escala)',
    color: 'hsl(var(--muted-foreground))',
  },
  presentes: {
    label: 'Real (Presentes)',
    color: 'hsl(var(--chart-1))',
  },
}

export function AttendanceChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Volume de Frequência Diária</CardTitle>
        <CardDescription>Comparativo: Escala Esperada vs Presença Real (Por hora)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs text-muted-foreground"
                />
                <Tooltip
                  content={<ChartTooltipContent />}
                  cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                />
                <Bar
                  dataKey="esperado"
                  fill="var(--color-esperado)"
                  radius={[4, 4, 0, 0]}
                  opacity={0.5}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="presentes"
                  fill="var(--color-presentes)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
