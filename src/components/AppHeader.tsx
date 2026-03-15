import { useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useMainStore from '@/stores/main'

const routeMap: Record<string, string> = {
  '/': 'Dashboard',
  '/escalas': 'Escalas',
  '/colaboradores': 'Colaboradores',
  '/relatorios': 'Relatórios',
  '/importar': 'Importar Dados',
}

export function AppHeader() {
  const location = useLocation()
  const { alerts, isSyncing } = useMainStore()
  const currentPage = routeMap[location.pathname] || 'Página'

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 shadow-sm md:px-6">
      <SidebarTrigger className="-ml-2" />

      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>Ponto Sync</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-primary">{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mr-4">
          <div className="relative flex h-2.5 w-2.5">
            {isSyncing && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isSyncing ? 'bg-emerald-500' : 'bg-emerald-500'}`}
            ></span>
          </div>
          {isSyncing ? 'Sincronizando...' : 'Live Sync Ativo'}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex gap-2 text-muted-foreground"
          onClick={() =>
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
          }
        >
          <Search className="h-4 w-4" />
          <span>Buscar (Ctrl+K)</span>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {alerts.length > 0 && (
                <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive"></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <h4 className="font-semibold mb-3">Notificações</h4>
            <div className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma notificação nova.</p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex flex-col gap-1 border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{alert.employeeName}</span>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <span
                      className={`text-xs ${alert.type === 'destructive' ? 'text-destructive' : 'text-amber-600'}`}
                    >
                      {alert.message}
                    </span>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=10" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
