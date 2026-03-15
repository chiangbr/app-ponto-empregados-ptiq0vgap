import { DashboardCards } from '@/components/dashboard/DashboardCards'
import { AttendanceChart } from '@/components/dashboard/AttendanceChart'
import { LiveFeed } from '@/components/dashboard/LiveFeed'
import { AlertsPanel } from '@/components/dashboard/AlertsPanel'

export default function Index() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Painel de Controle</h1>
        <p className="text-muted-foreground">Monitoramento em tempo real das marcações de ponto.</p>
      </div>

      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
        <div className="lg:col-span-1">
          <AlertsPanel />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <LiveFeed />
      </div>
    </div>
  )
}
