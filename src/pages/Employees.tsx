import { Search, SlidersHorizontal, Eye } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import useMainStore from '@/stores/main'

export default function Employees() {
  const { employees } = useMainStore()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'presente':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
            Presente
          </Badge>
        )
      case 'ausente':
        return (
          <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 border-none">Ausente</Badge>
        )
      case 'atrasado':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
            Atrasado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Colaboradores</h1>
          <p className="text-muted-foreground">Diretório e status atual de marcação.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative max-w-sm w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome ou PIS..."
              className="pl-8 bg-white dark:bg-slate-950"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10 shadow-sm">
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>PIS / ID</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Escala</TableHead>
                <TableHead>Status Hoje</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={emp.avatar} />
                        <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {emp.pis}
                  </TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.shift}</TableCell>
                  <TableCell>{getStatusBadge(emp.status)}</TableCell>
                  <TableCell className="text-right">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="h-4 w-4 mr-2" /> Detalhes
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                        <SheetHeader className="mb-6">
                          <SheetTitle>Detalhes do Colaborador</SheetTitle>
                          <SheetDescription>
                            Histórico de pontualidade e informações.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={emp.avatar} />
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-bold">{emp.name}</h3>
                              <p className="text-muted-foreground">
                                {emp.role} • {emp.department}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <Card className="p-4 bg-slate-50 dark:bg-slate-900/50">
                              <p className="text-sm text-muted-foreground">Status Atual</p>
                              <div className="mt-1">{getStatusBadge(emp.status)}</div>
                            </Card>
                            <Card className="p-4 bg-slate-50 dark:bg-slate-900/50">
                              <p className="text-sm text-muted-foreground">Escala</p>
                              <p className="font-medium mt-1">{emp.shift}</p>
                            </Card>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-sm border-b pb-2">
                              Histórico Recente (Exemplo)
                            </h4>
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="flex justify-between items-center text-sm border p-3 rounded-md"
                              >
                                <span className="text-muted-foreground">Hoje - {0 + i} dias</span>
                                <span className="font-mono">
                                  08:0{i} - 12:00 / 13:00 - 18:0{i}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
