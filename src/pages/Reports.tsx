import { Download, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useMainStore from '@/stores/main'

export default function Reports() {
  const { punches } = useMainStore()

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Relatórios</h1>
          <p className="text-muted-foreground">Análise detalhada e exportação de dados.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filtros
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" /> Exportar CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="inconsistencias" className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
          <TabsTrigger value="diario">Espelho Diário</TabsTrigger>
          <TabsTrigger value="inconsistencias">Inconsistências</TabsTrigger>
        </TabsList>
        <TabsContent value="inconsistencias" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Marcações com Divergência (Hoje)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Colaborador</TableHead>
                    <TableHead>Tipo de Batida</TableHead>
                    <TableHead>Horário Registrado</TableHead>
                    <TableHead>Esperado</TableHead>
                    <TableHead>Divergência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {punches
                    .filter((p) => p.status !== 'no_horario')
                    .map((punch) => (
                      <TableRow key={punch.id}>
                        <TableCell className="font-medium">{punch.employeeName}</TableCell>
                        <TableCell className="capitalize">{punch.type}</TableCell>
                        <TableCell className="font-mono text-amber-600 font-semibold">
                          {punch.timestamp}
                        </TableCell>
                        <TableCell className="font-mono text-muted-foreground">08:00</TableCell>
                        <TableCell>
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                            +45 min (Atraso)
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  {punches.filter((p) => p.status !== 'no_horario').length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Nenhuma inconsistência encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="diario" className="mt-6">
          <Card>
            <CardContent className="py-12 flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground">
                Selecione uma data para gerar o espelho diário detalhado.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
