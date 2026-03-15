import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import { MainStoreProvider } from '@/stores/main'
import { AppSidebar } from './AppSidebar'
import { AppHeader } from './AppHeader'
import { GlobalSearch } from './GlobalSearch'

export default function Layout() {
  return (
    <MainStoreProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
          <AppSidebar />
          <div className="flex flex-col flex-1 w-full overflow-hidden">
            <AppHeader />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto animate-fade-in">
              <Outlet />
            </main>
          </div>
        </div>
        <GlobalSearch />
      </SidebarProvider>
    </MainStoreProvider>
  )
}
