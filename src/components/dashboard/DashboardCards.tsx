import { Users, Clock, UserX, Timer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useMainStore from '@/stores/main'

export function DashboardCards() {
  const { employees } = useMainStore()

  const presentCount = employees.filter(
    (e) => e.status === 'presente' || e.status === 'atrasado',
  ).length
  const lateCount = employees.filter((e) => e.status === 'atrasado').length
  const absentCount = employees.filter((e) => e.status === 'ausente').length

  const stats = [
    {
      title: 'Presentes Hoje',
      value: `${presentCount} / ${employees.length}`,
      icon: Users,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100 dark:bg-emerald-900/20',
    },
    {
      title: 'Atrasos',
      value: lateCount.toString(),
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-100 dark:bg-amber-900/20',
    },
    {
      title: 'Faltas',
      value: absentCount.toString(),
      icon: UserX,
      color: 'text-destructive',
      bg: 'bg-destructive/10 dark:bg-destructive/20',
    },
    {
      title: 'Horas Extras',
      value: '12h 30m',
      icon: Timer,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100 dark:bg-indigo-900/20',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="hover:shadow-md transition-shadow animate-slide-up"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
