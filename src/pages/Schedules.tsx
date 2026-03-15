import { Plus, Clock, Settings2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'

export default function Schedules() {
  const { schedules } = useMainStore()

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Gestão de Escalas</h1>
          <p className="text-muted-foreground">Configure horários, tolerâncias e intervalos.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Nova Escala
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {schedules.map((schedule) => (
          <Card
            key={schedule.id}
            className="hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{schedule.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Tolerância de {schedule.tolerance} min</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" /> Entrada / Saída
                  </div>
                  <div className="font-mono font-medium">
                    {schedule.startTime} - {schedule.endTime}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" /> Almoço
                  </div>
                  <div className="font-mono font-medium">
                    {schedule.breakStart} - {schedule.breakEnd}
                  </div>
                </div>
                <div className="pt-2">
                  <Badge variant="secondary" className="font-normal">
                    Atribuída a 12 colaboradores
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
