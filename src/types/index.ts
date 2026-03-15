export type Status = 'presente' | 'ausente' | 'atrasado' | 'saida_antecipada'

export type PunchType = 'entrada' | 'saida' | 'pausa' | 'retorno'

export interface Employee {
  id: string
  name: string
  role: string
  department: string
  pis: string
  status: Status
  avatar: string
  shift: string
}

export interface Punch {
  id: string
  employeeId: string
  employeeName: string
  avatar: string
  timestamp: string
  type: PunchType
  status: 'no_horario' | 'atrasado' | 'inconsistente'
}

export interface Alert {
  id: string
  employeeName: string
  message: string
  type: 'warning' | 'destructive'
  timestamp: string
}

export interface Schedule {
  id: string
  name: string
  startTime: string
  endTime: string
  breakStart: string
  breakEnd: string
  tolerance: number
}
