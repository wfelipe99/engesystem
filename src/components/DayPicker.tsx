import { ptBR } from 'date-fns/locale'
import { DayPicker as ReactDayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'

export default function DayPicker(props: any) {
  return <ReactDayPicker mode="single" locale={ptBR} {...props} />
}
