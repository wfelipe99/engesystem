import { format } from 'date-fns'
import { pt, ptBR } from 'date-fns/locale'
import { useAtom, atom } from 'jotai'
import { DayPicker as ReactDayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'

export const dayPickerAtom = atom<Date>(new Date())

export default function DayPicker(props: any) {
  return <ReactDayPicker mode="single" locale={ptBR} {...props} />
}
