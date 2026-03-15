import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'

export function LiveFeed() {
  const { punches } = useMainStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'no_horario':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
      case 'atrasado':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
      default:
        return 'bg-slate-100 text-slate-800 hover:bg-slate-100 border-slate-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'no_horario':
        return 'No Horário'
      case 'atrasado':
        return 'Atrasado'
      default:
        return 'Inconsistente'
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          Feed em Tempo Real
          <span className="relative flex h-2 w-2 ml-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto max-h-[400px] pr-2 space-y-4">
        {punches.map((punch) => (
          <div
            key={punch.id}
            className="flex items-center gap-4 p-3 rounded-lg border bg-slate-50/50 dark:bg-slate-900/50 animate-fade-in"
          >
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={punch.avatar} />
              <AvatarFallback>{punch.employeeName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{punch.employeeName}</p>
              <p className="text-xs text-muted-foreground capitalize">Batida de {punch.type}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-mono font-semibold">{punch.timestamp}</span>
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0 ${getStatusColor(punch.status)}`}
              >
                {getStatusLabel(punch.status)}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
