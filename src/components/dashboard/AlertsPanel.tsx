import { AlertTriangle, ClockAlert } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useMainStore from '@/stores/main'

export function AlertsPanel() {
  const { alerts } = useMainStore()

  return (
    <Card className="h-full border-rose-100 dark:border-rose-900/50">
      <CardHeader className="bg-rose-50/50 dark:bg-rose-900/10 border-b border-rose-100 dark:border-rose-900/50 pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-rose-700 dark:text-rose-400">
          <AlertTriangle className="h-5 w-5" />
          Atenção Crítica
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma inconsistência detectada.
          </p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="flex gap-3 items-start animate-slide-up">
              <div
                className={`mt-0.5 p-1.5 rounded-md ${alert.type === 'destructive' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}
              >
                <ClockAlert className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">{alert.employeeName}</p>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{alert.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
