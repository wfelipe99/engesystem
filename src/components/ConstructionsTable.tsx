import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component
import type { CellDoubleClickedEvent, ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import type { Construction as ConstructionPrisma } from '@prisma/client'
import { useRouter } from 'next/router'
import { useState, useRef, useMemo, useCallback } from 'react'
import { AG_GRID_LOCALE_PT_BR } from '../utils/types'

type Construction = {
  name: Pick<ConstructionPrisma, 'name'>
  UF: Pick<ConstructionPrisma, 'UF'>
}

type Props = {
  rowData: any
  showCheckBox?: boolean
}

export default function ConstructionTable({ rowData, showCheckBox = false }: Props) {
  const router = useRouter()

  const tableFields: ColDef<Construction>[] = [
    { field: 'name', headerName: 'Nome', sort: 'asc', checkboxSelection: showCheckBox },
    {
      valueGetter: (params) => {
        return params.data.UF
      },
      headerName: 'UF',
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
      router.push(`/obras/gerenciar/${e.data.id}`)
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
        />
      </div>
    </div>
  )
}
