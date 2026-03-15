import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Employee, Punch, Alert, Schedule } from '@/types'

interface MainStore {
  employees: Employee[]
  punches: Punch[]
  alerts: Alert[]
  schedules: Schedule[]
  isSyncing: boolean
  triggerSync: () => void
}

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Ana Souza',
    role: 'Desenvolvedora',
    department: 'Engenharia',
    pis: '123.45678.90-1',
    status: 'presente',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    shift: 'Comercial',
  },
  {
    id: '2',
    name: 'Carlos Santos',
    role: 'Analista de Suporte',
    department: 'TI',
    pis: '987.65432.10-2',
    status: 'atrasado',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    shift: 'Comercial',
  },
  {
    id: '3',
    name: 'Beatriz Lima',
    role: 'Gerente de RH',
    department: 'RH',
    pis: '456.78912.34-5',
    status: 'ausente',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
    shift: 'Comercial',
  },
  {
    id: '4',
    name: 'Marcos Paulo',
    role: 'Designer',
    department: 'Produto',
    pis: '321.65498.70-9',
    status: 'presente',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
    shift: 'Comercial',
  },
]

const INITIAL_PUNCHES: Punch[] = [
  {
    id: 'p1',
    employeeId: '1',
    employeeName: 'Ana Souza',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    timestamp: '08:02',
    type: 'entrada',
    status: 'no_horario',
  },
  {
    id: 'p2',
    employeeId: '4',
    employeeName: 'Marcos Paulo',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
    timestamp: '08:05',
    type: 'entrada',
    status: 'no_horario',
  },
  {
    id: 'p3',
    employeeId: '2',
    employeeName: 'Carlos Santos',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    timestamp: '08:45',
    type: 'entrada',
    status: 'atrasado',
  },
]

const INITIAL_ALERTS: Alert[] = [
  {
    id: 'a1',
    employeeName: 'Beatriz Lima',
    message: 'Falta não justificada detectada.',
    type: 'destructive',
    timestamp: '09:00',
  },
  {
    id: 'a2',
    employeeName: 'Carlos Santos',
    message: 'Chegou com 45 minutos de atraso.',
    type: 'warning',
    timestamp: '08:45',
  },
]

const INITIAL_SCHEDULES: Schedule[] = [
  {
    id: 's1',
    name: 'Comercial Padrão',
    startTime: '08:00',
    endTime: '18:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    tolerance: 10,
  },
  {
    id: 's2',
    name: 'Turno da Noite',
    startTime: '22:00',
    endTime: '06:00',
    breakStart: '02:00',
    breakEnd: '03:00',
    tolerance: 15,
  },
]

const MainContext = createContext<MainStore | undefined>(undefined)

export function MainStoreProvider({ children }: { children: ReactNode }) {
  const [employees] = useState<Employee[]>(INITIAL_EMPLOYEES)
  const [punches, setPunches] = useState<Punch[]>(INITIAL_PUNCHES)
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS)
  const [schedules] = useState<Schedule[]>(INITIAL_SCHEDULES)
  const [isSyncing, setIsSyncing] = useState(false)

  const triggerSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      const newPunch: Punch = {
        id: `p${Date.now()}`,
        employeeId: '1',
        employeeName: 'Ana Souza',
        avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        type: 'pausa',
        status: 'no_horario',
      }
      setPunches((prev) => [newPunch, ...prev])
      setIsSyncing(false)
    }, 2000)
  }

  return (
    <MainContext.Provider value={{ employees, punches, alerts, schedules, isSyncing, triggerSync }}>
      {children}
    </MainContext.Provider>
  )
}

export default function useMainStore() {
  const context = useContext(MainContext)
  if (!context) throw new Error('useMainStore must be used within a MainStoreProvider')
  return context
}
