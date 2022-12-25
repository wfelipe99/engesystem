import { Container, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { trpc } from '../../utils/trpc'

import { useState, useRef, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { AG_GRID_LOCALE_PT_BR } from '../../utils/utils'

const Gerenciar: NextPage = () => {
  const tableFields = [
    { field: 'UF', filter: true },
    { field: 'name', headerName: 'Nome', filter: true },
    {
      valueGetter: (params) => {
        return params.data.roles[0].name
      },
      headerName: 'Função',
      filter: true,
    },
  ]

  const { data: rowData } = trpc.employee.getAll.useQuery()

  const gridRef = useRef() // Optional - for accessing Grid's API

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState(tableFields)

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }))

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log('cellClicked', event)
  }, [])

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll()
  }, [])

  return (
    <Container maxW="container.lg">
      <Box w="100%">
        <div>
          {/* Example using Grid's API */}
          <button onClick={buttonListener}>Push Me</button>

          {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
          <div className="ag-theme-alpine" style={{ width: '100%', height: 500 }}>
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={rowData} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection="multiple" // Options - allows click selection of rows
              onCellClicked={cellClickedListener} // Optional - registering for Grid Event
              localeText={AG_GRID_LOCALE_PT_BR}
            />
          </div>
        </div>
      </Box>
    </Container>
  )
}

export default Gerenciar
