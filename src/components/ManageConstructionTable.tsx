import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component
import type { CellDoubleClickedEvent, ColDef, SelectionChangedEvent } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import type { UserWithRoles } from 'next-auth'
import type { Role } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { useState, useRef, useMemo, useCallback } from 'react'
import { AG_GRID_LOCALE_PT_BR } from '../utils/types'

type User = {
  UF: Pick<Role, 'UF'>
  name: Pick<UserWithRoles, 'name'>
  role: Pick<Role, 'name'>
  admissionDate: Pick<UserWithRoles, 'admissionDate'>
}

type Props = {
  rowData: any
}

export default function ManageConstructionTable({ rowData }: Props) {
  const router = useRouter()

  const tableFields: ColDef<User>[] = [
    { field: 'name', headerName: 'Funcionário', sort: 'asc' },
    {
      valueGetter: (params) => {
        return params.data.roles[0].name
      },
      headerName: 'Função',
    },
    {
      valueGetter: (params) => {
        return params.data.salary.netSalary
      },
      headerName: 'Remuneração',
    },
    {
      valueGetter: (params) => {
        return params.data.roles[0].salary
      },
      headerName: 'Proporcional',
    },
    {
      valueGetter: (params) => {
        return params.data.vale
      },
      headerName: 'Vale',
    },
    {
      valueGetter: (params) => {
        const value = params.data.productionSalary

        if (!value) return 'Não é produção'

        return value
      },
      headerName: 'Produção',
    },
    {
      valueGetter: (params) => {
        return params.data.salary.bonus
      },
      headerName: 'Bônus',
    },
    {
      valueGetter: (params) => {
        return params.data.salary.moneyInAdvance
      },
      headerName: 'Adiantamentos',
    },
    {
      valueGetter: (params) => {
        return params.data.salary.overTime
      },
      headerName: 'Total Hora Extra',
    },
    {
      valueGetter: (params) => {
        return params.data.salary.discount
      },
      headerName: 'Total Descontos',
    },
  ]

  const gridRef = useRef() // Optional - for accessing Grid's API

  // Each Column Definition results in one Column.
  const [columnDefs] = useState(tableFields)

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  )

  // Example of consuming Grid Event
  const cellDoubleClickedListener = useCallback(
    (e: CellDoubleClickedEvent) => {
      router.push(`/funcionarios/gerenciar/${e.data.id}`)
    },
    [router]
  )

  return (
    <div>
      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: '100%', height: 500 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onRowDoubleClicked={cellDoubleClickedListener}
          localeText={AG_GRID_LOCALE_PT_BR}
          enableCellTextSelection
        />
      </div>
    </div>
  )
}
