import { useState } from 'react'
import { UploadCloud, RefreshCw, FileText, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import useMainStore from '@/stores/main'

export default function Import() {
  const { toast } = useToast()
  const { isSyncing, triggerSync } = useMainStore()
  const [progress, setProgress] = useState(0)

  const handleLiveSync = () => {
    if (isSyncing) return
    triggerSync()
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          toast({
            title: 'Sincronização Concluída',
            description: 'Os dados foram atualizados com sucesso do Control ID.',
          })
          return 100
        }
        return p + 25
      })
    }, 400)
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Importar Dados</h1>
        <p className="text-muted-foreground">
          Integração com relógios Control ID e importação manual.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-indigo-500" /> Sincronização em Tempo Real
            </CardTitle>
            <CardDescription>
              Busca dados diretamente do hardware via rede local ou API.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center space-y-6">
            {isSyncing ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Conectando ao dispositivo...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4 opacity-50" />
                <p className="text-sm font-medium mb-4 text-center">
                  Última sincronização há 5 minutos.
                </p>
                <Button onClick={handleLiveSync} className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" /> Forçar Sincronização
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-500" /> Importação Manual (CSV/TXT)
            </CardTitle>
            <CardDescription>
              Faça upload de arquivos exportados do software do relógio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group">
              <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="h-8 w-8 text-slate-500" />
              </div>
              <p className="font-medium text-sm mb-1">
                Clique para enviar ou arraste o arquivo aqui
              </p>
              <p className="text-xs text-muted-foreground">Suporta arquivos .txt AFD ou .csv</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="secondary" disabled>
                Processar Arquivo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
