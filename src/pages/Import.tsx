import { useState } from 'react'
import { UploadCloud, RefreshCw, FileText, CheckCircle2, Settings, Server } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import useMainStore from '@/stores/main'

export default function Import() {
  const { toast } = useToast()
  const { isSyncing, syncWithAPI, apiConfig, setApiConfig } = useMainStore()
  const [progress, setProgress] = useState(0)

  const [baseUrl, setBaseUrl] = useState(apiConfig?.baseUrl || 'https://api.rhid.com.br/v2')
  const [token, setToken] = useState(apiConfig?.token || '')

  const handleSaveConfig = () => {
    setApiConfig({ baseUrl, token })
    toast({
      title: 'Configuração Salva',
      description: 'As credenciais da API RHeID foram atualizadas.',
    })
  }

  const handleLiveSync = async () => {
    if (isSyncing) return

    if (!apiConfig?.token) {
      toast({
        title: 'Configuração Ausente',
        description: 'Por favor, configure o Token e a URL da API na aba de configurações.',
        variant: 'destructive',
      })
      return
    }

    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 15
        return next >= 90 ? 90 : next
      })
    }, 200)

    try {
      await syncWithAPI()
      setProgress(100)
      toast({
        title: 'Sincronização Concluída',
        description: 'Os dados foram atualizados com sucesso da API RHeID.',
      })
    } catch (error: any) {
      toast({
        title: 'Erro de Sincronização',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      clearInterval(interval)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Integração de Dados</h1>
        <p className="text-muted-foreground">
          Sincronize com a API do Control ID ou faça importação manual de arquivos.
        </p>
      </div>

      <Tabs defaultValue="sync" className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2 mb-6">
          <TabsTrigger value="sync">Sincronização</TabsTrigger>
          <TabsTrigger value="config">Configuração da API</TabsTrigger>
        </TabsList>

        <TabsContent value="sync">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-indigo-500" /> API RHeID (Control ID)
                </CardTitle>
                <CardDescription>
                  Sincronização automatizada de colaboradores e batidas via API.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center space-y-6">
                {isSyncing ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Buscando dados da API...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                    <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4 opacity-50" />
                    <p className="text-sm font-medium mb-4 text-center">
                      Pronto para sincronizar dados.
                    </p>
                    <Button onClick={handleLiveSync} className="w-full gap-2">
                      <RefreshCw className="h-4 w-4" /> Sincronizar com Control ID
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-500" /> Importação Manual
                </CardTitle>
                <CardDescription>
                  Faça upload de arquivos exportados do relógio (CSV/TXT).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group">
                  <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="h-8 w-8 text-slate-500" />
                  </div>
                  <p className="font-medium text-sm mb-1">
                    Clique para enviar ou arraste o arquivo
                  </p>
                  <p className="text-xs text-muted-foreground">Suporta .txt AFD ou .csv</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="secondary" disabled>
                    Processar Arquivo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="config">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-slate-500" />
                Credenciais da API RHeID
              </CardTitle>
              <CardDescription>
                Configure os dados de acesso para comunicação com a nuvem do Control ID.
                <br />
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  Dica: Use o token "mock-token" para simular uma sincronização bem-sucedida.
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baseUrl">URL Base da API</Label>
                <Input
                  id="baseUrl"
                  placeholder="https://api.rhid.com.br/v2"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token">Token de Acesso (Bearer)</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Insira seu token de acesso da API"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} className="gap-2">
                <Settings className="h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
