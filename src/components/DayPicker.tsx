import { format } from 'date-fns'
import { pt, ptBR } from 'date-fns/locale'
import { useAtom, atom } from 'jotai'
import { DayPicker as ReactDayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'

export const dayPickerAtom = atom<Date>(new Date())

export default function DayPicker() {
  const [selected, setSelected] = useAtom(dayPickerAtom)

  let footer = <p>Please pick a day.</p>
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>
  }
  return (
    <ReactDayPicker
      mode="single"
      selected={selected}
      onSelect={(e) => setSelected(e as Date)}
      footer={footer}
      locale={ptBR}
    />
  )
}
