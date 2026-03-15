import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, User, FileText, Calendar } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import useMainStore from '@/stores/main'

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { employees } = useMainStore()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Buscar colaboradores, relatórios..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Colaboradores">
          {employees.map((emp) => (
            <CommandItem key={emp.id} onSelect={() => runCommand(() => navigate('/colaboradores'))}>
              <User className="mr-2 h-4 w-4" />
              <span>{emp.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{emp.department}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Páginas">
          <CommandItem onSelect={() => runCommand(() => navigate('/escalas'))}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Gestão de Escalas</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/relatorios'))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Relatórios de Ponto</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
